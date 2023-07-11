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
        // min-height: 150px;
        border-width: 0;
        overflow-y: visible;
      }
      #toolbar  {
        position: absolute;
        width: 100%;
        right: 1px;
        border-width: 0 0 0;
        border-top: 1.3px solid;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: white;
        overflow: hidden
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
        width: 24px;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .ql-snow.ql-toolbar button {
        height: 30px;
      }
      .headers-indicator {
        text-align: center;
        position: absolute;
        bottom: 8px;
        font-size: 8.5px;
        font-weight: bold;
        color: #06c;
      }

    // BUTTONS FOR USUALLY WHEN CLICKING EXCEPT WORD-CHANGE
    // LEFT OUT "ql-picker" should be used for picking colors
      // .ql-snow.ql-toolbar button:focus .ql-fill,
      // .ql-snow .ql-toolbar button:focus .ql-fill,
      // .ql-snow.ql-toolbar button.ql-active .ql-fill,
      // .ql-snow .ql-toolbar button.ql-active .ql-fill,
      // .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
      // .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
      // .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
      // .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
      //   fill: red;
      // }
      // .ql-snow.ql-toolbar button:focus .ql-stroke,
      // .ql-snow .ql-toolbar button:focus .ql-stroke,
      // .ql-snow.ql-toolbar button.ql-active .ql-stroke,
      // .ql-snow .ql-toolbar button.ql-active .ql-stroke,
      // .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
      // .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
      // .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
      // .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
      //   stroke: red;
      // }

      // // WHENEVER IT IS NOT ACTIVE/HOVERED/FOCUSED
      // .ql-snow .ql-stroke {
      //   fill: none;
      //   stroke: #5b5b5b;
      //   stroke-width: 1.5;
      // }
      // .ql-snow .ql-stroke-miter {
      //   fill: none;
      //   stroke: #5b5b5b;
      //   stroke-miterlimit: 6
      //   stroke-width: 1;
      // }
      // .ql-snow .ql-fill,
      // .ql-snow .ql-stroke.ql-fill {
      //   fill: #5b5b5b;
      // }


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
        <button class='custom-element' data-modal-name="extraEditorModal">E</button>
        <button class='custom-element' data-color-type="color" data-modal-name="colorModal">C</button>
        <button class='custom-element' data-color-type="background" data-modal-name="textBackgroundModal">H</button>
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
    let _textChange = 0; 
    let _isModalVisible = false;
    
    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar', 
          history: {
            delay: 900,
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
                  // this is a workaround from quill TEST whether there is a bug
                  if (
                     formats['color'] 
                  || formats['background'] 
                  || formats['strike'] 
                  || formats['bold'] 
                  || formats['italic'] 
                  || formats['underline']
                  ) {
                    // const currentColor = formats.color;
                    this.quill.insertText(context.offset, '', color, currentColor);
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

    var _sendMessage = function(type, body = null) {
      const message = body
          ? JSON.stringify({ type, body })
          : JSON.stringify({ type });
      window.ReactNativeWebView.postMessage(message);
    }

    var _getDocument = function(id) {
      return document.getElementById(id);
    }

    document.addEventListener('DOMContentLoaded', function() {
      _sendMessage('ready');
      _isReady = true
    });

    var _insertFormat = function(range, type, bool) {
      range.length > 0 
        ? quill.formatText(range.index, range.length, type, bool)
        : quill.insertText(range.index, '\u200B', type, bool);
    }

    var _checkModalVisible = function() {
      if (_isModalVisible) _sendMessage('modal', { name: "toggleModals" });
    }

    var _getSelectedFormats = function(range, formatType) {
      let selected;
      if (range) {
        
        const formats = quill.getFormat(range);
        if (formats && !formatType) {
          // if formats part of align, bold, underline, strikethrough, or italic
          selected = formats;
        }
        if (formats && formatType) {
          selected = formats[formatType];
        }
      }
      return typeof selected === "undefined" ? "none" : selected;
    }

    window.document.addEventListener('message', function(event) {
      const message = JSON.parse(event.data);
      switch(message.type) {
        case 'keyboardHeight':
          changeToolbarHeight(message.value, 80);
          break;
        case 'theme':
          changeThemeMode(message.value);
          break;
        case 'link':
          addLink(message.value);
          break;
        case 'displayToolbar':
          toggleToolbar(message.value);
          break;
        case 'textColor': 
          changeTextColor(message.value);
          break;
        case 'extraFormat':
          changeFormat(message.value);
        default:
          break;
       }
    });

    var changeFormat = function(data) {
      _textChange = 0; // defaults to 0
      const { type, format } = data;
      var range = quill.getSelection();

      switch (format) {
        case 'indent':
          const indentValue = quill.getFormat(range.index).indent || 0;
          const value = type === "increase" ? indentValue + 1 : indentValue - 1;
          quill.formatLine(range.index, range.length, format, value);
          break;
        case 'align':
          if (type === 'left') {
            quill.removeFormat(range.index, range.length)
          }
          quill.formatLine(range.index, range.length, format, type);
          break;
        case 'inline':
          const currentFormat = quill.getFormat(range.index, range.length);
          currentFormat[type] 
            ? _insertFormat(range, type, false)
            : _insertFormat(range, type, true)
          break;
        default: 
          break;
      }
    }

    var changeTextColor = function(data) {
      _textChange = 0; // defaults to 0 every switch
      const { color, colorType } = data;
      var range = quill.getSelection();
      colorType === "background" && color === '#FFFFFF'
        ? _insertFormat(range, colorType, 'black')
        : _insertFormat(range, colorType, color);
    }

    var toggleToolbar = function(shouldHide) {
      const toolbar = _getDocument('toolbar');
      if (shouldHide.visible) {
        toolbar.style.display = 'none';      
      }
      if (!shouldHide.visible) {
        setTimeout(() => toolbar.style.display = 'flex', 250);
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


    var changeToolbarHeight = function(height, offsetHeight) {
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
      const toolbar = _getDocument('toolbar');
      
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
        const body = { "url": event.target.href };
        _sendMessage("link", body);
      });
    });

// // <------------------- Quill logic  ------------------->

// // <------------------- Quill handler ------------------->

// TODO: check the condition and this is likely usable so find a better means to maintain code

  quill.on('text-change', function(delta, oldDelta, source) {
    if (_isModalVisible) {
      _textChange++; // only when text is entered

      if (_textChange > 1) {
        _sendMessage('modal', { name: "toggleModals" })
        _isModalVisible = false;
        _textChange = 0;
      }
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
  let customColor = document.getElementById('custom-color');
  let customBgTextColor = document.getElementById('custom-bg-color');
  let customEditor = document.getElementById('custom-editor');

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

    function setFormatAndIcon(format) {
      let header, isActive;
  
      if (format.header === 2) {
          header = 3;
          isActive = true;
      } else if (format.header === 3) {
          header = false;
          isActive = false;
      } else {
          header = 2;
          isActive = true;
      }
  
      quill.format('header', header);
      subset.textContent = header || null;
      changeIcon(isActive);
  }
  
  // Change the icon based on whether it's active
  function changeIcon(isActive) {
      const icon = document.getElementById("headers-button-icon");
      icon.setAttribute("src", isActive ? ICONS.active : ICONS.inactive);
  }
  
  // Call the setFormatAndIcon function
  setFormatAndIcon(quill.getFormat());
  });

  customLink.addEventListener('click', function() {
    let range = quill.getSelection();
    if (range) {
      _lastKnownRange = range; 
    };
    const body = { name: 'linkModal' };
    _sendMessage("modal", body);
  });

  undoButton.addEventListener('click', function () {
    quill.history.undo();
  });
  
  redoButton.addEventListener('click', function () {
    quill.history.redo();
  });

// <------------------- modal logic ------------------->

  function handleClick(colorType, modalName) {
    _checkModalVisible();
    _isModalVisible = true;

    var range = quill.getSelection();
    const selected = _getSelectedFormats(range, colorType);
    const body = { name: modalName, selected: selected };
    _sendMessage('modal', body);

    quill.focus();
  }

  let customElements = document.querySelectorAll('.custom-element');
  customElements.forEach((el) => {
    el.addEventListener('click', () => {
      let colorType = el.dataset.colorType;
      let modalName = el.dataset.modalName || colorType + 'Modal';
      handleClick(colorType, modalName);
    });
  });

  </script>
</body>
</html>
`;

export default html;
