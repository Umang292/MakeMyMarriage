import mongoose from 'mongoose';

let connectionPromise;

export async function connectToDatabase(){
 if(!process.env.MONGODB_URI)throw new Error('MONGODB_URI is not configured');
 if(mongoose.connection.readyState===1)return;
 if(!connectionPromise){
  connectionPromise=mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000})
   .then(()=>undefined)
   .catch(error=>{connectionPromise=undefined;throw error;});
 }
 await connectionPromise;
}
