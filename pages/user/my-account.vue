<template>
  <div>
    <h1>My Account</h1>

    <hr>

    <v-card
      class="mx-auto"
      max-width="434"
      tile
    >
      <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-row
          align="end"
          class="fill-height"
        >
          <v-col class="py-0">
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              dark
            >
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ this.$auth.user.full_name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ this.$auth.user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
