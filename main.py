import os
import sys
import subprocess
from yt_dlp import YoutubeDL


def download_audio_from_youtube(search_term, video_count, download_dir):
    ydl_options = {
        "quiet": True,
        "format": "bestaudio/best",
        "outtmpl": f"{download_dir}/%(title)s.%(ext)s",
        "noplaylist": True,
    }

    with YoutubeDL(ydl_options) as ydl:
        ydl.download([f"ytsearch{video_count}:{search_term}"])


def extract_mp3_clips(input_dir, clip_duration, mp3_dir):
    os.makedirs(mp3_dir, exist_ok=True)

    for filename in os.listdir(input_dir):
        if not filename.lower().endswith((".mp4", ".webm", ".mkv", ".m4a")):
            continue

        input_path = os.path.join(input_dir, filename)
        output_name = os.path.splitext(filename)[0] + ".mp3"
        output_path = os.path.join(mp3_dir, output_name)

        ffmpeg_cmd = [
            "ffmpeg",
            "-y",
            "-i",
            input_path,
            "-t",
            str(clip_duration),
            "-vn",
            "-acodec",
            "mp3",
            output_path,
        ]

        subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def merge_mp3_files(mp3_dir, output_file):
    file_list_path = os.path.join(mp3_dir, "files.txt")

    with open(file_list_path, "w") as f:
        for mp3 in sorted(os.listdir(mp3_dir)):
            if mp3.endswith(".mp3"):
                f.write(f"file '{os.path.abspath(os.path.join(mp3_dir, mp3))}'\n")

    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        file_list_path,
        "-c",
        "copy",
        output_file,
    ]

    subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    if len(sys.argv) < 4:
        print('Usage: python script.py "search term" video_count clip_duration')
        sys.exit(1)

    search_term = sys.argv[1]
    video_count = int(sys.argv[2])
    clip_duration = int(sys.argv[3])

    base_output_dir = "output"
    raw_video_dir = os.path.join(base_output_dir, "videos")
    mp3_clip_dir = os.path.join(base_output_dir, "mp3_clips")
    merged_mp3_path = os.path.join(base_output_dir, "merged_audio.mp3")

    os.makedirs(raw_video_dir, exist_ok=True)

    print("🔽 Downloading videos...")
    download_audio_from_youtube(search_term, video_count, raw_video_dir)

    print("🎧 Extracting MP3 clips...")
    extract_mp3_clips(raw_video_dir, clip_duration, mp3_clip_dir)

    print("🔗 Merging MP3 files...")
    merge_mp3_files(mp3_clip_dir, merged_mp3_path)

    print(f"✅ Done! Merged audio saved as: {merged_mp3_path}")


if __name__ == "__main__":
    main()
