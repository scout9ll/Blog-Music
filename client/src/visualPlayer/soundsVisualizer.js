import rough from "./rough";
let //audio 元素

  canvas, //canvasElement
  canvasCtx, //canvasContent
  rc;

class MusicBar {
  constructor(x, y, w, h, color, roughness) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.roughness = roughness;
  }
  update(frequencyVolume) {
    const bar_h = (frequencyVolume / 255) * canvas.height;

    canvasCtx.rotate(Math.PI / (32 / 2));
    rc.rectangle(this.x, this.y - bar_h / 4, this.w, bar_h / 4, {
      roughness: this.roughness,
      fill: this.color
    });
  }
  static create(bufferLength, container, detail = {}) {
    canvasCtx.restore();
    canvasCtx.save();
    canvasCtx.translate(canvas.width / 2, canvas.height / 2);
    rc = rough.canvas(canvas);
    for (let i = 0; i < bufferLength; i++) {
      // let bar_x = (i * canvas.width) / bufferLength;
      // let bar_h = 0;
      container.push(
        new MusicBar(
          0,
          -60,
          (4 * Math.PI * 60) / bufferLength,
          0,
          `rgb(${24 + 2 * i},${177 - i},${60 + 2 * i})`,
          1.5
        )
      );
    }
  }
}
class MusicBall {
  constructor(x, y, speedX, speedY, radius, color) {
    this.x = x;
    this.y = y;
    this.SpdX = speedX;
    this.SpdY = speedY;
    this.radius = radius;
    this.color = color;
  }
  static create(bufferLength, container, detail) {
    canvasCtx.restore();
    canvasCtx.save();
    for (let i = 0; i < bufferLength; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedX = (Math.random() - 0.5) * 1;
      let speedY = (Math.random() - 0.5) * 1;
      let color =
        detail.colorList[Math.floor(Math.random() * detail.colorList.length)];
      let radius = 0;
      container.push(new MusicBall(x, y, speedX, speedY, radius, color));
    }
  }
  draw() {
    canvasCtx.beginPath(); //开始绘制

    canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    canvasCtx.fillStyle = this.color;
    canvasCtx.fill();
  }
  update(frequencyVolume) {
    this.draw();
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.SpdX = -this.SpdX;
      this.x = this.x + this.SpdX;
    }
    if (this.y + this.radius > canvas.heyight || this.y - this.radius < 0) {
      this.SpdY = -this.SpdY;
      this.y = this.y + this.SpdY;
    }
    this.x = this.x + this.SpdX;
    this.y = this.y + this.SpdY;
    this.radius = frequencyVolume - 90 > 0 ? (frequencyVolume - 90) * 1.5 : 0;
  }
}
class MusicVisualizer {
  constructor() {
    this.container = [];
    this.bufferLength = 0;
    this.audioCtx; // audio context
    // 音频分析器
    this.analyser;
    this.frameID; //requestAnimationFrame ID
  }

  connect(audioElement, fftSize, rootDom) {
    canvas = document.createElement("canvas");
    canvasCtx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCtx.save();
    rootDom.appendChild(canvas);
    audioElement.crossOrigin = "anonymous";
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    let source = this.audioCtx.createMediaElementSource(audioElement);
    source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.analyser.fftSize = fftSize;
    this.bufferLength = this.analyser.frequencyBinCount; //通过256的密度的傅里叶变化后得到的可分辨的频率数 =128
    // MusicVisualizer.createBall(cl);
    // console.log(this.visList);
  }
  create(Visualizer, detail) {
    this.container = [];
    let bufferLength = this.bufferLength,
      container = this.container;

    switch (Visualizer) {
      case "Bar":
        MusicBar.create(bufferLength, container, detail);
        break;

      default:
        MusicBall.create(bufferLength, container, detail);
        break;
    }
  }
  stopRock() {
    cancelAnimationFrame(this.frameID);
    canvasCtx.clearRect(
      -canvas.width,
      -canvas.height,
      2 * canvas.width,
      2 * canvas.height
    );
  }
  pauseRock() {
    cancelAnimationFrame(this.frameID);
  }
  rockMusic() {
    this.frameID = requestAnimationFrame(this.rockMusic.bind(this));
    let dataArray = new Uint8Array(this.bufferLength); //生成8位为一个item长度为bufferLength的array
    this.analyser.getByteFrequencyData(dataArray); //  将频率导入到该array
    canvasCtx.clearRect(
      -canvas.width,
      -canvas.height,
      2 * canvas.width,
      2 * canvas.height
    );
    this.container.forEach((bar, index) => bar.update(dataArray[index]));
  }
  // console.log(circle, dataArray[index]);
}
export default MusicVisualizer;
