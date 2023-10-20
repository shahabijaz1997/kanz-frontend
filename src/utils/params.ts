export const getSearchParams = (spObj: any) => {
    return [
        spObj.get("type"),
    ];
};

export const generateSearchParamsGetter = (params: any) => {
    const page = params.get("page");
    const pageSize = params.get("pageSize");
    const search = params.get("search");
    const sortColumn = params.get("sortColumn");
    const sortOrder = params.get("sortOrder");

    return () => {
        let paramsString = `?page=${page}&pageSize=${pageSize}`;
        if (search) {
            paramsString += `&search=${search}`;
        }
        if (sortColumn && sortOrder) {
            paramsString += `&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
        }
        return paramsString;
    };
};

export const getNewSearchParamStringWithArgs = ({
    page,
    pageSize,
    search,
    sortColumn,
    sortOrder,
}: any) => {
    let searchParams = `?page=${page}&pageSize=${pageSize}`;
    if (search) {
        searchParams += `&search=${search}`;
    }
    if (sortColumn && sortOrder) {
        searchParams += `&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
    }
    return searchParams;
};