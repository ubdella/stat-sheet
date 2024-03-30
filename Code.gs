
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Cronbach\'s Alpha')
    .addItem('Calculate Cronbach\'s Alpha', 'callCronbach')
    .addToUi();
}

function callCronbach() {
  const webServiceUrl = 'https://stanalysis-d8b758efdb54.herokuapp.com/calculate_alpha';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  const data = range.getValues();
  const requestData = { 'data': data };
  const options = {
    'method': 'post',
    'payload': JSON.stringify(requestData),
    'contentType': 'application/json'
  };

 const response = UrlFetchApp.fetch(webServiceUrl, {
  headers: {
    Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
  },
  method: 'post',
  payload: JSON.stringify(requestData),
  contentType: 'application/json'
});

  if (response.getResponseCode() === 200) {
    const responseData = JSON.parse(response.getContentText());
    const alpha = responseData.result;

    // Get the first empty cell in column A
    let lastRow = sheet.getLastRow();
    let nextEmptyRow = lastRow + 1;
    let outputCell = sheet.getRange("A" + nextEmptyRow);

   
    outputCell.setValue("Alpha");

    // Write the to the next cell
    outputCell.offset(0, 1).setValue(alpha);
  } else {
    console.error('Error calling web service:', response.getContentText());
  }
}