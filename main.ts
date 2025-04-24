import fs from 'fs';
import csv from 'csv-parser';
import Metigan from 'metigan';


interface  IEmail {
    email: string
}

const metigan = new Metigan('your_api_key');
const EMAILS_PER_BATCH = 8;
const DELAY_MS = 1000;
const emailList: IEmail[] = [];

function loadEmailsFromCSV(path: string) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row: { email: IEmail; }) => {
        if (row.email) emailList.push(row.email);
      })
      .on('end', () => resolve(emailList))
      .on('error', reject);
  });
}

async function sendEmail(to: string) {
  try {
    const response = await metigan.sendEmail({
      from: 'onboarding@metigan.com',
      recipients: [to],
      subject: 'Welcome to Our Service',
      content: '<h1>Welcome!</h1><p>Thank you for signing up.</p>',
    });
    console.log(`✅ Email sent to ${to}`);
    return response;
  } catch (error: any) {
    console.error(`❌ Failed to send to ${to}:`, error.message);
  }
}

async function sendInBatches(emails: string | any[]) {
  for (let i = 0; i < emails.length; i += EMAILS_PER_BATCH) {
    const batch = emails.slice(i, i + EMAILS_PER_BATCH) as any[];
    await Promise.all(batch.map(sendEmail));
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }
}

async function run() {
  await loadEmailsFromCSV('emails.csv');
  console.log(`🚀 Sending ${emailList.length} emails in batches of ${EMAILS_PER_BATCH}...`);
  await sendInBatches(emailList);
  console.log('🎉 All emails processed.');
}

run();
