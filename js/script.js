const dominio = document.getElementById('dominio');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const anio = document.getElementById('anio');
const tipo = document.getElementById('tipo');
const tipo_seguro = document.getElementById('tipo_seguro');
const contenedor_card = document.querySelector('#contenido_card');

const btnCotizarSeguro = document.getElementById('cotizar');
const btnNuevo = document.getElementById('nuevo');
const btnRemover = document.getElementById('removDiv');
const btnLimpiar = document.getElementById('limpiar');
const contenido = document.getElementById('contenido');
btnCotizarSeguro.addEventListener('click', cotizarSeguro);
document.getElementById('contenido-formulario2').style.display = 'none';

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

// window.onload = RecuperarModelo();
// window.onload = RecuperarTipoVehiculo();
marca.value = '';

function filtrarModelo(array) {
    let auto = modelo.value;
    if (!auto) {
        return array;
    } else {
        result = array.filter((e) => e.modelo == auto);
        console.log(result); //
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
    const respuesta = await fetch('./js/vehiculos.json');
    const data = await respuesta.json();
    createHTML(filtrarModelo(data));
}


function cargarObjetoCotizacion() {

    const cotizacion = new COTIZACION(dominio.value, marca.value, modelo.value, anio.value, tipo.value, tipo_seguro.value);
    return cotizacion;
}

async function RecuperarModelo() {
    const respuesta = await fetch('./js/vehiculos.json');
    const data = await respuesta.json();

    // console.log(modelos_seleccionados);
    mostrarModelo(elegirMarca(data));
    // mostrarTipoVehiculo(modelo_seleccionado(data));
}

function elegirMarca(vehiculosUsuarios) {

    let marca_filtro = marca.value;
    const marca_selec = vehiculosUsuarios.filter(marca => marca.marca == marca_filtro);
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

async function RecuperarTipoVehiculo() {
    const respuesta = await fetch('./js/vehiculos.json');
    const data = await respuesta.json();
    mostrarTipoVehiculo(modelo_seleccionado(data));
}


function modelo_seleccionado(vehiculosUsuarios) {
    let modelo_filtro = modelo.value;
    const modelo_selec = vehiculosUsuarios.filter(modelo => modelo.modelo == modelo_filtro);
    const imagen_selec = modelo.imagen;
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

//Este evento modifica el contenido de los select 

marca.onchange = () => {
    modelo.innerHTML = "";
    RecuperarModelo();
}

modelo.onchange = () => {
    tipo.innerHTML = "";
    RecuperarTipoVehiculo();
    RecuperarDatos();
}

function guardarCotizacionStorage(ca) {
    sessionStorage.setItem("cotizacion", JSON.stringify(ca));
    console.log("Prueba Storage Guardar");
}

function recuperarCotizacionStorage(ca) {
    cotizacion = JSON.parse(sessionStorage.getItem(ca));
    console.log("Prueba Storage Recuperacion datos");
    console.log(cotizacion);
    return ca;
}

function cotizarSeguro() {

    let cantidad;
    const base = 5000;
    //vehículo nacional se adiciona 10% e importado 20%

    tipo.value == 'NACIONAL' ? cantidad = base * 1.10 : cantidad = base * 1.20;

    const diferencia = new Date().getFullYear() - anio.value;
    console.log(diferencia);

    //por año de antieguedad se decremta un 2% lo acmulado

    cantidad -= ((diferencia * 2) * cantidad) / 100;
    console.log(cantidad);

    //Si la cobertura del seguro es completa la poliza se incrementa 50%, en caso de ser basica un 25%

    tipo_seguro.value == 'COMPLETA' ? cantidad = cantidad * 1.50 : cantidad = cantidad * 1.25;

    if (validar() == 'OK') {
        Swal.fire({
            title: 'Consulta de Poliza',
            html: `<h3>Dominio: ${dominio.value}<br>
            Marca: ${marca.value} <br>
            Modelo: ${modelo.value}  <br>
            Tipo Vehiculo: ${tipo.value} <br>
            Cobertura: ${tipo_seguro.value} </h3><br>
            <h2><b><font color="blue">Total de la Poliza: $ ${cantidad}</font></b></h2>`,
            showCancelButton: true,
            confirmButtonText: 'Confirmar Poliza',
            cancelButtonText: `Cancelar Poliza`,
            position: 'center'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cotización realizada correctamente!',
                    text: 'Detalle de la Poliza!',
                    showConfirmButton: false,
                    timer: 1500
                })
                const datosCotizacion = cargarObjetoCotizacion();
                guardarCotizacionStorage(datosCotizacion);
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                console.log("cancelacion");
                Swal.fire({
                    position: 'center',
                    title: 'Cotización cancelada!',
                    icon: 'success',
                    text: 'La Cotización ha sido borrada',
                    timer: 4000
                })
                setTimeout(recargar, 2000);
                sessionStorage.removeItem("carrito");
            }
        })
    } else {
        Swal.fire({
            title: 'Campos Incompletos!!',
            icon: 'info',
            timer: 4000,
            position: 'center'
        })
    }

}

function validar() {
    if (dominio.value === '' || marca.value === '' || modelo.value === '' || anio.value === '' || tipo_seguro.value === '' || tipo.value === '') {
        return 'error';
    } else {
        return 'OK';
    }
}

let divID = document.getElementById('contenido-formulario2');

const rellenarFormularioContacto = () => {

    divID.innerHTML = ` `
    divID.innerHTML = `
    <h2 class="text-contacto">Registra tus datos</h2>
    <div class="contenido-formulario2">
        <form action="" method="" enctype="">

        <div class="contenido-formulario2">
            <label class="label-control" for="apellido">Apellido: </label>
            <input type="text" id="apellido" class="form-control2 " required="text" name="apellido" placeholder="Ingresa Apellido"/>
        </div>

        <div class="contenido-formulario2">
            <label class="label-control" for="nombre">Nombres: </label>
            <input type="text" id="nombre" class="form-control2 " required="text" name="nombre" placeholder="Ingresa Nombres">
        </div>

        <div class="contenido-formulario2">
            <label class="label-control" for="email">Tu Email: </label>
            <input type="email" id="email" class="form-control2" required="email" placeholder="Ingresa Email">
        </div>

        <div class="contenido-formulario2">
            <label class="label-control" for="telefono">Telefono: </label>
            <input type="text" id="telefono" class="form-control2" required="tel" placeholder="Ingresa Teléfono">
        </div>

        <div class="contenido-formulario2">
            <label class="label-control" for="codigo_postal">Cod Postal: </label>
            <input type="text" id="codigo_postal" class="form-control2" required="number" name="cp" placeholder="Ingresa Codigo Postal">
        </div>
    
        <input type="submit" value="Enviar" class="btn_formulario2 submit-btn" id="btnEnviar">    
        </form>
    </div>`;
};

const btn_Contratar = document.getElementById('contratar');
btn_Contratar.addEventListener('click', () => {
    if (validar() == 'OK') {
        document.getElementById('contenido-formulario2').style.display = 'block';
        rellenarFormularioContacto();
        const ape = document.querySelector('#apellido');
        const nomb = document.querySelector('#nombre');
        const eMail = document.querySelector('#email');
        const telef = document.querySelector('#telefono');
        const cp = document.querySelector('#codigo_postal');
        const btnEnviarInfo = document.querySelector('#btnEnviar');

        btnEnviarInfo.addEventListener('click', (event) => {
            event.preventDefault();
            if (validarContacto(ape.value, nombre.value, email.value, telefono.value, codigo_postal.value) == 'OK') {
                const clientes = {
                    apellido: ape.value,
                    nombre: nomb.value,
                    email: eMail.value,
                    telefono: telef.value,
                    codigo_postal: cp.value
                };

                Swal.fire({
                    title: 'Gracias por contactarse con Nosotros!!!',
                    showCancelButton: true,
                    confirmButtonText: 'Enviar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem('clientes', JSON.stringify(clientes))
                        Swal.fire('Se guardaron los datos, ¡Pronto enviaremos su Poliza Contratada!', '', 'success');
                        setTimeout(() => {
                            sessionStorage.removeItem("cotizacion");
                            setTimeout(recargar, 2000);
                        }, );

                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Los datos no se guardaron. ¡Gracias por su consulta!',
                            '',
                            'info'
                        );
                        setTimeout(() => {
                            sessionStorage.removeItem("cotizacion");
                            setTimeout(recargar, 2000);
                        }, );
                    }
                })
            } else {
                Swal.fire({
                    title: 'Debes completar los datos del contacto!!',
                    icon: 'info',
                    timer: 4000,
                    position: 'center'
                })
            }
        });
        
    } else {
        Swal.fire({
            title: 'Antes de Contratar debes primero cotizar!!',
            icon: 'info',
            timer: 4000,
            position: 'center'
        })
    }

});

function validarContacto(nom, ape, correo, tele, codPostal) {
    if (nom === '' || ape === '' || correo === '' || tele === '' || codPostal === '') {
        return 'error';
    } else {
        return 'OK'
    }
}

btnNuevo.addEventListener('click', () => {

    // sessionStorage.removeItem("cotizacion");
    sessionStorage.clear();
    mensajeNuevoCotizacion();
    setTimeout(recargar, 2000);
});

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