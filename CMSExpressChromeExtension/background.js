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

chrome.tabs.onSelectionChanged.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {

        var codeToRun = `
		var someText = "Hello, World!";
		$('#SIvCob').append("<button> Testing </button>");
		`;
        chrome.tabs.sendMessage(tabId, { ready: "ready" }, function(response) {
            console.log(response);
        });
        injectScriptCode(codeToRun, null);
    }
})

function injectScriptCode(sCode, callback) {
    callback = callback || function() {};

    chrome.tabs.executeScript({
            code: sCode
        },
        callback
    );
}