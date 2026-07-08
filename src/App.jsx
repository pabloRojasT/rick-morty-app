import React, { useState } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  const { data: characters, loading, error } = useFetch('https://rickandmortyapi.com/api/character');
  
  // 1. Creamos un estado para guardar lo que se escribe en el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Filtramos los personajes basándonos en el buscador (ignorando mayúsculas/minúsculas)
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Rick and Morty App</h1>
      </header>

      <main className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        <section className="flex-grow bg-white p-4 rounded shadow-sm">
          
          {/* Contenedor del título y el buscador */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold">Personajes</h2>
            
            {/* Input de la Barra de Búsqueda */}
            <input
              type="text"
              placeholder="Buscar personaje..."
              className="border border-gray-300 rounded-lg p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {loading && <p className="text-blue-500 font-semibold animate-pulse">Cargando personajes...</p>}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* Grilla: Ahora recorremos "filteredCharacters" en lugar de "characters" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!loading && !error && filteredCharacters.map((char) => (
              <article key={char.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-lg truncate">{char.name}</h3>
                  <p className="text-gray-600 text-sm">{char.species} - {char.status}</p>
                </div>
              </article>
            ))}

            {/* Mensaje por si la búsqueda no encuentra nada */}
            {!loading && !error && filteredCharacters.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">
                No se encontraron personajes con el nombre "{searchTerm}"
              </p>
            )}
          </div>
        </section>

        <aside className="w-full md:w-72 bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">Favoritos</h2>
          <p className="text-gray-500 text-sm">Aquí irá el panel de favoritos...</p>
        </aside>
      </main>

      <footer className="bg-gray-900 text-white p-4 text-center mt-auto">
        <p>Desarrollado por: [Pablo Rojas]</p>
      </footer>
    </div>
  )
}

export default App