"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(JSON.stringify({ email, password }));
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          // Se recibió el token: se guarda en localStorage y se redirige
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          router.push("/tiendaiaw/admin/libros");
        } else {
          alert("Login failed: No se ha recibido el token");
          setIsLoggedIn(false);
          router.push("/tiendaiaw/");
        }
      } else {
        setIsLoggedIn(false);
        alert("Login failed: " + response.statusText);
        router.push("/tiendaiaw/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  // Función actualizada para redirigir a la ruta /tiendaiaw/registro
  const handleRegister = (e) => {
    e.preventDefault();
    router.push("/tiendaiaw/registro");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/tiendaiaw/");
  };

  return (
    <nav style={{ backgroundColor: "grey" }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/tiendaiaw" className="text-xl font-bold">
          TiendaIAW
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/tiendaiaw/admin/libros">Admin Libros</Link>
              <Link href="/tiendaiaw/admin/autores">Admin Autores</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <form className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleLogin}
                className="bg-blue-500 px-4 py-1 rounded"
              >
                Login
              </button>
              {/* Botón de Register de tipo "button" para evitar que se dispare el submit */}
              <button
                type="button"
                onClick={handleRegister}
                className="bg-blue-500 px-4 py-1 rounded"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
