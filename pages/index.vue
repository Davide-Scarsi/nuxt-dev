<script setup>

const client = useSupabaseClient()

const { data: { user } } = await client.auth.getUser()

onMounted(()=>{
  insertGoogleAccount(user)
})

const insertGoogleAccount = async (user) => {

  const { data, error } = await client.from('Utenti').upsert([{ id: user.id, nome: user.user_metadata.full_name }]).select()

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