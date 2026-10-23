const fs = require("node:fs");
const html = fs.readFileSync("index.html", "utf8");
const parts = html.split("<script>");
if (parts.length < 2 || !parts[1].includes("</script>")) throw new Error("Inline application script is missing");
const source = parts[1].split("</script>")[0];
new Function(source);
const ids = [...html.matchAll(new RegExp('id="([^"]+)"', "g"))].map(m => m[1]);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
const references = source.split("$('").slice(1).map(part => part.split("'")[0]);
const missing = [...new Set(references.filter(id => !ids.includes(id)))];
if (missing.length) throw new Error("JavaScript references missing HTML IDs: " + missing.join(", "));
if (duplicates.length) throw new Error("Duplicate HTML IDs: " + [...new Set(duplicates)].join(", "));
for (const id of ["askForm", "askInput", "drivePanel", "driveAccount", "identifyDriveImagesBtn", "fileInput"]) if (!ids.includes(id)) throw new Error("Required control missing: " + id);
if (/method\s*:\s*['"]DELETE['"]/.test(source)) throw new Error("Direct DELETE request detected");
console.log("PASS: JavaScript syntax");
console.log("PASS: " + ids.length + " unique HTML IDs");
console.log("PASS: all " + new Set(references).size + " JavaScript element references exist");
console.log("PASS: required librarian, Drive, image-identification and local-file controls");
console.log("PASS: no direct DELETE request in app script");


const requiredFunctions = [
  "addFiles", "makePlan", "renderPlan", "hash", "assistantSearch",
  "listDriveFiles", "identifyDriveImages", "buildDrivePlan",
  "ensureDriveFolder", "renderDriveAccounts"
];
for (const name of requiredFunctions) {
  if (!new RegExp("(?:async\\s+)?function\\s+" + name + "\\s*\\(").test(source)) {
    throw new Error("Required operational function missing: " + name);
  }
}
for (const id of [
  "startBtn", "analyseBtn", "exportBtn", "planCsvBtn", "deleteReviewBtn",
  "askForm", "speakBtn", "connectDriveBtn", "scanDriveBtn", "scanAllDriveBtn",
  "identifyDriveImagesBtn", "drivePlanBtn", "driveApplyBtn", "driveUndoBtn", "clearDriveBtn"
]) {
  if (!new RegExp("\\$\\(['\\\"]" + id + "['\\\"]\\)\\s*(?:\\.onclick|\\.addEventListener)").test(source)) {
    throw new Error("Required action is not wired to an event: " + id);
  }
}
if (!source.includes("Organised copy created") || !source.includes("window.JSZip")) {
  throw new Error("Organised-copy ZIP export path is missing");
}
if (!source.includes("SHA-256") || !source.includes("crypto.subtle.digest")) {
  throw new Error("Exact duplicate hashing is missing");
}
if (!source.includes("No files will be deleted") || !source.includes("Deletion review only")) {
  throw new Error("Duplicate review safety messaging is missing");
}
if (!source.includes("removeParents") || !source.includes("addParents") || !source.includes("method:'PATCH'")) {
  throw new Error("Drive move/rename and undo request path is missing");
}
console.log("PASS: required file, search, image and Drive operational functions exist");
console.log("PASS: core user actions are wired to click/submit handlers");
console.log("PASS: ZIP export, SHA-256 duplicate checks and Drive move/undo paths are present");
console.log("PASS: duplicate review explicitly avoids deletion");
