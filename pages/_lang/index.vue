<template>
  <div class="container">
    <div>
      <h1 class="title">{{$t("header.trade")}}</h1>
      <nav>
        <a href="/">{{$t("header.home")}}</a>
        <a href="/about">{{$t("header.about")}}</a>
      </nav>
      <lang-selector></lang-selector>
      <ul class="list">
        <li v-for="item in list" :key="item.id">
          <h3>{{item.title}}</h3>
          <p>{{item.desc}}</p>
        </li>
      </ul>
      <button @click.stop="fetchList(1)">上一页</button>
      <button @click.stop="fetchList(2)">下一页</button>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component,PropSync } from "nuxt-property-decorator"
import LangSelector from "@/components/LangSelector.vue";
@Component({
  computed:{
    lang(){
      return this.$store.state.locale;
    },
    locales(){
      return this.$store.state.locales;
    }
  },
  components:{LangSelector}
})
export default class HomePage extends Vue{

  list:any=[];
  async asyncData(context:any){
    const resp = await context.$axios.get("http://fx-api-dev.ubfxapi.cn/news/list?page=1&limit=12&type=0");
    const respData = resp&& resp.data||[];
    return {
      list:respData.data
    }
  }
  async fetchList( page:number ) {
    let resp = await this.$axios.get("http://fx-api-dev.ubfxapi.cn/news/list?limit=12&type=0&page="+page);
    let respData = resp&&resp.data;
    this.list = respData.data || [];
  }

  created(){
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
  >.list{text-align: left;}
}
</style>
