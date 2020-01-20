<template>
  <header>
    <Nav-Bar/>
    <lang-selector/>
    <Country-Selector/>
  </header>
</template>
<script lang="ts">
import NavBar from "~/components/NavBar.vue";
import LangSelector from "@/components/LangSelector.vue";
import CountrySelector from "@/components/CountrySelector.vue";
import {Vue,Component } from "nuxt-property-decorator"
@Component({
  components:{NavBar,LangSelector,CountrySelector}
})
export default class HeaderDF extends Vue{}
</script>