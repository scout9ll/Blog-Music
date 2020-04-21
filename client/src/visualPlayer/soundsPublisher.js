class soundPublisher {
    constructor(audioElement, fftSize) {
        this.bufferLength = 0;
        this.audioCtx; // audio context
        // 音频分析器
        this.analyser;
        this.Visualizers = []
        // this.frameID; //requestAnimationFrame ID
        this.connect(audioElement, fftSize)
    }

    connect(audioElement, fftSize) {
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
    subscribe(Visualizer) {
        if (Array.isArray(Visualizer)) {
            this.Visualizers.push(...Visualizer)
        } else {
            this.Visualizers.push(Visualizer)
        }
        this.Visualizers.forEach(v => v.init(this.analyser, this.bufferLength))
    }
    pause() {
        // cancelAnimationFrame(this.frameID);
        this.Visualizers.forEach(v => v.pause(this.analyser, this.bufferLength))

    }
    play() {
        // this.frameID = requestAnimationFrame(this.rockMusic.bind(this));
        let dataArray = new Uint8Array(this.bufferLength); //生成8位为一个item长度为bufferLength的array
        this.analyser.getByteFrequencyData(dataArray); //  将频率导入到该array
        return this.audioCtx.resume().then(() => this.Visualizers.forEach(v => v.play(this.analyser, this.bufferLength)))

        // this.container.forEach((bar, index) => bar.update(dataArray[index]));
    }
    // console.log(circle, dataArray[index]);
}



export default soundPublisher;