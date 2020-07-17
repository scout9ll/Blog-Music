import rough from "./rough";
let audioElement,
  audioCtx,
  analyser,
  source,
  bufferLength,
  dataArray,
  frameID,
  rc,
  canvasCtx;
//获取媒体元素,用来生成声音源
function drawShadow(id) {
  const canvas = document.getElementById(id);
  canvas.width = 350;
  canvas.height = 500;
  let canvasCtx = canvas.getContext("2d");
  canvasCtx.translate(25, 200);
  let rc = rough.canvas(document.getElementById(id));
  //layout
  rc.rectangle(5, 5, 300, 200, {
    strokeWidth: 5,
    fill: "#17120794",
    fillStyle: "solid" // solid fill
  });
  rc.line(5, 205, 105, 105);
  // button
  rc.rectangle(45, -15, 40, 20, {
    fill: "#17120794"
  });
  rc.rectangle(230, -15, 24, 20, {
    fill: "#17120794"
  });
  //view
  rc.rectangle(150, 30, 130, 80);
  // footer
  rc.rectangle(30, 207, 20, 10, { strokeWidth: 10 });
  rc.rectangle(230, 207, 20, 10, { strokeWidth: 10 });
}

function initAudio() {
  audioElement = document.querySelector("audio");
  // 设置允许跨域,audioContext连接对跨域有限制
  audioElement.crossOrigin = "anonymous";
  audioCtx = new AudioContext();
  //利用接口得到分析器
  analyser = audioCtx.createAnalyser();
  //得到音源
  source = audioCtx.createMediaElementSource(audioElement);
  // source=>middle
  source.connect(analyser);
  //middle=>termial
  analyser.connect(audioCtx.destination);
  // 设置傅里叶变化的参数,用来设置分析范围
  analyser.fftSize = 32;
  //根据范围得到不同音频的数量的长度
  bufferLength = analyser.frequencyBinCount;
  //生成8位为一个item,长度为bufferLength的array
  dataArray = new Uint8Array(bufferLength);
  const canvas = document.getElementById("canvas");
  canvas.width = 350;
  canvas.height = 500;
  canvasCtx = canvas.getContext("2d");
  canvasCtx.translate(25, 200);
  rc = rough.canvas(document.getElementById("canvas"));
  //layout
  rc.rectangle(5, 5, 300, 200, { strokeWidth: 5 });

  //view
  rc.rectangle(150, 30, 130, 80);
  // footer
  rc.rectangle(30, 207, 20, 10, { strokeWidth: 10 });
  rc.rectangle(230, 207, 20, 10, { strokeWidth: 10 });
  //soundMf
  rc.circle(70, 100, 100, {
    fill: "black",
    fillStyle: "cross-hatch"
  });
  drawShadow("canvas-shadow");
}
function drawBar() {
  canvasCtx.clearRect(150, 30, 130, 80);
  const bar_w = 130 / bufferLength;
  for (let i = 0; i < bufferLength; i++) {
    let bar_x = 150 + i * bar_w;
    let bar_h = ((dataArray[i] / 255) * 80) / 2;
    let bar_y = 30 + 80 - bar_h;

    rc.rectangle(bar_x, bar_y, bar_w, bar_h, { fill: "green" });
  }
}

//run it
function rockMusic() {
  // requestAnimationFrame 保证与屏幕刷新率一致,在每次执行时绘制canvas数据
  frameID = requestAnimationFrame(rockMusic);
  analyser.getByteFrequencyData(dataArray);
  drawBar();
}
// window.onload = initAudio;
// audioElement.onplay = () => audioCtx.resume().then(() => rockMusic());
// document
// .querySelector("button")
// .addEventListener("click", () => audioElement.play());
function getAudioCtx() {
  return audioCtx;
}
function getFrameID() {
  return frameID;
}
export default {
  initAudio,
  rockMusic,
  getAudioCtx,
  getFrameID
};
