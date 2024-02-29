function filterObject(obj, ...allowfields) {

    const newObj = {};
    // it loops through all keys in the obj 
    // For each key, it checks if the allowedFields array includes that key.
    // If the key is in allowedFields, it adds that key - value pair to newObj.
    // Finally, it returns the newObj containing only the allowed fields.

    Object.keys(obj).forEach(key => {

        if (allowfields.includes(key)) {

            newObj[key] = obj[key];
        }
    })


    return newObj;
}