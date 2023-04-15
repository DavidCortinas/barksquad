import { CREATE_DOG, UPDATE_DOG, REMOVE_DOG, SEARCH_DOG } from "./actions";

const initialState = {
    dogs: [
        {
            name: "Saul",
            breed: "Lab",
            owner: "Dave",
            size: "LG",
            description: "An energetic lab that loves to play"
        }, 
        {
            name: "Goldie",
            breed: "Lab",
            owner: "Dave",
            size: "LG",
            description: "Office mommy dog"
        }, 
        {
            name: "Gio",
            breed: "Terrier",
            owner: "Dan",
            size: "SM",
            description: "A fluffy terrier mix who runs on treats"
        }, 
        {
            name: "Sophie",
            breed: "Pit Bull",
            owner: "Christina",
            size: "MD",
            description: "A brindled pitbull princess",
        }, 
        {
            name: "Taro",
            breed: "Great Pyrenees",
            owner: "Sara",
            size: "XL",
            description: "A great pyrenees mix often confused with a horse"
        }, 
        {
            name: "Gabby",
            breed: "Pit Bull",
            owner: "Dan",
            size: "MD",
            description: "A tutu-flaunting American bulldog/pitbull mix"
        }, 
        {
            name: "Percy",
            breed: "Husky",
            owner: "Monica",
            size: "LG",
            description: "A wolf-sized pup with piercing blue eyes"
        },
        {
            name: "Benny",
            breed: "Hound",
            owner: "Brandon",
            size: "MD",
            description: "A belly-rub loving hound-mix"
        },
        {
            name: "Baxter",
            breed: "Chihuahua",
            owner: "Skip",
            size: "XS",
            description: "The eldest, wisest, and tiniest dog of the office"
        },
        {
            name: "Vyla",
            breed: "Poodle",
            owner: "Skip",
            size: "SM",
            description: "The resident toy and bone hoarder"
        },
    ],
    searchResults: [],
}

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_DOG: {
        const { dog } = payload;
        return {
            ...state,
            dogs: state.dogs.concat(dog)
        };
    }
    case UPDATE_DOG: {
        const { index, updatedDog } = payload;
        const newDogs = [
            ...state.dogs.slice(0, index),
            updatedDog,
            ...state.dogs.slice(index + 1)
        ]
        return {
            ...state,
            dogs: newDogs
        }
    }
    case REMOVE_DOG: {
        const { dog } = payload;
        return {
            ...state,
            dogs: state.dogs.filter(dogToRemove => dogToRemove !== dog)
        };
    }
    case SEARCH_DOG: {
        const { query } = payload
        const searchResults = state.dogs.filter(dog => dog.name.toLowerCase().includes(query.toLowerCase()))
        return {
            ...state,
            searchResults
        }
    }
    default:
        return state;
    }
}