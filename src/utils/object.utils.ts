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
    if (isNaN(number) || !number) return 0;
    if (number >= 1000000000) return (number / 1000000000).toFixed(1) + "B";
    else if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    else if (number >= 1000) return (number / 1000).toFixed(1) + "K";
    else return number.toString();
}

export const comaFormattedNumber = (value: string) => {
    if (!value || isNaN(Number(value))) return value;
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (value: string = "") => {
    if (!value) return value;
    const inputDate = new Date("2023-10-28T00:00:00.000Z");
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate
};

export const uniqueArray = (arr: any[]) => {
    const seen = new Set();
    return arr.filter((item) => {
        const itemStr = JSON.stringify(item);
        if (!seen.has(itemStr)) {
            seen.add(itemStr);
            return true;
        }
        return false;
    });
}