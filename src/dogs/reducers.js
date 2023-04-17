import { CREATE_DOG, UPDATE_DOG, REMOVE_DOG, SORT_DOGS, FILTER_DOGS } from "./actions";

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
    sortOrder: '',
};

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_DOG: {
        const { dog } = payload;
        const newDogs = state.dogs.concat(dog)
        return {
            ...state,
            dogs: newDogs,
            filteredDogs: newDogs
        };
    }
    case UPDATE_DOG: {
        const { updatedDog } = payload;
        const dogIndex = state.dogs.findIndex(dog => dog.name === updatedDog.name)
        const filteredDogIndex = state.filteredDogs.findIndex(dog => dog.name === updatedDog.name)
        const newDogs = [
            ...state.dogs.slice(0, dogIndex),
            updatedDog,
            ...state.dogs.slice(dogIndex + 1)
        ];
        const newFilteredDogs = [
            ...state.filteredDogs.slice(0, filteredDogIndex),
            updatedDog,
            ...state.filteredDogs.slice(filteredDogIndex + 1)
        ];
        return {
            ...state,
            dogs: newDogs,
            filteredDogs: newFilteredDogs
        }
    }
    case REMOVE_DOG: {
        const { dog } = payload;
        const newDogs = state.dogs.filter(dogToRemove => dogToRemove !== dog);
        return {
            ...state,
            dogs: newDogs,
            filteredDogs: newDogs,
        };
    }
    case FILTER_DOGS: {
        const { query, sizeFilter } = payload; 
        let filteredDogs = state.dogs.filter(dog => {
          const nameMatch = dog.name.toLowerCase().includes(query.toLowerCase())
          const sizeMatch = sizeFilter === "" || dog.size === sizeFilter;
          return nameMatch && sizeMatch; 
        });
        return {
            ...state,
            filteredDogs: filteredDogs,
        };
    }
    case SORT_DOGS: {
        const { sortOrder } = payload;
        const sortedDogs = [...state.dogs].sort((a, b) =>
        sortOrder === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        const sortedFilteredDogs = [...state.filteredDogs].sort((a, b) =>
        sortOrder === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        return {
            ...state,
            sortOrder,
            dogs: sortedDogs,
            filteredDogs: sortedFilteredDogs,
        }
    }
    default:
        return state;
    }
}