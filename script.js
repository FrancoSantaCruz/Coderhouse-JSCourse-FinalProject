let btnContainer = document.getElementById("btn__container"); //Contenedor de los botones Si y No. 
let btnNo = document.getElementById("btn __no"); //Boton No
let btnSi = document.getElementById("btn __si"); //Boton Si
let primerPagText = document.getElementById("text __primerPag"); // Mensaje Primer Página
let userForm = document.getElementById("userForm"); //Creación de usuario
let listado = document.getElementById("listado"); //Lista de usuarios ya creados
let loginText = document.getElementById("loginText"); //Mensaje para el listado
let usuarioElegidoForm = document.getElementById("loginForm");
let reset = document.getElementById("keypad__container"); //Boton para resetear el local storage

// Card Section
let cardImage = document.getElementById("card")

// Extractor Section
let extractorImage = document.getElementById("extractorDinero")

//Elementos de la Tercer Página
let tercerPag = document.getElementById("tercerPag");
let tercerPagText = document.getElementById("text __tercerPag");
let opAgregar = document.getElementById("agregar");
let opConsultar = document.getElementById("consultar");
let opRetirar = document.getElementById("retirar");
let opSalir = document.getElementById("salir");

//Elementos de la Cuarta Página
let cuartaPag = document.getElementById("cuartaPag");
let cuartaPagText = document.getElementById("text __cuartaPag")
let cuartaPagForm = document.getElementById("operacionForm");

//Elementos de la Quinta Página
let quintaPag = document.getElementById("quintaPag");
let quintaPagText = document.getElementById("text __quintaPag")
let btnReiniciar = document.getElementById("btn __reiniciar")
let btnSalir = document.getElementById("btn __salir")


let usuariosList = [];
let usuarioLog = "";
let opcion = 0;

let user;
let usuarioStorage = localStorage.getItem("user");


// class User {
//     //Aplico el método toLowerCase() para que no haya errores de compatibilidad cuando ingresen nuevamente la cuenta y le erren en las mayusculas y minusculas.
//     constructor(nombre, email, saldo) {
//         this.nombre = nombre.toLowerCase();
//         this.email = email.toLowerCase();
//         this.saldo = saldo;
//         let id = usuariosList.length + 1;
//         let usuario = {
//             id: id,
//             nombre: this.nombre,
//             email: this.email,
//             saldo: this.saldo,
//         };

//         usuariosList.push(usuario)
//         localStorage.setItem('usuarios', JSON.stringify(usuariosList))
//     }
// }

reset.addEventListener("click", (e) => {
    localStorage.clear();
})

btnNo.addEventListener("mouseover", (e) => {
    e.preventDefault();

    let randomNumberX = Math.floor(Math.random() * 200);
    let randomNumberY = Math.floor(Math.random() * 200);
    btnNo.style.transform = "translate(" + randomNumberX + "px," + randomNumberY + "px)";
})

inicio();
function inicio() {
    if (usuarioStorage) {
        btnSi.addEventListener("submit", (e) => {
            e.preventDefault();

            usuarioLog = JSON.parse(usuarioStorage);

            let newCardImage = document.createElement("img");
            newCardImage.setAttribute("src", "." + "/img/empty-card.png");
            newCardImage.setAttribute("alt", "Card Image");
            newCardImage.setAttribute("class", "img __card mrg__aux");

            let CardContainer = cardImage.parentNode;
            CardContainer.replaceChild(newCardImage, cardImage);

            menu(usuarioLog);
        })
    } else {

        
        btnSi.addEventListener("submit", (e) => {
            e.preventDefault();
            
            console.log("Estoy aca!!")
            listado.style.display = "block";
            loginText.style.display = "block";
            usuarioElegidoForm.style.display = "flex";


            primerPagText.innerHTML = `
                <p class="ATM__msg">En caso de no tener una cuenta ya creada, registrate aquí!</p>
                `


            const getDatos = async () => {
                try {
                    const response = await fetch("./users.json");
                    const data = await response.json();

                    data.forEach((usuario) => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                        
                        <a>${usuario.id})${usuario.nombre} </a>
                        <a>(Saldo disponible: $${usuario.saldo})</a>
                        <button type="submit" id="elegirUsuario" value=${usuario.id}>Ingresar</button>
                    `;
                        
                        listado.append(li);
                    });
                } catch (error) {
                    console.log(error);
                }
            };

            getDatos();
            formularioUsuario();
        })
    }
}
function createUser(nombre, email, saldo) {
    let id = usuariosList.length + 1;
    let usuario = {
        id: id,
        nombre: nombre,
        email: email,
        saldo: saldo,
    };
    return usuario
}

function formularioUsuario() {
    btnContainer.style.display = "none";
    userForm.style.display = "block";
    
    usuarioElegidoForm.addEventListener("submit", (e) =>{

        e.preventDefault();
        // let idUsuarioLog = usuarioElegido.value;
        console.log(e)
        
        const getDatos = async () => {
            try {
                const response = await fetch("./users.json");
                const data = await response.json();

                data.forEach((usuario) => {
                    if(usuario.id === idUsuarioLog){
                        return usuario;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        
        usuarioLog = getDatos();

        menu(usuarioLog)
    })

    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let inputs = e.target.children;
        let inp_nombre = inputs[0].value;
        let inp_email = inputs[1].value;
        let inp_saldo = inputs[2].value;
        // usuarioLog = new User(inp_nombre, inp_email, inp_saldo);

        let usuario = createUser(inp_nombre, inp_email, inp_saldo)
        localStorage.setItem("user", JSON.stringify(usuario));
        usuariosList.push(usuario);
        console.log(usuariosList)
        usuarioLog = usuario;
        alert(`Bienvenido ${usuario.nombre}`); //Agregar Tostify


        primerPagText.style.display = "none";
        userForm.style.display = "none";

        let newCardImage = document.createElement("img");
        newCardImage.setAttribute("src", "." + "/img/empty-card.png");
        newCardImage.setAttribute("alt", "Card Image");
        newCardImage.setAttribute("class", "img __card mrg__aux");

        let CardContainer = cardImage.parentNode;
        CardContainer.replaceChild(newCardImage, cardImage);

        menu(usuarioLog);
    })

}

cuartaPagForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let montoAgregarQuitar = e.target.children[0].value;
    operaciones(montoAgregarQuitar)
})

btnReiniciar.addEventListener("click", (e) => {
    e.preventDefault()
    quintaPag.style.display = "none";
    menu(usuarioLog);
})

btnSalir.addEventListener("submit", (e) => {
    console.log("Reinicio.")
})

function menu(user) {
    listado.style.display = "none"
    loginText.style.display = "none"
    btnContainer.style.display = "none";
    primerPagText.style.display = "none";
    userForm.style.display = "none";

    let nombre = user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1);
    tercerPag.style.display = "grid"
    tercerPagText.style.display = "block";
    tercerPagText.innerText = "Bienvenido " + nombre + "! Selecciona una opción.";

    opAgregar.addEventListener("click", (e) => {
        e.preventDefault();
        tercerPag.style.display = "none"
        cuartaPag.style.display = "grid";
        cuartaPagText.innerText = "Ingresar monto que desea depositar:"
        opcion = "1";
    })

    opConsultar.addEventListener("click", (e) => {
        e.preventDefault();
        tercerPag.style.display = "none"
        quintaPag.style.display = "grid";
        quintaPagText.innerHTML = ` <p>Su saldo actual es de: $${usuarioLog.saldo}</p>
            <p>¿Desea realizar otra operación?</p>
            `
    })

    opRetirar.addEventListener("click", (e) => {
        e.preventDefault();
        tercerPag.style.display = "none"
        cuartaPag.style.display = "grid";
        cuartaPagText.innerText = "Ingresar monto que desea retirar:"
        opcion = "2";
    })

    opSalir.addEventListener("click", (e) => {
        console.log("Reinicio")
    })
}

function operaciones(montoAgregarQuitar) {
    switch (opcion) {
        case "1":
            usuarioLog.saldo = agregar(usuarioLog.saldo, montoAgregarQuitar);

            cuartaPag.style.display = "none";
            quintaPag.style.display = "grid";
            quintaPagText.innerHTML = `<p>Depósito realizado correctamente.</p>
            <p>Su saldo actual es de: $ ${usuarioLog.saldo}</p>
            <p>¿Desea realizar otra operación?</p>
            `
            break;
        case "2":
            let billetes = retirar(usuarioLog.saldo, montoAgregarQuitar);
            usuarioLog.saldo = usuarioLog.saldo - montoAgregarQuitar;

            cuartaPag.style.display = "none";
            quintaPag.style.display = "grid";
            quintaPagText.innerHTML = `<p>Extracción realizada correctamente.</p>
            <p>Su saldo actual es de: $ ${usuarioLog.saldo}</p>
            <div>
            <p>Usted retiró: </p>
            <p>${billetes.mil} de mil($1000)</p>
            <p>${billetes.cien} de cien($100)</p>
            <p>${billetes.diez} de diez($10)</p>
            <p>No se puede extraer $${Object.values(billetes.error)}.</p> 
            <p>Solo se aceptan divisas de $10, $100 y $1000</p>
            </div>
            <p>¿Desea realizar otra operación?</p>
            `
            let newExtractorDineroImg = document.createElement("img");
            newExtractorDineroImg.setAttribute("src", "." + "/img/extraccionDinero.png");
            newExtractorDineroImg.setAttribute("alt", "Extractor de Dinero");
            newExtractorDineroImg.setAttribute("class", "img __extractorDinero");

            let extractorDineroContainer = extractorImage.parentNode;
            extractorDineroContainer.replaceChild(newExtractorDineroImg, extractorImage);
            break;
        default:
            alert("Valor incorrecto. Ingrese un valor válido de las opciones.")
            break;
    }

}

function agregar(saldo, agregar) {
    let saldoInt = parseInt(saldo);
    let saldoAgregado = parseInt(agregar);
    return saldoInt + saldoAgregado;
}

function retirar(saldo, retirar) {
    let saldoRetirar = parseInt(retirar);
    if (saldoRetirar < saldo) {
        return calcUnidades(saldoRetirar);
    } else {
        return "Valor invalido. No puede retirar un monto mayor del que posee";
    }
}

function calcUnidades(retiro) {
    retiro = retiro.toString();
    let arrAux = [];
    let len = retiro.length + 1; /* Se le agrega 1 porque necesito contrarestar la sustraccion de la primera vuelta */
    for (let i = 0; i < retiro.length; i++) {
        arrAux.push(retiro[i]);
        len -= 1;
        for (let j = 1; j < len; j++) {
            arrAux[i] += parseInt("0");
        }
    }

    return calcBilletes(arrAux);
}

function calcBilletes(montos) {
    let bil_mil = [];
    let bil_cien = [];
    let bil_diez = [];
    let tot_mil = 0;
    let tot_cien = 0;
    let tot_diez = 0;
    let error = 0;
    montos.forEach(e => {
        if (e >= 1000) {
            bil_mil.push(e / 1000);
        }
        if (e <= 999 && e >= 100) {
            bil_cien.push(e / 100);
        }
        if (e < 100 && e >= 10) {
            bil_diez.push(e / 10);
        }
        if (e <= 9) {
            error = e;
        }
    });
    bil_mil.forEach(e => { tot_mil += e; });
    bil_cien.forEach(e => { tot_cien += e; });
    bil_diez.forEach(e => { tot_diez += e; });

    let billetes = {
        mil: tot_mil,
        cien: tot_cien,
        diez: tot_diez,
        error: error,
    }
    return billetes;
}