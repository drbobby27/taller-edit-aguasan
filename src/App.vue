<script>
import { v4 as uuidv4 } from 'uuid'
import VerFactura from "./components/VerFactura.vue";
import { mapActions, mapState } from 'pinia'
import {useFacturaStore} from './stores/factura';

export default {
  components : {
    VerFactura
  },
  data: () => ({
    usuario: "",
    usuarioActual:'',
    estratos: [
      { estrato: "Estrato 1", cargo_fijo: 2300, valor_metro: 250, subsidio: 40 },
      { estrato: "Estrato 2", cargo_fijo: 3200, valor_metro: 350, subsidio: 30 },
      { estrato: "Estrato 3", cargo_fijo: 3900, valor_metro: 460, subsidio: 10 }
    ],
    isEditMode: false,
    opcionEstrato: null,
    metros: "",
    usuarios: [],
    errors: false,
    idSelected: ''
  }),
  methods: {

    calcularFormula(metros, valorMetro, subsidioPor, cargoFijo) {
      function thousandSeparator(number = 0, decimalsQuantity = 2) {
        return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return thousandSeparator(((metros * valorMetro) * (subsidioPor / 100)) + cargoFijo);
    },

    definirEstrato(nombre, estratoStr, metros) {
      const estratoMap = {
        "Estrato 1": { cargoFijo: 2300, valorMetro: 250, subsidioPor: 40 },
        "Estrato 2": { cargoFijo: 3200, valorMetro: 350, subsidioPor: 30 },
        "Estrato 3": { cargoFijo: 3900, valorMetro: 460, subsidioPor: 10 }
      };
      const valoresSegunEstrato = estratoMap[estratoStr];
      const { cargoFijo, subsidioPor, valorMetro } = valoresSegunEstrato;
      return {
        numFact: uuidv4().slice(0, 5),
        usuario: nombre,
        cargoFijo,
        cantMetros: metros,
        subsidioPor,
        estrato: estratoStr,
        total: this.calcularFormula(metros, valorMetro, subsidioPor, cargoFijo)
      }
    },

    reset() {
      this.usuario = '';
      this.metros = '';
      this.opcionEstrato = '';
      this.idSelected = false;
      this.isEditMode = false;

    },
    agregarUsuario() {
      const filaCalculado = this.definirEstrato(this.usuario, this.opcionEstrato, this.metros);
      this.usuarios.push({ ...filaCalculado });
      this.reset();
    },

    ...mapActions(useFacturaStore, ["setFactura"]),

    editFactura(item) {
      this.usuario = item.usuario;
      this.metros = item.cantMetros;
      this.opcionEstrato = item.estrato;
      this.isEditMode = !this.isEditMode;
      this.idSelected = item.numFact;
    },
    editarFacturaAhorasi(){
      const clonedUsuarios = [...this.usuarios];
      const index = clonedUsuarios.findIndex(x => x.numFact === this.idSelected);
      if (index < 0) return;    
      clonedUsuarios[index] = this.definirEstrato(this.usuario, this.opcionEstrato, this.metros);
      this.usuarios = [...clonedUsuarios];
      this.reset();     
    }
  }, 
  computed :{
      ...mapState(useFacturaStore, {
        miFacturaXXX:  "factura"
      })
    }
}


</script>

<template>
  <div id="app" class="container w-60 my-5">
    <div class="elPaerc w-50 mx-auto">
      <form
        class="formulario text-dark px-5 py-2 shadow"        
      >
        <h2 class="mt-3 text-info">FACTURACIÓN AGUASAN</h2>

        <div class="row">
          <input
            v-model="usuario"
            type="text"
            placeholder="Nombre Usuario"
            class="my-5"
          />
        </div>
        <div class="row">
          <div class="col" v-if="estratos">
            <select
              v-model="opcionEstrato"
              class="col-12 p-1 rounded-1 text-center"
            >
              <option
                v-for="(item, i) in estratos"
                :key="i"
                v-text="item.estrato"
                class="rounded-4 text-center"
              ></option>
            </select>       
          </div>
          <div class="col">
            <input
              v-model.number="metros"
              type="text"
              placeholder="Metros Consumidos"
            />
          </div>
        </div>
        <div class="row">
          <div class="col d-grid my-5">
            <button
              @click="agregarUsuario"
              v-if="!isEditMode"
              class="btn btn-primary text-white text-center bg-info"
              type="button"
            >
              CALCULAR FACTURA
            </button>
            <button
              @click="editarFacturaAhorasi"
              v-else
              class="btn btn-primary text-white text-center bg-info"
              type="button"
            >
              EDITAR FACTURA
            </button>
          </div>
        </div>
      </form>
      <br />
      <table class="table mt-4 mb-5">
        <thead>
          <tr class="text-center text-white bg-info">
            <th scope="col">NUM FACTURA</th>
            <th scope="col">USUARIO</th>
            <th scope="col">CARGO FIJO</th>
            <th scope="col">CANT MTS</th>
            <th scope="col">SUBSIDIO</th>
            <th scope="col">TOTAL FACTURA</th>
            <th scope="col">Actions</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center text-dark"
            v-for="item in usuarios"
            :key="item.numFact"
          >
            <th class="text-info">{{ item.numFact }}</th>
            <td>{{ item.usuario }}</td>
            <td>{{ item.cargoFijo }}</td>
            <td>{{ item.cantMetros }}</td>
            <td>{{ item.subsidioPor }}</td>
            <td>{{ item.total }}</td>
            <td><button @click="setFactura(item)" class="btn fw-light shadow btn-success button-factura">Ver</button></td>
            <td><button @click="editFactura(item)" class="btn fw-light text-white shadow btn-info button-factura">Editar</button></td>
          </tr>
        </tbody>
      </table>
      <br /> 
        <VerFactura/>
    </div>
  </div>
</template>

<style scoped>
  .formulario{
    border-radius: 15px;
  }
  input, select {
    border: none;
    outline: none;
    text-align: center;
    border-bottom: 1px solid #222;
  }
  .button-factura {
    font-size: 7px;
  }
</style>
