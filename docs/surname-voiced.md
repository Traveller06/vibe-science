# 《姓氏｜名字之前的历史》有声版 v1

2026-10-05。用户认可六幕视觉版后继续制作。普通话合成男声：zh-CN-YunxiNeural，edge-tts，rate=-8%。22句原稿未删改、没有克隆真人声音。

## 变化

- 全片124秒，1920×1080、30fps。前五幕时段不变，结尾延长4秒，容纳自然朗读与留白；3720帧。
- 每句话独立生成，FFmpeg解码PCM后测量长度，按场景剩余时间均匀分配句间停顿。字幕与声段对应，不再使用按文字长度估算的时间。
- 混入低音量原创合成五声音阶氛围底音与转场轻音，不包含采样歌曲；混音峰值约0.761，未削波。
- 中文字体已打包为Surname CJK子集；来源Noto Sans CJK SC，SIL OFL 1.1。授权文本位于public/surname/OFL.txt，原版权信息保留在字体元数据中。原字体来源：https://github.com/notofonts/noto-cjk/blob/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf ，许可来源：https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE 。
- 运行时只读取仓库内的字体与音轨，不需要实时访问配音服务。

## 用户预览

新开空闲CMD：

```bat
cd /d C:\Users\Lenovo\vibe-science
git -c http.proxy=http://127.0.0.1:7897 pull --ff-only
```

已开Studio就刷新 http://localhost:3000/SurnameEvolution ；否则执行 `npm run dev`。首次播放需点击播放键以解除浏览器自动播放限制，确认播放器未静音。

## 导出与恢复

```bat
npx remotion render src/index.ts SurnameEvolution out/surname-evolution-voiced-v1.mp4 --codec=h264 --crf=18 --audio-codec=aac
```

字幕：public/surname/surname.srt。音频：public/surname/soundtrack.ogg。准确帧点、音源与每句测量时长：public/surname/audio-manifest.json。只要拉取本提交，不需重新生成配音即可预览和导出。

若需要改变旁白，开发辅助脚本顺序为：generate-surname-voice.py、build-surname-soundtrack.py；依赖Python edge-tts/numpy与FFmpeg。音频原始分句缓存位于out/audio-work，属于可重建缓存，不是运行必要文件。改变文案时先清除对应的旧cue缓存再生成，重新审听专名读音与节奏。字体变更时按build-surname-font.py说明准备原字体及OFL，再生成子集。

Remotion依赖保持4.0.530。原10项开发工具链high未因配音任务强制升级。当前是首版合成配音成片，用户可根据试听更换音色或调整语气。
