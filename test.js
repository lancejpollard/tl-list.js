
const TLList = require('.')

const list = new TLList(29)
console.log(list)
let i = 0
while (i < 29) {
  list.setItemAt(i, `foo${i++}`)
}
console.log(list)

list.forEach(val => console.log(val))

list.push('foo29')
list.push('foo30')
list.pop()
console.log(list)
