alert("¡Bienvenido!");
const menu = "1. Tablas de Multiplicar\n" +
    "2. Calculadora\n" +
    "3. Edad Promedio\n";
let opcionMenu = prompt("Ingrese un numero del menu:\n" + menu);


if (opcionMenu == null || isNaN(opcionMenu)) {
    location.reload();
} else {
    const validacionMenu = (opcionMenu) => {
        if (opcionMenu == null || isNaN(opcionMenu)) {
            location.reload();
            return true;
        }
        if (isNaN(parseInt(opcionMenu)) || opcionMenu == "" || opcionMenu < 0 || opcionMenu > 3) {
            return false;
        }
        return true;
    }

    while (!validacionMenu(opcionMenu)) {
        opcionMenu = parseInt(prompt("Ingrese un numero correcto del menu:\n" + menu));
    }
}

const menuIngreso = (opcionMenu) => {
    switch (opcionMenu) {
        case "1":
            tablasDeMultiplicar();
            break;
        case "2":
            calculadora();
            break
        case "3":
            promedioEdad();
            break
        default:
            break;
    }

}

menuIngreso(opcionMenu);

function tablasDeMultiplicar() {
    let resultMultiplicacion = "";
    let numeroTabla = parseInt(prompt("Ingrese el numero de la tabla"));
    if (isNaN(numeroTabla)) {
        console.log("No es un numero valido");
    } else {
        let numeroMultiplicar = parseInt(prompt("Ingrese el numero hasta a donde multiplicar"));
        if (isNaN(numeroMultiplicar)) {
            console.log("No es un numero valido");
        } else {
            for (let numero = 1; numero <= numeroMultiplicar; numero++) {
                resultMultiplicacion += (numeroTabla + " X " + numero + "=" + (numeroTabla * numero) + "\n");
            }
            alert(resultMultiplicacion);
        }
    }
}


function calculadora() {
    let resultCalculo = "";
    let primerNumero = parseInt(prompt("Ingrese el primer número"));
    if (isNaN(primerNumero)) {
        console.log("No es un numero valido");
    } else {
        let segundoNumero = parseInt(prompt("Ingrese el segundo número"));
        if (isNaN(segundoNumero)) {
            console.log("No es un numero valido");
        } else {
            let menuCalculadora = "1. Sumar\n" +
                "2. Restar\n" +
                "3. Multiplicar\n" +
                "4. Dividir\n";
            let opcionMenuCal = prompt("Ingrese un numero del menu:\n" + menuCalculadora);

            if (isNaN(opcionMenuCal)) {
                console.log("No es un numero valido");
            } else {
                switch (opcionMenuCal) {
                    case "1":
                        resultCalculo = primerNumero + segundoNumero;
                        break;
                    case "2":
                        resultCalculo = primerNumero - segundoNumero;
                        break
                    case "3":
                        resultCalculo = primerNumero * segundoNumero;
                        break
                    case "4":
                        if (segundoNumero == 0) {
                            resultCalculo = "No se puede dividir entre cero"
                        } else {
                            resultCalculo = primerNumero / segundoNumero;
                        }
                        break
                    default:
                        break;
                }
                alert(resultCalculo);
            }
        }
    }
}


function promedioEdad() {
    let resultPromEdad = "";
    let edad = parseInt(prompt("Ingrese edad o digita 0 para terminar registros"));
    let arrayEdades = [];
    if (!isNaN(edad)) {
        while (edad != 0) {
            if (isNaN(edad)) {
                edad = parseInt(prompt("Ingrese edad o digita 0 para terminar registros"));
            } else {
                if (!isNaN(edad)) {
                    arrayEdades.push(edad);
                }
                edad = parseInt(prompt("Ingrese edad o digita 0 para terminar registros"));
            }
        }
        let sumaEdad = 0;
        arrayEdades.forEach(edad => {
            sumaEdad += edad;
        });

        resultPromEdad = sumaEdad / arrayEdades.length;
        alert(resultPromEdad);
    }
}