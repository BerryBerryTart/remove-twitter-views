// ==UserScript==
// @name         I HATE YOU VIEWS
// @namespace    http://tampermonkey.net/
// @version      1.12
// @description  go away you little bitch
// @author       BEWWY
// @match        *://*.twitter.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let enableOnScrollCall = true;
let mainInterval = undefined;
let auxInterval = undefined;
const GENERAL_THROTTLE_LIMIT = 500;
const THROTTLE_LIMIT = 200;
const VIEWS_XPATH = '//span[span[span[span[text()="Views"]]]]';

window.addEventListener('DOMContentLoaded', () => initiateListeners());
window.addEventListener('blur', () => clearListeners());
window.addEventListener('focus', () => initiateListeners());

window.addEventListener('scroll', function (e) {
    if (!enableOnScrollCall) return;
    enableOnScrollCall = false;
    removeViewsFromDOM();
    setTimeout(function () { enableOnScrollCall = true }, THROTTLE_LIMIT);
});

function clearListeners(){
    clearInterval(mainInterval);
    clearInterval(auxInterval);
    mainInterval = undefined;
    auxInterval = undefined;    
}

function initiateListeners(){
    if (!mainInterval) mainInterval = setInterval(removeViewsFromDOM, GENERAL_THROTTLE_LIMIT);
    if (!auxInterval) auxInterval = setInterval(auxRemovewViews, GENERAL_THROTTLE_LIMIT);
}

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
            if (e.getAttribute('role') !== "menuitem") {
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

function auxRemovewViews() {
    let auxList = getElementByXpath(VIEWS_XPATH);
    if (auxList) {
        auxList.remove();
    }
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}  
