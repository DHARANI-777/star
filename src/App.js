// src/App.js
import React from 'react';
import PlanetList from './components/PlanetList';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Star Wars Planets Directory</h1>
      <PlanetList />
    </div>
  );
};

export default App;
