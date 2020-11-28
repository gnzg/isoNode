// checks whether object is empty
/**
 * 
 * @param {*} obj 
 */
export let isObjectEmpty = obj => {
    return Object.keys(obj).length === 0;
}

// checks whether all object properties are false
/**
 * 
 * @param {*} obj 
 */
export let areAllObjectPropsFalse = obj => {
    for (const property in obj) {
      if (obj[property] == false) {
        continue;
      } else {
        return false;
      }
    }
    alert("all keys unregistered");
    return true;
}