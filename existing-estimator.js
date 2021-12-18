// Declare a global object to store view data.
var viewData;

sendData = {};
viewData = {};

$(function () {
  // An example of how the viewData can be used by other functions.
  function updateDisplay() {
    var updateEls;

    updateEls = $("[data-update]");

    updateEls.each(function () {
      if ($(this).hasClass("percent")) {
        $(this).html(viewData[$(this).data("update")] + "%");
      } else if ($(this).hasClass("dollar")) {
        $(this).html("$" + viewData[$(this).data("update")]);
        var el = $(this)
          .text()
          .replace("$", "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        el = "$" + el;
        $(this).html(el);
        console.log(el);
      }
    });
  }

  // Run updateDisplay on the callback.
  $(document).on("updateDisplay", updateDisplay);
});

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    $(document).trigger("updateDisplay");
    $("#results").show("slow");

    sendData = $("#price-inputs")
      .serializeArray()
      .reduce(function (m, o) {
        m[o.name] = o.value;
        return m;
      }, {});

    $.ajax({
      type: "POST",
      url: "https://app.wrapbook.com/api/quotes",
      data: { quote: sendData },
      success: function (data, status) {
        viewData = data;
        $(document).trigger("updateDisplay");
        $("#results").show("slow");
      },
    });

    ga("send", "event", "submit", "price-estimator", "");
  });
});

$("select").selectric();

$(document).ready(function () {
  $("#totalWagesVal").keyup(function (event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) {
      event.preventDefault();
    }
    var $this = $(this);
    var num = $this.val().replace(/,/gi, "").split("").reverse().join("");

    var num2 = RemoveRougeChar(
      num
        .replace(/(.{3})/g, "$1,")
        .split("")
        .reverse()
        .join("")
    );

    // the following line has been simplified. Revision history contains original.
    $this.val(num2);
  });
});

function RemoveRougeChar(convertString) {
  if (convertString.substring(0, 1) == ",") {
    return convertString.substring(1, convertString.length);
  }
  return convertString;
}

var Webflow = Webflow || [];
Webflow.push(function () {
  $("#calculate").click(function () {
    // $('.dollar').each(function () {
    //     var el = $(this).text().replace("$", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     el = "$" + el;
    //     console.log(el);
    // });
  });

  $("#totalWagesVal").keyup(function (event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    $(this).val(function (index, value) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    var firstValue = Number($("#totalWagesVal").val().replace(/,/g, ""));
    $("#useForCalc").val(firstValue);
  });
});
