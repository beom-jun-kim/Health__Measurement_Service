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
            previousWidth: window.innerWidth
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
            const currentWidth = window.innerWidth;

            if (window.innerWidth > this.maxWidth) {
                this.$router.push('/largeScreen');
            } else if (currentWidth < this.maxWidth && this.previousWidth >= this.maxWidth) {
                this.smallResizeWindow();
            }
            this.previousWidth = currentWidth;
        },
        smallResizeWindow() {
            if (localStorage.getItem('Authorization') !== null) {
                this.$router.push('/home');
            } else {
                this.$router.push('/login/userLogin');
            }
        }
    }
};
</script>
