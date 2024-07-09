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
                <div class="report-label">리포트</div>
                <div class="report-new" v-if="report.new">
                    <div class="triangle"></div>
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
                { date: '2024-06-30', new: true },
                { date: '2024-06-15', new: false },
                { date: '2024-06-13', new: false },
                { date: '2024-06-05', new: false },
                { date: '2024-05-10', new: false },
                { date: '2024-04-23', new: false }
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
}

.report-item {
    position: relative;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    background-color: #f9f9f9;
}

.report-date {
    font-size: var(--font-n-size);
    margin-bottom: 10px;
}

.report-label {
    font-size: var(--font-n-sec-size);
}

.report-new {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    height: 0;
    border-left: 40px solid var(--main-color);
    border-bottom: 40px solid transparent;
}

.report-new .triangle {
    position: absolute;
    top: 4px;
    left: -36px;
    width: 16px;
    height: 16px;
    background: url("../../../public/img/app_icon_new.png") no-repeat center/cover;
}
</style>