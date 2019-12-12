<template>
<div>
  <strong>{{copyright}}</strong>
</div>
</template>
<script lang="ts">
import {Vue,Prop,Component} from "nuxt-property-decorator";

@Component
export default class Copyright extends Vue{
  @Prop() version!:string;
  @Prop() copyright!:string;
}
</script>