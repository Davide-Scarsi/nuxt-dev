// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/global.css'
  ],
  modules: [
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_SECRET_KEY,
    },
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
},
supabase: {
  // redirect: false,
  redirectOptions:{login:'/login',callback:'/'}
},
  
})