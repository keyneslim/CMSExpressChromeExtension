chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.ready === "ready") {
        // $("#J_Header").append("<button> Testing </button>");
        // $(".table").live('DOMNodeInserted', function(e) {

        // });
        var ArrayToReturn = [];
        var count = 0;
        // $('#J_OrderList').children().each(function(index, element) {
        //     count = count + 1;
        //     ArrayToReturn.push($(this).attr('id'));
        //     var name = $(this).find('.item-basic-info a').attr('title');
        //     var image = $(this).find('.J_GoldReport img').attr('src');
        //     $(this).find('.td-op .td-inner').append(`<button class="buttonClick" data-id=${name} image-url=${image}> 添加到包裹 </button>`);
        //     // chrome.tabs.sendMessage(tabId, { function: "updateDom", element: ($this) }, function(response) {});
        // })
        $(".js-order-container").each(function () {
            // Test if the div element is empty
            var image = '';
            $(this).find("table tbody:last-child").find("tr").each(function () {
                var columnRow = $(this).find("td:first-child");
                console.log("the column row", columnRow);
                var imageRetrieved = columnRow.find("img:first-child").attr("src");
                if (imageRetrieved) {
                    image = imageRetrieved.substring(2, imageRetrieved.length);
                    console.log('the image converted', image);
                }
            });
            var tableRow = $(this).find("table tbody:last-child tr:first-child td:last-child")
            console.log('tableRow', tableRow);
            var orderId = tableRow.data("reactid").split("-")[1].split(".")[0];
            // var image = tableRow.find("img").attr("src")
            console.log('the d is', image);
            console.log(location.origin);

            $.ajax({
                url: "/trade/json/transit_step.do?bizOrderId=" + orderId,
                type: "GET",
                dataType: "json",
                success: function (t) {
                    if (t['isSuccess'] != 'true') {
                        tableRow.append(`<button> 包裹异常 </button>`);
                    } else {
                        var expressId = t.expressId
                        tableRow.append(`<button class="buttonClick" data-id=${expressId} image-url=${image} > 添加到包裹 </button>`);
                    }
                }
            })
        });
    }

});

$(document).ready(function () {
    $("body").on('click', '.buttonClick', function () {
        var productName = $(this).attr('data-id');
        var productImage = $(this).attr('image-url');
        // alert(`${productName} and ${productImage}`);
        // alert(`https://cmexpress.my/addProduct.php?productName=${productName}&productImage=${productImage}`);
        location.replace(`https://cmexpress.my/addProduct.php?productName=${encodeURI(productName)}&productImage=${productImage}`);
    });
});

testingAlarm() = function () {
    alert('testing');
}

testTheAddDom = function () {
    $("#J_Header").append("<button> 添加到包裹 </button>");
}