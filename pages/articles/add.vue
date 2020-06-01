<template>
  <div>
    <h1>Add New Article</h1>
    <hr>

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-form
          action=""
          method="post"
          @submit.prevent="submitForm()"
        >
          <v-text-field
            v-model="title"
            label="Title"
            :class="{ 'is-invalid': errors && errors.title }"
          />
          <div v-if="errors && errors.title" class="invalid-feedback">
            {{ errors.title.msg }}
          </div>

          <v-text-field
            v-model="author"
            label="Author"
            :class="{ 'is-invalid': errors && errors.author }"
          />
          <div v-if="errors && errors.author" class="invalid-feedback">
            {{ errors.author.msg }}
          </div>

          <v-textarea
            v-model="body"
            name="input-7-4"
            :class="{ 'is-invalid': errors && errors.body }"
          />
          <div v-if="errors && errors.body" class="invalid-feedback">
            {{ errors.body.msg }}
          </div>

          <v-btn
            color="success"
            @click.native="submitForm"
          >
            Submit
          </v-btn>
          <v-btn to="/articles" class="ma-2">
            Cancel
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      errors: null,
      title: null,
      author: null,
      body: null
    }
  },
  methods: {
    submitForm () {
      this.$axios.post('/api/articles', {
        title: this.title,
        author: this.author,
        body: this.body
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
          if (response.data._id) {
            this.$router.push({ name: 'articles', params: { created: 'yes' } })
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
