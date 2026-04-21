// =============================================
// PASTE THIS INTO: Extensions > Apps Script
// Then: Deploy > Manage deployments > edit > new version > Deploy
// =============================================

function doGet(e) { return handleRequest(e); }
function doPost(e) { return handleRequest(e); }

function handleRequest(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var action = e.parameter.action;
  var result;
  if (action === 'get') { result = getData(sheet); }
  else if (action === 'save') { result = saveData(sheet, e.parameter); }
  else { result = { error: 'Unknown action' }; }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getData(sheet) {
  var row = sheet.getRange(2, 1, 1, 6).getValues()[0];
  return {
    streak:            Number(row[0]) || 0,
    lastCompletedDate: String(row[1] || ''),
    checked:           String(row[2] || '{}'),
    dayType:           String(row[3] || 'no-bath'),
    currentDate:       String(row[4] || ''),
    prizeWonDate:      String(row[5] || '')
  };
}

function saveData(sheet, params) {
  // Format date columns as plain text to prevent auto-conversion
  sheet.getRange(2, 2).setNumberFormat('@STRING@');
  sheet.getRange(2, 5).setNumberFormat('@STRING@');
  sheet.getRange(2, 6).setNumberFormat('@STRING@');

  sheet.getRange(2, 1).setValue(Number(params.streak) || 0);
  sheet.getRange(2, 2).setValue(String(params.lastCompletedDate || ''));
  sheet.getRange(2, 3).setValue(String(params.checked || '{}'));
  sheet.getRange(2, 4).setValue(String(params.dayType || 'no-bath'));
  sheet.getRange(2, 5).setValue(String(params.currentDate || ''));
  sheet.getRange(2, 6).setValue(String(params.prizeWonDate || ''));
  return { success: true };
}
