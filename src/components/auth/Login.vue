<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="5"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-spacer />
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>

          <v-card-text>
            <v-form
              @submit.prevent="login"
              @keydown="resetValidation"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="email"
                type="email"
                :rules="usernameRules"
                required
                v-model="form.username"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                :counter="8"
                :rules="passwordRules"
                required
                v-model="form.password"
              />

              <v-card-actions>
                <v-spacer />
                <v-btn color="error" class="mr-1" @click="reset">Reset Form</v-btn>

                <v-btn color="warning" class="mr-1" @click="resetValidation">Reset Validation</v-btn>

                <v-btn
                  type="submit"
                  color="primary"
                  :disabled="!valid || form.errors.any()"
                  @click="validate"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Form from 'vform'

  export default {
    name: 'Login',

    data() {
      return {
        valid: true,

        form: new Form({
          username: '',
          password: ''
        }),

        usernameRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        passwordRules: [
          v => !!v || "Password is required",
          v =>
            (v && v.length >= 8) ||
            "Password must be grater than or equal 8 characters"
        ]
      }
    },

    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
        }
      },

      reset() {
        this.$refs.form.reset();
      },

      resetValidation() {
        this.$refs.form.resetValidation();
        this.form.errors.clear();
      },

      login() {
        this.$store
        .dispatch('retrieveToken', this.form)
        .then(response => {
          this.$router.push({name:'voters'});
          console.log(response.statusText);
        });
      }
    }
  }
</script>
