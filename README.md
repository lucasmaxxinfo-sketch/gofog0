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

All tiers retain privacy controls, transparent permissions, and approval before file moves or renames. The app must never delete files without explicit approval. Target entry-level paid pricing is approximately **NZ$1–NZ$2**, keeping the ecosystem broadly accessible. Final prices, usage quotas, and subscription enforcement/payment processing are not implemented yet. Do not display these tiers as purchasable until those systems and the actual limits are built and tested.

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


## Terilliom ecosystem principle

Sam is one specialist agent within a wider Terilliom ecosystem. Agents should do useful work in the background, coordinate through clear hand-offs when appropriate, and show users outcomes, exceptions, and decisions that need their attention rather than making them manage the machinery. Each app can have its own distinctive, age-appropriate personality and visual identity while retaining consistent privacy, permission, and safety standards. Prefer free/open-source components and low operating costs so entry-level products can remain affordable. These are product principles, not claims that cross-agent coordination is implemented in this repository.


## UX and agent personality standard

Terilliom apps should feel like intuitive, capable coworkers, not complicated software dashboards.

- Start with one obvious action and plain-language requests. Keep routine flows short; hide advanced controls until needed.
- Make the hard work happen in the background. Show concise progress, useful outcomes, and only the exceptions or decisions that need a person.
- Give each agent a distinctive personality, visual identity, and restrained sound/motion design. Cheeky, witty, and playful is welcome; nagging, noisy, or distracting behaviour is not.
- Keep the tone age-inclusive and context-aware. Use humour for routine moments, and become clear and serious for privacy, money, security, errors, or consequential actions.
- Avoid jargon, configuration mazes, needless confirmation prompts, and repeated status messages.
- Use sensible defaults, transparent permissions, accessible controls, and a consistent privacy standard across the ecosystem.
- Design for trust: never pretend work is complete when it is not, and make it easy to inspect what an agent changed.

This is a design standard for future implementation, not a claim that every item is already implemented in this app.


## Sam character and interaction design

Sam is a formally dressed, cute adult-coded character with a polished, professional presentation: crisp white shirt, tailored waistcoat, expressive face, and a small hovercraft that carries him through the file library. He is not a children's mascot. His personality is precise, composed, and occasionally dry or cheeky.

- Sam stays to the side during ordinary use so files and results remain the focus.
- On arrival or when presenting search results, he glides in with a brief, configurable swish; when leaving, he glides away with a matching soft sound. Use restrained hover, paper-flutter, and mechanical sounds, with mute and reduced-motion controls.
- During long jobs, show him visibly working: navigating file stacks, pulling papers into a cyclone, sorting them into orderly groups, and returning with results. Keep progress truthful and don't fake completed work.
- Sam can communicate through short on-screen messages and, where supported and enabled, spoken narration and two-way microphone interaction. Voice controls must be explicit and optional.
- The character should feel enjoyable to adults: polished animation, expressive movement, subtle humour, and no childish interface clutter.

## File understanding and intelligence requirements

Sam must go beyond sorting by filename. The target workflow is to build a searchable understanding of the user's authorised library:

- **Images:** generate descriptive captions and searchable visual tags; recognise specific objects or characters only when the model has sufficient confidence, and flag uncertain identifications for review.
- **Documents:** extract available text from supported formats, create a concise topic summary, and derive useful search terms and suggested filenames. Support should be added deliberately for PDF, DOCX, XLSX/CSV, and plain text, with clear messages for scanned documents that require OCR.
- **Organisation:** propose meaningful folder locations and filenames using content, metadata, and user rules; show a reviewable plan before making changes.
- **Large libraries:** scan in batches, retain a resumable index, report progress, detect duplicates, and let users search previously indexed content without rescanning everything.
- **Accuracy and privacy:** clearly distinguish observed facts from guesses, show confidence or uncertainty where useful, respect account permissions, and never silently delete files.

These are implementation requirements and planned capabilities. Existing project limitations still apply until each format, recognition path, and large-library workflow is implemented and tested.


## Sam's personality and presentation refinement

Sam should look polished at first glance, but with a slightly dishevelled, hard-case edge: crisp white shirt and tailored waistcoat, tousled hair, visible under-eye bags, and the attractive, tired look of someone who's been up all night sorting out everybody else's mess. He is adult-coded, handsome, cheerful, accommodating, and faintly dodgy in a charming way. His humour comes from that contrast between formal presentation and irreverent attitude. Avoid a generic children's cartoon or spotless, stiff butler aesthetic.

Visual mood reference supplied by the creator: the bellboy character in Rebecca Black's *Hot Wet Delirious* music video. Use the creator's description as the guide until a reference image can be supplied; do not claim to have inspected the video or exact costume details.

Sam should greet users warmly and naturally, for example: "Hello, nice to see you. What can I do for you today?" On exit, he can say: "Thanks for visiting. See you next time. Hope you enjoy the rest of your day." Dialogue should vary naturally, stay brief, and feel accommodating rather than repetitive or scripted. His humour should be cheeky and occasionally a little dodgy, but never at the user's expense. He should not interrupt focused work with unnecessary chatter. The user can mute voice and sounds.


## Sam's final character direction: bellboy, age 21

Sam is explicitly an adult, around 21. His look should follow the bellboy outfit from Rebecca Black's *Hot Wet Delirious* reference: use the creator's intended bellboy uniform as the core costume, adapted for Sam's hovering character. Keep the tailored, formal silhouette, but make him a little rumpled and lived-in: tired under-eyes, slightly messy hair, a mischievous expression, and the energy of a cheerful young party boy who's somehow also an exceptionally capable file librarian. He is cute and attractive, a little cheeky and hard-case, but welcoming and professional when helping.

The character should feel adult, stylish, and knowingly playful, not juvenile or overly polished. His party-boy energy appears through expressions, movement, timing, and occasional dry jokes, not constant noise or interruptions. Preserve the greeting/farewell behaviour and sound controls already specified above.

The exact costume details should be checked against a supplied screenshot or reference image before final visual implementation. Until then, this description is the approved direction, not a claim that the reference image has been inspected.
