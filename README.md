# File Intelligence Agent

Approval-first file organiser. Free and open source.

## Features
- Select local files, sort into proposed folders, identify exact duplicates and export an organised ZIP copy.
- Connect more than one Google Drive account in a browser session after configuring a Google OAuth Web Client ID.
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
The project does not have unrestricted access to the entire Android phone. Drive analysis currently uses file metadata and exact checksums. It does not yet semantically recognise image contents or read every document's contents. Google OAuth configuration is required and cannot be bypassed.
