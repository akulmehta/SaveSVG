import { useArr } from "./globalvars";

export async function readUSE(usefile) {
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