<template>
  <div>
    <h1>Register</h1>
    <hr>

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
            v-model="full_name"
            :rules="nameRules"
            :counter="10"
            label="Full name"
            required
            :class="{ 'is-invalid': errors && errors.full_name }"
          />
          <div v-if="errors && errors.full_name" class="invalid-feedback">
            {{ errors.full_name.msg }}
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            :class="{ 'is-invalid': errors && errors.email }"
          />
          <div v-if="errors && errors.email" class="invalid-feedback">
            {{ errors.email.msg }}
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="password"
            label="Password"
            :class="{ 'is-invalid': errors && errors.password }"
          />
        </v-col>
      </v-row>

      <v-btn
        color="success"
        form="check-login-form"
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
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      valid: true,
      errors: null,
      full_name: null,
      email: null,
      password: null,
      status: false
    }
  },
  methods: {
    submitForm () {
      this.$axios.post('/api/users/register', {
        full_name: this.full_name,
        email: this.email,
        password: this.password
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
          if (response.data._id) {
            this.$router.push({ name: 'user-login', params: { registered: 'yes' } })
            // log in if successfully registered
            this.$auth.loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
              .catch((error) => {
                // eslint-disable-next-line
                console.log(error)
              })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>
