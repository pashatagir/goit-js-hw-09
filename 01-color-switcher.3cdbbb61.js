const t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null,n=!1;t.btnStart.addEventListener("click",(function(){if(n)return;n=!0,t.btnStart.setAttribute("disabled",!0),e=setInterval((()=>t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.3cdbbb61.js.map
