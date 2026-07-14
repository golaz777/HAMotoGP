var ft=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var m=(i,t)=>()=>(i&&(t=i(i=0)),t);var _t=(i,t)=>{for(var e in t)ft(i,e,{get:t[e],enumerable:!0})};var g=(i,t,e,s)=>{for(var o=s>1?void 0:s?se(t,e):t,r=i.length-1,n;r>=0;r--)(n=i[r])&&(o=(s?n(t,e,o):n(o))||o);return s&&o&&ft(t,e,o),o};var F,J,et,$t,U,yt,st,vt,ot,it=m(()=>{F=globalThis,J=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),$t=new WeakMap,U=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=$t.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$t.set(e,t))}return t}toString(){return this.cssText}},yt=i=>new U(typeof i=="string"?i:i+"",void 0,et),st=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,o,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new U(e,i,et)},vt=(i,t)=>{if(J)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),o=F.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},ot=J?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return yt(e)})(i):i});var oe,ie,re,ne,ae,le,G,bt,ce,he,I,N,X,xt,y,D=m(()=>{it();it();({is:oe,defineProperty:ie,getOwnPropertyDescriptor:re,getOwnPropertyNames:ne,getOwnPropertySymbols:ae,getPrototypeOf:le}=Object),G=globalThis,bt=G.trustedTypes,ce=bt?bt.emptyScript:"",he=G.reactiveElementPolyfillSupport,I=(i,t)=>i,N={toAttribute(i,t){switch(t){case Boolean:i=i?ce:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},X=(i,t)=>!oe(i,t),xt={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&ie(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){let{get:o,set:r}=re(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let l=o?.call(this);r?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=le(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,s=[...ne(e),...ae(e)];for(let o of s)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let o of s)e.unshift(ot(o))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let r=s.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:N;this._$Em=o;let l=n.fromAttribute(e,r.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(t,e,s,o=!1,r){if(t!==void 0){let n=this.constructor;if(o===!1&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??X)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,r]of s){let{wrapped:n}=r,l=this[o];n!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[I("elementProperties")]=new Map,y[I("finalized")]=new Map,he?.({ReactiveElement:y}),(G.reactiveElementVersions??=[]).push("2.1.2")});function Ht(i,t){if(!dt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return wt!==void 0?wt.createHTML(t):t}function L(i,t,e=i,s){if(t===k)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl,r=B(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=o:e._$Cl=o),o!==void 0&&(t=L(i,o._$AS(i,t.values),o,s)),t}var pt,At,Q,wt,Mt,x,Pt,pe,E,j,B,dt,de,rt,z,St,Ct,S,Et,kt,Lt,ut,d,Te,Me,k,c,Tt,C,ue,q,nt,K,H,at,lt,ct,ht,me,Rt,Y=m(()=>{pt=globalThis,At=i=>i,Q=pt.trustedTypes,wt=Q?Q.createPolicy("lit-html",{createHTML:i=>i}):void 0,Mt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+x,pe=`<${Pt}>`,E=document,j=()=>E.createComment(""),B=i=>i===null||typeof i!="object"&&typeof i!="function",dt=Array.isArray,de=i=>dt(i)||typeof i?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Ct=/>/g,S=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,kt=/"/g,Lt=/^(?:script|style|textarea|title)$/i,ut=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),d=ut(1),Te=ut(2),Me=ut(3),k=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Tt=new WeakMap,C=E.createTreeWalker(E,129);ue=(i,t)=>{let e=i.length-1,s=[],o,r=t===2?"<svg>":t===3?"<math>":"",n=z;for(let l=0;l<e;l++){let a=i[l],p,u,h=-1,_=0;for(;_<a.length&&(n.lastIndex=_,u=n.exec(a),u!==null);)_=n.lastIndex,n===z?u[1]==="!--"?n=St:u[1]!==void 0?n=Ct:u[2]!==void 0?(Lt.test(u[2])&&(o=RegExp("</"+u[2],"g")),n=S):u[3]!==void 0&&(n=S):n===S?u[0]===">"?(n=o??z,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?S:u[3]==='"'?kt:Et):n===kt||n===Et?n=S:n===St||n===Ct?n=z:(n=S,o=void 0);let b=n===S&&i[l+1].startsWith("/>")?" ":"";r+=n===z?a+pe:h>=0?(s.push(p),a.slice(0,h)+Mt+a.slice(h)+x+b):a+x+(h===-2?l:b)}return[Ht(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class i{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let r=0,n=0,l=t.length-1,a=this.parts,[p,u]=ue(t,e);if(this.el=i.createElement(p,s),C.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=C.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let h of o.getAttributeNames())if(h.endsWith(Mt)){let _=u[n++],b=o.getAttribute(h).split(x),W=/([.?@])?(.*)/.exec(_);a.push({type:1,index:r,name:W[2],strings:b,ctor:W[1]==="."?at:W[1]==="?"?lt:W[1]==="@"?ct:H}),o.removeAttribute(h)}else h.startsWith(x)&&(a.push({type:6,index:r}),o.removeAttribute(h));if(Lt.test(o.tagName)){let h=o.textContent.split(x),_=h.length-1;if(_>0){o.textContent=Q?Q.emptyScript:"";for(let b=0;b<_;b++)o.append(h[b],j()),C.nextNode(),a.push({type:2,index:++r});o.append(h[_],j())}}}else if(o.nodeType===8)if(o.data===Pt)a.push({type:2,index:r});else{let h=-1;for(;(h=o.data.indexOf(x,h+1))!==-1;)a.push({type:7,index:r}),h+=x.length-1}r++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};nt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??E).importNode(e,!0);C.currentNode=o;let r=C.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new K(r,r.nextSibling,this,t):a.type===1?p=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(p=new ht(r,this,t)),this._$AV.push(p),a=s[++l]}n!==a?.index&&(r=C.nextNode(),n++)}return C.currentNode=E,o}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},K=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),B(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):de(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(Ht(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{let r=new nt(o,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=Tt.get(t.strings);return e===void 0&&Tt.set(t.strings,e=new q(t)),e}k(t){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,o=0;for(let r of t)o===e.length?e.push(s=new i(this.O(j()),this.O(j()),this,this.options)):s=e[o],s._$AI(r),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=At(t).nextSibling;At(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,o){let r=this.strings,n=!1;if(r===void 0)t=L(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{let l=t,a,p;for(t=r[0],a=0;a<r.length-1;a++)p=L(this,l[s+a],e,a),p===k&&(p=this._$AH[a]),n||=!B(p)||p!==this._$AH[a],p===c?t=c:t!==c&&(t+=(p??"")+r[a+1]),this._$AH[a]=p}n&&!o&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},lt=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},ct=class extends H{constructor(t,e,s,o,r){super(t,e,s,o,r),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??c)===k)return;let s=this._$AH,o=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==c&&(s===c||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ht=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}},me=pt.litHtmlPolyfillSupport;me?.(q,K),(pt.litHtmlVersions??=[]).push("3.3.3");Rt=(i,t,e)=>{let s=e?.renderBefore??t,o=s._$litPart$;if(o===void 0){let r=e?.renderBefore??null;s._$litPart$=o=new K(t.insertBefore(j(),r),r,void 0,e??{})}return o._$AI(i),o}});var mt,f,ge,Ot=m(()=>{D();D();Y();Y();mt=globalThis,f=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};f._$litElement$=!0,f.finalized=!0,mt.litElementHydrateSupport?.({LitElement:f});ge=mt.litElementPolyfillSupport;ge?.({LitElement:f});(mt.litElementVersions??=[]).push("4.2.2")});var Ut=m(()=>{});var R=m(()=>{D();Y();Ot();Ut()});var A,It=m(()=>{A=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)}});function $(i){return(t,e)=>typeof e=="object"?_e(i,t,e):((s,o,r)=>{let n=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(o,r):void 0})(i,t,e)}var fe,_e,gt=m(()=>{D();fe={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:X},_e=(i=fe,t,e)=>{let{kind:s,metadata:o}=e,r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,i,!0,l)}}throw Error("Unsupported decorator location: "+s)}});function v(i){return $({...i,state:!0,attribute:!1})}var Nt=m(()=>{gt();});var Dt=m(()=>{});var O=m(()=>{});var zt=m(()=>{O();});var jt=m(()=>{O();});var Bt=m(()=>{O();});var qt=m(()=>{O();});var Kt=m(()=>{O();});var V=m(()=>{It();gt();Nt();Dt();zt();jt();Bt();qt();Kt()});var Yt={};_t(Yt,{NextEventCardEditor:()=>T});var T,Zt=m(()=>{"use strict";R();V();T=class extends f{setConfig(t){this._config=t}_selectedClass(){let t=this._config.classes;return t&&t.length===1?t[0]:"all"}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return this._config?d`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Entity
          <input
            .value=${this._config.entity??"sensor.motogp_next_event"}
            @change=${t=>this._emit({entity:t.target.value})}
          />
        </label>
        <label>
          Title (optional)
          <input
            .value=${this._config.title??""}
            @change=${t=>this._emit({title:t.target.value||void 0})}
          />
        </label>
        <label>
          Classes
          <select
            .value=${this._selectedClass()}
            @change=${t=>{let e=t.target.value;this._emit({classes:e==="all"?void 0:[e]})}}
          >
            <option value="all">All classes</option>
            <option value="MGP">MotoGP only</option>
            <option value="MT2">Moto2 only</option>
            <option value="MT3">Moto3 only</option>
          </select>
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_circuit!==!1}
            @change=${t=>this._emit({show_circuit:t.target.checked})} />
          Show circuit data
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_track_map!==!1}
            @change=${t=>this._emit({show_track_map:t.target.checked})} />
          Show track map
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_countdown!==!1}
            @change=${t=>this._emit({show_countdown:t.target.checked})} />
          Show live countdown
        </label>
      </div>
    `:c}};g([$({attribute:!1})],T.prototype,"hass",2),g([v()],T.prototype,"_config",2),T=g([A("motogp-next-event-card-editor")],T)});var te={};_t(te,{ResultsCardEditor:()=>P});var be,P,ee=m(()=>{"use strict";R();V();be=["motogp","moto2","moto3"],P=class extends f{setConfig(t){this._config=t}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){if(!this._config)return c;let t=this._config.default_class??"motogp";return d`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Title (optional)
          <input .value=${this._config.title??""}
            @change=${e=>this._emit({title:e.target.value||void 0})} />
        </label>
        <label>
          Default class
          <select @change=${e=>this._emit({default_class:e.target.value})}>
            ${be.map(e=>d`<option value=${e} ?selected=${e===t}>${e}</option>`)}
          </select>
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_standings!==!1}
            @change=${e=>this._emit({show_standings:e.target.checked})} />
          Show standings
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_podium!==!1}
            @change=${e=>this._emit({show_podium:e.target.checked})} />
          Show latest podium
        </label>
      </div>
    `}};g([$({attribute:!1})],P.prototype,"hass",2),g([v()],P.prototype,"_config",2),P=g([A("motogp-results-card-editor")],P)});R();V();R();var tt=st`
  :host {
    --mgp-gap: 12px;
    --mgp-red: #e2001a;
    --mgp-red-dark: #a30013;
  }
  ha-card {
    padding: 16px;
    display: block;
  }
  /* Next-event card bleeds its hero to the edges. */
  ha-card.event {
    padding: 0;
    overflow: hidden;
  }

  /* --- Hero header --------------------------------------------------- */
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    background: linear-gradient(135deg, var(--mgp-red), var(--mgp-red-dark));
    color: #fff;
  }
  /* thin checkered speed strip under the hero */
  .hero::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-image: repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.55) 0 8px,
      rgba(255, 255, 255, 0.85) 8px 16px
    );
    opacity: 0.55;
  }
  .flag {
    font-size: 2rem;
    line-height: 1;
    flex: 0 0 auto;
  }
  .hero-name {
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1.15;
    color: #fff;
  }
  .countdown {
    margin-left: auto;
    flex: 0 0 auto;
    align-self: flex-start;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    font-size: 0.85rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    padding: 4px 12px;
    white-space: nowrap;
  }

  /* --- Body ---------------------------------------------------------- */
  .body { padding: 16px 20px 18px; }
  /* Optional plain title (config.title) sits above the hero. */
  .title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--primary-text-color);
    padding: 14px 20px 0;
  }
  .sub {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
  .track-map {
    display: block;
    width: 100%;
    max-width: 420px;
    margin: 12px auto 4px;
    border-radius: 10px;
    background: #111;
  }
  .pill {
    background: var(--secondary-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 999px;
    padding: 3px 11px;
    font-size: 0.78rem;
    color: var(--primary-text-color);
  }
  .day {
    margin-top: 16px;
    font-weight: 700;
    color: var(--primary-text-color);
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--mgp-red);
  }
  .row {
    display: grid;
    grid-template-columns: 4.5rem 3.4rem 1fr;
    align-items: center;
    gap: 10px;
    padding: 9px 8px;
    border-radius: 8px;
    border-left: 3px solid transparent;
  }
  .row:hover { background: var(--secondary-background-color); }
  .row.next {
    border-left-color: var(--mgp-red);
    background: color-mix(in srgb, var(--mgp-red) 10%, transparent);
  }
  .time {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .chip {
    color: #fff;
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 0.7rem;
    letter-spacing: 0.02em;
    text-align: center;
    font-weight: 700;
  }
  .session {
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .next-tag {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--mgp-red);
    border: 1px solid var(--mgp-red);
    border-radius: 999px;
    padding: 1px 6px;
    line-height: 1.4;
  }
  .empty { color: var(--secondary-text-color); font-style: italic; }
  table.standings { width: 100%; border-collapse: collapse; }
  table.standings td, table.standings th {
    padding: 4px 6px; text-align: left; border-bottom: 1px solid var(--divider-color);
  }
  table.standings td.pts, table.standings th.pts { text-align: right; }
  .podium-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
  .swatch { width: 4px; height: 1.2em; border-radius: 2px; }
  .tabs { display: flex; gap: 6px; margin: 8px 0; }
  .tab {
    cursor: pointer; padding: 4px 10px; border-radius: 14px;
    background: var(--secondary-background-color); color: var(--primary-text-color);
    font-size: 0.85rem; border: none;
  }
  .tab[aria-selected="true"] { background: var(--primary-color); color: #fff; }
`;function Vt(i,t=new Date){let e=new Date(i).getTime();if(Number.isNaN(e))return"";let s=e-t.getTime();if(s<=0)return"Race weekend under way";let o=Math.floor(s/1e3),r=Math.floor(o/86400),n=Math.floor(o%86400/3600),l=Math.floor(o%3600/60),a=o%60,p=u=>String(u).padStart(2,"0");return r>0?`In ${r}d ${p(n)}:${p(l)}:${p(a)}`:`In ${p(n)}:${p(l)}:${p(a)}`}function Wt(i,t){if(!t||t.length===0)return i.slice();let e=new Set(t);return i.filter(s=>e.has(s.class))}function Ft(i,t="en",e){let s=new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long",...e?{timeZone:e}:{}}),o=[],r;for(let n of i){let l=s.format(new Date(n.start));(!r||r.label!==l)&&(r={label:l,items:[]},o.push(r)),r.items.push(n)}return o}function Jt(i,t=new Date){let e=t.getTime();return i.findIndex(s=>new Date(s.start).getTime()>=e)}var Xt={MGP:"#e2001a",MT2:"#0090d4",MT3:"#00a651"},$e={ducati:"#cc0000",aprilia:"#0a0a5e",ktm:"#ff6600",gasgas:"#cc0000",honda:"#003da5",yamaha:"#0a3d91",vr46:"#ffcf00",gresini:"#00a0d6",trackhouse:"#1a1a1a",tech3:"#0091d0",pramac:"#6a1b9a",lcr:"#e30613"},Gt="#8a8a8a";function Qt(i,t){if(!i)return Gt;let e=i.toLowerCase(),s=[t??{},$e];for(let o of s)for(let r of Object.keys(o))if(e.includes(r.toLowerCase()))return o[r];return Gt}var ye={RACE:"\u{1F3C1}",SPRINT:"\u26A1"};function ve(i){if(!i||i.length!==2)return"";let t=127462;return String.fromCodePoint(...[...i.toUpperCase()].map(e=>t+e.charCodeAt(0)-65))}var M=class extends f{static getStubConfig(){return{type:"custom:motogp-next-event-card",entity:"sensor.motogp_next_event"}}static async getConfigElement(){return await Promise.resolve().then(()=>(Zt(),Yt)),document.createElement("motogp-next-event-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity:"sensor.motogp_next_event",show_circuit:!0,show_track_map:!0,show_countdown:!0,...t}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this.requestUpdate(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){if(!this._config||!this.hass)return c;let t=this.hass.states[this._config.entity??"sensor.motogp_next_event"];if(!t||t.state==="unavailable"||t.state==="unknown")return d`<ha-card><div class="body"><div class="empty">MotoGP next-event sensor unavailable.</div></div></ha-card>`;let e=t.attributes,s=e.circuit_info??{},o=e.name??"Next Grand Prix",r=this._config.show_countdown!==!1&&e.date_start?Vt(e.date_start):"",n=Wt(e.schedule??[],this._config.classes),l=Jt(n),a=Ft(n,this.hass.locale?.language),p=0;return d`
      <ha-card class="event">
        ${this._config.title?d`<div class="title">${this._config.title}</div>`:c}
        <div class="hero">
          <span class="flag">${ve(s.country_code)}</span>
          <span class="hero-name">${o}</span>
          ${r?d`<span class="countdown">${r}</span>`:c}
        </div>
        <div class="body">
          <div class="sub">
            📍 ${e.circuit??""}${e.city?`, ${e.city}`:""}
          </div>
          ${this._config.show_circuit!==!1?this._circuit(s):c}
          ${this._config.show_track_map!==!1&&s.track_map?d`<img
                class="track-map"
                src=${s.track_map}
                alt="${e.circuit??"Circuit"} layout"
                loading="lazy"
              />`:c}
          ${n.length===0?d`<div class="empty">Schedule not available yet.</div>`:a.map(u=>d`
                  <div class="day">${u.label}</div>
                  ${u.items.map(h=>{let _=p++===l;return d`
                      <div class="row ${_?"next":""}">
                        <span class="time">
                          ${new Date(h.start).toLocaleTimeString(this.hass.locale?.language,{hour:"2-digit",minute:"2-digit"})}
                        </span>
                        <span class="chip" style="background:${Xt[h.class]}"
                          >${h.class}</span
                        >
                        <span class="session">
                          ${ye[h.kind]??""} ${h.session}
                          ${_?d`<span class="next-tag">NEXT</span>`:c}
                        </span>
                      </div>
                    `})}
                `)}
        </div>
      </ha-card>
    `}_circuit(t){let e=[];return t.length_km&&e.push(`${t.length_km} km`),t.corners&&e.push(`${t.corners} corners (${t.left_corners??0}L/${t.right_corners??0}R)`),t.longest_straight_m&&e.push(`${t.longest_straight_m} m straight`),t.width_m&&e.push(`${t.width_m} m wide`),t.designer&&e.push(`${t.designer}`),t.constructed&&e.push(`Built ${t.constructed}`),e.length===0?c:d`<div class="pills">${e.map(s=>d`<span class="pill">${s}</span>`)}</div>`}};M.styles=tt,g([$({attribute:!1})],M.prototype,"hass",2),g([v()],M.prototype,"_config",2),M=g([A("motogp-next-event-card")],M);R();V();var xe={motogp:"MotoGP",moto2:"Moto2",moto3:"Moto3"},Ae={1:"\u{1F947}",2:"\u{1F948}",3:"\u{1F949}"},w=class extends f{constructor(){super(...arguments);this._selected="motogp"}static getStubConfig(){return{type:"custom:motogp-results-card"}}static async getConfigElement(){return await Promise.resolve().then(()=>(ee(),te)),document.createElement("motogp-results-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={classes:["motogp","moto2","moto3"],show_standings:!0,show_podium:!0,default_class:"motogp",...e},this._selected=this._config.default_class??"motogp"}getCardSize(){return 6}render(){if(!this._config||!this.hass)return c;let e=this._config.classes??["motogp","moto2","moto3"],s=this._selected;return d`
      <ha-card>
        ${this._config.title?d`<div class="title">${this._config.title}</div>`:c}
        <div class="tabs" role="tablist">
          ${e.map(o=>d`<button
              class="tab" role="tab"
              aria-selected=${o===s?"true":"false"}
              @click=${()=>this._selected=o}
            >${xe[o]}</button>`)}
        </div>
        ${this._config.show_standings!==!1?this._standings(s):c}
        ${this._config.show_podium!==!1?this._podium(s):c}
      </ha-card>
    `}_standings(e){let o=this.hass.states[`sensor.motogp_${e}_standings`]?.attributes?.standings??[];return o.length===0?d`<div class="empty">No standings.</div>`:d`
      <table class="standings">
        <tr><th>#</th><th>Rider</th><th class="pts">Pts</th></tr>
        ${o.map(r=>d`<tr>
            <td>${r.position}</td>
            <td>${r.rider}</td>
            <td class="pts"><strong>${r.points}</strong></td>
          </tr>`)}
      </table>
    `}_podium(e){let o=this.hass.states[`sensor.motogp_${e}_latest_result`]?.attributes,r=o?.podium??[];return r.length===0?c:d`
      <div class="day">${o.event??"Latest result"}</div>
      ${r.map(n=>d`<div class="podium-row">
          <span class="swatch" style="background:${Qt(n.team,this._config.team_colors)}"></span>
          <span>${Ae[n.position]??n.position}</span>
          <strong>${n.rider}</strong>
          <span class="sub">${n.team??""}</span>
        </div>`)}
    `}};w.styles=tt,g([$({attribute:!1})],w.prototype,"hass",2),g([v()],w.prototype,"_config",2),g([v()],w.prototype,"_selected",2),w=g([A("motogp-results-card")],w);window.customCards=window.customCards??[];window.customCards.push({type:"motogp-next-event-card",name:"MotoGP Next Event",description:"Circuit data and the full weekend schedule for all three classes."},{type:"motogp-results-card",name:"MotoGP Results",description:"Championship standings and the latest podium, per class."});
