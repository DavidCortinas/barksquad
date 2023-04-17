export const CREATE_DOG = 'CREATE_DOG';
export const createDog = dog  => ({
    type: CREATE_DOG,
    payload: { dog },
});

export const UPDATE_DOG = "UPDATE_DOG";
export const updateDog = (updatedDog) => ({
    type: UPDATE_DOG,
    payload: { updatedDog },
});

export const REMOVE_DOG = 'REMOVE_DOG';
export const removeDog = dog => ({
    type: REMOVE_DOG,
    payload: { dog },
});

export const FILTER_DOGS = 'FILTER_DOGS';
export const filterDogs = (query, sizeFilter) => ({
    type: FILTER_DOGS,
    payload: { query, sizeFilter },
});

export const SORT_DOGS = 'SORT_DOGS';
export const sortDogs = sortOrder => ({
    type: SORT_DOGS,
    payload: { sortOrder },
});
