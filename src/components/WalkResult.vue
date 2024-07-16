<template>
    <div class="container">
      <div class="table-title">
        <h1>보행결과</h1>
      </div>
      <table border>
        <thead>
          <tr>
            <th></th>
            <th>왼쪽 발</th>
            <th>오른쪽 발</th>
            <th>표준 범위</th>
            <th>측정 점수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>보행길이</td>
            <td>45</td>
            <td>44</td>
            <td>70~72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>보행시간</td>
            <td>45</td>
            <td>44</td> 
            <td>70~72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>보행속도</td>
            <td>45</td>
            <td>44</td>
            <td>70~72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>보행각도</td>
            <td>45</td>
            <td>44</td>
            <td>70~72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>보행균형</td>
            <td>45</td>
            <td>44</td>
            <td>70~72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>보행면적</td>
            <td>45</td>
            <td>44</td>
            <td>70~72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>보간</td>
            <td>45</td>
            <td>44</td>
            <td>70~72</td>
            <td>21</td>
          </tr>
        </tbody>
      </table>
      <div class="graph">
        <div class="graph-wrap" v-for="(graph , index) in graphList" :Key=index>
            <div class="graph-title">
                <span>{{ graph.disease }}</span>
            </div>
            <div class="graph-box">
                <div class="content" :style="{ width: graph.percent }"></div>
            </div>
        </div>
      </div>
      <div class="gen-opi">
        <div class="total-title">
          <h2>종합의견</h2>
        </div>
        <div class="total-text">
          <p>
            {{user.username}} 님은
            </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'reportDetail',
    data(){
      return {
        graphList : [
          {
            disease:"정상보행",
            percent:"60%",
          },
          {
            disease:"뇌졸중",
            percent:"50%",
          },
          {
            disease:"파킨슨",
            percent:"60%",
          },
          {
            disease:"퇴행성",
            percent:"80%",
          },
          {
            disease:"관절염",
            percent:"100%",
          },
          {
            disease:"치매",
            percent:"92%",
          },
        ]
      }
    }
  };
  </script>
  
  <style scoped>
  .table-title {
    margin-bottom: 20px;
  }
  .graph {
    width: 100%;
    margin-top: 30px;
  }

  .graph-title {
    white-space: nowrap;
  }

  .graph-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  .graph-box {
    width: 80%;
    height: 10px;
    background: var(--input-border-color);
    border-radius: 10px;
  }

  .graph-box .content {
    width: 80%;
    background: var(--main-color);
    height: 100%;
    border-radius: 10px;
  }
  </style>
  