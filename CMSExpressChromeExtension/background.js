var screenshot = {
    content: document.createElement("canvas"),
    data: '',

    init: function() {
        // this.initEvents();
        this.initTest();
    },

    saveScreenshot: function() {
        var image = new Image();
        image.onload = function() {
            var canvas = screenshot.content;
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);

            // save the image
            var link = document.createElement('a');
            link.download = "download.png";
            link.href = screenshot.content.toDataURL();
            link.click();
            screenshot.data = '';
        };
        image.src = screenshot.data;
    },

    initEvents: function() {
        chrome.browserAction.onClicked.addListener(function(tab) {
            chrome.tabs.captureVisibleTab(null, {
                format: "png",
                quality: 100
            }, function(data) {
                screenshot.data = data;

                // send an alert message to webpage
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { ready: "ready" }, function(response) {
                        if (response.download === "download") {
                            screenshot.saveScreenshot();
                        } else {
                            screenshot.data = '';
                        }
                    });
                });

            });
        });
    },

    initTest: function() {}
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {

        // var codeToRun = `
        // var someText = "Hello, World!";
        // $('#SIvCob').append("<button> Testing </button>");
        // `;
        // MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        // var observer = new MutationObserver(function(mutations, observer) {
        //     // fired when a mutation occurs
        //     // console.log(mutations, observer);

        //     // ...
        // });

        // // define what element should be observed by the observer
        // // and what types of mutations trigger the callback
        // observer.observe(document, {
        //     subtree: true,
        //     attributes: true,
        //     childList: true
        // });
        chrome.tabs.sendMessage(tabId, { ready: "ready" }, function(response) {
            console.log(response);
        });
        injectScriptCode('testTheAddDom()');
    }
})

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.function === "updateDom") {
        // $("#J_Header").append("<button> Testing </button>");
        // $(".table").live('DOMNodeInserted', function(e) {
        console.log('the updated dom : ', msg.element.html());
        // });
        // var ArrayToReturn = [];
        // var count = 0;
        // $('#J_OrderList').children().each(function(index, element) {
        //     count = count + 1;
        //     ArrayToReturn.push($(this).html());
        // })
        // sendResponse(ArrayToReturn);

    }

});


function injectScriptCode(sCode, callback) {
    callback = callback || function() {};

    chrome.tabs.executeScript({
            code: sCode
        },
        callback
    );
}