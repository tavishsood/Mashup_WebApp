import os
import subprocess
import uuid

from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from yt_dlp import YoutubeDL
from flask_cors import CORS

app = Flask(name)
CORS(app)

app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME="tsood_be23@thapar.edu",
    MAIL_PASSWORD="hkvxgkoaiyhlpnqt",
    MAIL_DEFAULT_SENDER="Tavish Sood",
)

mail = Mail(app)

BASE_DIR = "jobs"
os.makedirs(BASE_DIR, exist_ok=True)


def download_audio(search_query, n, out_dir):
    """Download audio files from SoundCloud using yt-dlp."""
    os.makedirs(out_dir, exist_ok=True)

    ydl_opts = {
        "quiet": True,
        "format": "bestaudio/best",
        "outtmpl": f"{out_dir}/%(id)s.%(ext)s",
        "nocheckcertificate": True,
        "http_headers": {
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            "Accept-Language": "en-US,en;q=0.9",
        },
    }

    with YoutubeDL(ydl_opts) as ydl:
        # SoundCloud search
        ydl.download([f"scsearch{n}:{search_query}"])


def merge_audio_files(audio_dir, output_path):
    """Merge multiple audio files into one MP3 using ffmpeg."""
    audio_files = sorted(
        f for f in os.listdir(audio_dir) if f.lower().endswith((".mp3", ".m4a", ".ogg", "opus"))
    )

    if not audio_files:
        raise RuntimeError("No audio files to merge")

    inputs = []
    for file in audio_files:
        inputs.extend(["-i", os.path.join(audio_dir, file)])

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            *inputs,
            "-filter_complex",
            f"concat=n={len(audio_files)}:v=0:a=1",
            "-acodec",
            "mp3",
            "-ab",
            "192k",
            output_path,
        ],
        check=True,
    )

    if not os.path.exists(output_path):
        raise RuntimeError("Merged audio file was not created")


def send_audio_email(to_email, audio_path, query):
    msg = Message(
        subject=f"Merged audio for '{query}'",
        recipients=[to_email],
        body=f"Attached is the merged audio file for your search: '{query}'.",
    )

    with open(audio_path, "rb") as f:
        msg.attach(
            filename="merged_audio.mp3",
            content_type="audio/mpeg",
            data=f.read(),
        )

    mail.send(msg)


@app.route("/process", methods=["POST"])
def process():
    data = request.get_json()
    required = {"query", "n", "email"}
    if not data or not required.issubset(data):
        return (
            jsonify({"error": "Expected JSON with 'query', 'n', and 'email'"}),
            400,
        )

    query = data["query"]
    n = int(data["n"])
    email = data["email"]

    job_id = str(uuid.uuid4())
    job_dir = os.path.join(BASE_DIR, job_id)
    audio_dir = os.path.join(job_dir, "audio")
    merged_audio_path = os.path.join(job_dir, "merged_audio.mp3")

    os.makedirs(audio_dir, exist_ok=True)

    try:
        download_audio(query, n, audio_dir)
        merge_audio_files(audio_dir, merged_audio_path)
  send_audio_email(email, merged_audio_path, query)

        return jsonify(
            {"status": "success", "message": f"Merged audio emailed to {email}"}
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if name == "main":
    app.run(host="0.0.0.0", port=6902, debug=True)