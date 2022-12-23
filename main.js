// ==UserScript==
// @name         I HATE YOU VIEWS
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  go away you little bitch
// @author       BEWWY
// @match        https://twitter.com/*
// @match        https://twitter.com/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let enableOnScrollCall = true;
const GENERAL_THROTTLE_LIMIT = 400;
const THROTTLE_LIMIT = 100;

(function() {
    setInterval(removeViewsFromDOM, GENERAL_THROTTLE_LIMIT);
})();

window.addEventListener('scroll', function(e){
    if (!enableOnScrollCall) return;
    enableOnScrollCall = false;
    removeViewsFromDOM();
    setTimeout(function(){ enableOnScrollCall = true}, THROTTLE_LIMIT);
});

function removeViewsFromDOM(){
    let removalList = document.querySelectorAll("a[href$='analytics']");
    removalList.forEach(
        e => {
            let a = e.closest("div");
            a.remove();
        }
    );
}