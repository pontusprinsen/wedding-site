// Code.gs - Google Apps Script for wedding website API

// Configuration
const SHEET_ID = '1fIz3Zoc703d4yAjWIM8uKxXwnpR5mGOItW7d2xiHjkE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'guests'; // Sheet tab name

// Helper: Get sheet data
function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

// Helper: Fuzzy name match (simple case-insensitive; enhance with Fuse.js if needed)
function findGuest(name) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const normalizedInput = name.toLowerCase().replace(/\s+/g, ' ').trim();
  
  for (let i = 1; i < data.length; i++) { // Skip header row
    const sheetName = data[i][0]?.toString().replace(/\s+/g, ' ').toLowerCase().trim(); // Column A: Full Name
    if (sheetName && sheetName === normalizedInput) { // Simple substring match; adjust for exact/fuzzy
      return {
        row: i + 1,
        name: data[i][0],
        groupId: data[i][1], // Column B: Group ID
        rsvp: data[i][2], // Column C: RSVP Status
        dietary: data[i][3], // Column D: Dietary Restrictions
        transport: data[i][4] // Column E: Transport Needs
      };
    }
  }
  return null;
}

// Helper: Get group members by Group ID
function getGroupMembers(groupId) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const members = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] == groupId) { // Column B: Group ID
      members.push({
        name: data[i][0],
        groupId: data[i][1], // Add groupId
        rsvp: data[i][2],
        dietary: data[i][3],
        transport: data[i][4]
      });
    }
  }
  return members;
}

// GET: Verify guest (action=verify&name=...)
function doGet(e) {
  const action = e.parameter.action;
  const name = e.parameter.name;
  
  if (action === 'verify' && name) {
    const guest = findGuest(name);
    if (guest) {
      const group = getGroupMembers(guest.groupId);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, group: group }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Name not found. Please check spelling.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, message: 'Invalid request.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// POST: Submit RSVP (action=rsvp, body: JSON with group updates)
function doPost(e) {
  try {
    const action = e.parameter.action;
    Logger.log('doPost called with action: ' + action);
    Logger.log('Post data: ' + e.postData.contents);
    const data = JSON.parse(e.postData.contents); // Expected: { groupId: '123', updates: [{ name: 'John', rsvp: 'yes', dietary: 'vegan', transport: 'yes' }, ...] }
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    if (action === 'rsvp' && data.groupId && data.updates && Array.isArray(data.updates)) {
      const sheet = getSheet();
      const sheetData = sheet.getDataRange().getValues();
      
      data.updates.forEach(update => {
        for (let i = 1; i < sheetData.length; i++) {
          if (sheetData[i][0] === update.name && sheetData[i][1] == data.groupId) { // Match name and group
            sheet.getRange(i + 1, 3).setValue(update.rsvp); // Column C: RSVP
            sheet.getRange(i + 1, 4).setValue(update.dietary); // Column D: Dietary
            sheet.getRange(i + 1, 5).setValue(update.transport); // Column E: Transport
            break;
          }
        }
      });
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'RSVP updated successfully!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Invalid RSVP data. Missing groupId or updates.' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Server error: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}