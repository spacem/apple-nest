import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import CreateAccount from "../views/CreateAccount.vue";
import Login from "../views/Login.vue";
import SelectCharacter from "../views/SelectCharacter.vue";
import CreateCharacter from "../views/CreateCharacter.vue";
import Town from "../views/Town.vue";
import Blacksmith from "../views/Blacksmith.vue";
import Appleosouras from "../views/Appleosouras.vue";
import Farm from "../views/Farm.vue";
import Plot from "../views/Plot.vue";
import Farmer from "../views/Farmer.vue";
import EventPlanner from "../views/EventPlanner.vue";
import Storage from "../views/Storage.vue";
import Chef from "../views/Chef.vue";
import City from "../views/City.vue";
import Battle from "../views/Battle.vue";
import Enemy from "../views/Enemy.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: SelectCharacter
  },
  {
    path: "/create-account",
    name: "create-account",
    component: CreateAccount
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/select-character",
    name: "select-character",
    component: SelectCharacter
  },
  {
    path: "/create-character",
    name: "create-character",
    component: CreateCharacter
  },
  {
    path: "/town",
    name: "town",
    component: Town,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/city/blacksmith",
    name: "Blacksmith",
    component: Blacksmith,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/town/appleosouras",
    name: "Appleosouras",
    component: Appleosouras,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/town/event-planner",
    name: "EventPlanner",
    component: EventPlanner,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/city/chef",
    name: "Chef",
    component: Chef,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/town/storage",
    name: "Storage",
    component: Storage,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/farm",
    name: "farm",
    component: Farm,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/city",
    name: "city",
    component: City,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/city/battle",
    name: "battle",
    component: Battle,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/enemy/:enemyRank",
    name: "enemy",
    component: Enemy,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/farm/farmer",
    name: "farmer",
    component: Farmer,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  },
  {
    path: "/farm/plot",
    name: "plot",
    component: Plot,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters["characters/selectedCharacter"]) {
        next("/select-character");
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
