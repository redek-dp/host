// (A) USING HTML2CANVAS
function captureA() {
  html2canvas(document.body).then((canvas) => {
    let a = document.createElement("a");
    a.download = "ss.png";
    a.href = canvas.toDataURL("image/png");
    a.click(); // MAY NOT ALWAYS WORK!
  });
}

// (B) USING SCREEN CAPTURE API
// * WILL NOT WORK ON ALL BROWSERS!
// https://caniuse.com/mdn-api_mediadevices_getdisplaymedia
async function captureB() {
  // (A) GET MEDIA STREAM
  const stream = await navigator.mediaDevices.getDisplayMedia({
    preferCurrentTab: true
  });

  // (B) STREAM TO VIDEO
  const vid = document.createElement("video");

  // (C) VIDEO TO CANVAS
  vid.addEventListener("loadedmetadata", function () {
    // (C1) CAPTURE VIDEO FRAME ON CANVAS
    const canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");
    ctx.canvas.width = vid.videoWidth;
    ctx.canvas.height = vid.videoHeight;
    ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

    // (C2) STOP MEDIA STREAM
    stream.getVideoTracks()[0].stop();

    // (C3) "FORCE DOWNLOAD"
    let a = document.createElement("a");
    a.download = "ss.png";
    a.href = canvas.toDataURL("image/png");
    a.click(); // MAY NOT ALWAYS WORK!
  });

  // (D) GO!
  vid.srcObject = stream;
  vid.play();
}

var calcHeight = function () {
  $("#preview-frame").height($(window).height());
};

$(document).ready(function () {
  calcHeight();
});

$(window)
  .resize(function () {
    calcHeight();
  })
  .load(function () {
    calcHeight();
  });