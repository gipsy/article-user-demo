<template>
  <div>
    <h1>Update Article</h1>
    <hr>

    <v-row>
      <v-col>
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
            solo
            name="input-7-4"
            label="Body"
            :class="{ 'is-invalid': errors && errors.body }"
          />

          <div v-if="errors && errors.body" class="invalid-feedback">
            {{ errors.body.msg }}
          </div>

          <v-btn
            color="success"
            class="ma-2"
            @click.native="submitForm"
          >
            Submit
          </v-btn>
          <v-btn
            nuxt
            :to="'/articles/' + $route.params.id"
            class="ma-2"
          >
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
  async asyncData (context) {
    const { data } = await context.$axios.get('/api/articles/' + context.route.params.id)
    return {
      article: data
    }
  },
  data () {
    return {
      errors: null,
      title: null,
      author: null,
      body: null
    }
  },
  mounted () {
    this.fillFormData()
  },
  methods: {
    fillFormData () {
      this.title = this.article.title
      this.author = this.article.author
      this.body = this.article.body
    },
    submitForm () {
      this.$axios.put('/api/articles/' + this.$route.params.id, {
        title: this.title,
        author: this.author,
        body: this.body
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
          if (response.data._id) {
            this.$router.push({ name: 'articles-id', params: { updated: 'yes', id: this.$route.params.id } })
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
