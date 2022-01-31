<template>
  <div class="app">
    <div class="app_contents">

    <!-- <div class="preview" :style="{display:preview_style}"> -->
    <!-- <button class="edit_close_button" @click="edit_close">+</button> -->
    <input type="button" value="このページを印刷する" onclick="window.print();" :style="{display:preview_style}" />
    <button @click="show_preview" :style="{display:edit_style}">印刷・保存準備</button>
    <h1 class="quontity_title" @click="edit_close">引き継ぎ書</h1>
    <div class="basic">
      <h3 class="preview_day" :style="{display:preview_style}">日付：{{today}}</h3>
      <h3 class="edit_day" :style="{display:edit_style}">日付：<input type="date" v-model="today"></h3>

      <h3 class="preview_creater" :style="{display:preview_style}">作成者：{{creater_name}}</h3>
      <h3 class="edit_creater" :style="{display:edit_style}">作成者：<input type="text" v-model="creater_name"></h3>
    </div>

    <!-- 修理引き継ぎ -->
    <div class="repair_contents">
      <h2>■修理</h2>
      <h3 :style="{display:no_repair}">特になし</h3>
      <button @click="add_repair_table" :style="{display:repair_add_button}">追加</button>

      <!-- 編集 -->
      <table class="edit_repair_table" :style="{display:repair_table_edit}">
        <tr>
          <th>状況</th>
          <th>修理ID</th>
          <th>内容</th>
        </tr>
        <tr>
          <td>
            <select v-model="Repair_selected">
              <option disabled value="">状況を選択</option>
              <option>未処理</option>
              <option>受入済</option>
              <option>作業中</option>
            </select>
          </td>
          <td><input type="text" v-model="Repair_id"></td>
          <td><textarea v-model="Repair_content"></textarea></td>
          <button @click="push_repair">＋</button>
        </tr>
        <tr v-for="pre_repair_content in repair_contents" :key="pre_repair_content.id">
          <td>{{pre_repair_content.state}}</td>
          <td>{{pre_repair_content.r_id}}</td>
          <td>{{pre_repair_content.contents}}</td>
          <td><button @click="remove_contents(pre_repair_content)">削除</button></td>
        </tr>
      </table>

      <!-- プレビュー -->
      <table class="preview_repair_table" border="2" style="border-collapse: collapse"  :style="{display:repair_table_style}">
        <tr>
          <th></th>
          <th>状況</th>
          <th>修理ID</th>
          <th>内容</th>
        </tr>
        <tr v-for="repair_content in repair_contents" :key="repair_content.id">
          <td>□</td>
          <td>{{repair_content.state}}</td>
          <td>{{repair_content.r_id}}</td>
          <td>{{repair_content.contents}}</td>
        </tr>
      </table>
    </div>

<!-- 連絡引き継ぎ -->
    <div class="contact_contents">
      <h2>■連絡</h2>
      <h3>特になし</h3>
      <table border="2" style="border-collapse: collapse" :style="{display:contact_table_style}">
        <tr>
          <th></th>
          <th>状況</th>
          <th>氏名</th>
          <th>連絡先</th>
          <th>内容</th>
        </tr>
        <tr v-for="contact_content in contact_contents" :key="contact_content.id">
          <td>□</td>
          <td>{{contact_content.state}}</td>
          <td>{{contact_content.name}}</td>
          <td>{{contact_content.contact}}</td>
          <td>{{contact_content.contents}}</td>
        </tr>
      </table>
    </div>

<!-- 入荷・調査 -->
    <div class="search_contents">
      <h2>■入荷・調査</h2>
      <h3>特になし</h3>
        <table border="2" style="border-collapse: collapse" :style="{display:search_table_style}">
          <tr>
            <th></th>
            <th>状況</th>
            <th>氏名</th>
            <th>連絡先</th>
            <th>内容</th>
          </tr>
          <tr v-for="search_content in search_contents" :key="search_content.id">
            <td>□</td>
            <td>{{search_content.state}}</td>
            <td>{{search_content.name}}</td>
            <td>{{search_content.contact}}</td>
            <td>{{search_content.contents}}</td>
          </tr>
        </table>
      </div>


    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup(){
    let today = ref()
    let creater_name = ref()


// 各種表示状況
    let edit_style = ref("block")
    let preview_style = ref("none")

    let repair_table_style = ref("none")
    let contact_table_style = ref("none")
    let search_table_style = ref("none")

    let no_repair = ref()
    let no_contact = ref()
    let no_search = ref()

    let Repair_selected = ref()
    let Repair_id = ref()
    let Repair_content = ref()

    let repair_add_button = ref("block")

    let repair_table_edit = ref("none")
    let repair_table_preview = ref("none")

    let repair_contents = ref([
        {state:"作業中", r_id:"SSC00110700", contents:"修理途中なので作業続行でお願いします"},
    ])

    let contact_contents = ref()
    let search_contents = ref()

// 調査概要・状況が入る
    let search_info = ref()
    
    let model_name = ref()
    let parts_name = ref()
    let price_name = ref()
    let site_URL1 = ref()

    const show_preview=()=>{
      edit_style.value = "none";
      preview_style.value = "block";
      repair_add_button.value = "none";
      if(no_repair.value == "block"){
        repair_table_style.value = "none";
      }else{
        no_repair.value = "none";
        repair_table_style.value = "block";
      }
    }

    const add_repair_table=()=>{
      no_repair.value = "none";
      repair_add_button.value = "none";
      repair_table_edit.value = "block";
    }

    const push_repair=()=>{
      repair_contents.value.push({state:Repair_selected.value, r_id:Repair_id.value, contents:Repair_content.value});
    }

    const remove_contents=(list_name)=>{
      list_name.value = 0;
    }

    return{
      today,
      creater_name,

      edit_style,
      preview_style,

      repair_table_style,
      repair_table_edit,
      repair_table_preview,

      no_repair,
      no_contact,
      no_search,

      Repair_selected,
      Repair_id,
      Repair_content,

      repair_add_button,

      contact_table_style,

      search_table_style,

      repair_contents,
      contact_contents,
      search_contents,

      search_info,

      model_name,
      parts_name,
      price_name,
      site_URL1,

      show_preview,
      add_repair_table,
      push_repair,
      remove_contents

    }
  }
}
</script>

<style>
.days{
  width:30px;
  font-size:20px;
}

.app_contents{
  margin-left:20px;
  margin-right:20px;
}

.quontity_title{
  text-align:center;
}
</style>