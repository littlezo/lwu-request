'use strict';

var v=Object.defineProperty;var R=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var q=(i,t,r)=>t in i?v(i,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[t]=r,c=(i,t)=>{for(var r in t||(t={}))E.call(t,r)&&q(i,r,t[r]);if(R)for(var r of R(t))U.call(t,r)&&q(i,r,t[r]);return i};var S=i=>{uni.showLoading({title:i.title,mask:i.mask||!0});};var w=i=>{var t,r,e,n,a,u,d,l,h,m,o,f,s,y,g,T,b,k,p,C;return {baseUrl:i.baseUrl,debug:(t=i.debug)!=null?t:!1,loading:(r=i.loading)!=null?r:!0,loadingText:(e=i.loadingText)!=null?e:"\u8BF7\u6C42\u4E2D...",timeout:(n=i.timeout)!=null?n:6e3,method:(a=i.method)!=null?a:"GET",dataType:(u=i.dataType)!=null?u:"json",responseType:(d=i.responseType)!=null?d:"text",sslVerify:(l=i.sslVerify)!=null?l:!0,withCredentials:(h=i.withCredentials)!=null?h:!1,firstIpv4:(m=i.firstIpv4)!=null?m:!1,errorHandleByCode:i.errorHandleByCode,networkExceptionHandle:()=>{},requestSuccessResponseMsgName:(o=i.requestSuccessResponseMsgName)!=null?o:"msg",tokenStorageKeyName:(f=i.tokenStorageKeyName)!=null?f:"",tokenValue:i.tokenValue,buildQueryString:i.buildQueryString,takeTokenMethod:(s=i.takeTokenMethod)!=null?s:"header",takenTokenKeyName:(y=i.takenTokenKeyName)!=null?y:"Authorization",autoRefreshToken:!1,refreshTokenHandle:i.refreshTokenHandle,tokenExpiredCode:(g=i.tokenExpiredCode)!=null?g:403,retry:(T=i.retry)!=null?T:!1,retryCount:(b=i.retryCount)!=null?b:3,retryCountAutoOffRetry:(k=i.retryCountAutoOffRetry)!=null?k:!0,retryMaximum:(p=i.retryMaximum)!=null?p:64,retryDeadline:(C=i.retryDeadline)!=null?C:1e4}};var M=(i,t)=>{let r=Math.floor(Math.random()*1e3);return Math.min(Math.pow(2,i)*1e3+r,t)},x=class{constructor(t){this.currentRequestTask={abort:()=>{},onHeadersReceived:()=>{},offHeadersReceived:()=>{}};this.requestTasksName="LWU-REQUEST-TASKS";this.lock=!0;this.pending=[];this.retryCount=3;this.retryMaximum=64;this.retryTimeout=[];this.retryDeadline=1e4;this.config={baseUrl:{pro:"",dev:""},errorHandleByCode:(t,r)=>{}};if(this.config=c({},w(t)),!this.config.retry)this.retryCount=0;else if(this.config.retryCountAutoOffRetry){this.retryMaximum=this.config.retryMaximum*1e3,this.retryTimeout=[],this.retryDeadline=t.retryDeadline;for(let r=0;r<this.retryCount&&!(this.retryDeadline<0);r++){let e=M(r,this.retryMaximum);this.retryDeadline-=e,this.retryTimeout.push(e);}this.retryCount=this.retryTimeout.length;}}handleError(t,r=""){this.config.errorHandleByCode(t,r);}interceptor(t,r,e){uni.addInterceptor("request",{invoke:n=>{var d,l;this.config.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u3011${JSON.stringify(n)}`),this.config.loading&&S({title:(d=this.config.loadingText)!=null?d:"\u8BF7\u6C42\u4E2D..."}),(l=n==null?void 0:n.header)!=null&&l.contentType&&(n.header["content-type"]=n.header.contentType,delete n.header.contentType);let a="";process.env.NODE_ENV==="development"?a=this.config.baseUrl.dev:a=this.config.baseUrl.pro;let u=`${a}${t}`;n.method==="GET"?(n.data=this.config.buildQueryString&&this.config.buildQueryString(n.data)?this.config.buildQueryString(n.data):new URLSearchParams(Object.entries(n.data)).toString(),n.url=`${u}?${n.data}`):n.url=u,r&&r();},success:n=>{this.handleError(n.statusCode,n.data[this.config.requestSuccessResponseMsgName]),this.config.debug&&console.warn(`\u3010LwuRequest Debug:\u54CD\u5E94\u62E6\u622A\u3011${JSON.stringify(n)}`),e&&e();},fail:n=>{this.config.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5931\u8D25\u3011${JSON.stringify(n)}`);},complete:n=>{uni.hideLoading(),this.config.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5B8C\u6210\u3011${JSON.stringify(n)}`);}});}refreshToken(){this.config.refreshTokenHandle&&this.config.refreshTokenHandle().then(()=>{uni.getStorageSync("LWU-REQUEST-CALLBACK")(t=>{t();});}).catch(()=>{this.handleError(this.config.tokenExpiredCode);});}request(t,r={},e={header:{},method:this.config.method,timeout:this.config.timeout,dataType:this.config.dataType,responseType:this.config.responseType,sslVerify:this.config.sslVerify,withCredentials:this.config.withCredentials,firstIpv4:this.config.firstIpv4,retryCount:this.config.retryCount}){var a;let n=uni.getStorageSync(this.requestTasksName);return e!=null&&e.task_id&&n[e==null?void 0:e.task_id]&&(this.config.debug&&console.warn(`\u3010LwuRequest Debug\u3011\u8BF7\u6C42ID${e.task_id}\u6709\u91CD\u590D\u9879\u5DF2\u81EA\u52A8\u8FC7\u6EE4`),(a=n[e==null?void 0:e.task_id])==null||a.abort()),new Promise((u,d)=>{this.interceptor(t,e.before,e.after);let l={},h=uni.getStorageSync(this.config.tokenStorageKeyName);(()=>new Promise((o,f)=>{h&&o(h),this.config.tokenValue?this.config.tokenValue().then(s=>{s&&o(s),o(!1);}):o("");}))().then(o=>{o&&(this.config.takeTokenMethod==="header"&&(l[this.config.takenTokenKeyName]=o),this.config.takeTokenMethod==="body"&&(r[this.config.takenTokenKeyName]=o));let f=c({header:l},e.header);if(this.currentRequestTask=uni.request({url:t,data:r,header:f.header,method:e.method,timeout:e.timeout,dataType:e.dataType,responseType:e.responseType,sslVerify:e.sslVerify,withCredentials:e.withCredentials,firstIpv4:e.firstIpv4,success:s=>{s.statusCode!==this.config.tokenExpiredCode?u(s.data):(this.refreshToken(),uni.setStorageSync("LWU-REQUEST-CALLBACK",()=>{u(this.request(t,r,e));}));},fail:s=>{var y;this.retryCount=(y=e.retryCount)!=null?y:3,this.retryCount===0?d(s):(this.config.debug&&console.warn(`\u3010LwuRequest Debug\u3011\u81EA\u52A8\u91CD\u8BD5\u6B21\u6570\uFF1A${this.retryCount}`),this.retryCount--,setTimeout(this.request,this.retryTimeout.shift()),this.config.networkExceptionHandle&&this.config.networkExceptionHandle());}}),e!=null&&e.task_id){let s=[];s[e==null?void 0:e.task_id]=this.currentRequestTask,uni.setStorageSync(this.requestTasksName,s);}});})}get(t,r={},e={}){return this.request(t,r,c({method:"GET"},e))}post(t,r={},e={}){return this.request(t,r,c({method:"POST"},e))}put(t,r={},e={}){return this.request(t,r,c({method:"POST"},e))}delete(t,r={},e={}){return this.request(t,r,c({method:"DELETE"},e))}abort(t=""){let r=uni.getStorageSync(this.requestTasksName);r[t]?r[t].abort():this.currentRequestTask.abort();}};

exports.Http = x;
