chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.ready === "ready") {
        // $("#J_Header").append("<button> Testing </button>");
        // $(".table").live('DOMNodeInserted', function(e) {

        // });
        var ArrayToReturn = [];
        var count = 0;
        $('#J_OrderList').children().each(function(index, element) {
            count = count + 1;
            ArrayToReturn.push($(this).attr('id'));
            var name = $(this).find('.item-basic-info a').attr('title');
            $(this).find('.td-op .td-inner').append(`<button class="buttonClick" data-id=${name}> Testing </button>`);
            // chrome.tabs.sendMessage(tabId, { function: "updateDom", element: ($this) }, function(response) {});
        })
        sendResponse(ArrayToReturn);

    }

});

$(document).ready(function() {
    $("body").on('click', '.buttonClick', function() {
        var id = $(this).attr('data-id');
        alert(id);
    });
});

testingAlarm() = function() {
    alert('testing');
}

testTheAddDom = function() {
    $("#J_Header").append("<button> Testing </button>");
}