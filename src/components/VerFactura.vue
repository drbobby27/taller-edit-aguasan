<script>
    import {mapState, mapActions} from 'pinia'
    import { useFacturaStore } from '../stores/factura'
    
      export default {
        computed :{
          ...mapState(useFacturaStore, {
            miFacturaXXX:  "factura"
          })
        },
        methods : {
          ...mapActions(useFacturaStore, ["limpiarFactura"])
        }
      }
    
    </script>
    
    <template>
    <!-- Modal -->
    
    <div>
      <div :class="`backdrop ${miFacturaXXX?.usuario ? 'showbackdrop' : 'hidebackdrop'}`"></div>
      <div :class="`moda-asperito-miso ${miFacturaXXX?.usuario ? 'visible' : 'hide'}`">
        <p @click="limpiarFactura()" class="close-icon"> <b>x</b> </p>
        <table class="table">
      <thead>
        <tr>
          <th scope="col"> <b class="text-center">Num Factura</b> </th>
          <th scope="col"> <b class="text-center">Usuario</b> </th>
          <th scope="col"> <b class="text-center">Cargo Fijo</b> </th>
          <th scope="col"> <b class="text-center">Cant Metros</b> </th>
          <th scope="col"> <b class="text-center">Subsidio</b> </th>
          <th scope="col"> <b class="text-center">Total</b> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ miFacturaXXX?.numFact }}</th>
          <td>{{ miFacturaXXX?.usuario }}</td>
          <td>{{ miFacturaXXX?.cargoFijo }}</td>
          <td>{{ miFacturaXXX?.cantMetros }}</td>
          <td>{{ miFacturaXXX?.subsidioPor }}</td>
          <td>{{ miFacturaXXX?.total }}</td> 
        </tr>
      </tbody>
    </table>
      </div>
    </div>
    </template>
    
    <style scoped>
      .moda-asperito-miso{
        position: fixed;
        box-shadow: 2px 2px 6px 2px #2222;
        top: 50%;
        left: 50%;
        transition: all .2s ease-in-out;
        padding: 2rem;
        border-radius: 18px;
        z-index: 99999999;
        width: max-content;
        height: max-content;
        background: white;
    
      }
      .backdrop {  
        background-color: rgba(34, 34, 34, 0.466);
        top: 0;
        bottom: 0;
        transition: all .5s ease-in-out;
        left: 0;
        right: 0;
        position: fixed;
      }
    
      .showbackdrop {
        opacity: 1;
        visibility: visible;
      }
    
      .hidebackdrop {
        opacity: 0;
        visibility: hidden;
      }
    
      .visible {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%);
      }
      .hide {
        opacity: 0;
        visibility: hidden;
        transform: translateX(500px);
      }
    
      .close-icon{
        position: absolute;
        top: 1rem;
        right: 1rem;
        cursor: pointer;
        transition: all .2s cubic-bezier(0.19, 1, 0.22, 1);
    
      }
      .close-icon:hover {
        transform: scale(1.2235);
      }
    
    </style>