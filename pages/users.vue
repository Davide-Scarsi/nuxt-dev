<script setup>
const client = useSupabaseClient()

const colleghi = ref([])
const colonne = ref([])

onMounted(() => {
  getUtenti()
})

async function getUtenti() {
  const { data } = await client.from('Utenti').select('*')
  colleghi.value = data
  console.log("Utenti ",data);
  
  colonne.value = Object.keys(data[0])
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

</script>

<template>
  <table>
    <thead>
      <tr>
        <th> Creato </th>
        <th> Nome </th>
        <th> Id </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="collega in colleghi" :key="collega.id">
        <td>{{ formatDate(collega.created_at) }}</td>
        <td>{{ collega.nome }}</td>
        <td>{{ collega.idGoogle }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  th{
    color: white;

    &:first-child{
      width: 10%;
    }
  }
  td:first-child{
    text-align: center;
  }
</style>
