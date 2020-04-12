<template>
  <div>
    <h1>Login</h1>
    <hr>

    <div
      v-if="$route.params.registered=='yes'"
      class="alert alert-success"
    >
      You have registered successfully
    </div>

    <v-form
      v-model="valid"
      action=""
      method="post"
      @submit.prevent="submitForm()"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="email"
            label="Full name"
            :class="{ 'is-invalid': errors && errors.email }"
          />
          <div v-if="errors && errors.email" class="invalid-feedback">
            {{ errors.email.msg }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            :class="{ 'is-invalid': errors && errors.password }"
          />
          <div v-if="errors && errors.password" class="invalid-feedback">
            {{ errors.password.msg }}
          </div>

          <div
            v-if="login_error"
            class="alert alert-danger"
          >
            {{ login_error }}
          </div>
        </v-col>
      </v-row>

      <v-btn
        color="success"
        @click.native="submitForm()"
      >
        Login
      </v-btn>
      <v-btn
        color="purple"
        nuxt
        to="/"
      >
        Cancel
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      valid: true,
      errors: null,
      login_error: null,
      email: null,
      password: null,
      status: false
    }
  },
  methods: {
    submitForm () {
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          if (error.response.data.message) {
            this.login_error = error.response.data.message
          }
        })
    }
  }
}
</script>
