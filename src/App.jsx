import React, { useState } from 'react'
import { useFetch } from './hooks/useFetch'
import { useLocalStorage } from './hooks/useLocalStorage' // Importamos nuestro nuevo hook

function App() {
  const { data: characters, loading, error } = useFetch('https://rickandmortyapi.com/api/character');
  const [searchTerm, setSearchTerm] = useState('');
  
  // ¡MAGIA!: Cambiamos useState por useLocalStorage. 
  // Ahora les damos un nombre ('favs' y 'blocks') para que el navegador los reconozca.
  const [favorites, setFavorites] = useLocalStorage('favs', []);
  const [blocked, setBlocked] = useLocalStorage('blocks', []);

  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isNotBlocked = !blocked.some((b) => b.id === char.id);
    return matchesSearch && isNotBlocked;
  });

  const toggleFavorite = (character) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === character.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== character.id));
    } else {
      setFavorites([...favorites, character]);
    }
  };

  const toggleBlocked = (character) => {
    const isAlreadyBlocked = blocked.some((b) => b.id === character.id);
    if (isAlreadyBlocked) {
      setBlocked(blocked.filter((b) => b.id !== character.id));
    } else {
      setBlocked([...blocked, character]);
      setFavorites(favorites.filter((fav) => fav.id !== character.id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Rick and Morty App</h1>
      </header>

      <main className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        <section className="flex-grow bg-white p-4 rounded shadow-sm">
          <div className="flex flex-col mb-6 gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Personajes</h2>
              <input
                type="text"
                placeholder="Buscar personaje..."
                className="border border-gray-300 rounded-lg p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Panel de Estadísticas (Exigido en la rúbrica) */}
            <div className="bg-gray-100 p-3 rounded flex flex-wrap justify-between md:justify-start md:gap-8 text-sm font-semibold border">
              <p>🟢 Totales Cargados: <span className="text-blue-600">{characters.length}</span></p>
              <p>⭐ Favoritos: <span className="text-red-500">{favorites.length}</span></p>
              <p>🚫 Bloqueados: <span className="text-gray-600">{blocked.length}</span></p>
            </div>
          </div>
          
          {loading && <p className="text-blue-500 font-semibold animate-pulse">Cargando personajes...</p>}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!loading && !error && filteredCharacters.map((char) => {
              const isFav = favorites.some((fav) => fav.id === char.id);

              return (
                <article key={char.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50 flex flex-col">
                  <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg truncate">{char.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{char.species} - {char.status}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => toggleFavorite(char)}
                        className={`w-full py-2 rounded font-semibold transition-colors text-sm ${
                          isFav ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                      >
                        {isFav ? 'Quitar Favorito' : '⭐ Favorito'}
                      </button>
                      <button 
                        onClick={() => toggleBlocked(char)}
                        className="w-full py-2 rounded font-semibold transition-colors text-sm bg-gray-800 hover:bg-black text-white"
                      >
                        🚫 Bloquear
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {!loading && !error && filteredCharacters.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">
                No se encontraron personajes para mostrar.
              </p>
            )}
          </div>
        </section>

        {/* Panel Lateral: Favoritos y Bloqueados */}
        <aside className="w-full md:w-72 flex flex-col gap-4">
          <div className="bg-white p-4 rounded shadow-sm flex flex-col">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 flex justify-between items-center">
              Favoritos <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">{favorites.length}</span>
            </h2>
            {favorites.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">Aún no hay favoritos.</p>
            ) : (
              <ul className="flex flex-col gap-3 overflow-y-auto max-h-[40vh] pr-2">
                {favorites.map((fav) => (
                  <li key={fav.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded border">
                    <img src={fav.image} alt={fav.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-grow overflow-hidden">
                      <p className="font-semibold text-sm truncate">{fav.name}</p>
                    </div>
                    <button onClick={() => toggleFavorite(fav)} className="text-red-500 hover:text-red-700 p-1" title="Quitar">✖</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-sm flex flex-col">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 flex justify-between items-center">
              Bloqueados <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full">{blocked.length}</span>
            </h2>
            {blocked.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No hay personajes bloqueados.</p>
            ) : (
              <ul className="flex flex-col gap-3 overflow-y-auto max-h-[40vh] pr-2">
                {blocked.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 bg-gray-100 p-2 rounded border opacity-75">
                    <img src={b.image} alt={b.name} className="w-10 h-10 rounded-full object-cover grayscale" />
                    <div className="flex-grow overflow-hidden">
                      <p className="font-semibold text-sm truncate line-through">{b.name}</p>
                    </div>
                    <button onClick={() => toggleBlocked(b)} className="text-blue-500 hover:text-blue-700 p-1 text-sm font-bold" title="Desbloquear">
                      Desbloquear
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </main>

      <footer className="bg-gray-900 text-white p-4 text-center mt-auto">
        <p>Desarrollado por: Pablo Rojas</p>
      </footer>
    </div>
  )
}

export default App