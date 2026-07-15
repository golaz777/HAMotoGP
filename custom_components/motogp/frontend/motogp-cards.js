var At=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var g=(i,t)=>()=>(i&&(t=i(i=0)),t);var ct=(i,t)=>{for(var e in t)At(i,e,{get:t[e],enumerable:!0})};var u=(i,t,e,s)=>{for(var n=s>1?void 0:s?ce(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(n=(s?r(t,e,n):r(n))||n);return s&&n&&At(t,e,n),n};var Z,tt,pt,Ct,j,St,B,Et,dt,ht=g(()=>{Z=globalThis,tt=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),Ct=new WeakMap,j=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(tt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ct.set(e,t))}return t}toString(){return this.cssText}},St=i=>new j(typeof i=="string"?i:i+"",void 0,pt),B=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new j(e,i,pt)},Et=(i,t)=>{if(tt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),n=Z.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},dt=tt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return St(e)})(i):i});var pe,de,he,ue,me,ge,et,kt,fe,_e,q,K,st,Tt,x,F=g(()=>{ht();ht();({is:pe,defineProperty:de,getOwnPropertyDescriptor:he,getOwnPropertyNames:ue,getOwnPropertySymbols:me,getPrototypeOf:ge}=Object),et=globalThis,kt=et.trustedTypes,fe=kt?kt.emptyScript:"",_e=et.reactiveElementPolyfillSupport,q=(i,t)=>i,K={toAttribute(i,t){switch(t){case Boolean:i=i?fe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},st=(i,t)=>!pe(i,t),Tt={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:st};Symbol.metadata??=Symbol("metadata"),et.litPropertyMetadata??=new WeakMap;x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&de(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){let{get:n,set:o}=he(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){let c=n?.call(this);o?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Tt}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;let t=ge(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){let e=this.properties,s=[...ue(e),...me(e)];for(let n of s)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let n of s)e.unshift(dt(n))}else t!==void 0&&e.push(dt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Et(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:K).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let o=s.getPropertyOptions(n),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:K;this._$Em=n;let c=r.fromAttribute(e,o.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,s,n=!1,o){if(t!==void 0){let r=this.constructor;if(n===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??st)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:r}=o,c=this[n];r!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[q("elementProperties")]=new Map,x[q("finalized")]=new Map,_e?.({ReactiveElement:x}),(et.reactiveElementVersions??=[]).push("2.1.2")});function zt(i,t){if(!vt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lt!==void 0?Lt.createHTML(t):t}function N(i,t,e=i,s){if(t===M)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl,o=J(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=N(i,n._$AS(i,t.values),n,s)),t}var yt,Mt,nt,Lt,Nt,w,Ut,$e,T,W,J,vt,ye,ut,V,It,Rt,E,Ht,Pt,Dt,bt,l,De,ze,M,a,Ot,k,ve,X,mt,G,U,gt,ft,_t,$t,be,jt,it=g(()=>{yt=globalThis,Mt=i=>i,nt=yt.trustedTypes,Lt=nt?nt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Nt="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+w,$e=`<${Ut}>`,T=document,W=()=>T.createComment(""),J=i=>i===null||typeof i!="object"&&typeof i!="function",vt=Array.isArray,ye=i=>vt(i)||typeof i?.[Symbol.iterator]=="function",ut=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,It=/-->/g,Rt=/>/g,E=RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ht=/'/g,Pt=/"/g,Dt=/^(?:script|style|textarea|title)$/i,bt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=bt(1),De=bt(2),ze=bt(3),M=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),Ot=new WeakMap,k=T.createTreeWalker(T,129);ve=(i,t)=>{let e=i.length-1,s=[],n,o=t===2?"<svg>":t===3?"<math>":"",r=V;for(let c=0;c<e;c++){let p=i[c],d,m,h=-1,f=0;for(;f<p.length&&(r.lastIndex=f,m=r.exec(p),m!==null);)f=r.lastIndex,r===V?m[1]==="!--"?r=It:m[1]!==void 0?r=Rt:m[2]!==void 0?(Dt.test(m[2])&&(n=RegExp("</"+m[2],"g")),r=E):m[3]!==void 0&&(r=E):r===E?m[0]===">"?(r=n??V,h=-1):m[1]===void 0?h=-2:(h=r.lastIndex-m[2].length,d=m[1],r=m[3]===void 0?E:m[3]==='"'?Pt:Ht):r===Pt||r===Ht?r=E:r===It||r===Rt?r=V:(r=E,n=void 0);let b=r===E&&i[c+1].startsWith("/>")?" ":"";o+=r===V?p+$e:h>=0?(s.push(d),p.slice(0,h)+Nt+p.slice(h)+w+b):p+w+(h===-2?c:b)}return[zt(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},X=class i{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,r=0,c=t.length-1,p=this.parts,[d,m]=ve(t,e);if(this.el=i.createElement(d,s),k.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=k.nextNode())!==null&&p.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(Nt)){let f=m[r++],b=n.getAttribute(h).split(w),S=/([.?@])?(.*)/.exec(f);p.push({type:1,index:o,name:S[2],strings:b,ctor:S[1]==="."?gt:S[1]==="?"?ft:S[1]==="@"?_t:U}),n.removeAttribute(h)}else h.startsWith(w)&&(p.push({type:6,index:o}),n.removeAttribute(h));if(Dt.test(n.tagName)){let h=n.textContent.split(w),f=h.length-1;if(f>0){n.textContent=nt?nt.emptyScript:"";for(let b=0;b<f;b++)n.append(h[b],W()),k.nextNode(),p.push({type:2,index:++o});n.append(h[f],W())}}}else if(n.nodeType===8)if(n.data===Ut)p.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf(w,h+1))!==-1;)p.push({type:7,index:o}),h+=w.length-1}o++}}static createElement(t,e){let s=T.createElement("template");return s.innerHTML=t,s}};mt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);k.currentNode=n;let o=k.nextNode(),r=0,c=0,p=s[0];for(;p!==void 0;){if(r===p.index){let d;p.type===2?d=new G(o,o.nextSibling,this,t):p.type===1?d=new p.ctor(o,p.name,p.strings,this,t):p.type===6&&(d=new $t(o,this,t)),this._$AV.push(d),p=s[++c]}r!==p?.index&&(o=k.nextNode(),r++)}return k.currentNode=T,n}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},G=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=N(this,t,e),J(t)?t===a||t==null||t===""?(this._$AH!==a&&this._$AR(),this._$AH=a):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ye(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==a&&J(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=X.createElement(zt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{let o=new mt(n,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=Ot.get(t.strings);return e===void 0&&Ot.set(t.strings,e=new X(t)),e}k(t){vt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,n=0;for(let o of t)n===e.length?e.push(s=new i(this.O(W()),this.O(W()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Mt(t).nextSibling;Mt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,o){this.type=1,this._$AH=a,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=a}_$AI(t,e=this,s,n){let o=this.strings,r=!1;if(o===void 0)t=N(this,t,e,0),r=!J(t)||t!==this._$AH&&t!==M,r&&(this._$AH=t);else{let c=t,p,d;for(t=o[0],p=0;p<o.length-1;p++)d=N(this,c[s+p],e,p),d===M&&(d=this._$AH[p]),r||=!J(d)||d!==this._$AH[p],d===a?t=a:t!==a&&(t+=(d??"")+o[p+1]),this._$AH[p]=d}r&&!n&&this.j(t)}j(t){t===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},gt=class extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===a?void 0:t}},ft=class extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==a)}},_t=class extends U{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){if((t=N(this,t,e,0)??a)===M)return;let s=this._$AH,n=t===a&&s!==a||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==a&&(s===a||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},$t=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}},be=yt.litHtmlPolyfillSupport;be?.(X,G),(yt.litHtmlVersions??=[]).push("3.3.3");jt=(i,t,e)=>{let s=e?.renderBefore??t,n=s._$litPart$;if(n===void 0){let o=e?.renderBefore??null;s._$litPart$=n=new G(t.insertBefore(W(),o),o,void 0,e??{})}return n._$AI(i),n}});var xt,_,xe,Bt=g(()=>{F();F();it();it();xt=globalThis,_=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};_._$litElement$=!0,_.finalized=!0,xt.litElementHydrateSupport?.({LitElement:_});xe=xt.litElementPolyfillSupport;xe?.({LitElement:_});(xt.litElementVersions??=[]).push("4.2.2")});var qt=g(()=>{});var A=g(()=>{F();it();Bt();qt()});var v,Kt=g(()=>{v=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)}});function $(i){return(t,e)=>typeof e=="object"?Ae(i,t,e):((s,n,o)=>{let r=n.hasOwnProperty(o);return n.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(n,o):void 0})(i,t,e)}var we,Ae,wt=g(()=>{F();we={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:st},Ae=(i=we,t,e)=>{let{kind:s,metadata:n}=e,o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){let{name:r}=e;return{set(c){let p=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,p,i,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,i,c),c}}}if(s==="setter"){let{name:r}=e;return function(c){let p=this[r];t.call(this,c),this.requestUpdate(r,p,i,!0,c)}}throw Error("Unsupported decorator location: "+s)}});function y(i){return $({...i,state:!0,attribute:!1})}var Ft=g(()=>{wt();});var Vt=g(()=>{});var D=g(()=>{});var Wt=g(()=>{D();});var Jt=g(()=>{D();});var Xt=g(()=>{D();});var Gt=g(()=>{D();});var Qt=g(()=>{D();});var L=g(()=>{Kt();wt();Ft();Vt();Wt();Jt();Xt();Gt();Qt()});var ee={};ct(ee,{NextEventCardEditor:()=>I});var I,se=g(()=>{"use strict";A();L();I=class extends _{setConfig(t){this._config=t}_selectedClass(){let t=this._config.classes;return t&&t.length===1?t[0]:"all"}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return this._config?l`
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
    `:a}};u([$({attribute:!1})],I.prototype,"hass",2),u([y()],I.prototype,"_config",2),I=u([v("motogp-next-event-card-editor")],I)});var ne={};ct(ne,{ResultsCardEditor:()=>H});var ke,H,ie=g(()=>{"use strict";A();L();ke=["motogp","moto2","moto3"],H=class extends _{setConfig(t){this._config=t}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){if(!this._config)return a;let t=this._config.default_class??"motogp";return l`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Title (optional)
          <input .value=${this._config.title??""}
            @change=${e=>this._emit({title:e.target.value||void 0})} />
        </label>
        <label>
          Default class
          <select @change=${e=>this._emit({default_class:e.target.value})}>
            ${ke.map(e=>l`<option value=${e} ?selected=${e===t}>${e}</option>`)}
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
        <label>
          <input type="checkbox" .checked=${this._config.show_weather!==!1}
            @change=${e=>this._emit({show_weather:e.target.checked})} />
          Show race weather
        </label>
      </div>
    `}};u([$({attribute:!1})],H.prototype,"hass",2),u([y()],H.prototype,"_config",2),H=u([v("motogp-results-card-editor")],H)});var re={};ct(re,{LiveSessionCardEditor:()=>P});var P,ae=g(()=>{"use strict";A();L();P=class extends _{setConfig(t){this._config=t}_selectedClass(){let t=this._config.classes;return t&&t.length===1?t[0]:"all"}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return this._config?l`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Entity
          <input
            .value=${this._config.entity??"binary_sensor.motogp_session_live"}
            @change=${t=>this._emit({entity:t.target.value})}
          />
        </label>
        <label>
          Schedule entity
          <input
            .value=${this._config.schedule_entity??"sensor.motogp_next_event"}
            @change=${t=>this._emit({schedule_entity:t.target.value})}
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
          <input type="checkbox" .checked=${this._config.show_upcoming!==!1}
            @change=${t=>this._emit({show_upcoming:t.target.checked})} />
          Show upcoming sessions
        </label>
      </div>
    `:a}};u([$({attribute:!1})],P.prototype,"hass",2),u([y()],P.prototype,"_config",2),P=u([v("motogp-live-session-card-editor")],P)});A();L();A();var z=B`
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
  table.standings td.num, table.standings th.num {
    text-align: right;
    color: var(--secondary-text-color);
    width: 2.2rem;
  }
  .chg {
    font-size: 0.7rem;
    font-weight: 700;
    margin-left: 4px;
    font-variant-numeric: tabular-nums;
  }
  .chg.up { color: #2e9e4f; }
  .chg.down { color: var(--mgp-red); }
  .records {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin: 2px 0 8px;
  }
  .podium-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
  .podium-row .medal {
    flex: 0 0 auto;
    width: 44px;
    font-size: 2rem;
    line-height: 44px;
    text-align: center;
  }
  .podium-row .rider-photo { width: 44px; height: 44px; }
  .podium-text { display: flex; flex-direction: column; min-width: 0; }
  .podium-name { line-height: 1.2; white-space: nowrap; }
  .swatch { width: 4px; height: 1.2em; border-radius: 2px; }
  .podium-row .swatch { height: 44px; }
  .rider-cell { display: flex; align-items: center; gap: 8px; }
  .rider-photo {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top center;
    background: var(--secondary-background-color);
    flex: 0 0 auto;
  }
  .weather {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin: 2px 0 8px;
  }
  .tabs { display: flex; gap: 6px; margin: 8px 0; }
  .tab {
    cursor: pointer; padding: 4px 10px; border-radius: 14px;
    background: var(--secondary-background-color); color: var(--primary-text-color);
    font-size: 0.85rem; border: none;
  }
  .tab[aria-selected="true"] { background: var(--primary-color); color: #fff; }
`;function Q(i){if(!i||i.length!==2)return"";let t=127462;return String.fromCodePoint(...[...i.toUpperCase()].map(e=>t+e.charCodeAt(0)-65))}function rt(i,t=new Date){let e=new Date(i).getTime();if(Number.isNaN(e))return"";let s=e-t.getTime();if(s<=0)return"Race weekend under way";let n=Math.floor(s/1e3),o=Math.floor(n/86400),r=Math.floor(n%86400/3600),c=Math.floor(n%3600/60),p=n%60,d=m=>String(m).padStart(2,"0");return o>0?`In ${o}d ${d(r)}:${d(c)}:${d(p)}`:`In ${d(r)}:${d(c)}:${d(p)}`}function at(i,t){if(!t||t.length===0)return i.slice();let e=new Set(t);return i.filter(s=>e.has(s.class))}function Yt(i,t="en",e){let s=new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long",...e?{timeZone:e}:{}}),n=[],o;for(let r of i){let c=s.format(new Date(r.start));(!o||o.label!==c)&&(o={label:c,items:[]},n.push(o)),o.items.push(r)}return n}function lt(i,t=new Date){let e=t.getTime();return i.findIndex(s=>new Date(s.start).getTime()>=e)}var Y={MGP:"#e2001a",MT2:"#0090d4",MT3:"#00a651"},Ce={ducati:"#cc0000",aprilia:"#0a0a5e",ktm:"#ff6600",gasgas:"#cc0000",honda:"#003da5",yamaha:"#0a3d91",vr46:"#ffcf00",gresini:"#00a0d6",trackhouse:"#1a1a1a",tech3:"#0091d0",pramac:"#6a1b9a",lcr:"#e30613"},Zt="#8a8a8a";function te(i,t){if(!i)return Zt;let e=i.toLowerCase(),s=[t??{},Ce];for(let n of s)for(let o of Object.keys(n))if(e.includes(o.toLowerCase()))return n[o];return Zt}var Se={RACE:"\u{1F3C1}",SPRINT:"\u26A1"};function Ee(i,t){if(!t)return"";let e=i==="SPRINT"?t.sprint_num_laps:t.num_laps,s=[];return e&&s.push(`${e} laps`),i==="RACE"&&t.distance_km&&s.push(`${t.distance_km} km`),s.join(" \xB7 ")}var R=class extends _{static getStubConfig(){return{type:"custom:motogp-next-event-card",entity:"sensor.motogp_next_event"}}static async getConfigElement(){return await Promise.resolve().then(()=>(se(),ee)),document.createElement("motogp-next-event-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity:"sensor.motogp_next_event",show_circuit:!0,show_track_map:!0,show_countdown:!0,...t}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this.requestUpdate(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){if(!this._config||!this.hass)return a;let t=this.hass.states[this._config.entity??"sensor.motogp_next_event"];if(!t||t.state==="unavailable"||t.state==="unknown")return l`<ha-card><div class="body"><div class="empty">MotoGP next-event sensor unavailable.</div></div></ha-card>`;let e=t.attributes,s=e.circuit_info??{},n=e.name??"Next Grand Prix",o=this._config.show_countdown!==!1&&e.date_start?rt(e.date_start):"",r=at(e.schedule??[],this._config.classes),c=lt(r),p=Yt(r,this.hass.locale?.language),d=e.race_info??{},m=0;return l`
      <ha-card class="event">
        ${this._config.title?l`<div class="title">${this._config.title}</div>`:a}
        <div class="hero">
          <span class="flag">${Q(s.country_code)}</span>
          <span class="hero-name">${n}</span>
          ${o?l`<span class="countdown">${o}</span>`:a}
        </div>
        <div class="body">
          <div class="sub">
            📍 ${e.circuit??""}${e.city?`, ${e.city}`:""}
          </div>
          ${this._config.show_circuit!==!1?this._circuit(s):a}
          ${this._config.show_track_map!==!1&&s.track_map?l`<img
                class="track-map"
                src=${s.track_map}
                alt="${e.circuit??"Circuit"} layout"
                loading="lazy"
              />`:a}
          ${r.length===0?l`<div class="empty">Schedule not available yet.</div>`:p.map(h=>l`
                  <div class="day">${h.label}</div>
                  ${h.items.map(f=>{let b=m++===c,S=Ee(f.kind,d[f.class]);return l`
                      <div class="row ${b?"next":""}">
                        <span class="time">
                          ${new Date(f.start).toLocaleTimeString(this.hass.locale?.language,{hour:"2-digit",minute:"2-digit"})}
                        </span>
                        <span class="chip" style="background:${Y[f.class]}"
                          >${f.class}</span
                        >
                        <span class="session">
                          ${Se[f.kind]??""} ${f.session}
                          ${S?l`<span class="pill">${S}</span>`:a}
                          ${f.has_live?l`<span title="Live broadcast">📺</span>`:a}
                          ${b?l`<span class="next-tag">NEXT</span>`:a}
                        </span>
                      </div>
                    `})}
                `)}
        </div>
      </ha-card>
    `}_circuit(t){let e=[];return t.length_km&&e.push(`${t.length_km} km`),t.corners&&e.push(`${t.corners} corners (${t.left_corners??0}L/${t.right_corners??0}R)`),t.longest_straight_m&&e.push(`${t.longest_straight_m} m straight`),t.width_m&&e.push(`${t.width_m} m wide`),t.designer&&e.push(`${t.designer}`),t.constructed&&e.push(`Built ${t.constructed}`),e.length===0?a:l`<div class="pills">${e.map(s=>l`<span class="pill">${s}</span>`)}</div>`}};R.styles=z,u([$({attribute:!1})],R.prototype,"hass",2),u([y()],R.prototype,"_config",2),R=u([v("motogp-next-event-card")],R);A();L();var Te={motogp:"MotoGP",moto2:"Moto2",moto3:"Moto3"},Me={1:"\u{1F947}",2:"\u{1F948}",3:"\u{1F949}"};function Le(i){let t=(i??"").toLowerCase();return t.includes("rain")||t.includes("wet")?"\u{1F327}\uFE0F":t.includes("storm")||t.includes("thunder")?"\u26C8\uFE0F":t.includes("partly")?"\u26C5":t.includes("cloud")||t.includes("overcast")?"\u2601\uFE0F":t.includes("sun")||t.includes("clear")||t.includes("fair")?"\u2600\uFE0F":"\u{1F321}\uFE0F"}function oe(i){let t=[];return i.position===1&&i.time?t.push(i.time):i.laps_down&&Number(i.laps_down)>0?t.push(`+${i.laps_down} lap`):i.gap&&i.gap!=="0.000"&&t.push(`+${i.gap}s`),i.average_speed&&t.push(`${i.average_speed} km/h`),t.join(" \xB7 ")}function Ie(i){let t=Number(i);return!Number.isFinite(t)||t===0?"":t>0?`\u25B2${t}`:`\u25BC${Math.abs(t)}`}function Re(i){let t=i?.pole,e=i?.fastest_lap;if(!t&&!e)return a;let s=[];return t?.rider&&s.push(`\u{1F3C1} Pole ${t.rider}${t.time?` ${t.time}`:""}`),e?.rider&&s.push(`\u26A1 FL ${e.rider}${e.time?` ${e.time}`:""}`),l`<div class="records">${s.join(" \xB7 ")}</div>`}var C=class extends _{constructor(){super(...arguments);this._selected="motogp"}static getStubConfig(){return{type:"custom:motogp-results-card"}}static async getConfigElement(){return await Promise.resolve().then(()=>(ie(),ne)),document.createElement("motogp-results-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={classes:["motogp","moto2","moto3"],show_standings:!0,show_podium:!0,show_weather:!0,default_class:"motogp",...e},this._selected=this._config.default_class??"motogp"}getCardSize(){return 6}render(){if(!this._config||!this.hass)return a;let e=this._config.classes??["motogp","moto2","moto3"],s=this._selected;return l`
      <ha-card>
        ${this._config.title?l`<div class="title">${this._config.title}</div>`:a}
        <div class="tabs" role="tablist">
          ${e.map(n=>l`<button
              class="tab" role="tab"
              aria-selected=${n===s?"true":"false"}
              @click=${()=>this._selected=n}
            >${Te[n]}</button>`)}
        </div>
        ${this._config.show_standings!==!1?this._standings(s):a}
        ${this._config.show_podium!==!1?this._podium(s):a}
      </ha-card>
    `}_standings(e){let n=this.hass.states[`sensor.motogp_${e}_standings`]?.attributes?.standings??[];return n.length===0?l`<div class="empty">No standings.</div>`:l`
      <table class="standings">
        <tr>
          <th>#</th><th>Rider</th>
          <th class="num" title="Wins">W</th>
          <th class="num" title="Podiums">P</th>
          <th class="pts">Pts</th>
        </tr>
        ${n.map(o=>{let r=Ie(o.position_change);return l`<tr>
            <td>
              ${o.position}
              ${r?l`<span class="chg ${Number(o.position_change)>0?"up":"down"}">${r}</span>`:a}
            </td>
            <td class="rider-cell">
              ${o.photo?l`<img class="rider-photo" src=${o.photo} alt="" loading="lazy" />`:a}
              <span>${o.country_code?l`${Q(o.country_code)} `:a}${o.rider}</span>
            </td>
            <td class="num">${o.race_wins??0}</td>
            <td class="num">${o.podiums??0}</td>
            <td class="pts"><strong>${o.points}</strong></td>
          </tr>`})}
      </table>
    `}_podium(e){let n=this.hass.states[`sensor.motogp_${e}_latest_result`]?.attributes,o=n?.podium??[];if(o.length===0)return a;let r=n.weather;return l`
      <div class="day">${n.event??"Latest result"}</div>
      ${this._config.show_weather!==!1&&r?l`<div class="weather">
            ${Le(r.weather)} ${r.weather??""}
            ${r.track?l`· Track ${r.track}`:a}
            ${r.air?l`· Air ${r.air}`:a}
            ${r.ground?l`· Ground ${r.ground}`:a}
          </div>`:a}
      ${Re(n)}
      ${o.map(c=>l`<div class="podium-row">
          <span class="swatch" style="background:${te(c.team,this._config.team_colors)}"></span>
          <span class="medal">${Me[c.position]??c.position}</span>
          ${c.photo?l`<img class="rider-photo" src=${c.photo} alt="" loading="lazy" />`:a}
          <div class="podium-text">
            <strong class="podium-name">${c.country_code?l`${Q(c.country_code)} `:a}${c.rider}</strong>
            <span class="sub">
              ${c.team??""}${oe(c)?l` — ${oe(c)}`:a}
            </span>
          </div>
        </div>`)}
    `}};C.styles=z,u([$({attribute:!1})],C.prototype,"hass",2),u([y()],C.prototype,"_config",2),u([y()],C.prototype,"_selected",2),C=u([v("motogp-results-card")],C);A();L();var le={RACE:"\u{1F3C1}",SPRINT:"\u26A1"},O=class extends _{static getStubConfig(){return{type:"custom:motogp-live-session-card",entity:"binary_sensor.motogp_session_live"}}static async getConfigElement(){return await Promise.resolve().then(()=>(ae(),re)),document.createElement("motogp-live-session-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity:"binary_sensor.motogp_session_live",schedule_entity:"sensor.motogp_next_event",show_upcoming:!0,...t}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this.requestUpdate(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){if(!this._config||!this.hass)return a;let t=this.hass.states[this._config.entity??"binary_sensor.motogp_session_live"];if(!t||t.state==="unavailable"||t.state==="unknown")return l`<ha-card><div class="empty">MotoGP session-live sensor unavailable.</div></ha-card>`;let e=t.state==="on",s=t.attributes.live_session,n=t.attributes.next_session;return l`
      <ha-card>
        ${this._config.title?l`<div class="title">${this._config.title}</div>`:a}
        <div class="live-head">
          ${e?l`<span class="badge on"><span class="dot"></span>LIVE</span>`:l`<span class="badge off"><span class="dot"></span>OFF AIR</span>`}
        </div>
        ${e&&s?this._focus(s,null):n?this._focus(n,n.start):l`<div class="empty">No upcoming session scheduled.</div>`}
        ${this._config.show_upcoming!==!1?this._upcoming():a}
      </ha-card>
    `}_focus(t,e){let s=e?rt(e):"",n=t.num_laps?`${t.num_laps} laps`:"",o=[t.class_name,n].filter(Boolean).join(" \xB7 ");return l`
      <div class="focus">
        <span class="chip" style="background:${Y[t.class]}">${t.class}</span>
        <div>
          <div class="name">${le[t.kind]??""} ${t.session}</div>
          ${o?l`<div class="meta">${o}</div>`:a}
        </div>
        ${s?l`<span class="cd">${s}</span>`:a}
      </div>
    `}_upcoming(){let e=this.hass.states[this._config.schedule_entity??"sensor.motogp_next_event"]?.attributes?.schedule??[],s=at(e,this._config.classes),n=lt(s);if(n<0)return a;let o=s.slice(n,n+4);return o.length===0?a:l`
      <div class="day">Upcoming</div>
      ${o.map(r=>l`
          <div class="row">
            <span class="time">
              ${new Date(r.start).toLocaleTimeString(this.hass.locale?.language,{hour:"2-digit",minute:"2-digit"})}
            </span>
            <span class="chip" style="background:${Y[r.class]}">${r.class}</span>
            <span class="session">
              ${le[r.kind]??""} ${r.session}
              ${r.num_laps?l`<span class="pill">${r.num_laps} laps</span>`:a}
              ${r.has_live||r.has_on_demand?l`<span title="Broadcast">📺</span>`:a}
            </span>
          </div>
        `)}
    `}};O.styles=[z,B`
      .live-head {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 4px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-weight: 800;
        font-size: 0.8rem;
        letter-spacing: 0.08em;
        border-radius: 999px;
        padding: 4px 12px;
      }
      .badge.on {
        color: #fff;
        background: var(--mgp-red);
      }
      .badge.off {
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
      }
      .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #fff;
      }
      .badge.on .dot {
        animation: pulse 1.2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.35; transform: scale(0.7); }
      }
      .focus {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 0 4px;
      }
      .focus .name {
        font-weight: 700;
        color: var(--primary-text-color);
      }
      .focus .meta {
        color: var(--secondary-text-color);
        font-size: 0.85rem;
      }
      .focus .cd {
        margin-left: auto;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        color: var(--mgp-red);
        white-space: nowrap;
      }
    `],u([$({attribute:!1})],O.prototype,"hass",2),u([y()],O.prototype,"_config",2),O=u([v("motogp-live-session-card")],O);window.customCards=window.customCards??[];window.customCards.push({type:"motogp-next-event-card",name:"MotoGP Next Event",description:"Circuit data and the full weekend schedule for all three classes."},{type:"motogp-results-card",name:"MotoGP Results",description:"Championship standings and the latest podium, per class."},{type:"motogp-live-session-card",name:"MotoGP Live Session",description:"Shows whether a session is live now, the next session countdown, and what's coming up."});
