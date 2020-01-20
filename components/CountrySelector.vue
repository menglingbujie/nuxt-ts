<template>
  <div class="selector country">
    <button @click.stop="switchCountry('cn')">中国</button>
    <button @click.stop="switchCountry('jp')">日本</button>
    <button @click.stop="switchCountry('us')">美国</button>
  </div>
</template>
<script lang="ts">
import {Vue,Component } from "nuxt-property-decorator"
import Cookie from "js-cookie";
@Component
export default class CountrySelector extends Vue{
  switchCountry(ct:string){
    Cookie.set("ctcode",ct);
    setTimeout(()=>{location.reload();},0);
  }
}
</script>
<style lang="less" scoped>

</style>