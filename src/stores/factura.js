import { defineStore } from 'pinia'

export const useFacturaStore = defineStore('factura', {
    state: () => ({ factura: 0 }),
    getters: {
      verFactura: state => state.factura,
    },
    actions: {
      setFactura(factura) {
        this.factura = factura
      },
      limpiarFactura(){
      this.factura = null;
    }
      
    },
  })
