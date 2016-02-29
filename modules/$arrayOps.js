
/* pragma:module = $arrayOps */

this.react('$init', _=> {
  if (this.changeListener) {
    this.ele.removeEventListener('change', this.changeListener);
    delete this.changeListener;
  }
  let selector = this.get('selector');
  if (selector) {
    this.ele = document.querySelector(selector);
    this.changeListener = e => this.emit('change', e.target.value);
    this.ele.addEventListener('change', this.changeListener);
  }
});
