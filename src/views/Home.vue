<template>
  <div class="app">
    <div class="edit">
      <h3>機種名：<input v-model="model_name"></h3>
      <div class="type_form">
        <h3>種別：
          <select name="product_type" id="product_type">
            <option v-for="types of type_list" v-bind:key="types.id" value=types.type>{{types.label}}</option>
          </select>
        </h3>
      </div>

      <div class="product_form">
        <h3>名称：
          <select name="product_name" id="product_name">
            <option v-for="products of product_list" v-bind:key="products.id" value= products.value>{{products.label}}</option>
          </select>
        </h3>
      </div>

      <div class="price_form">
        <h3>金額(税抜)：
          <input v-model="price">
        </h3>
        <h3>消費税：{{Number(price)/10}}</h3>
      </div>

      <div class="other_form">
        <h3>↓備考↓</h3>
        <textarea name="product_other" id="product_other" cols="30" rows="10"></textarea>
      </div>

      <button @click="push">追加</button>
    </div>


    <div class="preview">
      <h1>お見積り</h1>
      <table>
        <tr>
          <th>number</th>
          <th>サービスタイプ</th>
          <th>名称</th>
          <th>料金</th>
          <th>消費税</th>
          <th>備考</th>
        </tr>
        <tr v-for="item_list in item_lists" :key="item_list.id">
          <td>{{item_list.number}}</td>
          <td>{{item_list.type}}</td>
          <td>{{item_list.name}}</td>
          <td>{{item_list.price}}</td>
          <td>{{item_list.tax}}</td>
          <td>{{item_list.other}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
// @ is an alias to /src

export default {
  name: 'Home',
  setup(){
    // pushで代入する変数
    let model_name = ref()
    let type = ref()
    let product = ref()
    let price = ref()
    let tax = ref()
    let other = ref()
    let item_lists = ref([])

    // リスト変数
    let type_list = ref([
      {type:"repair", label:"修理"},
      {type:"accessory", label:"アクセサリー" },
      {type:"other", label:"その他サービス"},
    ])

    let product_list = ref([
      {product:"front", label:"画面交換"},
      {product:"battery", label:"バッテリー交換"},
      {product:"backPanel", label:"バックパネル交換"},
      {product:"chargePort", label:"充電コネクター交換"},
    ])

    let service_list = ref([
    ])

    let accessory_list = ref([
    ])

    const push=()=>{
      type.value = document.getElementById('product_type');
      product.value = document.getElementById('product_name');
      tax.value = Number(price.value)/10
      other.value = document.getElementById("product_other").value;
      item_lists.value.push({type:type.value, name:product.value, price:price.value, tax:tax.value});
      console.log(item_lists.value)
      type.value=""
      product.value=""

    }

    return{
      model_name,
      type,
      product,
      price,
      tax,
      other,
      item_lists,

      type_list,
      product_list,
      service_list,
      accessory_list,
      push,
    }
  }
}
</script>
