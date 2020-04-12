<template>
  <div>
    <h1>Article Details</h1>

    <hr>

    <div
      v-if="$route.params.updated=='yes'"
      class="alert alert-success"
    >
      Record updated successfully
    </div>

    <h2>{{ article.title }}</h2>

    <h6>By {{ article.author }}</h6>

    <p>{{ article.body }}</p>

    <hr>
    <v-container>
      <v-row>
        <v-btn
          nuxt
          :to="'/articles/' + article._id + '/update'"
          color="primary"
          class="ma-2"
        >
          Update
        </v-btn>

        <v-btn
          color="error"
          class="ma-2"
          @click="deleteRecord()"
        >
          Delete
        </v-btn>

        <v-btn
          nuxt
          to="/articles"
          color="purple"
          class="ma-2"
        >
          Back to Articles
        </v-btn>
      </v-row>
    </v-container>
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
  methods: {
    deleteRecord () {
      if (confirm('Are you sure?') === true) {
        this.$axios.delete('/api/articles/' + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$router.push({ name: 'articles', params: { deleted: 'yes' } })
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error)
          })
      }
    }
  }
}
</script>
