chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.ready === "ready") {
        sendResponse($('.table').html());
    }

    if (msg.ready === "testing") {
        alert('Testing aaa');
    }

});