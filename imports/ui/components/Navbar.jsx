import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const usuario = Meteor.user();
  const estaLogueado = Boolean(usuario);
  const esAdmin = usuario?.profile?.role === "admin";

  const cerrarMenu = () => setMenuAbierto(false);

  const enlaces = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Subastas", ruta: "/catalog" },
    ...(estaLogueado
      ? [
          { texto: "Favoritos", ruta: "/favorites" },
          { texto: "Mi carrito", ruta: "/cart" },
          { texto: "Crear subasta", ruta: "/create-auction" },
          ...(esAdmin ? [{ texto: "Administración", ruta: "/admin" }] : []),
        ]
      : []),
  ];

  return (
    <header className="navbar-principal">
      <Link to="/" className="navbar-logo" onClick={cerrarMenu}>
        Subastas<span>Pro</span>
      </Link>

      <nav className="navbar-acciones">
        {estaLogueado ? (
          <Link
            to="/profile"
            className="navbar-perfil"
            onClick={cerrarMenu}
          >
            Mi perfil
          </Link>
        ) : (
          <Link
            to="/login"
            className="navbar-login"
            onClick={cerrarMenu}
          >
            Iniciar sesión
          </Link>
        )}

        <button
          type="button"
          className={`menu-hamburguesa ${menuAbierto ? "activo" : ""}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {menuAbierto && (
        <>
          <button
            className="menu-fondo"
            aria-label="Cerrar menú"
            onClick={cerrarMenu}
          />

          <nav id="menu-principal" className="menu-desplegable">
            <div className="menu-encabezado">
              <span>Menú</span>
              <button
                type="button"
                onClick={cerrarMenu}
                aria-label="Cerrar menú"
              >
                ×
              </button>
            </div>

            {enlaces.map((enlace) => (
              <Link
                key={enlace.ruta}
                to={enlace.ruta}
                className={
                  location.pathname === enlace.ruta ? "enlace-activo" : ""
                }
                onClick={cerrarMenu}
              >
                {enlace.texto}
              </Link>
            ))}

            {estaLogueado ? (
              <button
                type="button"
                className="menu-cerrar-sesion"
                onClick={() => {
                  cerrarMenu();
                  Meteor.logout();
                }}
              >
                Cerrar sesión
              </button>
            ) : (
              <Link to="/register" onClick={cerrarMenu}>
                Crear cuenta
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}