import {
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
  rowsToObjects,
  objectToRow,
} from './lib/sheets.js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { method } = req
  const { id } = req.query

  try {
    if (method === 'GET') {
      // GET /api/jobs - Fetch all jobs
      const rows = await getSheetData('Jobs!A:Z')
      const jobs = rowsToObjects(rows)
      return res.status(200).json(jobs)
    }

    if (method === 'POST') {
      // POST /api/jobs - Create a new job
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
      return res.status(200).json(job)
    }

    if (method === 'PATCH' && id) {
      // PATCH /api/jobs/:id - Update a job
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
      return res.status(200).json(updatedJob)
    }

    if (method === 'DELETE' && id) {
      // DELETE /api/jobs/:id - Delete a job
      const rows = await getSheetData('Jobs!A:Z')
      const jobs = rowsToObjects(rows)
      const jobIndex = jobs.findIndex((j) => j.id === id)

      if (jobIndex === -1) {
        return res.status(404).json({ error: 'Job not found' })
      }

      await deleteRow('Jobs', jobIndex + 2)
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Error in jobs handler:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

