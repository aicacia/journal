import{D as l,ao as q,a2 as k,s as w,J as z}from"./index.d23e9856.js";const u=[];function A(e,o){return{subscribe:T(e,o).subscribe}}function T(e,o=l){let r;const n=new Set;function a(t){if(w(e,t)&&(e=t,r)){const i=!u.length;for(const s of n)s[1](),u.push(s,e);if(i){for(let s=0;s<u.length;s+=2)u[s][0](u[s+1]);u.length=0}}}function f(t){a(t(e))}function b(t,i=l){const s=[t,i];return n.add(s),n.size===1&&(r=o(a)||l),t(e),()=>{n.delete(s),n.size===0&&r&&(r(),r=null)}}return{set:a,update:f,subscribe:b}}function D(e,o,r){const n=!Array.isArray(e),a=n?[e]:e,f=o.length<2;return A(r,b=>{let t=!1;const i=[];let s=0,d=l;const g=()=>{if(s)return;d();const c=o(n?i[0]:i,b);f?b(c):d=z(c)?c:l},y=a.map((c,_)=>q(c,m=>{i[_]=m,s&=~(1<<_),t&&g()},()=>{s|=1<<_}));return t=!0,g(),function(){k(y),d(),t=!1}})}var p;const j=((p=globalThis.__sveltekit_1cdn3dg)==null?void 0:p.base)??"/journal";var h;const J=((h=globalThis.__sveltekit_1cdn3dg)==null?void 0:h.assets)??j;export{J as a,j as b,D as d,T as w};