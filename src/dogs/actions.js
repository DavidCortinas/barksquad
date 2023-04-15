export const CREATE_DOG = 'CREATE_DOG';
export const createDog = dog  => ({
    type: CREATE_DOG,
    payload: { dog },
});

export const UPDATE_DOG = "UPDATE_DOG";
export const updateDog = (index, updatedDog) => ({
    type: UPDATE_DOG,
    payload: { index, updatedDog },
});

export const REMOVE_DOG = 'REMOVE_DOG';
export const removeDog = dog => ({
    type: REMOVE_DOG,
    payload: { dog },
});

export const SEARCH_DOG = 'SEARCH_DOG';
export const searchDog = query => ({
        type: SEARCH_DOG,
        payload: { query } 
})
