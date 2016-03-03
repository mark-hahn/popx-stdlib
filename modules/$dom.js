
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
  
  case 'input':
    let sel = this.get('$sel');
    if (!Array.isArray(sel)) sel = [sel];
    let containerSel = sel[1];
    let multipleEles = (sel.length > 1);
    let container = (containerSel ? document.querySelector(containerSel) : null);
    let eles = (container ? container : document).querySelectorAll(sel);
    let evtValueSel = this.get('$evtValSel');
    
    let haveChangeEvt = false;
    let haveValueOut  = !!this.get('$value');
    let addEvent = ((pinName) => {
      let isEvent = (pinName.slice(-3) === 'Evt');
      let evtType = (isEvent ? pinName.slice(0, -3) : 'change');
      if (evtType === 'change') haveChangeEvt = true;
      let eleIdx = 0;
      for (let ele of eles) {
        (container ? container : ele).addEventListener(evtType,  
          ((ele, pinName, eleOut) => {
            return (event => {
              if (event.target === ele) {
                let eleVal = ele.value;
                if (haveValueOut) {
                  let data;
                  if (multipleEles) {
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
          })(ele, pinName, eleOut)
        );
        eleIdx++;
      }
    });
    for (let pinName of this.getInstancePins()) addEvent(pinName);
    if (!haveChangeEvt) addEvent('');
    break;
  
  case 'createEle':
    let tag = this.get($tag);
    let template = this.get('$template');
    this.react('$model', 'event', (_, model) => {
      let ele = document.createElement(tag ? tag : 'div');
      let html = '';
      if (template) {
        if (model) html = mustache.render(template, model);
        else html = template;
      }
      if (html) ele.innerHTML = html;
      this.emit('$ele', ele, {model});
    });
    break;
  
  case 'setClass':
    let klass = this.get('$class');
    this.react('$sel $if', 'value', (_, model) => {
      let eles = this.get('$ele');
      let ifs = this.get('$if');
      if (!Array.isArray(eles)) {
        if (ifs)  eles.classList.add(klass); 
        else      eles.classList.remove(klass);
      } else {
        for (i = 0; i < eles.length; i++) {
          if (ifs[i]) eles[i].classList.add(klass); 
          else        eles[i].classList.remove(klass);
        }
      }
    });
    break;
    
  default: 
    throw({
      fatal: true, 
      message: `invalid $op "${this.get('$op')}" for $dom module ${this.module.name}`
    });
}
