import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const usuario = Meteor.user();
  const estaLogueado = Boolean(usuario);

  return (
    <header className="navbar-principal">
      <Link to="/" className="navbar-logo">
        Subastas<span>Pro</span>
      </Link>

      {/* Navegación visible en computadora */}
      <nav className="navbar-desktop">
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Subastas</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/cart">Mi carrito</Link>
      </nav>

      <div className="navbar-acciones">
        {estaLogueado ? (
          <Link to="/profile" className="navbar-perfil">
            Mi perfil
          </Link>
        ) : (
          <Link to="/login" className="navbar-login">
            Iniciar sesión
          </Link>
        )}

        {/* Botón visible solo en teléfonos */}
        <button
          type="button"
          className="menu-hamburguesa"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menú desplegable para teléfonos */}
      {menuAbierto && (
        <nav className="menu-movil">
          <Link to="/" onClick={() => setMenuAbierto(false)}>
            Inicio
          </Link>
          <Link to="/catalog" onClick={() => setMenuAbierto(false)}>
            Subastas
          </Link>
          <Link to="/favorites" onClick={() => setMenuAbierto(false)}>
            Favoritos
          </Link>
          <Link to="/cart" onClick={() => setMenuAbierto(false)}>
            Mi carrito
          </Link>
          {estaLogueado ? (
            <button
              type="button"
              onClick={() => {
                setMenuAbierto(false);
                Meteor.logout();
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <Link to="/register" onClick={() => setMenuAbierto(false)}>
              Crear cuenta
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}