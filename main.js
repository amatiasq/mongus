!function(t){var r={};function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)o.d(t,r,function(e){return n[e]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=3)}([function(e,n,t){"use strict";var r;Object.defineProperty(n,"__esModule",{value:!0}),n.IncomingMessageType=void 0,(r=n.IncomingMessageType||(n.IncomingMessageType={})).ERROR="ERROR",r.LOGIN="LOGIN",r.LOGOUT="LOGOUT",r.SEND_OFFER="SEND_OFFER",r.SEND_ANSWER="SEND_ANSWER",r.SEND_CANDIDATE="SEND_CANDIDATE"},function(e,n,t){"use strict";var o=this&&this.__awaiter||function(e,i,s,u){return new(s=s||Promise)(function(t,n){function r(e){try{a(u.next(e))}catch(e){n(e)}}function o(e){try{a(u.throw(e))}catch(e){n(e)}}function a(e){var n;e.done?t(e.value):((n=e.value)instanceof s?n:new s(function(e){e(n)})).then(r,o)}a((u=u.apply(e,i||[])).next())})},a=this&&this.__generator||function(t,r){var o,a,i,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,a=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(i=0<(i=s.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){s.label=n[1];break}if(6===n[0]&&s.label<i[1]){s.label=i[1],i=n;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(n);break}i[2]&&s.ops.pop(),s.trys.pop();continue}n=r.call(t,s)}catch(e){n=[6,e],a=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.playAudio=n.captureAudio=void 0,n.captureAudio=function(){return navigator.mediaDevices.getUserMedia({audio:!0})},n.playAudio=function(r){return o(this,void 0,void 0,function(){return a(this,function(e){switch(e.label){case 0:return n=r,(t=document.createElement("audio")).srcObject=n,document.body.appendChild(t),[4,t.play()];case 1:return e.sent(),console.log("playing"),[2]}var n,t})})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.send=n.onMessage=void 0;var r=new WebSocket("wss://amongus.amatiasq.com");n.onMessage=function(n){r.onmessage=function(e){return n(JSON.parse(e.data))}},n.send=function(e){r.send(JSON.stringify(e))}},function(e,n,t){"use strict";var r=this&&this.__awaiter||function(e,i,s,u){return new(s=s||Promise)(function(t,n){function r(e){try{a(u.next(e))}catch(e){n(e)}}function o(e){try{a(u.throw(e))}catch(e){n(e)}}function a(e){var n;e.done?t(e.value):((n=e.value)instanceof s?n:new s(function(e){e(n)})).then(r,o)}a((u=u.apply(e,i||[])).next())})},o=this&&this.__generator||function(t,r){var o,a,i,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,a=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(i=0<(i=s.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){s.label=n[1];break}if(6===n[0]&&s.label<i[1]){s.label=i[1],i=n;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(n);break}i[2]&&s.ops.pop(),s.trys.pop();continue}n=r.call(t,s)}catch(e){n=[6,e],a=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),i=t(4),s=t(1),u=t(5),c=t(6),l=t(2),f=[];function d(t){return r(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,s.captureAudio()];case 1:return n=e.sent(),console.log("sending audio"),n.getTracks().forEach(function(e){return c.addTrack(e,n)}),[4,c.connectToUser(t)];case 2:return e.sent(),[2]}})})}l.onMessage(function(e){switch(e.type){case i.OutgoingMessageType.HANDSHAKE:return function(){var e=sessionStorage.getItem("amongus:username");for(;!e;)e=prompt("Username");sessionStorage.setItem("amongus:username",e),u.renderUsername(e),l.send({type:a.IncomingMessageType.LOGIN,name:e})}();case i.OutgoingMessageType.LOGIN_RESULT:return function(e){if(e.type!==i.OutgoingMessageType.LOGIN_RESULT)return;if(!e.success)return console.error("LOGIN FAILED: "+e.message);f.push.apply(f,e.users),u.renderUsers(f,d)}(e);case i.OutgoingMessageType.USER_CONNECTED:return n=e.user,console.log("CONNECTED",n),f.push(n),void u.renderUsers(f,d);case i.OutgoingMessageType.USER_DISCONNECTED:return function(n){console.log("DISCONNECTED",n);var e=f.findIndex(function(e){return e.id===n.id});if(-1===e)return;f.splice(e,1),u.renderUsers(f,d)}(e.user);case i.OutgoingMessageType.RECEIVE_OFFER:return c.onOffer(e.from,e.offer);case i.OutgoingMessageType.RECEIVE_ANSWER:return function(n,t){return r(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,c.onAnswer(n,t)];case 1:return e.sent(),[2]}})})}(e.from,e.answer);case i.OutgoingMessageType.RECEIVE_CANDIDATE:return c.onCandidate(e.from,e.candidate);default:console.log("Unhandled message: "+e.type)}var n})},function(e,n,t){"use strict";var r;Object.defineProperty(n,"__esModule",{value:!0}),n.OutgoingMessageType=void 0,(r=n.OutgoingMessageType||(n.OutgoingMessageType={})).ERROR="ERROR",r.HANDSHAKE="HANDSHAKE",r.LOGIN_RESULT="LOGIN_RESULT",r.USER_CONNECTED="USER_CONNECTED",r.USER_DISCONNECTED="USER_DISCONNECTED",r.RECEIVE_OFFER="RECEIVE_OFFER",r.RECEIVE_ANSWER="RECEIVE_ANSWER",r.RECEIVE_CANDIDATE="RECEIVE_CANDIDATE"},function(e,n,t){"use strict";function a(e){var n=document.querySelector(e);if(n)return n.innerHTML="",n;var t=document.createElement("div");return t.id=e.substr(1),document.body.appendChild(t),t}Object.defineProperty(n,"__esModule",{value:!0}),n.renderUsers=n.renderUsername=void 0,n.renderUsername=function(e){a("#username").innerHTML="<h1>"+e+"</h1>"},n.renderUsers=function(e,r){for(var o=a("#userlist"),n=0,t=e;n<t.length;n++){!function(e){var n=document.createElement("div"),t=document.createElement("button");t.innerHTML=e.name,t.onclick=function(){return r(e)},n.appendChild(t),o.appendChild(n)}(t[n])}}},function(e,n,t){"use strict";var a=this&&this.__awaiter||function(e,i,s,u){return new(s=s||Promise)(function(t,n){function r(e){try{a(u.next(e))}catch(e){n(e)}}function o(e){try{a(u.throw(e))}catch(e){n(e)}}function a(e){var n;e.done?t(e.value):((n=e.value)instanceof s?n:new s(function(e){e(n)})).then(r,o)}a((u=u.apply(e,i||[])).next())})},i=this&&this.__generator||function(t,r){var o,a,i,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},e={next:n(0),throw:n(1),return:n(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,a=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(i=0<(i=s.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){s.label=n[1];break}if(6===n[0]&&s.label<i[1]){s.label=i[1],i=n;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(n);break}i[2]&&s.ops.pop(),s.trys.pop();continue}n=r.call(t,s)}catch(e){n=[6,e],a=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.addTrack=n.onCandidate=n.onAnswer=n.onOffer=n.connectToUser=void 0;var s=t(0),r=t(1),u=t(2),c=new RTCPeerConnection({iceServers:[{urls:"stun:stun.1.google.com:19302"}]}),l=null;n.connectToUser=function(o){return a(this,void 0,void 0,function(){function n(e){var n=e.data;console.log("POLLAS",n)}var t,r;return i(this,function(e){switch(e.label){case 0:return(t=c.createDataChannel("messenger")).onerror=function(e){return console.error("Error connecting to user",e)},t.onmessage=n,l=o.name,[4,c.createOffer({offerToReceiveAudio:!0})];case 1:return r=e.sent(),[4,c.setLocalDescription(r)];case 2:return e.sent(),[4,u.send({type:s.IncomingMessageType.SEND_OFFER,to:o.name,offer:c.localDescription})];case 3:return e.sent(),[2]}})})},n.onOffer=function(t,r){return a(this,void 0,void 0,function(){var n;return i(this,function(e){switch(e.label){case 0:return[4,c.setRemoteDescription(new RTCSessionDescription(r))];case 1:return e.sent(),[4,c.createAnswer({offerToReceiveAudio:!0})];case 2:return n=e.sent(),[4,c.setLocalDescription(n)];case 3:return e.sent(),[4,u.send({type:s.IncomingMessageType.SEND_ANSWER,to:t,answer:c.localDescription})];case 4:return e.sent(),[2]}})})},n.onAnswer=function(e,n){return c.setRemoteDescription(new RTCSessionDescription(n))},n.onCandidate=function(e,n){c.addIceCandidate(new RTCIceCandidate(n))},n.addTrack=function(e,n){c.addTrack(e,n)},c.onconnectionstatechange=function(){return console.log("connection state",c.connectionState)},c.onicecandidate=function(e){var n=e.candidate;console.log("Candidate ready"),n&&l&&u.send({type:s.IncomingMessageType.SEND_CANDIDATE,to:l,candidate:n})},c.ondatachannel=function(e){var n=e.channel;n.onopen=function(){console.log("Data channel is open and ready to be used.")},n.onmessage=function(e){var n=e.data;console.log("POLLAS2",n)}},c.ontrack=function(e){console.log("got track"),r.playAudio(e.streams[0])}}]);
//# sourceMappingURL=main.js.map