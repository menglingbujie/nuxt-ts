<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{title}}
      </h1>
      <h2 class="subtitle">
        {{subtitle}}
      </h2>
      <ul class="list">
        <li v-for="item in list" :key="item.id">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
        </li>
      </ul>
      <button @click.stop="fetchList(1)">上一页</button>
      <button @click.stop="fetchList(2)">下一页</button>
    </div>
  </div>
</template>
<script lang="ts">

import {Vue,Component,Prop,Inject,Provide} from "nuxt-property-decorator";

interface User{
  title:string,
  subtitle:string
}

@Component
export default class HomePage extends Vue{
  // @Inject() title!:string;
  // @Inject() subtitle!:string;

  list:any=[];
  title:string="5分钟上手TypeScript";
  subtitle:string="让我们使用TypeScript来创建一个简单的Web应用。";

  async asyncData(context:any){
    // if(process.server){
    //   return {
    //     list:[]
    //   }
    // }
    const resp = await context.$axios.get("http://127.0.0.1:3001/api/list?page=1");
    const respData = resp&& resp.data||[];
    return {
      list:respData.data
    }
  }

  created():void{
    // if(process.server){return;}
    // console.log(process.server,"==created=="+this.getTitle());
    // this.fetchList(1);
  }

  getTitle():string{
    return this.title+"==>"+this.subtitle;
  }

  async fetchList( page:number ) {
    let resp = await this.$axios.get("http://127.0.0.1:3001/api/list?page="+page);
    let respData = resp&&resp.data;
    this.list = respData.data || [];
  }
}
</script>

<style>
ul,li{list-style:none;}
.list{text-align: left;}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
