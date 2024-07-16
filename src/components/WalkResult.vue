<template>
    <div class="container">
      <h1>보행결과</h1>
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
        <div class="graph-wrap">
            <div class="graph-title">
                <span>정상보행</span>
            </div>
            <div class="graph-box">
                <span class="stick">
                    <span class="content"></span>
                </span>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'reportDetail',
  };
  </script>
  
  <style scoped>
  .stick {
    width: 100%;
    height: 10px;
    background: red;
  }
  </style>
  