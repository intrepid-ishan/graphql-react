import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
    const [location, updateLocation] = useState("Seattle, WA");
    const [breeds, updateBreeds] = useState([]);

    //[state, component, updateState] = ("label", "defaultState", "options")
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

    const [pets, setPets] = useState([]);

    //ThemeContext hook
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        updateBreeds([]);
        updateBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            updateBreeds(breedStrings);
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

    const handleChange = (e) => {
        const { value } = e.target;//outside async
        setTheme((prevState) => ({
            ...prevState,
            buttonColor: value
        }));
    };

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
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="Theme">
                    Theme
                    <select
                        value={theme.buttonColor}
                        onChange={handleChange}
                        onBlur={handleChange}
                    >
                        <option value="darkblue">Dark Blue</option>
                        <option value="peru">Peru</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme?.buttonColor }}>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;