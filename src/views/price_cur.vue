<template>
  <div class="app">
    <div class="app_contents">
      <div class="input_form"> 
        <p>パーツ代金：<input v-model="parts_price"></p>
        <p>送料：<input v-model="shipment_price"></p>
      </div> 
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup(){
    let parts_price = ref(0)
    let shipment_price = ref(0)
    return{
      parts_price,
      shipment_price,
    }
  }
}
</script>