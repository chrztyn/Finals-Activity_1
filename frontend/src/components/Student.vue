<template>
  <div class="form-container">
    <form @submit.prevent="addStudent">
      <h1>Student</h1>

      <div class="form-group">
        <label>Student ID</label>
        <input type="text" v-model="studentID" required />
      </div>

      <div class="form-group">
        <label>First Name</label>
        <input type="text" v-model="firstName" required />
      </div>

      <div class="form-group">
        <label>Last Name</label>
        <input type="text" v-model="lastName" required />
      </div>

      <div class="form-group">
        <label>Section</label>
        <input type="text" v-model="section" required />
      </div>

      <button type="submit" class="submit-btn">Add Student</button>
    </form>

    <div class="list-section">
      <h2>Current Student List</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, i) in students" :key="i">
            <td>{{ student.studentID }}</td>
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.section }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      studentID: '',
      firstName: '',
      lastName: '',
      section: '',
      students: []
    };
  },
  methods: {
    async loadStudents() {
      const res = await fetch('http://localhost:5000/api/students');
      this.students = await res.json();
    },
    async addStudent() {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentID: this.studentID,
          firstName: this.firstName,
          lastName: this.lastName,
          section: this.section
        })
      });

      if (res.ok) {
        const newStudent = await res.json();
        this.students.push(newStudent);
        this.studentID = this.firstName = this.lastName = this.section = '';
      } else {
        console.error('Error adding student');
      }
    }
  },
  mounted() {
    this.loadStudents();
  }
};
</script>

<style src="../assets/styles.css"></style>
