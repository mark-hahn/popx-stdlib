
let mustache = require('mustache');

let matches = Element.matches || Element.mozMatchesSelector || Element.msMatchesSelector || 
              Element.oMatchesSelector || Element.webkitMatchesSelector;
  
let closest = (ele, sel) => {
  if (Element.prototype.closest) return ele.closest(sel);
  while (ele) if (ele.matches(sel)) return ele;
  throw {
    fatal: true, 
    message: `unable to find ancestor for element ${sel}`
  };
};

let getEles = (sel) => {
  if (sel instanceof Element) return {eles:[sel]};
  let containerSel;
  if (Array.isArray(sel)) {
    if (sel[0] instanceof Element) return {eles:sel};
    containerSel = sel[1];
    sel = sel[0];
  }
  let container = (containerSel ? document.querySelector(containerSel) : null);
  let eles = (container ? container : document).querySelectorAll(sel);
  return {container, eles};
};

switch(this.get('$op')) {
  
  case 'input':
    let contEles = getEles(this.get('$sel'));
    let container = contEles.container;
    let eles = contEles.eles;
    let evtValueSel = this.get('$evtValSel');
    
    let haveChangeEvt = false;
    let haveValueOut  = !!this.get('$value');
    let addEvent = ((pinName) => {
      let isEvent = (pinName.slice(-3) === 'Evt');
      let evtType = (isEvent ? pinName.slice(0, -3) : 'change');
      if (evtType === 'change') haveChangeEvt = true;
      let eleIdx = 0;
      [].forEach.call(eles, ele => {
        (container ? container : ele).addEventListener(evtType,  
          ((ele, pinName) => {
            return (event => {
              if (event.target === ele) {
                let eleVal = ele.value;
                if (haveValueOut) {
                  let data;
                  if (eles.length > 1) {
                    let wireVal = this.get(pinName) || {data: [], meta};
                    data = Popx.setFrozenAttr(wireVal.data, [eleIdx], eleVal);
                    meta = wireVal.meta;
                    meta.isArray = true;
                  } else {
                    data = eleVal;
                    meta = {};
                  }
                  meta.ele = ele;
                  meta.event = event;
                  this.set('$value', data, meta);
                }
                if (isEvent) {
                  let data = (evtValueSel ? closest(ele, evtValueSel) : eleVal);
                  this.emit(pinName, data, {ele, event});
                }
              }
            });
          })(ele, pinName)
        );
        eleIdx++;
      });
    });
    for (let pinName of this.getInstancePins()) addEvent(pinName);
    if (!haveChangeEvt) addEvent('');
    break;
  
  case 'createEle':
    let tag = this.get('$tag');
    let template = this.get('$template');
    this.react('$model', 'event', (_, model) => {
      let ele = document.createElement(tag ? tag : 'div');
      let html = '';
      if (template) {
        if (model) html = mustache.render(template, model);
        else html = template;
      }
      if (html) ele.innerHTML = html;
      this.emit('$eleEvt', ele, {model});
    });
    break;
  
  case 'setClass':
    let klass = this.get('$class');
    this.react('$sel $if', 'value', (_, model) => {
      let eles = getEles(this.get('$sel')).eles;
      let ifs = this.get('$if');
      if (!Array.isArray(ifs)) ifs = [ifs];
      for (i = 0; i < eles.length; i++) {
        if (ifs[Math.min(i, ifs.length-1)]) 
             eles[i].classList.add(klass); 
        else eles[i].classList.remove(klass);
      }
    });
    break;
    
  case 'setChildren':
    let parents = getEles(this.get('$parent')).eles;
    let parent = parents[0];
    this.react('$children', 'value', (_, children) => {
      while (parent.firstChild) parent.removeChild(parent.firstChild);
      if(!Array.isArray(children)) children = [children];
      for (let child of children) parent.appendChild(child);
    });
    break;
    
  default: 
    utils.fatal(`invalid $op "${this.get('$op')}" for $dom module ${this.module.name}`);
}
