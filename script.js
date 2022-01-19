window.addEventListener("load",inicio);

let nuestroSistema = new Sistema();
function inicio(){
	document.getElementById("infoClientes").addEventListener("click",agregarCliente, false);
	document.getElementById("actualizar").disabled = true;
	document.getElementById("actualizar").addEventListener("click",actualizarCliente, false);
	actualizarTabla();

}


function agregarCliente(){
	if(document.getElementById("idFormCliente").reportValidity()){


		let nombre = document.getElementById("nombre").value;
		let apellido = document.getElementById("apellido").value;
		let tel = document.getElementById("telefono").value;
		let rut = document.getElementById("RUT").value;
		let combo = document.getElementById("idTipo");
		let tipo = combo.options[combo.selectedIndex].text;
		let activo = nuestroSistema.chequearCheckbox(document.getElementById("idActivo"));
		
		nuestroSistema.crearCliente(nombre, apellido, rut, tipo, tel, activo);

		document.getElementById("idFormCliente").reset();

		alert("Cliente registrado con exito");
		
	
	}else{
		alert("Faltan datos en el formulario")
	}
	actualizarTabla();
}

function actualizarTabla(){
	
	nuestroSistema.actualizarTabla();
	
		
		
	
}


function editarCliente() {
	let id = (event.target.id.split("_")[1]);
	nuestroSistema.getClientById(id);
	document.getElementById("actualizar").disabled = false;
	document.getElementById("infoClientes").disabled = true;

}

	function borrarCliente() {
		let id = (event.target.id.split("_")[1]);
		nuestroSistema.deleteCliente(id);


}

function actualizarCliente(){
	if(document.getElementById("idFormCliente").reportValidity()){
		let nombre = document.getElementById("nombre").value;
		let apellido = document.getElementById("apellido").value;
		let tel = document.getElementById("telefono").value;
		let rut = document.getElementById("RUT").value;
		let combo = document.getElementById("idTipo");
		let tipo = combo.options[combo.selectedIndex].text;
		let activo = nuestroSistema.chequearCheckbox(document.getElementById("idActivo"));
		nuestroSistema.updateCliente(nombre, apellido, rut, tipo, tel, activo);
	} else {
		alert("Faltan datos en el formulario");
	}
	document.getElementById("actualizar").disabled = true;
	document.getElementById("infoClientes").disabled = false;
}




