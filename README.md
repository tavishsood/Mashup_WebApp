# 🎵 Mashup Generator

A full-stack web application that creates custom audio mashups by processing songs from YouTube. Users provide four simple inputs, and the system automates the downloading, trimming, merging, and emailing of the final mix.

🔗 **Live Demo:** [https://mashup-x1jv.vercel.app/](https://mashup-x1jv.vercel.app/)

## 📖 About The Project

This application streamlines the process of creating "mashups" (combining multiple songs). It connects a **Next.js** frontend with a **Flask** backend to perform complex audio processing tasks.

**How it works:**

1. **Input:** User provides Artist Name, Number of Songs, Duration ( seconds), and Email.
2. **Processing:** The backend scrapes the top  songs from YouTube, downloads them, extracts the **first  seconds** of each track, and merges them using **FFmpeg**.
3. **Delivery:** The final MP3 file is emailed to the user as an attachment.

## 📂 Project Structure

```text
/mashup
├── backend/
│   └── app.py            # Flask server entry point
├── app/                  # Next.js App Router directory
│   ├── page.tsx          # Main UI
│   ├── layout.tsx
│   └── globals.css
├── output/               # Temporary storage for processing
│   ├── mp3_clips/
│   ├── videos/
│   └── merged_audio.mp3
├── main.py               # Core logic / CLI script
├── pyproject.toml        # Python configuration & dependencies
├── uv.lock               # Python lockfile (managed by uv)
├── package.json          # Frontend dependencies
├── bun.lock              # Frontend lockfile (managed by Bun)
├── next.config.ts        # Next.js configuration
└── ...

```

## 🛠️ Tech Stack

### Frontend

* **Next.js 14+** (App Router)
* **Bun** (Package Manager & Runtime)
* **Tailwind CSS**

### Backend

* **Python**
* **Flask**
* **uv** (Fast Python package installer)
* **FFmpeg** (Audio manipulation)
* **yt-dlp** (YouTube media extraction)

## ⚙️ Prerequisites

Before running the project locally, ensure you have the following installed:

1. **FFmpeg** (Critical for audio processing)
* *Windows:* Download and add to System PATH.
* *Mac:* `brew install ffmpeg`
* *Linux:* `sudo apt install ffmpeg`


2. **Bun** (For frontend)
3. **Python 3.8+** & **uv** (Recommended for backend speed)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mashup-generator.git
cd mashup-generator

```

### 2. Backend Setup

This project uses `uv` for fast dependency management, but standard pip works too.

**Create Environment & Install:**

```bash
# Using uv (Recommended based on your file structure)
uv sync

# OR using standard pip
pip install -r requirements.txt  # (If you generated one)

```

**Configure Environment Variables:**
Create a `.env` file in the root (or backend folder depending on `app.py` config) containing your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

```

**Run the Server:**

```bash
# Pointing to the backend app
python backend/app.py

```

### 3. Frontend Setup

```bash
# Install dependencies
bun install

# Run development server
bun dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 📝 Usage

1. Enter the **Artist Name** (e.g., *Daft Punk*).
2. Enter the **Number of Songs** (e.g., *5*).
3. Enter the **Duration** (e.g., *20*). This will take the **first 20 seconds** of each song.
4. Enter your **Email Address**.
5. Click **Generate Mashup**. The backend will process the request and email you the result.

## ⚠️ Limitations

* **YouTube Rate Limiting:** YouTube frequently blocks IP addresses that make automated download requests. If the generation fails, it is likely due to a temporary IP block from YouTube.
* **Processing Time:** Generating a mashup takes time depending on internet speed and the number of songs requested.

## 📄 License

Distributed under the MIT License.
