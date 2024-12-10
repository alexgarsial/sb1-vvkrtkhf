import{r as C,a as o,j as e,m as h,R as S}from"./vendor-Br-37phW.js";import{l as G,n as M}from"./game-C3U5MxIO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();var v,j=C;v=j.createRoot,j.hydrateRoot;const P=["hearts","diamonds","clubs","spades"],L=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],I=()=>{const s=[];return P.forEach(t=>{L.forEach(r=>{s.push({suit:t,rank:r,value:R(r)})})}),E(s)},R=s=>s==="A"?1:s==="J"||s==="Q"||s==="K"?0:parseInt(s),E=s=>{const t=[...s];for(let r=t.length-1;r>0;r--){const l=Math.floor(Math.random()*(r+1));[t[r],t[l]]=[t[l],t[r]]}return t},A=s=>{let t=[],r=[...s],l=[];for(let a=0;a<4;a++){const n=r.shift();n.rank==="J"?l.push(n):t.push(n)}if(l.length>0)for(r=[...r,...l];t.length<4;){const a=r.shift();a.rank==="J"?r.push(a):t.push(a)}return{tableCards:t,updatedDeck:r}},O=(s,t,r)=>{const[l,a]=o.useState(null),[n,i]=o.useState(null),[u,m]=o.useState({deck:[],players:[{id:1,cards:[],capturedCards:[],score:0,name:"Player 1",matchPoints:0},{id:2,cards:[],capturedCards:[],score:0,name:s?"Ordinateur":"Player 2",matchPoints:0}],tableCards:[],currentPlayer:1,isGameOver:!1,jackOnTable:!1,selectedCards:[],selectedPlayerCard:null,discardPile:[],matchWinner:null,gameId:t,playerNumber:r}),d=o.useCallback(()=>{const c=I(),y=c.splice(0,4),f=c.splice(0,4),{tableCards:w,updatedDeck:N}=A(c),b=l===null?1:l===1?2:1;a(b),i(null),m(g=>({...g,deck:N,players:[{...g.players[0],cards:y,capturedCards:[],score:0},{...g.players[1],cards:f,capturedCards:[],score:0}],tableCards:w,currentPlayer:b,isGameOver:!1,jackOnTable:!1,selectedCards:[],selectedPlayerCard:null,discardPile:[]}))},[l]);return{gameState:u,playMove,initializeGame:d,startNewMatch}},T="https://votre-domaine.com/api";class _{constructor(){this.socket=null,this.gameId=null}connect(t,r){return this.socket=G(T,{query:{gameId:t,playerNumber:r}}),this.gameId=t,this.socket.on("connect",()=>{console.log("Connected to game server")}),this.socket}disconnect(){this.socket&&(this.socket.disconnect(),this.socket=null,this.gameId=null)}playCard(t,r){this.socket&&this.socket.emit("play_card",{gameId:this.gameId,card:t,capturedCards:r})}onGameStateUpdate(t){this.socket&&this.socket.on("game_state_update",t)}onPlayerJoined(t){this.socket&&this.socket.on("player_joined",t)}onPlayerLeft(t){this.socket&&this.socket.on("player_left",t)}}const p=new _,J=(s,t)=>{const[r,l]=o.useState(null),[a,n]=o.useState(!1),[i,u]=o.useState(null);o.useEffect(()=>{const d=p.connect(s,t);return d.on("connect",()=>{n(!0),u(null)}),d.on("connect_error",()=>{u("Impossible de se connecter au serveur"),n(!1)}),d.on("game_state_update",c=>{l(c)}),d.on("error",c=>{u(c)}),()=>{p.disconnect()}},[s,t]);const m=o.useCallback((d,c)=>{p.playCard(d,c)},[]);return{gameState:r,isConnected:a,error:i,playMove:m}},D=({isComputerOpponent:s=!1,gameId:t,playerNumber:r})=>{O(s,t,r);const{gameState:l,isConnected:a,error:n,playMove:i}=J(t||"",r||1);return e.jsx("div",{className:"min-h-screen bg-green-800 p-4",children:n&&e.jsx("div",{className:`fixed bottom-4 left-1/2 transform -translate-x-1/2 
          bg-red-600 text-white px-6 py-3 rounded-full shadow-lg`,children:n})})};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var U={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),x=(s,t)=>{const r=o.forwardRef(({color:l="currentColor",size:a=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:u="",children:m,...d},c)=>o.createElement("svg",{ref:c,...U,width:a,height:a,stroke:l,strokeWidth:i?Number(n)*24/Number(a):n,className:["lucide",`lucide-${q(s)}`,u].join(" "),...d},[...t.map(([y,f])=>o.createElement(y,f)),...Array.isArray(m)?m:[m]]));return r.displayName=`${s}`,r};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=x("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=x("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=x("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=x("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=x("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),W=({onSelectMode:s})=>e.jsx("div",{className:"min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-4",children:e.jsxs(h.div,{className:"bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800 mb-2",children:"Game of 11"}),e.jsx("p",{className:"text-gray-600",children:"Choisissez votre mode de jeu"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs(h.button,{className:"w-full bg-blue-600 text-white rounded-lg py-4 px-6 flex items-center gap-3",whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>s("computer"),children:[e.jsx(B,{className:"w-6 h-6"}),e.jsx("span",{className:"flex-1 text-left",children:"Jouer contre l'ordinateur"})]}),e.jsxs(h.button,{className:"w-full bg-green-600 text-white rounded-lg py-4 px-6 flex items-center gap-3",whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>s("multiplayer"),children:[e.jsx(k,{className:"w-6 h-6"}),e.jsx("span",{className:"flex-1 text-left",children:"Jouer à deux"})]})]})]})}),$=({gameId:s,onCancel:t,onStart:r})=>{const[l,a]=S.useState(!1);o.useEffect(()=>(p.connect(s,1).on("player_joined",()=>{r()}),()=>{p.disconnect()}),[s,r]);const n=()=>{navigator.clipboard.writeText(s),a(!0),setTimeout(()=>a(!1),2e3)};return e.jsx("div",{className:"fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",children:e.jsxs(h.div,{className:"bg-white rounded-xl shadow-2xl p-8 max-w-md w-full",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},children:[e.jsxs("div",{className:"flex items-center justify-center mb-6",children:[e.jsx(K,{className:"w-6 h-6 text-blue-600 animate-spin mr-3"}),e.jsx("h2",{className:"text-2xl font-bold",children:"En attente d'un autre joueur"})]}),e.jsxs("div",{className:"bg-gray-100 rounded-lg p-4 mb-6",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Code de la partie :"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("code",{className:"flex-1 bg-white px-4 py-2 rounded border border-gray-300 font-mono text-lg",children:s}),e.jsx("button",{onClick:n,className:"p-2 hover:bg-gray-200 rounded-lg transition-colors",title:"Copier le code",children:e.jsx(H,{className:"w-5 h-5 text-gray-600"})})]})]}),e.jsx("div",{className:"text-center text-gray-600 mb-6",children:e.jsx("p",{children:"Partagez ce code avec votre adversaire pour qu'il puisse rejoindre la partie."})}),e.jsx("button",{onClick:t,className:"w-full bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition-colors",children:"Annuler"}),l&&e.jsx(h.div,{className:"fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg",initial:{opacity:0,y:50},animate:{opacity:1,y:0},exit:{opacity:0,y:50},children:"Code copié !"})]})})},V=({onJoinGame:s})=>{const[t,r]=o.useState(""),[l,a]=o.useState(null),[n,i]=o.useState(null),u=()=>{const c=M(6).toUpperCase();a(c)},m=c=>{c.preventDefault(),t.length===6&&s(t.toUpperCase(),2)},d=()=>{a(null)};return l?e.jsx($,{gameId:l,onCancel:d,onStart:()=>s(l,1)}):e.jsx("div",{className:"min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-4",children:e.jsxs(h.div,{className:"bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800 mb-2",children:"Game of 11"}),e.jsx("p",{className:"text-gray-600",children:"Jouez avec un ami en ligne"})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs(h.button,{className:"w-full bg-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 font-semibold",whileHover:{scale:1.02},whileTap:{scale:.98},onClick:u,children:[e.jsx(k,{className:"w-5 h-5"}),"Créer une nouvelle partie"]}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-0 flex items-center",children:e.jsx("div",{className:"w-full border-t border-gray-300"})}),e.jsx("div",{className:"relative flex justify-center text-sm",children:e.jsx("span",{className:"px-2 bg-white text-gray-500",children:"ou"})})]}),e.jsxs("form",{onSubmit:m,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"gameCode",className:"block text-sm font-medium text-gray-700 mb-1",children:"Rejoindre avec un code"}),e.jsx("div",{className:"relative",children:e.jsx("input",{type:"text",id:"gameCode",maxLength:6,className:"block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center uppercase tracking-widest text-lg font-mono",placeholder:"ABC123",value:t,onChange:c=>r(c.target.value.toUpperCase())})})]}),e.jsxs(h.button,{type:"submit",className:"w-full bg-green-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 font-semibold disabled:opacity-50",disabled:t.length!==6,whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(z,{className:"w-5 h-5"}),"Rejoindre la partie"]})]})]}),n&&e.jsx(h.div,{className:"mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",initial:{opacity:0},animate:{opacity:1},children:n})]})})};function F(){const[s,t]=o.useState({mode:null,inGame:!1}),r=a=>{t({mode:a,inGame:a==="computer"})},l=(a,n)=>{t({mode:"multiplayer",inGame:!0,gameId:a,playerNumber:n})};return s.inGame?e.jsxs("div",{className:"min-h-screen bg-gray-100",children:[e.jsxs("header",{className:"bg-blue-600 text-white p-4 text-center",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Game of 11"}),e.jsx("p",{className:"text-sm mt-2",children:s.mode==="computer"?"Mode Ordinateur":"Mode Multijoueur"}),s.gameId&&e.jsxs("p",{className:"text-sm mt-1 bg-blue-700 inline-block px-3 py-1 rounded-full",children:["Code partie: ",s.gameId]})]}),e.jsx(D,{isComputerOpponent:s.mode==="computer",gameId:s.gameId,playerNumber:s.playerNumber})]}):s.mode==="multiplayer"?e.jsx(V,{onJoinGame:l}):e.jsx(W,{onSelectMode:r})}v(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(F,{})}));
