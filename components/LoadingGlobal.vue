<template lang="html">
  <div class="loading" v-if="loading">
    <div class="loading_con">
      <div class="loader"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../assets/less/common/color.less";
.loading {
  position:fixed;top:0;left:0;
  width:100%;height:100%;
  background-color:@color_white;
  z-index:999;font-size: 14px;color:#2c5cf4;
  >.loading_con{
    position: absolute;top:50%;left:50%;
    transform: translate(-50%,-50%);width:100%;
    height: 4em; text-align: center;
    >.loader {
      margin: 0 auto;
      width: 1em;
      height: 1em;
      color: inherit;
      vertical-align: middle;
      pointer-events: none;
      box-shadow: 0 1em 0 0 currentcolor;
      position: relative;
      -webkit-animation: loader 0.4s ease-in-out alternate infinite;
      animation: loader 0.4s ease-in-out alternate infinite;
      -webkit-animation-delay: 0.28s;
      animation-delay: 0.28s;
      top: -1em;
      opacity: .5;
      &:after,
      &:before {
        content: '';
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        box-shadow: inherit;
        -webkit-animation: inherit;
        animation: inherit;
      }
      &:before {
        left: -1.8em;
        -webkit-animation-delay: 0.42s;
        animation-delay: 0.42s;
      }
      &:after {
        right: -1.8em;
        -webkit-animation-delay: 0.14s;
        animation-delay: 0.14s;
      }
    }
  }
}

@-webkit-keyframes loader {
  0% {
      box-shadow: 0 2em 0 0 currentcolor;
  }
  100% {
      box-shadow: 0 1em 0 0 currentcolor;
  }
}
@keyframes loader {
  0% {
      box-shadow: 0 2em 0 0 currentcolor;
  }
  100% {
      box-shadow: 0 1em 0 0 currentcolor;
  }
}
</style>

<script>
export default {
  data:()=>({
    loading:false
  }),
  created(){
    this.start()
  },
  mounted(){
    this.finish()
  },
  methods:{
    start(){
      this.loading=true;
    },
    finish(){
      this.loading=false;
    }
  }
}
</script>
