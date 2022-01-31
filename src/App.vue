<template>
  <div class="main_app">
    <button class="menu_button" @click="push_menu_button">=</button>
    <div id="nav" class="nav" v-bind:style='{display: nav_display}'>
      <div class="nav_contents">
        <h2>メニュー</h2>
        <router-link to="/">見積もり</router-link> |
        <router-link to="/sr">履歴検索</router-link> |
        <router-link to="/sp">修理料金検索</router-link> |
        <router-link to="/price_cur">希少修理計算</router-link> |
        <router-link to="/take_over">引き継ぎ作成</router-link>
      </div>
    </div>
    <div class="contents">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup(){
    let nav_display = ref("block")

    const push_menu_button=()=>{
      if(nav_display.value == "none"){
        nav_display.value = "block"
        console.log(nav_display.value)
      }else{
        nav_display.value = "none"
        console.log(nav_display.value)
      }
    }

    return{
      nav_display,
      push_menu_button,
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

#nav {
  padding: 30px;
  text-align:center;
}

.nav{
  display:none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
