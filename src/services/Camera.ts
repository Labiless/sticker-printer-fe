export default class Camera {

    video;
    mediaStream : any;
    facingMode = "user";
    constraints = {
        audio: false,
        video: {
            facingMode: this.facingMode,
            width: { min: 240, ideal: 720, max: 1080 },
            height: { min: 240, ideal: 720, max: 1080 }
        }
    };


    constructor(){
        this.video = document.querySelector("video");
    }

    init = async () => {
        this.mediaStream = await this.getMediaStream();
        await this.sendStreamToVideoElement();
    }

    getMediaStream = async () => {
        try {
          return await navigator.mediaDevices.getUserMedia(this.constraints);
        } catch (error) {
          console.log(error);
          return null;
        }
      }

    sendStreamToVideoElement = async () => {
        if(this.video){
            try{
                this.video.srcObject = await this.mediaStream;
                this.video.onloadedmetadata = (e) => {
                    console.log("onloadedmetadata")
                    if(this.video) this.video.play();
                    else throw "No video object";
                };
            }catch(error){
                console.log(error);
                return false;
            }
        }
    }  


};