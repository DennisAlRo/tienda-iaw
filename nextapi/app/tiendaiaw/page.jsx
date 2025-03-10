"use client";

import Navbar from "../../componentes/navbar"; // Ajusta la ruta según tu estructura
import { useState } from "react";

export default function Home() {
  // Ejemplo: Simulación de productos destacados
  const [productos] = useState([
    { id: 1, nombre: "Producto 1", descripcion: "Una descripción breve del producto 1." },
    { id: 2, nombre: "Producto 2", descripcion: "Una descripción breve del producto 2." },
    { id: 3, nombre: "Producto 3", descripcion: "Una descripción breve del producto 3." },
  ]);

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a TiendaIAW</h1>
        <p className="text-lg mb-8">
          Descubre increíbles ofertas y los mejores productos en nuestra plataforma.
        </p>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{producto.nombre}</h3>
                  <p className="text-gray-700">{producto.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
