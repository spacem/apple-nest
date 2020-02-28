<template>
  <div>
      <h1>Blacksmith NPC</h1>
      <div>
        Hello I am the blacksmith.
        I can not craft anything for you yet but if you grow apples I will buy them.
      </div>
      <div>
        {{ message }}
      </div>
      <div>
        <button @click="talk()">Talk</button>
      </div>
      <div>
        <button @click="sellApples()">Sell Apples</button>
      </div>
      <router-link to="/town">Town</router-link>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';

export default {
  data: () => {
    return {
      message: ''
    };
  },
  methods: {
    sellApples() {
      this.message = 'You do not have apples to sell'
    },
    talk(character) {
      if(this.message === 'Do you like apples? I do.') {
        this.message = 'I am done talking - go farm me some apples.'
      } else {
          this.message = 'Do you like apples? I do.'
      }
    }
  },
}
</script>
