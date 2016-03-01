
## Popx standard libray

Collection of standard JS code modules to be included in popx declarative modules.


### dom
  - **textInput**
    - attaches to text input element to provide value and emit events
    - value inputs
      - *selector*: CSS selector for input element
    - value outputs
      - *text*: element value
    - event outputs
      - *changed* element value


### utils

  - **log**
    - each pin input creates a timestamped line with pin name and value
    - event inputs
      - *** input: any number of input pins that create log lines
    - value inputs
      - *console* boolean input: send log to stdout (default:true)
      - *path* optional output file path 
      
      
  - **constant**
    - usually generated automatically by popx compiler
    - state
      - the constant value
    - value outputs
      - *out* a constant value set once at startup
      
      
### compatiblility

  - Internet Explorer 9+
  - Firefox 3.6+
  - Chrome
  - Opera 11.5+
  - Android 2.2+
  - Blackberry 7+
  - iOS Safari 4+
  - Safari 5+
