import React from 'react'

function App() {
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
          <p>Aquí irá el buscador y el listado de personajes...</p>
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