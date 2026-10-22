# File Intelligence Agent

Approval-first file organiser. Free and open source.

## Features
- Select local files, sort into proposed folders, identify exact duplicates and export an organised ZIP copy.
- Generate optional AI captions for Google Drive images in batches of 10 using the free Transformers.js image-captioning model. Captions become searchable and can be used as editable filename suggestions. Captions are not guaranteed to identify a specific collectible correctly.
- Connect more than one Google Drive account in the browser session after configuring a Google OAuth Web Client ID.
- Search the combined scanned library across connected accounts and open matching Drive files directly.
- Use voice input where the browser supports speech recognition.
- Scan Drive metadata and prepare a proposed move/rename plan. Only checked items are changed after explicit approval.
- Review duplicates separately. The app does not delete files.
- Download CSV plans and activity logs.
- GitHub Actions can build an Android debug APK.

## Google Drive setup
Create a project in Google Cloud Console, enable Google Drive API, configure the OAuth consent screen, and create a Web application OAuth Client ID. Add the app's exact HTTPS origin to Authorised JavaScript origins. Paste that Client ID into the app and connect accounts individually. Never enter a Google password or client secret into the app. Google may display an unverified-app warning until the OAuth project is configured and verified.

Drive operations run directly between the browser and Google. Drive approval applies the selected moves/renames. No deletion function exists. If an operation fails partway through, some earlier changes may already have been applied. Check Drive before retrying.

## Android APK
Open Actions, select Build Android APK, open a successful run and download the file-intelligence-agent-debug-apk artifact. Extract app-debug.apk to install. This is a debug build, not a Play Store release. Android file access is limited by system permissions, and Google sign-in is intended for the HTTPS browser version.

## Limitations
The project does not have unrestricted access to the entire Android phone. Drive search uses filenames, metadata and generated captions for images you choose to analyse. The image-caption model can describe a broad scene or object but may not recognise specific collectible brands or characters. It processes up to 10 images per click; run it again for the next batch. The app does not yet read every PDF, spreadsheet, or document's contents. Google OAuth configuration is required and cannot be bypassed.


## Live web app
The GitHub Pages deployment workflow publishes the app at `https://lucasmaxxinfo-sketch.github.io/gofog0/` when the repository's Pages deployment is enabled. The HTTPS browser version is the intended way to connect Google Drive. The Android APK is a local companion and does not support Google OAuth inside its embedded WebView.
