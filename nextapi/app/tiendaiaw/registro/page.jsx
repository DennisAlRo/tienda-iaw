"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registro exitoso");
        router.push("/bibliotecatic/"); // Redirige a la página que desees (por ejemplo, home o login)
      } else {
        alert("Error en el registro: " + response.statusText);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Ocurrió un error durante el registro. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
