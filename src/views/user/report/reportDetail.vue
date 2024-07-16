<template>
  <div class="container">
    <div class="tab-menu">
      <button :class="{ 'active-tab': currentComponent === 'WalkResult' }" @click="updateState('WalkResult')">보행결과</button>
      <button :class="{ 'active-tab': currentComponent === 'WalkArea' }" @click="updateState('WalkArea')">보행면적</button>
    </div>

    <div class="content-box">
      <component :is=currentComponent />
    </div>
  </div>
</template>

<script>
import WalkResult from "@/components/WalkResult.vue";
import WalkArea from "@/components/WalkArea.vue";

export default {
  name: 'reportDetail',
  components: {
    WalkResult,
    WalkArea
  },
  data() {
    return {
      currentComponent: "WalkResult",
    }
  },
  methods: {
    updateState(componentName) {
      this.currentComponent = componentName;
    }
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}

.tab-menu button {
  padding: 10px 8.421052631578947vw;
  color: #aaa;
  border: none;
  background: none;
  cursor: pointer;
  font-size: var(--font-n-size);
  border-bottom: 2px solid var(--input-border-color);
  word-break: keep-all;
}

.tab-menu .active-tab {
  color: #000;
  font-weight: var(--font-b-weight);
  border-bottom: 6px solid var(--main-color);
}

.component-box {
    padding: 20px;
    word-break: keep-all;
    height: 400px;
}
</style>
