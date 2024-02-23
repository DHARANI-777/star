// src/components/PlanetCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlanetCard.css';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentsData = await Promise.all(
          planet.residents.map(residentUrl => axios.get(residentUrl))
        );
        setResidents(residentsData.map(resident => resident.data));
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    if (planet.residents.length > 0) {
      fetchResidents();
    }
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>

      {residents.length > 0 && (
        <div>
          <h3>Residents:</h3>
          <ul>
            {residents.map(resident => (
              <li key={resident.name}>
                {resident.name} - {resident.height}cm, {resident.mass}kg, {resident.gender}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanetCard;
