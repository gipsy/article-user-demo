<template>
  <div>
    <h1>Users list</h1>
    <hr>
    <div v-for="user of users">
      {{user.full_name}}
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData (context) {
    const { data } = await context.$axios.get('/api/usersList')
    return {
      users: data,
    }
  },
}
</script>
