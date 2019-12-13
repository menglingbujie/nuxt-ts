<template>
<div class="page join">
  <Nav-Bar></Nav-Bar>
  <h1>Join Us</h1>
  <p>{{fullName}}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from "~/components/NavBar.vue";

interface User {
  firstName: string
  lastName: number
}

export default Vue.extend({
  components:{
    NavBar
  },
  data () {
    return {
      message: 'This is a message',
      user:{
        firstName:"Maryin",
        lastName:123
      } as User
    }
  },

  computed: {
    fullName (): string {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  }
})
</script>
<style scoped>
.page.join{
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>
