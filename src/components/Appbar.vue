<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1>oter Information System</h1>
      </div>

      <v-spacer></v-spacer>

      <router-link v-if="loggedIn" to="/voters">
        <v-btn text>
          <span class="mr-2">Voters</span>
        </v-btn>
      </router-link>

      <router-link v-if="!loggedIn" to="/">
        <v-btn text>
          <span class="mr-2">LOGIN</span>
        </v-btn>
      </router-link>

      <router-link v-if="!loggedIn" to="/register">
        <v-btn text>
          <span class="mr-2">REGISTER</span>
        </v-btn>
      </router-link>

      <router-link v-if="loggedIn" to="/logout">
        <v-btn text>
          <span class="mr-2">LOGOUT</span>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn;
      }
    }
  }
</script>
