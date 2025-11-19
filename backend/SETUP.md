# Quick Setup Guide

## Step 1: Get Your Google Sheets Spreadsheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
3. Copy the `SPREADSHEET_ID` part

## Step 2: Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "sheets-adapter")
   - Click "Create and Continue"
   - Skip optional steps and click "Done"
5. Create a Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON"
   - Download the JSON file
   - Save it as `service-account-key.json` in the `backend/` folder

## Step 3: Share Your Google Sheet

1. Open the downloaded JSON file
2. Find the `client_email` field (looks like: `your-service-account@project-id.iam.gserviceaccount.com`)
3. Open your Google Sheet
4. Click "Share" button
5. Paste the service account email
6. Give it "Editor" permissions
7. Click "Send"

## Step 4: Configure Backend

1. Create `backend/.env` file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `backend/.env`:
   ```
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
   GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./service-account-key.json
   PORT=3001
   ```

3. Make sure `service-account-key.json` is in the `backend/` folder

## Step 5: Set Up Your Google Sheet Tabs

Create these tabs (sheets) in your Google Sheet with the following columns:

### Tab: "Jobs"
Headers: `id`, `title`, `company`, `location`, `type`, `salary`, `description`, `requirements`, `postedBy`, `createdAt`, `updatedAt`

### Tab: "Spotlight"
Headers: `jobId`, `priority`, `paid`

### Tab: "PostingRequests"
Headers: `id`, `company`, `jobTitle`, `amountPaid`, `status`, `createdAt`

### Tab: "Supporters"
Headers: `userId`, `name`, `email`, `amount`, `supportedAt`, `isSupporter`

## Step 6: Start the Backend

```bash
cd backend
npm run dev
```

The server will run on `http://localhost:3001`

## Step 7: Test the Connection

Visit `http://localhost:3001/health` - you should see:
```json
{"status":"ok","timestamp":"..."}
```

## Troubleshooting

- **"Permission denied"**: Make sure you shared the Google Sheet with the service account email
- **"Spreadsheet not found"**: Check that `GOOGLE_SPREADSHEET_ID` is correct
- **"API not enabled"**: Make sure Google Sheets API is enabled in Google Cloud Console

