let recordBtn=document.querySelector(".record-btn")
let recordBtnCont=document.querySelector(".record-btn-cont")
let captureBtn=document.querySelector(".capture-btn")
let captureBtnCont=document.querySelector(".capture-btn-cont")
let timerCont = document.querySelector(".timer-cont");
let timer = document.querySelector(".timer");

captureBtnCont.addEventListener("click", function(){
    captureBtn.classList.add("scale-capture");
    setTimeout(() => {
        captureBtn.classList.remove("scale-capture")
    },1000)
})

let isRecording = false;
recordBtnCont.addEventListener("click", function () {
    if (!isRecording) {
        //we have to record 
        recordBtn.classList.add("scale-record");
        timer.style.display = "block";
    } else {
        //stop the recording 
        recordBtn.classList.remove("scale-record");
        timer.style.display = "none";
    }

    isRecording = !isRecording;
  
});


let constraints = {
    video : true,
    audio : true
}

let chunks = [];

navigator.mediaDevices.getUserMedia(constraints).then((stream) =>{
    video.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream);

    // 3) steps --> Start, Store, and Stop Recording
    // Start Recoding
    mediaRecorder.addEventListener("start", () => {
        console.log("Rec Started")
    })
    // Store recording 
    mediaRecorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    })
    // recoding Stop
    mediaRecorder.addEventListener("Stop", () => {
        console.log("Rec Stoppped");
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoUrl = URL.createObjectURL(blob);
        console.log(videoUrl);

        // let a = document.createElement("a");
        // a.href = videoUrl;
        // a.download = "myvideo.mp4";
        // a.click();
    })

})