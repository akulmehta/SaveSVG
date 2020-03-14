import { svgStyle } from "./globalvars";

export function replacecss(svgid) {
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