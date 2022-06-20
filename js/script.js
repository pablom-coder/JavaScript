const dominio = document.getElementById('dominio');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const anio = document.getElementById('anio');
const tipo = document.getElementById('tipo');
const tipo_seguro = document.getElementById('tipo_seguro');
const contenedor_card=document.querySelector('#contenido_card');

const btnCotizarSeguro = document.getElementById('cotizar');
const btnNuevo = document.getElementById('nuevo');
const btnRemover = document.getElementById('removDiv');
const btnLimpiar = document.getElementById('limpiar');
const contenido = document.getElementById('contenido');
btnCotizarSeguro.addEventListener('click', cotizarSeguro);
// btnRemover.addEventListener('click', mostrar);


const vehiculos = [{
    marca: 'RENAULT',
    modelo: 'SANDERO',
    tipo: 'NACIONAL',
    imagen: './images/sandero.jpg'
}, {
    marca: 'RENAULT',
    modelo: 'STEPWAY',
    tipo: 'NACIONAL',
    imagen: './images/stepway.jpg'
}, {
    marca: 'RENAULT',
    modelo: 'LOGAN',
    tipo: 'NACIONAL',
    imagen: './images/logan.jpg'
}, {
    marca: 'RENAULT',
    modelo: 'KANGOO',
    tipo: 'NACIONAL',
    imagen: './images/kangoo.jpg'
}, {
    marca: 'RENAULT',
    modelo: 'KOLEOS',
    tipo: 'IMPORTADO',
    imagen: './images/koleos.jpg'
}, {
    marca: 'RENAULT',
    modelo: 'MEGANE',
    tipo: 'IMPORTADO',
    imagen: './images/megane.jpg'
}, {
    marca: 'VW',
    modelo: 'GOL',
    tipo: 'NACIONAL',
    imagen: './images/gol.jpg'
}, {
    marca: 'VW',
    modelo: 'BORA',
    tipo: 'IMPORTADO',
    imagen: './images/bora.jpg'
}, {
    marca: 'VW',
    modelo: 'GOLF',
    tipo: 'IMPORTADO',
    imagen: './images/golf.jpg'
}, {
    marca: 'TOYOTA',
    modelo: 'COROLLA',
    tipo: 'IMPORTADO',
    imagen: './images/corolla.jpg'
}, {
    marca: 'TOYOTA',
    modelo: 'YARIS',
    tipo: 'IMPORTADO',
    imagen: './images/yaris.jpg'
}, {
    marca: 'TOYOTA',
    modelo: 'HILUX',
    tipo: 'IMPORTADO',
    imagen: './images/hilux.jpg'
}, {
    marca: 'JEEP',
    modelo: 'RENEGATE',
    tipo: 'IMPORTADO',
    imagen: './images/renegate.jpg'
}, {
    marca: 'JEEP',
    modelo: 'COMPAC',
    tipo: 'IMPORTADO',
    imagen: './images/compac.jpg'
}]
class COTIZACION {
    constructor(dominio, marca, modelo, anio, tipo, tipo_seguro) {
        this.dominio = dominio;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.tipo = tipo;
        this.tipo_seguro = tipo_seguro;
    }
}

// window.onload = mostrarMarca(seleccionarMarca(vehiculos, marca.value));
window.onload = mostrarModelo(elegirMarca(vehiculos, marca.value));
window.onload = mostrarTipoVehiculo(modelo_seleccionado(vehiculos, modelo.value));

function filtrarModelo(array) {
    let auto = modelo.value;
    if (!auto) {
        return array;
    } else {
        result = array.filter((e) => e.modelo == auto);
        console.log(result);//
        return result;
        
    }
}

// FUNCIÓN PARA AGREGAR AL HTML LOS DATOS OBTENIDOS DEL JSON

function createHTML(array) {
    contenedor_card.innerHTML = ''
    array.forEach((autoSel) => {
        const card = `
                        <h1 id="marca_imagen">Marca: ${autoSel.marca} </h1>
                        <div class="card">
                            <h2 id="modelo_imagen"> Modelo: ${autoSel.modelo}</h2>
                            <img id="modelo_vehiculos" src="${autoSel.imagen}" class="imagen" alt=""> <br>`
        contenedor_card.innerHTML = card
    })
}
//Función Asincrona para obtener los datos de Json
async function RecuperarDatos() {
    const respuesta = await fetch('./js/data.json');
    const data = await respuesta.json();
    createHTML(filtrarModelo(data));
}


function cargarObjetoCotizacion() {

    const cotizacion = new COTIZACION(dominio.value, marca.value, modelo.value, anio.value, tipo.value, tipo_seguro.value);
    return cotizacion;
}

function elegirMarca(vehiculosUsuarios, marc) {

    const marca_selec = vehiculosUsuarios.filter(marca => marca.marca == marc);
    console.log(marca_selec);
    return marca_selec;
}

function mostrarModelo(vehiculosUsuarios) {

    for (const elemento of vehiculosUsuarios) {

        let option = `<option value="${elemento.modelo}" id="cuenta${elemento.modelo}">${elemento.modelo}</option>`;
        console.log(option);
        modelo.innerHTML += option;
    }
}

function modelo_seleccionado(vehiculosUsuarios, mode) {
    const modelo_selec = vehiculosUsuarios.filter(modelo => modelo.modelo == mode);
    const imagen_selec= modelo.imagen;
    console.log(vehiculosUsuarios);
    console.log(modelo_selec);
    console.log(imagen_selec);
    return modelo_selec;
}

function mostrarTipoVehiculo(vehiculosUsuarios) {

    for (const elemento of vehiculosUsuarios) {

        let option2 = `<option value="${elemento.tipo}" id="cuenta${elemento.tipo}">${elemento.tipo}</option>`;
        console.log(option2);
        tipo.innerHTML += option2;
    }
}

// function mostrarVehiculo(vehiculosUsuarios) {
//     for (const elemento of vehiculosUsuarios) {
//             let varianteElegida = elemento.imagen;
//             let modelo_selec=elemento.modelo;
//             let marca_selec=elemento.marca
//             console.log(modelo_selec);
//             console.log(varianteElegida);
//             cambiarImagen(varianteElegida,modelo_selec,marca_selec);
//     }
// }

// function cambiarImagen(source,modelo_img,marca_img) {
//     document.getElementById('modelo_vehiculos').src = source;
//     document.getElementById('modelo_imagen').innerText=modelo_img;
//     document.getElementById('marca_imagen').innerText=marca_img;
// }


//Este evento modifica el contenido de los select 

marca.onchange = () => {
    modelo.innerHTML = "";
    mostrarModelo(elegirMarca(vehiculos, marca.value));
}

modelo.onchange = () => {
    tipo.innerHTML = "";
    mostrarTipoVehiculo(modelo_seleccionado(vehiculos, modelo.value));
    // mostrarVehiculo(modelo_seleccionado(vehiculos, modelo.value));
}


// STORAGE Y JSON
function guardarCotizacionStorage(ca) {
    localStorage.setItem("cotizacion", JSON.stringify(ca));
    console.log("Prueba Storage Guardar");
}


function recuperarCotizacionStorage(ca) {
    cotizacion = JSON.parse(localStorage.getItem(ca));
    console.log("Prueba Storage Recuperacion datos");
    console.log(cotizacion);
    return ca;
}

function cotizarSeguro() {
    alert("BIENVENIDO");

    const dominio = document.getElementById('dominio').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anio = document.getElementById('anio').value;
    const tipo = document.getElementById('tipo').value;
    const tipo_seguro = document.getElementById('tipo_seguro').value;

    let cantidad;
    const base = 5000;
    //vehículo nacional se adiciona 10% e importado 20%

    tipo == 'NACIONAL' ? cantidad = base * 1.10 : cantidad = base * 1.20;
    // const dateTime = luxon.DateTime;
    // const fecha =dateTime.now();
    // console.log(fecha.year().toString());

    const diferencia = new Date().getFullYear() - anio;
    console.log(diferencia);

    //por año de antieguedad se decremta un 2% lo acmulado

    cantidad -= ((diferencia * 2) * cantidad) / 100;
    console.log(cantidad);

    //Si la cobertura del seguro es completa la poliza se incrementa 50%, en caso de ser basica un 25%

    tipo_seguro == 'COMPLETA' ? cantidad = cantidad * 1.50 : cantidad = cantidad * 1.25;

    if (dominio === '' || marca === '' || modelo === '' || anio === '' || tipo_seguro === 'Seleccionar' || tipo === '') {
        alert("Faltan Datos, revisa e intenta de nuevo");
    } else {
        let divID = document.getElementById('resumen');
        //crear un div
        const div = document.createElement('div');
        //insertar la información
        div.innerHTML = `
                       <h2>Detalle de la Poliza:</h2>
                       <p>Dominio: ${dominio}</p>
                       <p>Marca: ${marca}</p>
                       <p>Modelo: ${modelo}</p>
                       <p>Año: ${anio}</p>
                       <p>Tipo: ${tipo}</p>          
                       <p>Total de la Poliza ${tipo_seguro}: $ ${cantidad}</p> `;
        console.log(resumen);
        divID.appendChild(div);
    }
    RecuperarDatos();
    const datosCotizacion = cargarObjetoCotizacion();
    guardarCotizacionStorage(datosCotizacion);
    recuperarCotizacionStorage(datosCotizacion);

    const objetoCotizacion = recuperarCotizacionStorage('cotizacion');

    Swal.fire({
        title: 'Consulta de Poliza',
        showCancelButton: true,
        confirmButtonText: 'Confirmar Poliza',
        cancelButtonText: `Cancelar Poliza`,
        position: 'center',
    }).then((result) => {
        if (result.isConfirmed) {
            /* location.href ="index.html"; */
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cotización realizada correctamente!',
                text: 'Detalle de la Poliza!',
                showConfirmButton: false,
                timer: 1500
            })
            //   borrarStorage();
            //   setTimeout(recargar, 2000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {

            console.log("cancelacion");
            Swal.fire({
                position: 'center',
                title: 'Cotización cancelada!',
                icon: 'success',
                text: 'La Cotización ha sido borrada',
                timer: 3000

            })
            borrarStorage();
            setTimeout(recargar, 2000);
        }
    })

    btnNuevo.addEventListener('click', () => {
        setTimeout(recargar, 2000);
        // borrarStorage();
        mensajeNuevoCotizacion();
    });

    function borrarStorage() {
        localStorage.clear();
        document.querySelector("#resumen").innerText = " ";
    }
    /* FUNCION PARA RECARGAR LA PÁGINA DESPUES DE CANCELAR */
    function recargar() {
        location.reload();
    }
    // CUANDO EL USUARIO SELECCIONA NUEVA COTIZACION ENVIA MENSAJE 
    function mensajeNuevoCotizacion() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Puedes Generar nueva Poliza!',
            showConfirmButton: false,
            timer: 4000
        })
    }

}