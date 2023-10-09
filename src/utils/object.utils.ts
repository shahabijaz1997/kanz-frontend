export const isEmpty = (value: any) => {
    if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return Object.keys(value).length === 0;
        }
    } else if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    return true;
}

export const filterObjectsByTrueValue = (objectsArray: any, key: any) => {
    return objectsArray.filter((obj: any) => obj[key] === true).map((obj1: any) => obj1.id);
}

export const numberFormatter = (number: number) => {
    if(isNaN(number)) return 0;
    if (number >= 1000000000) return (number / 1000000000).toFixed(1) + "B";
    else if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    else if (number >= 1000) return (number / 1000).toFixed(1) + "K";
    else return number.toString();
}