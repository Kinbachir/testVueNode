<template>
  <div>
    <vue-good-table
      style="margin-top:10%"
      :columns="columns"
      :line-numbers="true"
      @on-row-click="onRowClick"
      :rows="rows"
      :pagination-options="{
        nextLabel: 'Suivant',
        prevLabel: 'Précédent',
        enabled: true,
        mode: 'records',
        perPageDropdownEnabled: false,
        }"
      >
      <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'action'">
        <button type="button" v-if="!props.row.validated" @click="validation(props.row.email)" class="btn btn-success">Validation</button>
        <button type="button" v-if="props.row.validated" class="btn btn-primary" @click="genereToken(props.row.email)">Génère Token</button>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    </vue-good-table>
  </div>
</template>

<script>
import UserService from '../services/user.service';
export default {
  name: 'my-component',
  data(){
    return {
      valide:false,
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Last Name',
          field: 'lastname',
        },
        {
          label: 'Email',
          field: 'email'
        },
        
        {
          label: 'Token',
          field: 'bearer_token'
        },
        
        {
          label: 'Validation Date',
          field: 'validation_date',
        },
        {
          label: 'action',
          field: 'action',
        },
      ],
      rows: [
      ],
    };
  },
  methods: {
  validation(email){
    UserService.validation(email).then(
      response => {
        this.$router.go()
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  genereToken(email){
    UserService.genereToken(email).then(
      response => {
        this.$router.go()
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  onRowClick(params) {
    console.log(params.row)
  },},
  mounted() {
    UserService.getAll().then(
      response => {
        this.rows = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
}
};
</script>