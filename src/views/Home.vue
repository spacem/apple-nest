<template>
  <div class="home">
    <h1>
    <HelloWorld msg="Apple Nest"/>
    </h1>
    <router-link to="/login">Login</router-link> |
    <router-link to="/create-account">Create Account</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
