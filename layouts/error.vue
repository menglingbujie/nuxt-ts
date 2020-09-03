<template>
<div class="page error">
  <div class="container">
    <div class="wrap">
      <img src="@/assets/images/error/not-found.svg" alt="页面找不到" class="image" v-if="error.statusCode === 404">
      <img src="@/assets/images/error/error.svg" alt="页面错误" class="image" v-else>
      <div class="back">
        <template v-if="error.statusCode === 404">
          <p class="title">{{$t("common.ymzbdl")}}</p>
          <p class="desp">{{$t("common.kytgyxfsfw")}}</p>
        </template>
        <template v-else>
          <p class="title" >{{$t("common.ymcw")}}</p>
          <p class="desp">{{"["+error.statusCode+"]"+error.message}}</p>
        </template>
        <div class="btns">
          <a href="/">
            <My-Icon icon="icon-back" :width="16" :height="16"></My-Icon>
            <span>{{$t("common.hdsy")}}</span>
          </a>
          <a href="javascript: history.back()">
            <My-Icon icon="icon-arrow-left" :width="16" :height="16"></My-Icon>
            <span>{{$t("common.fhsyy")}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {Vue,Component,Prop } from "nuxt-property-decorator";
import MyIcon from "@/components/Icon.vue";
@Component({
  components:{MyIcon}
})
export default class Error extends Vue{
  @Prop({type:Object}) readonly error!:any
}
</script>
<style lang="less" scoped>
@import (reference) "../assets/less/common/color.less";
.page.error{
  min-height:600px;
  >.container{
    padding-top:120px;
    color: @color_slate;
    >.wrap {
      min-height: 300px;
      line-height: 300px;
      >.image, >.back {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
      }
      >.image { margin: 0 88px 0 191px; width: 400px;height: 300px; }
      >.back {
        >.title { font-size: 24px; }
        >.desp { margin-top: 2px; font-size: 14px; color: @color_cloudy_blue; }
        >.btns {
          margin-top: 18px;
          >a {
            margin-right: 12px;color: @color_butter_scotch;font-size: 0;
            >span {margin-left: 5px;font-size: 14px;}
            >.icon, >span { display: inline-block; vertical-align: middle; }
          }
        }
      }
    }
  }
}
</style>