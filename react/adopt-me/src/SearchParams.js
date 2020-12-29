import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';

const SearchParams = () => {
    const [location, updateLocation] = useState("Seattle, WA");
    const [breeds, updateBreeds] = useState([]);//#1

    //[state, component, updateState] = ("label", "defaultState", "options")
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

    const [pets, setPets] = useState([]);

    useEffect(() => {
        updateBreeds([]);
        updateBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            updateBreeds(breedStrings);//#1
        });
    }, [animal]);


    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });

        setPets(animals || []);
    }

    return (
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    requestPets();
                }}
            >
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
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;