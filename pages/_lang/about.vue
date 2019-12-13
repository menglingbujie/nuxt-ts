<template>
  <div class="container">
    <div>
      <Nav-bar></Nav-bar>
      <h1 class="title">{{$t("header.about")}}</h1>
      <lang-selector></lang-selector>
      <Copyright copyright="Copyright 2019"></Copyright>
      Watch:<input type="number" v-model="num">
      <p>{{num}}*3={{sum}}</p>
      Computed:<input type="text" v-model="User.lastName">
      <p>{{fullName}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Model,Watch, mixins} from "nuxt-property-decorator";
import Copyright from "@/components/Copyright.vue";
import LangSelector from "@/components/LangSelector.vue";
import NavBar from "@/components/NavBar.vue";
import uinfo from "~/mixins/uinfo";
import version from "~/mixins/version";

interface User{
  firstName:string,
  lastName:string
}
@Component({
  components:{Copyright,LangSelector,NavBar},
})
export default class AboutPage extends mixins(uinfo,version){
  private num:number=1;
  private sum:number=1;

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
    this.getVersion();
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
