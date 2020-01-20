<template>
  <div class="container">
    <div>
      <h1 class="title">{{$t("header.trade_us")}}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component } from "nuxt-property-decorator"
@Component({
  layout:"layout_us"
})
export default class HomePageUS extends Vue{
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
