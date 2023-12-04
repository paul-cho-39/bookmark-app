// TODO: for styling
// 1) when "enter" the format should be turned off; 2) when selection turned on
// 2) increase the height of the toolbar
// 3) if (darkMode) it should load faster

const quillHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<!-- Include stylesheet -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<!-- Include the Quill library -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
  <style>
      body {
        background-color: red;
        margin: 0 0 0 0;
        height: 100vh;
        overflow: hidden;         
      }
      #editor {
        // background-color: yellow;
        height: auto;
        min-height: 150px;
        width: 100%;
        border-width: 0;
        position: relative;
        z-index: 1;
        overflow-y: visible;
      }
      #toolbar  {
        position: absolute;
        bottom: 0;
        overflow-x: scroll;
        width: 100%;
        border-width: 0 0 0;
        border-top: 1.3px solid;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: grey;
        z-index: 5000;
      }
      .toolbar___container {
        display: flex; 
        align-items: stretch; 
        justify-content: space-evenly;
      }
      .ql-container.ql-snow {
        user-select: none;
        -webkit-user-select: none;
      }
      .ql-container {
        font-size: 18px;
      }
      .dark-mode.ql-container {
        font-size: 18px;
        color: white !important;
      }
      .custom-icon {
        width: 17px;
        height: 17px;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .headers-indicator {
        text-align: center;
        position: absolute;
        bottom: 8px;
        font-size: 8.5px;
        font-weight: bold;
        color: #06c;
      }

  </style>
</head>
<body>
  <!-- Create the editor container -->

      <div id="editor"></div>

  <script>
  // <------------------- Quill Script ------------------->

  // <------------------- IMPORT ------------------->
    let Parchment = Quill.import('parchment');

    let Link = Quill.import('formats/link');
    let Inline = Quill.import('blots/inline');
    let Block = Quill.import('blots/block');

    const _absoluteHeight = document.body.scrollHeight;
    let _isReady = false;
    let _lastKnownRange = null;
    let _tempDelta = null;

    var quill = new Quill('#editor', {
        theme: 'snow',
    });

    // window.document.addEventListener('message', function(event) {
    //   const message = JSON.parse(event.data);
    //   switch(message.type) {
    //     case 'TOUCHED':
          
    //   }
    // }

    let memoizedIndex = null;

    // quill.on('text-change', function(delta, oldDelta, source) {
    //   // var editor = document.getElementById('#editor .ql-editor');
    //   const selection = quill.getSelection();
    //   let currentIndex = selection ? selection.index : null;
      
    //   if (currentIndex !== memoizedIndex) {
    //     memoizedIndex = currentIndex;
    //     const editorHeight = quill.scroll.domNode.scrollHeight; 
    //     if (editorHeight > 150) {
    //       editor.style.height = 'auto';
    //     } else {
    //       editor.style.height = '150px';
    //     }
    //   }
    // });

    // quill.on('selection-change', function(range) {
    //   if (range) {
    //     // Do nothing if there is a range
    //   } else {
    //     let contentLength = quill.getLength();
    //     // 1) get the latest index
    //     // 2) retrieve the height of the current editor
    //     // 3) if the editor is more than the "desired value" 
    //     // 4) then set the height as 'auto' (otherwise it should the value)
    //   }
    // });

    let helping = false;
    window.document.addEventListener('message', function(event) {
      const message = JSON.parse(event.data);
      switch(message.type) {
        case 'help':
          // alert(message.value);
          helping = message.value;
          break;
        case 'keyboardHeight':
          changeHeight(message.value);
          break;
        default:
          break;
       }
    });

    var changeHeight = function(value) {
      const { keyboardHeight, height } = value;
      const editor = document.getElementById("editor");
      if (keyboardHeight > 0) {
        editor.style.height = keyboardHeight - 50 + 'px';
      } else {
        setTimeout(() => {
          editor.style.height = '95vh';
        }, 0);
      }
    }

    // quill.on('text-change', function(delta, oldDelta, source) {
    //   var editorHeight = quill.scroll.domNode.scrollHeight;
    
    //   // Set a minimum height
    //   var minHeight = 200;  // Replace this with your desired minimum height
    //   if (editorHeight < minHeight) {
    //     editorHeight = minHeight;
    //   }
    // });

  </script>
</body>
</html>
`;

export default quillHtml;

// should not be onClick but rather if it is activated
// without 'clicking' is there a better way for this?
