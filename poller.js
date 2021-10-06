//----------------------------------------------------------------------------------
// This class allows a callback function to be called periodically.  
//
// It's similar to javascript's setInterval(), but offers the safety of requiring
// the callback to complete before scheduling the next invocation.  
//
// Thus, it's suited for potentially long-running callbacks (such as an internet 
// availability checker) that may have an asynchronous character.
//
// An instantiated poller responds to start and stop methods.  Its state is also
// observable by invoking the addObserver method with an object that defines
// an update() method.
//----------------------------------------------------------------------------------
function Poller(callback = () => {}, msec = 1000) {
  this.msec = msec
  this.callback = callback
  this.state = 'stopped'
  this.observers = new ObserverList()

  this._timeoutId = undefined
  this._abort = false;
}

Poller.prototype.addObserver = function(observer) {
  try {
    this.observers.add(observer)
  } catch(e) {
    console.log('Poller.addObserver():', e)
  }
}

Poller.prototype.removeObserver = function(observer) {
  this.observers.remove(observer)
}

Poller.prototype.notify = function(state) {
  let count = this.observers.count()
  for (let i = 0; i < count; i++) {
    this.observers.get(i).update(state)
  }
}

Poller.prototype.setState = function(state) {
  switch(state) {
    case 'starting':
    case 'polling':
    case 'stopping':
    case 'stopped':
      this.state = state
      this.notify(this.state)
      break
    default: {
      console.log('Poller.setState(). Ignoring illegal state:', state)
    }
  }
}

Poller.prototype.getState = function() {
  return state
}

Poller.prototype.poll = function() {
  this._timeoutId = setTimeout(this.cb.bind(this), this.msec)
}

Poller.prototype.cb = function() {
  if (this._abort) {
    clearTimeout(this._timeoutId)
    this.setState('stopped')
    this._timeoutId = undefined
  } else {
    this.poll()
    this.setState('polling')
    this.callback()
  }
}

Poller.prototype.start = function() {
  if (this._timeoutId) {
    return // Already polling.
  } else {
    this._abort = false
  }

  this.setState('starting')
  this.poll()
}

Poller.prototype.stop = function() {
  if (this._abort === false) {
    this._abort = true
    this.setState('stopping')
  }
}

Poller.prototype.managePolling = function(action) {
  switch(action) {
    case 'start': 
      this.start()
      break
    case 'stop':
      this.stop()
      break
    default:
      console.log("Poller.managePolling(action) Ignoring unknown action:", action)
  }
}
