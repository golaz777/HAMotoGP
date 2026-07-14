var ut=Object.defineProperty;var Jt=Object.getOwnPropertyDescriptor;var u=(i,t)=>()=>(i&&(t=i(i=0)),t);var Qt=(i,t)=>{for(var e in t)ut(i,e,{get:t[e],enumerable:!0})};var y=(i,t,e,s)=>{for(var r=s>1?void 0:s?Jt(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&ut(t,e,r),r};var z,q,X,mt,R,ft,Y,gt,Z,tt=u(()=>{z=globalThis,q=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),mt=new WeakMap,R=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=mt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&mt.set(e,t))}return t}toString(){return this.cssText}},ft=i=>new R(typeof i=="string"?i:i+"",void 0,X),Y=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new R(e,i,X)},gt=(i,t)=>{if(q)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=z.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},Z=q?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ft(e)})(i):i});var Xt,Yt,Zt,te,ee,se,B,$t,re,ie,k,O,V,_t,$,U=u(()=>{tt();tt();({is:Xt,defineProperty:Yt,getOwnPropertyDescriptor:Zt,getOwnPropertyNames:te,getOwnPropertySymbols:ee,getPrototypeOf:se}=Object),B=globalThis,$t=B.trustedTypes,re=$t?$t.emptyScript:"",ie=B.reactiveElementPolyfillSupport,k=(i,t)=>i,O={toAttribute(i,t){switch(t){case Boolean:i=i?re:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},V=(i,t)=>!Xt(i,t),_t={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;$=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Yt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=Zt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let c=r?.call(this);n?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let t=se(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let e=this.properties,s=[...te(e),...ee(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Z(r))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:O).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:O;this._$Em=r;let c=o.fromAttribute(e,n.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,s,r=!1,n){if(t!==void 0){let o=this.constructor;if(r===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??V)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s){let{wrapped:o}=n,c=this[r];o!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[k("elementProperties")]=new Map,$[k("finalized")]=new Map,ie?.({ReactiveElement:$}),(B.reactiveElementVersions??=[]).push("2.1.2")});function Tt(i,t){if(!ct(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}function E(i,t,e=i,s){if(t===S)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,n=L(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=E(i,r._$AS(i,t.values),r,s)),t}var at,yt,W,vt,Ct,v,Et,ne,b,N,L,ct,oe,et,H,At,xt,A,bt,St,Pt,lt,m,ye,ve,S,d,wt,x,ae,I,st,D,P,rt,it,nt,ot,ce,Mt,K=u(()=>{at=globalThis,yt=i=>i,W=at.trustedTypes,vt=W?W.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ct="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,Et="?"+v,ne=`<${Et}>`,b=document,N=()=>b.createComment(""),L=i=>i===null||typeof i!="object"&&typeof i!="function",ct=Array.isArray,oe=i=>ct(i)||typeof i?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,xt=/>/g,A=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,St=/"/g,Pt=/^(?:script|style|textarea|title)$/i,lt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),m=lt(1),ye=lt(2),ve=lt(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),wt=new WeakMap,x=b.createTreeWalker(b,129);ae=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":t===3?"<math>":"",o=H;for(let c=0;c<e;c++){let a=i[c],h,p,l=-1,f=0;for(;f<a.length&&(o.lastIndex=f,p=o.exec(a),p!==null);)f=o.lastIndex,o===H?p[1]==="!--"?o=At:p[1]!==void 0?o=xt:p[2]!==void 0?(Pt.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=A):p[3]!==void 0&&(o=A):o===A?p[0]===">"?(o=r??H,l=-1):p[1]===void 0?l=-2:(l=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?A:p[3]==='"'?St:bt):o===St||o===bt?o=A:o===At||o===xt?o=H:(o=A,r=void 0);let _=o===A&&i[c+1].startsWith("/>")?" ":"";n+=o===H?a+ne:l>=0?(s.push(h),a.slice(0,l)+Ct+a.slice(l)+v+_):a+v+(l===-2?c:_)}return[Tt(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},I=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[h,p]=ae(t,e);if(this.el=i.createElement(h,s),x.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=x.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let l of r.getAttributeNames())if(l.endsWith(Ct)){let f=p[o++],_=r.getAttribute(l).split(v),j=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:j[2],strings:_,ctor:j[1]==="."?rt:j[1]==="?"?it:j[1]==="@"?nt:P}),r.removeAttribute(l)}else l.startsWith(v)&&(a.push({type:6,index:n}),r.removeAttribute(l));if(Pt.test(r.tagName)){let l=r.textContent.split(v),f=l.length-1;if(f>0){r.textContent=W?W.emptyScript:"";for(let _=0;_<f;_++)r.append(l[_],N()),x.nextNode(),a.push({type:2,index:++n});r.append(l[f],N())}}}else if(r.nodeType===8)if(r.data===Et)a.push({type:2,index:n});else{let l=-1;for(;(l=r.data.indexOf(v,l+1))!==-1;)a.push({type:7,index:n}),l+=v.length-1}n++}}static createElement(t,e){let s=b.createElement("template");return s.innerHTML=t,s}};st=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??b).importNode(e,!0);x.currentNode=r;let n=x.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new D(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new ot(n,this,t)),this._$AV.push(h),a=s[++c]}o!==a?.index&&(n=x.nextNode(),o++)}return x.currentNode=b,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},D=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),L(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):oe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=I.createElement(Tt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new st(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new I(t)),e}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new i(this.O(N()),this.O(N()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=yt(t).nextSibling;yt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=E(this,t,e,0),o=!L(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let c=t,a,h;for(t=n[0],a=0;a<n.length-1;a++)h=E(this,c[s+a],e,a),h===S&&(h=this._$AH[a]),o||=!L(h)||h!==this._$AH[a],h===d?t=d:t!==d&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rt=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},it=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},nt=class extends P{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===S)return;let s=this._$AH,r=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}},ce=at.litHtmlPolyfillSupport;ce?.(I,D),(at.litHtmlVersions??=[]).push("3.3.3");Mt=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new D(t.insertBefore(N(),n),n,void 0,e??{})}return r._$AI(i),r}});var ht,g,le,Rt=u(()=>{U();U();K();K();ht=globalThis,g=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};g._$litElement$=!0,g.finalized=!0,ht.litElementHydrateSupport?.({LitElement:g});le=ht.litElementPolyfillSupport;le?.({LitElement:g});(ht.litElementVersions??=[]).push("4.2.2")});var kt=u(()=>{});var F=u(()=>{U();K();Rt();kt()});var G,Ot=u(()=>{G=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)}});function T(i){return(t,e)=>typeof e=="object"?de(i,t,e):((s,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,t,e)}var he,de,dt=u(()=>{U();he={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:V},de=(i=he,t,e)=>{let{kind:s,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),s==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,i,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,i,c),c}}}if(s==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)}});function J(i){return T({...i,state:!0,attribute:!1})}var Ut=u(()=>{dt();});var Ht=u(()=>{});var M=u(()=>{});var Nt=u(()=>{M();});var Lt=u(()=>{M();});var It=u(()=>{M();});var Dt=u(()=>{M();});var jt=u(()=>{M();});var pt=u(()=>{Ot();dt();Ut();Ht();Nt();Lt();It();Dt();jt()});var Ft={};Qt(Ft,{NextEventCardEditor:()=>w});var w,Gt=u(()=>{"use strict";F();pt();w=class extends g{setConfig(t){this._config=t}_emit(t){this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return this._config?m`
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
    `:d}};y([T({attribute:!1})],w.prototype,"hass",2),y([J()],w.prototype,"_config",2),w=y([G("motogp-next-event-card-editor")],w)});F();pt();F();var zt=Y`
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
`;function qt(i,t=new Date){let e=new Date(i).getTime();if(Number.isNaN(e))return"";let s=e-t.getTime();if(s<=0)return"Race weekend under way";let r=Math.floor(s/1e3),n=Math.floor(r/86400),o=Math.floor(r%86400/3600),c=Math.floor(r%3600/60),a=r%60,h=p=>String(p).padStart(2,"0");return n>0?`In ${n}d ${h(o)}:${h(c)}:${h(a)}`:`In ${h(o)}:${h(c)}:${h(a)}`}function Bt(i,t){if(!t||t.length===0)return i.slice();let e=new Set(t);return i.filter(s=>e.has(s.class))}function Vt(i,t="en",e){let s=new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long",...e?{timeZone:e}:{}}),r=[],n;for(let o of i){let c=s.format(new Date(o.start));(!n||n.label!==c)&&(n={label:c,items:[]},r.push(n)),n.items.push(o)}return r}function Wt(i,t=new Date){let e=t.getTime();return i.findIndex(s=>new Date(s.start).getTime()>=e)}var Kt={MGP:"#e2001a",MT2:"#0090d4",MT3:"#00a651"};var pe={RACE:"\u{1F3C1}",SPRINT:"\u26A1"};function ue(i){if(!i||i.length!==2)return"";let t=127462;return String.fromCodePoint(...[...i.toUpperCase()].map(e=>t+e.charCodeAt(0)-65))}var C=class extends g{static getStubConfig(){return{type:"custom:motogp-next-event-card",entity:"sensor.motogp_next_event"}}static async getConfigElement(){return await Promise.resolve().then(()=>(Gt(),Ft)),document.createElement("motogp-next-event-card-editor")}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity:"sensor.motogp_next_event",show_circuit:!0,show_countdown:!0,...t}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this.requestUpdate(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){if(!this._config||!this.hass)return d;let t=this.hass.states[this._config.entity??"sensor.motogp_next_event"];if(!t||t.state==="unavailable"||t.state==="unknown")return m`<ha-card><div class="empty">MotoGP next-event sensor unavailable.</div></ha-card>`;let e=t.attributes,s=e.circuit_info??{},r=e.name??"Next Grand Prix",n=this._config.show_countdown!==!1&&e.date_start?qt(e.date_start):"",o=Bt(e.schedule??[],this._config.classes),c=Wt(o),a=Vt(o,this.hass.locale?.language),h=0;return m`
      <ha-card>
        ${this._config.title?m`<div class="title">${this._config.title}</div>`:d}
        <div class="header">
          <span class="flag">${ue(s.country_code)}</span>
          <span class="title">${r}</span>
          ${n?m`<span class="countdown">${n}</span>`:d}
        </div>
        <div class="sub">
          ${e.circuit??""}${e.city?`, ${e.city}`:""}
        </div>
        ${this._config.show_circuit!==!1?this._circuit(s):d}
        ${o.length===0?m`<div class="empty">Schedule not available yet.</div>`:a.map(p=>m`
                <div class="day">${p.label}</div>
                ${p.items.map(l=>{let f=h++===c;return m`
                    <div class="row ${f?"next":""}">
                      <span class="time">
                        ${new Date(l.start).toLocaleTimeString(this.hass.locale?.language,{hour:"2-digit",minute:"2-digit"})}
                      </span>
                      <span class="chip" style="background:${Kt[l.class]}"
                        >${l.class}</span
                      >
                      <span class="session">${pe[l.kind]??""} ${l.session}</span>
                    </div>
                  `})}
              `)}
      </ha-card>
    `}_circuit(t){let e=[];return t.length_km&&e.push(`${t.length_km} km`),t.corners&&e.push(`${t.corners} corners (${t.left_corners??0}L/${t.right_corners??0}R)`),t.longest_straight_m&&e.push(`${t.longest_straight_m} m straight`),t.width_m&&e.push(`${t.width_m} m wide`),t.designer&&e.push(`${t.designer}`),t.constructed&&e.push(`Built ${t.constructed}`),e.length===0?d:m`<div class="pills">${e.map(s=>m`<span class="pill">${s}</span>`)}</div>`}};C.styles=zt,y([T({attribute:!1})],C.prototype,"hass",2),y([J()],C.prototype,"_config",2),C=y([G("motogp-next-event-card")],C);window.customCards=window.customCards??[];window.customCards.push({type:"motogp-next-event-card",name:"MotoGP Next Event",description:"Circuit data and the full weekend schedule for all three classes."});
