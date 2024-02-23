// src/components/PlanetList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './PlanetCard';
import './PlanetList.css';

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        setPlanets(response.data.results);
        setNextPage(response.data.next);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  const fetchNextPage = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets(prevPlanets => [...prevPlanets, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error('Error fetching next page:', error);
    }
  };

  return (
    <div className="planet-list">
      
      {planets.map(planet => (
        <PlanetCard key={planet.name} planet={planet} />
      ))}
      {nextPage && <button  onClick={() => fetchNextPage(nextPage)}>Next Page</button>}
    </div>
    
  );
};

export default PlanetList;
