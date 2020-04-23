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
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer />
          </v-toolbar>

          <v-card-text>
            <v-form
              @submit.prevent="register"
              @keydown="resetValidation"
              ref="form"
              v-model="valid"
              lazy-validation
            >

              <v-text-field
                label="Name"
                name="name"
                prepend-icon="person"
                type="text"
                :counter="5"
                :rules="nameRules"
                required
                v-model="form.name"
              />

              <v-text-field
                label="Email"
                name="email"
                prepend-icon="email"
                type="email"
                :rules="emailRules"
                required
                v-model="form.email"
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

              <v-text-field
                id="password"
                label="Confirm Password"
                name="confirm_password"
                prepend-icon="lock"
                type="password"
                :rules="confirmPasswordRules"
                required
                v-model="form.password_confirmation"
              />

              <v-card-actions>
                <v-spacer />
                <v-btn color="error" class="mr-1" @click="reset">Reset Form</v-btn>

                <v-btn color="warning" class="mr-1" @click="resetValidation">Reset Validation</v-btn>

                <v-btn
                  :disabled="!valid || form.errors.any()"
                  type="submit"
                  color="primary"
                  @click="validate"
                >
                  Register
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
    name: 'Register',

    data() {
      return {
        valid: true,

        form: new Form({
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }),

        nameRules: [
          v => !!v || "Name is required",
          v =>
            (v && v.length >= 5) ||
            "Name must be grater than or equal 5 characters"
        ],

        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        passwordRules: [
          v => !!v || "Password is required",
          v =>
            (v && v.length >= 8) ||
            "Password must be grater than or equal 8 characters"
        ],

        confirmPasswordRules: [
          v => !!v || "Password is required",
        ],
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

      register() {
        this.$store
          .dispatch('register', this.form)
          .then(response => {
            this.$router.push({name:'login'});
            console.log(response.statusText);
          });
      },
    }
  }
</script>
