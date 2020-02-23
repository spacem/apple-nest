<template>
  <div>
      <h1>Town</h1>
      <div>
        Using character: {{ selectedCharacter.name }}
      </div>
      <router-link to="/select-character">Switch Character</router-link> | 
      <router-link to="/npc">NPC</router-link> |
      <router-link to="/town">Other Town</router-link>
  </div>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';

export default {
  computed: {
    ...mapGetters('characters', ['selectedCharacter']),
  }
}
</script>
