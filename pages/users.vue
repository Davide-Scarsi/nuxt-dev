<script setup>
const client = useSupabaseClient()

const utenti = ref([])
const colonne = ref([])

onMounted(() => {
  getUtenti()
})

async function getUtenti() {
  const { data } = await client.from('Utenti').select('*')
  utenti.value = data
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
        <th> Id </th>
        <th> Nome </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="utente in utenti" :key="utente.id">
        <td>{{ formatDate(utente.created_at) }}</td>
        <td>{{ utente.id }}</td>
        <td>{{ utente.nome }}</td>
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
