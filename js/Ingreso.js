// Clase Hija

class Ingreso extends Dato {
   // elemento static para poder tener un id
   static contadorIngreso = 0;

   constructor(descripcion, valor) {
      super(descripcion, valor);
      // cada vez que creemos un objeto de Ingreso incrementara el id
      this._id = ++Ingreso.contadorIngreso;
   }

   get id() {
      return this._id;
   }
}
