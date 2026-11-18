/**
 * Chauhan Software Hub — saves every Enquiry / Demo Request from the website into this Google Sheet.
 *
 * SETUP (one time):
 * 1. Open the Google Sheet → Extensions → Apps Script.
 * 2. Delete everything in Code.gs, paste this whole file, click Save.
 * 3. Deploy → New deployment → ⚙ Select type → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    → Deploy → Authorize access (choose your Google account → Advanced → Go to project → Allow).
 * 4. Copy the "Web app URL" (ends with /exec) and paste it into src/data/site.js → SHEET_URL.
 *
 * If you change this script later: Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy
 * (the URL stays the same).
 */

// Leave "" to use the first tab of the sheet, or write a tab name, e.g. "Enquiries".
const SHEET_NAME = "";

// Column title → field sent by the website. Rename titles freely; the order here is used only when the sheet is empty.
const COLUMNS = [
  ["Date & Time", "timestamp"],
  ["Type", "type"],
  ["Name", "name"],
  ["Mobile", "mobile"],
  ["Business Name", "business"],
  ["Interested Software", "software"],
  ["Users / Branches", "users"],
  ["Preferred Demo Time", "time"],
  ["Requirements", "requirements"],
  ["Page", "page"],
  ["Status", "status"],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Hidden "website" field is only filled by spam bots.
    if (data.website) return json({ ok: true });
    if (!data.name || !data.mobile) return json({ ok: false, error: "Missing name or mobile" });

    data.timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy hh:mm a");
    data.status = "New";

    const sheet = getSheet();
    const headers = ensureHeaders(sheet);
    const byTitle = {};
    COLUMNS.forEach(([title, key]) => (byTitle[title.toLowerCase()] = key));

    const row = headers.map((h) => {
      const key = byTitle[String(h).trim().toLowerCase()];
      return key ? clean(data[key]) : "";
    });
    sheet.appendRow(row);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Open the Web app URL in a browser to check the script is live.
function doGet() {
  return json({ ok: true, message: "Chauhan Software Hub enquiry endpoint is live" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!SHEET_NAME) return ss.getSheets()[0];
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

// Writes the header row if the sheet is empty, and adds any of our columns that are missing.
function ensureHeaders(sheet) {
  const lastCol = sheet.getLastColumn();
  let headers = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
  if (headers.every((h) => String(h).trim() === "")) headers = [];

  const have = headers.map((h) => String(h).trim().toLowerCase());
  const missing = COLUMNS.map((c) => c[0]).filter((t) => have.indexOf(t.toLowerCase()) === -1);
  if (missing.length) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
    headers = headers.concat(missing);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return headers;
}

// Keeps text as text: stops values like "+91…" or "=…" being read as numbers or formulas.
function clean(v) {
  const s = v === undefined || v === null ? "" : String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
