
const POWER_OF_2_LIST = [1, 2, 4, 8, 16, 32, 64, 128, 256]
const shapeList = collectShapeList()
const POSSIBLE_SHAPE_LIST = getPossibleShapeList(shapeList)
const CODE_LIST = shapeList.map(encode)

module.exports = {
  CODE_LIST,
  shape,
  shapeList,
  getPath
}

function getPath(size, i) {
  let code = CODE_LIST[size - 1]
  let limit = POSSIBLE_SHAPE_LIST[code % POSSIBLE_SHAPE_LIST.length]

  if (i < limit) {
    return [i]
  }

  for (let sub = limit; code; sub++) {
    i -= limit
    code = Math.floor(code /  POSSIBLE_SHAPE_LIST.length)
    limit = POSSIBLE_SHAPE_LIST[code % POSSIBLE_SHAPE_LIST.length]
    if (i < limit) {
      return [sub, i]
    }
  }
}

function getPossibleShapeList(shapes) {
  const used = new Set(POWER_OF_2_LIST)
  for (const shapeNumbers of shapes) {
    used.add(shapeNumbers[0])
  }
  return [...used].sort((a, b) => a - b)
}

function collectShapeList() {
  let list = []

  for (let n = 1; n <= 256; n++) {
    let shapeNumbers = shape(n)
    list.push(shapeNumbers)
  }

  return list
}

function encode(shapeNumbers) {
  let code = 0

  for (let i = shapeNumbers.length - 1; i >= 0; i--) {
    code = code * POSSIBLE_SHAPE_LIST.length + POSSIBLE_SHAPE_LIST.indexOf(shapeNumbers[i])
  }

  return code
}

/**
 * Returns number of atomic entries,
 * followed by data-size(s) of subarrays
 */

function shape(n) {
  let p = greatestPowerOf2(n);
  if (p >= n) {
    // The only cases where there are no subarrays
    return [n];
  }

  // Try with one subarray
  for (let sub = 2; sub < n && sub <= 256; sub *= 2) {
    let top = n - sub + 1;
    p = greatestPowerOf2(top);
    if (p >= top) {
      return [p - 1, sub];
    }
  }

  // Try with two subarrays
  for (let sub1 = 2; sub1 < n && sub1 <= 256; sub1 *= 2) {
    for (let sub2 = 2; sub2 <= sub1; sub2 *= 2) {
      let top = n - sub1 - sub2 + 2;
      if (top < 0) break;
      p = greatestPowerOf2(top);
      if (p >= top) {
        return [p - 2, sub1, sub2];
      }
    }
  }

  // Try with three subarrays
  for (let sub1 = 2; sub1 < n && sub1 <= 256; sub1 *= 2) {
    for (let sub2 = 2; sub2 <= sub1; sub2 *= 2) {
      for (let sub3 = 2; sub3 <= sub2; sub3 *= 2) {
        let top = n - sub1 - sub2 - sub3 + 3;
        if (top < 0) break;
        p = greatestPowerOf2(top);
        if (p >= top) {
          return [p - 3, sub1, sub2, sub3];
        }
      }
    }
  }

  // Try with four subarrays
  for (let sub1 = 2; sub1 < n && sub1 <= 256; sub1 *= 2) {
    for (let sub2 = 2; sub2 <= sub1; sub2 *= 2) {
      for (let sub3 = 2; sub3 <= sub2; sub3 *= 2) {
        for (let sub4 = 2; sub4 <= sub3; sub4 *= 2) {
          let top = n - sub1 - sub2 - sub3 - sub4 + 4;
          if (top < 0) break;
          p = greatestPowerOf2(top);
          if (p >= top) {
            return [p - 4, sub1, sub2, sub3, sub4];
          }
        }
      }
    }
  }

  // Try with five subarrays
  for (let sub1 = 2; sub1 < n && sub1 <= 256; sub1 *= 2) {
    for (let sub2 = 2; sub2 <= sub1; sub2 *= 2) {
      for (let sub3 = 2; sub3 <= sub2; sub3 *= 2) {
        for (let sub4 = 2; sub4 <= sub3; sub4 *= 2) {
          for (let sub5 = 2; sub5 <= sub4; sub5 *= 2) {
            let top = n - sub1 - sub2 - sub3 - sub4 - sub5 + 5;
            if (top < 0) break;
            p = greatestPowerOf2(top);
            if (p >= top) {
              return [p - 5, sub1, sub2, sub3, sub4, sub5];
            }
          }
        }
      }
    }
  }

  // Try with 6 subarrays
  for (let sub1 = 2; sub1 < n && sub1 <= 256; sub1 *= 2) {
    for (let sub2 = 2; sub2 <= sub1; sub2 *= 2) {
      for (let sub3 = 2; sub3 <= sub2; sub3 *= 2) {
        for (let sub4 = 2; sub4 <= sub3; sub4 *= 2) {
          for (let sub5 = 2; sub5 <= sub4; sub5 *= 2) {
            for (let sub6 = 2; sub6 <= sub5; sub6 *= 2) {
              let top = n - sub1 - sub2 - sub3 - sub4 - sub5 - sub6 + 6;
              if (top < 0) break;
              p = greatestPowerOf2(top);
              if (p >= top) {
                return [p - 6, sub1, sub2, sub3, sub4, sub5, sub6];
              }
            }
          }
        }
      }
    }
  }

  // Try with 7 subarrays
  for (let sub1 = 2; sub1 < n && sub1 <= 256; sub1 *= 2) {
    for (let sub2 = 2; sub2 <= sub1; sub2 *= 2) {
      for (let sub3 = 2; sub3 <= sub2; sub3 *= 2) {
        for (let sub4 = 2; sub4 <= sub3; sub4 *= 2) {
          for (let sub5 = 2; sub5 <= sub4; sub5 *= 2) {
            for (let sub6 = 2; sub6 <= sub5; sub6 *= 2) {
              for (let sub7 = 2; sub7 <= sub6; sub7 *= 2) {
                let top = n - sub1 - sub2 - sub3 - sub4 - sub5 - sub6 - sub7 + 7;
                if (top < 0) break;
                p = greatestPowerOf2(top);
                if (p >= top) {
                  return [p - 7, sub1, sub2, sub3, sub4, sub5, sub6, sub7];
                }
              }
            }
          }
        }
      }
    }
  }

  throw new Error(n)
}

function greatestPowerOf2(n) {
  return n >= 256 ? 256 : n >= 128 ? 128 : n >= 64 ? 64 : n >= 32 ? 32 : n >= 16 ? 16 : n >= 8 ? 8 : n >= 4 ? 4 : n >= 2 ? 2 : 1;
}
