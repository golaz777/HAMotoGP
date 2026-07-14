var ft=Object.defineProperty;var ie=Object.getOwnPropertyDescriptor;var m=(o,t)=>()=>(o&&(t=o(o=0)),t);var _t=(o,t)=>{for(var e in t)ft(o,e,{get:t[e],enumerable:!0})};var g=(o,t,e,s)=>{for(var i=s>1?void 0:s?ie(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&ft(t,e,i),i};var F,G,et,$t,U,yt,st,vt,it,ot=m(()=>{F=globalThis,G=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),$t=new WeakMap,U=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=$t.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$t.set(e,t))}return t}toString(){return this.cssText}},yt=o=>new U(typeof o=="string"?o:o+"",void 0,et),st=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new U(e,o,et)},vt=(o,t)=>{if(G)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},it=G?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return yt(e)})(o):o});var oe,re,ne,ae,le,ce,J,bt,he,pe,I,N,X,xt,y,D=m(()=>{ot();ot();({is:oe,defineProperty:re,getOwnPropertyDescriptor:ne,getOwnPropertyNames:ae,getOwnPropertySymbols:le,getPrototypeOf:ce}=Object),J=globalThis,bt=J.trustedTypes,he=bt?bt.emptyScript:"",pe=J.reactiveElementPolyfillSupport,I=(o,t)=>o,N={toAttribute(o,t){switch(t){case Boolean:o=o?he:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},X=(o,t)=>!oe(o,t),xt={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&re(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=ne(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let a=i?.call(this);r?.call(this,n),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=ce(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,s=[...ae(e),...le(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(it(i))}else t!==void 0&&e.push(it(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:N;this._$Em=i;let a=n.fromAttribute(e,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let n=this.constructor;if(i===!1&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??X)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,a=this[i];n!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[I("elementProperties")]=new Map,y[I("finalized")]=new Map,pe?.({ReactiveElement:y}),(J.reactiveElementVersions??=[]).push("2.1.2")});function Ht(o,t){if(!dt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return wt!==void 0?wt.createHTML(t):t}function L(o,t,e=o,s){if(t===k)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=B(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=L(o,i._$AS(o,t.values),i,s)),t}var pt,At,Q,wt,Mt,x,Pt,de,E,j,B,dt,ue,rt,z,St,Ct,S,Et,kt,Lt,ut,h,Pe,Le,k,c,Tt,C,me,q,nt,K,H,at,lt,ct,ht,ge,Rt,Y=m(()=>{pt=globalThis,At=o=>o,Q=pt.trustedTypes,wt=Q?Q.createPolicy("lit-html",{createHTML:o=>o}):void 0,Mt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+x,de=`<${Pt}>`,E=document,j=()=>E.createComment(""),B=o=>o===null||typeof o!="object"&&typeof o!="function",dt=Array.isArray,ue=o=>dt(o)||typeof o?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Ct=/>/g,S=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,kt=/"/g,Lt=/^(?:script|style|textarea|title)$/i,ut=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),h=ut(1),Pe=ut(2),Le=ut(3),k=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Tt=new WeakMap,C=E.createTreeWalker(E,129);me=(o,t)=>{let e=o.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",n=z;for(let a=0;a<e;a++){let l=o[a],d,u,p=-1,_=0;for(;_<l.length&&(n.lastIndex=_,u=n.exec(l),u!==null);)_=n.lastIndex,n===z?u[1]==="!--"?n=St:u[1]!==void 0?n=Ct:u[2]!==void 0?(Lt.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=S):u[3]!==void 0&&(n=S):n===S?u[0]===">"?(n=i??z,p=-1):u[1]===void 0?p=-2:(p=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?S:u[3]==='"'?kt:Et):n===kt||n===Et?n=S:n===St||n===Ct?n=z:(n=S,i=void 0);let b=n===S&&o[a+1].startsWith("/>")?" ":"";r+=n===z?l+de:p>=0?(s.push(d),l.slice(0,p)+Mt+l.slice(p)+x+b):l+x+(p===-2?a:b)}return[Ht(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0,a=t.length-1,l=this.parts,[d,u]=me(t,e);if(this.el=o.createElement(d,s),C.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=C.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(Mt)){let _=u[n++],b=i.getAttribute(p).split(x),W=/([.?@])?(.*)/.exec(_);l.push({type:1,index:r,name:W[2],strings:b,ctor:W[1]==="."?at:W[1]==="?"?lt:W[1]==="@"?ct:H}),i.removeAttribute(p)}else p.startsWith(x)&&(l.push({type:6,index:r}),i.removeAttribute(p));if(Lt.test(i.tagName)){let p=i.textContent.split(x),_=p.length-1;if(_>0){i.textContent=Q?Q.emptyScript:"";for(let b=0;b<_;b++)i.append(p[b],j()),C.nextNode(),l.push({type:2,index:++r});i.append(p[_],j())}}}else if(i.nodeType===8)if(i.data===Pt)l.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf(x,p+1))!==-1;)l.push({type:7,index:r}),p+=x.length-1}r++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};nt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);C.currentNode=i;let r=C.nextNode(),n=0,a=0,l=s[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new K(r,r.nextSibling,this,t):l.type===1?d=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(d=new ht(r,this,t)),this._$AV.push(d),l=s[++a]}n!==l?.index&&(r=C.nextNode(),n++)}return C.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},K=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),B(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ue(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(Ht(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new nt(i,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=Tt.get(t.strings);return e===void 0&&Tt.set(t.strings,e=new q(t)),e}k(t){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new o(this.O(j()),this.O(j()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=At(t).nextSibling;At(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let r=this.strings,n=!1;if(r===void 0)t=L(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{let a=t,l,d;for(t=r[0],l=0;l<r.length-1;l++)d=L(this,a[s+l],e,l),d===k&&(d=this._$AH[l]),n||=!B(d)||d!==this._$AH[l],d===c?t=c:t!==c&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}n&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},lt=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},ct=class extends H{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??c)===k)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ht=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}},ge=pt.litHtmlPolyfillSupport;ge?.(q,K),(pt.litHtmlVersions??=[]).push("3.3.3");Rt=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new K(t.insertBefore(j(),r),r,void 0,e??{})}return i._$AI(o),i}});var mt,f,fe,Ot=m(()=>{D();D();Y();Y();mt=globalThis,f=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};f._$litElement$=!0,f.finalized=!0,mt.litElementHydrateSupport?.({LitElement:f});fe=mt.litElementPolyfillSupport;fe?.({LitElement:f});(mt.litElementVersions??=[]).push("4.2.2")});var Ut=m(()=>{});var R=m(()=>{D();Y();Ot();Ut()});var A,It=m(()=>{A=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)}});function $(o){return(t,e)=>typeof e=="object"?$e(o,t,e):((s,i,r)=>{let n=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(i,r):void 0})(o,t,e)}var _e,$e,gt=m(()=>{D();_e={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:X},$e=(o=_e,t,e)=>{let{kind:s,metadata:i}=e,r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),s==="accessor"){let{name:n}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,o,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,o,a),a}}}if(s==="setter"){let{name:n}=e;return function(a){let l=this[n];t.call(this,a),this.requestUpdate(n,l,o,!0,a)}}throw Error("Unsupported decorator location: "+s)}});function v(o){return $({...o,state:!0,attribute:!1})}var Nt=m(()=>{gt();});var Dt=m(()=>{});var O=m(()=>{});var zt=m(()=>{O();});var jt=m(()=>{O();});var Bt=m(()=>{O();});var qt=m(()=>{O();});var Kt=m(()=>{O();});var V=m(()=>{It();gt();Nt();Dt();zt();jt();Bt();qt();Kt()});var Yt={};_t(Yt,{NextEventCardEditor:()=>T});var T,Zt=m(()=>{"use strict";R();V();T=class extends f{setConfig(t){this._config=t}_selectedClass(){let t=this._config.classes;return t&&t.length===1?t[0]:"all"}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return this._config?h`
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
    `:c}};g([$({attribute:!1})],T.prototype,"hass",2),g([v()],T.prototype,"_config",2),T=g([A("motogp-next-event-card-editor")],T)});var te={};_t(te,{ResultsCardEditor:()=>P});var xe,P,ee=m(()=>{"use strict";R();V();xe=["motogp","moto2","moto3"],P=class extends f{setConfig(t){this._config=t}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){if(!this._config)return c;let t=this._config.default_class??"motogp";return h`
      <div style="display:flex;flex-direction:column;gap:12px;padding:8px;">
        <label>
          Title (optional)
          <input .value=${this._config.title??""}
            @change=${e=>this._emit({title:e.target.value||void 0})} />
        </label>
        <label>
          Default class
          <select @change=${e=>this._emit({default_class:e.target.value})}>
            ${xe.map(e=>h`<option value=${e} ?selected=${e===t}>${e}</option>`)}
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
`;function Vt(o,t=new Date){let e=new Date(o).getTime();if(Number.isNaN(e))return"";let s=e-t.getTime();if(s<=0)return"Race weekend under way";let i=Math.floor(s/1e3),r=Math.floor(i/86400),n=Math.floor(i%86400/3600),a=Math.floor(i%3600/60),l=i%60,d=u=>String(u).padStart(2,"0");return r>0?`In ${r}d ${d(n)}:${d(a)}:${d(l)}`:`In ${d(n)}:${d(a)}:${d(l)}`}function Wt(o,t){if(!t||t.length===0)return o.slice();let e=new Set(t);return o.filter(s=>e.has(s.class))}function Ft(o,t="en",e){let s=new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long",...e?{timeZone:e}:{}}),i=[],r;for(let n of o){let a=s.format(new Date(n.start));(!r||r.label!==a)&&(r={label:a,items:[]},i.push(r)),r.items.push(n)}return i}function Gt(o,t=new Date){let e=t.getTime();return o.findIndex(s=>new Date(s.start).getTime()>=e)}var Xt={MGP:"#e2001a",MT2:"#0090d4",MT3:"#00a651"},ye={ducati:"#cc0000",aprilia:"#0a0a5e",ktm:"#ff6600",gasgas:"#cc0000",honda:"#003da5",yamaha:"#0a3d91",vr46:"#ffcf00",gresini:"#00a0d6",trackhouse:"#1a1a1a",tech3:"#0091d0",pramac:"#6a1b9a",lcr:"#e30613"},Jt="#8a8a8a";function Qt(o,t){if(!o)return Jt;let e=o.toLowerCase(),s=[t??{},ye];for(let i of s)for(let r of Object.keys(i))if(e.includes(r.toLowerCase()))return i[r];return Jt}var ve={RACE:"\u{1F3C1}",SPRINT:"\u26A1"};function be(o){if(!o||o.length!==2)return"";let t=127462;return String.fromCodePoint(...[...o.toUpperCase()].map(e=>t+e.charCodeAt(0)-65))}var M=class extends f{static getStubConfig(){return{type:"custom:motogp-next-event-card",entity:"sensor.motogp_next_event"}}static async getConfigElement(){return await Promise.resolve().then(()=>(Zt(),Yt)),document.createElement("motogp-next-event-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity:"sensor.motogp_next_event",show_circuit:!0,show_track_map:!0,show_countdown:!0,...t}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this.requestUpdate(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){if(!this._config||!this.hass)return c;let t=this.hass.states[this._config.entity??"sensor.motogp_next_event"];if(!t||t.state==="unavailable"||t.state==="unknown")return h`<ha-card><div class="body"><div class="empty">MotoGP next-event sensor unavailable.</div></div></ha-card>`;let e=t.attributes,s=e.circuit_info??{},i=e.name??"Next Grand Prix",r=this._config.show_countdown!==!1&&e.date_start?Vt(e.date_start):"",n=Wt(e.schedule??[],this._config.classes),a=Gt(n),l=Ft(n,this.hass.locale?.language),d=0;return h`
      <ha-card class="event">
        ${this._config.title?h`<div class="title">${this._config.title}</div>`:c}
        <div class="hero">
          <span class="flag">${be(s.country_code)}</span>
          <span class="hero-name">${i}</span>
          ${r?h`<span class="countdown">${r}</span>`:c}
        </div>
        <div class="body">
          <div class="sub">
            📍 ${e.circuit??""}${e.city?`, ${e.city}`:""}
          </div>
          ${this._config.show_circuit!==!1?this._circuit(s):c}
          ${this._config.show_track_map!==!1&&s.track_map?h`<img
                class="track-map"
                src=${s.track_map}
                alt="${e.circuit??"Circuit"} layout"
                loading="lazy"
              />`:c}
          ${n.length===0?h`<div class="empty">Schedule not available yet.</div>`:l.map(u=>h`
                  <div class="day">${u.label}</div>
                  ${u.items.map(p=>{let _=d++===a;return h`
                      <div class="row ${_?"next":""}">
                        <span class="time">
                          ${new Date(p.start).toLocaleTimeString(this.hass.locale?.language,{hour:"2-digit",minute:"2-digit"})}
                        </span>
                        <span class="chip" style="background:${Xt[p.class]}"
                          >${p.class}</span
                        >
                        <span class="session">
                          ${ve[p.kind]??""} ${p.session}
                          ${_?h`<span class="next-tag">NEXT</span>`:c}
                        </span>
                      </div>
                    `})}
                `)}
        </div>
      </ha-card>
    `}_circuit(t){let e=[];return t.length_km&&e.push(`${t.length_km} km`),t.corners&&e.push(`${t.corners} corners (${t.left_corners??0}L/${t.right_corners??0}R)`),t.longest_straight_m&&e.push(`${t.longest_straight_m} m straight`),t.width_m&&e.push(`${t.width_m} m wide`),t.designer&&e.push(`${t.designer}`),t.constructed&&e.push(`Built ${t.constructed}`),e.length===0?c:h`<div class="pills">${e.map(s=>h`<span class="pill">${s}</span>`)}</div>`}};M.styles=tt,g([$({attribute:!1})],M.prototype,"hass",2),g([v()],M.prototype,"_config",2),M=g([A("motogp-next-event-card")],M);R();V();var Ae={motogp:"MotoGP",moto2:"Moto2",moto3:"Moto3"},we={1:"\u{1F947}",2:"\u{1F948}",3:"\u{1F949}"};function Se(o){let t=(o??"").toLowerCase();return t.includes("rain")||t.includes("wet")?"\u{1F327}\uFE0F":t.includes("storm")||t.includes("thunder")?"\u26C8\uFE0F":t.includes("partly")?"\u26C5":t.includes("cloud")||t.includes("overcast")?"\u2601\uFE0F":t.includes("sun")||t.includes("clear")||t.includes("fair")?"\u2600\uFE0F":"\u{1F321}\uFE0F"}function se(o){let t=[];return o.position===1&&o.time?t.push(o.time):o.gap&&o.gap!=="0.000"&&t.push(`+${o.gap}s`),o.average_speed&&t.push(`${o.average_speed} km/h`),t.join(" \xB7 ")}var w=class extends f{constructor(){super(...arguments);this._selected="motogp"}static getStubConfig(){return{type:"custom:motogp-results-card"}}static async getConfigElement(){return await Promise.resolve().then(()=>(ee(),te)),document.createElement("motogp-results-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={classes:["motogp","moto2","moto3"],show_standings:!0,show_podium:!0,show_weather:!0,default_class:"motogp",...e},this._selected=this._config.default_class??"motogp"}getCardSize(){return 6}render(){if(!this._config||!this.hass)return c;let e=this._config.classes??["motogp","moto2","moto3"],s=this._selected;return h`
      <ha-card>
        ${this._config.title?h`<div class="title">${this._config.title}</div>`:c}
        <div class="tabs" role="tablist">
          ${e.map(i=>h`<button
              class="tab" role="tab"
              aria-selected=${i===s?"true":"false"}
              @click=${()=>this._selected=i}
            >${Ae[i]}</button>`)}
        </div>
        ${this._config.show_standings!==!1?this._standings(s):c}
        ${this._config.show_podium!==!1?this._podium(s):c}
      </ha-card>
    `}_standings(e){let i=this.hass.states[`sensor.motogp_${e}_standings`]?.attributes?.standings??[];return i.length===0?h`<div class="empty">No standings.</div>`:h`
      <table class="standings">
        <tr><th>#</th><th>Rider</th><th class="pts">Pts</th></tr>
        ${i.map(r=>h`<tr>
            <td>${r.position}</td>
            <td class="rider-cell">
              ${r.photo?h`<img class="rider-photo" src=${r.photo} alt="" loading="lazy" />`:c}
              <span>${r.rider}</span>
            </td>
            <td class="pts"><strong>${r.points}</strong></td>
          </tr>`)}
      </table>
    `}_podium(e){let i=this.hass.states[`sensor.motogp_${e}_latest_result`]?.attributes,r=i?.podium??[];if(r.length===0)return c;let n=i.weather;return h`
      <div class="day">${i.event??"Latest result"}</div>
      ${this._config.show_weather!==!1&&n?h`<div class="weather">
            ${Se(n.weather)} ${n.weather??""}
            ${n.track?h`· Track ${n.track}`:c}
            ${n.air?h`· Air ${n.air}`:c}
            ${n.ground?h`· Ground ${n.ground}`:c}
          </div>`:c}
      ${r.map(a=>h`<div class="podium-row">
          <span class="swatch" style="background:${Qt(a.team,this._config.team_colors)}"></span>
          <span>${we[a.position]??a.position}</span>
          ${a.photo?h`<img class="rider-photo" src=${a.photo} alt="" loading="lazy" />`:c}
          <strong>${a.rider}</strong>
          <span class="sub">
            ${a.team??""}${se(a)?h` — ${se(a)}`:c}
          </span>
        </div>`)}
    `}};w.styles=tt,g([$({attribute:!1})],w.prototype,"hass",2),g([v()],w.prototype,"_config",2),g([v()],w.prototype,"_selected",2),w=g([A("motogp-results-card")],w);window.customCards=window.customCards??[];window.customCards.push({type:"motogp-next-event-card",name:"MotoGP Next Event",description:"Circuit data and the full weekend schedule for all three classes."},{type:"motogp-results-card",name:"MotoGP Results",description:"Championship standings and the latest podium, per class."});
