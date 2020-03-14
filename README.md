# SaveSVG.js

Have you ever wanted an easy way to allow users to save an SVG file (e.g. D3.js chart) to their computer. SaveSVG is a JavaScript library which allows you to help your users download SVG content from your webpage. SaveSVG goes beyond just copying your SVG element to a file. It allows you to specify CSS files and SVG `<use>` element files to recompile a complete SVG with all styles and hrefs for saving.  
  

## Getting started

### Requirements

- This library requires D3.js v5. Remember to add this to your HTML `<head>` using:
```
<script src="https://d3js.org/d3.v5.min.js"></script>
```
- You must have all your CSS styles in one file. For e.g. in the `dist` example it is all located in the `dist/css/styles.css` file.
- You must have all your SVG `<use>` definitions in one file. For e.g. in the `dist` example it is all located in the `dist/images/monos.svg` file. This file must have `<symbol>` defined for each component being fetched using `use` with `id` attributes which would match your SVG in your HTML.

### Usage
To add the library to your project, simply copy the `SaveSVG.min.js` located in the `dist` folder to your project folder. Then simply add it to your HTML using the `<script>` tags like

```
<script src='SaveSVG.min.js'></script>
```
Once you have added this to your HTML, you can trigger the save function by calling
```
SaveSVG.save(svgID, cssFile, useFile);
```
where: 
- `svgID` is the ID of your SVG element in your HTML as a *string*. For e.g. `'mySVG'`.
- `cssFile` is the relative path to your cssFile from your HTML file as a *string*. For e.g. `'css/styles.css'`.
- `useFile` is the relative path to your file with the `<use>` `<defs>` from your HTML file as a *string*. For e.g. `'images/monos.svg'`.
  

## License
[MIT](LICENSE)
