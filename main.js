!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){"use strict";function r(){const e=new Set;return t.emit=function(t){e.forEach(e=>e(t))},t;function t(t){return e.add(t),()=>e.delete(t)}}n.r(t),n.d(t,"emitter",(function(){return r}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{a(r.next(e))}catch(e){o(e)}}function c(e){try{a(r.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.renderUsers=t.confirm=t.renderUsername=t.getUserName=t.getCanvas=t.whenUserClicked=void 0;var o,s=function(e){return document.querySelector(e)},c=s("#userlist");t.whenUserClicked=function(e){o=e},t.getCanvas=function(){var e=s("canvas"),t=e.parentElement;return window.addEventListener("resize",n),n(),e;function n(){e.width=t.clientWidth,e.height=t.clientHeight}},t.getUserName=function(){return r(this,void 0,void 0,(function(){var e,t,n,r,o;return i(this,(function(i){return e="amongus:username",t=sessionStorage.getItem(e),s("#logout").addEventListener("click",(function(t){sessionStorage.removeItem(e),location.reload()})),t?[2,Promise.resolve(t)]:(n=s("#login"),r=n.querySelector("form"),o=null==r?void 0:r.querySelector("input[type=text]"),n.showModal(),[2,new Promise((function(t,n){r.addEventListener("submit",(function(n){var r=o.value.trim();sessionStorage.setItem(e,r),t(r)}))}))])}))}))},t.renderUsername=function(e){s("#username").innerHTML=e},t.confirm=function(e){var t=s("#confirm-dialog"),n=document.importNode(t.content,!0).firstElementChild;document.body.appendChild(n);var r=function(e){return n.querySelector(e)};return r(".question").innerHTML=e,new Promise((function(e){r(".yes").addEventListener("click",(function(){return e(!0)})),r(".no").addEventListener("click",(function(){return e(!1)})),n.showModal()})).then((function(e){return n.remove(),e}))},t.renderUsers=function e(t){var n=this;c.innerHTML="";for(var s=function(s){var a=document.createElement("div"),u=s.isCalling?"(llamando...)":"",l=document.createElement("button");l.innerHTML=s.name+" "+u,l.onclick=function(){return r(n,void 0,void 0,(function(){return i(this,(function(n){switch(n.label){case 0:return[4,o(s)];case 1:return n.sent(),e(t),[2]}}))}))},a.appendChild(l),c.appendChild(a)},a=0,u=t;a<u.length;a++){s(u[a])}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.refreshUserList=t.getUserList=t.userDisconnected=t.userConnected=t.setUserList=t.getUserByName=t.getUserById=void 0;var r=n(1),i=n(7),o=[];function s(e){return o.find((function(t){return t.id===e}))}function c(e){return new i.User(e)}function a(){r.renderUsers(o)}t.getUserById=s,t.getUserByName=function(e){return o.find((function(t){return t.name===e}))},t.setUserList=function(e){o=e.map(c).map((function(e){return s(e.id)||e})),a()},t.userConnected=function(e){console.log("CONNECTED",e),o.push(c(e)),a()},t.userDisconnected=function(e){console.log("DISCONNECTED",e),o=o.filter((function(t){return t.id!==e.id})),a()},t.getUserList=function(){return o},t.refreshUserList=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ClientMessageType=void 0,function(e){e.ERROR="ERROR",e.LOGIN="LOGIN",e.LOGOUT="LOGOUT",e.SEND_TO_USER="SEND_TO_USER",e.SEND_TO_ROOM="SEND_TO_ROOM"}(t.ClientMessageType||(t.ClientMessageType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ClientToClientMessageType=void 0,function(e){e.RPC_OFFER="SEND_OFFER",e.RPC_ANSWER="SEND_ANSWER",e.REJECT_OFFER="REJECT_OFFER"}(t.ClientToClientMessageType||(t.ClientToClientMessageType={}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{a(r.next(e))}catch(e){o(e)}}function c(e){try{a(r.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.playAudio=t.captureAudio=void 0,t.captureAudio=function(){return navigator.mediaDevices.getUserMedia({audio:!0})},t.playAudio=function(e){return r(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,function(e){var t=document.createElement("audio");return t.srcObject=e,document.body.appendChild(t),t}(e).play()];case 1:return t.sent(),[2]}}))}))}},function(e,t,n){"use strict";function r(e){var t=new Image;return new Promise((function(n,r){t.onload=function(){return n(t)},t.onerror=r,t.src=e}))}Object.defineProperty(t,"__esModule",{value:!0}),t.loadImage=t.init=void 0,t.init=function(){r("../assets/sprites/player.png").then((function(e){document.appendChild(e)}))},t.loadImage=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var r=function(){function e(e){this.position={x:0,y:0},this.connection=null,this.id=e.id,this.name=e.name}return Object.defineProperty(e.prototype,"isCalling",{get:function(){return Boolean(this.connection)},enumerable:!1,configurable:!0}),e.prototype.callStarted=function(e){this.connection=e},e.prototype.acceptAnswer=function(e){this.connection.acceptAnswer(e)},e.prototype.hangup=function(){var e;null===(e=this.connection)||void 0===e||e.end(),this.connection=null},e.prototype.dispose=function(){this.hangup()},e}();t.User=r},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{a(r.next(e))}catch(e){o(e)}}function c(e){try{a(r.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(t,"__esModule",{value:!0});var s=n(9),c=n(3),a=n(4),u=n(10),l=n(5),f=n(11),d=n(17),h=n(23),p=n(1),y=n(7),g=n(2),v=n(6),m=u.ServerMessageType,b=new h.Socket("wss://amongus.amatiasq.com");function w(e){var t=g.getUserById(e);if(t)return t;b.send({type:c.ClientMessageType.ERROR,message:"Received message from unknown user "+e})}p.whenUserClicked((function(e){return e.isCalling?e.hangup():function(e){return i(this,void 0,void 0,(function(){var t,n;return o(this,(function(r){switch(r.label){case 0:return t=new d.PeerChannel(e,(function(e){return b.send(e)})),[4,l.captureAudio()];case 1:return(n=r.sent()).getTracks().forEach((function(e){return t.addTrack(e,n)})),t.sendOffer(),e.callStarted(t),[2,t]}}))}))}(e)})),v.init(),b.onMessage(m.HANDSHAKE,(function(){return i(this,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,p.getUserName()];case 1:return e=t.sent(),p.renderUsername(e),b.send({type:c.ClientMessageType.LOGIN,name:e}),[2]}}))}))})),b.onMessage(m.LOGIN_RESULT,(function(e){return function(e){if(e.type!==u.ServerMessageType.LOGIN_RESULT)return;if(!e.success)return alert(e.message),sessionStorage.clear(),void location.reload();g.setUserList(e.users),function(e){var t=new y.User({id:"me",name:e});function n(){var e=r({},t.position);f.runFrame(t),e.x===t.position.x&&e.y===t.position.y||b.send({type:c.ClientMessageType.SEND_TO_ROOM,message:{type:s.RoomMessageType.POSITION_CHANGED,position:t.position}}),requestAnimationFrame(n)}n()}(e.name)}(e)})),b.onMessage(m.USER_CONNECTED,(function(e){return g.userConnected(e.user)})),b.onMessage(m.USER_DISCONNECTED,(function(e){return g.userDisconnected(e.user)})),b.onMessage(m.MESSAGE_TO_ROOM,(function(e){var t=e.from,n=e.message,r=w(t);if(r)switch(n.type){case s.RoomMessageType.POSITION_CHANGED:return function(e,t){e.position=t}(r,n.position)}})),b.onMessage(m.MESSAGE_FROM_USER,(function(e){var t=e.from,n=e.message,r=w(t);if(r)switch(n.type){case a.ClientToClientMessageType.RPC_OFFER:return function(e,t){return i(this,void 0,void 0,(function(){var n;return o(this,(function(r){switch(r.label){case 0:return console.log(e.name+" quiere iniciar una llamada"),[4,confirm(e.name+" quiere iniciar una llamada.<br>Contestar?")];case 1:return r.sent()?(console.log("Llamada de "+e.name+" aceptada"),(n=new d.PeerChannel(e,(function(e){return b.send(e)}))).acceptOffer(t),console.log("Enviando respuesta a "+e.name+"..."),e.callStarted(n),[2,n]):(console.log("Llamada de "+e.name+" rechazada"),b.send({type:c.ClientMessageType.SEND_TO_USER,to:e.id,message:{type:a.ClientToClientMessageType.REJECT_OFFER}}),[2])}}))}))}(r,n.offer);case a.ClientToClientMessageType.RPC_ANSWER:return r.acceptAnswer(n.answer);case a.ClientToClientMessageType.REJECT_OFFER:return r.hangup()}}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RoomMessageType=void 0,function(e){e.POSITION_CHANGED="POSITION_CHANGED"}(t.RoomMessageType||(t.RoomMessageType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ServerMessageType=void 0,function(e){e.ERROR="ERROR",e.HANDSHAKE="HANDSHAKE",e.LOGIN_RESULT="LOGIN_RESULT",e.USER_CONNECTED="USER_CONNECTED",e.USER_DISCONNECTED="USER_DISCONNECTED",e.MESSAGE_FROM_USER="MESSAGE_FROM_USER",e.MESSAGE_TO_ROOM="MESSAGE_TO_ROOM"}(t.ServerMessageType||(t.ServerMessageType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.runFrame=void 0;var r=n(12),i=n(14),o=n(2);t.runFrame=function(e){!function(e){i.keyboard.isActive(i.Action.UP)&&(e.y-=5);i.keyboard.isActive(i.Action.DOWN)&&(e.y+=5);i.keyboard.isActive(i.Action.LEFT)&&(e.x-=5);i.keyboard.isActive(i.Action.RIGHT)&&(e.x+=5)}(e.position);var t=o.getUserList().map((function(e){return e.position}));r.render(e.position,t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.render=void 0;var r,i=n(6),o=n(13),s=n(1).getCanvas(),c=s.getContext("2d");function a(e,t,n){c.drawImage(n,e,t)}i.loadImage("../assets/sprites/player.png").then((function(e){return r=e})),t.render=function(e,t){c.fillStyle="black",c.fillRect(0,0,s.width,s.height),c.save(),c.translate(s.width/2,s.height/2);var n=l(o.Color.GREEN),r=l(o.Color.GREEN);t.forEach((function(e){return a(e.x,e.y,n)})),a(e.x,e.y,r),c.restore()};var u=new Map;function l(e){var t=e.toRgba();if(u.has(t))return u.get(t);var n=document.createElement("canvas"),i=n.getContext("2d"),s=r.width,c=r.height;n.width=s,n.height=c,i.drawImage(r,0,0);for(var a=new o.Color(e.r,e.g,e.b,1/255*100),l=i.getImageData(0,0,s,c),f=l.data,d=0;d<f.length;d+=4){var h=new o.Color(f[d+0],f[d+1],f[d+2]);h.isReddish?e.setTo(f,d):(h.isBlueish||h.isPurpleish)&&a.setTo(f,d)}return i.putImageData(l,0,0),u.set(t,n),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;var r=function(){function e(e,t,n,r){void 0===r&&(r=1),this.r=e,this.g=t,this.b=n,this.a=r}return Object.defineProperty(e.prototype,"isReddish",{get:function(){return o(this.r,this.g,this.b)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isBlueish",{get:function(){return o(this.b,this.r,this.g)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isPurpleish",{get:function(){return i(this.r,this.g)&&i(this.b,this.g)},enumerable:!1,configurable:!0}),e.prototype.toRgba=function(){return"rgba("+this.r+","+this.g+","+this.b+","+this.a+")"},e.prototype.is=function(e){return this.r===e.r&&this.g===e.g&&this.b===e.b&&this.a===e.a},e.prototype.setTo=function(e,t){e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e[t+3]=255*this.a},e.RED=new e(255,0,0),e.GREEN=new e(0,255,0),e.BLUE=new e(0,0,255),e}();function i(e,t){return e>10&&e>1.25*t}function o(e,t,n){return e>10&&e>1.25*t&&e>1.25*n}t.Color=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.keyboard=t.Action=void 0;var r,i=n(15);!function(e){e[e.UP=0]="UP",e[e.DOWN=1]="DOWN",e[e.LEFT=2]="LEFT",e[e.RIGHT=3]="RIGHT"}(r=t.Action||(t.Action={})),t.keyboard=new i.KeyboardController,t.keyboard.setDirections(r.UP,r.DOWN,r.LEFT,r.RIGHT)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.KeyboardController=t.KeyCode=void 0;const r=n(16);Object.defineProperty(t,"KeyCode",{enumerable:!0,get:function(){return r.KeyCode}});function i(e,t,n){e.has(t)?e.get(t).push(n):e.set(t,[n])}function o(e,t){const n=t.get(e.code);n&&n.forEach(t=>t(e))}t.KeyboardController=class{constructor(){this.keymap={},this.actions=new Set,this.codeToKey=new Map,this.onKeyDownListeners=new Map,this.onKeyUpListeners=new Map,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}onKeyDown(e,t){i(this.onKeyDownListeners,e,t)}onKeyUp(e,t){i(this.onKeyUpListeners,e,t)}setKeyMap(e,t){this.keymap[e]=t}isActive(e){return this.actions.has(e)}getUserKey(e){return this.codeToKey.has(e)?this.codeToKey.get(e):null}setDirections(e,t,n,r){this.setArrows(e,t,n,r),this.setWSAD(e,t,n,r)}setArrows(e,t,n,i){this.keymap[r.KeyCode.ArrowUp]=e,this.keymap[r.KeyCode.ArrowDown]=t,this.keymap[r.KeyCode.ArrowLeft]=n,this.keymap[r.KeyCode.ArrowRight]=i}setWSAD(e,t,n,i){this.keymap[r.KeyCode.KeyW]=e,this.keymap[r.KeyCode.KeyS]=t,this.keymap[r.KeyCode.KeyA]=n,this.keymap[r.KeyCode.KeyD]=i}handleKeyDown(e){this.onEvent(e);const t=this.getActionFor(e.code);null!=t&&this.actions.add(t),o(e,this.onKeyDownListeners)}handleKeyUp(e){const t=this.getActionFor(e.code);null!=t&&this.actions.delete(t),o(e,this.onKeyUpListeners)}getActionFor(e){return r.KeyCode[e]||console.log("Missing key code: "+e),this.keymap[e]}onEvent(e){this.codeToKey.set(e.code,e.key)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.KeyCode=void 0,function(e){e.AltLeft="AltLeft",e.AltRight="AltRight",e.Backslash="Backslash",e.Backspace="Backspace",e.CapsLock="CapsLock",e.ControlLeft="ControlLeft",e.Enter="Enter",e.Escape="Escape",e.MetaLeft="MetaLeft",e.MetaRight="MetaRight",e.ShiftLeft="ShiftLeft",e.ShiftRight="ShiftRight",e.Tab="Tab",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.Backquote="Backquote",e.BracketLeft="BracketLeft",e.BracketRight="BracketRight",e.Comma="Comma",e.Equal="Equal",e.IntlBackslash="IntlBackslash",e.Minus="Minus",e.Period="Period",e.Quote="Quote",e.Semicolon="Semicolon",e.Slash="Slash",e.Space="Space",e.F1="F1",e.F2="F2",e.F3="F3",e.F4="F4",e.F5="F5",e.F6="F6",e.F7="F7",e.F8="F8",e.Digit0="Digit0",e.Digit1="Digit1",e.Digit2="Digit2",e.Digit3="Digit3",e.Digit4="Digit4",e.Digit5="Digit5",e.Digit6="Digit6",e.Digit7="Digit7",e.Digit8="Digit8",e.Digit9="Digit9",e.KeyA="KeyA",e.KeyB="KeyB",e.KeyC="KeyC",e.KeyD="KeyD",e.KeyE="KeyE",e.KeyF="KeyF",e.KeyG="KeyG",e.KeyH="KeyH",e.KeyI="KeyI",e.KeyJ="KeyJ",e.KeyK="KeyK",e.KeyL="KeyL",e.KeyM="KeyM",e.KeyN="KeyN",e.KeyO="KeyO",e.KeyP="KeyP",e.KeyQ="KeyQ",e.KeyR="KeyR",e.KeyS="KeyS",e.KeyT="KeyT",e.KeyU="KeyU",e.KeyV="KeyV",e.KeyW="KeyW",e.KeyX="KeyX",e.KeyY="KeyY",e.KeyZ="KeyZ"}(t.KeyCode||(t.KeyCode={}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{a(r.next(e))}catch(e){o(e)}}function c(e){try{a(r.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.PeerChannel=void 0;var o=n(18),s=n(3),c=n(4),a=n(5),u=n(2),l=function(){function e(e,t){this.user=e,this.send=t,this.conn=this.createRtc()}return e.prototype.sendOffer=function(){return r(this,void 0,void 0,(function(){var e;return i(this,(function(t){switch(t.label){case 0:return[4,this.conn.createOffer({offerToReceiveAudio:!0})];case 1:return e=t.sent(),[4,this.send({type:s.ClientMessageType.SEND_TO_USER,to:this.user.id,message:{type:c.ClientToClientMessageType.RPC_OFFER,offer:e}})];case 2:return t.sent(),[2]}}))}))},e.prototype.acceptOffer=function(e){return r(this,void 0,void 0,(function(){var t,n;return i(this,(function(r){switch(r.label){case 0:return[4,a.captureAudio()];case 1:return t=r.sent(),this.conn.addStream(t),[4,this.conn.acceptOffer(e,{offerToReceiveAudio:!0})];case 2:return n=r.sent(),[4,this.send({type:s.ClientMessageType.SEND_TO_USER,to:this.user.id,message:{type:c.ClientToClientMessageType.RPC_ANSWER,answer:n}})];case 3:return r.sent(),[2]}}))}))},e.prototype.acceptAnswer=function(e){return this.conn.acceptAnswer(e)},e.prototype.addTrack=function(e,t){return console.log("Enviando audio a "+this.user.name+"."),this.conn.addTrack(e,t)},e.prototype.end=function(){this.conn.close()},e.prototype.createRtc=function(){var e=this,t=new o.PeerConnection;return t.onTrackReceived((function(t){console.log("Recibiendo audio de "+e.user.name+"."),a.playAudio(t.streams[0]),u.refreshUserList()})),t},e}();t.PeerChannel=l},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.PeerConnection=void 0;const i=r(n(19)),o=n(0);t.PeerConnection=class{constructor(){this.rtc=this.createRtc(),this.onTrackReceived=o.emitter(),this.onDataChannel=o.emitter()}async createOffer(e={}){const t=await this.rtc.createOffer(e);return await this.rtc.setLocalDescription(t),await this.processIceCandidates(),this.rtc.localDescription}async acceptOffer(e,t={}){return await this.setRemoteDescription(e),this.createAnswer(t)}acceptAnswer(e){return this.setRemoteDescription(e)}addStream(e){e.getTracks().forEach(t=>this.addTrack(t,e))}addTrack(e,t){return this.rtc.addTrack(e,t)}reset(){this.rtc.close(),this.rtc=this.createRtc()}close(){this.rtc.close()}async createAnswer(e={}){const t=await this.rtc.createAnswer(e);return await this.rtc.setLocalDescription(t),await this.processIceCandidates(),this.rtc.localDescription}createRtc(){const e=new RTCPeerConnection({iceServers:i.default()});return e.ontrack=e=>this.onTrackReceived.emit(e),e.ondatachannel=e=>this.onDataChannel.emit(e),e}processIceCandidates(){return new Promise(e=>{this.rtc.onicecandidate=({candidate:t})=>null==t&&e()})}setRemoteDescription(e){return this.rtc.setRemoteDescription(new RTCSessionDescription(e))}}},function(e,t,n){"use strict";var r=n(20);e.exports=function(e){var t,i={stun:(e||{}).stun||n(21),turn:(e||{}).turn||n(22)},o=(e||{}).stunCount||2,s=(e||{}).turnCount||0;function c(e,t){for(var n,o=[],s=[].concat(i[e]);s.length&&o.length<t;)n=Math.random()*s.length|0,o=o.concat(s.splice(n,1));return o.map((function(t){return"string"==typeof t||t instanceof String?r(e+":"+t):t}))}return t=[].concat(c("stun",o)),s&&(t=t.concat(c("turn",s))),t}},function(e,t){var n=["stun:","turn:"];e.exports=function(e){var t,r,i=(e||{}).url||e,o={};return"string"==typeof i||i instanceof String?(i=i.trim(),(t=n[n.indexOf(i.slice(0,5))])?(r=(i=i.slice(5)).split("@"),o.username=e.username,o.credential=e.credential,r.length>1&&(i=r[1],r=r[0].split(":"),o.username=r[0],o.credential=(e||{}).credential||r[1]||""),o.url=t+i,o.urls=[o.url],o):e):e}},function(e){e.exports=JSON.parse('["stun.l.google.com:19302","stun1.l.google.com:19302","stun2.l.google.com:19302","stun3.l.google.com:19302","stun4.l.google.com:19302","stun.ekiga.net","stun.ideasip.com","stun.schlund.de","stun.stunprotocol.org:3478","stun.voiparound.com","stun.voipbuster.com","stun.voipstunt.com","stun.voxgratia.org"]')},function(e){e.exports=JSON.parse("[]")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Socket=void 0;var r=n(24),i=function(){function e(e){var t=this;this.uri=e,this.socket=new r.JsonSocket(this.uri),this.listeners=new Map,this.socket.onMessage((function(e){return t.processMessage(e)}))}return e.prototype.onMessage=function(e,t){this.listeners.has(e)?this.listeners.get(e).push(t):this.listeners.set(e,[t])},e.prototype.send=function(e){this.socket.send(e)},e.prototype.processMessage=function(e){var t=this.listeners.get(e.type);console.debug(e.type,e),t?t.forEach((function(t){return t(e)})):console.log("Unhandled message: "+e.type)},e}();t.Socket=i},function(e,t,n){"use strict";n.r(t),n.d(t,"JsonSocket",(function(){return i}));var r=n(0);class i{constructor(e){this.uri=e,this.RECONNECTION_DELAY=100,this.MAX_RECONNECT_ATTEMPTS=14,this.reconnectionDelay=100,this.reconnectAttempts=0,this.disconnectedAt=new Date,this.isReconnecting=!1,this.isFirstConnection=!0,this.ws=this.init(),this.onOpen=Object(r.emitter)(),this.onMessage=Object(r.emitter)(),this.onReconnect=Object(r.emitter)()}get isConnected(){return!this.isFirstConnection&&!this.isReconnecting}init(){const e=new WebSocket(this.uri);return e.onopen=()=>this.connectionOpen(),e.onmessage=e=>this.processMessage(e),e.onerror=()=>this.connectionLost(),e.onclose=()=>this.connectionLost(),e}send(e){this.ws.send(JSON.stringify(e))}processMessage(e){let t;try{t=JSON.parse(e.data)}catch(t){return void console.error("Invalid JSON",e.data)}this.onMessage.emit(t)}connectionOpen(){this.reconnectionDelay=this.RECONNECTION_DELAY,this.reconnectAttempts=0,this.isReconnecting=!1,this.isFirstConnection?(this.isFirstConnection=!1,this.onOpen.emit(this)):this.onReconnect.emit(this.disconnectedAt)}connectionLost(){if(this.isReconnecting)return;if(this.reconnectAttempts>this.MAX_RECONNECT_ATTEMPTS)return console.error(`Websocket aborted after ${this.reconnectAttempts} attempts`);0===this.reconnectAttempts&&(this.isReconnecting=!0,this.disconnectedAt=new Date);const e=`Socket closed. Waiting ${this.reconnectionDelay/1e3}s`,t="Reconnecting...",n=this.reconnectAttempts<1e3;console.debug(`${e} ${n?t:""}`),setTimeout(()=>{n||console.debug(t),this.reconnectionDelay*=2,this.reconnectAttempts++,this.ws=this.init()},this.reconnectionDelay)}close(){this.ws.onclose=null,this.ws.close()}}}]);
//# sourceMappingURL=main.js.map