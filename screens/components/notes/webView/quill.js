// TODO: for styling
// 1) when "enter" the format should be turned off; 2) when selection turned on
// 2) increase the height of the toolbar
// 3)

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
        margin: 0 0 0 0;
        padding: 1 1 1 1;
        height: 100vh;
      }
      #editor {
        height: 100%;
        width: 100%;
        border-width: 0;
        overflow-y: auto;
      }
      #toolbar  {
        position: absolute;
        overflow-x: hidden;
        width: 100%;
        border-left-width: 0;
        border-right-width: 0;
        border-bottom-width: 0;
        background-color: transparent;
      }
      .toolbar___container {
        display: flex; 
        align-items: stretch; 
        justify-content: space-evenly;
      }
      .ql-container {
        font-size: 16px;
      }
      .dark-mode.ql-container {
        font-size: 16px;
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
    let _urlInput;

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

    var _getToolbar = function() {
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
          // changeToolbarHeight(message.keyboardHeight, 50);
          changeToolbarHeight(message.value, 50);
          break;
        case 'theme':
          changeThemeMode(message.value);
          break;
        case 'link':
          addLink(message.url);
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
      if (shouldHide) {
        toolbar.style.display = 'none';      
      }
      if (!shouldHide) {
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
      const toolbar = document.getElementById("toolbar");
      const editor = document.getElementById("editor");
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

// // class Highlighter extends Inline {
// //   static create(value) {
// //     let node = super.create();
// //     node.style.color = value;
// //     return node;
// //   }

// //   static formats(node) {
// //     return node.style.color;
// //   }

// //   format(name, value) {
// //     if (name === 'highlighter' && value) {
// //       this.domNode.style.color = value;
// //     } else {
// //       super.format(name, value);
// //     }
// //   }
// // }

// // Highlighter.blotName = 'highlighter';
// // Highlighter.tagName = 'span';

// // // <------------------- register ------------------->
// Quill.register(Highlighter);
// Quill.register(Quote);

// let _clicksCount = 0;
// let highlightButton = document.getElementById('highlight-button');

// highlightButton.addEventListener('click', function() {
//   let normal = '#000000';
//   let highlighter = '#e3963e';
//   var range = quill.getSelection();
//   if (range) {
//     if (range.length == 0) {
//       var format = quill.getFormat(range.index);
//       let rgbColor = format.highlighter;
//       let color = rgbColor && rgbToHex(rgbColor);
//       if (!rgbColor) {
//         quill.format('highlighter', highlighter);
//       }
//       if (color && color === highlighter) {
//         quill.format('highlighter', normal);
//         // forceClick();
//       } else {
//         quill.format('highlighter', highlighter);
//         // forceClick();
//       }
//     }
//   }

//   function forceClick() {
//     if (_clicksCount === 0) {
//       _clicksCount++;
//       highlightButton.click();
//     } else {
//       _clicksCount = 0;  // reset the count
//     }
//   }

//   function rgbToHex(rgb) {
//     let sep = rgb.indexOf(",") > -1 ? "," : " ";
//     rgb = rgb.substr(4).split(")")[0].split(sep);

//     let r = (+rgb[0]).toString(16),
//         g = (+rgb[1]).toString(16),
//         b = (+rgb[2]).toString(16);

//     if (r.length == 1)
//         r = "0" + r;
//     if (g.length == 1)
//         g = "0" + g;
//     if (b.length == 1)
//         b = "0" + b;

//     return "#" + r + g + b;
//   }
// });
