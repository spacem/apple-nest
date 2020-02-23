<template>
  <div>
      <h1>Select Character</h1>
      <div v-for="character in characters" :key="character.name">
        name: {{ character.name }}
      </div>
      <router-link to="/">Log Out</router-link> | 
      <router-link to="/create-character">Create Character</router-link> |
      <router-link to="/town">Select</router-link>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('characters', ['characters'])
  },
}
</script>
