<script setup>

const props = defineProps({
    error: Object,
    required: true,

});

const handleError = () => clearError({ redirect: '/' });

</script>

<template>
    <div class="error-message">
        <h1>
            Errore {{ error.statusCode }}
        </h1>
    </div>
    <div>
        <button class="error-button" @click="handleError">Go to the home page</button>
    </div>
</template>

<style scoped>
div{
    padding: 10px;
}

.error-message {
    text-align: center;
}
div:has( .error-button){
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>