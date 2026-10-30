export async function api(path,{method='GET',body,headers={},...options}={}){
 const form=body instanceof FormData;const response=await fetch('/api'+path,{credentials:'include',method,headers:form?headers:{'Content-Type':'application/json',...headers},body:body===undefined?undefined:form?body:JSON.stringify(body),...options});
 if(response.status===204)return null;const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||`Request failed (${response.status})`);return data;
}
export const inr=(paise=0)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format((paise||0)/100);
export const when=x=>x?new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date(x)):'Not scheduled';
export const shortDate=x=>x?new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeZone:'Asia/Kolkata'}).format(new Date(x)):'—';
export const localDateTime=x=>x?new Date(x).toISOString().slice(0,16):'';
export const slugEvent=k=>({HALDI:'🌼',MEHENDI:'🌿',SANGEET:'🎵',WEDDING:'💍',RECEPTION:'✨',ENGAGEMENT:'💎',ROKA:'🌸'})[String(k).toUpperCase()]||'✦';
