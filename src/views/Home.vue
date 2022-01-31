<template>
  <div class="app">
    <div class="preview">
      <div class="title">
        <h1>お見積り</h1>
      </div>
      <div class="header">
        <h3 class="edi_shop_name">
          <select v-model="shop">
            <option value="">店舗を選択</option>
            <option>スマホステーション吉祥寺店</option>
            <option>スマホステーション三軒茶屋店</option>
          </select>
        </h3>
        <h3 class="pre_shop_name">{{shop}}</h3>
      </div>
      <h2 class="pre_model_name" :style="{display:edit_mode_basic}" style="text-transform:uppercase">機種名：<input v-model="model_name" :key="model_names">{{model_name}}</h2>

      
      <h2 class="graph_title">修理<input type="checkbox" checked id="repair_form" @click="repair_form_display"></h2>
        <div class="repair_edit_form" :style="{display:edit_mode}">
          <div class="repair_type_form">
            <h3>修理項目</h3>
            <select v-model="type" :style="{display:select_input_type}">
              <option value="">パーツを選択</option>
              <option>液晶画面（一体型）</option>
              <option>液晶画面（ガラスのみ）</option>
              <option>液晶画面（液晶のみ）</option>
              <option>バッテリー</option>
              <option>バックパネル</option>
              <option>充電コネクタ</option>
              <option>電源ボタン</option>
              <option>音量ボタン</option>
              <option>指紋センサー</option>
            </select>
            <input v-model="type" :style="{display:self_input_type}">
            <button class="self_input_type" :style="{display:select_input_type}" @click="input_type_change_repair">入力欄の表示</button>
            <button class="select_input_type" :style="{display:self_input_type}" @click="input_type_change_repair">選択欄の表示</button>
          </div>
          <div class="repair_price_form">
            <h3>料金(税抜):<input v-model="price">円</h3>
            <h4>消費税：{{price*0.1}}円</h4>
          </div>
          <div class="repair_other_form">
            <div class="other_select_form">
              注意点>>
              <input type="checkbox" value="/分解時に破損のリスクあり" id="other1" v-model="o_contents"><label>破損</label>
              <input type="checkbox" value="/分解時に塗装ハゲのリスクあり" id="other2" v-model="o_contents"><label>塗装ハゲ</label>
              <input type="checkbox" value="/水没のため修理保証なし" id="other3" v-model="o_contents"><label>水没</label>
            </div>
            <textarea id="other_input" cols="30" rows="5" v-model="other"></textarea>
            <div class="other_button_space">
              <button class="other_button" @click="make_other()">更新</button>
            </div>
          </div>
          <div class="add_button_space">
            <button class="repair_add_button" @click="push_repair">項目を追加</button>
          </div>
         </div>


      <table class="preview_table" border="1">
        <tr>
          <th class="th_No">No.</th>
          <th class="th_name">部位</th>
          <th class="th_price">料金</th>
          <th class="th_tax">消費税</th>
          <th class="th_other">備考</th>
        </tr>
        <tr v-for="item_list in repair_item_lists" :key="item_list.id">
          <td>{{item_list.number}}</td>
          <td>{{item_list.type}}</td>
          <td>{{item_list.price}}円</td>
          <td>{{item_list.tax}}円</td>
          <td class="pre_other">{{item_list.other}}</td>
          <button @click="delete_list(index)" :style="{display:edit_mode}">削除</button>
        </tr>
      </table>
      <h4 class="total_product">点数：{{repair_item_lists.length}}</h4>
      <h4 class="total_price">総額：{{total_amount}}円</h4>
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
    let price = ref(0)
    let tax = ref()
    let other = ref("")
    let repair_item_lists = ref([])

    let product_type = ref()
    let product_name = ref()

    let shop = ref()
    let total_amount = ref(0)

    let edit_style = ref("block")
    let preview_style = ref("none")

    let edit_mode = ref("block")

    let select_input_type = ref("block")
    let self_input_type = ref("none")

    // 備考欄
    let o_contents = ref([]) 

    let other_select = ref([
      {Value:"Test1",ID:"test1"}
    ])

    let Other1 = document.getElementById("other1")

    // リスト変数
    // let type_option =
    // ["修理","アクセサリー","その他サービス"]

    const sum_price=(item_lists)=>{
      total_amount.value = 0;
      for(let i=0; i<item_lists.value.length; i++){
        total_amount.value = Number(total_amount.value)+Number(item_lists.value[i].price)+Number(item_lists.value[i].tax)
      }
    }

    const push_repair=(item_lists)=>{
      number.value = count.value;
      tax.value = Math.round(Number(price.value)/10)
      repair_item_lists.value.push({number:number.value, type:type.value, price:price.value, tax:tax.value, other:other.value});
      console.log(item_lists.value)
      type.value=""
      other.value=""
      count.value++
      sum_price(repair_item_lists);
      reset_number(repair_item_lists)
      console.log(repair_item_lists.value[0].price)
    }

    const create=()=>{
      sum_price();
    }

    const delete_list=(id)=>{
      console.log("id:",id);
      repair_item_lists.value.splice(id, 1)
      console.log(repair_item_lists.value)
      sum_price(repair_item_lists);
      reset_number(repair_item_lists);
      console.log("総額：",total_amount.value)
      console.log(repair_item_lists.value)
    }

    const reset_number=(item_lists)=>{
      delete item_lists.value.number;
      for(let i = 0; i < item_lists.value.length; i++){
        item_lists.value[i].number = i+1;
      }
    }

    const change_display_parts=()=>{

    }

    const make_other=()=>{
      console.log("push");
      for(let i = 0; o_contents.value.length>i; i++){
        other.value = other.value + o_contents.value[i] + "\n " ;
      }
    }

    const repair_form_display=()=>{
      if(edit_mode.value == "block"){
        edit_mode.value = "none";
      }else{
        edit_mode.value = "block";
      }
    }

    const input_type_change_repair=()=>{
      if(self_input_type.value == "block"){
        type.value = "";
        self_input_type.value = "none";
        select_input_type.value = "block";
      }else{
        type.value = "";
        self_input_type.value = "block";
        select_input_type.value = "none";        
      }
    }

    return{
      shop,

      model_name,
      number,
      type,
      price,
      tax,
      other,
      repair_item_lists,

      o_contents,

      product_type,
      product_name,

      total_amount,

      edit_style,
      preview_style,

      edit_mode,
      select_input_type,
      self_input_type,

      Other1,
      other_select,

      delete_list,
      reset_number,

      sum_price,
      push_repair,
      create,

      change_display_parts,
      repair_form_display,
      input_type_change_repair,

      make_other,
    }
  }
}
</script>

<style>
.edit{
  border:solid 2px;
  border-radius:10px;
  width:60%;
  background-color:white;
  position:fixed;
  display:"block";
}

.edit_contents{
  padding:20px;
  display:inline;
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

.repair_edit_form{
  border:solid 5px;
  border-radius:10px;
  margin-bottom:10px;
}

/* 修理編集項目 */
.repair_type_form{
  text-align:center;
  padding-left:10px;
  display:inline-block;
}

.repair_price_form{
  padding-left:40px;
  display:inline-block;
}

.repair_other_form{
  padding-left:40px;
  display:inline-block;
}

.other_button{
  height:30px;
}

.add_button_space{
  padding-left:10px;
  display:inline-block;
}

.repair_add_button{
  font-size:20px;
  border:solid 3px;
  border-radius:10px;
}

.preview_table{
  text-align:center;
  margin:auto;
  border-collapse: collapse;
  width:80%;
}

tr{
  text-align:center;
}

.th_No{
  width:30px;
}

.th_type{
  width:140px;
}

.th_name{
  width:200px;
}

.th_price{
  width:140px;
}

.th_tax{
  width:100px;
}

.th_other{
  width:300px;
}

.edit_main{
  display:inline-block;
}

.edit_sub{
  display:inline-block;
}

.individual_title{
  padding-top:15px;
}
  
</style>