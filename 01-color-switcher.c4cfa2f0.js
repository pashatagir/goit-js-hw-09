!function(){var t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")},n=null,e=!1;t.btnStart.addEventListener("click",(function(){if(e)return;e=!0,n=setInterval((function(){return t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.c4cfa2f0.js.map
