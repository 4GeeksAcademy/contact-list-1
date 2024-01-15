import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router"; // importar el use params
import { Context } from "../store/appContext";



const Formulario = () => {
    const urlBase = "https://playground.4geeks.com/apis/fake/contact/"

    let { id } = useParams(); // Para las rutas dinamicas, puedo usarlo a las funciones al mismo nivel
    const [fullName, setFullName] = useState(); // crear los estados para capturar los valores ingresados al formulario
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()

    const navigate = useNavigate() //hook para redirigir
    const { store, actions } = useContext(Context) // acceder al store, actions

    const manejoEnvio = (e) => { // funcion para evitar que se cargue la pagina si se da enter
        e.preventDefault()
    }

    // funcion para crear un contato, linkeado al boton submit
    const envioInformacion = async () => {
        // crear un contacto con el metodo post
        console.log(id);
        // si el id es distinto de new me va a actualizar
        if (id != "new") {
            console.log("actualiza");
            updateContact(id)
        } else {
            console.log("guardo");

            try {
                //crear un objeto de acuerdo a los datos de la api
                let info = { full_name: fullName, email: email, phone: phone, address: address, agenda_slug: "tomas_agenda" }
                const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
                    method: "POST",
                    body: JSON.stringify(info),// envio en formato json el objeto info
                    headers: { "Content-Type": "application/json" }
                })
                const data = await response.json()
                console.log(data);
                navigate("/") //redirijo al home despues de que fue exitoso la creacion del contacto
            } catch (error) {
                console.log(error)
            }
        }
    }

    const updateContact = async (id) => {
        try {
            let info = { full_name: fullName, email: email, phone: phone, address: address, agenda_slug: "tomas_agenda" }
            const response = await fetch(`${urlBase}${id}`, {
                method: "PUT",
                body: JSON.stringify(info),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
// Hcer un un get a la api para obtener un contacto en especifico
    async function getConctactsForm() {
		if(id == "new"){ // ojo con los valroes falsy. el signo de exclamacion me hace preguntar si el valor es falsy
            return
        }
        try {
			//la variable pasaria a ser una promesa por el fetch
			let response = await fetch(`${urlBase}/${id}`) // completar la url deacuerdo a la API
			let data = await response.json() // convertir picode a Json--> tipo de dato JS
			console.log(data);
            setFullName(data.full_name) // setear los estados
            setEmail(data.email)
            setPhone(data.phone)
            setAddress(data.address)

		} catch (error) {
			console.log(error);
		}
	}
    console.log(id);

    useEffect(()=>{ //ejecutar la funcion que tiene como parametro
        getConctactsForm()
    }, [])

    // console.log(store.currentInformation);
    return (
        <div className="container   ">
            {/* me lleva a la ruta si es un nuevo contacto o a editar contato, aca solo muestro como funciona */}
            <h1>{id == "new" ? "nuevo contacto" : "editar contacto"}</h1>

            <form onSubmit={manejoEnvio}> {/* funcion para detener la recarga */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Fullname</label>
                    {/* onChage para capturar el name, uso la funcion */}
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="2" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                    <input onChange={(e) => setPhone(e.target.value)}  value={phone} type="number" className="form-control" id="3" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="form-control" id="4" />
                </div>
                {/* funcion para hacer la creacion del contacto */}
                <button onClick={envioInformacion} type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    )
}

export default Formulario //solo puedo hacer export default una vez por archivo