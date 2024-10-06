(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const Je=(t,e)=>t===e,N=Symbol("solid-proxy"),ve=Symbol("solid-track"),ae={equals:Je};let Ve=Ne;const I=1,ce=2,Ie={owned:null,cleanups:null,context:null,owner:null};var v=null;let we=null,et=null,w=null,P=null,T=null,ge=0;function ie(t,e){const s=w,n=v,i=t.length===0,r=e===void 0?n:e,o=i?Ie:{owned:null,cleanups:null,context:r?r.context:null,owner:r},l=i?t:()=>t(()=>z(()=>G(o)));v=o,w=null;try{return q(l,!0)}finally{w=s,v=n}}function L(t,e){e=e?Object.assign({},ae,e):ae;const s={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.value)),Fe(s,i));return[Re.bind(s),n]}function B(t,e,s){const n=Ee(t,e,!1,I);ee(n)}function F(t,e,s){Ve=it;const n=Ee(t,e,!1,I);n.user=!0,T?T.push(n):ee(n)}function K(t,e,s){s=s?Object.assign({},ae,s):ae;const n=Ee(t,e,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=s.equals||void 0,ee(n),Re.bind(n)}function tt(t){return q(t,!1)}function z(t){if(w===null)return t();const e=w;w=null;try{return t()}finally{w=e}}function Se(t){return v===null||(v.cleanups===null?v.cleanups=[t]:v.cleanups.push(t)),t}function $e(){return w}function Re(){if(this.sources&&this.state)if(this.state===I)ee(this);else{const t=P;P=null,q(()=>ue(this),!1),P=t}if(w){const t=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(t)):(w.sources=[this],w.sourceSlots=[t]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function Fe(t,e,s){let n=t.value;return(!t.comparator||!t.comparator(n,e))&&(t.value=e,t.observers&&t.observers.length&&q(()=>{for(let i=0;i<t.observers.length;i+=1){const r=t.observers[i],o=we&&we.running;o&&we.disposed.has(r),(o?!r.tState:!r.state)&&(r.pure?P.push(r):T.push(r),r.observers&&ze(r)),o||(r.state=I)}if(P.length>1e6)throw P=[],new Error},!1)),e}function ee(t){if(!t.fn)return;G(t);const e=ge;st(t,t.value,e)}function st(t,e,s){let n;const i=v,r=w;w=v=t;try{n=t.fn(e)}catch(o){return t.pure&&(t.state=I,t.owned&&t.owned.forEach(G),t.owned=null),t.updatedAt=s+1,Xe(o)}finally{w=r,v=i}(!t.updatedAt||t.updatedAt<=s)&&(t.updatedAt!=null&&"observers"in t?Fe(t,n):t.value=n,t.updatedAt=s)}function Ee(t,e,s,n=I,i){const r={fn:t,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:v,context:v?v.context:null,pure:s};return v===null||v!==Ie&&(v.owned?v.owned.push(r):v.owned=[r]),r}function he(t){if(t.state===0)return;if(t.state===ce)return ue(t);if(t.suspense&&z(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<ge);)t.state&&e.push(t);for(let s=e.length-1;s>=0;s--)if(t=e[s],t.state===I)ee(t);else if(t.state===ce){const n=P;P=null,q(()=>ue(t,e[0]),!1),P=n}}function q(t,e){if(P)return t();let s=!1;e||(P=[]),T?s=!0:T=[],ge++;try{const n=t();return nt(s),n}catch(n){s||(T=null),P=null,Xe(n)}}function nt(t){if(P&&(Ne(P),P=null),t)return;const e=T;T=null,e.length&&q(()=>Ve(e),!1)}function Ne(t){for(let e=0;e<t.length;e++)he(t[e])}function it(t){let e,s=0;for(e=0;e<t.length;e++){const n=t[e];n.user?t[s++]=n:he(n)}for(e=0;e<s;e++)he(t[e])}function ue(t,e){t.state=0;for(let s=0;s<t.sources.length;s+=1){const n=t.sources[s];if(n.sources){const i=n.state;i===I?n!==e&&(!n.updatedAt||n.updatedAt<ge)&&he(n):i===ce&&ue(n,e)}}}function ze(t){for(let e=0;e<t.observers.length;e+=1){const s=t.observers[e];s.state||(s.state=ce,s.pure?P.push(s):T.push(s),s.observers&&ze(s))}}function G(t){let e;if(t.sources)for(;t.sources.length;){const s=t.sources.pop(),n=t.sourceSlots.pop(),i=s.observers;if(i&&i.length){const r=i.pop(),o=s.observerSlots.pop();n<i.length&&(r.sourceSlots[o]=n,i[n]=r,s.observerSlots[n]=o)}}if(t.tOwned){for(e=t.tOwned.length-1;e>=0;e--)G(t.tOwned[e]);delete t.tOwned}if(t.owned){for(e=t.owned.length-1;e>=0;e--)G(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function rt(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Xe(t,e=v){throw rt(t)}const ot=Symbol("fallback");function _e(t){for(let e=0;e<t.length;e++)t[e]()}function lt(t,e,s={}){let n=[],i=[],r=[],o=0,l=e.length>1?[]:null;return Se(()=>_e(r)),()=>{let a=t()||[],h=a.length,u,c;return a[ve],z(()=>{let f,m,x,C,y,b,S,E,$;if(h===0)o!==0&&(_e(r),r=[],n=[],i=[],o=0,l&&(l=[])),s.fallback&&(n=[ot],i[0]=ie(R=>(r[0]=R,s.fallback())),o=1);else if(o===0){for(i=new Array(h),c=0;c<h;c++)n[c]=a[c],i[c]=ie(d);o=h}else{for(x=new Array(h),C=new Array(h),l&&(y=new Array(h)),b=0,S=Math.min(o,h);b<S&&n[b]===a[b];b++);for(S=o-1,E=h-1;S>=b&&E>=b&&n[S]===a[E];S--,E--)x[E]=i[S],C[E]=r[S],l&&(y[E]=l[S]);for(f=new Map,m=new Array(E+1),c=E;c>=b;c--)$=a[c],u=f.get($),m[c]=u===void 0?-1:u,f.set($,c);for(u=b;u<=S;u++)$=n[u],c=f.get($),c!==void 0&&c!==-1?(x[c]=i[u],C[c]=r[u],l&&(y[c]=l[u]),c=m[c],f.set($,c)):r[u]();for(c=b;c<h;c++)c in x?(i[c]=x[c],r[c]=C[c],l&&(l[c]=y[c],l[c](c))):i[c]=ie(d);i=i.slice(0,o=h),n=a.slice(0)}return i});function d(f){if(r[c]=f,l){const[m,x]=L(c);return l[c]=x,e(a[c],m)}return e(a[c])}}}function k(t,e){return z(()=>t(e||{}))}const at=t=>`Stale read from <${t}>.`;function re(t){const e="fallback"in t&&{fallback:()=>t.fallback};return K(lt(()=>t.each,t.children,e||void 0))}function oe(t){const e=t.keyed,s=K(()=>t.when,void 0,{equals:(n,i)=>e?n===i:!n==!i});return K(()=>{const n=s();if(n){const i=t.children;return typeof i=="function"&&i.length>0?z(()=>i(e?n:()=>{if(!z(s))throw at("Show");return t.when})):i}return t.fallback},void 0,void 0)}function ct(t,e,s){let n=s.length,i=e.length,r=n,o=0,l=0,a=e[i-1].nextSibling,h=null;for(;o<i||l<r;){if(e[o]===s[l]){o++,l++;continue}for(;e[i-1]===s[r-1];)i--,r--;if(i===o){const u=r<n?l?s[l-1].nextSibling:s[r-l]:a;for(;l<r;)t.insertBefore(s[l++],u)}else if(r===l)for(;o<i;)(!h||!h.has(e[o]))&&e[o].remove(),o++;else if(e[o]===s[r-1]&&s[l]===e[i-1]){const u=e[--i].nextSibling;t.insertBefore(s[l++],e[o++].nextSibling),t.insertBefore(s[--r],u),e[i]=s[r]}else{if(!h){h=new Map;let c=l;for(;c<r;)h.set(s[c],c++)}const u=h.get(e[o]);if(u!=null)if(l<u&&u<r){let c=o,d=1,f;for(;++c<i&&c<r&&!((f=h.get(e[c]))==null||f!==u+d);)d++;if(d>u-l){const m=e[o];for(;l<u;)t.insertBefore(s[l++],m)}else t.replaceChild(s[l++],e[o++])}else o++;else e[o++].remove()}}}const ke="_$DX_DELEGATE";function ht(t,e,s,n={}){let i;return ie(r=>{i=r,e===document?t():p(e,t(),e.firstChild?null:void 0,s)},n.owner),()=>{i(),e.textContent=""}}function M(t,e,s){let n;const i=()=>{const o=document.createElement("template");return o.innerHTML=t,o.content.firstChild},r=()=>(n||(n=i())).cloneNode(!0);return r.cloneNode=r,r}function je(t,e=window.document){const s=e[ke]||(e[ke]=new Set);for(let n=0,i=t.length;n<i;n++){const r=t[n];s.has(r)||(s.add(r),e.addEventListener(r,ut))}}function Z(t,e,s){return z(()=>t(e,s))}function p(t,e,s,n){if(s!==void 0&&!n&&(n=[]),typeof e!="function")return fe(t,e,n,s);B(i=>fe(t,e(),i,s),n)}function ut(t){let e=t.target;const s=`$$${t.type}`,n=t.target,i=t.currentTarget,r=a=>Object.defineProperty(t,"target",{configurable:!0,value:a}),o=()=>{const a=e[s];if(a&&!e.disabled){const h=e[`${s}Data`];if(h!==void 0?a.call(e,h,t):a.call(e,t),t.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(t.target)&&r(e.host),!0},l=()=>{for(;o()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return e||document}}),t.composedPath){const a=t.composedPath();r(a[0]);for(let h=0;h<a.length-2&&(e=a[h],!!o());h++){if(e._$host){e=e._$host,l();break}if(e.parentNode===i)break}}else l();r(n)}function fe(t,e,s,n,i){for(;typeof s=="function";)s=s();if(e===s)return s;const r=typeof e,o=n!==void 0;if(t=o&&s[0]&&s[0].parentNode||t,r==="string"||r==="number"){if(r==="number"&&(e=e.toString(),e===s))return s;if(o){let l=s[0];l&&l.nodeType===3?l.data!==e&&(l.data=e):l=document.createTextNode(e),s=X(t,s,n,l)}else s!==""&&typeof s=="string"?s=t.firstChild.data=e:s=t.textContent=e}else if(e==null||r==="boolean")s=X(t,s,n);else{if(r==="function")return B(()=>{let l=e();for(;typeof l=="function";)l=l();s=fe(t,l,s,n)}),()=>s;if(Array.isArray(e)){const l=[],a=s&&Array.isArray(s);if(xe(l,e,s,i))return B(()=>s=fe(t,l,s,n,!0)),()=>s;if(l.length===0){if(s=X(t,s,n),o)return s}else a?s.length===0?Ce(t,l,n):ct(t,s,l):(s&&X(t),Ce(t,l));s=l}else if(e.nodeType){if(Array.isArray(s)){if(o)return s=X(t,s,n,e);X(t,s,null,e)}else s==null||s===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);s=e}}return s}function xe(t,e,s,n){let i=!1;for(let r=0,o=e.length;r<o;r++){let l=e[r],a=s&&s[t.length],h;if(!(l==null||l===!0||l===!1))if((h=typeof l)=="object"&&l.nodeType)t.push(l);else if(Array.isArray(l))i=xe(t,l,a)||i;else if(h==="function")if(n){for(;typeof l=="function";)l=l();i=xe(t,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||i}else t.push(l),i=!0;else{const u=String(l);a&&a.nodeType===3&&a.data===u?t.push(a):t.push(document.createTextNode(u))}}return i}function Ce(t,e,s=null){for(let n=0,i=e.length;n<i;n++)t.insertBefore(e[n],s)}function X(t,e,s,n){if(s===void 0)return t.textContent="";const i=n||document.createTextNode("");if(e.length){let r=!1;for(let o=e.length-1;o>=0;o--){const l=e[o];if(i!==l){const a=l.parentNode===t;!r&&!o?a?t.replaceChild(i,l):t.insertBefore(i,s):a&&l.remove()}else r=!0}}else t.insertBefore(i,s);return[i]}function ft(t){const e=t.split(`
`),s={};let n=null,i=[];return e.forEach(r=>{r.startsWith("## ")?(n&&(s[n]=s[n]||[],i.length>0&&(s[n].push(i.join(`
`)),i=[])),n=r.slice(3).trim().toLowerCase()):r.trim()==="```"?i.length>0&&(s[n]=s[n]||[],s[n].push(i.join(`
`)),i=[]):n&&r.trim()!==""&&i.push(r)}),n&&i.length>0&&(s[n]=s[n]||[],s[n].push(i.join(`
`))),s}class te{constructor(e,s=500){this.content=e,this.frameRate=s,this.loadSprites()}sprites={};currentFrames={};lastUpdateTime=0;animationId=null;lastRenderedSprite="";nFrames=0;async loadSprites(){try{this.sprites=ft(this.content),this.nFrames=Object.values(this.sprites).reduce((e,s)=>e+s.length,0),this.initializeCurrentFrames(),this.startAnimation()}catch(e){console.error("Failed to load sprites:",e)}}initializeCurrentFrames(){Object.keys(this.sprites).forEach(e=>{this.currentFrames[e]=0})}startAnimation(){this.lastUpdateTime=performance.now(),this.animationId=requestAnimationFrame(this.animate)}animate=e=>{e-this.lastUpdateTime>=this.frameRate&&(Object.keys(this.sprites).forEach(s=>{const n=this.sprites[s];n.length>1&&(this.currentFrames[s]=(this.currentFrames[s]+1)%n.length)}),this.lastUpdateTime=e),this.animationId=requestAnimationFrame(this.animate)};stopAnimation(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null)}render(e,s,n,i,r){const o=this.sprites[e]||[];if(o.length===0)return":/";const l=this.currentFrames[e]||0,a=o[l];return s&&this.lastRenderedSprite!==a&&(s.innerHTML=a,this.lastRenderedSprite=a),n&&typeof i=="number"&&typeof r=="number"&&(n.style.transform=`translate(calc(${i}px - 50%), calc(${r}px - 50%))`),a}setFrameRate(e){if(e<=0)throw new Error("Frame rate must be a positive number");this.frameRate=e}getFrameRate(){return this.frameRate}cleanup(){this.stopAnimation()}}const dt="## idle\n```\n(o o)\n L L\n```\n\n## walking\n```\n(o o)\n └ L\n```\n```\n(o o)\n L └\n```\n\n## damage\n```\n(= =)\n └ └\n```\n\n",yt="/LD56/assets/background-music-C9DM71VL.mp3",pt="/LD56/assets/hit-OEw8NPUl.mp3",mt="/LD56/assets/shoot-DvSQsqTL.mp3";class j{static instance;backgroundMusic=null;soundEffects=new Map;backgroundMusicVolume=1;soundEffectsVolume=1;constructor(){}static getInstance(){return j.instance||(j.instance=new j),j.instance}loadAllSounds(){this.loadBackgroundMusic(yt),this.loadSoundEffect("playerHit",pt,.5),this.loadSoundEffect("enemyShoot",mt,.5)}loadBackgroundMusic(e,s=1){const n=new Audio(e);n.loop=!0,this.backgroundMusic={audio:n,baseVolume:s},this.updateBackgroundMusicVolume()}playBackgroundMusic(){this.backgroundMusic?.audio.play()}stopBackgroundMusic(){this.backgroundMusic&&(this.backgroundMusic.audio.pause(),this.backgroundMusic.audio.currentTime=0)}loadSoundEffect(e,s,n=1){const i=new Audio(s);this.soundEffects.set(e,{audio:i,baseVolume:n}),this.updateSoundEffectVolume(e)}playSoundEffect(e){const s=this.soundEffects.get(e);s&&(s.audio.currentTime=0,s.audio.play())}setBackgroundMusicVolume(e){this.backgroundMusicVolume=Math.max(0,Math.min(1,e)),this.updateBackgroundMusicVolume()}setSoundEffectsVolume(e){this.soundEffectsVolume=Math.max(0,Math.min(1,e)),this.updateAllSoundEffectsVolumes()}updateBackgroundMusicVolume(){this.backgroundMusic&&(this.backgroundMusic.audio.volume=this.backgroundMusic.baseVolume*this.backgroundMusicVolume)}updateSoundEffectVolume(e){const s=this.soundEffects.get(e);s&&(s.audio.volume=s.baseVolume*this.soundEffectsVolume)}updateAllSoundEffectsVolumes(){this.soundEffects.forEach((e,s)=>this.updateSoundEffectVolume(s))}getBackgroundMusicVolume(){return this.backgroundMusicVolume}getSoundEffectsVolume(){return this.soundEffectsVolume}}const D=j.getInstance();var gt=M("<div id=player><pre>");class wt{x;y;size;color;speed;velocityX=0;velocityY=0;maxVelocity;acceleration;friction;sprite=null;state="idle";keys=new Set;ref;divRef;lastDirection=1;graceCooldown=0;world=null;constructor(e,s,n,i,r){this.x=e,this.y=s,this.size=n,this.color=i,this.speed=r,this.maxVelocity=r,this.acceleration=r/5,this.friction=.9,this.sprite=new te(dt),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp)}handleKeyDown(e){this.keys.add(e.key.toLowerCase())}handleKeyUp(e){this.keys.delete(e.key.toLowerCase())}update(){let e=0,s=0;g.health>0&&(this.keys.has("w")&&(s-=1),this.keys.has("s")&&(s+=1),this.keys.has("a")&&(e-=1),this.keys.has("d")&&(e+=1));const n=e!==0||s!==0?1:0;this.velocityX+=e*this.acceleration,this.velocityY+=s*this.acceleration;let i=Math.sqrt(this.velocityX**2+this.velocityY**2);if(i>this.maxVelocity){const o=this.maxVelocity/i;this.velocityX*=o,this.velocityY*=o}if(i=Math.sqrt(this.velocityX**2+this.velocityY**2),this.velocityX*=this.friction,this.velocityY*=this.friction,this.x+=this.velocityX,this.y+=this.velocityY,this.x=Math.max(0,Math.min(_,this.x)),this.y=Math.max(0,Math.min(_,this.y)),i<.01&&(this.velocityX=0,this.velocityY=0),this.graceCooldown>0){this.graceCooldown-=1,this.state="damage";let o=this.oscillatingDecay(30-this.graceCooldown),l=this.oscillatingDecay(.8*(30-this.graceCooldown));this.ref.style.rotate=`${2*o}deg`,this.world=document.getElementById("world"),this.world.style.left=`calc(50% + ${.5*o}px)`,this.world.style.top=`calc(50% + ${.2*l}px)`}else this.ref.style.rotate="0deg",n?this.state="walking":this.state="idle";const r=Math.max(Math.floor(5*Math.exp(i/14)),1);this.sprite?.setFrameRate(r),this.lastDirection=e===0?this.lastDirection:e,this.ref.style.transform=`scaleX(${this.lastDirection})`,this.sprite.render(this.state,this.ref,this.divRef,this.x,this.y)}takeDamage(){this.graceCooldown>0||(D.playSoundEffect("playerHit"),this.state="damage",this.graceCooldown=30,V("health",g.health-1))}oscillatingDecay=e=>(30-e)*Math.sin(2*Math.PI*.1*e)*Math.exp(-.05*e);render(){const e=this;return(()=>{var s=gt(),n=s.firstChild,i=e.divRef;typeof i=="function"?Z(i,s):e.divRef=s,s.style.setProperty("position","absolute"),s.style.setProperty("transform","translate(-50%, -50%)"),s.style.setProperty("border","none");var r=e.ref;return typeof r=="function"?Z(r,n):e.ref=n,n.style.setProperty("margin","0"),s})()}cleanup(){this.sprite?.cleanup(),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp)}}const Pe=Symbol("store-raw"),Y=Symbol("store-node"),O=Symbol("store-has"),Ye=Symbol("store-self");function Ue(t){let e=t[N];if(!e&&(Object.defineProperty(t,N,{value:e=new Proxy(t,St)}),!Array.isArray(t))){const s=Object.keys(t),n=Object.getOwnPropertyDescriptors(t);for(let i=0,r=s.length;i<r;i++){const o=s[i];n[o].get&&Object.defineProperty(t,o,{enumerable:n[o].enumerable,get:n[o].get.bind(e)})}}return e}function de(t){let e;return t!=null&&typeof t=="object"&&(t[N]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function Q(t,e=new Set){let s,n,i,r;if(s=t!=null&&t[Pe])return s;if(!de(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let o=0,l=t.length;o<l;o++)i=t[o],(n=Q(i,e))!==i&&(t[o]=n)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const o=Object.keys(t),l=Object.getOwnPropertyDescriptors(t);for(let a=0,h=o.length;a<h;a++)r=o[a],!l[r].get&&(i=t[r],(n=Q(i,e))!==i&&(t[r]=n))}return t}function ye(t,e){let s=t[e];return s||Object.defineProperty(t,e,{value:s=Object.create(null)}),s}function J(t,e,s){if(t[e])return t[e];const[n,i]=L(s,{equals:!1,internal:!0});return n.$=i,t[e]=n}function bt(t,e){const s=Reflect.getOwnPropertyDescriptor(t,e);return!s||s.get||!s.configurable||e===N||e===Y||(delete s.value,delete s.writable,s.get=()=>t[N][e]),s}function Ke(t){$e()&&J(ye(t,Y),Ye)()}function vt(t){return Ke(t),Reflect.ownKeys(t)}const St={get(t,e,s){if(e===Pe)return t;if(e===N)return s;if(e===ve)return Ke(t),s;const n=ye(t,Y),i=n[e];let r=i?i():t[e];if(e===Y||e===O||e==="__proto__")return r;if(!i){const o=Object.getOwnPropertyDescriptor(t,e);$e()&&(typeof r!="function"||t.hasOwnProperty(e))&&!(o&&o.get)&&(r=J(n,e,r)())}return de(r)?Ue(r):r},has(t,e){return e===Pe||e===N||e===ve||e===Y||e===O||e==="__proto__"?!0:($e()&&J(ye(t,O),e)(),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:vt,getOwnPropertyDescriptor:bt};function pe(t,e,s,n=!1){if(!n&&t[e]===s)return;const i=t[e],r=t.length;s===void 0?(delete t[e],t[O]&&t[O][e]&&i!==void 0&&t[O][e].$()):(t[e]=s,t[O]&&t[O][e]&&i===void 0&&t[O][e].$());let o=ye(t,Y),l;if((l=J(o,e,i))&&l.$(()=>s),Array.isArray(t)&&t.length!==r){for(let a=t.length;a<r;a++)(l=o[a])&&l.$();(l=J(o,"length",r))&&l.$(t.length)}(l=o[Ye])&&l.$()}function qe(t,e){const s=Object.keys(e);for(let n=0;n<s.length;n+=1){const i=s[n];pe(t,i,e[i])}}function $t(t,e){if(typeof e=="function"&&(e=e(t)),e=Q(e),Array.isArray(e)){if(t===e)return;let s=0,n=e.length;for(;s<n;s++){const i=e[s];t[s]!==i&&pe(t,s,i)}pe(t,"length",n)}else qe(t,e)}function H(t,e,s=[]){let n,i=t;if(e.length>1){n=e.shift();const o=typeof n,l=Array.isArray(t);if(Array.isArray(n)){for(let a=0;a<n.length;a++)H(t,[n[a]].concat(e),s);return}else if(l&&o==="function"){for(let a=0;a<t.length;a++)n(t[a],a)&&H(t,[a].concat(e),s);return}else if(l&&o==="object"){const{from:a=0,to:h=t.length-1,by:u=1}=n;for(let c=a;c<=h;c+=u)H(t,[c].concat(e),s);return}else if(e.length>1){H(t[n],e,[n].concat(s));return}i=t[n],s=[n].concat(s)}let r=e[0];typeof r=="function"&&(r=r(i,s),r===i)||n===void 0&&r==null||(r=Q(r),n===void 0||de(i)&&de(r)&&!Array.isArray(r)?qe(i,r):pe(t,n,r))}function He(...[t,e]){const s=Q(t||{}),n=Array.isArray(s),i=Ue(s);function r(...o){tt(()=>{n&&o.length===1?$t(s,o[0]):H(s,o)})}return[i,r]}const xt="# Villain Sprites\n\n## idle\n```\n-(ò_ó)-⟔\n  L L\n```\n\n## walking\n```\n-(ò_ó)-⟔\n  └ L\n```\n```\n-(ò_ó)-⟔\n  L └\n```\n\n## shooting\n```\n-(ò_ó)⟔ \n  L L\n```\n\n## damaged\n```\n-(x_x)-  ⟔\n  └ └\n```",Pt="## main\n```\n+\n```";class be{x;y;speed=5;size=.5;element;sprite;player;playerElement=null;constructor(e,s,n,i,r){this.player=n,this.playerElement=document.getElementById("player"),this.x=e,this.y=s,this.sprite=new te(Pt),this.sprite.setFrameRate(5);const o=i-e,l=r-s,a=Math.sqrt(o*o+l*l),h=o/a,u=l/a;this.element=document.createElement("pre"),this.element.style.position="absolute",this.element.style.width=`${this.size}rem`,this.element.style.height=`${this.size}rem`,this.element.style.margin="0",this.element.style.lineHeight="50%",this.element.style.borderRadius="50%",this.updatePosition();const c=document.getElementById("world");c?c.appendChild(this.element):console.error("World element not found"),this.update(h,u)}updatePosition(){this.sprite.render("main",this.element,this.element,this.x,this.y)}update(e,s){const n=setInterval(()=>{this.x+=e*this.speed,this.y+=s*this.speed,this.updatePosition(),this.isOutOfBounds()&&(this.destroy(),clearInterval(n)),this.checkCollision(this.player)&&(this.player.takeDamage(),this.destroy(),clearInterval(n))},16)}isOutOfBounds(){const s=this.element.getBoundingClientRect(),n=s.left+s.width/2,i=s.top+s.height/2;return n<-1e3||n>window.innerWidth+1e3||i<-1e3||i>window.innerHeight+1e3}checkCollision(e){const s=this.element.getBoundingClientRect();if(!this.playerElement)return console.error("Player element not found"),!1;const n=this.playerElement.getBoundingClientRect();return!(s.right<n.left||s.left>n.right||s.bottom<n.top||s.top>n.bottom)}destroy(){this.element.parentNode?.removeChild(this.element)}}var Mt=M("<div><pre>:)");class Ae{x;y;size=1;color="black";speed=1.4;velocityX=0;velocityY=0;maxVelocity;acceleration;friction;sprite;state="idle";ref;divRef;lastDirection=1;cooldown=0;wantedDistance=200;type="normal";cooldownPeriod=100;behaviorTimer=0;currentBehavior="chase";randomDirection={x:0,y:0};behaviorChangeProbability;constructor(e,s,n="normal",i=.01,r=1.4){this.x=e,this.y=s,this.friction=.9,this.type=n,this.behaviorChangeProbability=i,this.speed=r,this.type==="red"&&(this.size=2,this.speed=1.8,this.wantedDistance=400,this.behaviorChangeProbability=.005,this.cooldownPeriod=20),this.type==="blue"&&(this.wantedDistance=400,this.speed=.2),this.maxVelocity=this.speed,this.acceleration=this.speed/10,this.sprite=new te(xt),this.sprite.setFrameRate(5)}chooseBehavior(){if(Math.random()<this.behaviorChangeProbability){const e=["chase","wait","random"];if(this.currentBehavior=e[Math.floor(Math.random()*e.length)],this.behaviorTimer=Math.random()*1.5+.5,this.currentBehavior==="random"){const s=Math.random()*2*Math.PI;this.randomDirection={x:Math.cos(s),y:Math.sin(s)}}}}shoot(e){if(!this.divRef||!this.ref)return;const s=this.ref.getBoundingClientRect(),n=window.getComputedStyle(this.ref),i=parseFloat(n.fontSize),r=i*.6,o=i,l=this.x+this.lastDirection*(s.width/2+r/2),a=this.y-s.height/2+o/2;if(this.type==="blue"){const h=Math.atan2(e.y-a,e.x-l),u=Math.PI/12,c=h-u,d=h+u,f=l+Math.cos(c)*1e3,m=a+Math.sin(c)*1e3,x=l+Math.cos(d)*1e3,C=a+Math.sin(d)*1e3;new be(l,a,e,f,m),new be(l,a,e,x,C)}else new be(l,a,e,e.x,e.y);D.playSoundEffect("enemyShoot"),V("score",h=>h+1)}update(e,s){this.chooseBehavior(),this.behaviorTimer>0?this.behaviorTimer-=s:this.currentBehavior="chase";const n=e.x-this.x,i=e.y-this.y,r=Math.sqrt(n*n+i*i);let o=n/r,l=i/r;switch(this.currentBehavior){case"chase":r>this.wantedDistance&&(this.velocityX+=o*this.acceleration,this.velocityY+=l*this.acceleration);break;case"wait":o=0,l=0,this.velocityX*=.9,this.velocityY*=.9;break;case"random":this.velocityX+=this.randomDirection.x*this.acceleration,this.velocityY+=this.randomDirection.y*this.acceleration,o=this.randomDirection.x,l=this.randomDirection.y;break}r<=this.wantedDistance&&(this.type!=="red"&&(o=0,l=0),this.cooldown<=0&&(this.shoot(e),this.cooldown=this.cooldownPeriod)),this.cooldown-=1;let a=Math.sqrt(this.velocityX**2+this.velocityY**2);if(a>this.maxVelocity){const h=this.maxVelocity/a;this.velocityX*=h,this.velocityY*=h}a=Math.sqrt(this.velocityX**2+this.velocityY**2),this.velocityX*=this.friction,this.velocityY*=this.friction,this.cooldown<=0&&(this.x+=this.velocityX,this.y+=this.velocityY),a<.01&&(this.velocityX=0,this.velocityY=0),this.cooldown>this.cooldownPeriod*.8?this.state="shooting":o!==0||l!==0?this.state="walking":this.state="idle",this.lastDirection=o===0?this.lastDirection:Math.sign(o),this.ref&&(this.ref.style.transform=`scaleX(${this.lastDirection})`),this.sprite.render(this.state,this.ref,this.divRef,this.x,this.y)}render(){const e=this;return(()=>{var s=Mt(),n=s.firstChild,i=e.divRef;return typeof i=="function"?Z(i,s):e.divRef=s,s.style.setProperty("position","absolute"),s.style.setProperty("border","none"),Z(r=>e.ref=r,n),n.style.setProperty("margin","0"),B(r=>{var o=e.type==="normal"?"normal":"bold",l={normal:"black",red:"red",blue:"blue"}[e.type];return o!==r.e&&((r.e=o)!=null?n.style.setProperty("font-weight",o):n.style.removeProperty("font-weight")),l!==r.t&&((r.t=l)!=null?n.style.setProperty("color",l):n.style.removeProperty("color")),r},{e:void 0,t:void 0}),s})()}cleanup(){this.sprite.cleanup()}}const Et=`## main
\`\`\`
 ___  ___
/   \\/   \\
\\        /
 \\      /
  \\    /
   \\  /
    \\/
\`\`\``;function De(t,e){if(t<2||e<2)return"Width and height must be at least 2.";const s="o"+"=".repeat(t-2)+"o",n="‖"+" ".repeat(t-2)+"‖";let i=s+`
`;for(let r=0;r<e-2;r++)i+=n+`
`;return i+=s,i}var _t=M("<div>"),kt=M("<p>Loading high scores..."),Ct=M("<p style=color:red>"),At=M("<table><thead><tr><th>Rank</th><th>Name</th><th>Score</th><th>Date</th></tr></thead><tbody>"),Dt=M("<tr><td></td><td></td><td></td><td>");const[Ot,Tt]=L([]),[Lt,Me]=L(!0),[Oe,Te]=L(null),Bt="https://docs.google.com/spreadsheets/d/1y1-C_hKXzPTLQC4fDhsamvQC3xBRIXhR7czqJkNaWX0/gviz/tq?tqx=out:csv&sheet=scores",We=async()=>{Me(!0),Te(null);try{const t=await fetch(Bt);if(!t.ok)throw new Error("Failed to fetch scores");const e=await t.text(),s=Vt(e);Tt(s)}catch(t){Te("Failed to load high scores. Please try again later."),console.error("Error fetching scores:",t)}finally{Me(!1)}},Vt=t=>t.split(`
`).slice(1).map(s=>{const n=s.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)||[],[i,r,o]=n.map(l=>l.replace(/^"|"$/g,"").trim());return{name:i,score:parseInt(r,10),timestamp:o}}).filter(s=>s.name&&!isNaN(s.score)).sort((s,n)=>n.score-s.score),It=()=>(F(()=>{We()}),(()=>{var t=_t();return t.style.setProperty("overflow-y","auto"),t.style.setProperty("width","calc(100% - 6rem)"),t.style.setProperty("flex","1 1 auto"),t.style.setProperty("text-align","center"),p(t,(()=>{var e=K(()=>!!Lt());return()=>e()?kt():(()=>{var s=K(()=>!!Oe());return()=>s()?(()=>{var n=Ct();return p(n,Oe),n})():(()=>{var n=At(),i=n.firstChild,r=i.nextSibling;return n.style.setProperty("width","100%"),p(r,k(re,{get each(){return Ot()},children:(o,l)=>(()=>{var a=Dt(),h=a.firstChild,u=h.nextSibling,c=u.nextSibling,d=c.nextSibling;return p(h,()=>l()+1),u.style.setProperty("white-space","nowrap"),u.style.setProperty("overflow","hidden"),u.style.setProperty("text-overflow","ellipsis"),u.style.setProperty("max-width","16ch"),p(u,()=>o.name),p(c,()=>o.score),p(d,()=>new Date(o.timestamp).toISOString().split("T")[0]),a})()})),n})()})()})()),t})());var Rt=M("<div><div><label>Background Music</label><input type=range min=0 max=1 step=0.01></div><div><label>Sound Effects</label><input type=range min=0 max=1 step=0.01>"),Ft=M('<div><button aria-label="Audio Settings">🔊');const Nt=()=>{const[t,e]=L(!1),s=()=>e(!t()),n=r=>{const o=parseFloat(r.target.value);Be("backgroundMusic",o),D.setBackgroundMusicVolume(o)},i=r=>{const o=parseFloat(r.target.value);Be("soundEffects",o),D.setSoundEffectsVolume(o)};return(()=>{var r=Ft(),o=r.firstChild;return r.style.setProperty("position","absolute"),r.style.setProperty("top","1rem"),r.style.setProperty("right","1rem"),r.style.setProperty("z-index","50"),r.style.setProperty("display","flex"),r.style.setProperty("gap","1rem"),p(r,k(oe,{get when(){return t()},get children(){var l=Rt(),a=l.firstChild,h=a.firstChild,u=h.nextSibling,c=a.nextSibling,d=c.firstChild,f=d.nextSibling;return l.style.setProperty("background","white"),l.style.setProperty("padding","1rem"),l.style.setProperty("border-radius","0.5rem"),l.style.setProperty("box-shadow","0 2px 10px rgba(0,0,0,0.1)"),l.style.setProperty("margin-top","0.5rem"),a.style.setProperty("margin-bottom","1rem"),h.style.setProperty("display","block"),h.style.setProperty("font-size","0.875rem"),h.style.setProperty("font-weight","500"),h.style.setProperty("margin-bottom","0.5rem"),u.$$input=n,u.style.setProperty("width","100%"),d.style.setProperty("display","block"),d.style.setProperty("font-size","0.875rem"),d.style.setProperty("font-weight","500"),d.style.setProperty("margin-bottom","0.5rem"),f.$$input=i,f.style.setProperty("width","100%"),B(()=>u.value=me.backgroundMusic),B(()=>f.value=me.soundEffects),l}}),o),o.$$click=s,o.style.setProperty("padding","0.5rem"),o.style.setProperty("background","white"),o.style.setProperty("border","1px solid #ccc"),o.style.setProperty("border-radius","0.25rem"),o.style.setProperty("cursor","pointer"),o.style.setProperty("width","fit-content"),o.style.setProperty("height","fit-content"),r})()};je(["input","click"]);const zt="## 1\n```\n^^^ ^\n```\n\n## 2\n```\n^^\n```";var Xt=M("<div>"),jt=M("<div id=welcomeScreen><pre></pre><div id=welcome><h1>(o o)</h1><p>Play with W, A, S, D to move around.</p><p>Avoid enemies, and have fun!</p><a href=https://github.com/zimonitrome/LD56>View on Github!</a><button>Start Game"),Le=M("<pre>"),Yt=M('<input type=text placeholder="Enter your name"id=playerName>'),Ut=M("<button>Submit score"),Kt=M("<div id=gameOver><h1>Game over!</h1><h2>Your score: </h2><a href=https://github.com/zimonitrome/LD56>View on Github!</a><div><button>Restart"),qt=M("<div id=game><div id=world></div><div id=HUD><div id=gameOverScreen></div><div></div><div><h2>Score: ");const U=1500;let _=U;const Ge=new te(zt),Ht=t=>(()=>{var e=Xt();return e.style.setProperty("position","absolute"),e.style.setProperty("font-weight","bold"),e.style.setProperty("color","rgb(200,200,200)"),p(e,()=>Ge.render(t.spriteIndex.toString())),B(s=>{var n=`${t.x}rem`,i=`${t.y}rem`;return n!==s.e&&((s.e=n)!=null?e.style.setProperty("left",n):e.style.removeProperty("left")),i!==s.t&&((s.t=i)!=null?e.style.setProperty("top",i):e.style.removeProperty("top")),s},{e:void 0,t:void 0}),e})(),Wt=async()=>{le("loading");const e={name:document.getElementById("playerName").value,score:g.score};fetch("https://script.google.com/macros/s/AKfycbwZ1tT3EAPZgnxp1M91a5cv1AZAHCZYdC_Lym3-D9Gq6Ff5S8Xni8VKDyiLIxq2s-dIBg/exec",{redirect:"follow",method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8",origin:"https://script.google.com"},body:JSON.stringify(e)}).then(s=>{le(!0),Me(!0),setTimeout(()=>{We()},1e3)}).catch(s=>{console.error("Error submitting score:",s),le(!1)})},Ze=()=>({player:new wt(U/2,U/2,1,"red",7),enemies:[],tiles:[],health:3,active:!0,score:0,deltaTime:0});let W=0;function Gt(t,e=.01){return 1-1/(1+Math.exp(e*t)-1)}const se=()=>Gt(W),[g,V]=He(Ze()),[ne,le]=L(!1),[me,Be]=He({backgroundMusic:.5,soundEffects:.3}),Zt=()=>{let t;const[e,s]=L({width:window.innerWidth,height:window.innerHeight}),[n,i]=L(!1),r=()=>{s({width:window.innerWidth,height:window.innerHeight})};F(()=>{window.addEventListener("resize",r),Se(()=>window.removeEventListener("resize",r))}),F(()=>{D.loadAllSounds()}),F(()=>{D.setBackgroundMusicVolume(me.backgroundMusic),D.setSoundEffectsVolume(me.soundEffects)}),F(()=>{t.style.visibility=n()?"visible":"hidden"}),F(()=>{g.active&&n()?D.playBackgroundMusic():D.stopBackgroundMusic()});const o=()=>{const h=[],u=parseFloat(getComputedStyle(document.documentElement).fontSize),c=Math.floor(U/u),d=Math.floor(U/u);for(let f=0;f<100;f++)h.push({x:Math.floor(Math.random()*c),y:Math.floor(Math.random()*d),sprite:1+Math.floor(Math.random()*Ge.nFrames)});return h},l=()=>{let h,u;switch(Math.floor(Math.random()*4)){case 0:h=Math.random()*_,u=0;break;case 1:h=_,u=Math.random()*_;break;case 2:h=Math.random()*_,u=_;break;case 3:h=0,u=Math.random()*_;break}const d=Math.random()<se(),f=d?Math.random()<.5?"red":"blue":"normal",m=Math.random()<.2?.05:.01;let x;d?x=new Ae(h,u,f,m):x=new Ae(h,u,f,m,1.4+.2*(Math.random()-.5)),V("enemies",C=>[...C,x])};F(()=>{if(!n())return;console.log("start"),V("tiles",o());let h=performance.now(),u=0;W=0,g.active;const c=setInterval(()=>{console.log(se());const d=performance.now(),f=(d-h)/1e3;h=d,g.player.update(),g.enemies.forEach(m=>{m.update(g.player,f)}),u+=f,u>=1&&(V("score",m=>m+1),W+=1,u-=1,W%(10-Math.floor(5*se()))===0&&(console.log(W,10-Math.floor(5*se()),"spawning enemy"),l())),t!==void 0&&(t.style.transform=`translate(${-g.player.x}px, ${-g.player.y}px)`),g.health<=0&&g.player.graceCooldown<=0&&(V("active",!1),clearInterval(c)),_-=f,t!==void 0&&(t.style.width=`${_}px`,t.style.height=`${_}px`)},1e3/60);return l(),Se(()=>{clearInterval(c)}),()=>{clearInterval(c)}});const a=()=>{i(!0),V("active",!0),o(),D.playBackgroundMusic()};return(()=>{var h=qt(),u=h.firstChild,c=u.nextSibling,d=c.firstChild,f=d.nextSibling,m=f.nextSibling,x=m.firstChild;x.firstChild;var C=t;return typeof C=="function"?Z(C,u):t=u,p(u,k(re,{get each(){return g.tiles},children:y=>k(Ht,{get x(){return y.x},get y(){return y.y},get spriteIndex(){return y.sprite},color:"rgba(100,100,200,0.2)"})}),null),p(u,k(re,{get each(){return g.enemies},children:y=>y.render()}),null),p(u,()=>g.player.render(),null),p(c,k(Nt,{}),d),p(d,k(oe,{get when(){return!n()},get children(){var y=jt(),b=y.firstChild,S=b.nextSibling,E=S.firstChild,$=E.nextSibling,R=$.nextSibling,A=R.nextSibling,Qe=A.nextSibling;return b.style.setProperty("margin","0"),p(b,()=>De(Math.floor(.6*e().width/(.56*parseFloat(getComputedStyle(document.documentElement).fontSize))),Math.floor(.6*e().height/(1.2*parseFloat(getComputedStyle(document.documentElement).fontSize))))),Qe.$$click=a,y}}),null),p(d,k(oe,{get when(){return K(()=>!g.active)()&&n()},get children(){return[(()=>{var y=Le();return y.style.setProperty("margin","0"),p(y,()=>{const b=parseFloat(getComputedStyle(document.documentElement).fontSize),S=.56*b,E=1.2*b,$=Math.floor(.6*e().width/S),R=Math.floor(.6*e().height/E);return De($,R)}),y})(),(()=>{var y=Kt(),b=y.firstChild,S=b.nextSibling;S.firstChild;var E=S.nextSibling,$=E.nextSibling,R=$.firstChild;return p(S,()=>g.score,null),p(y,k(It,{}),$),$.style.setProperty("display","flex"),$.style.setProperty("flex-direction","row"),$.style.setProperty("gap","1rem"),$.style.setProperty("margin","1rem"),R.$$click=()=>{g.player.cleanup();for(const A of g.enemies)A.cleanup();V(Ze()),le(!1),_=U},p($,k(oe,{get when(){return!ne()||ne()==="loading"},get children(){return[(()=>{var A=Yt();return B(()=>A.disabled=ne()=="loading"),A})(),(()=>{var A=Ut();return A.$$click=Wt,B(()=>A.disabled=ne()==="loading"),A})()]}}),null),y})()]}}),null),f.style.setProperty("bottom","0"),f.style.setProperty("left","0"),f.style.setProperty("position","absolute"),f.style.setProperty("display","flex"),f.style.setProperty("flex-direction","row"),f.style.setProperty("gap","1rem"),f.style.setProperty("margin","1rem"),p(f,k(re,{get each(){return Array.from({length:g.health})},children:()=>(()=>{var y=Le();return y.style.setProperty("font-weight","bold"),p(y,()=>new te(Et).render("main")),y})()})),m.style.setProperty("top","0"),m.style.setProperty("left","0"),m.style.setProperty("position","absolute"),m.style.setProperty("margin-left","2rem"),p(x,()=>g.score,null),h})()};ht(()=>k(Zt,{}),document.getElementById("root"));je(["click"]);
