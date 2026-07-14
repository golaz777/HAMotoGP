var gt=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var m=(o,t)=>()=>(o&&(t=o(o=0)),t);var _t=(o,t)=>{for(var e in t)gt(o,e,{get:t[e],enumerable:!0})};var f=(o,t,e,s)=>{for(var i=s>1?void 0:s?se(t,e):t,n=o.length-1,r;n>=0;n--)(r=o[n])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&gt(t,e,i),i};var F,J,et,$t,U,yt,st,vt,it,ot=m(()=>{F=globalThis,J=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),$t=new WeakMap,U=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=$t.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$t.set(e,t))}return t}toString(){return this.cssText}},yt=o=>new U(typeof o=="string"?o:o+"",void 0,et),st=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new U(e,o,et)},vt=(o,t)=>{if(J)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},it=J?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return yt(e)})(o):o});var ie,oe,ne,re,ae,ce,Q,bt,le,he,I,N,X,At,y,D=m(()=>{ot();ot();({is:ie,defineProperty:oe,getOwnPropertyDescriptor:ne,getOwnPropertyNames:re,getOwnPropertySymbols:ae,getPrototypeOf:ce}=Object),Q=globalThis,bt=Q.trustedTypes,le=bt?bt.emptyScript:"",he=Q.reactiveElementPolyfillSupport,I=(o,t)=>o,N={toAttribute(o,t){switch(t){case Boolean:o=o?le:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},X=(o,t)=>!ie(o,t),At={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),Q.litPropertyMetadata??=new WeakMap;y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=At){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&oe(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=ne(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let c=i?.call(this);n?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??At}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=ce(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,s=[...re(e),...ae(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(it(i))}else t!==void 0&&e.push(it(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:N;this._$Em=i;let c=r.fromAttribute(e,n.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let r=this.constructor;if(i===!1&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??X)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:r}=n,c=this[i];r!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[I("elementProperties")]=new Map,y[I("finalized")]=new Map,he?.({ReactiveElement:y}),(Q.reactiveElementVersions??=[]).push("2.1.2")});function Rt(o,t){if(!dt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return wt!==void 0?wt.createHTML(t):t}function L(o,t,e=o,s){if(t===T)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=B(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=L(o,i._$AS(o,t.values),i,s)),t}var pt,xt,Y,wt,Pt,A,Mt,pe,E,z,B,dt,de,nt,j,St,Ct,S,Et,Tt,Lt,ut,d,ke,Pe,T,l,kt,C,ue,q,rt,K,R,at,ct,lt,ht,me,Ht,Z=m(()=>{pt=globalThis,xt=o=>o,Y=pt.trustedTypes,wt=Y?Y.createPolicy("lit-html",{createHTML:o=>o}):void 0,Pt="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Mt="?"+A,pe=`<${Mt}>`,E=document,z=()=>E.createComment(""),B=o=>o===null||typeof o!="object"&&typeof o!="function",dt=Array.isArray,de=o=>dt(o)||typeof o?.[Symbol.iterator]=="function",nt=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Ct=/>/g,S=RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,Tt=/"/g,Lt=/^(?:script|style|textarea|title)$/i,ut=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),d=ut(1),ke=ut(2),Pe=ut(3),T=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),kt=new WeakMap,C=E.createTreeWalker(E,129);ue=(o,t)=>{let e=o.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",r=j;for(let c=0;c<e;c++){let a=o[c],p,u,h=-1,_=0;for(;_<a.length&&(r.lastIndex=_,u=r.exec(a),u!==null);)_=r.lastIndex,r===j?u[1]==="!--"?r=St:u[1]!==void 0?r=Ct:u[2]!==void 0?(Lt.test(u[2])&&(i=RegExp("</"+u[2],"g")),r=S):u[3]!==void 0&&(r=S):r===S?u[0]===">"?(r=i??j,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?S:u[3]==='"'?Tt:Et):r===Tt||r===Et?r=S:r===St||r===Ct?r=j:(r=S,i=void 0);let b=r===S&&o[c+1].startsWith("/>")?" ":"";n+=r===j?a+pe:h>=0?(s.push(p),a.slice(0,h)+Pt+a.slice(h)+A+b):a+A+(h===-2?c:b)}return[Rt(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0,c=t.length-1,a=this.parts,[p,u]=ue(t,e);if(this.el=o.createElement(p,s),C.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=C.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(Pt)){let _=u[r++],b=i.getAttribute(h).split(A),W=/([.?@])?(.*)/.exec(_);a.push({type:1,index:n,name:W[2],strings:b,ctor:W[1]==="."?at:W[1]==="?"?ct:W[1]==="@"?lt:R}),i.removeAttribute(h)}else h.startsWith(A)&&(a.push({type:6,index:n}),i.removeAttribute(h));if(Lt.test(i.tagName)){let h=i.textContent.split(A),_=h.length-1;if(_>0){i.textContent=Y?Y.emptyScript:"";for(let b=0;b<_;b++)i.append(h[b],z()),C.nextNode(),a.push({type:2,index:++n});i.append(h[_],z())}}}else if(i.nodeType===8)if(i.data===Mt)a.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(A,h+1))!==-1;)a.push({type:7,index:n}),h+=A.length-1}n++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};rt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);C.currentNode=i;let n=C.nextNode(),r=0,c=0,a=s[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new K(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new ht(n,this,t)),this._$AV.push(p),a=s[++c]}r!==a?.index&&(n=C.nextNode(),r++)}return C.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},K=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),B(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):de(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(Rt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new rt(i,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=kt.get(t.strings);return e===void 0&&kt.set(t.strings,e=new q(t)),e}k(t){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new o(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=xt(t).nextSibling;xt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let n=this.strings,r=!1;if(n===void 0)t=L(this,t,e,0),r=!B(t)||t!==this._$AH&&t!==T,r&&(this._$AH=t);else{let c=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=L(this,c[s+a],e,a),p===T&&(p=this._$AH[a]),r||=!B(p)||p!==this._$AH[a],p===l?t=l:t!==l&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}r&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},ct=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},lt=class extends R{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??l)===T)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ht=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}},me=pt.litHtmlPolyfillSupport;me?.(q,K),(pt.litHtmlVersions??=[]).push("3.3.3");Ht=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new K(t.insertBefore(z(),n),n,void 0,e??{})}return i._$AI(o),i}});var mt,g,fe,Ot=m(()=>{D();D();Z();Z();mt=globalThis,g=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ht(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};g._$litElement$=!0,g.finalized=!0,mt.litElementHydrateSupport?.({LitElement:g});fe=mt.litElementPolyfillSupport;fe?.({LitElement:g});(mt.litElementVersions??=[]).push("4.2.2")});var Ut=m(()=>{});var H=m(()=>{D();Z();Ot();Ut()});var x,It=m(()=>{x=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)}});function $(o){return(t,e)=>typeof e=="object"?_e(o,t,e):((s,i,n)=>{let r=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(i,n):void 0})(o,t,e)}var ge,_e,ft=m(()=>{D();ge={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:X},_e=(o=ge,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),s==="accessor"){let{name:r}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,a,o,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,o,c),c}}}if(s==="setter"){let{name:r}=e;return function(c){let a=this[r];t.call(this,c),this.requestUpdate(r,a,o,!0,c)}}throw Error("Unsupported decorator location: "+s)}});function v(o){return $({...o,state:!0,attribute:!1})}var Nt=m(()=>{ft();});var Dt=m(()=>{});var O=m(()=>{});var jt=m(()=>{O();});var zt=m(()=>{O();});var Bt=m(()=>{O();});var qt=m(()=>{O();});var Kt=m(()=>{O();});var V=m(()=>{It();ft();Nt();Dt();jt();zt();Bt();qt();Kt()});var Zt={};_t(Zt,{NextEventCardEditor:()=>k});var k,Gt=m(()=>{"use strict";H();V();k=class extends g{setConfig(t){this._config=t}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return this._config?d`
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
          <input type="checkbox" .checked=${this._config.show_circuit!==!1}
            @change=${t=>this._emit({show_circuit:t.target.checked})} />
          Show circuit data
        </label>
        <label>
          <input type="checkbox" .checked=${this._config.show_countdown!==!1}
            @change=${t=>this._emit({show_countdown:t.target.checked})} />
          Show live countdown
        </label>
      </div>
    `:l}};f([$({attribute:!1})],k.prototype,"hass",2),f([v()],k.prototype,"_config",2),k=f([x("motogp-next-event-card-editor")],k)});var te={};_t(te,{ResultsCardEditor:()=>M});var be,M,ee=m(()=>{"use strict";H();V();be=["motogp","moto2","moto3"],M=class extends g{setConfig(t){this._config=t}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){if(!this._config)return l;let t=this._config.default_class??"motogp";return d`
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
    `}};f([$({attribute:!1})],M.prototype,"hass",2),f([v()],M.prototype,"_config",2),M=f([x("motogp-results-card-editor")],M)});H();V();H();var tt=st`
  :host {
    --mgp-gap: 12px;
  }
  ha-card {
    padding: 16px;
    display: block;
  }
  .header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .flag { font-size: 1.25rem; }
  .countdown {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    color: var(--primary-color);
    font-weight: 600;
  }
  .sub { color: var(--secondary-text-color); font-size: 0.9rem; }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
  .pill {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 2px 10px;
    font-size: 0.8rem;
    color: var(--primary-text-color);
  }
  .day {
    margin-top: 12px;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--divider-color);
    padding-bottom: 4px;
  }
  .row {
    display: grid;
    grid-template-columns: 4.5rem 3.2rem 1fr;
    align-items: center;
    gap: 8px;
    padding: 6px 4px;
  }
  .row.next { background: var(--secondary-background-color); border-radius: 8px; }
  .time { font-variant-numeric: tabular-nums; color: var(--primary-text-color); }
  .chip {
    color: #fff;
    border-radius: 6px;
    padding: 1px 6px;
    font-size: 0.72rem;
    text-align: center;
    font-weight: 600;
  }
  .session { color: var(--primary-text-color); }
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
`;function Vt(o,t=new Date){let e=new Date(o).getTime();if(Number.isNaN(e))return"";let s=e-t.getTime();if(s<=0)return"Race weekend under way";let i=Math.floor(s/1e3),n=Math.floor(i/86400),r=Math.floor(i%86400/3600),c=Math.floor(i%3600/60),a=i%60,p=u=>String(u).padStart(2,"0");return n>0?`In ${n}d ${p(r)}:${p(c)}:${p(a)}`:`In ${p(r)}:${p(c)}:${p(a)}`}function Wt(o,t){if(!t||t.length===0)return o.slice();let e=new Set(t);return o.filter(s=>e.has(s.class))}function Ft(o,t="en",e){let s=new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long",...e?{timeZone:e}:{}}),i=[],n;for(let r of o){let c=s.format(new Date(r.start));(!n||n.label!==c)&&(n={label:c,items:[]},i.push(n)),n.items.push(r)}return i}function Jt(o,t=new Date){let e=t.getTime();return o.findIndex(s=>new Date(s.start).getTime()>=e)}var Xt={MGP:"#e2001a",MT2:"#0090d4",MT3:"#00a651"},$e={ducati:"#cc0000",aprilia:"#0a0a5e",ktm:"#ff6600",gasgas:"#cc0000",honda:"#003da5",yamaha:"#0a3d91",vr46:"#ffcf00",gresini:"#00a0d6",trackhouse:"#1a1a1a",tech3:"#0091d0",pramac:"#6a1b9a",lcr:"#e30613"},Qt="#8a8a8a";function Yt(o,t){if(!o)return Qt;let e=o.toLowerCase(),s=[t??{},$e];for(let i of s)for(let n of Object.keys(i))if(e.includes(n.toLowerCase()))return i[n];return Qt}var ye={RACE:"\u{1F3C1}",SPRINT:"\u26A1"};function ve(o){if(!o||o.length!==2)return"";let t=127462;return String.fromCodePoint(...[...o.toUpperCase()].map(e=>t+e.charCodeAt(0)-65))}var P=class extends g{static getStubConfig(){return{type:"custom:motogp-next-event-card",entity:"sensor.motogp_next_event"}}static async getConfigElement(){return await Promise.resolve().then(()=>(Gt(),Zt)),document.createElement("motogp-next-event-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity:"sensor.motogp_next_event",show_circuit:!0,show_countdown:!0,...t}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this.requestUpdate(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){if(!this._config||!this.hass)return l;let t=this.hass.states[this._config.entity??"sensor.motogp_next_event"];if(!t||t.state==="unavailable"||t.state==="unknown")return d`<ha-card><div class="empty">MotoGP next-event sensor unavailable.</div></ha-card>`;let e=t.attributes,s=e.circuit_info??{},i=e.name??"Next Grand Prix",n=this._config.show_countdown!==!1&&e.date_start?Vt(e.date_start):"",r=Wt(e.schedule??[],this._config.classes),c=Jt(r),a=Ft(r,this.hass.locale?.language),p=0;return d`
      <ha-card>
        ${this._config.title?d`<div class="title">${this._config.title}</div>`:l}
        <div class="header">
          <span class="flag">${ve(s.country_code)}</span>
          <span class="title">${i}</span>
          ${n?d`<span class="countdown">${n}</span>`:l}
        </div>
        <div class="sub">
          ${e.circuit??""}${e.city?`, ${e.city}`:""}
        </div>
        ${this._config.show_circuit!==!1?this._circuit(s):l}
        ${r.length===0?d`<div class="empty">Schedule not available yet.</div>`:a.map(u=>d`
                <div class="day">${u.label}</div>
                ${u.items.map(h=>{let _=p++===c;return d`
                    <div class="row ${_?"next":""}">
                      <span class="time">
                        ${new Date(h.start).toLocaleTimeString(this.hass.locale?.language,{hour:"2-digit",minute:"2-digit"})}
                      </span>
                      <span class="chip" style="background:${Xt[h.class]}"
                        >${h.class}</span
                      >
                      <span class="session">${ye[h.kind]??""} ${h.session}</span>
                    </div>
                  `})}
              `)}
      </ha-card>
    `}_circuit(t){let e=[];return t.length_km&&e.push(`${t.length_km} km`),t.corners&&e.push(`${t.corners} corners (${t.left_corners??0}L/${t.right_corners??0}R)`),t.longest_straight_m&&e.push(`${t.longest_straight_m} m straight`),t.width_m&&e.push(`${t.width_m} m wide`),t.designer&&e.push(`${t.designer}`),t.constructed&&e.push(`Built ${t.constructed}`),e.length===0?l:d`<div class="pills">${e.map(s=>d`<span class="pill">${s}</span>`)}</div>`}};P.styles=tt,f([$({attribute:!1})],P.prototype,"hass",2),f([v()],P.prototype,"_config",2),P=f([x("motogp-next-event-card")],P);H();V();var Ae={motogp:"MotoGP",moto2:"Moto2",moto3:"Moto3"},xe={1:"\u{1F947}",2:"\u{1F948}",3:"\u{1F949}"},w=class extends g{constructor(){super(...arguments);this._selected="motogp"}static getStubConfig(){return{type:"custom:motogp-results-card"}}static async getConfigElement(){return await Promise.resolve().then(()=>(ee(),te)),document.createElement("motogp-results-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={classes:["motogp","moto2","moto3"],show_standings:!0,show_podium:!0,default_class:"motogp",...e},this._selected=this._config.default_class??"motogp"}getCardSize(){return 6}render(){if(!this._config||!this.hass)return l;let e=this._config.classes??["motogp","moto2","moto3"],s=this._selected;return d`
      <ha-card>
        ${this._config.title?d`<div class="title">${this._config.title}</div>`:l}
        <div class="tabs" role="tablist">
          ${e.map(i=>d`<button
              class="tab" role="tab"
              aria-selected=${i===s?"true":"false"}
              @click=${()=>this._selected=i}
            >${Ae[i]}</button>`)}
        </div>
        ${this._config.show_standings!==!1?this._standings(s):l}
        ${this._config.show_podium!==!1?this._podium(s):l}
      </ha-card>
    `}_standings(e){let i=this.hass.states[`sensor.motogp_${e}_standings`]?.attributes?.standings??[];return i.length===0?d`<div class="empty">No standings.</div>`:d`
      <table class="standings">
        <tr><th>#</th><th>Rider</th><th class="pts">Pts</th></tr>
        ${i.map(n=>d`<tr>
            <td>${n.position}</td>
            <td>${n.rider}</td>
            <td class="pts"><strong>${n.points}</strong></td>
          </tr>`)}
      </table>
    `}_podium(e){let i=this.hass.states[`sensor.motogp_${e}_latest_result`]?.attributes,n=i?.podium??[];return n.length===0?l:d`
      <div class="day">${i.event??"Latest result"}</div>
      ${n.map(r=>d`<div class="podium-row">
          <span class="swatch" style="background:${Yt(r.team,this._config.team_colors)}"></span>
          <span>${xe[r.position]??r.position}</span>
          <strong>${r.rider}</strong>
          <span class="sub">${r.team??""}</span>
        </div>`)}
    `}};w.styles=tt,f([$({attribute:!1})],w.prototype,"hass",2),f([v()],w.prototype,"_config",2),f([v()],w.prototype,"_selected",2),w=f([x("motogp-results-card")],w);window.customCards=window.customCards??[];window.customCards.push({type:"motogp-next-event-card",name:"MotoGP Next Event",description:"Circuit data and the full weekend schedule for all three classes."},{type:"motogp-results-card",name:"MotoGP Results",description:"Championship standings and the latest podium, per class."});
