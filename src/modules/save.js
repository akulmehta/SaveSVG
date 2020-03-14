import { readCSSFile } from "./readCSS";
import { readUSE } from "./readUse";
import { replacecss } from "./replacecss";
import { replaceuse } from "./replaceuse";

export async function save(svgID, cssFile, useFile) {
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