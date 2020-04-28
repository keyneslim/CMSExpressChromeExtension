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
            var image = $(this).find('.J_GoldReport img').attr('src');
            $(this).find('.td-op .td-inner').append(`<button class="buttonClick" data-id=${name} image-url=${image}> 添加到包裹 </button>`);
            // chrome.tabs.sendMessage(tabId, { function: "updateDom", element: ($this) }, function(response) {});
        })
        sendResponse(ArrayToReturn);

    }

});

$(document).ready(function() {
    $("body").on('click', '.buttonClick', function() {
        var productName = $(this).attr('data-id');
        var productImage = $(this).attr('image-url');
        // alert(`${productName} and ${productImage}`);
        // alert(`https://cmexpress.my/addProduct.php?productName=${productName}&productImage=${productImage}`);
        location.replace(`https://cmexpress.my/addProduct.php?productName=${encodeURI(productName)}&productImage=${productImage}`);
    });
});

testingAlarm() = function() {
    alert('testing');
}

testTheAddDom = function() {
    $("#J_Header").append("<button> 添加到包裹 </button>");
}