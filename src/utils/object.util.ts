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

export function filterObjectsByTrueValue(objectsArray: any, key: any) {
    return objectsArray.filter((obj: any) => obj[key] === true).map((obj1: any) => obj1.id);
  }