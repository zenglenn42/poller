//----------------------------------------------------------------------------------
// Observer List
//
// This class manages a list of observers that needed to be notified when
// a subject's state has changed.
//
// Inspired by: Addy Osmani's 'Learning JavaScript Design Patterns'
//----------------------------------------------------------------------------------

function ObserverList() {
  this.list = []
}

ObserverList.prototype.add = function(obj) {
  if (obj.update && typeof obj.update === 'function') {
    return this.list.push(obj)
  } else {
    throw Error('Observer is missing an update method. Notification disabled.')
  }
}

ObserverList.prototype.empty = function() {
  this.list = []
}

ObserverList.prototype.count = function() {
  return this.list.length
}

ObserverList.prototype.get = function(index) {
  if (index > -1 && index < this.list.length) {
    return this.list[index]
  }
}

ObserverList.prototype.indexOf = function(obj, startIndex = 0) {
  let i = startIndex
  let index = -1

  while (i < this.list.length) {
    if (this.list[i] === obj) {
      index = i
      break
    }
    i++
  }

  return index
}

ObserverList.prototype.removeAt = function(index) {
  if (index > -1 && index < this.list.length) {
    this.list = this.list.splice(index, 1)
  }
}

ObserverList.prototype.remove = function(obj) {
  this.removeAt(this.indexOf(obj))
}
