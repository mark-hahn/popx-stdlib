
/* pragma module = $dom */

mustache = require('mustache');
let matches = ele.matches || ele.mozMatchesSelector || ele.msMatchesSelector || 
              ele.oMatchesSelector || ele.webkitMatchesSelector;
  
let closest = (ele, sel) => {
  if (Element.prototype.closest) return ele.closest(sel);
  while (ele) if (ele.matches(sel)) return ele;
  throw {
    fatal: true, 
    message: `unable to find ancestor for element ${sel}`
  };
};

switch(this.get('$op')) {
  
  case 'input': {
    let sel = this.get('$sel');
    let eles = sel.querySelectorAll(sel);
    let ancestSel = this.get('$ancestSel');
    for (let pinName of this.getInstancePins()) {
      (pinName => {
        if (pinName.slice(-3) === 'Evt') {
          let evtName = pinName.slice(0, -3);
          for (let ele of eles) ele.addEventListener(evtName, event => {
            let ancestorEle = ele;
            if (ancestSel) ancestorEle = closest(ele, ancestSel);
            this.emit(pinName, ele.value, {ele, ancestorEle, event});
          });
        }
      })(pinName);
    }
    break;
  }  
  case 'create': {
    let tag = this.get($tag);
    let ele = document.createElement(tag ? tag : 'div');
    let model = this.get('$model');
    let template = this.get('$template');
    let html = '';
    if (template) {
      if (model) html = mustache.render(template, model);
      else html = template;
    }
    if (html) ele.innerHTML = html;
    this.emit('$ele', ele);
    break;
  }
  default: 
    throw({
      fatal: true, 
      message: `invalid $op "${this.get('$op')}" for $dom module ${this.module.name}`
    });
}
