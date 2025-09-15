<template>
  <div class="app">

    <div v-if="!selected">
      <h1>Choose your role: </h1>
      <button @click="selected = 'student'">Student</button>
      <button @click="selected = 'admin'">Admin</button>
    </div>

    <div v-else-if="selected === 'student'">
      <Student />
      <button class="back" @click="selected = null"> Go Back</button>
    </div>

    <div v-else-if="selected === 'admin'">
      <Admin />
      <button class="back" @click="selected = null"> Go Back</button>
    </div>
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import Admin from "./components/Admin.vue";

export default {
  name: "App",
  components: { Student, Admin },
  data() {
    return {
      selected: null
    };
  }
};
</script>

<style scoped>
h1{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-style: italic;
}

.app {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 2rem;
}
button {
  margin: 10px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: #37474f;
  color: aliceblue;
}
.back {
  margin-top: 20px;
  display: inline-block;
}
</style>
