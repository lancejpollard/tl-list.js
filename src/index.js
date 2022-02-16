
const DB = require('./db')

class TLList {
  constructor(size) {
    this.size = size
    this.tree = createTree(size)
  }

  isFull() {
    return this.size === 256
  }

  isEmpty() {
    return this.size === 0
  }

  setItemAt(i, val) {
    setItemAt(this.size, this.tree, i, val)
  }

  getItemAt(i) {
    return getItemAt(this.size, this.tree, i)
  }

  forEach(callback) {
    let i = 0
    while (i < this.size) {
      callback(this.getItemAt(i), i)
      i++
    }
  }

  push(val) {
    if (this.isFull()) {
      throw new Error('TLList is full already.')
    }

    // TODO:
    //
    // If the two shapes are similar,
    // keep as much the same as you can.
    // That is, reuse the existing arrays
    // as much as possible.
    //
    // const oldShape = DB.shapeList[this.size - 1]
    // const newShape = DB.shapeList[this.size]
    //
    // if (oldShape[0] === newShape[0]) {

    // } else {

    const newSize = this.size + 1
    const newTree = createTree(newSize)
    this.forEach((oldVal, i) => {
      setItemAt(newSize, newTree, i, oldVal)
    })

    setItemAt(newSize, newTree, newSize - 1, val)

    this.tree = newTree
    this.size = newSize
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('TLList is already empty.')
    }

    const newSize = this.size - 1
    const newTree = createTree(newSize)

    this.forEach((oldVal, i) => {
      if (i < newSize) {
        setItemAt(newSize, newTree, i, oldVal)
      }
    })

    this.tree = newTree
    this.size = newSize
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

function getItemAt(size, tree, i) {
  const path = DB.getPath(size, i)
  if (path.length === 2) {
    return tree[path[0]][path[1]]
  } else {
    return tree[path[0]]
  }
}

function setItemAt(size, tree, i, val) {
  const path = DB.getPath(size, i)

  if (path.length === 2) {
    tree[path[0]][path[1]] = val
  } else {
    tree[path[0]] = val
  }
}
