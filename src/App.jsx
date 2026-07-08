import React from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  // Usamos nuestro custom hook para llamar a la API
  const { data: characters, loading, error } = useFetch('https://rickandmortyapi.com/api/character');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Cabecera */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Rick and Morty App</h1>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        {/* Sección izquierda: Buscador y Tarjetas */}
        <section className="flex-grow bg-white p-4 rounded shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Personajes</h2>
          
          {/* Mensajes de carga y error (Requisito de la rúbrica) */}
          {loading && <p className="text-blue-500 font-semibold animate-pulse">Cargando personajes...</p>}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* Grilla de personajes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!loading && !error && characters.map((char) => (
              <article key={char.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-lg truncate">{char.name}</h3>
                  <p className="text-gray-600 text-sm">{char.species} - {char.status}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sección derecha: Favoritos (Oculto en celular, visible en PC) */}
        <aside className="w-full md:w-72 bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">Favoritos</h2>
          <p className="text-gray-500 text-sm">Aquí irá el panel de favoritos...</p>
        </aside>
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-900 text-white p-4 text-center mt-auto">
        <p>Desarrollado por: [Pablo Rojas]</p>
      </footer>
    </div>
  )
}

export default App