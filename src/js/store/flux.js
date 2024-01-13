const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
				
			],
			currentInformation: {

			}

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// guardar la info que necesita el area de de edicion
			// guardo en el store para utilizarlo cuando lo necesite
			saveCurrentInformation: (element) =>{
				const store = getStore() // guardar una copia, backuup
				//puedo seguir agregando propiedades, siempre recuperar el store
				setStore({...store, currentInformation: element })// el argumento es el contenido de lo que va a pisar el store, traigo lo que tengo antes con ...spread operator

			}
		}
	};
};

export default getState;
