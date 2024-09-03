<script setup>
const client = useSupabaseClient()

const colleghi = ref([])
const colonne = ref([])

async function getColleghi() {
  const { data } = await client.from('Colleghi').select('*')
  colleghi.value = data
  colonne.value = Object.keys(data[0])
}

onMounted(() => {
  getColleghi()
})

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
        <th v-for="(colonna , i) in colonne" :key="`colonna-${i}`">{{ colonna.toUpperCase() }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="collega in colleghi" :key="collega.id">
        <td>{{ collega.id }}</td>
        <td>{{ formatDate(collega.created_at) }}</td>
        <td>{{ collega.nome }}</td>
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
