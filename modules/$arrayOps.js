/* pragma module = $arrayOps */

this.react('$item', 'event', (pinName, data, meta) => {
  let arrayValue = this.get('$array');
  
  switch (this.get('$op')) {
    
    case 'unshift': 
      arrayValue.data = this.setFrozenAttr(arrayValue.data, 'unshift', data); 
      break;
    
    case 'remove': 
      let index = array.indexOf(arrayValue.data);
      arrayValue.data = this.setFrozenAttr(arrayValue.data, [index]); 
      break;
  }
});
