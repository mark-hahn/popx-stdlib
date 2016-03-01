/* pragma module = $arrayOps */

this.react('$item', 'event', (pinName, value, data) => {
  let array = this.get('$array');
  
  switch (this.get('$op')) {
    
    case 'unshift': array.unshift(value); break;
    
    case 'delete': 
      let index = array.indexOf(value);
      array.splice(index, 1);
      break;
      
  }
});
