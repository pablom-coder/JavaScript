const dominio = document.getElementById('dominio');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const anio = document.getElementById('anio');
const tipo = document.getElementById('tipo');
const tipo_seguro = document.getElementById('tipo_seguro');
const btnCotizarSeguro = document.getElementById('cotizar');
btnCotizarSeguro.addEventListener('click', cotizarSeguro);

const vehiculos = [{
    marca: 'RENAULT',
    modelo: 'SANDERO',
    tipo: 'NACIONAL'
}, {
    marca: 'RENAULT',
    modelo: 'STEPWAY',
    tipo: 'NACIONAL'
}, {
    marca: 'RENAULT',
    modelo: 'LOGAN',
    tipo: 'NACIONAL'
}, {
    marca: 'RENAULT',
    modelo: 'KANGOO',
    tipo: 'NACIONAL'
}, {
    marca: 'RENAULT',
    modelo: 'KOLEOS',
    tipo: 'IMPORTADO'
}, {
    marca: 'RENAULT',
    modelo: 'MEGANE',
    tipo: 'IMPORTADO'
}, {
    marca: 'VW',
    modelo: 'GOL',
    tipo: 'NACIONAL'
}, {
    marca: 'VW',
    modelo: 'BORA',
    tipo: 'IMPORTADO'
}, {
    marca: 'VW',
    modelo: 'GOLF',
    tipo: 'IMPORTADO'
}, {
    marca: 'TOYOTA',
    modelo: 'COROLLA',
    tipo: 'IMPORTADO'
}, {
    marca: 'TOYOTA',
    modelo: 'YARIS',
    tipo: 'IMPORTADO'
}, {
    marca: 'TOYOTA',
    modelo: 'HILUX',
    tipo: 'IMPORTADO'
}, {
    marca: 'JEEP',
    modelo: 'RENEGATE',
    tipo: 'IMPORTADO'
}, {
    marca: 'JEEP',
    modelo: 'COMPAC',
    tipo: 'IMPORTADO'
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

    //    let option=vehiculosUsuarios.filter(mar=>mar.marca==marcaIng);
    //    console.log(option);
    for (const elemento of vehiculosUsuarios) {

        let option = `<option value="${elemento.modelo}" id="cuenta${elemento.modelo}">${elemento.modelo}</option>`;
        // let option2=`<option value="${elemento.tipo}" id="cuenta${elemento.tipo}">${elemento.tipo}</option>`;
        console.log(option);
        modelo.innerHTML += option;
        // tipo.innerHTML += option2;
    }

}

function modelo_seleccionado(vehiculosUsuarios, mode) {
    const modelo_selec = vehiculosUsuarios.filter(modelo => modelo.modelo == mode);
    console.log(modelo_selec);
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
    mostrarModelo(elegirMarca(vehiculos, marca.value));
}

modelo.onchange = () => {
    tipo.innerHTML = "";
    mostrarTipoVehiculo(modelo_seleccionado(vehiculos, modelo.value));
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
    
    const diferencia = new Date().getFullYear() - anio;
    console.log(diferencia);

    //por año de antieguedad se decremta un 2% lo acmulado

    cantidad -= ((diferencia * 2) * cantidad) / 100;
    console.log(cantidad);

    //Si la cobertura del seguro es completa la poliza se incrementa 50%, en caso de ser basica un 25%

    tipo_seguro == 'COMPLETA' ? cantidad = cantidad * 1.50 : cantidad = cantidad * 1.25;

    if (dominio === '' || marca === '' || modelo === '' || anio === '' || tipo_seguro === '' || tipo === '') {
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
    const datosCotizacion = cargarObjetoCotizacion();
    guardarCotizacionStorage(datosCotizacion);
    recuperarCotizacionStorage(datosCotizacion);

    const objetoCotizacion = recuperarCotizacionStorage('cotizacion');
}