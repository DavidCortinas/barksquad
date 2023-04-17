import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewDogForm from './NewDogForm';
import Dog from './Dog';
import './DogList.css'
import pawbadge from '../assets/pawbadge.png';
import { removeDog, filterDogs, sortDogs } from './actions';
import UpdateDogForm from './UpdateDogForm';
import RemoveDogModal from './RemoveDogModal';

const SearchAddBar = ({query, handleSearch, handleSearchInput}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='search-add-bar'>
            <div className='search'>
                <form className='search' onSubmit={handleSearch}>
                    <input 
                        id="searchInput" 
                        name ="searchInput" 
                        type='text' 
                        value={query} 
                        placeholder="Search..."
                        onChange={e => handleSearchInput(e)} />
                    <button className="submit-button" type='submit'>Submit</button>
                </form>
            </div>
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

const DogList = ({ onRemovePressed, onSearchPressed, onSortPressed, onFilterBySize }) => {

    const [query, setQuery] = useState("");
    const [missingDog, setMissingDog] = useState("")
    const [sizeFilter, setSizeFilter] = useState("");
    const { dogs, filteredDogs, sortOrder } = useSelector(
        (state) => state.data
    );

  const handleSearch = e => {
    e.preventDefault();
    onSearchPressed(query, sizeFilter);
    setQuery("");
  };

  const handleSortByName = () => {
    onSortPressed(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const handleFilterBySize = e => {
    setSizeFilter(e.target.value);
    onFilterBySize(query, e.target.value);
  };

  const handleSearchInput = e => {
    setQuery(e.target.value)
    setMissingDog(e.target.value)
  };

  const useDogs = !filteredDogs ?  dogs : filteredDogs

    return (
        <div>
            <SearchAddBar 
                handleSearch={handleSearch} 
                handleSearchInput={handleSearchInput}
                query={query}
            />
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
            {useDogs.map((dog, index) => (
            <div className="card" key={dog.name}>
                <Link to={`/${dog.name}`}>
                    <div className='dog-badge-container'>
                        <img src={pawbadge} className="badge" alt="logo" />
                        <Dog dog={dog} onRemovePressed={onRemovePressed} />
                    </div>
                </Link>
                <div className='buttons-container'>
                        <div className="left-buttons-container" key={dog.name}>
                    <Link to={`/${dog.name}`}>
                        <button 
                            className="meet-button"                          
                        >
                            Meet {dog.name}
                        </button>                   
                    </Link>
                    <UpdateDogForm dog={dog} index={index} />
                </div>
                <RemoveDogModal dog={dog} />
                </div>
            </div>
            ))}
            <h3 className='missing-dog-prompt'>{useDogs.length === 0 && sizeFilter === ""  ? 
            `There are no dogs named ${missingDog.charAt(0).toUpperCase().concat(missingDog.slice(1))} around here` 
            : useDogs.length === 0
            ? `There are no ${sizeFilter} dogs around here`
            : null}</h3>
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
    onSearchPressed: (query, sizeFilter) => dispatch(filterDogs(query, sizeFilter)),
    onSortPressed: newSortOrder => dispatch(sortDogs(newSortOrder)),
    onFilterBySize: (query, sizeFilter) => dispatch(filterDogs(query, sizeFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DogList);