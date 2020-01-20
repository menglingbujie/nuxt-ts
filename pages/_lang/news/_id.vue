<template>
  <h1>Hello New Detail {{detailID}}</h1>
</template>
<script lang="ts">
import {Vue,Component} from "nuxt-property-decorator";
@Component
export default class NewsDetail extends Vue{
  get detailID(){
    return this.$route.params.id;
  }
}
</script>
<style lang="less" scoped>
</style>