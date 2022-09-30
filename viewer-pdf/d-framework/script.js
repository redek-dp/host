
var url = 'https://dl.dropboxusercontent.com/s/154e4ct30xppkgy/MetodoTeoriaSolfejo.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://redek-dp.github.io/host/viewer-pdf/d-framework/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.3,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
var prevBtnElm = document.getElementById('prev');
var nextBtnElm = document.getElementById('next');
var pageCountElm = document.getElementById('page_count')

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
      console.log(page)
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
prevBtnElm.addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage(){
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}
nextBtnElm.addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  pageCountElm.textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum);
});
(function(w, d){
    function fnContextmenu(e){
        if(e.target.nodeName == 'CANVAS' || e.target.nodeName == 'DIV'){
            e.preventDefault();
            return
        };
        var blockContext = [
            {
                type: 'id',
                value: 'mainContainer'
            }, {
                type: 'id',
                value: 'viewer'
            }, {
                type: 'id',
                value: 'toolbarViewer'
            }, {
                type: 'class',
                value: 'canvasWrapper'
            },{
                type: 'class',
                value: 'o-viewer'
            },{
                type: 'class',
                value: 'o-viewer_canvasWrapper'
            },{
                type: 'class',
                value: 'o-viewer_field'
            }
        ];
        blockContext.map(elm => {
            if(elm.type == 'id') {
                if(d.getElementById(elm.target)) {
                    if(e.target.id == d.getElementById(elm)) e.preventDefault();
                }
            }
            //console.log(e.target.classList, elm.value, e.target.classList.contains(elm.value));
            if(elm.type == 'class'){
                if(d.querySelector(`.${elm.value}`)) {
                    [].slice.call(d.querySelectorAll(`.${elm.value}`)).map(c => {
                        if(e.target.classList.contains(elm.value)) {
                            e.preventDefault();
                            return
                        }
                    });
                }
            };
        });
    }
    //d.body.addEventListener('contextmenu', fnContextmenu, true);
})(window, document);




function zoomin() {
  var GFG = document.getElementById("pdf-renderl");
  var currWidth = GFG.clientWidth;
  var currHeight = GFG.clientHeight;
  GFG.style.width = currWidth + 40 + "px";
  GFG.style.height = currHeight + 40 + "px";
}
function zoomout() {
  var GFG = document.getElementById("pdf-renderl");
  var currWidth = GFG.clientWidth;
  var currHeight = GFG.clientHeight;
  GFG.style.width = currWidth - 40 + "px";
  GFG.style.height = currHeight - 40 + "px";
}