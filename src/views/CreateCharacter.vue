<template>
  <div>
    <h1>Create Character</h1>
    <div>
      <input placeholder="Character Name" />
      <button @click="doCreate('test')">Create Character</button>
    </div>
    <router-link to="/select-character">Cancel</router-link>
  </div>
</template>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import router from '../router';

export default {
  methods: {
    ...mapActions('characters', ['create']),
    doCreate(name) {
      this.create(name);
      router.push('/select-character');
    }
  },
}
</script>
