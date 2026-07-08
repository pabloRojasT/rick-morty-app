import React, { useState } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  const { data: characters, loading, error } = useFetch('https://rickandmortyapi.com/api/character');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Nuevo estado para guardar los favoritos (es un arreglo vacío al inicio)
  const [favorites, setFavorites] = useState([]);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Función para agregar o quitar de favoritos
  const toggleFavorite = (character) => {
    // Verificamos si el personaje ya está en favoritos usando su ID
    const isAlreadyFavorite = favorites.some((fav) => fav.id === character.id);
    
    if (isAlreadyFavorite) {
      // Si ya está, lo sacamos de la lista
      setFavorites(favorites.filter((fav) => fav.id !== character.id));
    } else {
      // Si no está, lo agregamos al final de la lista
      setFavorites([...favorites, character]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Rick and Morty App</h1>
      </header>

      <main className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        <section className="flex-grow bg-white p-4 rounded shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold">Personajes</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!loading && !error && filteredCharacters.map((char) => {
              // Comprobamos visualmente si este personaje específico es favorito
              const isFav = favorites.some((fav) => fav.id === char.id);

              return (
                <article key={char.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50 flex flex-col">
                  <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg truncate">{char.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{char.species} - {char.status}</p>
                    </div>
                    {/* Botón de favorito */}
                    <button 
                      onClick={() => toggleFavorite(char)}
                      className={`w-full py-2 rounded font-semibold transition-colors ${
                        isFav 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      {isFav ? 'Quitar Favorito' : '⭐ Agregar Favorito'}
                    </button>
                  </div>
                </article>
              );
            })}

            {!loading && !error && filteredCharacters.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">
                No se encontraron personajes con el nombre "{searchTerm}"
              </p>
            )}
          </div>
        </section>

        {/* 3. El Panel Lateral de Favoritos */}
        <aside className="w-full md:w-72 bg-white p-4 rounded shadow-sm flex flex-col">
          <h2 className="text-xl font-bold border-b pb-2 mb-4 flex justify-between items-center">
            Favoritos
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
              {favorites.length}
            </span>
          </h2>
          
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Aún no hay favoritos.</p>
          ) : (
            <ul className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-2">
              {favorites.map((fav) => (
                <li key={fav.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded border">
                  <img src={fav.image} alt={fav.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-grow overflow-hidden">
                    <p className="font-semibold text-sm truncate">{fav.name}</p>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(fav)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Eliminar"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>

      <footer className="bg-gray-900 text-white p-4 text-center mt-auto">
        <p>Desarrollado por: Pablo Rojas</p>
      </footer>
    </div>
  )
}

export default App