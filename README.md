# Mashup Generator: Web Service

A full-stack web application that offers "Mashup-as-a-Service." It provides a modern GUI for the mashup generation engine and handles delivery via email.

**Live Demo:** [https://mashup-web-app.vercel.app/](https://mashup-web-app.vercel.app/)

## Architecture & Methodology
The project implements a Client-Server architecture to handle long-running background tasks:

### 1. Frontend Layer (Next.js)
* **Input Handling:** A React-based form collects user parameters (Artist, Count, Duration, Email).
* **Validation:** Client-side checks ensure email format validity and that numeric inputs meet the minimum thresholds ($N>10$, $Y>20$) before submission.
* **API Interaction:** Sends a `POST` request to the Flask backend and manages UI states (Loading/Success/Error).

### 2. Backend Layer (Flask)
The Python backend serves as the core processing engine:
* **Request Handling:** The `/generate` endpoint receives the payload and triggers the processing logic.
* **Scraping & Processing:** Reuses the core logic from the CLI tool (Scrape $\to$ Download $\to$ Trim $\to$ Merge) but runs it within a server context.
* **Concurrency:** Utilizes threading or asynchronous handling to prevent the server from timing out during the download phase.

### 3. Delivery System (Post-Processing)
* **Compression:** As per assignment requirements, the final `.mp3` file is not sent directly. It is compressed into a **ZIP archive** (`mashup.zip`).
* **SMTP Transport:** The backend establishes a secure connection with an SMTP server (e.g., Gmail) to dispatch the ZIP file as an attachment to the user's provided email address.

## Tech Stack
* **Frontend:** Next.js 14, Tailwind CSS
* **Backend:** Flask (Python)
* **Core Engine:** FFmpeg, yt-dlp
* **Services:** SMTP (Email), Vercel (Deployment)

## Local Development Setup

### Backend (Flask)
The backend requires system-level audio tools.
```bash
cd backend
pip install -r requirements.txt
# Create .env file with EMAIL_USER and EMAIL_PASS
python app.py

```

### Frontend (Next.js)

```bash
npm install
npm run dev

```

> [!NOTE]
> The mashup generation process involves downloading and processing multiple audio files. This task is network-intensive. Depending on the server load and the number of songs requested, the email may take 1-3 minutes to arrive after submission.
