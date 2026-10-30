import nodemailer from 'nodemailer';
const configured=()=>Boolean(process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS);
export async function sendEmail({to,subject,html,text}){if(!configured()){if(process.env.NODE_ENV==='production')throw new Error('Email provider is not configured');console.info('[DEV EMAIL]',{to,subject,text:text||html?.replace(/<[^>]+>/g,'')});return {messageId:'dev-'+Date.now(),dev:true};}
const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT)===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
return transport.sendMail({from:process.env.SMTP_FROM||process.env.SMTP_USER,to,subject,text,html});}
export function appUrl(path){return (process.env.APP_URL||'http://localhost:5173').replace(/\/$/,'')+path;}
export const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
