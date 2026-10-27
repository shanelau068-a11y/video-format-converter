# video-format-converter：AI接手入口

浏览器本地视频格式转换器，使用FFmpeg.wasm输出H.264/AAC MP4。

1. 读 [项目运行与接手说明](docs/AI_HANDOFF.md)，确认入口、应用目录、依赖和数据边界。
2. 读 [本轮实际验证记录](docs/VERIFICATION.md)，区分已测功能与需要素材/密钥/桌面环境的功能。
3. 读根目录AGENTS.md及下层约定，再按用户本次目标修改。

视频只在本机浏览器处理；vendor/是已发布的运行资源，npm run vendor按锁定依赖更新资源，不能当作新的业务视频。
