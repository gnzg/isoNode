
// checks whether all object properties are false
/**
 *
 * @param {*} obj
 */
export default obj => {
    for (const property in obj) {
        if (obj[property] === false) {
            continue;
        } else {
            return false;
        }
    }
    return true;
};