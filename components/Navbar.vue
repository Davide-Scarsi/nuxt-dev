<script setup>

const client = useSupabaseClient()
const router = useRouter()

const signOutWithOAuth = async () => {
    const { error } = await client.auth.signOut()
    router.push('/login')
}

const { data: { user } } = await client.auth.getUser()
if (!user) { router.push('/login') }
console.log("user ", user);

</script>

<template>
    <nav>
        <details open>
            <summary>
                <Icon class="icon-hamburger" name="solar:hamburger-menu-broken" style="color: black" />
            </summary>
            <div class="nav-items">
                <ul class="navigation-box">
                    <li>
						<NuxtLink to="/">HOME</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/users">UTENTI</NuxtLink>
                    </li>
                </ul>
                <div class="all-centered user-box">
                    <span class="user-name">BENVENUTO {{ user.user_metadata.full_name.toUpperCase() }}</span>
                    <img class="user-img" :src="user.user_metadata.avatar_url" alt="">
                    <button class="btn-logout" @click="signOutWithOAuth">LOGOUT</button>
                </div>
            </div>
        </details>

    </nav>

</template>

<style scoped>
*{
    user-select: none;
}

nav {
    background-color: var(--clr-vue);

    details {
        .nav-items {
            display: flex;
            justify-content: space-between;
            align-items: center;

            ul.navigation-box {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: 7px;


                li {
                    list-style-type: none;

                    a {
						color: white !important;
                        all: initial;
						width: 100%;
						text-align: center;
						padding: 1.5ex 2ch;
						border-radius: 3px;
						color: white;

						&:hover {
							cursor: pointer;
                        	background-color: var(--clr-dark-vue);
                    	}

						&:active {
							background-color: var(--clr-dark-2-vue);
						}
                    }
                }

            }

            .user-box {

                .icon {
                    background-color: rgb(255, 255, 255);
                    padding: 2.5rem;
                    margin: 1rem;
                }

                .user-name {
                    padding-inline: 3ch;
                    color: white;
                }

                .user-img {
                    width: 70px;
                    border-radius: 50%;
                    margin: 1ex;
                    padding: .2rem;
                }

                .btn-logout {
                    border: none;
                    font-size: .7rem;
                    padding: .3rem 1.1ch;
                    margin-inline: 2ch 4ch;
                    border-radius: 3px;
                    background-color: color-mix(in lab, var(--clr-vue), #FFF 60%);

                    &:hover {
                        background-color: var(--clr-dark-vue);
                        color: white;
                    }

                    &:active {
                        background-color: var(--clr-dark-2-vue);
                        color: white;
                    }

                }
            }
        }

        summary {
            list-style: none;
            /* Rimuove il marker predefinito */
            display: none;

            .icon-hamburger {
                place-self: center;
                font-size: 2rem;
                background-color: rgb(255, 255, 255);
                margin: .5rem;
            }
        }

    }

}

/* ---------- RESPONSIVE ---------- */
nav {
    @media screen and (max-width: 900px) {

        details {

            .nav-items {
                display: flex;
                flex-direction: column;
                margin-inline: auto;
                width: clamp(200px, 60%, 900px);

                .user-box {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid var(--clr-dark-vue);
                    margin-bottom: 1ex;

                    img.user-img {
                        width: clamp(10%, 100px, 100%);
                        order: -1;
                    }

                    .user-name {
                        padding-block: 1ex;
                        text-wrap: balance;
                        text-align: center;
                    }

                    .btn-logout {
                        margin-block: 1ex 2ex;
						margin-inline: 2ch;
                    }
                }

                ul.navigation-box {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    order: 1;

                    li {
                        display: flex;
                        justify-content: center;
                        width: 80%;
                        margin-block: .3ex;
                    }
                }
            }

            summary {
                display: grid;
            }
        }

    }
}
</style>
