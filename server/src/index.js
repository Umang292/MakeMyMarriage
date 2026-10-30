import 'dotenv/config';
import app from './app.js';
import {connectToDatabase} from './database.js';
import {startReminderWorker} from './services/reminders.js';

const PORT=Number(process.env.PORT||4000);
if(!process.env.MONGODB_URI){console.error('MONGODB_URI missing. Copy .env.example to .env');process.exit(1);}
if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32){console.error('Configure a strong JWT_SECRET in .env');process.exit(1);}
await connectToDatabase();
app.listen(PORT,()=>console.log(`Make My Marriage API listening on http://localhost:${PORT}`));
startReminderWorker();
