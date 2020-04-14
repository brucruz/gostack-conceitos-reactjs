import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: "Teste",
      url: "https://github.com/Teste/teste",
      techs: [
        "Node",
        "Express",
        "TypeScript"
    ],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);
    const repositoriesIndex = repositories.findIndex(repository =>
      repository.id === id);
    
    repositories.splice(repositoriesIndex, 1);
    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
