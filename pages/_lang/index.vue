<template>
<div class="page home">
  <button @click.stop="gotoAbout">About</button>
  <h1>{{$t("home.title")}}</h1>
  <div id="eaglesmarket"></div>
</div>
</template>

<script lang="ts">
import {Vue,Component} from "nuxt-property-decorator";
@Component
export default class Home extends Vue{
  gotoAbout(){
    const win:any=window
    if(!win.eaglesmarket){
      return console.log("===eaglemarket sdk init failed==");
    }
    console.log("=page==",win.eaglesmarket.load)
    win.eaglesmarket.load&&win.eaglesmarket.load("http://localhost:3000/about");
  }
}
</script>
<style scoped>
.page.home{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
#eaglesmarket{
  width:100%;
}
</style>
