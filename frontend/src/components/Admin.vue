<template>
  <div class="form-container">
    <form @submit.prevent="addAdmin" enctype="multipart/form-data">
      <h1>Admin</h1>

      <div class="form-group">
        <label>Admin ID</label>
        <input type="text" v-model="adminID" required />
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
        <label>Department</label>
        <input type="text" v-model="department" required />
      </div>

      <div class="form-group">
        <label>Upload File</label>
        <input type="file" @change="handleFile" />
      </div>

      <button type="submit" class="submit-btn">Add Admin</button>
    </form>

    <div class="list-section">
      <h2>Current Admin List</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(admin, i) in admins" :key="i">
            <td>{{ admin.adminID }}</td>
            <td>{{ admin.firstName }}</td>
            <td>{{ admin.lastName }}</td>
            <td>{{ admin.department }}</td>
            <td>
              <span v-if="admin.uploadedFile">***</span>
              <span v-else>—</span>
            </td>
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
      adminID: '',
      firstName: '',
      lastName: '',
      department: '',
      file: null,
      admins: []
    };
  },
  methods: {
    handleFile(e) {
      this.file = e.target.files[0];
    },
    async loadAdmins() {
      const res = await fetch('http://localhost:5000/api/admin');
      this.admins = await res.json();
    },
    async addAdmin() {
      const formData = new FormData();
      formData.append('adminID', this.adminID);
      formData.append('firstName', this.firstName);
      formData.append('lastName', this.lastName);
      formData.append('department', this.department);
      if (this.file) formData.append('file', this.file);

      const res = await fetch('http://localhost:5000/api/admin', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const newAdmin = await res.json();
        this.admins.push(newAdmin);
        this.adminID = this.firstName = this.lastName = this.department = '';
        this.file = null;
      } else {
        console.error('Error adding admin');
      }
    }
  },
  mounted() {
    this.loadAdmins();
  }
};
</script>


<style src="../assets/styles.css"></style>
