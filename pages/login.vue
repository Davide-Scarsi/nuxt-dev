<template>
  <div class="login-container">
    <Icon class="icon" name="flat-color-icons:google" style="color: black" />
    <h2>LOGIN WITH GOOGLE</h2>
    <button @click="signInWithOAuth">Sign in with Google</button>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'empty'
})

const client = useSupabaseClient()

const signInWithOAuth = async () => {
  try {
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/'
      }
    });

    const { data: { user } } = await client.auth.getUser()

    console.log("user ",user);

    if(error)
    console.error('Error during login', error.message);
    
    
  }catch (e){
    console.log(e.message);
    
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.login-container>*{
  margin: 1rem;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}

.icon{
  height: 100px;
  width: 100px;
}

</style>
