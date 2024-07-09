<template>
    <div class="report-container">
      <header>
        <img src="../../../public/img/app_logo_01.png" alt="G-CON Logo" class="logo">
        <h1>REPORT</h1>
        <p>지난측정과 오늘의 측정결과를 볼 수 있습니다.</p>
      </header>
      <div class="report-list">
        <div class="report-item" v-for="(report, index) in reports" :key="index">
          <div class="report-date">{{ report.date }}</div>
          <div class="report-label">
            측정한 리포트
            <span v-if="report.new" class="new-label">new</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReportView',
    data() {
      return {
        reports: [
          { date: '2024-07-01', new: true },
          { date: '2024-06-15', new: false },
          { date: '2024-06-13', new: false },
          { date: '2024-06-10', new: false },
          { date: '2024-05-10', new: false }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .report-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 50px 20px;
  }
  
  .report-container header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .logo {
    width: 150px;
  }
  
  .report-container h1 {
    color: var(--main-color);
    font-weight: var(--font-b-weight);
    margin: 10px 0 20px;
  }
  
  .report-container p {
    font-size: var(--font-n-sec-size);
  }
  
  .report-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .report-item {
    position: relative;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid var(--input-border-color);
    border-radius: 10px;
    text-align: center;
  }
  
  .report-item:first-child {
    border: 3px solid var(--main-color);
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
  