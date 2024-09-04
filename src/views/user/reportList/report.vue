<template>
  <div class="report-container margin-bottom">
    <GoBack :goBackText="goBackText" />
    <header>
      <p v-if="reportList.length > 0">지난측정과 오늘의 측정결과를 볼 수 있습니다.</p>
      <p v-else>측정된 데이터가 없습니다</p>
    </header>
    <div class="report-list">
      <div class="report-item" v-for="(report, index) in reportList" :key="index" :class="{ 'new-report': report.new }">
        <RouterLink :to="`/user/report/${report.id}`">
          <div class="report-label">
            측정하신 리포트가 도착하였습니다
            <span v-if="report.new" class="new-label"></span>
          </div>
          <small class="report-date">측정일 : {{ report.date }}</small>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue"

export default {
  name: 'report',
  components: {
    GoBack,
  },
  data() {
    return {
      reportList: [
        {
          id: 1,
          date: '2024-07-01',
          new: true,
        },
        {
          id: 2,
          date: '2024-07-02',
          new: false,
        },
        {
          id: 3,
          date: '2024-07-03',
          new: false,
        },
        {
          id: 4,
          date: '2024-07-04',
          new: false,
        },
      ],
      goBackText: "리포트",
    };
  },
};
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
}

.report-container header {
  width: 100%;
  /* margin-bottom: 20px; */
}

.report-container h1 {
  color: var(--main-color);
  font-weight: var(--font-b-weight);
  margin: 0 0 20px;
}

.report-container p {
  font-size: var(--font-n-sec-size);
}

.report-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
}

.report-item.new-report {
  border: 2px solid var(--main-color);
  color: var(--main-color);
}

.report-item {
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius);
  height: 92px;
  font-weight: var(--font-b-weight)
}

.report-item a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 30px;
}

.report-date {
  font-weight: var(--font-t-weight);
  color: var(--light-font-color);
  vertical-align: sub;
}

.report-label {
  font-size: var(--font-n-sec-size);
}

.new-label {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #FF0000;
  border-radius: 50%;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 0;
}

footer a {
  text-align: center;
  color: var(--main-color);
  text-decoration: none;
}

footer a.active {
  font-weight: bold;
}

footer img {
  width: 24px;
  height: 24px;
}

.logo-box {
  width: 150px;
  margin: 0 auto;
}

.logo {
  margin-bottom: 15px;
}
</style>