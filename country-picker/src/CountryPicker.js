import React, { useState, useEffect } from 'react';
import './CountryPicker.css';                                               // Henter inn css filen


function CountryPicker() {
  const [countries, setCountries] = useState([]);                           // lager et tomt array for å lagre listen med land fra APIet
  const [selectedCountries, setSelectedCountries] = useState([]);           // lager et tomt array for å lagre listen med land som brukeren velger
  const [selectedContinent, setSelectedContinent] = useState('');           // henter en verdi fra kontinent
   
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())                                    //henter JSON-data fra APIet
      .then(data => {                                                       //mottar JSON-data og binder det til variabelen data
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));    //Sorterer landene etter navn, alfabetisk
        setCountries(data);                                                 //Uppdaterer array for countries. 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCountrySelect = (event) => {                                  //Kode som utføres når brukeren velger en checkbox
    const country = event.target.value;                                     //Koden henter verdien fra checkboxen og lagrer det  i variablen country
    const isChecked = event.target.checked;                                 //Koden sjekker om checkboxen er huket, eller ikke (boolean)
    if (isChecked) {                                                        
      setSelectedCountries([...selectedCountries, country]);                //legger til landene i valgt rekkefølge, på slutten av arrayet    
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== country));   //filtermetode for å fjerne land fra arrayet
    }
  };

  const handleContinentSelect = (event) => {
    const continent = event.target.value;
    setSelectedContinent(continent);
  };

  let sortedCountries = [...countries];
  if (selectedContinent !== '') {
    sortedCountries = sortedCountries.filter(country => country.region === selectedContinent);   //setter filter for sortering etter kontinent
  }
  
  const handleClearSelect = () => {                                                            //clears lists of countries
    if (window.confirm('Are you sure you want to clear all selected countries?')) {
        setSelectedCountries([]);
          }
      };
                                                                            // Return: Bygger opp siden med div, for splitte skjermen
                                                                            // Countries arrayet vises på v.side og selectedCountries vises på h.side
                                                                            // OnChange detekerer om checkboxer har blitt endret, dersom den gjør det, kjøres if-else(isChecked)                                                                                                                                                     
                                                                            
  return (
    <header className='CP-header'>
        <div className='split-screen'>                                                    
            <div className='left-column'>
                <h1>Select Countries</h1>
                <form>
                  <div className='country-sort'>
                    <label>
                    <strong>Continent:  </strong>
                      <select value={selectedContinent} onChange={handleContinentSelect}>
                        <option value=''>All</option>
                        <option value='Africa'>Africa</option>
                        <option value='Americas'>America</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    </label>
                  </div>
                    {sortedCountries.map(country => (
                      <div key={country.name.common}>
                        <label>
                        <input
                            type="checkbox"
                            value={country.name.common}
                            checked={selectedCountries.includes(country.name.common)}
                            onChange={handleCountrySelect}
                        />
                        {country.name.common}
                        </label>
                     </div>
                     ))}
                </form>
            </div>
            <div className='right-column'>
                <h2>Selected Countries:</h2>
                 <ul>
                    {selectedCountries.map(country => (
                    <li key={country}>{country}</li>
                    ))}
                </ul>
                <button onClick={handleClearSelect}>Clear list</button>
            </div>
        </div>
    </header>
  );
}

export default CountryPicker;
