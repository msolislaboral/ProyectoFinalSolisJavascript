
const herraLista = document.querySelector('#herramientasLista')
herraLista.innerHTML = `<h5> Inventario en Archivo JSON: </h5>`

fetch('./js/data.json')
.then( (Response) => Response.json())
.then( (data) => 
{

  data.forEach((unidad) => 
  {
    const li = document.createElement('li')
    li.innerHTML = `
    <h5>${unidad.herramienta}</h5>
    <p>${unidad.categoria}</p>
    <p>${unidad.costo} USD</p>
    <hr/>
    `
    herraLista.append(li)
  })
})


/*DEFINICION DE CLASE*/

class Herramienta 
{
    constructor (nombre,categoria,costo)
    {
        this.nombre = nombre;
        this.categoria = categoria;
        this.costo = parseFloat(costo);
    }
}

/*VARIABLES*/

const datosCia = 
{
    empresa : "Servicios Especiales SA",
    direccion : "Irigoyen 1364",
    cuit : 306456784,
    pagina : "www.serviciosespeciales.com"
}

let empresa = datosCia.empresa;
let pagina = datosCia.pagina;

let arrayHerramientas = [];
let minuevaHerramienta = document.querySelector("#nuevaHerramienta");
let inputNombre = document.querySelector("#iNombre");

let nombreIngresado = nuevaHerramienta.children[1].value;
let categoriaIngresado = nuevaHerramienta.children[3].value;
let costoIngresado = nuevaHerramienta.children[5].value;

let displayCia = document.querySelector("#displayCia");
let contenedor = document.querySelector("#herramientaIngresada");
let displayTodos = document.querySelector("#displayTodos");
let bandera = false;

minuevaHerramienta.addEventListener("submit", agregarHerramienta);
btnMostrar.addEventListener('click', MostrarTodasHerramientas);

inputNombre.focus();

/*FUNCIONES*/

function validarIngreso() 
{
    nombreIngresado = nuevaHerramienta.children[1].value;
    categoriaIngresado = nuevaHerramienta.children[3].value;
    costoIngresado = nuevaHerramienta.children[5].value;
    console.log(nombreIngresado);
    console.log(categoriaIngresado);
    console.log(costoIngresado);
    const verificacion = (nombreIngresado == '' || categoriaIngresado =='' || costoIngresado == '') ? bandera = false : bandera = true
    verificacion ? Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Campos completados',
        showConfirmButton: false,
        timer: 10000
      }) : Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Faltan campos por completar',
        showConfirmButton: false,
        timer: 10000
      });

}

function agregarHerramienta(e)
{
    e.preventDefault();
    validarIngreso();
    if (bandera == true) 
    {
        let opcion = Swal.fire({
            title: '¿Desea añadir la herramienta al inventario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => 
          {
            
            if (result.isConfirmed) 
            {
              Swal.fire('Herramienta agregada al inventario', '', 'success');
              let formulario = e.target
              arrayHerramientas.push(new Herramienta(nombreIngresado, categoriaIngresado, costoIngresado))
              
            } 
            else if (result.isDenied) 
            {
              Swal.fire('NO se agregó la herramienta al inventario', '', 'info')
            }
          })
          nuevaHerramienta.children[1].value = '';
          nuevaHerramienta.children[3].value = '';
          nuevaHerramienta.children[5].value = '';
          
          contenedor.innerHTML = '';
          añadirDom();
          inputNombre.focus();        
    }
    else 
    {
        inputNombre.focus();
    }
}

function añadirDom()
{
    contenedor.innerHTML = `<h4> Ultimos campos completados: </h4>
    <p><strong> Nombre de herramienta: </strong> ${nombreIngresado}</p>
    <p><strong> Categoria de herramienta: </strong> ${categoriaIngresado}</p>
    <p><strong> Costo de herramienta: </strong> ${costoIngresado} USD</p>
    <hr>`;
}

function MostrarTodasHerramientas(e) 
{
    e.preventDefault();
    let i=0;
    displayTodos.innerHTML = '<h4> Listado de herramientas ingresadas al inventario: </h4>';
    for (const herramienta of arrayHerramientas) 
    {
        displayTodos.innerHTML += `
        <p><strong> Nombre: </strong> ${herramienta.nombre}</p>
        <p><strong> Categoria: </strong> ${herramienta.categoria}</p>
        <p><strong> Costo: </strong> ${herramienta.costo} USD</p>
        <hr>`
    }
    console.log(...arrayHerramientas);
}

/*MAIN*/

displayCia.innerHTML = '<h5> Datos Cía. </h5>';
displayCia.innerHTML += `
<p> Empresa: ${empresa}</p>
<p> Pagina Web: ${pagina}</p>
<hr>`




