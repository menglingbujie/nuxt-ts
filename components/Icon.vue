<template>
  <svg class="icon svg-icon" style="vertical-align:middle;" aria-hidden="true" :width="width" :height="height">
    <use v-bind:xlink:href="'#'+icon" :fill="color"></use>
  </svg>
</template>

<script>
export default {
  props:{
    icon:{
      type:String,
      required:true,
    },
    width:{
      type:Number,
      required:true,
    },
    height:{
      type:Number,
      required:true,
    },
    color:{
      type:String,
      default:"currentColor"
    }
  }
}
</script>