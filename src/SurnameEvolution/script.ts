export type SceneId =
  | "Opening"
  | "Branches"
  | "Convergence"
  | "Reform"
  | "Migration"
  | "Closing";
export type CaptionCue = { start: number; end: number; text: string };
export type SceneTiming = { id: SceneId; start: number; duration: number };
export const FPS = 30;
export const TOTAL_FRAMES = 3720;
export const SCENES: SceneTiming[] = [
  {
    id: "Opening",
    start: 0,
    duration: 450,
  },
  {
    id: "Branches",
    start: 450,
    duration: 750,
  },
  {
    id: "Convergence",
    start: 1200,
    duration: 600,
  },
  {
    id: "Reform",
    start: 1800,
    duration: 750,
  },
  {
    id: "Migration",
    start: 2550,
    duration: 690,
  },
  {
    id: "Closing",
    start: 3240,
    duration: 480,
  },
];
export const CAPTIONS: CaptionCue[] = [
  {
    start: 3,
    end: 60,
    text: "你姓什么？",
  },
  {
    start: 63,
    end: 172,
    text: "这个问题，你几乎不用思考。",
  },
  {
    start: 175,
    end: 334,
    text: "但如果再问一句：这个姓，为什么会来到你身上？",
  },
  {
    start: 337,
    end: 445,
    text: "答案，就要向历史深处寻找。",
  },
  {
    start: 469,
    end: 580,
    text: "今天，我们把“姓氏”连在一起说。",
  },
  {
    start: 599,
    end: 783,
    text: "可在先秦，尤其是周代贵族的称谓中，姓与氏并不相同。",
  },
  {
    start: 802,
    end: 982,
    text: "姓标示较大的血缘群体，氏则区分其中的宗族分支。",
  },
  {
    start: 1001,
    end: 1179,
    text: "可以把它想象成一棵树：同一树干，也会长出不同枝条。",
  },
  {
    start: 1250,
    end: 1383,
    text: "到秦汉时期，两者的区别逐渐淡化。",
  },
  {
    start: 1433,
    end: 1569,
    text: "“姓”与“氏”，慢慢合流成了我们熟悉的姓氏。",
  },
  {
    start: 1619,
    end: 1750,
    text: "称呼的变化背后，是社会秩序的变化。",
  },
  {
    start: 1836,
    end: 1955,
    text: "但这条历史线，并没有从此静止。",
  },
  {
    start: 1991,
    end: 2149,
    text: "北魏孝文帝改革时，皇室的拓跋氏改为元氏。",
  },
  {
    start: 2185,
    end: 2359,
    text: "一个姓的改变，也留下了制度变迁与文化交融的痕迹。",
  },
  {
    start: 2395,
    end: 2516,
    text: "姓氏不只被继承，也会被改写。",
  },
  {
    start: 2591,
    end: 2748,
    text: "人们又带着这些姓，离开故土，建立新的家园。",
  },
  {
    start: 2789,
    end: 2984,
    text: "地图上的距离越来越远，一个熟悉的字，却可能被一代代保留下来。",
  },
  {
    start: 3025,
    end: 3199,
    text: "它像一条线，连接着曾经的生活，也连接着今天的我们。",
  },
  {
    start: 3247,
    end: 3358,
    text: "所以，当你再次说出“我姓什么”，",
  },
  {
    start: 3365,
    end: 3467,
    text: "你说出的，是自己的身份，",
  },
  {
    start: 3474,
    end: 3570,
    text: "也是一个值得继续追问的问题：",
  },
  {
    start: 3577,
    end: 3712,
    text: "在这个名字之前，发生过怎样的历史？",
  },
];
