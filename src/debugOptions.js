// control depending on parameter combination
// which dimension or tile set to draw
export default options => {
    if (options.dimension !== null && options.position !== null) {
        return options.dimension === options.position;
    } else {
        return true;
    }
};