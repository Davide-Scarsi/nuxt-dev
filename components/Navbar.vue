<script setup>

const client = useSupabaseClient()
const router = useRouter()

const signOutWithOAuth = async () => {
    const { error } = await client.auth.signOut()
    router.push('/login')
}

const { data: { user } } = await client.auth.getUser()
if(!user){router.push('/login')}
console.log("user ",user);

</script>

<template>
    <nav>
        <details open>
            <div class="nav-items">
                <ul class="navigation-box">
                    <li><NuxtLink to="/">HOME</NuxtLink></li>
                    <li><NuxtLink to="/users">UTENTI</NuxtLink></li>
                </ul>
                <div class="all-centered user-box">
                    <span class="user-name">BENVENUTO {{ user.user_metadata.full_name.toUpperCase() }}</span>
                    <img class="user-img" :src="user.user_metadata.picture" alt="">
                    <button class="btn-logout" @click="signOutWithOAuth">LOGOUT</button>
                </div>
            </div>
            <summary>
                <Icon class="icon-hamburger" name="solar:hamburger-menu-broken" style="color: black" />
            </summary>
        </details>
        
    </nav>

</template>

<style scoped>

    nav{
        background-color: var(--clr-vue);

        details{
            .nav-items{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            summary {
                list-style: none; /* Rimuove il marker predefinito */
                display: none;
    
                .icon-hamburger{
                    place-self: center;
                    font-size: 2rem;
                    background-color: rgb(255, 255, 255);
                    margin: .5rem;    
                }
            }

        }

        ul.navigation-box{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: 7px;

            
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
        
        .user-box{
            
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
                width: clamp(10%,70px,100%) ;
                object-fit: cover;
                border-radius: 50%;
                margin: 1ex;
                padding: .2rem;
            }
            .btn-logout{
                padding: .2rem;
                margin-inline: 1.5ch;
                border-radius: 3px;
                background-color: color-mix(in lab, var(--clr-vue), #FFF 60%);
                min-width: 100px; /* Imposta una larghezza minima */
                min-height: 30px; /* Imposta una larghezza minima */
                
                &:hover{
                    background-color: var(--clr-dark-vue); 
                    color: white;
                    font-weight: 600;
                    border: 1px solid white;
                }
                
            }
        } 
    }

    /* ---------- RESPONSIVE ---------- */
    nav{
        @container body (inline-size < 900px) {  


            details{
                .nav-items{
                    display: flex;
                    flex-direction: column-reverse;

                    .user-box{
                        display: flex;
                        flex-direction: column;
                        border-bottom: 1px solid var(--clr-dark-vue) ;
                        margin-bottom: 1ex;
        
                        img.user-img{
                            order: -1
                        }
        
                        .user-name{
                            padding-block: 1ex;
                            text-wrap: balance;
                            text-align: center;
                        }
                        .btn-logout{
                            margin-block: 1ex 2ex;
                        }
                    }
        
                    ul.navigation-box{
                        display: flex;
                        flex-direction: column;
                    }
                }

                summary{
                    display: grid;
                }
            }

        }
    }


</style>
