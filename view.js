//----------------------------------------------------------------------------------
// This object serves as an observer of a poller instance in our test.
//
// So it must define an update() method which will be registered and called
// by the poller periodically.
//----------------------------------------------------------------------------------
function View(divId) {
  this.divId = divId
}

View.prototype.update = function(msg) {
  let resultsEl = document.getElementById(this.divId)
  if (resultsEl) {
    if (msg === 'polling') {
      msg += ' (see browser console for callback activity)'
    }
    resultsEl.textContent = msg 
  }
}
