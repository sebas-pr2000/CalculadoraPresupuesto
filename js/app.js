const ingresos = [];

const egresos = [];

console.log(ingresos);

let cargarApp = () => {
   cargarCabecero();
   cargarIngresos();
   cargarEgresos();
};

// Funcion para obtener el Total de los Ingresos
let totalIngresos = () => {
   let totalIngreso = 0;

   for (let ingreso of ingresos) {
      totalIngreso += ingreso.valor;
   }

   return totalIngreso;
};

// Funcion para obtener el Total de los Egresos
let totalEgresos = () => {
   let totalEgreso = 0;

   for (let egreso of egresos) {
      totalEgreso += egreso.valor;
   }

   return totalEgreso;
};

let cargarCabecero = () => {
   let presupuesto = totalIngresos() - totalEgresos();
   let porcentajeEgreso = totalEgresos() / totalIngresos() || 0;

   document.getElementById("presupuesto").innerHTML =
      formatoMoneda(presupuesto);

   document.getElementById("porcentaje").innerHTML =
      formatoPorcentaje(porcentajeEgreso);

   document.getElementById("ingresos").innerHTML = formatoMoneda(
      totalIngresos()
   );

   document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

// Funcion para Agregar $ y , automaticamente
const formatoMoneda = (valor) => {
   return valor.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
   });
};

// Funcion para Darle un Formato de Porcentaje y 2 numeros
let formatoPorcentaje = (valor) => {
   return valor.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
   });
};

// LISTADO INGRESOS :
const cargarIngresos = () => {
   let ingresosHTML = "";

   for (let ingreso of ingresos) {
      ingresosHTML += crearIngresoHTML(ingreso);
   }

   document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

// CREAR UN HTML CON CADA ELEMENTO:
const crearIngresoHTML = (ingreso) => {
   let ingresoHTML = ` 
   <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
       <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
       <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
             <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${
                ingreso.id
             })"></ion-icon>
          </button>
       </div>
    </div>
 </div>`;

   return ingresoHTML;
};

// ELIMINAR INGRESO:
const eliminarIngreso = (id) => {
   // buscamos el objeto que contenga el mismo id
   let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);

   // eliminamos un elemento con splice
   ingresos.splice(indiceEliminar, 1);

   cargarCabecero();
   cargarIngresos();
};

// LISTADO EGRESOS:
const cargarEgresos = () => {
   let egresosHtml = "";

   for (let egreso of egresos) {
      egresosHtml += crearEgresoHTML(egreso);
   }

   document.getElementById("lista-egresos").innerHTML = egresosHtml;
};

// CREAR UN HTML CON CADA ELEMENTO:
const crearEgresoHTML = (egreso) => {
   let egresoHTML = `
   <div class="elemento limpiarEstilos">
   <div class="elemento_descripcion">${egreso.descripcion}</div>
   <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(
         egreso.valor / totalIngresos()
      )}</div>
      <div class="elemento_eliminar">
         <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${
               egreso.id
            })"></ion-icon>
         </button>
      </div>
   </div>
</div>`;

   return egresoHTML;
};

// ELIMINAR EGRESOS:
const eliminarEgreso = (id) => {
   let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);

   egresos.splice(indiceEliminar, 1);

   cargarCabecero();
   cargarEgresos();
};

// FORMULARIO AGREGAR DATO

let agregarDato = () => {
   let forma = document.forms["forma"];
   let tipo = forma["tipo"];
   let descripcion = forma["descripcion"];
   let valor = forma["valor"];

   if (descripcion.value !== "" && valor.value !== "") {
      if (tipo.value === "ingreso") {
         ingresos.push(new Ingreso(descripcion.value, +valor.value));

         cargarCabecero();
         cargarIngresos();
      } else if (tipo.value === "egreso") {
         egresos.push(new Egreso(descripcion.value, +valor.value));

         cargarCabecero();
         cargarEgresos();
      }

      descripcion.value = "";
      valor.value = "";
   }
};
