chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.ready === "ready") {
        var ArrayToReturn = [];
        var count = 0;
        $(".js-order-container").each(function () {
            // Test if the div element is empty
            var image = '';
            $(this).find("table tbody:last-child").find("tr").each(function () {
                var columnRow = $(this).find("td:first-child");
                var imageRetrieved = columnRow.find("img:first-child").attr("src");
                if (imageRetrieved) {
                    image = imageRetrieved.substring(2, imageRetrieved.length);
                }
            });
            var tableRow = $(this).find("table tbody:last-child tr:first-child td:last-child")
            var orderId = tableRow.data("reactid").split("-")[1].split(".")[0];
            // var image = tableRow.find("img").attr("src")

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
        window.open(`https://cmexpress.my/addProduct.php?productName=${encodeURI(productName)}&productImage=${productImage}`);
    });
});

injectButton = function () {
    $("#J_Header").append("<button> 添加到包裹 </button>");
}