
/* pragma module = $newObject */

this.react('*', 'event', (pinName, data, meta) => {
  let instance = {};
  for (let instancePinName of this.getInstancePins())
      instance[instancePinName] = this.get(instancePinName);
  this.emit('$instance', instance);
});
