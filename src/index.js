
const DB = require('./db')

class TLList {
  constructor(size) {
    this.size = size
    this.tree = createTree(size)
  }

  isFull() {
    return this.size === 256
  }

  setItemAt(i, value) {
    const path = DB.getPath(this.size, i)
    const n = path.length - 1

    let tree = this.tree
    let k = 0

    while (k < n) {
      tree = tree[path[k]]
      k++
    }

    tree[path[k]] = value
  }

  push(value) {
    if (this.isFull()) {
      throw new Error('TLList is full already.')
    }

    const oldShape = DB.shapeList[this.size - 1]
    const newShape = DB.shapeList[this.size]

    // If the two shapes are similar,
    // keep as much the same as you can.
    // That is, reuse the existing arrays
    // as much as possible.
  }

  pop() {

  }

  remove(i, size) {

  }
}

module.exports = TLList

function createTree(size) {
  const shape = DB.shapeList[size - 1]
  const nestSize = shape.length - 1
  const tree = new Array(shape[0] + nestSize)
  if (nestSize) {
    let i = 0
    while (i < nestSize) {
      tree[shape[0] + i] = new Array(shape[i + 1])
      i++
    }
  }
  return tree
}
