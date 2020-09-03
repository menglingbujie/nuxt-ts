<template>
  <main class="root" v-cloak>
    <HeaderDF />
    <nuxt />
    <FooterDF/>
  </main>
</template>
<script lang="ts">
import HeaderDF from "@/components/header.vue";
import FooterDF from "@/components/footer.vue";
import {Vue,Component } from "nuxt-property-decorator";
import { normalizePath } from "@/utils/utils";
Vue.mixin({
  methods:{
    normalizePath(path: string) {
      return normalizePath(path,this.$i18n);
    }
  }
})
@Component({
  components:{HeaderDF,FooterDF}
})
export default class DefaultLayout extends Vue {
  head() {
    return this.headMeta;
  }
  get lang(){
    return this.$i18n.locale;
  }
  get headMeta(){
		
    let head:any={
		/*
      script:[
        { src: "https://embed.tawk.to/5e1f8e2a27773e0d832dbfb4/default", async: true,charset:"utf8" }
      ]
			*/
    }
		/*
    if(this.lang==="zh-cn"){
      head.script.push({ src: "https://hm.baidu.com/hm.js?6c1b06cc32e8f7120a57bcde358dbe17", async: true,charset:"utf8" })
    }else{
      head.script.push({ src: "https://www.googletagmanager.com/gtag/js?id=UA-172942917-1", async: true,charset:"utf8" })
      head.script.push({ innerHTML:"window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172942917-1');"})
      head["__dangerouslyDisableSanitizers"]=['script'];
    }
		*/
    return Object.assign({},this.$nuxtI18nSeo(),head)
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
