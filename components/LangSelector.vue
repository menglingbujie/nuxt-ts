<template>
  <div class="lang_selector">
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('zh-CN')">简体中文</nuxt-link>
    <!-- <label class="lang">{{current.name}}</label>
    <ul trigger="click">
      <li 
        v-for="country in countries" 
        v-bind:key="country.id"
        @click.stop="handleCommand(country.lang)">
        {{country.name}}
      </li>
    </ul> -->
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
  }
}
</style>
<script lang="ts">
import {Vue, Component, Watch} from "nuxt-property-decorator";
@Component
export default class LangSelector extends Vue{

  private lang!:string;
  private locales!:any;

  created(){
    this.initLang();
    console.log(this.lang,"===",this.locales)
  }
  initLang(){
    this.lang = this.$i18n.locale;
    this.locales = this.$i18n.locales;
  }
}
</script>
