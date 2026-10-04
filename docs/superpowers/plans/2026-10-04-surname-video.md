# 中国姓氏演变动画 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有工程交付《姓氏｜名字之前的历史》完整六段带字幕动画预览。
**Architecture:** 新增SurnameEvolution composition；集中维护脚本时码和主题，六个场景只处理各自局部帧。复用现有Remotion工程，保留HelloWorld。
**Tech Stack:** React19、TypeScript5.9、Remotion4.0.530、SVG。
**Spec:** docs/superpowers/specs/2026-10-04-surname-video-design.md
**Status:** 待用户审阅计划并选择执行方式。第一阶段无配音；本计划不宣称最终有声成片完成。

## Global Constraints
- 1920×1080、30fps、3600帧；区间0/450/1200/1800/2550/3240/3600。
- 深色#101315、主文字#F2EBDD、朱红#D64C3F、次要文字#A6AAA9。
- 横向安全边距120px；字幕44px；主体与字幕分区。
- 旁白使用docs/surname-video-draft.md完整文本，不添加未经核实的谱系结论。
- 保留现有代码；所有Remotion依赖固定4.0.530；不重新初始化用户工程。
- 帧驱动动画，不用计时器或非确定随机数。
- 先无配音预览，预览状态在Studio作品名或说明中明确，后续音频以实际文件及测量时长接入。
- 修改、验证、提交结果逐阶段写入vibe-science-progress.md。

## Review Focus
- 首帧和最后帧：字幕与画面能读，不能全黑结束；任务2检查。
- 场景交界：时码连续，无残留的上一句字幕；任务1及2检查。
- 中文字体缺失：提供系统回退，导出前固定字体；任务2检查。
- 最长字幕：最多两行，不越过120px安全边距；任务2检查。
- 没有配音文件：仍能正常加载和播放全部场景；任务3检查。

## Task 1: 时间轴与字幕数据
**Files:** Create src/SurnameEvolution/script.ts, src/SurnameEvolution/theme.ts, scripts/check-surname-timeline.ts.
**Interfaces:** script.ts导出SceneId、CaptionCue（start:number,end:number,text:string）、SceneTiming（id:SceneId,start:number,duration:number）、SCENES、CAPTIONS、TOTAL_FRAMES=3600、FPS=30；theme.ts导出THEME颜色与FONT_FAMILY。
- [ ] 读取最新仓库、规格、package及锁文件和AGENTS.md，创建隔离工作分支；检查并保留已有改动。
- [ ] 使用现有npm锁文件安装依赖；读取npm audit --json并记录具体受影响依赖，不自动强制修复。
- [ ] 写时码校验：场景边界等于[0,450,1200,1800,2550,3240,3600]；字幕start<end，互不重叠且都在0至3600内；旁白所有句子都保留。
- [ ] 在实现数据前运行校验，确认因缺少数据文件而失败。
- [ ] 创建六段时码与按句拆分字幕，旁白停顿处允许无字幕，字幕不跨场景边界；创建主题常量。
- [ ] 用Node原生TypeScript支持运行脚本（node --experimental-strip-types scripts/check-surname-timeline.ts），通过后保存阶段提交。

## Task 2: 六段画面与共享字幕
**Files:** Create src/SurnameEvolution/components/Frame.tsx, components/Captions.tsx, scenes/Opening.tsx, scenes/Branches.tsx, scenes/Convergence.tsx, scenes/Reform.tsx, scenes/Migration.tsx, scenes/Closing.tsx, index.tsx; modify src/Root.tsx.
**Interfaces:** 每个场景导出无必填props的React组件，使用局部useCurrentFrame；Captions接受frame:number；SurnameEvolution为注册组件。消耗Task1的SCENES、CAPTIONS和THEME。
- [ ] 阅读Remotion创建、markup和captions技能；通过现有配置与源码确定组件注册方式。
- [ ] 实现Frame公共背景及安全区域、Captions按当前全局帧挑选字幕。
- [ ] 按规格实现Opening、Branches、Convergence：文字出现、树状线条生长、先秦至秦汉时间线与合流。
- [ ] 按规格实现Reform、Migration、Closing：拓跋至元转换、无边界地理意象与“迁徙意象”标注、最终落版。使用无边界意象避免绘制未经核对的行政地图。
- [ ] index.tsx用Sequence串联六场景，在Root.tsx新增SurnameEvolution，保留原有作品。
- [ ] 运行npm run lint；解决所有本次新增类型和lint错误。
- [ ] 开启Studio无自动打开浏览器；检查代表帧225/825/1500/2175/2895/3420，以及每个边界前后1帧和最后一帧。
- [ ] 在同一批视觉检查中核验最长字幕的两行限制、字体回退、首尾可读性；保存修正后的阶段提交。

## Task 3: 交付预览与恢复检查点
**Files:** Create docs/surname-preview.md; update vibe-science-progress.md and this plan.
**Interfaces:** 从前两任务获得SurnameEvolution作品及验证记录。提供Windows拉取与预览命令，不改动用户原有代理配置。
- [ ] Studio中播放作品到结尾，确认无音频文件也能运行；若环境阻塞，记录确切原因并交给用户验证，不能标为通过。
- [ ] 全部通过后保存代码到GitHub，读回核心文件核验；保护用户分支更新，不强推。
- [ ] 文档写明1920×1080/30fps/120秒、无配音预览、六段内容、剩余配音/导出及漏洞处置状态。
- [ ] 给用户空闲CMD中的pull命令与SurnameEvolution预览入口；同时更新检查点及本计划复选框。
- [ ] 用户审阅视觉预览后，继续音频阶段：先试音或接收朗读音频，再校准时码。实际音频来源确定后编写音频整合计划，不阻塞当前完整视觉交付。

## 自查
全部六段、字体、字幕、准确性边界、无音频运行、代码检查、视觉检查、备份续接均对应任务。第一阶段不包含MP4导出；规格中的最终配音、SRT与MP4属于视觉审阅后的第二阶段。不得把阶段一完成称为全部成片完成。
