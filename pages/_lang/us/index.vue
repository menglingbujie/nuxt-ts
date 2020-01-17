<template>
  <div class="container">
    <div>
      <h1 class="title">{{$t("header.trade_us")}}</h1>
      <Nav-Bar></Nav-Bar>
      <lang-selector></lang-selector>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component } from "nuxt-property-decorator"
import LangSelector from "@/components/LangSelector.vue";
import NavBar from "@/components/NavBar.vue";
@Component({
  components:{LangSelector,NavBar}
})
export default class HomePage extends Vue{
  $env:any;
  created(){
    // console.log("===created==",this.$env.PORT);
  }
}
</script>

<style lang="less" scoped>
ul,li{list-style:none;}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
