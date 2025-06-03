import React, { useEffect, useState } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch all countries on initial render
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error('Error fetching states:', err));
    } else {
      setStates([]);
      setSelectedState('');
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedCountry]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error('Error fetching cities:', err));
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  return (
    <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {/* Country Dropdown */}
            <select style={{width: '200px', height: '40px', fontSize: '16px'}}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
            <option value="">--Select Country--</option>
            {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

      {/* State Dropdown */}
        <select style={{width: '200px', height: '40px', fontSize: '16px'}}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
         <option value="">--Select State--</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

      {/* City Dropdown */}
        <select style={{width: '200px', height: '40px', fontSize: '16px'}}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">--Select City--</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>     

      {selectedCity && selectedState && selectedCountry && (
        <div style={{ textAlign: 'center',paddingTop: '20px' }}>
            <h3>
            You selected <strong style={{fontSize: '30px'}}>{selectedCity}</strong>,{' '}
            <span style={{ color: 'gray', fontWeight: 'normal' }}>{selectedState}</span>,{' '}
            <span style={{ color: 'gray', fontWeight: 'normal' }}>{selectedCountry}</span>
            </h3>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
