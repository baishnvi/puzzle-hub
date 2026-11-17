const P=[
{id:1,n:"Beyond Dreams",d:"Balloons over mountains. 180 pieces, hardcore.",p:2499,c:"Jigsaw",s:"Large",g:"radial-gradient(circle,#ffe3a3 0 10%,#3a7ca5 11% 45%,#2a4d3a 46% 78%,#13283a 79%)"},
{id:2,n:"Spiritual Awakening",d:"Meditative mandala. 120 pieces, medium.",p:2999,c:"Jigsaw",s:"Medium",g:"radial-gradient(circle,#ffd1e8 0 12%,#e0328a 13% 40%,#6a1b9a 41% 75%,#3a0d5c 76%)"},
{id:3,n:"Sacred Geometry",d:"Interlocking patterns for calm focus. 150 pieces.",p:1999,c:"Jigsaw",s:"Medium",g:"radial-gradient(circle,#fff 0 8%,#f2a33a 9% 38%,#c2185b 39% 70%,#4a148c 71%)"},
{id:4,n:"Personal Pizza",d:"An 8-slice round puzzle. Quick, playful, 48 pieces.",p:899,c:"Jigsaw",s:"Small",g:"radial-gradient(circle,#ffd54f 0 15%,#e53935 16% 55%,#c68642 56% 88%,#6d4c41 89%)"},
{id:5,n:"Mind Maze Cards",d:"Pattern and logic brain game, 2 to 4 players.",p:1299,c:"Brain game",s:"Small",g:"radial-gradient(circle,#b3e5fc 0 12%,#0288d1 13% 50%,#01579b 51% 80%,#0d2b45 81%)"},
{id:6,n:"Memory Orbit",d:"Recall rings that train working memory.",p:1699,c:"Brain game",s:"Medium",g:"radial-gradient(circle,#c8e6c9 0 12%,#43a047 13% 48%,#1b5e20 49% 80%,#0b2a12 81%)"}];
const $=s=>document.querySelector(s),inr=n=>"₹"+n.toLocaleString("en-IN");
let cart=[];try{cart=JSON.parse(localStorage.getItem("cart")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("cart",JSON.stringify(cart))}catch(e){}};
const card=x=>`<article class="card"><div class="puz" role="img" aria-label="${x.n} puzzle artwork" style="background:${x.g}"></div><h3>${x.n}</h3><p>${x.d}</p><span class="tag">${x.c} · ${x.s}</span><span class="price">${inr(x.p)}</span><button class="btn" data-add="${x.id}">Add to cart</button></article>`;
$("#feat").innerHTML=P.slice(0,4).map(card).join("");
$("#stg").innerHTML=Array.from({length:20},(_, i)=>`<span style="background:hsl(${i*18},70%,42%)">${i+1}</span>`).join("");
function list(){const q=$("#q").value.toLowerCase(),c=$("#fc").value,s=$("#fs").value,pr=$("#fp").value;
const r=P.filter(x=>(!q||(x.n+x.d).toLowerCase().includes(q))&&(!c||x.c==c)&&(!s||x.s==s)&&(!pr||(pr=="9999"?x.p>=2500:x.p<+pr)));
$("#list").innerHTML=r.map(card).join("");$("#none").hidden=r.length>0}
["#q","#fc","#fs","#fp"].forEach(i=>$(i).addEventListener("input",list));
document.addEventListener("click",e=>{const a=e.target.closest("[data-add]");if(a){const id=+a.dataset.add,i=cart.find(x=>x.id==id);i?i.q++:cart.push({id,q:1});upd();a.textContent="Added";setTimeout(()=>a.textContent="Add to cart",900)}
const m=e.target.closest("[data-q]");if(m){const[id,d]=m.dataset.q.split(",").map(Number),i=cart.find(x=>x.id==id);i.q+=d;cart=cart.filter(x=>x.q>0);upd();drawCart()}});
const sub=()=>cart.reduce((t,i)=>t+P.find(x=>x.id==i.id).p*i.q,0);
function upd(){save();$("#cc").textContent=cart.reduce((t,i)=>t+i.q,0)}
function drawCart(){const b=$("#cartbox");if(!cart.length){b.innerHTML='<p>Your cart is empty. <a href="#shop">Browse puzzles</a></p>';return}
b.innerHTML='<div class="wrap"><table><tr><th>Item</th><th>Qty</th><th>Price</th></tr>'+cart.map(i=>{const x=P.find(y=>y.id==i.id);return`<tr><td>${x.n}</td><td class="qty"><button data-q="${i.id},-1" aria-label="Less">−</button> ${i.q} <button data-q="${i.id},1" aria-label="More">+</button></td><td>${inr(x.p*i.q)}</td></tr>`}).join("")+`</table></div><p class="price">Subtotal: ${inr(sub())}</p><a class="btn" href="#checkout">Go to checkout</a>`}
function total(){let f=0;document.querySelectorAll(".fees input:checked").forEach(c=>{const v=+c.dataset.f;f+=v==30?99:v==1?149:Math.round(sub()*.02)});return{f,t:sub()+f}}
function drawSum(){const{f,t}=total();$("#sum").innerHTML=cart.length?`<p>Items ${inr(sub())} · Add-on fees ${inr(f)}<br><span class="price">Total ${inr(t)}</span></p>`:'<p>Your cart is empty. <a href="#shop">Add a puzzle first</a>.</p>'}
document.querySelectorAll(".fees input").forEach(c=>c.addEventListener("change",drawSum));
function done(d,pid){const r=$("#res");r.innerHTML=`<div class="msg">Payment received (${pid}). Thank you, ${d.n}! Order total ${inr(d.t)}. A confirmation will go to ${d.e}.</div>`;
if(SHEET_URL)fetch(SHEET_URL,{method:"POST",mode:"no-cors",body:JSON.stringify({...d,payment:pid,items:cart})}).catch(()=>{});
cart=[];upd();$("#co").reset();drawSum()}
$("#co").addEventListener("submit",e=>{e.preventDefault();if(!cart.length)return;const f=new FormData(e.target),{t}=total(),d={n:f.get("n"),e:f.get("e"),p:f.get("p"),a:f.get("a"),t};
if(window.Razorpay&&!RAZORPAY_KEY.includes("YOUR_KEY")){new Razorpay({key:RAZORPAY_KEY,amount:t*100,currency:"INR",name:"Onestop Puzzle Hub",prefill:{name:d.n,email:d.e,contact:d.p},handler:r=>done(d,r.razorpay_payment_id)}).open()}
else done(d,"TEST-"+Date.now().toString(36))});
$("#su").addEventListener("submit",e=>{e.preventDefault();$("#sres").innerHTML='<div class="msg">Account created. Welcome to the club!</div>';e.target.reset()});
function route(){const h=(location.hash||"#home").slice(1),k=["home","shop","cart","checkout","signup"].includes(h)?h:"home";
document.querySelectorAll(".page").forEach(p=>p.classList.toggle("on",p.id=="p-"+k));
document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.hash=="#"+k));
if(k=="shop")list();if(k=="cart")drawCart();if(k=="checkout"){$("#res").innerHTML="";drawSum()}window.scrollTo(0,0)}
addEventListener("hashchange",route);upd();route();