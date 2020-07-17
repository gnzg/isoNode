export default options => {
    console.log(options);
    if (options.dimension !== null && options.position !== null) {
        return options.dimension === options.position;
    } else {
        return true;
    }
};