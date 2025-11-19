import {
  getSheetData,
  appendRow,
  deleteRow,
  rowsToObjects,
  objectToRow,
} from './lib/sheets.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { method } = req

  try {
    if (method === 'GET') {
      const rows = await getSheetData('Supporters!A:F')
      const supporters = rowsToObjects(rows)
      return res.status(200).json(supporters)
    }

    if (method === 'POST') {
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
      return res.status(200).json(supporter)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Error in supporters handler:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

