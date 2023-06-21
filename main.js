alert("¡Bienvenido!");
const menu = "1. Ver calificaciones\n" +
    "2. Buscar estudiante\n" +
    "3. Editar Calificación\n" +
    "4. Agregar Calificación\n" +
    "5. Calificación mas alta\n" +
    "6. Calificación mas baja\n"+
    "7. Salir\n";

const calificaciones = [
    { "codigo": 1, "nombre": "Ana", "calificacion": 3 },
    { "codigo": 2, "nombre": "Carla", "calificacion": 2 },
    { "codigo": 3, "nombre": "Daniel", "calificacion": 5 },
    { "codigo": 4, "nombre": "Jorge", "calificacion": 8 },
    { "codigo": 5, "nombre": "Maria", "calificacion": 4 },
    { "codigo": 6, "nombre": "Fabian", "calificacion": 10 },
    { "codigo": 7, "nombre": "Lorena", "calificacion": 5 },
    { "codigo": 8, "nombre": "Oswaldo", "calificacion": 3 }
];

function menuPrint(){
    let opcionMenu = prompt("Ingrese un numero del menu:\n" + menu);

    if (opcionMenu == null || isNaN(opcionMenu)) {
        location.reload();
    } else {
        const validacionMenu = (opcionMenu) => {
            if (opcionMenu == null || isNaN(opcionMenu)) {
                location.reload();
                return true;
            }
            if (isNaN(parseInt(opcionMenu)) || opcionMenu == "" || opcionMenu < 0 || opcionMenu > 7) {
                return false;
            }
            return true;
        }
    
        while (!validacionMenu(opcionMenu)) {
            opcionMenu = parseInt(prompt("Ingrese un numero correcto del menu:\n" + menu));
        }
        menuIngreso(opcionMenu);
    }
}



const menuIngreso = (opcionMenu) => {
    switch (opcionMenu) {
        case "1":
            verCalificaciones();
            break;
        case "2":
            busquedaEstudiante();
            break
        case "3":
            editarCalificacion();
            break
        case "4":
            agregarCalificacion();
            break
        case "5":
            maxCalificacion();
            break
        case "6":
            minCalificacion();
            break
        case "7":
            location.reload();
            break
        default:
            break;
    }

}

menuPrint();

function verCalificaciones() {
    let resultCalificaciones = "";

    for (const item in calificaciones) {
        resultCalificaciones += "Codigo: " + calificaciones[item].codigo
            + ". " + "Nombre: "
            + calificaciones[item].nombre
            + "  -  "
            + " Calificacion: "
            + calificaciones[item].calificacion
            + " " + "\n";
    }
    alert(resultCalificaciones);
    menuPrint();
}


function busquedaEstudiante() {
    let resultBusqueda = "";
    let estudianteResult = "";
    let nombreEstudiane = prompt("Ingrese el nombre del estudiante");
    if (!isNaN(nombreEstudiane)) {
        console.log("Ingrese un nombre valido");
    } else {
        resultBusqueda = calificaciones.filter(calificacion => calificacion.nombre === nombreEstudiane);
        if (resultBusqueda.length == 0) {
            estudianteResult = "No se encontro resultados"
        } else {
            for (const item in resultBusqueda) {
                estudianteResult += "Codigo: " + resultBusqueda[item].codigo
                    + ". " + "Nombre: "
                    + resultBusqueda[item].nombre
                    + "  -  "
                    + " Calificacion: "
                    + resultBusqueda[item].calificacion
                    + " " + "\n";
            }
        }

        alert(estudianteResult);
        menuPrint();
    }
}


function editarCalificacion() {
    let resultCalificaciones = "";
    let resultBusqueda = ""

    for (const item in calificaciones) {
        resultCalificaciones += "Codigo: " + calificaciones[item].codigo
            + ". " + "Nombre: "
            + calificaciones[item].nombre
            + "  -  "
            + " Calificacion: "
            + calificaciones[item].calificacion
            + " " + "\n";
    }

    let codigoEstudiante = parseInt(prompt("Ingrese un numero de codigo a editar:\n" + resultCalificaciones));
    let calificacionUpdate = "";
    if (isNaN(codigoEstudiante)) {
        console.log("Ingrese un codigo valido");
    } else {
        resultBusqueda = calificaciones.find(calificacion => calificacion.codigo === codigoEstudiante);
        if (resultBusqueda.length == 0) {
            estudianteResult = "No se encontro resultados"
        } else {
            calificacionUpdate = parseInt(prompt("Ingrese una calificacion:\n"));
            if (isNaN(calificacionUpdate)) {
                console.log("Ingrese un calificacion valida");
            } else {
                calificaciones.forEach(item => {
                    if (item.codigo == codigoEstudiante) {
                        item.calificacion = calificacionUpdate;
                    }
                });

                verCalificaciones();
            }
        }
    }
}

function agregarCalificacion() {
    let calificacionesAdd = {};
    let nombre = "";
    let calificacion = "";

    nombre = prompt("Ingrese un nombre del estudiante:");
    if (!isNaN(nombre)) {
        console.log("Ingrese un nombre valido");
    } else {
        calificacion = parseInt(prompt("Ingrese una calificacion:"));
        if (isNaN(calificacion)) {
            console.log("Ingrese un calificacion valida");
        } else {
            calificacionesAdd = {
                "codigo": (calificaciones.length + 1),
                "nombre": nombre,
                "calificacion": calificacion
            }
            calificaciones.push(calificacionesAdd);

            verCalificaciones();
        }
    }
}

function maxCalificacion() {
    const resultCalificaciones = calificaciones.map((cal) => cal.calificacion);
    alert(Math.max(...resultCalificaciones));
    menuPrint();
}

function minCalificacion() {
    const resultCalificaciones = calificaciones.map((cal) => cal.calificacion);
    alert(Math.min(...resultCalificaciones));
    menuPrint();
}

