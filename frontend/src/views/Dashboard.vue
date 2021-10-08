<template>
  <Sidebar/>
  <div class="content">
  <form method="post" onsubmit="mySubmitFunction(event)">
    <table>
      <tr>
        <td>Nombre:</td>
        <td><input type="text" placeholder="nombre" name="name" required></td>
      </tr>
      <tr>
        <td>
          <input type="submit">
        </td>
      </tr>
    </table>
  </form>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar'

export default {
  components: { Sidebar },
  setup () {

  }
}
</script>
