import React, { useEffect, useState, useContext } from "react";
import {  useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";


export const Home = () => {

	const urlBase = "https://playground.4geeks.com/apis/fake/contact/" //url base

	const [contacts, setContacts] = useState([]) //useState para almacenar

	const {store, actions} = useContext(Context) // cuando es global utilizo { }

	// let { id } = useParams()

	const navigate = useNavigate()
	//metodo get

	function refreshPage() {
		window.location.reload(false);
	  }

	async function getConctacts() {
		try {
			//la variable pasaria a ser una promesa por el fetch
			let response = await fetch(`${urlBase}/agenda/tomas_agenda`) // completar la url deacuerdo a la API
			let data = await response.json() // convertir picode a Json--> tipo de dato JS
			console.log();
			setContacts(data) // Guardar los contactos en el estado, es un hook

		} catch (error) {
			console.log(error);
		}
	}
	
	const deleteContact = async (id) =>{
		try{
			const response =  await fetch(`${urlBase}${id}`, {
				method: "DELETE",
				body: JSON.stringify(id),
				headers: {"Content-Type": "application/json"}
			})
			const data = await response.json()
			console.log(data);
			refreshPage()
			navigate("/") //preguntar aca
		} catch(error) {
			console.log(error);
		}
	}

	const handlerEdit = (element) =>{
		actions.saveCurrentInformation(element) // la funcion que tiene los contactos esta en el store en el objeto currentInfomation la esta trayendo del actions, 
		navigate('/form/' + element.id) // dirigir al elemento que necesito
	}

	//callback una funcion que recibe una funcion 
	useEffect(() => {
		getConctacts()
	}, []) //segundo argumento lista de dependenciaz

	return (
		<div className="text-center mt-5">
			<ul>
				{/* itera el array de objetos */}
				{contacts.map((element) => {
					return (
						<div className="contenedor" key={element.id}>
							<li className="lista"> <div>{element.full_name}</div> <div>{element.address}</div> 
							<div>{element.phone}</div> <div>{element.email}</div></li>

							<div className="botones">
								{/* <button onClick={() => updateContact(element.id)}>editar</button> */}
								{/* ruta dinamica que le vamos a pasar id */}
								{/* <button>
									<Link to={'/form/' + element.id}> 
										Editar
									</Link>
								</button> */}
								<button onClick={() => handlerEdit(element)}>editar</button>
								<button onClick={() => deleteContact(element.id)}>eliminar</button>
							</div>
						</div>
					)
				})}
			</ul>
		</div>
	)
};
