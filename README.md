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


## Product tiers (planned; not yet enforced in the app)

Sam's core product is a privacy-first file librarian, not a general-purpose personal assistant.

- **Free — Librarian:** up to two Google Drive accounts; file/image recognition, organisation suggestions, and search. Usage is limited by a clear allowance for processed files and searches, not by deliberately making existing files hard to find.
- **Paid — Personal Librarian:** higher processing and search allowances, more frequent organisation, larger recognition batches, and longer-running tasks.
- **Higher tier — Autonomous Assistant:** scheduled and multi-step library maintenance, progress updates, and completion reports.

All tiers retain privacy controls, transparent permissions, and approval before file moves or renames. The app must never delete files without explicit approval. No prices or usage quotas have been decided, and subscription enforcement/payment processing is not implemented yet. Do not display these tiers as purchasable until those systems and the actual limits are built and tested.

The free/open-source build should prefer on-device or browser-side processing where practical. Any hosted model, background worker, storage, or billing service must be assessed for ongoing costs before being included in a paid tier.

## Google Drive setup
Create a project in Google Cloud Console, enable Google Drive API, configure the OAuth consent screen, and create a Web application OAuth Client ID. Add the app's exact HTTPS origin to Authorised JavaScript origins. Paste that Client ID into the app and connect accounts individually. Never enter a Google password or client secret into the app. Google may display an unverified-app warning until the OAuth project is configured and verified.

Drive operations run directly between the browser and Google. Drive approval applies the selected moves/renames. No deletion function exists. If an operation fails partway through, some earlier changes may already have been applied. Check Drive before retrying.

## Android APK
Open Actions, select Build Android APK, open a successful run and download the file-intelligence-agent-debug-apk artifact. Extract app-debug.apk to install. This is a debug build, not a Play Store release. Android file access is limited by system permissions, and Google sign-in is intended for the HTTPS browser version.

## Limitations
The project does not have unrestricted access to the entire Android phone. Drive search uses filenames, metadata and generated captions for images you choose to analyse. The image-caption model can describe a broad scene or object but may not recognise specific collectible brands or characters. It processes up to 10 images per click; run it again for the next batch. The app does not yet read every PDF, spreadsheet, or document's contents. Google OAuth configuration is required and cannot be bypassed.


## Web and Android
The repository can build a web package and Android debug APK automatically. Publishing a live HTTPS site requires GitHub Pages to be enabled in repository settings, which this automation connection cannot change. The Android APK is a local companion and does not support Google OAuth inside its embedded WebView; connect Drive through the HTTPS browser version after hosting is enabled.
