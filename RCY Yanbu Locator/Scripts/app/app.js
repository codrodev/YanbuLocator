var salahTimings;
var hotelsArray;
function initApp() {
    initMap();
}

function fetchHotelsArray() {
    return $.when(
        hotelsArray ||
        $.get({
            url: baseAPIsURL + 'm_GetHotels',
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.length) {
                    hotelsArray = response;
                }
            },
            error: function (err) {

            }
        })
    );
}

function onOpenhotelPopup() {
    fetchHotelsArray().then(function (hotelsArray) {
        $('#hotel_details_tbl_body').html('');
        var tempHotelRow = $.trim($('#hotel_row').html());
        hotelsArray.forEach(function (hotel) {
            var row = tempHotelRow.replace(/{{contact}}/ig, hotel.Phone);
            row = row.replace(/{{contact}}/ig, hotel.Phone);
            row = row.replace(/{{address}}/ig, hotel.Address);
            row = row.replace(/{{hotelID}}/ig, hotel.Id);
            row = row.replace(/{{hotelname}}/ig, hotel.Name);
            row = row.replace(/{{lat}}/ig, hotel.Lat_Y);
            row = row.replace(/{{lon}}/ig, hotel.Lon_X);
            $('#hotel_details_tbl_body').append(row);
        });
        $("#hotel_details_tbl_body").niceScroll();
    });
    
}

function fetchSalahTimings() {
    return $.when(
        salahTimings ||
        $.get({
            url: "https://api.pray.zone/v2/times/this_week.json?city=mecca",
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.code == 200) {
                    salahTimings = response.results.datetime[0].times;
                    console.log(salahTimings);
                }
            },
            error: function (err) {

            }
        })
    );
}

function onOpenSalahTimings() {
    if (!salahTimings) {

    }
}