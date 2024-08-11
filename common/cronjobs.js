const cron = require('node-cron');

const emailList = [
  'user1@example.com', 'user2@example.com', 'user3@example.com',
  'user4@example.com', 'user5@example.com', 'user6@example.com',
  'user7@example.com', 'user8@example.com', 'user9@example.com',
  'user10@example.com'
];

const sendEmail = (email) => {
  console.log(`Sending email to ${email}`);
  // Simulate email sending delay
  return new Promise((resolve) => setTimeout(resolve, 100));
};

const processEmails = async (emailList, processedEmails) => {
  for (const email of emailList) {
    if (!processedEmails.has(email)) {
      await sendEmail(email);
      processedEmails.add(email);
    }
  }
};

const task = cron.schedule('* * * * *', async () => {
  console.log('Running job');
  const processedEmails = new Set();
  await processEmails(emailList, processedEmails);
});


const startCronJobs = () => {
  task.start();
  console.log('Cron jobs started');
};

module.exports = { startCronJobs };

/*

// cron-jobs.js
const cron = require('node-cron');
const { acquireLock, releaseLock } = require('./cronjob_lock');

// Schedule a task to run every 2 minutes
const task = cron.schedule('*2 * * * *', async () => {
  if (!acquireLock()) {
    console.log('Task already running. Skipping this execution.');
    return;
  }

  try {
    console.log('Running the task...');
    
    // Simulate a long-running task
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds

    console.log('Task completed.');
  } catch (error) {
    console.error('Error during task execution:', error);
  } finally {
    releaseLock();
  }
});

const startCronJobs = () => {
  task.start();
  console.log('Cron jobs started');
};

module.exports = { startCronJobs };
*/