import rough from "./rough";

let roughCanvas, ctx, height, width;

function createPoints(points, offSetdeg = 0) {
  for (let i = 0; i < 20; i++) {
    let x = (width / 36) * i + 10;
    let xdeg = (Math.PI / 100) * x;

    let y = Math.round(Math.sin(xdeg + offSetdeg) * 20) + (height - 20) / 2;
    points.push([x, y]);
  }
}

let n = 0;
function drawSine() {
  ctx.clearRect(0, 0, 1000, 1000);
  n++;
  requestAnimationFrame(drawSine);

  Apoints.forEach(point => {
    // const random = Math.abs(Math.random() * 1);
    const xdeg = (Math.PI / 100) * (point[0] + n * 4);
    point[1] = Math.round(Math.sin(xdeg) * 40) + (height - 20) / 2;
  });
  Bpoints.forEach(point => {
    // const random = Math.abs(Math.random() * 1);
    const xdeg = (Math.PI / 100) * (point[0] + n * 4.2);
    point[1] = Math.round(Math.sin(xdeg + 80) * 40) + (height - 20) / 2;
  });
  roughCanvas.curve(Apoints, {
    stroke: "black",
    strokeWidth: 10
  });
  roughCanvas.curve(Bpoints, {
    stroke: "green",
    strokeWidth: 10
  });
}
let Apoints = [];
let Bpoints = [];

export default function(canvasID) {
  const canvas = document.getElementById(canvasID);
  roughCanvas = rough.canvas(canvas);
  ctx = canvas.getContext("2d");
  height = canvas.height;
  width = canvas.width;

  createPoints(Apoints);
  createPoints(Bpoints, 50);

  drawSine();
}
