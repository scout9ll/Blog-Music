import rough from "./rough";

//获取媒体元素,用来生成声音源
export class MusicPlayer {
    constructor(canvasElement) {
        this.initCanvas(canvasElement)
    }
    initCanvas(canvasElement) {
        const canvas = canvasElement;
        canvas.width = 350;
        canvas.height = 500;
        this.canvasCtx = canvas.getContext("2d");
        this.canvasCtx.translate(25, 200);
        this.rc = rough.canvas(canvasElement);
        const rc = this.rc
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
        this.dataArray
        // drawShadow("canvas-shadow");
    }
    init(analyser,bufferLength) {
        this.dataArray = new Uint8Array(bufferLength);
    }
    drawBar(bufferLength) {
        this.canvasCtx.clearRect(150, 30, 130, 80);
        const array16 =  this.dataArray.slice(this.dataArray.length/2-8,this.dataArray.length/2+8)
        const bar_w = 130 / 16;
        for (let i = 0; i < 16; i++) {
            let bar_x = 150 + i * bar_w;
            let bar_h = ((array16[i] / 255) * 80) / 2;
            let bar_y = 30 + 80 - bar_h;

            this.rc.rectangle(bar_x, bar_y, bar_w, bar_h, { fill: "green" });
        }
    }
    pause(){
        cancelAnimationFrame(this.frameID);
    }

    //run it
    play(analyser,bufferLength) {
        // requestAnimationFrame 保证与屏幕刷新率一致,在每次执行时绘制canvas数据
        
        analyser.getByteFrequencyData(this.dataArray);
        this.frameID = requestAnimationFrame(this.play.bind(this,analyser,bufferLength));
        this.drawBar(bufferLength);
    }
}

export class SoundLine {
    constructor(canvasElement) {
        this.initCanvas(canvasElement)
    }
    initCanvas(canvasElement) {
        const canvas = canvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvasCtx = canvas.getContext("2d");
        // this.canvasCtx.translate(25, 200);
        this.rc = rough.canvas(canvasElement);
    }
    init(analyser,bufferLength) {
        this.dataArray = new Uint8Array(bufferLength);
    }
    drawLine(bufferLength) {
        this.canvasCtx.clearRect(0, 0, window.innerWidth, innerHeight);
        const bar_w = window.innerWidth / bufferLength;
        const ploylineArr = []
        for (let i = 0; i < bufferLength; i++) {
            let bar_x =  i * bar_w;
            let bar_h = ((this.dataArray[i] / 255) * 50) / 2;
            let bar_y = innerHeight/2 - bar_h;
            ploylineArr.push([bar_x ,bar_y])
            
        }
        // console.log(ploylineArr);    
        
        // this.rc.curve(ploylineArr,{ stroke: 'red', strokeWidth: 3})
        // this.rc.curve(ploylineArr.map(point =>[window.innerWidth - point[0],point[1]]),{fill:'red'})
       const mixArr =  ploylineArr.map((point,index) =>[window.innerWidth - point[0],point[1]+ploylineArr[ploylineArr.length-1-index][1]])
       this.rc.curve(mixArr,{ stroke: 'red', strokeWidth: 3})


    }
    pause(){
        cancelAnimationFrame(this.frameID);
    }

    //run it
    play(analyser,bufferLength) {
        // requestAnimationFrame 保证与屏幕刷新率一致,在每次执行时绘制canvas数据
        
        analyser.getByteFrequencyData(this.dataArray);
        this.frameID = requestAnimationFrame(this.play.bind(this,analyser,bufferLength));
        this.drawLine(bufferLength);
    }
}