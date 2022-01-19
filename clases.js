class Sistema{
	constructor(){
		this.listaClientes = [];
		this.idClienteACambiar = "";
	}


	actualizarTabla(){

		fetch('https://crudcrud.com/api/448fd783814746308c46893ad144a020/Customers')
		.then(response => response.json())
		.then(data => this.actualizarTabla2(data))
}



	actualizarTabla2(listaClientes){

        let tabla = document.getElementById("tablaClientes");

        tabla.innerHTML = "";

        if(listaClientes.length == 0){
        	
            let fila = tabla.insertRow();
            let celda = fila.insertCell();
            celda.colSpan="4";
            celda.innerHTML = "No hay clientes para mostrar";

        }else{
           
            var header = tabla.createTHead();
            var row = header.insertRow(0);
            var cell = row.insertCell(0);
            cell.innerHTML = "<b>Accion</b>";
     
            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>Activo</b>";
            
            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>Telefono</b>";

            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>Tipo</b>";

            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>RUT</b>";

            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>Apellido</b>";

            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>Nombre</b>";

            header = tabla.createTHead();
            cell = row.insertCell(0);
            cell.innerHTML = "<b>ID</b>";

        }
        for(let i=0; i<listaClientes.length; i++){
                    
                let fila = tabla.insertRow();

                let celda = fila.insertCell();
                celda.innerHTML = listaClientes[i]._id
                
                let celda2 = fila.insertCell();
                celda2.innerHTML = listaClientes[i].name;

                let celda3 = fila.insertCell();
                celda3.innerHTML = listaClientes[i].apellido;

                let celda4 = fila.insertCell();
                celda4.innerHTML = listaClientes[i].RUT;
                
                let celda5 = fila.insertCell();
                celda5.innerHTML = listaClientes[i].tipo;

                let celda6 = fila.insertCell();
                celda6.innerHTML = listaClientes[i].telefono;
                let celda7 = fila.insertCell();
                if(listaClientes[i].activo){
                	celda7.style.color = "green";
                	celda7.innerHTML = "<b>SI</b>";
            	} else {
            		celda7.style.color = "red";
                	celda7.innerHTML = "<b>NO</b>";
            	}

            	let celda8 = fila.insertCell();
                celda8.innerHTML = "<b><button class= 'btnSelect' id='btnSelect_"+ listaClientes[i]._id +"' onclick='editarCliente();'>Seleccionar</button><button class= 'btnDelete' id='btnDelete_"+ listaClientes[i]._id +"' onclick='borrarCliente();'>Borrar</button></b>";
               
            }

	}

	crearCliente(unNombre, unApellido, unRUT, unTipo, unTelefono, esActivo){
		fetch('https://crudcrud.com/api/448fd783814746308c46893ad144a020/Customers', {
 			headers: { "Content-Type": "application/json; charset=utf-8" },
  			method: 'POST',
  			body: JSON.stringify({
    			name: unNombre,
    			apellido: unApellido,
    			RUT: unRUT,
    			tipo: unTipo,
    			telefono: unTelefono,
    			activo: esActivo
  			})
		})
		.then(response => response.json())
	}

	chequearCheckbox(checkbox){
        let check=false;
        if(checkbox.checked){
            check=true
        }
            return check;
    }

	getClientById(unId){
		fetch('https://crudcrud.com/api/448fd783814746308c46893ad144a020/Customers/' + unId)
		.then(response => response.json())
		.then(data => this.generarForm(data))
	}

	generarForm(data){
		document.getElementById("nombre").value = data.name;
		document.getElementById("apellido").value = data.apellido;
		document.getElementById("telefono").value = data.telefono;
		document.getElementById("RUT").value = data.RUT;
		if(data.tipo == "Empresa"){
			document.getElementById("idTipo").options[0].selected = "selected";
		} else {
			document.getElementById("idTipo").options[1].selected = "selected";
		}
			if(nuestroSistema.chequearCheckbox(document.getElementById("idActivo"))){
				document.getElementById("idActivo").checked = true;
			} else {
				document.getElementById("idActivo").checked = false;
			}
			this.idClienteACambiar = data._id;
	}

	updateCliente(unNombre, unApellido, unRUT, unTipo, unTelefono, esActivo){
		let id = this.idClienteACambiar;
		fetch('https://crudcrud.com/api/448fd783814746308c46893ad144a020/Customers/' + id, {
  			headers: { "Content-Type": "application/json; charset=utf-8" },
  			method: 'PUT',
  			body: JSON.stringify({
    			name: unNombre,
    			apellido: unApellido,
    			RUT: unRUT,
    			tipo: unTipo,
    			telefono: unTelefono,
    			activo: esActivo
  			})
		})
		.then(response => this.actualizarTabla());
		
	}



	deleteCliente(unId){
		fetch('https://crudcrud.com/api/448fd783814746308c46893ad144a020/Customers/' + unId, {
  			method: 'DELETE'
		})
		.then(response => this.actualizarTabla());
	}



}
