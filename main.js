// ==UserScript==
// @name         I HATE YOU VIEWS
// @namespace    http://tampermonkey.net/
// @version      1.06
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

(function () {
    setInterval(removeViewsFromDOM, GENERAL_THROTTLE_LIMIT);
})();

window.addEventListener('scroll', function (e) {
    if (!enableOnScrollCall) return;
    enableOnScrollCall = false;
    removeViewsFromDOM();
    setTimeout(function () { enableOnScrollCall = true }, THROTTLE_LIMIT);
});

function removeViewsFromDOM() {
    let removalList = document.querySelectorAll("a[href$='analytics']");
    if (removalList.length === 0) return;
    let cleanupList = [];
    //Removes the main guff
    removalList.forEach(
        e => {
            let a = e.parentNode;
            let b = a.parentNode; //why twitter
            cleanupList.push(b);
            if (e.role !== "menuitem") {
                a.remove();
            }
        }
    );
    //bodge to clean up the empty div left over
    if (cleanupList.length > 0) {
        cleanupList.forEach(
            e => {
                if (!e.childNodes.length) {
                    e.remove();
                }
            }
        );
    }
}
