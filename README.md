# File Intelligence Agent

A free, browser-based file organiser. Choose files, review an explicit proposed plan, then export an organised copy. Originals are never changed by this version.

## Working features
- Select multiple local files from a device.
- Categorise common images, PDFs, documents, spreadsheets, presentations, audio, video, archives and other files.
- Show image thumbnails and file metadata.
- Compare files using SHA-256 content hashes and flag exact duplicates when browser hashing is available.
- Prepare a proposed folder plan, choose a folder style and include/exclude each item.
- Download an organised ZIP copy with a CSV plan.
- Download the plan and activity log as CSV.
- Review duplicate candidates separately. No deletion function is implemented.
- Keep file contents in the browser; the app does not upload them to a server.

## Safety
Approving the plan creates a downloaded copy. It does not move, rename, overwrite or delete originals. Similar filenames are not treated as proof of duplicates. The Google Drive label field is only a local note, not an account connection. Never enter Google passwords or access tokens into this app.

## Free technology
Plain HTML, CSS and browser JavaScript, with no framework or paid runtime. JSZip (MIT licence) is loaded from cdnjs only when ZIP export is requested. GitHub stores the source. The public repository can be published through GitHub Pages at no charge, subject to enabling Pages in repository settings.

## Limitations
This is a functional local-file MVP, not yet a native Android app. Browser selection does not grant whole-phone storage access. Google Drive OAuth, scanning multiple accounts, cloud file operations, visual image recognition, and native Android permissions are not connected yet. These require additional development and authorised configuration. The app does not claim otherwise.

## Run
Open `index.html` in a modern browser. HTTPS or localhost gives the best compatibility. Internet access is needed only to load JSZip at export time.
