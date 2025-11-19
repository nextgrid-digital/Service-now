import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || './service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID

if (!SPREADSHEET_ID) {
  console.warn('⚠️  GOOGLE_SPREADSHEET_ID not set. API will return empty data.')
}

// Helper function to get sheet data
async function getSheetData(range) {
  if (!SPREADSHEET_ID) return []
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    })
    return response.data.values || []
  } catch (error) {
    console.error('Error reading sheet:', error)
    return []
  }
}

// Helper function to append row
async function appendRow(range, values) {
  if (!SPREADSHEET_ID) return false
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
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

// Helper function to update row
async function updateRow(range, values) {
  if (!SPREADSHEET_ID) return false
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
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

// Helper function to delete row
async function deleteRow(sheetName, rowIndex) {
  if (!SPREADSHEET_ID) return false
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: await getSheetId(sheetName),
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
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    })
    const sheet = response.data.sheets.find((s) => s.properties.title === sheetName)
    return sheet?.properties.sheetId || 0
  } catch (error) {
    console.error('Error getting sheet ID:', error)
    return 0
  }
}

// Convert sheet rows to objects (first row is headers)
function rowsToObjects(rows) {
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

// Convert object to row array
function objectToRow(obj, headers) {
  return headers.map((header) => obj[header] || '')
}

// ===== JOBS ENDPOINTS =====

// GET /jobs - Fetch all jobs
app.get('/jobs', async (req, res) => {
  try {
    const rows = await getSheetData('Jobs!A:Z')
    const jobs = rowsToObjects(rows)
    res.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// POST /jobs - Create a new job
app.post('/jobs', async (req, res) => {
  try {
    const job = req.body
    const headers = [
      'id',
      'title',
      'company',
      'location',
      'type',
      'salary',
      'description',
      'requirements',
      'postedBy',
      'createdAt',
      'updatedAt',
    ]
    const row = objectToRow(
      {
        id: job.id || crypto.randomUUID(),
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        type: job.type || '',
        salary: job.salary || '',
        description: job.description || '',
        requirements: job.requirements || '',
        postedBy: job.postedBy || '',
        createdAt: job.createdAt || new Date().toISOString(),
        updatedAt: job.updatedAt || '',
      },
      headers
    )
    await appendRow('Jobs!A:Z', row)
    res.json(job)
  } catch (error) {
    console.error('Error creating job:', error)
    res.status(500).json({ error: 'Failed to create job' })
  }
})

// PATCH /jobs/:id - Update a job
app.patch('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const rows = await getSheetData('Jobs!A:Z')
    const jobs = rowsToObjects(rows)
    const jobIndex = jobs.findIndex((j) => j.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }

    const updatedJob = { ...jobs[jobIndex], ...updates }
    const headers = rows[0]
    const row = objectToRow(updatedJob, headers)
    const range = `Jobs!A${jobIndex + 2}:Z${jobIndex + 2}`
    await updateRow(range, row)
    res.json(updatedJob)
  } catch (error) {
    console.error('Error updating job:', error)
    res.status(500).json({ error: 'Failed to update job' })
  }
})

// DELETE /jobs/:id - Delete a job
app.delete('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params
    const rows = await getSheetData('Jobs!A:Z')
    const jobs = rowsToObjects(rows)
    const jobIndex = jobs.findIndex((j) => j.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }

    await deleteRow('Jobs', jobIndex + 2)
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

// ===== SPOTLIGHT ENDPOINTS =====

app.get('/spotlight', async (req, res) => {
  try {
    const rows = await getSheetData('Spotlight!A:D')
    const spotlight = rowsToObjects(rows)
    res.json(spotlight)
  } catch (error) {
    console.error('Error fetching spotlight:', error)
    res.status(500).json({ error: 'Failed to fetch spotlight jobs' })
  }
})

// ===== POSTING REQUESTS ENDPOINTS =====

app.get('/posting-requests', async (req, res) => {
  try {
    const rows = await getSheetData('PostingRequests!A:G')
    const requests = rowsToObjects(rows)
    res.json(requests)
  } catch (error) {
    console.error('Error fetching posting requests:', error)
    res.status(500).json({ error: 'Failed to fetch posting requests' })
  }
})

// ===== SUPPORTERS ENDPOINTS =====

app.get('/supporters', async (req, res) => {
  try {
    const rows = await getSheetData('Supporters!A:F')
    const supporters = rowsToObjects(rows)
    res.json(supporters)
  } catch (error) {
    console.error('Error fetching supporters:', error)
    res.status(500).json({ error: 'Failed to fetch supporters' })
  }
})

app.post('/supporters', async (req, res) => {
  try {
    const supporter = req.body
    const headers = ['userId', 'name', 'email', 'amount', 'supportedAt', 'isSupporter']
    const row = objectToRow(
      {
        userId: supporter.userId || '',
        name: supporter.name || '',
        email: supporter.email || '',
        amount: supporter.amount || 0,
        supportedAt: supporter.supportedAt || new Date().toISOString(),
        isSupporter: supporter.isSupporter !== undefined ? supporter.isSupporter : true,
      },
      headers
    )
    await appendRow('Supporters!A:F', row)
    res.json(supporter)
  } catch (error) {
    console.error('Error creating supporter:', error)
    res.status(500).json({ error: 'Failed to create supporter' })
  }
})

app.delete('/supporters/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const rows = await getSheetData('Supporters!A:F')
    const supporters = rowsToObjects(rows)
    const supporterIndex = supporters.findIndex((s) => s.userId === userId)

    if (supporterIndex === -1) {
      return res.status(404).json({ error: 'Supporter not found' })
    }

    await deleteRow('Supporters', supporterIndex + 2)
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting supporter:', error)
    res.status(500).json({ error: 'Failed to delete supporter' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Sheets Adapter API running on http://localhost:${PORT}`)
  if (!SPREADSHEET_ID) {
    console.warn('⚠️  GOOGLE_SPREADSHEET_ID not configured')
  }
})

