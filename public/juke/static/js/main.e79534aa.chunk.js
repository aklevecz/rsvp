(this.webpackJsonpjukebox=this.webpackJsonpjukebox||[]).push([[0],[,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t),n.d(t,"authBaseUrl",(function(){return b})),n.d(t,"apiBaseUrl",(function(){return f})),n.d(t,"b",(function(){return m})),n.d(t,"refresh_token",(function(){return p}));var c=n(1),r=n.n(c),a=n(3),o=n.n(a),s=(n(9),n(10),n(2)),i=(n(11),n(0));function u(e){var t=e.song,n=e.yes,c=e.no;return Object(a.createPortal)(Object(i.jsx)("div",{id:"modal",onClick:c,children:Object(i.jsxs)("div",{className:"modal__wrapper",onClick:function(e){return e.stopPropagation()},children:[Object(i.jsx)("div",{className:"modal__song",children:t.name}),Object(i.jsxs)("div",{className:"button__container",children:[Object(i.jsx)("button",{onClick:n,className:"button--inverse",children:"Yes"}),Object(i.jsx)("button",{onClick:c,className:"button--inverse",children:"No"})]})]})}),document.getElementById("modal-root"))}var l=function(e){return{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic ".concat(e)}},j=function(e){return{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)}};var d=function(){var e=Object(c.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)([]),o=Object(s.a)(a,2),d=o[0],h=o[1],O=Object(c.useState)(""),v=Object(s.a)(O,2),_=v[0],g=v[1],x=Object(c.useState)(!1),k=Object(s.a)(x,2),w=k[0],y=k[1],N=Object(c.useState)(null),C=Object(s.a)(N,2),S=C[0],E=C[1],T=Object(c.useState)(null),P=Object(s.a)(T,2),z=P[0],B=P[1];Object(c.useEffect)((function(){var e=window.location.search.replace("?code=","");e&&fetch(b,{method:"POST",headers:l(m),body:new URLSearchParams({grant_type:"authorization_code",code:e,redirect_uri:"http://localhost:3000"})}).then((function(e){return e.json()})).then(console.log),fetch(b,{method:"POST",headers:l(m),body:new URLSearchParams({grant_type:"refresh_token",refresh_token:p})}).then((function(e){return e.json()})).then((function(e){console.log("new token: ",e.access_token),g(e.access_token)}))}),[]);var F=function(){fetch("".concat(f,"/search?q=").concat(n,"&type=track"),{headers:j(_)}).then((function(e){return e.json()})).then((function(e){h(e.tracks.items)}))},I=Object(c.useCallback)((function(){fetch("".concat(f,"/me/player/currently-playing"),{method:"GET",headers:j(_)}).then((function(e){return e.json()})).then((function(e){B("".concat(e.item.name," - ").concat(e.item.artists.map((function(e){return e.name})).join(", ")))}))}),[_]);return Object(c.useEffect)((function(){var e;return _&&(e=setInterval(I,5e3)),function(){return clearInterval(e)}}),[I,_]),Object(i.jsxs)("div",{className:"page",children:[false,Object(i.jsx)("div",{className:"currently-playing",children:z}),Object(i.jsx)("div",{className:"page__content",children:Object(i.jsxs)("div",{className:"page__content__wrapper ".concat(w?"list-view":""),children:[!w&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"wrapper__item",children:Object(i.jsx)("input",{onKeyPress:function(e){"Enter"===e.key&&F()},value:n,onChange:function(e){return r(e.target.value)}})}),Object(i.jsx)("div",{className:"wrapper__item button__wrapper",children:Object(i.jsx)("button",{onClick:F,children:"Search"})})]}),Object(i.jsx)("div",{className:"list__container ".concat(w?"list-view":""),children:Object(i.jsx)("div",{className:"list__wrapper",children:d.map((function(e){return Object(i.jsxs)("div",{onClick:function(){return E(e)},children:[e.name," -"," ",e.artists.map((function(e){return e.name})).join(", ")]},e.uri)}))})})]})})," ",d.length>0&&Object(i.jsxs)("div",{children:[Object(i.jsx)("button",{className:"button__list-view",onClick:function(){return y(!w)},children:w?"Search":"Expand"}),Object(i.jsx)("button",{className:"button__clear-view",onClick:function(){h([]),r("")},children:w?"":"Clear"})]}),S&&Object(i.jsx)(u,{yes:function(){return e=S.uri,void fetch("".concat(f,"/me/player/queue?uri=").concat(e),{method:"POST",headers:j(_)}).then((function(e){console.log(e),204===e.status?alert("Success! :)"):alert("Hm something went wrong :("),E(null)}));var e},no:function(){return E(null)},song:S})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))},b="https://accounts.spotify.com/api/token",f="https://api.spotify.com/v1",m="Mzc2NDdmMzNlNzA0NDRkYmIxYzU3ODYzZTA5OTkzOGQ6YzQyZjhkODM4ZjE2NGQ5MTg5MmJhNzdkOWE3NTk1ZjE=",p="AQDTXgX0MOIvQGRz6r50We2GfqlOSesolPscwsT2kfPfenRaZQ9x3xECyyPve4JNYeEAjVWvoHOvjca2NEmpEjJJgqFxgrBXyvp6c7JmQ0c18CR8EFS8B58jcgk0mEiwETw";o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(d,{})}),document.getElementById("root")),h()}],[[13,1,2]]]);
//# sourceMappingURL=main.e79534aa.chunk.js.map