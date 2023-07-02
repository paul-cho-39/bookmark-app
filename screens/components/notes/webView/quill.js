// TODO: for styling
// 1) when "enter" the format should be turned off; 2) when selection turned on
// 2) increase the height of the toolbar
// 3) if (darkMode) it should load faster

const html = `
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
        background-color: white;
        margin: 0 1 0 1;
        height: 100vh;
        overflow: hidden; 
      }
      #editor {
        height: auto;
        min-height: 150px;
        border-width: 0;
        overflow-y: visible;
      }
      #toolbar  {
        position: absolute;
        overflow-x: scroll;
        width: 100%;
        border-width: 0 0 0;
        border-top: 1.3px solid;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: grey;
        z-index: 5000;
      }
      .toolbar___container {
        display: none; 
        align-items: stretch; 
        justify-content: space-evenly;
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
      <div id="toolbar" class="toolbar___container">
        <!-- Add font size dropdown -->
        <button id="headers-button">
          <img id="headers-button-icon" class="custom-icon headers-button" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPjxwYXRoIGQ9Ik01NzAtMTYwdi01NDBIMzYwdi0xMDBoNTIwdjEwMEg2NzB2NTQwSDU3MFptLTM2MCAwdi0zNDBIODB2LTEwMGgzNjB2MTAwSDMxMHYzNDBIMjEwWiIvPjwvc3ZnPg==' alt="header change" />
          <sub class="headers-indicator"></sub>
        </button>
        <button class="ql-list" value='ordered'></button>
        <button class="ql-list" value='bullet'></button>
        <button class="ql-indent" value="+1"></button>
        <button class='ql-color' value='orange'></button>
        <button class="ql-blockquote"></button>
        <button id="reference-button">
          <img class="custom-icon" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPjxwYXRoIGQ9Ik04MjAtODB2LTgwMGg2MHY4MDBoLTYwWk0zMjAtMjkwdi0xMDBoNDAwdjEwMEgzMjBaTTgwLTU3MHYtMTAwaDY0MHYxMDBIODBaIi8+PC9zdmc+') alt="reference" />
        </button>
        <button id="undo-button">
          <img class="custom-icon" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPjxwYXRoIGQ9Ik0yODAtMjAwdi02MGgyODlxNzAgMCAxMjAuNS00Ni41VDc0MC00MjJxMC02OS01MC41LTExNS41VDU2OS01ODRIMjc0bDExNCAxMTQtNDIgNDItMTg2LTE4NiAxODYtMTg2IDQyIDQyLTExNCAxMTRoMjk0cTk1IDAgMTYzLjUgNjRUODAwLTQyMnEwIDk0LTY4LjUgMTU4VDU2OC0yMDBIMjgwWiIvPjwvc3ZnPg==') alt="undo" />
        </button>
        <button id="redo-button">
          <img class="custom-icon" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPjxwYXRoIGQ9Ik0zOTItMjAwcS05NSAwLTE2My41LTY0VDE2MC00MjJxMC05NCA2OC41LTE1OFQzOTItNjQ0aDI5NEw1NzItNzU4bDQyLTQyIDE4NiAxODYtMTg2IDE4Ni00Mi00MiAxMTQtMTE0SDM5MXEtNzAgMC0xMjAuNSA0Ni41VDIyMC00MjJxMCA2OSA1MC41IDExNS41VDM5MS0yNjBoMjg5djYwSDM5MloiLz48L3N2Zz4=') alt="redo" />
        </button>
        <button id="custom-link">
          <img class="custom-icon" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPjxwYXRoIGQ9Ik00NTAtMjgwSDI4MHEtODMgMC0xNDEuNS01OC41VDgwLTQ4MHEwLTgzIDU4LjUtMTQxLjVUMjgwLTY4MGgxNzB2NjBIMjgwcS01OC4zMzMgMC05OS4xNjcgNDAuNzY1LTQwLjgzMyA0MC43NjQtNDAuODMzIDk5UTE0MC00MjIgMTgwLjgzMy0zODFxNDAuODM0IDQxIDk5LjE2NyA0MWgxNzB2NjBaTTMyNS00NTB2LTYwaDMxMHY2MEgzMjVabTE4NSAxNzB2LTYwaDE3MHE1OC4zMzMgMCA5OS4xNjctNDAuNzY1IDQwLjgzMy00MC43NjQgNDAuODMzLTk5UTgyMC01MzggNzc5LjE2Ny01NzkgNzM4LjMzMy02MjAgNjgwLTYyMEg1MTB2LTYwaDE3MHE4MyAwIDE0MS41IDU4LjVUODgwLTQ4MHEwIDgzLTU4LjUgMTQxLjVUNjgwLTI4MEg1MTBaIi8+PC9zdmc+' />
        </button>
      </div>

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
        modules: {
          toolbar: '#toolbar', 
          history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true
          }, 
          keyboard: {
            bindings: {
              enter: {
                key: 13,
                handler: function(range, context) {
                  let formats = this.quill.getFormat(range.index);
                  if (formats['align'] === 'right' ) {
                    this.quill.format('align', false);
                  }
                  if (formats['blockquote']) {
                    this.quill.format('blockquote', false);
                  }
                  return true;
                }
              }, 
              backspace: {
                key: 8,
                handler: function(range, context) {
                  let formats = this.quill.getFormat(range.index);
                  let [line, offset] = this.quill.getLine(range.index);
                  const reference = "- page: ";
                  const currentLineText = line.domNode.innerText; 
                  const hasNotEdited = currentLineText.trim() == reference.trim();

                  if (formats['align'] === 'right' && hasNotEdited) {
                    let textIndex = line.offset(this.quill.scroll);
                    this.quill.deleteText(textIndex + 2, reference.length - 2);
                  }
                  if (formats['align'] === 'right' && 
                    (currentLineText == '-'.trim() || currentLineText == '\\n') 
                  ) {
                    let textIndex = line.offset(this.quill.scroll);
                    this.quill.deleteText(textIndex, reference.length);
                    this.quill.format('align', false);
                  }

                  return true;
                }
              }
            }
          }
        },
        placeholder: 'Notes...',
    });

    var _sendMessage = function(message) {
      window.ReactNativeWebView.postMessage(message);
    }

    var _stringifyMessage = function(type, option) {
      return JSON.stringify({ type: type, option })
    }

    var _getDocument = function(id) {
      return document.getElementById(id);
    }

    var _getToolbar = function(id) {
      return document.getElementById("toolbar");
    }


    document.addEventListener('DOMContentLoaded', function() {
      const message = _stringifyMessage('ready', true);
      _sendMessage(message);

      _isReady = true
    });

    window.document.addEventListener('message', function(event) {
      const message = JSON.parse(event.data);
      switch(message.type) {
        case 'keyboardHeight':
          changeToolbarHeight(message.value, 50);
          break;
        case 'theme':
          changeThemeMode(message.value);
          break;
        case 'link':
          addLink(message.value);
          break;
        case 'pressed':
          _sendMessage(_stringifyMessage('noteData', _tempDelta))
          break;
        case 'displayToolbar':
          toggleToolbar(message.value);
          break;
        default:
          break;
       }
    });

    var toggleToolbar = function(shouldHide) {
      const toolbar = _getToolbar();
      if (shouldHide.visible) {
        toolbar.style.display = 'none';      
      }
      if (!shouldHide.visible) {
        toolbar.style.display = 'flex'
      }
    }

    // TODO: when the link contains 'https://' already then skip the parsing process
    var addLink = function(domain) {
      var range = quill.getSelection();
      let index = range.index > 0 ? range.index : 0;
      let link = range.index > 0 ? ' ' + domain : domain;
      let domainLength = domain.length;

      let url = "https://" + link;  
      url = url.replace(' ', ''); 
      quill.insertText(index, link, "link", url);
      quill.setSelection(index + domainLength + 1, 0);
    }


    var changeToolbarHeight = function(height, offsetHeight=30) {
      // const toolbar = _getToolbar();
      // const editor = document.getElementById("editor");

      const toolbar = _getDocument('toolbar');
      const editor = _getDocument('editor');
      const _absoluteHeight = document.body.scrollHeight;
      let initialHeight;

      // TODO: have to test this out with other device
      var adjustToKeyboard = function(totalHeight, currHeight) {
        if (totalHeight > currHeight) {
           let diff =  totalHeight - currHeight;
           const keyboardHeight = height - diff;
           toolbar.style.bottom = keyboardHeight + "px";
        } else {
           toolbar.style.bottom = height + "px";
        }
      }

      if (_isReady && height > 0) {
        setTimeout(() => {
          initialHeight = document.body.scrollHeight;
          adjustToKeyboard(_absoluteHeight, initialHeight);
        }, 50);
        editor.style.height = height - offsetHeight + "px";
      } else {
        editor.style.height = '95vh';
        toolbar.style.bottom = 0 + 'px';
      }
    }

    var changeThemeMode = function(message){
      const { isDarkMode, bgColor } = message;
      const editorContainer = document.querySelector('.ql-container');
      const toolbar = _getToolbar();
      
      if (_isReady && message.displayEditor) {
        setTimeout(() => {
          toolbar.style.display = "flex";
        }, 350);
      }

      if (isDarkMode) {
        editorContainer.classList.add('dark-mode');
        editorContainer.style.color = "white";
      } else {
        // Disable dark mode
        editorContainer.classList.remove('dark-mode');
        editorContainer.style.color = "black";
      }
      // Set background color
      document.body.style.backgroundColor = bgColor;
    }

    var links = document.querySelectorAll('#editor a');
    links.forEach(function(link) {
      link.target = '_self';
      link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const postMessage = _stringifyMessage("link", event.target.href)
        _sendMessage(postMessage);
      });
    });

// // <------------------- Quill logic  ------------------->

// // <------------------- Quill handler ------------------->

// TODO: check the condition and this is likely usable so find a better means to maintain code
  quill.on('text-change', function(delta, oldDelta, source) {
    if (source === 'user') {
      changeDelta = delta;
    }
  }); 

// // <------------------- add custom blots ------------------->
  class ReferenceQuote extends Block {
    static create(value) {
      let node = super.create(value);
      node.innerText = "- page: ";
      return node;
    }
  };

  class CustomLink extends Link {
    static create(value) {
      let node = super.create(value); 
      value = super.sanitize(value)

      node.setAttribute('href', value); 
      node.setAttribute('target', '_self');
      return node;
    }
  };

  class NoLinkTooltip extends Quill.import('ui/tooltip') {
    show() {
      let range = this.quill.getSelection();
      // Check if the user clicked on a link
      if (this.quill.getFormat(range).link) {
        return;
      }
      super.show();
    }
  }

  ReferenceQuote.blotName = 'reference-quote';
  ReferenceQuote.tagName = 'P';

  // CustomLink.blotName = 'custom-link';
  // CustomLink.tagName = 'A';


// <------------------- register ------------------->
  Quill.register(ReferenceQuote);
  Quill.register(CustomLink, true);
  Quill.register('ui/tooltip', NoLinkTooltip, true);


// <------------------- add logic ------------------->
  let quoteButton = document.getElementById('reference-button');
  let headersButton = document.getElementById('headers-button');
  let undoButton = document.getElementById('undo-button');
  let redoButton = document.getElementById('redo-button');
  let customLink = document.getElementById('custom-link');

  quoteButton.addEventListener('click', function() {
    let range = quill.getSelection();
    if (range == null) return;
    if (range.length == 0) {
      let reference = "- page: ";
      let [line, offset] = quill.getLine(range.index);
      const currentLineText = line.domNode.innerText.length; 

      const totalIndent = range.index + reference.length + 1;
      quill.format('reference-quote', true); 

      // format text to italic still experimental wont work fully
      // quill.formatText(
      //   range.index - currentLineText, 
      //   reference.length + currentLineText - 1, 
      //   'italic', 
      //   true
      // );

      quill.setSelection(totalIndent, 0); 
      quill.formatLine(range.index + 1, 0, 'align', 'right');      
    }
  });

  headersButton.addEventListener('click', function() {
    let range = quill.getSelection();
    if (!range) return;

    let format = quill.getFormat(range);

    // base64 active and inactive svg icons
    const activeSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPg0KICAgIDxwYXRoIGZpbGw9IiMwNmMiIGQ9Ik01NzAtMTYwdi01NDBIMzYwdi0xMDBoNTIwdjEwMEg2NzB2NTQwSDU3MFptLTM2MCAwdi0zNDBIODB2LTEwMGgzNjB2MTAwSDMxMHYzNDBIMjEwWiIvPg0KPC9zdmc+DQo';
    const inactiveSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iNDgiPjxwYXRoIGQ9Ik01NzAtMTYwdi01NDBIMzYwdi0xMDBoNTIwdjEwMEg2NzB2NTQwSDU3MFptLTM2MCAwdi0zNDBIODB2LTEwMGgzNjB2MTAwSDMxMHYzNDBIMjEwWiIvPjwvc3ZnPg==';

    let subset = this.querySelector('.headers-indicator');

    if (format.header === 1) {
      quill.format('header', 2);
      subset.textContent = 2;
    } else if (format.header === 2) {
      quill.format('header', false);
      subset.textContent = null;
      changeIcon(false);
    } else {
      quill.format('header', 1);
      subset.textContent = 1;
      changeIcon(true);
    }

    function changeIcon(isActive) {
      const icon = document.getElementById("headers-button-icon");
      if (isActive) {
        icon.setAttribute("src", activeSrc);
      } else {
        icon.setAttribute("src", inactiveSrc);
      }
    }
  });

  customLink.addEventListener('click', function() {
    let range = quill.getSelection();
    if (range) {
      _lastKnownRange = range; 
    };
    const postMessage = _stringifyMessage("modal")
    _sendMessage(postMessage);
  });

  undoButton.addEventListener('click', function () {
    quill.history.undo();
  });
  
  redoButton.addEventListener('click', function () {
    quill.history.redo();
  });

  </script>
</body>
</html>
`;

export default html;
