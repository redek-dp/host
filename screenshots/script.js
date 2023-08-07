document.write('<div class="urlsk"><button onclick="mySitelink()"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg></button></div><div id="cbwrap"><button onclick="captureB()"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16"><path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/><path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/></svg></button></div>');

function mySitelink() {
  let text;
  let person = prompt("LINK:", "https://");
  if (person == null || person == "") {
    text = "O usuário cancelou o prompt.";
  } else {
    text = "" + person + "";
  }
  document.getElementById("devlink").innerHTML = '<iframe id="preview-frame" src="'+ text +'" name="preview-frame" frameborder="0" noresize="noresize">';
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
}


// (A) USING HTML2CANVAS
function captureA() {
  html2canvas(document.body).then((canvas) => {
    let a = document.createElement("a");
    a.download = "screenshots.png";
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
    a.download = "screenshots.png";
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