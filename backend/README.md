# Google Sheets Adapter Backend

This Express server acts as a REST API bridge between the frontend and Google Sheets.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up Google Sheets API:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API
   - Create a Service Account
   - Download the service account key JSON file
   - Save it as `service-account-key.json` in the `backend/` directory
   - Share your Google Sheet with the service account email (found in the JSON file)

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add:
   - `GOOGLE_SPREADSHEET_ID`: The ID from your Google Sheets URL
   - `GOOGLE_SERVICE_ACCOUNT_KEY_FILE`: Path to your service account key (default: `./service-account-key.json`)

4. **Set up your Google Sheet:**
   Create sheets named:
   - `Jobs` - with columns: id, title, company, location, type, salary, description, requirements, postedBy, createdAt, updatedAt
   - `Spotlight` - with columns: jobId, priority, paid
   - `PostingRequests` - with columns: id, company, jobTitle, amountPaid, status, createdAt
   - `Supporters` - with columns: userId, name, email, amount, supportedAt, isSupporter

5. **Run the server:**
   ```bash
   npm run dev  # Development mode with auto-reload
   # or
   npm start    # Production mode
   ```

The API will be available at `http://localhost:3001`

## API Endpoints

- `GET /jobs` - Fetch all jobs
- `POST /jobs` - Create a new job
- `PATCH /jobs/:id` - Update a job
- `DELETE /jobs/:id` - Delete a job
- `GET /spotlight` - Fetch spotlight jobs
- `GET /posting-requests` - Fetch posting requests
- `GET /supporters` - Fetch supporters
- `POST /supporters` - Create/update supporter
- `DELETE /supporters/:userId` - Remove supporter
- `GET /health` - Health check

