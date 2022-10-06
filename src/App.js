import React, { useState } from "react";
import Cards from "./components/Cardsfield";

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center', fontSize: '48px', marginTop: '48px'}} className="title">Mahjong</h1>
      <Cards />
    </div>
  );
}

export default App;