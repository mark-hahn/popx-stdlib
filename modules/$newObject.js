
/* pragma module = $newObject */

this.react('*', 'event', (pinName, data, meta) => {
  let instance = {};
  for (let instancePinName of this.getInstancePins())
      instance[instancePinName] = 
          (instancePinName === pinName ? data : this.get(instancePinName));
  this.emit('$newObjEvt', instance);
});
