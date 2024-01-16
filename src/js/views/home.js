import React, { useEffect, useState, useContext } from "react";
import {  useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";


export const Home = () => {

	const urlBase = "https://playground.4geeks.com/apis/fake/contact/" //url base

	const [contacts, setContacts] = useState([]) //useState para almacenar

	const {store, actions} = useContext(Context) // cuando es global utilizo { }

	let { id } = useParams() // ?? poderlo utilizar aca??

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
	//pasamos todo el objeto
	// const handlerEdit = (element) =>{
	// 	actions.saveCurrentInformation(element) // la funcion que tiene los contactos esta en el store en el objeto currentInfomation la esta trayendo del actions, 
	// 	navigate('/form/' + element.id) // dirigir al elemento que necesito
	// }

	//callback una funcion que recibe una funcion 
	useEffect(() => {
		getConctacts()
	}, []) //segundo argumento lista de dependenciaz

	return (
		<div className="main-container">
			<ul>
				{/* itera el array de objetos */}
				{contacts.map((element) => {
					return (
						<div className="contenedor" key={element.id}>
							<div><img src="https://ianrmedia.unl.edu/images/resources/nilo-ren.jpg" className="photo" alt="..."/></div>
							<li className="lista" > 
							<div><h4>{element.full_name}</h4></div>
							<div><i className="fa-solid fa-location-dot"></i>	{element.address}</div> 
							<div><i className="fa-solid fa-phone-flip"></i>	{element.phone}</div> 
							<div><i className="fa-solid fa-envelope"></i>	{element.email}</div></li>
						
							<div className="botones">
								{/* ruta dinamica que le vamos a pasar id */}
								<Link to={'/form/' + element.id}> 
									<button className="pencil" style={{border: "none", backgroundColor: "white", margin: "10px"}}><i className="fa-solid fa-pencil"></i></button>
								</Link>
								{/* <button onClick={() => handlerEdit(element)}>editar</button> */}
								<button style={{border: "none", backgroundColor: "white", margin: "25px" }} onClick={() => deleteContact(element.id)}><i className="fa-solid fa-trash"></i></button>
							</div>
						</div>
					)
				})}
			</ul>
		</div>
	)
};
