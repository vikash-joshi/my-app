const cron=require('node-cron');

const Process=()=>{
console.log('Cron run at every minutes',new Date())
}

const TaskMethod=cron.schedule('*/10 * * * * *',Process);

const StartTask=()=>{
    TaskMethod.start();
}


module.exports={StartTask}