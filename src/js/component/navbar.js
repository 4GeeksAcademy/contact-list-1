import React, {useState} from "react";
import { Link } from "react-router-dom"; //importar para poder usar la etiqueta link

export const Navbar = () => {
	
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				{/* agrega al boton la ruta new */}
				<Link to="/form/new"> 
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};
