<template>
  <footer>
    <Copyright copyright="Copyright @ 2020 menglingbujie.com" />
  </footer>
</template>
<script lang="ts">
import {Vue,Component } from "nuxt-property-decorator"
import Copyright from "@/components/Copyright.vue";
@Component({
  components:{Copyright}
})
export default class FooterCN extends Vue{}
</script>