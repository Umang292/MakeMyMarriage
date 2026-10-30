import crypto from 'node:crypto';
export const token=()=>crypto.randomBytes(32).toString('base64url');
export const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
export const asId=v=>String(v ?? '');
export const isId=v=>/^[a-f\d]{24}$/i.test(asId(v));
export const cleanEmail=v=>String(v||'').trim().toLowerCase();
export const paise=value=>{const n=Number(value);if(!Number.isFinite(n)||n<0)throw Object.assign(new Error('Invalid amount'),{status:400});return Math.round(n*100)};
export const ytId=url=>{const s=String(url||'').trim();if(/^[\w-]{11}$/.test(s))return s;try{const u=new URL(s);if(u.hostname==='youtu.be')return /^[\w-]{11}$/.test(u.pathname.slice(1))?u.pathname.slice(1):null;if(['www.youtube.com','youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(u.hostname)){const v=u.searchParams.get('v')||u.pathname.split('/').at(-1);return /^[\w-]{11}$/.test(v)?v:null;}}catch{}return null;};
export const fail=(status,message)=>Object.assign(new Error(message),{status});

// Encrypt invitation bearer tokens at rest for approved email reminders and family sharing.
const secretKey=()=>crypto.createHash('sha256').update(process.env.JWT_SECRET+'|invite-link-v1').digest();
export function seal(plain){const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',secretKey(),iv);const data=Buffer.concat([cipher.update(plain,'utf8'),cipher.final()]);return [iv.toString('base64url'),cipher.getAuthTag().toString('base64url'),data.toString('base64url')].join('.');}
export function unseal(value){const [iv,tag,data]=String(value).split('.').map(x=>Buffer.from(x,'base64url'));const decipher=crypto.createDecipheriv('aes-256-gcm',secretKey(),iv);decipher.setAuthTag(tag);return Buffer.concat([decipher.update(data),decipher.final()]).toString('utf8');}
