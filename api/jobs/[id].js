import {
  getSheetData,
  updateRow,
  deleteRow,
  rowsToObjects,
  objectToRow,
} from '../lib/sheets.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { method } = req
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Job ID is required' })
  }

  try {
    if (method === 'PATCH') {
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

    if (method === 'DELETE') {
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
    console.error('Error in jobs/[id] handler:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

