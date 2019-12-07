<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{title}}
      </h1>
      <h2 class="subtitle">
        {{subtitle}}
      </h2>
    </div>
  </div>
</template>
<script lang="ts">

import {Vue,Component,Prop} from "vue-property-decorator";

interface User{
  title:string,
  subtitle:string
}

@Component
export default class HomePage extends Vue{
  title:string="HomePage";
  subtitle:string="My mind-blowing Nuxt.js project";

  created():void{
    console.log(this.getTitle());
  }

  getTitle():string{
    return this.title+"==>"+this.subtitle;
  }
}
</script>

<style>
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
