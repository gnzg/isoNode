// returns true is object is empty
/**
 * 
 * @param {*} obj 
 */
export let isObjectEmpty = obj => {
    return Object.keys(obj).length === 0;
}
/**
 * 
 * @param {*} obj 
 */
export let areObjectPropsEmpty = obj => {
    for (const property in obj) {
      if (obj[property] == false) {
        continue;
      } else {
        return false;
      }
    }
    return true;
}