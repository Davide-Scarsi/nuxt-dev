<script setup>

const client = useSupabaseClient()
const router = useRouter()

const signOutWithOAuth = async () => {
    const { error } = await client.auth.signOut()
    router.push('/login')
}
const { data: { user } } = await client.auth.getUser()

if(!user){
    router.push('/login')
}
console.log("user ",user);





</script>

<template>
    <nav>
        <ul>
            <li><NuxtLink to="/">HOME</NuxtLink></li>
            <li><NuxtLink to="/page2">PAGE 2</NuxtLink></li>
        </ul>
        <div class="all-centered">
            <span class="user-name">BENVENUTO {{ user.user_metadata.full_name.toUpperCase() }}</span>
            <img class="user-img" :src="user.user_metadata.picture" alt="/">
            <button class="logout" @click="signOutWithOAuth">LOGOUT</button>
        </div>
    </nav>

</template>

<style scoped>

    nav{
        background-color: var(--clr-vue);
        display: flex;
        justify-content: space-between;
        align-items: center;

        ul{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: 7px;

        }
    
        li{
            list-style-type: none;
            color: white;
            padding: 1ch;
        }
        li a{
            color: white !important;
            all: initial;
            
            &:hover{
                color: blue;
                cursor: pointer;
            }
        }
    }
    .icon{
        background-color: rgb(255, 255, 255);
        padding: 2.5rem;
        margin: 1rem;
    }

    .user-name{
        padding-inline: 3ch;
        color: white;
    }

    .user-img{
        max-height: 60px;
        border-radius: 50%;
        margin: 1ex;
    }

    .logout{
        padding: .2rem ;
        margin-inline: 1ch;
    }



</style>
