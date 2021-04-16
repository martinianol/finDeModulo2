const autos = require ('./autos');
let persona = {
  nombre: 'Juan',
  capacidadDePagoEnCuotas: 20000,
  capacidadDePagoTotal: 100000
}



const concesionaria = {
  autos: autos,
  buscarAuto: function (pat) {
    let autoBuscado = this.autos.find(function(e){
      return e.patente == pat;
      })
    return autoBuscado === undefined ? null : autoBuscado
  },
  venderAuto: function(pat) {
    this.buscarAuto(pat).vendido = true;
  },
  autosParaLaVenta: function() {
    return this.autos.filter(function(e){
      return e.vendido == false;
    })
  },
  autosNuevos: function() {
    let autosVenta = this.autosParaLaVenta();
    return autosVenta.filter(function(e){
      return e.km < 100;
    })
  },
  autosVendidos: function() {
    return this.autos.filter(function(e){
      return e.vendido == true;
    })
  },

  listaDeVentas: function() {
    let autosVendidos = this.autosVendidos();
    let listaDeVentas = [];
    autosVendidos.forEach(function(e){
      return listaDeVentas.push(e.precio);
    })
    return listaDeVentas;
  },
  totalDeVentas: function() {
    let listaDeVentas = this.listaDeVentas();
    let ventas = listaDeVentas.reduce(function(acc,e){
      return acc + e;
    },0)
    return ventas; 
  },
  
  puedeComprar: function(auto,persona) {
    return ((persona.capacidadDePagoTotal >= auto.precio) && (persona.capacidadDePagoEnCuotas >= auto.precio/auto.cuotas)) ? true : false;
  },

  autosQuePuedeComprar: function(persona){
    let autosVenta = this.autosParaLaVenta();
    let autosPuedeComprar =  autosVenta.filter(function(e){
      return concesionaria.puedeComprar(e,persona)
    })
    return autosPuedeComprar;
  }
 
}



//console.log(concesionaria);
//console.log(concesionaria.buscarAuto('JJK116'));
//concesionaria.venderAuto('JJK116');
//console.log(concesionaria.buscarAuto('JA123'));

//console.log(concesionaria.autosParaLaVenta());
//concesionaria.venderAuto('JJK116');
//console.log(concesionaria.autosParaLaVenta())
//console.log(concesionaria.autosNuevos());
//console.log(concesionaria.totalDeVentas());
/*console.log(concesionaria.autosQuePuedeComprar({
  nombre: 'Juan',
  capacidadDePagoEnCuotas: 20000,
  capacidadDePagoTotal: 100000
}))*/

