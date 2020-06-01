<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Articles</h1>
      <v-btn nuxt to="/articles/add" color="sucess" class="ma-2">
        Add New
      </v-btn>
    </div>
    <hr>

    <div
      v-if="$route.params.created=='yes'"
      class="alert alert-success"
    >
      Record added successfully
    </div>
    <div
      v-if="$route.params.deleted=='yes'"
      class="alert alert-success"
    >
      Record deleted successfully
    </div>

    <v-card
      class="mx-auto"
      tile
    >
      <div
        v-if="articles.length"
        class="list-group"
      >
        <v-list-item
          v-for="article in articles.slice((page - 1) * per_page, page * per_page)"
          :key="article._id"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                class="list-group-item list-group-item-action"
                :to="'/articles/' + article._id"
              >
                {{ article.title }}
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-pagination
          v-model="page"
          :length="pagination_total / per_page"
          @input="val => next(val)"
        ></v-pagination>
      </div>

      <div
        v-else
        class="alert alert-info"
      >
        No records found.
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData (context) {
    const { data } = await context.$axios.get('/api/articles')
    return {
      articles: data,
      pagination_total: data.length,
      per_page: 5,
      page: 1,
    }
  },
  methods: {
    next(val) {
      this.page = val
    }
  }
}
</script>
