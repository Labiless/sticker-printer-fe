class Canvas{

    CANVAS_WIDTH = 1680;
    CANVAS_HEIGHT = 2382;
    STICKERS_URL = "img/sticker_placeholder.png";
    BACKGROUND_COLOR = "#6B6B6B";
    canvas;
    ctx;

    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
        this.ctx = this.canvas.getContext("2d");
    }   

    drawSticker = (videoElement) => {
        this.drawBackground();
        this.drawFrame(videoElement); 
        this.drawImage(this.STICKERS_URL, 0, 0);
    }

    drawBackground = () => {
        this.ctx.fillStyle = this.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage = async (imgUrl : string, x : number, y : number) => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            //const {left, top} = this.centerImage({w: img.width, h: img.height}, {w: this.canvas.width, h: this.canvas.height});
            this.ctx.drawImage(img, 0, 0);
            //this.downloadImage();
            this.sendToPrinter();
        }
    }

    centerImage = (imageSizes) => {
        const left = (this.canvas.width - imageSizes.w)/2;
        const top = (this.canvas.height - imageSizes.h)/2;
        return ({
            left,
            top
        })
    }

    drawFrame = (videoElement) => {
        const imgW = 700;
        const imgH = imgW;
        const {left} = this.centerImage({w: imgW, h: 800})
        this.ctx.drawImage(videoElement, left,1400, imgW, imgH)
    }

    downloadImage = () => {
        const link = document.createElement("a");
        const imgFromCanvas = this.canvas.toDataURL("image/png").replace("data:image/png;base64,", "image/octet-stream");
        link.href = imgFromCanvas;
        link.download = 'stiker.png';
        link.click();
        link.remove();
    }

    sendToPrinter = () => {
        const imgFromCanvas = this.canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
        fetch("https://labiles:3000", {
            method: "POST",
            body: JSON.stringify({
                image : imgFromCanvas
            }), 
        }).then(res => {
            console.log(res);
        }).catch((error) => {
            alert(error)
          });
    }

}

export default Canvas;