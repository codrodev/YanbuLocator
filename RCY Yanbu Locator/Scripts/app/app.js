function onOpenhotelPopup() {
    $.get({
        url: baseAPIsURL + 'm_GetHotels',
        dataType: 'json',
        contentType: "application/json",
        success: function (response) {
            if (typeof response == "object" && response.length) {
                $('#hotel_details_tbl_body').html('');
                var tempHotelRow = $.trim($('#hotel_row').html());
                response.forEach(function (hotel) {
                    var row = tempHotelRow.replace(/{{hotelname}}/ig, hotel.Name);
                    row = row.replace(/{{contact}}/ig, hotel.Phone);
                    row = row.replace(/{{address}}/ig, hotel.Address);
                    row = row.replace(/{{hotelID}}/ig, hotel.Id);
                    row = row.replace(/{{lat}}/ig, hotel.Lat_Y);
                    row = row.replace(/{{lon}}/ig, hotel.Lon_X);
                    $('#hotel_details_tbl_body').append(row);
                });
            }
        },
        error: function (err) {

        }
    });
}