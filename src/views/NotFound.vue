<template>
    <div class="error-container">
        <h1>404 - Page Not Found</h1>
        <p>해당 페이지를 찾을 수 없습니다</p>
        <router-link to="/home">
            <button>
                홈으로 이동
            </button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.error-container {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
}

button {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-n-size);
    color: #fff;
    background-color: var(--main-color);
}


p {
    margin: 10px 0;
}
</style>