---
name: video-qa
description: Diagnose why a video cannot play and recommend a compatible MP4 conversion. Use when users mention unplayable videos, unsupported formats or codecs, format incompatibility, or a need to transcode video.
---

# Video QA

Diagnose the actual container and stream codecs before suggesting a conversion. Do not infer the codec from the filename extension alone.

## Workflow

1. Obtain the video file or an `ffprobe` report. If neither is available, ask the user to attach the file or run:

   ```sh
   ffprobe -v error -show_format -show_streams -of json INPUT
   ```

2. Inspect and report:
   - container/format name;
   - video codec, profile, pixel format, resolution, frame rate, and bitrate;
   - audio codec, channel count, sample rate, and bitrate;
   - whether the file has video/audio streams and whether probe output reports errors.

3. Explain the likely cause in plain language. Common causes include HEVC/H.265 or AV1 unsupported by the player, 10-bit or 4:2:2 pixel formats, an unsupported audio codec, a damaged file, or an MP4 container with incompatible stream metadata.

4. Recommend the safest output: MP4 container, H.264 video, AAC audio, and `yuv420p` pixel format. State that re-encoding can take time and may reduce quality; preserve the original file.

## Conversion Commands

Use a high-quality, broad-compatibility conversion unless the user gives a target device with stricter requirements:

```sh
ffmpeg -i INPUT -map 0:v:0 -map 0:a? -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -profile:v high -c:a aac -b:a 192k -movflags +faststart OUTPUT-compatible.mp4
```

If the streams are already H.264 video, AAC audio, and `yuv420p`, try remuxing first to avoid quality loss:

```sh
ffmpeg -i INPUT -c copy -movflags +faststart OUTPUT-remuxed.mp4
```

Use re-encoding when remuxing does not solve playback, or when codecs, profile, pixel format, or audio are incompatible.

## Response Format

Respond in this order: detected media details, likely playback issue, recommended action, then the exact command or application setting. Clearly label uncertainty when the file or probe output is unavailable.
