<script setup>

const client = useSupabaseClient()
const runtimeConfig = useRuntimeConfig()
const router = useRouter()

definePageMeta({
	layout: 'empty'
})

onMounted(async () => {
	const { data: { user } } = await client.auth.getUser()
	if (!user) { router.push('/login') }
	console.log("user ", user);
});


const signInWithOAuth = async () => {
	try {

		const { error } = await client.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: runtimeConfig.app.cdnURL
			}
		});

		const { data: { user } } = await client.auth.getUser()

		console.log("user ", user);

		if (error)
			console.error('Error during login', error.message);

	} catch (e) {
		console.log(e.message);
	}
}


</script>

<template>
	<div class="login-container">
		<Icon class="icon" name="flat-color-icons:google" style="color: black" />
		<button @click="signInWithOAuth">LOGIN WITH GOOGLE</button>
	</div>
</template>

<style scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.login-container>* {
	margin: 1rem;
}

button {
	padding: 10px 20px;
	font-weight: bold;
	font-size: 1.3rem;
}

.icon {
	height: 100px;
	width: 100px;
}
</style>
