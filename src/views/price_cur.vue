<template>
  <div class="app">
    <div class="app_contents">
      <div class="input_form"> 
        <p>パーツ代金：<input v-model="parts_price"></p>
        <p>送料：<input v-model="shipment_price"></p>
        <p>総額：{{Number(parts_price) + Number(shipment_price)}}</p>
        <p>{{total_origin}}</p>
        <button @click="display_now">now</button>
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
    let total_origin = ref(parts_price.value + shipment_price.value)

    const display_now=()=>{
      total_origin.value = Number(parts_price.value) + Number(shipment_price.value);
    }
    return{
      parts_price,
      shipment_price,
      total_origin,

      display_now,
    }
  }
}
</script>