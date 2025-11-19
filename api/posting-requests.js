import { getSheetData, rowsToObjects } from './lib/sheets.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const rows = await getSheetData('PostingRequests!A:G')
    const requests = rowsToObjects(rows)
    return res.status(200).json(requests)
  } catch (error) {
    console.error('Error fetching posting requests:', error)
    return res.status(500).json({ error: 'Failed to fetch posting requests' })
  }
}

