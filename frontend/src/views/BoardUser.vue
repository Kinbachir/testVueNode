<template>
  <div>
    <vue-good-table
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
        <button type="button" @click="editRow(props.row.id)" class="btn btn-success">Validation</button>
        <button type="button" class="btn btn-primary" @click="deleteRow(props.row.id)">Génère Token</button>
      </span>
      <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Last Name',
          field: 'age',
        },
        {
          label: 'Email',
          field: 'score',
          type: 'percentage',
        },
        
        {
          label: 'Token',
          field: 'score',
          type: 'percentage',
        },
        
        {
          label: 'Validation Date',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'action',
          field: 'action',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
    };
  },
  methods: {
  onRowClick(params) {
    console.log(params.row)
  }
}
};
</script>