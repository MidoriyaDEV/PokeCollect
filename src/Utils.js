function capitalize(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1) || str;

}

function stringRemap(str) {
    return str?.replace(/-/g, ' ') || str;
    
}

const utils = {
    capitalize,
    stringRemap

}

export default utils;