<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" />
            </div>
            <div>
                <button :disabled="loading">Login</button>
                <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>
    </div>
</template>

<script>
import fetchAPI from '../helper'

export default {
  data () {
    return {
      password: '',
      submitted: false,
      loading: false,
      goto: '',
      error: ''
    }
  },
  created () {
    localStorage.removeItem('password')
    this.goto = this.$route.query.goto || '/'
  },
  methods: {
    async handleSubmit (e) {
      console.log(e)
      this.submitted = true
      const { password } = this
      localStorage.setItem('password', window.btoa(password))
      // stop here if form is invalid
      if (!password) return

      this.loading = true
      const response = await fetchAPI('POST', 'auth', {password} )
      console.log(response)
      if (response.message !== 'Understandable have a nice day') {
        this.loading = false
        this.error = response.message
      } else {
        localStorage.setItem('password', window.btoa(password))
        this.$router.push(this.goto)
      }
    }
  }
}
</script>
