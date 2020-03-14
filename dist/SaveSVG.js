//  v1.0.0 Copyright 2020 Akul Mehta
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.SaveSVG = {}));
}(this, (function (exports) { 'use strict';

  var svgStyle = {
    data : "",
  };

  var useArr = {
    data : [],
  };

  function readFile(file) {
      return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(xhr.responseText);
                  } else {
                      reject(xhr);
                  }
              }
          };
          xhr.open("GET", file);
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.send();
      });
  }

  async function readCSSFile(file) {
      var getUrl = window.location.href;
      getUrl = getUrl.split('/');
      getUrl.pop();
      getUrl = getUrl.join('/');
      getUrl += '/';
      let fileread = await readFile(getUrl + file).then(function (d) {
          svgStyle.data += d;
      })
          .catch(function (xhr) {
          });
  }

  function replacecss(svgid) {
    var allStyle = svgStyle.data.replace(/\/\*.*\*\//g, '').replace(/\r?\n|\r/g, '').split('}');
    allStyle.forEach(function (el) {
      if (el.trim() != '') {
        var full_rule_string = el.split('{');
        var selector = full_rule_string[0].trim();
        var all_rule = full_rule_string[1].split(';');
        all_rule.forEach(function (elem) {
          if (elem.trim() != '') {
            var attr_value = elem.split(':');
            var prop = attr_value[0].trim();
            var value = attr_value[1].trim();
            if (prop == 'font-weight') {
              d3.select('#' + svgid).selectAll(selector).each(function (d, i) {
                if (!this.getAttribute(prop) && this.style[prop] !== value) {
                  d3.select(this).style(prop + '', value + '');
                }
              });
            } else {
              d3.select('#' + svgid).selectAll(selector).each(function (d, i) {
                if (!this.getAttribute(prop) && !this.style[prop]) {
                  d3.select(this).style(prop + '', value + '');
                }
              });
            }
          }
        });
      }
    });

  }

  async function readUSE(usefile) {
    let fetchSVG = await d3.xml(usefile).then(function (data) {
      useArr.data = [].map.call(data.querySelectorAll("symbol"), function (symbol) {
          return {
              id: symbol.getAttribute("id"),
              viewBox: symbol.getAttribute('viewBox'),
              innerhtml: symbol.innerHTML.replace(/\n|\t/g, '').trim(),
          };
      });
      return useArr.data;
  });
  }

  async function replaceuse(svgid) {

    var use = d3.selectAll(`#${svgid} use`).each(function (i) {
      var href = this.getAttribute('href');
      if (href === null) { href = this.getAttribute('xlink:href'); }
      if (href === null) {return}    var obj = {
        id: href.split('#')[1],
        x: this.getAttribute('x'),
        y: this.getAttribute('y'),
        height: this.getAttribute('height'),
        width: this.getAttribute('width')
      };

      var eachUse = useArr.data.find(e => {
        return e.id == obj.id;
      });

      d3.select(this.parentNode).append('svg')
                                .attr('id', obj.id)
                                .attr('x', obj.x)
                                .attr('y', obj.y)
                                .attr('height', obj.height)
                                .attr('width', obj.width)
                                .attr('viewBox', eachUse.viewBox)
                                .html(eachUse.innerhtml)
                                .lower();
    })
    .remove();
  }

  async function save(svgID, cssFile, useFile) {
    if (cssFile !== null) {
      await readCSSFile(cssFile);
      replacecss(svgID);
    }
    if (useFile !== null) {
      await readUSE(useFile);
      replaceuse(svgID);
    }
    var svgData = document.getElementById(svgID);

    svgData.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgData.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svgData = document.getElementById(svgID).outerHTML;
    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "Figure.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  exports.readCSSFile = readCSSFile;
  exports.readUSE = readUSE;
  exports.replacecss = replacecss;
  exports.replaceuse = replaceuse;
  exports.save = save;
  exports.svgStyle = svgStyle;
  exports.useArr = useArr;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
