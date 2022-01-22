{
  if (typeof window.addEventListener === 'function') {
    const areas = document.querySelectorAll('textarea');

    const pretty = function(val) {
      if (Array.isArray(val)) {
        return "[" + val + "]";
      } else if (val instanceof Function) {
        return val;
      } else if (val instanceof Object) {
        return JSON.stringify(val);
      } else {
        return val;
      }
    }

    for (let i = 0, len = areas.length; i < len; i++) {
      const element = areas[i];

      if (element.hasAttribute('data-autoeval')) {
        const name = element.attributes["data-autoeval"].value;
        const e = document.getElementById(name);
        if (e == undefined) {
          console.log("autoeval " + name + " not found");
        } else {
          element.addEventListener('keyup', () => {
            e.innerHTML = element.value;
          }, false);
        }
      }

      if (element.hasAttribute('data-autojsstyle')) {
        const name = element.attributes["data-autojsstyle"].value;
        const e = document.getElementById(name);
        if (e == undefined) {
          console.log("autojsstyle " + name + " not found");
        } else {
          const once = element.hasAttribute('data-once');
          let running = true;
          const listener = () => {
            if (!once || running) {
              running = false;
              e.innerHTML = element.value;
            }
          };
          element.addEventListener('keyup', listener, false);
          Reveal.addEventListener('slidechanged', listener);
        }
      }

      if (element.hasAttribute('data-autostyle')) {
        const frame = frames[element.attributes["data-autostyle"].value];
        if (frame == undefined) {
          console.log("unknown frame "
              + element.attributes["data-autostyle"].value);
        } else {
          const listener = () => {
            let doc = (frame.contentWindow || frame.contentDocument);
            if (doc.document) {
              doc = doc.document;
            }
            doc.head.innerHTML = "<style>" + element.value + "</style>";
          };
          element.addEventListener('keyup', listener, false);
          frame.addEventListener('load', listener, false);
        }
      }

      if (element.hasAttribute('data-autojslog')) {
        const name = element.attributes["data-autojslog"].value;
        const e = document.getElementById(name);
        if (e == undefined) {
          console.log("autojslog " + name + " not found");
        } else {
          const once = element.hasAttribute('data-once');
          const updown = element.hasAttribute('data-onwindow');
          const slow = element.hasAttribute('data-slow');
          const changelog = element.hasAttribute('data-changelog');
          let running = true;
          let date = new Date().getTime();
          const cleanups = [];
          const listener = function(event) {
            if (once && !running) {
              return;
            } else {
              running = false;
            }
            cleanups.forEach(cleanup => cleanup());
            cleanups.length = 0; 
            e.innerHTML = "";
            const consolee = console;
            const windoww = window;
            {
              const console = {
                log : msg => {
                  const jump = new Date().getTime() - date;
                  date += jump;
                  if (changelog) {
                    e.innerHTML = pretty(msg);
                  } else if (!slow || jump > 10) {
                    e.appendChild(document.createTextNode(pretty(msg)));
                    e.appendChild(document.createElement("br"));
                  }
                }
              };
              const window = updown ? windoww : {
                addEventListener: (type, callback, rest) => {
                  windoww.addEventListener(type, callback, rest);
                  cleanups.push(() => {windoww.removeEventListener(type, callback, rest);});
                },
                setTimeout: (callback, duration) => {
                  const timeoutId = windoww.setTimeout(callback, duration);
                  cleanups.push(() => {windoww.clearTimeout(timeoutId);});
                },
                setInterval: (callback, duration) => {
                  const intervalId = windoww.setInterval(callback, duration);
                  cleanups.push(() => {windoww.clearInterval(intervalId);});
                },
                requestAnimationFrame: callback => {
                  windoww.requestAnimationFrame(callback);
                }
              };
              try {
                eval(element.value);
              } catch (err) {
                const error = document.createElement("div");
                error.setAttribute("class", "autojserror");
                error.appendChild(document.createTextNode(err));
                e.appendChild(error);
              }
            }
          };
          element.addEventListener('keyup', listener, false);
          Reveal.addEventListener('slidechanged', listener);
        }
      }

      if (element.hasAttribute('data-autojscanvas')) {
        const canvasId = element.attributes["data-autojscanvas"].value;
        const canvas = document.getElementById(canvasId);
        if (canvas == undefined) {
          console.log("autojscanvas " + canvasId + " not found");
        } else {
          const context = canvas.getContext("2d");
          const once = element.hasAttribute('data-once');
          let running = true;
          const listener = (isKeyListener, event) => {
            if (!once || running) {
              running = false;
              canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
              try {
                eval(element.value);
              } catch (err) {
                console.log(err);
              }
            }
          };
          element.addEventListener('keyup', listener.bind(undefined, true), false);
          Reveal.addEventListener('slidechanged', listener.bind(undefined, false));
      }}

      if (element.hasAttribute('data-autojs')) {
        const name = element.attributes["data-autojs"].value;
        const e = document.getElementById(name);
        const trimSemicolon = text => {
          return (text[text.length - 1] == ';') ? text.substring(0, text.length - 1) : text;
        };

        const listener = function(event) {
          e.innerHTML = "";
          const array = element.value.split('\n').map(
            function(line, num) {
              const instr = line.trim();
              if (instr == "") {
                return line;
              } else if (instr.startsWith("var")
                  || instr.startsWith("let")
                  || instr.startsWith("const")) {
                let index = instr.indexOf('=');
                return (index == -1) ? line : instr.substring(0, index) + "= tap(" 
                    + num + ", " + trimSemicolon(instr.substring(index + 1)) + ");";
              } else if (instr.startsWith("console.")
                  || instr.startsWith("return")
                  || instr.startsWith("if")
                  || instr.startsWith("while")
                  || instr.startsWith("for")
                  || instr.startsWith("}")
                  || instr.startsWith("//")) {
                return line;
              } else {
                return "tap(" + num + ", " + trimSemicolon(instr) + ");";
              }
            }
          );
          array.forEach(line => {
            const div = document.createElement("div");
            div.setAttribute("class", "autojsresult");
            div.appendChild(document.createTextNode(String.fromCharCode(160)));
            e.appendChild(div);
          });
          const tap = (num, val) => {
            const div = e.childNodes[num];
            div.replaceChild(document.createTextNode(pretty(val)), div.childNodes[0]);
            return val;
          };
          eval(array.join('\n'));
        };
        element.addEventListener('keyup', listener, false);
        Reveal.addEventListener('slidechanged', listener);
      }
    }
  }
}
