<template>
  <div class="container">
    <div>
      <h1 class="title">{{$t("header.trade")}}</h1>
      <Nav-Bar></Nav-Bar>
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
import NavBar from "@/components/NavBar.vue";
interface News{
  id:number,
  title:string,
  img:string,
  article_order:number,
  type:number,
  created_at:string,
  end_time:string,
  author:string,
  remark:string,
  desc:string
}
@Component({
  async asyncData({$axios,store}){
    let resp = await store.dispatch("news/fetchNews",{page:0});
    let respData = resp&&resp.data;
    return {
      list:respData.data || []
    }
  },
  components:{LangSelector,NavBar}
})
export default class HomePage extends Vue{
  list:any=[];
  async fetchList( page:number ) {
    let resp = await this.$store.dispatch("news/fetchNews",{page});
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
