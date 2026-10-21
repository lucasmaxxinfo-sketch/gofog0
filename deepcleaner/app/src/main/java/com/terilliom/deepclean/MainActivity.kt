package com.terilliom.deepclean

import android.app.Activity
import android.app.AppOpsManager
import android.app.usage.StorageStatsManager
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.os.Process
import android.provider.Settings
import android.text.format.Formatter
import android.view.Gravity
import android.view.ViewGroup
import android.widget.*
import java.io.File
import java.util.concurrent.Executors

data class Finding(val title: String, val detail: String, val impact: String, val action: (() -> Unit)? = null)

class MainActivity : Activity() {
    private lateinit var root: LinearLayout
    private lateinit var status: TextView
    private lateinit var results: LinearLayout
    private val executor = Executors.newSingleThreadExecutor()
    private val findings = mutableListOf<Finding>()
    private val prefs by lazy { getSharedPreferences("review", MODE_PRIVATE) }
    private val mediaPermissions: Array<String> get() = if (android.os.Build.VERSION.SDK_INT >= 33) arrayOf(
        android.Manifest.permission.READ_MEDIA_IMAGES,
        android.Manifest.permission.READ_MEDIA_VIDEO,
        android.Manifest.permission.READ_MEDIA_AUDIO
    ) else arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE)
    private val scanRequestCode = 4107

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        buildUi()
    }

    private fun buildUi() {
        root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setPadding(28, 24, 28, 24); setBackgroundColor(0xFFF5F7FB.toInt()) }
        val scroll = ScrollView(this)
        val content = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        content.addView(TextView(this).apply { text = "DEEPCLEAN"; textSize = 28f; setTextColor(0xFF172554.toInt()); typeface = android.graphics.Typeface.DEFAULT_BOLD })
        content.addView(TextView(this).apply { text = "Evidence first. Your approval always."; textSize = 15f; setPadding(0, 4, 0, 18) })
        status = TextView(this).apply { text = "Ready to investigate your phone."; textSize = 16f; setPadding(0, 12, 0, 12) }
        content.addView(status)
        val scan = Button(this).apply { text = "RUN DEEP SCAN"; setOnClickListener { startScan() } }
        content.addView(scan)
        val usage = Button(this).apply { text = "Enable usage access (improves app analysis)"; setOnClickListener { startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)) } }
        content.addView(usage)
        val storage = Button(this).apply { text = "Review storage permissions"; setOnClickListener { if (android.os.Build.VERSION.SDK_INT >= 30) startActivity(Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, Uri.parse("package:$packageName"))) else startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:$packageName"))) } }
        content.addView(storage)
        content.addView(TextView(this).apply { text = "\nINVESTIGATION RESULTS"; textSize = 18f; typeface = android.graphics.Typeface.DEFAULT_BOLD; setTextColor(0xFF172554.toInt()) })
        results = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        content.addView(results)
        content.addView(TextView(this).apply { text = "\nSafety: DeepClean never deletes files or clears another app's data automatically. Android hides some private app data; results clearly separate evidence from estimates."; textSize = 13f; setPadding(0, 20, 0, 16) })
        scroll.addView(content)
        root.addView(scroll)
        setContentView(root)
    }

    private fun startScan() {
        val missing = mediaPermissions.filter { checkSelfPermission(it) != android.content.pm.PackageManager.PERMISSION_GRANTED }
        if (missing.isNotEmpty()) {
            requestPermissions(missing.toTypedArray(), scanRequestCode)
            status.text = "Allow media access to include shared photos, videos and audio in the scan."
            return
        }
        runScan()
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == scanRequestCode) {
            if (mediaPermissions.all { checkSelfPermission(it) == android.content.pm.PackageManager.PERMISSION_GRANTED }) {
                runScan()
            } else {
                status.text = "Media access was not granted. App analysis can still run, but shared-file scanning will be limited."
                runScan()
            }
        }
    }

    private fun runScan() {
        status.text = "Scanning installed apps, usage signals and accessible storage…"
        results.removeAllViews()
        executor.execute {
            val found = mutableListOf<Finding>()
            val pm = packageManager
            val now = System.currentTimeMillis()
            val usageAllowed = try {
                val ops = getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
                ops.checkOpNoThrow("android:get_usage_stats", Process.myUid(), packageName) == AppOpsManager.MODE_ALLOWED
            } catch (_: Exception) { false }

            if (!usageAllowed) found.add(Finding("App activity access is not enabled", "Without Usage Access, DeepClean cannot reliably rank apps by recent activity. Tap the Usage Access button and enable DeepClean, then scan again.", "Analysis incomplete"))

            // Android may return one UsageStats row per day. Aggregate rows by package,
            // rather than accidentally keeping only the final day's activity.
            val usageMap = if (usageAllowed) try {
                (getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager)
                    .queryUsageStats(UsageStatsManager.INTERVAL_DAILY, now - 7L*24*60*60*1000, now)
                    .groupBy { it.packageName }
                    .mapValues { (_, rows) ->
                        object {
                            val lastTimeUsed = rows.maxOfOrNull { it.lastTimeUsed } ?: 0L
                            val totalTimeInForeground = rows.sumOf { it.totalTimeInForeground }
                        }
                    }
            } catch (_: Exception) { emptyMap() } else emptyMap()

            try {
                val apps = pm.getInstalledApplications(0)
                for (app in apps) {
                    if (app.packageName == packageName) continue
                    val isSystem = (app.flags and android.content.pm.ApplicationInfo.FLAG_SYSTEM) != 0
                    val stats = usageMap[app.packageName]
                    val lastUsed = stats?.lastTimeUsed ?: 0L
                    val days = if (lastUsed > 0) ((now - lastUsed) / (24L*60*60*1000)).toInt() else -1
                    val label = try { pm.getApplicationLabel(app).toString() } catch (_: Exception) { app.packageName }
                    if (!isSystem && days >= 45) {
                        found.add(Finding("Unused app: $label", "No recorded use for about $days days. This is a review suggestion, not proof the app slows your phone. Package: ${app.packageName}", "Review candidate", { openAppSettings(app.packageName) }))
                    } else if (!isSystem && stats != null && stats.totalTimeInForeground > 2L*60*60*1000) {
                        found.add(Finding("High foreground use: $label", "Usage recorded over the last 7 days: ${stats.totalTimeInForeground / 60000} minutes. High use alone is not a fault; investigate if this matches battery or heat problems.", "Investigate", { openAppSettings(app.packageName) }))
                    }
                }
            } catch (_: Exception) { found.add(Finding("Installed-app scan limited", "Android did not provide the full installed-app list. Some device versions restrict app visibility.", "Permission / OS limit")) }

            val roots = listOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM), Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES), Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC), Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS))
            var fileCount = 0
            var totalBytes = 0L
            val large = mutableListOf<Pair<File,Long>>()
            for (dir in roots) {
                if (dir.exists() && dir.canRead()) {
                    val stack = ArrayDeque<File>(); stack.add(dir)
                    var visited = 0
                    while (stack.isNotEmpty() && visited < 6000) {
                        val f = stack.removeLast(); visited++
                        try {
                            if (f.isDirectory) f.listFiles()?.forEach { stack.add(it) }
                            else if (f.isFile) {
                                fileCount++; totalBytes += f.length()
                                if (f.length() >= 250L*1024*1024) large.add(f to f.length())
                            }
                        } catch (_: Exception) {}
                    }
                }
            }
            if (fileCount > 0) found.add(Finding("Accessible personal storage reviewed", "$fileCount files inspected across accessible media folders; combined size ${Formatter.formatFileSize(this, totalBytes)}. Large files consume storage but do not necessarily slow the phone.", "Scan evidence"))
            large.sortedByDescending { it.second }.take(20).forEach { (file,size) ->
                found.add(Finding("Large file: ${file.name}", "${Formatter.formatFileSize(this,size)} • ${file.parent}. Review the file before removing it; it may be important.", "Storage candidate", { openFileLocationHint(file) }))
            }
            if (found.none { it.impact == "Review candidate" || it.impact == "Investigate" || it.impact == "Storage candidate" }) {
                found.add(Finding("No strong removal candidates found", "That is a valid result. DeepClean will not invent junk to make the scan look productive.", "No action needed"))
            }
            runOnUiThread {
                findings.clear(); findings.addAll(found)
                status.text = "Scan complete: ${found.size} findings. Review each item before taking action."
                renderFindings()
            }
        }
    }

    private fun renderFindings() {
        results.removeAllViews()
        findings.forEachIndexed { index, item ->
            val card = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setPadding(16,16,16,16); setBackgroundColor(0xFFFFFFFF.toInt()) }
            card.addView(TextView(this).apply { text = item.title; textSize = 17f; typeface = android.graphics.Typeface.DEFAULT_BOLD; setTextColor(0xFF172554.toInt()) })
            card.addView(TextView(this).apply { text = item.detail; textSize = 14f; setPadding(0,8,0,8) })
            card.addView(TextView(this).apply { text = "ASSESSMENT: ${item.impact}"; textSize = 12f; setTextColor(0xFF475569.toInt()) })
            if (item.action != null) {
                val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.END }
                val stableKey = "dismiss_" + (item.title + "|" + item.detail).hashCode()
                val reject = Button(this).apply { text = "Dismiss"; setOnClickListener { card.visibility = android.view.View.GONE; prefs.edit().putBoolean(stableKey, true).apply() } }
                val review = Button(this).apply { text = "Review"; setOnClickListener { item.action.invoke() } }
                row.addView(reject); row.addView(review); card.addView(row)
            }
            val params = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT); params.setMargins(0,8,0,8)
            results.addView(card, params)
        }
    }

    private fun openAppSettings(pkg: String) {
        startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:$pkg")))
    }
    private fun openFileLocationHint(file: File) {
        Toast.makeText(this, "Find and review: ${file.absolutePath}. DeepClean will not delete it.", Toast.LENGTH_LONG).show()
    }
    override fun onDestroy() { super.onDestroy(); executor.shutdownNow() }
}
