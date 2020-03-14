import { svgStyle } from "./globalvars.js";

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

export async function readCSSFile(file) {
    var getUrl = window.location.href;
    getUrl = getUrl.split('/');
    getUrl.pop();
    getUrl = getUrl.join('/');
    getUrl += '/'
    let fileread = await readFile(getUrl + file).then(function (d) {
        svgStyle.data += d;
    })
        .catch(function (xhr) {
        });
}