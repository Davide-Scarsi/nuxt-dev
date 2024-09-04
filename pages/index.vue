<script setup>
const colleghi = ref([])

const client = useSupabaseClient()

const { data: { user } } = await client.auth.getUser()

onMounted(()=>{
  insertGoogleAccount(user)
})


const insertGoogleAccount = async (user) => {
  console.log("parte");
  
  const { data, error } = await client.from('Utenti').select('*')
  colleghi.value = data
  

  if(colleghi.value.some(collega => collega.idGoogle === user.id)) return;

  console.log("entra");
  

  await client.from('Utenti').insert([{ idGoogle: user.id, nome: user.user_metadata.full_name }])

  if (error) {
    console.error("Errore durante l'inserimento:", error);
  } else {
    console.log("Dati inseriti correttamente:", data);
  }

}
</script>

<template>
  Home
</template>

<style scoped></style>