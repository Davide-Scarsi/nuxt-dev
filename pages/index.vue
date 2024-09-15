<script setup>

const client = useSupabaseClient()

const { data: { user } } = await client.auth.getUser()

onMounted(() => {
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
	<div>
		<Icon class="icon" name="mdi:sim-warning" style="color: black" />
		<p>Pagina in allestimento...</p>
	</div>
</template>

<style scoped>
div{
	display: flex;
	justify-content: center;
	align-items: center;
}

p {
	text-align: center;
	padding: 5ex 1ch;
}

.icon{
	font-size: 3rem;
	background-color: var(--clr-dark-vue);
}
</style>