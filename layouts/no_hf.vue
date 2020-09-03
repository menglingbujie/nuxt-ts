<template>
  <div class="root" v-cloak>
    <nuxt />
  </div>
</template>
<script lang="ts">
import {Vue,Component } from "nuxt-property-decorator";
import { normalizePath } from "@/utils/utils";
Vue.mixin({
  methods:{
    normalizePath(path: string) {
      return normalizePath(path,this.$i18n);
    }
  }
})
@Component
export default class DefaultLayoutNoHeaderFooter extends Vue {
  head() {
    return this.headMeta;
  }
  get lang(){
    return this.$i18n.locale;
  }
  get headMeta(){
    let head:any={
      script:[
        { src: "https://embed.tawk.to/5e1f8e2a27773e0d832dbfb4/default", async: true,charset:"utf8" }
      ]
    }
    if(this.lang==="zh-cn"){
      head.script.push({ src: "https://hm.baidu.com/hm.js?6c1b06cc32e8f7120a57bcde358dbe17", async: true,charset:"utf8" })
    }else{
      head.script.push({ src: "https://www.googletagmanager.com/gtag/js?id=UA-172942917-1", async: true,charset:"utf8" })
      head.script.push({ innerHTML:"window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172942917-1');"})
      head["__dangerouslyDisableSanitizers"]=['script'];
    }
    return Object.assign({},this.$nuxtI18nSeo(),head)
  }
}
</script>
<style lang="less">
@import "../assets/less/common/common.less";
</style>
