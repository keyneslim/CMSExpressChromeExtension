chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {

        chrome.tabs.sendMessage(tabId, { ready: "ready" }, function (response) {
        });
        injectScriptCode('injectButton()');
    }
})

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.function === "updateDom") {
    }

});


function injectScriptCode(sCode, callback) {
    callback = callback || function () { };

    chrome.tabs.executeScript({
        code: sCode
    },
        callback
    );
}