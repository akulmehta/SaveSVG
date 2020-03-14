import { useArr } from "./globalvars";

export async function replaceuse(svgid) {

  var use = d3.selectAll(`#${svgid} use`).each(function (i) {
    var href = this.getAttribute('href');
    if (href === null) { href = this.getAttribute('xlink:href') }
    if (href === null) {return};
    var obj = {
      id: href.split('#')[1],
      x: this.getAttribute('x'),
      y: this.getAttribute('y'),
      height: this.getAttribute('height'),
      width: this.getAttribute('width')
    }

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