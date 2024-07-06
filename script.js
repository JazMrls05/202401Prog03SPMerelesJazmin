class Persona
{
    constructor(id, apellido,nombre,  fechaNacimiento)
    {
        this.id = id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento.toString();
    }


    toString()
    {
        return `${this.apellido}${this.nombre} , nació el ${this.fechaNacimiento}`;
    }

}

class Ciudadano extends Persona
{

    constructor(id, apellido,nombre,  fechaNacimiento, dni)
    { 
        super(id, apellido,nombre,  fechaNacimiento);
        this.dni = dni;
    }


    toString()
    {
        return `${this.apellido}${this.nombre} , nació el ${this.fechaNacimiento}, y su dni es ${this.dni}`;
    }
}

class Extranjero extends Persona
{

    constructor(id,apellido, nombre,  fechaNacimiento, paisOrigen)
    {
        super(id,apellido,nombre,fechaNacimiento);
        this.paisOrigen = paisOrigen;
    }

    toString()
    {
        return `${this.apellido} ${this.nombre} , nació el ${this.fechaNacimiento}, y su país de origen es: ${this.paisOrigen}`;
    }
}

//#region Spinner
const spinner = document.getElementById("spinner");
function mostrarSpinner()
{
    spinner.style.display = "block";
}

function ocultarSpinner()
{
    spinner.style.display = "none";
}
//#endregion

//#region OTROS ELEMENTOS
const formLista = document.getElementById("formulario-lista");
const formABM = document.getElementById("formABM");

let listaPersonas= [];

//#endregion

function mostrarTabla(listaPersonas)
{
    const tabla = document.getElementById("tabla-personas");
    tabla.innerHTML = "";

    const listaEncabezado = ["ID","Apellido","Nombre","Fecha de nacimiento","DNI","País de origen", "Modificar/eliminar"];

    const encabezado = document.createElement("tr");

    listaEncabezado.forEach(atributo => {
        const tablaHead = document.createElement("th");
        tablaHead.textContent = atributo; 
        tablaHead.className = "col-" + atributo.toLowerCase();
        encabezado.appendChild(tablaHead);
        
    });
    tabla.appendChild(encabezado);

    listaPersonas.forEach(persona => 
        {
            const fila = document.createElement("tr");

            //ID

            const celdaID = document.createElement("td");
            celdaID.textContent = persona.id;
            celdaID.className = "col-id";
            fila.appendChild(celdaID);

            // Apellido
            const celdaApellido = document.createElement("td");
            celdaApellido.textContent = persona.apellido;
            celdaApellido.className = "col-apellido";
            fila.appendChild(celdaApellido);

            // Nombre
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = persona.nombre;
            celdaNombre.className = "col-nombre";
            fila.appendChild(celdaNombre);


            // fecha de nacimiento
            const celdaFechaNac = document.createElement("td");
            celdaFechaNac.textContent = persona.fechaNacimiento;
            celdaFechaNac.className = "col-fechanacimiento";
            fila.appendChild(celdaFechaNac);


            // DNI
            const celdaDni = document.createElement("td");
            celdaDni.textContent = persona.dni;
            celdaDni.className = "col-dni";
            fila.appendChild(celdaDni);


            // Pais origen
            const celdaPaisOrigen = document.createElement("td");
            celdaPaisOrigen.textContent = persona.paisOrigen;
            celdaPaisOrigen.className = "col-paisorigen";
            fila.appendChild(celdaPaisOrigen);
            
            // Modificar
            const celdaModificar = document.createElement("button");
            celdaModificar.textContent = "Modificar";
            celdaModificar.className = "boton";
            fila.appendChild(celdaModificar);
            
            // Eliminar 
            const celdaEliminar = document.createElement("button");
            celdaEliminar.textContent = "Eliminar";
            celdaEliminar.className = "boton";
            fila.appendChild(celdaEliminar);
            

            
            
            tabla.appendChild(fila);
            
        }
    );
}


function mostrarFormListado()
{
    formLista.style.display = "block";
    mostrarTabla(listaPersonas);
    formABM.style.display = "none";
    
}
function ocultarFormListado()
{
    formLista.style.display = "none";
    formABM.style.display = "block";
}

const btnAgregarPersona = document.getElementById("btn-agregar-persona");
btnAgregarPersona.addEventListener("click", function() {
    ocultarFormListado();
});

const btnCancelar = document.getElementById("cancelar");
btnCancelar.addEventListener("click", function() {
    mostrarFormListado();
});



//#region XMLHttpRequest
function obtenerPersonas()
{
    mostrarSpinner();
    setTimeout(function() {
        const xhttp = new XMLHttpRequest(); 
        xhttp.open("GET", "https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero", true);
        xhttp.setRequestHeader('Content-type', 'application/json'); 
        xhttp.onload = function() {
            ocultarSpinner();
            if (xhttp.status === 200)
            {
                listaPersonas = JSON.parse(xhttp.responseText);

                mostrarFormListado();
            }
            else
            {alert("Error. No se pudo obtener la lista de personas.");}
        }; 
        xhttp.send(); 
    }, 1500);
}
//#endregion 

//#region Promesas/async - Alta
async function darAltaPersona()
{


}
//endregion

//#region SOLO PROMESAS - Modificación
function modificarpersona()
{

}

//#endregion

//#region Eliminación

function eliminarPersona()
{

}

//#endregion

obtenerPersonas();
//Perdón, pero lo demás quedará para recu ;/