<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'ResizeHandler',
    data() {
        return {
            maxWidth: 800,
        };
    },
    mounted() {
        window.addEventListener('resize', this.checkWidth);
        this.checkWidth();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkWidth);
    },
    methods: {
        checkWidth() {
            if (window.innerWidth > this.maxWidth) {
                this.$router.push('/largeScreen');
            } else {
                return
            }
        },
    }
};
</script>