// =============================================
// PASTE THIS INTO: Extensions > Apps Script
// =============================================

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var action = e.parameter.action;

  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  var result;

  if (action === 'get') {
    result = getData(sheet);
  } else if (action === 'save') {
    result = saveData(sheet, e.parameter);
  } else {
    result = { error: 'Unknown action' };
  }

  var output = ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

function getData(sheet) {
  var row = sheet.getRange(2, 1, 1, 5).getValues()[0];
  return {
    streak: Number(row[0]) || 0,
    lastCompletedDate: row[1] || '',
    checked: row[2] || '{}',
    dayType: row[3] || 'no-bath',
    currentDate: row[4] || ''
  };
}

function saveData(sheet, params) {
  sheet.getRange(2, 1).setValue(Number(params.streak) || 0);
  sheet.getRange(2, 2).setValue(params.lastCompletedDate || '');
  sheet.getRange(2, 3).setValue(params.checked || '{}');
  sheet.getRange(2, 4).setValue(params.dayType || 'no-bath');
  sheet.getRange(2, 5).setValue(params.currentDate || '');
  return { success: true };
}
