// https://www.npmjs.com/package/node-schedule
const schedule = require('node-schedule');

/*
* * * * * * 
┬ ┬ ┬ ┬ ┬ ┬ 
│ │ │ │ │ | 
│ │ │ │ │ └ 주중반복시기 (0 - 7) (0 or 7 일요일)
│ │ │ │ └───── 달 (1 - 12)
│ │ │ └────────── 일 (1 - 31)
│ │ └─────────────── 시 (0 - 23)
│ └──────────────────── 분 (0 - 59)
└───────────────────────── 초 (0 - 59, OPTIONAL)
*/
// const scheduler = schedule.scheduleJob('*/5 * * * *', () => {  // 5분 실행
//     console.log(getToday() - ' call scheduler');
// });

const job = schedule.scheduleJob({hour: 9, minute: 45}, () => {
    console.log(getToday() + ' call scheduler');
})

function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const hours = ('0' + today.getHours()).slice(-2); 
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2); 

    return year + '-' + month + '-' + day + ' '
            + hours + ':' + minutes + ':' + seconds;
}

process.on('SIGINT', function () {
    schedule.gracefulShutdown().then(() => {
        console.log(getToday() + ' end.');
        job.cancel();
        process.exit(0);
    })
});

console.log(getToday() + ' start.');