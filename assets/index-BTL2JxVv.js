(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const Ye=(t,e)=>t===e,B=Symbol("solid-proxy"),de=Symbol("solid-track"),te={equals:Ye};let Ce=Le;const I=1,se=2,Me={owned:null,cleanups:null,context:null,owner:null};var b=null;let he=null,Ue=null,g=null,P=null,O=null,ue=0;function Z(t,e){const s=g,n=b,i=t.length===0,r=e===void 0?n:e,o=i?Me:{owned:null,cleanups:null,context:r?r.context:null,owner:r},l=i?t:()=>t(()=>T(()=>H(o)));b=o,g=null;try{return Y(l,!0)}finally{g=s,b=n}}function D(t,e){e=e?Object.assign({},te,e):te;const s={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.value)),De(s,i));return[Oe.bind(s),n]}function L(t,e,s){const n=ve(t,e,!1,I);G(n)}function R(t,e,s){Ce=We;const n=ve(t,e,!1,I);n.user=!0,O?O.push(n):G(n)}function j(t,e,s){s=s?Object.assign({},te,s):te;const n=ve(t,e,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=s.equals||void 0,G(n),Oe.bind(n)}function He(t){return Y(t,!1)}function T(t){if(g===null)return t();const e=g;g=null;try{return t()}finally{g=e}}function ye(t){return b===null||(b.cleanups===null?b.cleanups=[t]:b.cleanups.push(t)),t}function pe(){return g}function Oe(){if(this.sources&&this.state)if(this.state===I)G(this);else{const t=P;P=null,Y(()=>ie(this),!1),P=t}if(g){const t=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(t)):(g.sources=[this],g.sourceSlots=[t]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function De(t,e,s){let n=t.value;return(!t.comparator||!t.comparator(n,e))&&(t.value=e,t.observers&&t.observers.length&&Y(()=>{for(let i=0;i<t.observers.length;i+=1){const r=t.observers[i],o=he&&he.running;o&&he.disposed.has(r),(o?!r.tState:!r.state)&&(r.pure?P.push(r):O.push(r),r.observers&&Ie(r)),o||(r.state=I)}if(P.length>1e6)throw P=[],new Error},!1)),e}function G(t){if(!t.fn)return;H(t);const e=ue;Ke(t,t.value,e)}function Ke(t,e,s){let n;const i=b,r=g;g=b=t;try{n=t.fn(e)}catch(o){return t.pure&&(t.state=I,t.owned&&t.owned.forEach(H),t.owned=null),t.updatedAt=s+1,Ve(o)}finally{g=r,b=i}(!t.updatedAt||t.updatedAt<=s)&&(t.updatedAt!=null&&"observers"in t?De(t,n):t.value=n,t.updatedAt=s)}function ve(t,e,s,n=I,i){const r={fn:t,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:b,context:b?b.context:null,pure:s};return b===null||b!==Me&&(b.owned?b.owned.push(r):b.owned=[r]),r}function ne(t){if(t.state===0)return;if(t.state===se)return ie(t);if(t.suspense&&T(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<ue);)t.state&&e.push(t);for(let s=e.length-1;s>=0;s--)if(t=e[s],t.state===I)G(t);else if(t.state===se){const n=P;P=null,Y(()=>ie(t,e[0]),!1),P=n}}function Y(t,e){if(P)return t();let s=!1;e||(P=[]),O?s=!0:O=[],ue++;try{const n=t();return qe(s),n}catch(n){s||(O=null),P=null,Ve(n)}}function qe(t){if(P&&(Le(P),P=null),t)return;const e=O;O=null,e.length&&Y(()=>Ce(e),!1)}function Le(t){for(let e=0;e<t.length;e++)ne(t[e])}function We(t){let e,s=0;for(e=0;e<t.length;e++){const n=t[e];n.user?t[s++]=n:ne(n)}for(e=0;e<s;e++)ne(t[e])}function ie(t,e){t.state=0;for(let s=0;s<t.sources.length;s+=1){const n=t.sources[s];if(n.sources){const i=n.state;i===I?n!==e&&(!n.updatedAt||n.updatedAt<ue)&&ne(n):i===se&&ie(n,e)}}}function Ie(t){for(let e=0;e<t.observers.length;e+=1){const s=t.observers[e];s.state||(s.state=se,s.pure?P.push(s):O.push(s),s.observers&&Ie(s))}}function H(t){let e;if(t.sources)for(;t.sources.length;){const s=t.sources.pop(),n=t.sourceSlots.pop(),i=s.observers;if(i&&i.length){const r=i.pop(),o=s.observerSlots.pop();n<i.length&&(r.sourceSlots[o]=n,i[n]=r,s.observerSlots[n]=o)}}if(t.tOwned){for(e=t.tOwned.length-1;e>=0;e--)H(t.tOwned[e]);delete t.tOwned}if(t.owned){for(e=t.owned.length-1;e>=0;e--)H(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function Ge(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Ve(t,e=b){throw Ge(t)}const Qe=Symbol("fallback");function be(t){for(let e=0;e<t.length;e++)t[e]()}function Ze(t,e,s={}){let n=[],i=[],r=[],o=0,l=e.length>1?[]:null;return ye(()=>be(r)),()=>{let a=t()||[],u=a.length,f,c;return a[de],T(()=>{let d,E,A,V,h,v,S,p,_;if(u===0)o!==0&&(be(r),r=[],n=[],i=[],o=0,l&&(l=[])),s.fallback&&(n=[Qe],i[0]=Z(x=>(r[0]=x,s.fallback())),o=1);else if(o===0){for(i=new Array(u),c=0;c<u;c++)n[c]=a[c],i[c]=Z(w);o=u}else{for(A=new Array(u),V=new Array(u),l&&(h=new Array(u)),v=0,S=Math.min(o,u);v<S&&n[v]===a[v];v++);for(S=o-1,p=u-1;S>=v&&p>=v&&n[S]===a[p];S--,p--)A[p]=i[S],V[p]=r[S],l&&(h[p]=l[S]);for(d=new Map,E=new Array(p+1),c=p;c>=v;c--)_=a[c],f=d.get(_),E[c]=f===void 0?-1:f,d.set(_,c);for(f=v;f<=S;f++)_=n[f],c=d.get(_),c!==void 0&&c!==-1?(A[c]=i[f],V[c]=r[f],l&&(h[c]=l[f]),c=E[c],d.set(_,c)):r[f]();for(c=v;c<u;c++)c in A?(i[c]=A[c],r[c]=V[c],l&&(l[c]=h[c],l[c](c))):i[c]=Z(w);i=i.slice(0,o=u),n=a.slice(0)}return i});function w(d){if(r[c]=d,l){const[E,A]=D(c);return l[c]=A,e(a[c],E)}return e(a[c])}}}function k(t,e){return T(()=>t(e||{}))}const Je=t=>`Stale read from <${t}>.`;function J(t){const e="fallback"in t&&{fallback:()=>t.fallback};return j(Ze(()=>t.each,t.children,e||void 0))}function ee(t){const e=t.keyed,s=j(()=>t.when,void 0,{equals:(n,i)=>e?n===i:!n==!i});return j(()=>{const n=s();if(n){const i=t.children;return typeof i=="function"&&i.length>0?T(()=>i(e?n:()=>{if(!T(s))throw Je("Show");return t.when})):i}return t.fallback},void 0,void 0)}function et(t,e,s){let n=s.length,i=e.length,r=n,o=0,l=0,a=e[i-1].nextSibling,u=null;for(;o<i||l<r;){if(e[o]===s[l]){o++,l++;continue}for(;e[i-1]===s[r-1];)i--,r--;if(i===o){const f=r<n?l?s[l-1].nextSibling:s[r-l]:a;for(;l<r;)t.insertBefore(s[l++],f)}else if(r===l)for(;o<i;)(!u||!u.has(e[o]))&&e[o].remove(),o++;else if(e[o]===s[r-1]&&s[l]===e[i-1]){const f=e[--i].nextSibling;t.insertBefore(s[l++],e[o++].nextSibling),t.insertBefore(s[--r],f),e[i]=s[r]}else{if(!u){u=new Map;let c=l;for(;c<r;)u.set(s[c],c++)}const f=u.get(e[o]);if(f!=null)if(l<f&&f<r){let c=o,w=1,d;for(;++c<i&&c<r&&!((d=u.get(e[c]))==null||d!==f+w);)w++;if(w>f-l){const E=e[o];for(;l<f;)t.insertBefore(s[l++],E)}else t.replaceChild(s[l++],e[o++])}else o++;else e[o++].remove()}}}const Se="_$DX_DELEGATE";function tt(t,e,s,n={}){let i;return Z(r=>{i=r,e===document?t():y(e,t(),e.firstChild?null:void 0,s)},n.owner),()=>{i(),e.textContent=""}}function $(t,e,s){let n;const i=()=>{const o=document.createElement("template");return o.innerHTML=t,o.content.firstChild},r=()=>(n||(n=i())).cloneNode(!0);return r.cloneNode=r,r}function Re(t,e=window.document){const s=e[Se]||(e[Se]=new Set);for(let n=0,i=t.length;n<i;n++){const r=t[n];s.has(r)||(s.add(r),e.addEventListener(r,st))}}function K(t,e,s){return T(()=>t(e,s))}function y(t,e,s,n){if(s!==void 0&&!n&&(n=[]),typeof e!="function")return re(t,e,n,s);L(i=>re(t,e(),i,s),n)}function st(t){let e=t.target;const s=`$$${t.type}`,n=t.target,i=t.currentTarget,r=a=>Object.defineProperty(t,"target",{configurable:!0,value:a}),o=()=>{const a=e[s];if(a&&!e.disabled){const u=e[`${s}Data`];if(u!==void 0?a.call(e,u,t):a.call(e,t),t.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(t.target)&&r(e.host),!0},l=()=>{for(;o()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return e||document}}),t.composedPath){const a=t.composedPath();r(a[0]);for(let u=0;u<a.length-2&&(e=a[u],!!o());u++){if(e._$host){e=e._$host,l();break}if(e.parentNode===i)break}}else l();r(n)}function re(t,e,s,n,i){for(;typeof s=="function";)s=s();if(e===s)return s;const r=typeof e,o=n!==void 0;if(t=o&&s[0]&&s[0].parentNode||t,r==="string"||r==="number"){if(r==="number"&&(e=e.toString(),e===s))return s;if(o){let l=s[0];l&&l.nodeType===3?l.data!==e&&(l.data=e):l=document.createTextNode(e),s=F(t,s,n,l)}else s!==""&&typeof s=="string"?s=t.firstChild.data=e:s=t.textContent=e}else if(e==null||r==="boolean")s=F(t,s,n);else{if(r==="function")return L(()=>{let l=e();for(;typeof l=="function";)l=l();s=re(t,l,s,n)}),()=>s;if(Array.isArray(e)){const l=[],a=s&&Array.isArray(s);if(me(l,e,s,i))return L(()=>s=re(t,l,s,n,!0)),()=>s;if(l.length===0){if(s=F(t,s,n),o)return s}else a?s.length===0?$e(t,l,n):et(t,s,l):(s&&F(t),$e(t,l));s=l}else if(e.nodeType){if(Array.isArray(s)){if(o)return s=F(t,s,n,e);F(t,s,null,e)}else s==null||s===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);s=e}}return s}function me(t,e,s,n){let i=!1;for(let r=0,o=e.length;r<o;r++){let l=e[r],a=s&&s[t.length],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)t.push(l);else if(Array.isArray(l))i=me(t,l,a)||i;else if(u==="function")if(n){for(;typeof l=="function";)l=l();i=me(t,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||i}else t.push(l),i=!0;else{const f=String(l);a&&a.nodeType===3&&a.data===f?t.push(a):t.push(document.createTextNode(f))}}return i}function $e(t,e,s=null){for(let n=0,i=e.length;n<i;n++)t.insertBefore(e[n],s)}function F(t,e,s,n){if(s===void 0)return t.textContent="";const i=n||document.createTextNode("");if(e.length){let r=!1;for(let o=e.length-1;o>=0;o--){const l=e[o];if(i!==l){const a=l.parentNode===t;!r&&!o?a?t.replaceChild(i,l):t.insertBefore(i,s):a&&l.remove()}else r=!0}}else t.insertBefore(i,s);return[i]}function nt(t){const e=t.split(`
`),s={};let n=null,i=[];return e.forEach(r=>{r.startsWith("## ")?(n&&(s[n]=s[n]||[],i.length>0&&(s[n].push(i.join(`
`)),i=[])),n=r.slice(3).trim().toLowerCase()):r.trim()==="```"?i.length>0&&(s[n]=s[n]||[],s[n].push(i.join(`
`)),i=[]):n&&r.trim()!==""&&i.push(r)}),n&&i.length>0&&(s[n]=s[n]||[],s[n].push(i.join(`
`))),s}class fe{constructor(e,s=500){this.content=e,this.frameRate=s,this.loadSprites()}sprites={};currentFrames={};lastUpdateTime=0;animationId=null;lastRenderedSprite="";async loadSprites(){try{this.sprites=nt(this.content),this.initializeCurrentFrames(),this.startAnimation()}catch(e){console.error("Failed to load sprites:",e)}}initializeCurrentFrames(){Object.keys(this.sprites).forEach(e=>{this.currentFrames[e]=0})}startAnimation(){this.lastUpdateTime=performance.now(),this.animationId=requestAnimationFrame(this.animate)}animate=e=>{e-this.lastUpdateTime>=this.frameRate&&(Object.keys(this.sprites).forEach(s=>{const n=this.sprites[s];n.length>1&&(this.currentFrames[s]=(this.currentFrames[s]+1)%n.length)}),this.lastUpdateTime=e),this.animationId=requestAnimationFrame(this.animate)};stopAnimation(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null)}render(e,s,n,i,r){const o=this.sprites[e]||[];if(o.length===0)return":/";const l=this.currentFrames[e]||0,a=o[l];return s&&this.lastRenderedSprite!==a&&(s.innerHTML=a,this.lastRenderedSprite=a),n&&typeof i=="number"&&typeof r=="number"&&(n.style.transform=`translate(calc(${i}px - 50%), calc(${r}px - 50%))`),a}setFrameRate(e){if(e<=0)throw new Error("Frame rate must be a positive number");this.frameRate=e}getFrameRate(){return this.frameRate}cleanup(){this.stopAnimation()}}const it="## idle\n```\n(o o)\n L L\n```\n\n## walking\n```\n(o o)\n └ L\n```\n```\n(o o)\n L └\n```\n\n## damage\n```\n(= =)\n └ └\n```\n\n",rt="/assets/background-music-C9DM71VL.mp3",ot="/assets/hit-OEw8NPUl.mp3",lt="/assets/shoot-DvSQsqTL.mp3";class z{static instance;backgroundMusic=null;soundEffects=new Map;backgroundMusicVolume=1;soundEffectsVolume=1;constructor(){}static getInstance(){return z.instance||(z.instance=new z),z.instance}loadAllSounds(){this.loadBackgroundMusic(rt),this.loadSoundEffect("playerHit",ot,1),this.loadSoundEffect("enemyShoot",lt,.8)}loadBackgroundMusic(e,s=1){const n=new Audio(e);n.loop=!0,this.backgroundMusic={audio:n,baseVolume:s},this.updateBackgroundMusicVolume()}playBackgroundMusic(){this.backgroundMusic?.audio.play()}stopBackgroundMusic(){this.backgroundMusic&&(this.backgroundMusic.audio.pause(),this.backgroundMusic.audio.currentTime=0)}loadSoundEffect(e,s,n=1){const i=new Audio(s);this.soundEffects.set(e,{audio:i,baseVolume:n}),this.updateSoundEffectVolume(e)}playSoundEffect(e){const s=this.soundEffects.get(e);s&&(s.audio.currentTime=0,s.audio.play())}setBackgroundMusicVolume(e){this.backgroundMusicVolume=Math.max(0,Math.min(1,e)),this.updateBackgroundMusicVolume()}setSoundEffectsVolume(e){this.soundEffectsVolume=Math.max(0,Math.min(1,e)),this.updateAllSoundEffectsVolumes()}updateBackgroundMusicVolume(){this.backgroundMusic&&(this.backgroundMusic.audio.volume=this.backgroundMusic.baseVolume*this.backgroundMusicVolume)}updateSoundEffectVolume(e){const s=this.soundEffects.get(e);s&&(s.audio.volume=s.baseVolume*this.soundEffectsVolume)}updateAllSoundEffectsVolumes(){this.soundEffects.forEach((e,s)=>this.updateSoundEffectVolume(s))}getBackgroundMusicVolume(){return this.backgroundMusicVolume}getSoundEffectsVolume(){return this.soundEffectsVolume}}const C=z.getInstance();var at=$("<div id=player><pre>");class ct{x;y;size;color;speed;velocityX=0;velocityY=0;maxVelocity;acceleration;friction;sprite=null;state="idle";keys=new Set;ref;divRef;lastDirection=1;graceCooldown=0;world=null;constructor(e,s,n,i,r){this.x=e,this.y=s,this.size=n,this.color=i,this.speed=r,this.maxVelocity=r,this.acceleration=r/5,this.friction=.9,this.sprite=new fe(it),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp)}handleKeyDown(e){this.keys.add(e.key.toLowerCase())}handleKeyUp(e){this.keys.delete(e.key.toLowerCase())}update(){let e=0,s=0;m.health>0&&(this.keys.has("w")&&(s-=1),this.keys.has("s")&&(s+=1),this.keys.has("a")&&(e-=1),this.keys.has("d")&&(e+=1));const n=e!==0||s!==0?1:0;this.velocityX+=e*this.acceleration,this.velocityY+=s*this.acceleration;let i=Math.sqrt(this.velocityX**2+this.velocityY**2);if(i>this.maxVelocity){const o=this.maxVelocity/i;this.velocityX*=o,this.velocityY*=o}if(i=Math.sqrt(this.velocityX**2+this.velocityY**2),this.velocityX*=this.friction,this.velocityY*=this.friction,this.x+=this.velocityX,this.y+=this.velocityY,i<.01&&(this.velocityX=0,this.velocityY=0),this.graceCooldown>0){this.graceCooldown-=1,this.state="damage";let o=this.oscillatingDecay(30-this.graceCooldown),l=this.oscillatingDecay(.8*(30-this.graceCooldown));this.ref.style.rotate=`${2*o}deg`,this.world=document.getElementById("world"),this.world.style.left=`calc(50% + ${.5*o}px)`,this.world.style.top=`calc(50% + ${.2*l}px)`}else this.ref.style.rotate="0deg",n?this.state="walking":this.state="idle";const r=Math.max(Math.floor(5*Math.exp(i/14)),1);this.sprite?.setFrameRate(r),this.lastDirection=e===0?this.lastDirection:e,this.ref.style.transform=`scaleX(${this.lastDirection})`,this.sprite.render(this.state,this.ref,this.divRef,this.x,this.y)}takeDamage(){this.graceCooldown>0||(C.playSoundEffect("playerHit"),this.state="damage",this.graceCooldown=30,N("health",m.health-1))}oscillatingDecay=e=>(30-e)*Math.sin(2*Math.PI*.1*e)*Math.exp(-.05*e);render(){const e=this;return(()=>{var s=at(),n=s.firstChild,i=e.divRef;typeof i=="function"?K(i,s):e.divRef=s,s.style.setProperty("position","absolute"),s.style.setProperty("transform","translate(-50%, -50%)"),s.style.setProperty("border","none");var r=e.ref;return typeof r=="function"?K(r,n):e.ref=n,n.style.setProperty("margin","0"),s})()}cleanup(){this.sprite?.cleanup(),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp)}}const ge=Symbol("store-raw"),X=Symbol("store-node"),M=Symbol("store-has"),Be=Symbol("store-self");function Te(t){let e=t[B];if(!e&&(Object.defineProperty(t,B,{value:e=new Proxy(t,ht)}),!Array.isArray(t))){const s=Object.keys(t),n=Object.getOwnPropertyDescriptors(t);for(let i=0,r=s.length;i<r;i++){const o=s[i];n[o].get&&Object.defineProperty(t,o,{enumerable:n[o].enumerable,get:n[o].get.bind(e)})}}return e}function oe(t){let e;return t!=null&&typeof t=="object"&&(t[B]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function q(t,e=new Set){let s,n,i,r;if(s=t!=null&&t[ge])return s;if(!oe(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let o=0,l=t.length;o<l;o++)i=t[o],(n=q(i,e))!==i&&(t[o]=n)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const o=Object.keys(t),l=Object.getOwnPropertyDescriptors(t);for(let a=0,u=o.length;a<u;a++)r=o[a],!l[r].get&&(i=t[r],(n=q(i,e))!==i&&(t[r]=n))}return t}function le(t,e){let s=t[e];return s||Object.defineProperty(t,e,{value:s=Object.create(null)}),s}function W(t,e,s){if(t[e])return t[e];const[n,i]=D(s,{equals:!1,internal:!0});return n.$=i,t[e]=n}function ut(t,e){const s=Reflect.getOwnPropertyDescriptor(t,e);return!s||s.get||!s.configurable||e===B||e===X||(delete s.value,delete s.writable,s.get=()=>t[B][e]),s}function Fe(t){pe()&&W(le(t,X),Be)()}function ft(t){return Fe(t),Reflect.ownKeys(t)}const ht={get(t,e,s){if(e===ge)return t;if(e===B)return s;if(e===de)return Fe(t),s;const n=le(t,X),i=n[e];let r=i?i():t[e];if(e===X||e===M||e==="__proto__")return r;if(!i){const o=Object.getOwnPropertyDescriptor(t,e);pe()&&(typeof r!="function"||t.hasOwnProperty(e))&&!(o&&o.get)&&(r=W(n,e,r)())}return oe(r)?Te(r):r},has(t,e){return e===ge||e===B||e===de||e===X||e===M||e==="__proto__"?!0:(pe()&&W(le(t,M),e)(),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:ft,getOwnPropertyDescriptor:ut};function ae(t,e,s,n=!1){if(!n&&t[e]===s)return;const i=t[e],r=t.length;s===void 0?(delete t[e],t[M]&&t[M][e]&&i!==void 0&&t[M][e].$()):(t[e]=s,t[M]&&t[M][e]&&i===void 0&&t[M][e].$());let o=le(t,X),l;if((l=W(o,e,i))&&l.$(()=>s),Array.isArray(t)&&t.length!==r){for(let a=t.length;a<r;a++)(l=o[a])&&l.$();(l=W(o,"length",r))&&l.$(t.length)}(l=o[Be])&&l.$()}function Ne(t,e){const s=Object.keys(e);for(let n=0;n<s.length;n+=1){const i=s[n];ae(t,i,e[i])}}function dt(t,e){if(typeof e=="function"&&(e=e(t)),e=q(e),Array.isArray(e)){if(t===e)return;let s=0,n=e.length;for(;s<n;s++){const i=e[s];t[s]!==i&&ae(t,s,i)}ae(t,"length",n)}else Ne(t,e)}function U(t,e,s=[]){let n,i=t;if(e.length>1){n=e.shift();const o=typeof n,l=Array.isArray(t);if(Array.isArray(n)){for(let a=0;a<n.length;a++)U(t,[n[a]].concat(e),s);return}else if(l&&o==="function"){for(let a=0;a<t.length;a++)n(t[a],a)&&U(t,[a].concat(e),s);return}else if(l&&o==="object"){const{from:a=0,to:u=t.length-1,by:f=1}=n;for(let c=a;c<=u;c+=f)U(t,[c].concat(e),s);return}else if(e.length>1){U(t[n],e,[n].concat(s));return}i=t[n],s=[n].concat(s)}let r=e[0];typeof r=="function"&&(r=r(i,s),r===i)||n===void 0&&r==null||(r=q(r),n===void 0||oe(i)&&oe(r)&&!Array.isArray(r)?Ne(i,r):ae(t,n,r))}function ze(...[t,e]){const s=q(t||{}),n=Array.isArray(s),i=Te(s);function r(...o){He(()=>{n&&o.length===1?dt(s,o[0]):U(s,o)})}return[i,r]}const yt="# Villain Sprites\n\n## idle\n```\n-(ò_ó)-⟔\n  L L\n```\n\n## walking\n```\n-(ò_ó)-⟔\n  └ L\n```\n```\n-(ò_ó)-⟔\n  L └\n```\n\n## shooting\n```\n-(ò_ó)⟔ \n  L L\n```\n\n## damaged\n```\n-(x_x)-  ⟔\n  └ └\n```",pt="## main\n```\n+\n```\n```\n×\n```";class mt{x;y;speed=5;size=.5;element;sprite;player;playerElement=null;constructor(e,s,n){this.player=n,this.playerElement=document.getElementById("player");const i=n.x,r=n.y;this.x=e,this.y=s,this.sprite=new fe(pt),this.sprite.setFrameRate(5);const o=i-e,l=r-s,a=Math.sqrt(o*o+l*l),u=o/a,f=l/a;this.element=document.createElement("pre"),this.element.style.position="absolute",this.element.style.width=`${this.size}rem`,this.element.style.height=`${this.size}rem`,this.element.style.margin="0",this.element.style.lineHeight="50%",this.element.style.borderRadius="50%",this.updatePosition();const c=document.getElementById("world");c?c.appendChild(this.element):console.error("World element not found"),this.update(u,f)}updatePosition(){this.sprite.render("main",this.element,this.element,this.x,this.y)}update(e,s){const n=setInterval(()=>{this.x+=e*this.speed,this.y+=s*this.speed,this.updatePosition(),this.isOutOfBounds()&&(this.destroy(),clearInterval(n)),this.checkCollision(this.player)&&(this.player.takeDamage(),this.destroy(),clearInterval(n))},16)}isOutOfBounds(){const s=this.element.getBoundingClientRect(),n=s.left+s.width/2,i=s.top+s.height/2;return n<-1e3||n>window.innerWidth+1e3||i<-1e3||i>window.innerHeight+1e3}checkCollision(e){const s=this.element.getBoundingClientRect();if(!this.playerElement)return console.error("Player element not found"),!1;const n=this.playerElement.getBoundingClientRect();return!(s.right<n.left||s.left>n.right||s.bottom<n.top||s.top>n.bottom)}destroy(){this.element.parentNode?.removeChild(this.element)}}var gt=$("<div><pre>:)");class wt{x;y;size=1;color="black";speed=1.4;velocityX=0;velocityY=0;maxVelocity=this.speed;acceleration=this.speed/10;friction;sprite;state="idle";ref;divRef;lastDirection=1;cooldown=0;wantedDistance=200;constructor(e,s){this.x=e,this.y=s,this.friction=.9,this.sprite=new fe(yt),this.sprite.setFrameRate(5)}shoot(e){if(!this.divRef||!this.ref)return;const s=this.ref.getBoundingClientRect(),n=window.getComputedStyle(this.ref),i=parseFloat(n.fontSize),r=i*.6,o=i,l=this.x+this.lastDirection*(s.width/2+r/2),a=this.y-s.height/2+o/2;new mt(l,a,e),C.playSoundEffect("enemyShoot")}update(e){const s=e.x-this.x,n=e.y-this.y,i=Math.sqrt(s*s+n*n),r=s/i,o=n/i;i>this.wantedDistance&&(this.velocityX+=r*this.acceleration,this.velocityY+=o*this.acceleration),i<=this.wantedDistance&&this.cooldown<=0&&(this.shoot(e),this.cooldown=100),this.cooldown-=1;let l=Math.sqrt(this.velocityX**2+this.velocityY**2);if(l>this.maxVelocity){const a=this.maxVelocity/l;this.velocityX*=a,this.velocityY*=a}l=Math.sqrt(this.velocityX**2+this.velocityY**2),this.velocityX*=this.friction,this.velocityY*=this.friction,this.x+=this.velocityX,this.y+=this.velocityY,l<.01&&(this.velocityX=0,this.velocityY=0),this.cooldown>80?this.state="shooting":i>this.wantedDistance?this.state="walking":this.state="idle",this.lastDirection=r===0?this.lastDirection:Math.sign(r),this.ref&&(this.ref.style.transform=`scaleX(${this.lastDirection})`),this.sprite.render(this.state,this.ref,this.divRef,this.x,this.y)}render(){const e=this;return(()=>{var s=gt(),n=s.firstChild,i=e.divRef;return typeof i=="function"?K(i,s):e.divRef=s,s.style.setProperty("position","absolute"),s.style.setProperty("border","none"),K(r=>e.ref=r,n),n.style.setProperty("margin","0"),s})()}cleanup(){this.sprite.cleanup()}}const vt=`## main
\`\`\`
 ___  ___
/   \\/   \\
\\        /
 \\      /
  \\    /
   \\  /
    \\/
\`\`\``;function Pe(t,e){if(t<2||e<2)return"Width and height must be at least 2.";const s="o"+"=".repeat(t-2)+"o",n="‖"+" ".repeat(t-2)+"‖";let i=s+`
`;for(let r=0;r<e-2;r++)i+=n+`
`;return i+=s,i}var bt=$("<h2>High Scores"),St=$("<div>"),$t=$("<p>Loading high scores..."),Pt=$("<p style=color:red>"),xt=$("<table><thead><tr><th>Rank</th><th>Name</th><th>Score</th><th>Date</th></tr></thead><tbody>"),Et=$("<tr><td></td><td></td><td></td><td>");const[_t,kt]=D([]),[At,xe]=D(!0),[Ee,_e]=D(null),Ct="https://docs.google.com/spreadsheets/d/1y1-C_hKXzPTLQC4fDhsamvQC3xBRIXhR7czqJkNaWX0/gviz/tq?tqx=out:csv&sheet=scores",Xe=async()=>{xe(!0),_e(null);try{const t=await fetch(Ct);if(!t.ok)throw new Error("Failed to fetch scores");const e=await t.text(),s=Mt(e);kt(s)}catch(t){_e("Failed to load high scores. Please try again later."),console.error("Error fetching scores:",t)}finally{xe(!1)}},Mt=t=>t.split(`
`).slice(1).map(s=>{const[n,i,r]=s.split(",");return{name:n,score:parseInt(i,10),timestamp:r}}).filter(s=>s.name&&!isNaN(s.score)).sort((s,n)=>n.score-s.score).slice(0,10),Ot=()=>(R(()=>{Xe()}),[bt(),(()=>{var t=St();return t.style.setProperty("overflow-y","auto"),t.style.setProperty("width","calc(100% - 6rem)"),t.style.setProperty("flex","1 1 auto"),t.style.setProperty("text-align","center"),y(t,(()=>{var e=j(()=>!!At());return()=>e()?$t():(()=>{var s=j(()=>!!Ee());return()=>s()?(()=>{var n=Pt();return y(n,Ee),n})():(()=>{var n=xt(),i=n.firstChild,r=i.nextSibling;return n.style.setProperty("width","100%"),y(r,k(J,{get each(){return _t()},children:(o,l)=>(()=>{var a=Et(),u=a.firstChild,f=u.nextSibling,c=f.nextSibling,w=c.nextSibling;return y(u,()=>l()+1),f.style.setProperty("white-space","nowrap"),f.style.setProperty("overflow","hidden"),f.style.setProperty("text-overflow","ellipsis"),f.style.setProperty("max-width","16ch"),y(f,()=>o.name),y(c,()=>o.score),y(w,()=>new Date(o.timestamp).toISOString().split("T")[0]),a})()})),n})()})()})()),t})()]);var Dt=$("<div><div><label>Background Music</label><input type=range min=0 max=1 step=0.01></div><div><label>Sound Effects</label><input type=range min=0 max=1 step=0.01>"),Lt=$('<div><button aria-label="Audio Settings">🔊');const It=()=>{const[t,e]=D(!1),s=()=>e(!t()),n=r=>{const o=parseFloat(r.target.value);Ae("backgroundMusic",o),C.setBackgroundMusicVolume(o)},i=r=>{const o=parseFloat(r.target.value);Ae("soundEffects",o),C.setSoundEffectsVolume(o)};return(()=>{var r=Lt(),o=r.firstChild;return r.style.setProperty("position","absolute"),r.style.setProperty("top","1rem"),r.style.setProperty("right","1rem"),r.style.setProperty("z-index","50"),r.style.setProperty("display","flex"),r.style.setProperty("gap","1rem"),y(r,k(ee,{get when(){return t()},get children(){var l=Dt(),a=l.firstChild,u=a.firstChild,f=u.nextSibling,c=a.nextSibling,w=c.firstChild,d=w.nextSibling;return l.style.setProperty("background","white"),l.style.setProperty("padding","1rem"),l.style.setProperty("border-radius","0.5rem"),l.style.setProperty("box-shadow","0 2px 10px rgba(0,0,0,0.1)"),l.style.setProperty("margin-top","0.5rem"),a.style.setProperty("margin-bottom","1rem"),u.style.setProperty("display","block"),u.style.setProperty("font-size","0.875rem"),u.style.setProperty("font-weight","500"),u.style.setProperty("margin-bottom","0.5rem"),f.$$input=n,f.style.setProperty("width","100%"),w.style.setProperty("display","block"),w.style.setProperty("font-size","0.875rem"),w.style.setProperty("font-weight","500"),w.style.setProperty("margin-bottom","0.5rem"),d.$$input=i,d.style.setProperty("width","100%"),L(()=>f.value=ce.backgroundMusic),L(()=>d.value=ce.soundEffects),l}}),o),o.$$click=s,o.style.setProperty("padding","0.5rem"),o.style.setProperty("background","white"),o.style.setProperty("border","1px solid #ccc"),o.style.setProperty("border-radius","0.25rem"),o.style.setProperty("cursor","pointer"),o.style.setProperty("width","fit-content"),o.style.setProperty("height","fit-content"),r})()};Re(["input","click"]);var Vt=$("<div>"),Rt=$("<div id=welcomeScreen><pre></pre><div id=welcome><h1>Welcome to the Game!</h1><p>Get ready for an exciting adventure!</p><button>Start Game"),ke=$("<pre>"),Bt=$('<input type=text placeholder="Enter your name"id=playerName>'),Tt=$("<button>Submit score"),Ft=$("<div id=gameOver><h1>Game over!</h1><h2>Your score: </h2><div><button>Restart"),Nt=$("<div id=game><div id=world></div><div id=HUD><div id=gameOverScreen></div><div></div><div><h2>Score: ");const zt=t=>(()=>{var e=Vt();return e.style.setProperty("position","absolute"),L(s=>{var n=`${t.x}rem`,i=`${t.y}rem`,r=`${t.size}rem`,o=`${t.size}rem`,l=t.color;return n!==s.e&&((s.e=n)!=null?e.style.setProperty("left",n):e.style.removeProperty("left")),i!==s.t&&((s.t=i)!=null?e.style.setProperty("top",i):e.style.removeProperty("top")),r!==s.a&&((s.a=r)!=null?e.style.setProperty("width",r):e.style.removeProperty("width")),o!==s.o&&((s.o=o)!=null?e.style.setProperty("height",o):e.style.removeProperty("height")),l!==s.i&&((s.i=l)!=null?e.style.setProperty("background",l):e.style.removeProperty("background")),s},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),e})(),Xt=async()=>{we("loading");const e={name:document.getElementById("playerName").value,score:m.score};fetch("https://script.google.com/macros/s/AKfycbwZ1tT3EAPZgnxp1M91a5cv1AZAHCZYdC_Lym3-D9Gq6Ff5S8Xni8VKDyiLIxq2s-dIBg/exec",{redirect:"follow",method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8",origin:"https://script.google.com"},body:JSON.stringify(e)}).then(s=>{console.log(s),we(!0),Xe()})},je=()=>({player:new ct(window.innerWidth/2,window.innerHeight/2,1,"red",7),enemies:[],tiles:[],health:3,active:!0,score:0}),[m,N]=ze(je()),[Q,we]=D(!1),[ce,Ae]=ze({backgroundMusic:.7,soundEffects:.7}),jt=()=>{let t;const[e,s]=D({width:window.innerWidth,height:window.innerHeight}),[n,i]=D(!1),r=()=>{s({width:window.innerWidth,height:window.innerHeight})};R(()=>{window.addEventListener("resize",r),ye(()=>window.removeEventListener("resize",r))}),R(()=>{C.loadAllSounds()}),R(()=>{C.setBackgroundMusicVolume(ce.backgroundMusic),C.setSoundEffectsVolume(ce.soundEffects)}),R(()=>{m.active&&n()?C.playBackgroundMusic():C.stopBackgroundMusic()});const o=()=>{const u=[];for(let f=0;f<1e3;f++)u.push({x:Math.random()*100,y:Math.random()*100,size:Math.random()*2+.5});N("tiles",u)},l=()=>{const u=new wt(Math.random()*100-50,Math.random()*100-50);N("enemies",f=>[...f,u])};R(()=>{o()}),R(()=>{if(!n())return;m.active;const u=setInterval(()=>{m.player.update(),m.enemies.forEach(c=>{c.update(m.player)}),t!==void 0&&(t.style.transform=`translate(${-m.player.x}px, ${-m.player.y}px)`),m.health<=0&&m.player.graceCooldown<=0&&(N("active",!1),clearInterval(u),clearInterval(f))},1e3/60);l();const f=setInterval(()=>{l()},1e4);return ye(()=>{clearInterval(u),clearInterval(f)}),()=>{clearInterval(u),clearInterval(f)}});const a=()=>{i(!0),N("active",!0),o(),C.playBackgroundMusic()};return(()=>{var u=Nt(),f=u.firstChild,c=f.nextSibling,w=c.firstChild,d=w.nextSibling,E=d.nextSibling,A=E.firstChild;A.firstChild;var V=t;return typeof V=="function"?K(V,f):t=f,y(f,k(J,{get each(){return m.tiles},children:h=>k(zt,{get x(){return h.x},get y(){return h.y},get size(){return h.size},color:"rgba(100,100,200,0.2)"})}),null),y(f,k(J,{get each(){return m.enemies},children:h=>h.render()}),null),y(f,()=>m.player.render(),null),y(c,k(It,{}),w),y(w,k(ee,{get when(){return!n()},get children(){var h=Rt(),v=h.firstChild,S=v.nextSibling,p=S.firstChild,_=p.nextSibling,x=_.nextSibling;return v.style.setProperty("margin","0"),y(v,()=>Pe(Math.floor(.6*e().width/(.56*parseFloat(getComputedStyle(document.documentElement).fontSize))),Math.floor(.6*e().height/(1.2*parseFloat(getComputedStyle(document.documentElement).fontSize))))),x.$$click=a,h}}),null),y(w,k(ee,{get when(){return j(()=>!m.active)()&&n()},get children(){return[(()=>{var h=ke();return h.style.setProperty("margin","0"),y(h,()=>{const v=parseFloat(getComputedStyle(document.documentElement).fontSize),S=.56*v,p=1.2*v,_=Math.floor(.6*e().width/S),x=Math.floor(.6*e().height/p);return Pe(_,x)}),h})(),(()=>{var h=Ft(),v=h.firstChild,S=v.nextSibling;S.firstChild;var p=S.nextSibling,_=p.firstChild;return y(S,()=>m.score,null),y(h,k(Ot,{}),p),p.style.setProperty("display","flex"),p.style.setProperty("flex-direction","row"),p.style.setProperty("gap","1rem"),p.style.setProperty("margin","1rem"),_.$$click=()=>{m.player.cleanup();for(const x of m.enemies)x.cleanup();N(je()),we(!1),o()},y(p,k(ee,{get when(){return!Q()||Q()==="loading"},get children(){return[(()=>{var x=Bt();return L(()=>x.disabled=Q()=="loading"),x})(),(()=>{var x=Tt();return x.$$click=Xt,L(()=>x.disabled=Q()==="loading"),x})()]}}),null),h})()]}}),null),d.style.setProperty("bottom","0"),d.style.setProperty("left","0"),d.style.setProperty("position","absolute"),d.style.setProperty("display","flex"),d.style.setProperty("flex-direction","row"),d.style.setProperty("gap","1rem"),d.style.setProperty("margin","1rem"),y(d,k(J,{get each(){return Array.from({length:m.health})},children:()=>(()=>{var h=ke();return h.style.setProperty("font-weight","bold"),y(h,()=>new fe(vt).render("main")),h})()})),E.style.setProperty("top","0"),E.style.setProperty("left","0"),E.style.setProperty("position","absolute"),E.style.setProperty("margin-left","2rem"),y(A,()=>m.score,null),u})()};tt(()=>k(jt,{}),document.getElementById("root"));Re(["click"]);
