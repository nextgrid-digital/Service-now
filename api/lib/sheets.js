import { google } from 'googleapis'

// Initialize Google Sheets client
let sheetsClient = null
let spreadsheetId = null

export function initSheets() {
  if (sheetsClient) return sheetsClient

  spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

  if (!spreadsheetId) {
    console.warn('⚠️  GOOGLE_SPREADSHEET_ID not set. API will return empty data.')
    return null
  }

  // For Vercel, we'll use service account credentials from environment variables
  // or a base64 encoded key file
  let credentials = null

  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    // If key is provided as base64 encoded string
    try {
      credentials = JSON.parse(
        Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      )
    } catch (e) {
      // If it's already a JSON string
      try {
        credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
      } catch (e2) {
        console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY')
        return null
      }
    }
  }

  if (!credentials) {
    console.warn('⚠️  GOOGLE_SERVICE_ACCOUNT_KEY not set.')
    // Return a mock client that returns empty data instead of null
    // This allows the API to deploy even without credentials
    return null
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  sheetsClient = google.sheets({ version: 'v4', auth })
  return sheetsClient
}

export async function getSheetData(range) {
  const sheets = initSheets()
  if (!sheets || !spreadsheetId) return []

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })
    return response.data.values || []
  } catch (error) {
    console.error('Error reading sheet:', error)
    return []
  }
}

export async function appendRow(range, values) {
  const sheets = initSheets()
  if (!sheets || !spreadsheetId) return false

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [values] },
    })
    return true
  } catch (error) {
    console.error('Error appending row:', error)
    return false
  }
}

export async function updateRow(range, values) {
  const sheets = initSheets()
  if (!sheets || !spreadsheetId) return false

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [values] },
    })
    return true
  } catch (error) {
    console.error('Error updating row:', error)
    return false
  }
}

export async function deleteRow(sheetName, rowIndex) {
  const sheets = initSheets()
  if (!sheets || !spreadsheetId) return false

  try {
    const sheetId = await getSheetId(sheetName)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
            },
          },
        ],
      },
    })
    return true
  } catch (error) {
    console.error('Error deleting row:', error)
    return false
  }
}

async function getSheetId(sheetName) {
  const sheets = initSheets()
  if (!sheets || !spreadsheetId) return 0

  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    })
    const sheet = response.data.sheets.find((s) => s.properties.title === sheetName)
    return sheet?.properties.sheetId || 0
  } catch (error) {
    console.error('Error getting sheet ID:', error)
    return 0
  }
}

export function rowsToObjects(rows) {
  if (!rows || rows.length === 0) return []
  const headers = rows[0]
  return rows.slice(1).map((row) => {
    const obj = {}
    headers.forEach((header, index) => {
      obj[header] = row[index] || ''
    })
    return obj
  })
}

export function objectToRow(obj, headers) {
  return headers.map((header) => obj[header] || '')
}

