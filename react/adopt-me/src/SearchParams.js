import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';

const SearchParams = () => {
    const [location, updateLocation] = useState("Seattle, WA");
    const [breeds, updateBreeds] = useState([]);//#1

    //const [animal, updateAnimal] = useState()
    //const [breed,updateBreed] = useState()

    //[state, component, updateState] = ("label", "defaultState", "options")
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

    useEffect(() => {
        updateBreeds([]);
        updateBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            updateBreeds(breedStrings);//#1
        });
    }, [animal]);

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    location
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={e => updateLocation(e.target.value)}
                    />
                </label>
                {/* expand.... */}
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default SearchParams;