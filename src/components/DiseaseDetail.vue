<template>
    <div class="container">
        <header class="logo-header">
            <div class="arrow" @click="$emit('closeModalBtn')">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></span>
            </div>
            <div class="logo-img-box">
                <img src="../../../../public/img/app_logo_02.png" alt="logo header">
            </div>
            <div></div>
        </header>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";

export default {
  name: 'DiseaseDetail',
  components: {
    GoBack,
  },
}
</script>

<style>
</style>