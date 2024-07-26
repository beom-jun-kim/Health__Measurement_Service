<template>
  <div class="report-container margin-bottom">
    <header>
      <img src="../../../public/img/app_logo_02.png" alt="G-CON Logo" class="logo">
      <h1>REPORT</h1>
      <p v-if="reportList.length > 0">지난측정과 오늘의 측정결과를 볼 수 있습니다.</p>
      <p v-else>측정된 데이터가 없습니다</p>
    </header>
    <div class="report-list">
      <div class="report-item" v-for="(report, index) in reportList" :key="index" :class="{ 'new-report': report.new }">
        <RouterLink :to="`/user/report/${report.id}`">
          <div class="report-date">{{ report.date }}</div>
          <div class="report-label">
            측정한 리포트
            <span v-if="report.new" class="new-label">new</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'report',
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
    };
  },
};
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
}

.report-container header {
  text-align: center;
  margin-bottom: 20px;
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
}

.report-item.new-report {
  border: 3px solid var(--main-color);
}

.report-item {
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid var(--input-border-color);
  border-radius: 10px;
  text-align: center;
  height: 92px;
}

.report-item a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.report-date {
  font-size: var(--font-n-size);
  margin-bottom: 5px;
}

.report-label {
  font-size: var(--font-n-sec-size);
  display: flex;
  justify-content: center;
  align-items: center;
}

.new-label {
  margin-left: 10px;
  color: red;
  font-size: var(--font-n-sec-size);
  font-weight: bold;
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
</style>