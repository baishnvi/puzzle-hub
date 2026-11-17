// Google Sheet > Extensions > Apps Script mein paste karein > Deploy > Web app (Anyone) > URL copy karke config.js mein SHEET_URL mein daalein
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(["Time","Name","Email","Phone","Address","Total","Payment ID","Items"]);
  sh.appendRow([new Date(), d.n, d.e, d.p, d.a, d.t, d.payment, JSON.stringify(d.items)]);
  return ContentService.createTextOutput("ok");
}
