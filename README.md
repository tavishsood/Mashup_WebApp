# 🌐 Mashup Generator Web Service

A full-stack web application that allows users to generate audio mashups via a graphical interface. The application processes requests asynchronously and delivers the final mashup directly to the user's email.

🔗 **Live Demo:** [https://mashup-x1jv.vercel.app/](https://mashup-x1jv.vercel.app/)

## ✨ Key Features
* **User-Friendly Interface:** Simple form inputs for Artist, Count, and Duration.
* **Email Delivery:** Integrates with SMTP to send the final mashup as an attachment.
* **Smart Compression:** Automatically zips the audio file before sending to ensure efficient delivery.
* **Input Validation:** Prevents submission of invalid parameters (e.g., Duration < 20s).

## 🛠️ Tech Stack
* **Frontend:** Next.js (React)
* **Backend:** Flask (Python)
* **Audio Processing:** FFmpeg & yt-dlp
* **Deployment:** Vercel

## ⚙️ Local Development

### 1. Backend Setup (Flask)
The backend handles the scraping and audio processing.
```bash
cd backend
pip install -r requirements.txt
# Create a .env file with EMAIL_USER and EMAIL_PASS
python app.py

```

### 2. Frontend Setup (Next.js)

The frontend handles the user UI and API communication.

```bash
cd frontend
npm install
npm run dev

```

## ⚠️ Note on Performance

The mashup generation process involves downloading and processing multiple audio files. Depending on the server load and the number of songs requested, the email may take a few minutes to arrive.
