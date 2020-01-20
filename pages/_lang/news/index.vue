<template>
  <div class="container">
    <div>
      <h1 class="title">{{$t("header.news")}}</h1>
      Watch:<input type="number" v-model="num">
      <p>{{num}}*3={{sum}}</p>
      Computed:<input type="text" v-model="User.lastName">
      <p>{{fullName}}</p>
      <ul class="list">
        <li class="item"
        v-for="n in newsList"
        :key="'news'+n.id">
        <nuxt-link :to="'/news/'+n.id">{{n.title}}</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Model,Watch, mixins} from "nuxt-property-decorator";
import uinfo from "~/mixins/uinfo";
import version from "~/mixins/version";

interface User{
  firstName:string,
  lastName:string
}
interface NEWS{
  id:number,
  title:string,
  desp:string,
  created_at:number,
}
@Component
export default class PageNews extends mixins(uinfo,version){
  private num:number=1;
  private sum:number=1;
  private newsList:Array<NEWS>=[
    {
      id:1001,
      title:"吉利缤越活动互点集中贴",
      desp:"为了保持版面整洁，大家可以把链接放在这个集中贴里，也方便其他吧友助力点亮",
      created_at:1579491456,
    },
    {
      id:1002,
      title:"这个翻牌成就太难了吧？现在需要4个人都正确才算一把",
      desp:"这个翻牌成就太难了吧？现在需要4个人都正确才算一把，我还差150把……我都哭了，想偷懒去淘宝买成就，到现在都没人接单，有没一起做翻牌任务的小伙伴啊？",
      created_at:1579491856,
    }
  ];

  private User = {
    firstName:"Marylin",
    lastName: "Meng"
  }as User;

  @Watch("num")
  getSum(){
    this.sum=this.num*3;
  }

  get fullName(){
    return this.User.firstName+" "+this.User.lastName;
  }
  created(){
    this.fetchUserInfo();
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
