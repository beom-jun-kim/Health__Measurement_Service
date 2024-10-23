<template>
  <div class="report-container margin-bottom">
    <GoBack :goBackText="goBackText" />
    <header>
      <p v-if="!reportList || !reportList.content || reportList.content.length === 0">측정된 데이터가 없습니다</p>
      <p v-else>지난측정과 오늘의 측정결과를 볼 수 있습니다.</p>
    </header>
    <div class="report-list">
      <div class="report-item" v-for="(report, index) in reportList.content" :key="index"
        :class="{ 'new-report': report.check === false }">
        <RouterLink :to="`/user/report/${report.baseSid}`">
          <div class="report-label">
            측정하신 리포트가 도착하였습니다
            <span v-if="report.check === false" class="new-label"></span>
          </div>
          <small class="report-date">측정일 : {{ report.createDate }}</small>
        </RouterLink>
      </div>
      <ul class="page">
        <li class="border mx-1 text-center li" v-for="page in reportList.totalPages" :key="page"
          :class="{ active: indexPage === page }">
          <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page
            }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserDataService from "@/api/UserDataService";
import GoBack from "@/components/GoBack.vue"

export default {
  name: 'ReportView',
  components: {
    GoBack,
  },
  data() {
    return {
      reportList: [],
      goBackText: "리포트",
      reportPage: 0,
      size: 4,
      indexPage: 1,
      userSid: "",
    };
  },
  methods: {
    async getReportList(id) {
      try {
        const response = await UserDataService.userReportList(id, this.reportPage, this.size)
        this.reportList = response.data;
      } catch (e) {
        console.log("리포트 리스트 조회 실패", e);
      }
    },
    async indexPageLoadAllUser(page) {
      this.indexPage = page;
      this.reportPage = page - 1;
      await this.getReportList(this.$route.params.id);
    },
  },
  async mounted() {
    await this.getReportList(this.$route.params.id);
  }
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.page li {
  list-style: none;
  width: 20px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: var(--input-font-size);
}

.page li.active {
  color: #fff;
  background: var(--main-color);
}

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