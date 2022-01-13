<template>
  <div class="app">
    <div class="edit">
      <button class="edit_close_button">×</button>
      <div class="edit_contents">
        <h2>追加 >></h2>
        <h3>店舗：
          <select v-model="shop">
            <option v-for="shops in shop_list" :key="shops.id">{{shops.label}}</option>
          </select>
        </h3>
        <h3>機種名：<input v-model="model_name"></h3>
        <div class="type_form">
          <h3>種別：
            <select v-model="product_type">
              <option v-for="type in type_list" :key="type.id">{{type.label}}</option>
            </select>
          </h3>
        </div>

        <div class="product_form">
          <h3>名称：
            <select v-model="product_name">
              <option v-for="products in product_list" :key="products.id">{{products.label}}</option>
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
          <textarea v-model="other" name="product_other" id="product_other" cols="30" rows="10"></textarea>
        </div>

        <button @click="push">追加</button>
        <button @click="create">見積書作成</button>
      </div>
    </div>


    <div class="preview">
      <div class="title">
        <h1>お見積り</h1>
      </div>
      <div class="header">
        <h3 class="shop_name">{{shop}}</h3>
      </div>
      <h2>機種名：{{model_name}}</h2>
      <table>
        <tr>
          <th>No.</th>
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
      <h4>点数：{{count-1}}</h4>
      <h4>総額：{{total_amount}}円</h4>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
// import vSelect from 'vue-select'
// @ is an alias to /src

export default {
  name: 'Home',
  setup(){
    let count = ref(1)
    // pushで代入する変数
    let model_name = ref()
    let number = ref()
    let type = ref()
    let product = ref()
    let price = ref()
    let tax = ref()
    let other = ref()
    let item_lists = ref([])

    let product_type = ref()
    let product_name = ref()

    let shop = ref()
    let total_amount = ref(0)

    // リスト変数
    // let type_option =
    // ["修理","アクセサリー","その他サービス"]

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

    let shop_list = ref([
      {shop:"sma_kichi", label:"スマホステーション吉祥寺店"},
      {shop:"sma_sancha", label:"スマホステーション三軒茶屋店"},
    ])

    let service_list = ref([
    ])

    let accessory_list = ref([
    ])

    const sum_price=()=>{
      for(let i=0; i<item_lists.value.length; i++){
        total_amount.value = Number(total_amount.value)+Number(item_lists.value[i].price)+Number(item_lists.value[i].tax)
      }
    }

    const push=()=>{
      console.log(product_name.value)
      number.value = count.value
      type.value = product_type.value
      product.value = product_name.value
      tax.value = Number(price.value)/10
      item_lists.value.push({number:number.value, type:type.value, name:product.value, price:price.value, tax:tax.value, other:other.value});
      console.log(item_lists.value)
      type.value=""
      product.value=""
      count.value++;
      console.log(item_lists.value[0].price)
    }

    const create=()=>{
      sum_price();
    }

    return{
      count,
      shop,

      model_name,
      number,
      type,
      product,
      price,
      tax,
      other,
      item_lists,

      product_type,
      product_name,

      type_list,
      product_list,
      shop_list,
      service_list,
      accessory_list,

      total_amount,

      sum_price,
      push,
      create,
    }
  }
}
</script>

<style>
.edit{
  border:solid 2px;
  border-radius:10px;
  width:60%;
  margin:auto;
}

.edit_contents{
  padding:20px;
}

.title{
  text-align:center;
}

.header{
  text-align:right;
}

.edit_close_button{
  margin-left:10px;
  margin-top:10px;
}
  
</style>