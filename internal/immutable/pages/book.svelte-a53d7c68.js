import{S as q,i as z,N as J,O as te,P as ne,l as w,w as D,m as S,n as E,x as M,h as g,p as F,b as L,y as V,Q as re,f as m,t as p,B as j,a as B,c as I,M as $,g as N,R as ae,T as ie,d as O,U as T,r as U,u as W,V as le,H as se,v as Q,W as ue,s as fe,e as Y,E as G}from"../chunks/index-8e1ea7fc.js";import{E as ce,M as de,U as _e,c as he,j as me,s as ge,C as oe,r as pe}from"../chunks/remoteStorageState-0b024036.js";import{l as $e,g as ve,L as be}from"../chunks/Layout-6f72e75c.js";import"../chunks/preload-helper-b6d3926a.js";function ke(l){let e,n,t,r;function d(i){l[4](i)}let u={readOnly:!0,autoFocus:l[3],placeholder:l[2]};return l[0]!==void 0&&(u.value=l[0]),n=new ce({props:u}),te.push(()=>ne(n,"value",d)),{c(){e=w("div"),D(n.$$.fragment),this.h()},l(i){e=S(i,"DIV",{id:!0});var a=E(e);M(n.$$.fragment,a),a.forEach(g),this.h()},h(){F(e,"id",l[1])},m(i,a){L(i,e,a),V(n,e,null),r=!0},p(i,[a]){const f={};a&8&&(f.autoFocus=i[3]),a&4&&(f.placeholder=i[2]),!t&&a&1&&(t=!0,f.value=i[0],re(()=>t=!1)),n.$set(f),(!r||a&2)&&F(e,"id",i[1])},i(i){r||(m(n.$$.fragment,i),r=!0)},o(i){p(n.$$.fragment,i),r=!1},d(i){i&&g(e),j(n)}}}function ye(l,e,n){let{id:t=void 0}=e,{value:r}=e,{placeholder:d=""}=e,{autoFocus:u=!1}=e;function i(a){r=a,n(0,r)}return l.$$set=a=>{"id"in a&&n(1,t=a.id),"value"in a&&n(0,r=a.value),"placeholder"in a&&n(2,d=a.placeholder),"autoFocus"in a&&n(3,u=a.autoFocus)},l.$$.update=()=>{l.$$.dirty&1&&(!r||r.length===0)&&n(0,r=[{type:"paragraph",children:[{text:""}]}])},[r,t,d,u,i]}class we extends q{constructor(e){super(),z(this,e,ye,ke,J,{id:1,value:0,placeholder:2,autoFocus:3})}}function K(l,e,n){const t=l.slice();return t[4]=e[n],t}function X(l,e){let n,t,r,d=e[4].createdAt.toLocaleTimeString()+"",u,i,a=e[4].location?` - ${e[4].location}`:"",f,c,o,s,y,b,_,h,A,C;return s=new de({}),b=new we({props:{value:e[4].content}}),{key:l,first:null,c(){n=w("div"),t=w("h3"),r=w("span"),u=U(d),i=B(),f=U(a),c=B(),o=w("div"),D(s.$$.fragment),y=B(),D(b.$$.fragment),_=B(),this.h()},l(v){n=S(v,"DIV",{});var k=E(n);t=S(k,"H3",{class:!0});var P=E(t);r=S(P,"SPAN",{});var H=E(r);u=W(H,d),i=I(H),f=W(H,a),H.forEach(g),c=I(P),o=S(P,"DIV",{class:!0});var R=E(o);M(s.$$.fragment,R),R.forEach(g),P.forEach(g),y=I(k),M(b.$$.fragment,k),_=I(k),k.forEach(g),this.h()},h(){F(o,"class","w-6 h-6 opacity-0 group-hover:opacity-100"),F(t,"class","text-lg font-bold py-1 cursor-pointer hover:bg-gray-300 flex justify-between group"),this.first=n},m(v,k){L(v,n,k),$(n,t),$(t,r),$(r,u),$(r,i),$(r,f),$(t,c),$(t,o),V(s,o,null),$(n,y),V(b,n,null),$(n,_),h=!0,A||(C=le(t,"click",function(){se(e[2](e[4]))&&e[2](e[4]).apply(this,arguments)}),A=!0)},p(v,k){e=v,(!h||k&1)&&d!==(d=e[4].createdAt.toLocaleTimeString()+"")&&Q(u,d),(!h||k&1)&&a!==(a=e[4].location?` - ${e[4].location}`:"")&&Q(f,a);const P={};k&1&&(P.value=e[4].content),b.$set(P)},i(v){h||(m(s.$$.fragment,v),m(b.$$.fragment,v),h=!0)},o(v){p(s.$$.fragment,v),p(b.$$.fragment,v),h=!1},d(v){v&&g(n),j(s),j(b),A=!1,C()}}}function Z(l){let e;return{c(){e=U("Loading...")},l(n){e=W(n,"Loading...")},m(n,t){L(n,e,t)},d(n){n&&g(e)}}}function Se(l){let e,n,t=[],r=new Map,d,u,i=l[0];const a=c=>c[4].id;for(let c=0;c<i.length;c+=1){let o=K(l,i,c),s=a(o);r.set(s,t[c]=X(s,o))}let f=l[1]&&!l[0].length&&Z();return{c(){e=w("div"),n=w("div");for(let c=0;c<t.length;c+=1)t[c].c();d=B(),f&&f.c(),this.h()},l(c){e=S(c,"DIV",{class:!0});var o=E(e);n=S(o,"DIV",{class:!0});var s=E(n);for(let y=0;y<t.length;y+=1)t[y].l(s);s.forEach(g),d=I(o),f&&f.l(o),o.forEach(g),this.h()},h(){F(n,"class","grid grid-cols-1 divide-y-2"),F(e,"class","container mx-auto bg-white p-8 my-2")},m(c,o){L(c,e,o),$(e,n);for(let s=0;s<t.length;s+=1)t[s].m(n,null);$(e,d),f&&f.m(e,null),u=!0},p(c,[o]){o&5&&(i=c[0],N(),t=ae(t,o,a,1,c,i,r,n,ie,X,null,K),O()),c[1]&&!c[0].length?f||(f=Z(),f.c(),f.m(e,null)):f&&(f.d(1),f=null)},i(c){if(!u){for(let o=0;o<i.length;o+=1)m(t[o]);u=!0}},o(c){for(let o=0;o<t.length;o+=1)p(t[o]);u=!1},d(c){c&&g(e);for(let o=0;o<t.length;o+=1)t[o].d();f&&f.d()}}}function Ee(l,e,n){let t;T(l,$e,i=>n(1,t=i));let{entries:r}=e,{onSelect:d}=e;function u(i){return()=>d(i)}return l.$$set=i=>{"entries"in i&&n(0,r=i.entries),"onSelect"in i&&n(3,d=i.onSelect)},[r,t,u,d]}class De extends q{constructor(e){super(),z(this,e,Ee,Se,J,{entries:0,onSelect:3})}}function x(l){let e,n;return e=new oe({props:{months:!1}}),{c(){D(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){V(e,t,r),n=!0},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){j(e,t)}}}function ee(l){let e,n;return e=new oe({props:{months:!1}}),{c(){D(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){V(e,t,r),n=!0},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){j(e,t)}}}function Me(l){let e,n,t,r,d,u,i,a,f,c;ue(l[7]);let o=l[2]>=640&&x();t=new De({props:{entries:l[3],onSelect:l[4]}});let s=l[2]<640&&ee();function y(_){l[8](_)}let b={journalEntry:l[0]};return l[1]!==void 0&&(b.open=l[1]),u=new _e({props:b}),te.push(()=>ne(u,"open",y)),{c(){e=w("div"),o&&o.c(),n=B(),D(t.$$.fragment),r=B(),s&&s.c(),d=B(),D(u.$$.fragment),this.h()},l(_){e=S(_,"DIV",{class:!0});var h=E(e);o&&o.l(h),n=I(h),M(t.$$.fragment,h),r=I(h),s&&s.l(h),h.forEach(g),d=I(_),M(u.$$.fragment,_),this.h()},h(){F(e,"class","flex flex-col flex-grow pb-[80px]")},m(_,h){L(_,e,h),o&&o.m(e,null),$(e,n),V(t,e,null),$(e,r),s&&s.m(e,null),L(_,d,h),V(u,_,h),a=!0,f||(c=le(window,"resize",l[7]),f=!0)},p(_,[h]){_[2]>=640?o?h&4&&m(o,1):(o=x(),o.c(),m(o,1),o.m(e,n)):o&&(N(),p(o,1,1,()=>{o=null}),O());const A={};h&8&&(A.entries=_[3]),t.$set(A),_[2]<640?s?h&4&&m(s,1):(s=ee(),s.c(),m(s,1),s.m(e,null)):s&&(N(),p(s,1,1,()=>{s=null}),O());const C={};h&1&&(C.journalEntry=_[0]),!i&&h&2&&(i=!0,C.open=_[1],re(()=>i=!1)),u.$set(C)},i(_){a||(m(o),m(t.$$.fragment,_),m(s),m(u.$$.fragment,_),a=!0)},o(_){p(o),p(t.$$.fragment,_),p(s),p(u.$$.fragment,_),a=!1},d(_){_&&g(e),o&&o.d(),j(t),s&&s.d(),_&&g(d),j(u,_),f=!1,c()}}}function Ve(l,e,n){let t,r,d;T(l,he,s=>n(5,r=s)),T(l,me,s=>n(6,d=s));let u,i=!1,a=1024;function f(s){n(0,u=s),n(1,i=!0)}function c(){n(2,a=window.innerWidth)}function o(s){i=s,n(1,i)}return l.$$.update=()=>{l.$$.dirty&32&&ge(r),l.$$.dirty&96&&n(3,t=(d[ve(r)]||{})[r.getDate()]||[])},[u,i,a,t,f,r,d,c,o]}class je extends q{constructor(e){super(),z(this,e,Ve,Me,J,{})}}function Be(l){let e,n;return{c(){e=w("h3"),n=U("Please connect to a Storage Provider"),this.h()},l(t){e=S(t,"H3",{class:!0});var r=E(e);n=W(r,"Please connect to a Storage Provider"),r.forEach(g),this.h()},h(){F(e,"class","text-center py-8 text-lg")},m(t,r){L(t,e,r),$(e,n)},i:G,o:G,d(t){t&&g(e)}}}function Ie(l){let e,n;return e=new je({}),{c(){D(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){V(e,t,r),n=!0},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){j(e,t)}}}function Fe(l){let e,n,t,r;const d=[Ie,Be],u=[];function i(a,f){return a[0].storage==="connected"?0:1}return e=i(l),n=u[e]=d[e](l),{c(){n.c(),t=Y()},l(a){n.l(a),t=Y()},m(a,f){u[e].m(a,f),L(a,t,f),r=!0},p(a,f){let c=e;e=i(a),e!==c&&(N(),p(u[c],1,1,()=>{u[c]=null}),O(),n=u[e],n||(n=u[e]=d[e](a),n.c()),m(n,1),n.m(t.parentNode,t))},i(a){r||(m(n),r=!0)},o(a){p(n),r=!1},d(a){u[e].d(a),a&&g(t)}}}function Le(l){let e,n;return e=new be({props:{$$slots:{default:[Fe]},$$scope:{ctx:l}}}),{c(){D(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,r){V(e,t,r),n=!0},p(t,[r]){const d={};r&3&&(d.$$scope={dirty:r,ctx:t}),e.$set(d)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){j(e,t)}}}function Pe(l,e,n){let t;return T(l,pe,r=>n(0,t=r)),[t]}class Oe extends q{constructor(e){super(),z(this,e,Pe,Le,fe,{})}}export{Oe as default};
