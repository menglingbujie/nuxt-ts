<template>
  <div class="lang_selector">
    <nuxt-link 
      v-for="locale in locales" 
      :key="locale.code"
      class="lang"
      :class="{'current':checkCurrent(locale.code)}"
      :to="switchLocalePath(locale.code)"
      ><span @click.stop="handlerSwichLang(locale.code)">{{locale.name}}</span></nuxt-link>
  </div>
</template>
<style lang='less' scoped>
@import (reference) "../assets/less/common/color.less";
.lang_selector {
  >.lang {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    opacity: .8;
    line-height: 22px;
    padding-bottom: 2px;
    &.current{
      color:darkgoldenrod;
    }
  }
}
</style>
<script lang="ts">
import {Vue, Component, Watch} from "nuxt-property-decorator";
import Cookie from "js-cookie";
@Component
export default class LangSelector extends Vue{
  get lang(){
    return this.$i18n.locale;
  }
  get locales(){
    return this.$i18n.locales;
  }
  checkCurrent(lang:string){
    return this.lang===lang?true:false;
  }
  handlerSwichLang(code:string){
    Cookie.set("mylang",code);
  }
}
</script>
