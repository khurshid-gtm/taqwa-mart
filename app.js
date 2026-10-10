/* ===== কনফিগ: এখানে নিজের GTM ID বসান ===== */
const CFG={GTM:'GTM-WR34H73W'};
window.dataLayer=window.dataLayer||[];
if(CFG.GTM!=='GTM-XXXXXXX'){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer',CFG.GTM)}else console.warn('GTM ID বসানো হয়নি (app.js এর CFG দেখুন)');
const C={polo:'পোলো শার্ট',katua:'কাতুয়া',hoodie:'হুডি শার্ট',lungi:'লুঙ্গি',attar:'আতর কম্বো'};
// [id, name, category, price, old price, colour]
const P=[['SY-501','Premium Polo Shirt (Ash)','polo',550,790,'#9aa0a6'],['SY-502','Premium Polo Shirt (Navy)','polo',550,790,'#1f3a5f'],['SY-503','Premium Polo Shirt (Olive)','polo',550,790,'#6b7a3a'],['SY-504','Premium Polo Shirt (Maroon)','polo',550,790,'#7a1f2b'],
['SY-601','Half Sleeve Katua (Sky Blue)','katua',880,1100,'#6fb3e0'],['SY-602','Half Sleeve Katua (Green)','katua',880,1100,'#2f7d4f'],['SY-603','Half Sleeve Katua (Orange)','katua',880,1100,'#e0883a'],['SY-604','Half Sleeve Katua (Maroon)','katua',880,1100,'#7a1f2b'],
['SY-801','Premium Hoodie Shirt (Olive)','hoodie',980,1260,'#6b7a3a'],['SY-802','Premium Hoodie Shirt (Navy)','hoodie',980,1260,'#1f3a5f'],['SY-803','Premium Hoodie Shirt (Black)','hoodie',980,1260,'#222'],
['SY-304','Premium Lungi SY-304','lungi',1080,1590,'#3b6b8c'],['SY-308','Premium Lungi SY-308','lungi',1080,1590,'#8c5a3b'],['SY-310','Premium Lungi SY-310','lungi',1080,1590,'#4a4a6a'],
['AC-01','Attar Combo AC01 (2pcs)','attar',250,400,'#c9a24a'],['AC-02','Attar Combo AC02 (2pcs)','attar',250,400,'#a67c2e']];
const $=s=>document.querySelector(s),Q=new URLSearchParams(location.search),pg=document.body.dataset.page,m=$('#m');
const get=k=>JSON.parse(localStorage.getItem(k)||'null'),set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const cart=()=>get('tm_cart')||[],find=id=>P.find(p=>p[0]===id),cnt=()=>cart().reduce((s,l)=>s+l.q,0);
const fmt=n=>'৳'+n.toLocaleString('en-US'),sized=p=>['polo','katua','hoodie'].includes(p[2]);
const push=o=>{dataLayer.push({ecommerce:null});dataLayer.push(o)};
const it=(p,q=1,v)=>({item_id:p[0],item_name:p[1],item_category:p[2],price:p[3],quantity:q,...(v?{item_variant:v}:{})});
const lines=()=>cart().map(l=>({l,p:find(l.id)})),sub=()=>lines().reduce((s,{l,p})=>s+p[3]*l.q,0),items=()=>lines().map(({l,p})=>it(p,l.q,l.size));
const ship=z=>z==='ঢাকা'?70:130;
function hdr(){$('#h').innerHTML=`<div class=top>ডেমো সাইট: ট্র্যাকিং প্র্যাকটিসের জন্য, প্রকৃত অর্ডার নেওয়া হয় না</div><nav><a class=logo href=index.html>Taqwa Mart</a><span>${Object.keys(C).map(k=>`<a href="shop.html?cat=${k}">${C[k]}</a>`).join('')}<a href=shop.html>সব পণ্য</a></span><a href=cart.html>🛒 কার্ট (${cnt()})</a></nav>`}
function add(id,size,q=1){const c=cart(),p=find(id),k=c.find(l=>l.id===id&&l.size===size);k?k.q+=q:c.push({id,size,q});set('tm_cart',c);push({event:'add_to_cart',ecommerce:{currency:'BDT',value:p[3]*q,items:[it(p,q,size)]}});hdr()}
const card=p=>`<div class=card><a href="product.html?id=${p[0]}" data-sel="${p[0]}"><div class=ph style="background:${p[5]}"><span>-${Math.round(100-p[3]/p[4]*100)}%</span></div><h3>${p[1]}</h3></a><p><b>${fmt(p[3])}</b> <s>${fmt(p[4])}</s></p><button data-add="${p[0]}">কার্টে যোগ করুন</button></div>`;
function list(n,a,el){el.innerHTML=a.map(card).join('');push({event:'view_item_list',ecommerce:{item_list_id:n,item_list_name:n,items:a.map((p,i)=>({...it(p),index:i,item_list_name:n}))}})}
function renderCart(){const L=lines();m.innerHTML=L.length?`<h1>আপনার কার্ট</h1><table>${L.map(({l,p},i)=>`<tr><td>${p[1]}${l.size?' ('+l.size+')':''}</td><td><button data-q="${i},-1">−</button> ${l.q} <button data-q="${i},1">+</button></td><td>${fmt(p[3]*l.q)}</td><td><button class=alt data-rm="${i}">মুছুন</button></td></tr>`).join('')}</table><p class=tot>সাবটোটাল: <b>${fmt(sub())}</b></p><a class=btn href=checkout.html>চেকআউটে যান</a>`:`<h1>কার্ট খালি</h1><a class=btn href=shop.html>পণ্য দেখুন</a>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-add],[data-sel],[data-q],[data-rm]');if(!t)return;const d=t.dataset;
if(d.add){const p=find(d.add);add(d.add,sized(p)?'M':undefined)}
if(d.sel)push({event:'select_item',ecommerce:{items:[it(find(d.sel))]}});
if(d.q){const[i,n]=d.q.split(',').map(Number),c=cart();c[i].q=Math.max(1,c[i].q+n);set('tm_cart',c);renderCart();hdr()}
if(d.rm){const c=cart(),[x]=c.splice(+d.rm,1),p=find(x.id);set('tm_cart',c);push({event:'remove_from_cart',ecommerce:{currency:'BDT',value:p[3]*x.q,items:[it(p,x.q,x.size)]}});renderCart();hdr()}});
hdr();$('#f').innerHTML='© Taqwa Mart: ডেমো সাইট, সব তথ্য কাল্পনিক';
if(pg==='home'){m.innerHTML=`<section class=hero><h1>মার্জিত পোশাক, সুন্নাহর ছোঁয়া</h1><p>কাতুয়া, পোলো, হুডি শার্ট, লুঙ্গি ও আতর। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।</p><a class="btn alt" href=shop.html>সব পণ্য দেখুন</a></section><h2>ক্যাটাগরি</h2><div class=cats>${Object.keys(C).map(k=>`<a href="shop.html?cat=${k}">${C[k]}</a>`).join('')}</div><h2>জনপ্রিয় পণ্য</h2><div class=grid id=g></div>`;list('home_popular',P.filter((_,i)=>i%2==0),$('#g'))}
if(pg==='shop'){const k=Q.get('cat'),a=k?P.filter(p=>p[2]===k):P;m.innerHTML=`<h1>${k&&C[k]||'সব পণ্য'}</h1><div class=grid id=g></div>`;list(k?'cat_'+k:'all_products',a,$('#g'))}
if(pg==='product'){const p=find(Q.get('id'))||P[0];m.innerHTML=`<div class=pd><div class=ph style="background:${p[5]}"></div><div><h1>${p[1]}</h1><p class=pr><b>${fmt(p[3])}</b> <s>${fmt(p[4])}</s></p><p>আরামদায়ক ফ্যাব্রিক, দৈনন্দিন ব্যবহারের উপযোগী। ক্যাটাগরি: ${C[p[2]]}।</p>${sized(p)?`<label>সাইজ <select id=sz><option>M<option>L<option>XL<option>XXL</select></label>`:''}<label>পরিমাণ <input id=qt type=number min=1 value=1></label><button id=ad>কার্টে যোগ করুন</button> <button id=bn class=alt>এখনই কিনুন</button></div></div>`;
push({event:'view_item',ecommerce:{currency:'BDT',value:p[3],items:[it(p)]}});
const go=()=>add(p[0],$('#sz')?.value,Math.max(1,+$('#qt').value||1));$('#ad').onclick=go;$('#bn').onclick=()=>{go();location.href='checkout.html'}}
if(pg==='cart'){renderCart();if(cart().length)push({event:'view_cart',ecommerce:{currency:'BDT',value:sub(),items:items()}})}
if(pg==='checkout'){if(!cart().length)m.innerHTML=`<h1>কার্ট খালি</h1><a class=btn href=shop.html>পণ্য দেখুন</a>`;else{
m.innerHTML=`<h1>চেকআউট</h1><div class=co><form id=f><input name=n placeholder="আপনার নাম" required><input name=ph placeholder="মোবাইল (01XXXXXXXXX)" pattern="01[0-9]{9}" required><textarea name=a placeholder="সম্পূর্ণ ঠিকানা" required></textarea><select name=z><option>ঢাকা<option>চট্টগ্রাম<option>অন্যান্য জেলা</select><button>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</button></form><div id=sm></div></div>`;
const f=$('#f'),sm=()=>$('#sm').innerHTML=`<table>${lines().map(({l,p})=>`<tr><td>${p[1]} × ${l.q}</td><td>${fmt(p[3]*l.q)}</td></tr>`).join('')}<tr><td>ডেলিভারি</td><td>${fmt(ship(f.z.value))}</td></tr><tr><td><b>মোট</b></td><td><b>${fmt(sub()+ship(f.z.value))}</b></td></tr></table>`;sm();f.z.onchange=sm;
push({event:'begin_checkout',ecommerce:{currency:'BDT',value:sub(),items:items()}});
f.onsubmit=e=>{e.preventDefault();const z=f.z.value;push({event:'add_shipping_info',ecommerce:{currency:'BDT',value:sub(),shipping_tier:z,items:items()}});set('tm_order',{id:'TM'+Date.now(),items:items(),value:sub(),shipping:ship(z)});localStorage.removeItem('tm_cart');location.href='thank-you.html'}}}
if(pg==='thanks'){const o=get('tm_order');if(!o)m.innerHTML=`<h1>কোনো অর্ডার পাওয়া যায়নি</h1><a class=btn href=shop.html>পণ্য দেখুন</a>`;else{
m.innerHTML=`<h1>ধন্যবাদ, অর্ডার পেয়েছি ✅</h1><p>অর্ডার নম্বর: <b>${o.id}</b></p><p>মোট (ডেলিভারি সহ): <b>${fmt(o.value+o.shipping)}</b></p><a class=btn href=index.html>আরও কিনুন</a>`;
if(localStorage.getItem('tm_sent')!==o.id){localStorage.setItem('tm_sent',o.id);push({event:'purchase',ecommerce:{transaction_id:o.id,value:o.value,shipping:o.shipping,currency:'BDT',items:o.items}})}}}
