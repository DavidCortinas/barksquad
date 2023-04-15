import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewDogForm from './NewDogForm';
import Dog from './Dog';
import './DogList.css'
import { removeDog, searchDog } from './actions';
import UpdateDogForm from './UpdateDogForm';

const SearchAddBar = ({children}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='search-add-bar'>
            {children}
            <div className='modal-button'>
                <button className="create-button" type='button' onClick={() => setShowModal(true)}>
                    + Add Dog
                </button>
            </div>
            <div className='create-modal'>
                <NewDogForm showModal={showModal} setShowModal={setShowModal}/>
            </div>
        </div>
    )
};

const DogList = ({ dogs, onRemovePressed, onSearchPressed }) => {

    const [query, setQuery] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [filteredDogs, setFilteredDogs] = useState(dogs);
    const [sortOrder, setSortOrder] = useState("ascending");

  const handleSearch = (e) => {
    e.preventDefault();
    const updatedFilteredDogs = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(query.toLowerCase())
    );
    if (sizeFilter) {
        setFilteredDogs(
            updatedFilteredDogs.filter(dog => dog.size === sizeFilter)
        );
    } else {
        setFilteredDogs(updatedFilteredDogs);
    }
    onSearchPressed(query);
  };

  const handleSortByName = () => {
    const sortedDogs = [...filteredDogs].sort((a, b) =>
        sortOrder === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );
    setFilteredDogs(sortedDogs);
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending")
  };

  const handleFilterBySize = (e) => {
    const selectedSize = e.target.value;
    setSizeFilter(selectedSize);
    const updatedFilteredDogs = dogs.filter(dog =>
        dog.name.toLowerCase().includes(query.toLowerCase())
    );
    if (selectedSize) {
        setFilteredDogs(
            updatedFilteredDogs.filter(dog => dog.size === selectedSize)
        );
    } else {
        setFilteredDogs(updatedFilteredDogs);
    }
  };

    return (
        <div>
            <div>
                <SearchAddBar>
                    <div className='search'>
                    <form onSubmit={handleSearch}>
                        <input 
                            id="searchInput" 
                            name ="searchInput" 
                            type='text' 
                            value={query} 
                            placeholder="Search for a dog's name"
                            onChange={e => setQuery(e.target.value)} />
                        <button className="submit-button" type='submit'>Submit</button>
                    </form>
                </div>
                </SearchAddBar>
            </div>
            <div className='filter-sort-wrapper'>
                <button onClick={handleSortByName} className='sort-button'>
                    Sort dogs by name {sortOrder === "ascending" ? "↑" : "↓"}
                </button>
                <div className='filter-container'>
                    <label htmlFor='sizeFilter'>Filter by size: </label>
                    <select id="sizeFilter" onChange={handleFilterBySize}>
                        <option value="">All</option>
                        <option value="XS">XS</option>
                        <option value="SM">SM</option>
                        <option value="MD">MD</option>
                        <option value="LG">LG</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
            </div>
            <div className='dog-list-wrapper'>
                {filteredDogs.map((dog, index) => (
                <div className="card" key={dog.index}>
                    <Link to={`/barkspace/${dog.name}`} key={dog.index}>
                        <Dog dog={dog} onRemovePressed={onRemovePressed} />
                    </Link>
                    <div className="buttons-container" key={dog.index}>
                        <UpdateDogForm dog={dog} index={index} key={dog.index}/>
                        <button 
                            onClick={() => onRemovePressed(dog)}
                            className="delete-button"
                            key={dog.index}
                        >
                            X Remove Dog
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
);}

const mapStateToProps = (state) => {
    return {
        dogs: state.data.dogs,
    }
};

const mapDispatchToProps = dispatch => ({
    onRemovePressed: dog => dispatch(removeDog(dog)),
    onSearchPressed: query => dispatch(searchDog(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(DogList);