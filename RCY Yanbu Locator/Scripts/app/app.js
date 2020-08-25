var salahTimings;
var hotelsArray;
var weatherInfo;
var taxisArray;
var busRouteArray;

function initApp() {
    initMap();
}

function fetchHotelsArray(refresh) {
    if (refresh) hotelsArray = undefined;
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

function onOpenhotelPopup(refresh) {
    fetchHotelsArray(refresh).then(function (hotelsArray) {
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

function fetchSalahTimings(refresh) {
    if (refresh) salahTimings = undefined;
    var deferred = new $.Deferred();

    salahTimings ? deferred.resolve(salahTimings) :
        $.get({
            url: "https://api.pray.zone/v2/times/today.json?city=mecca",
            dataType: 'json',

            success: function (response) {
                if (typeof response == "object" && response.code == 200) {
                    salahTimings = response.results.datetime[0].times;
                    deferred.resolve(salahTimings);
                }
            },
            error: function (err) {

            }
        })
    return deferred.promise();
}

function onOpenSalahTimingsPopup() {
    fetchSalahTimings().then(function (salahTimings) {
        //console.log(salahTimings);
        Object.keys(salahTimings).forEach(function (key) {
            $('#' + key).html(salahTimings[key]);
        })
    });
}

function fetchWeatherInfo(refresh) {
    if (refresh) weatherInfo = undefined;
    var deferred = new $.Deferred();

    weatherInfo ? deferred.resolve(weatherInfo) :
        $.get({
            url: " http://api.weatherstack.com/current?access_key=46acd15f2270726d9c5541bb605ff477&query=Yanbu",
            dataType: 'json',
            success: function (response) {
                if (typeof response == "object" && response.current) {
                    weatherInfo = response.current;
                    deferred.resolve(weatherInfo);
                }
            },
            error: function (err) {

            }
        })

    return deferred.promise();
}

function onOpenWeatherPopup(refresh) {
    fetchWeatherInfo(refresh).then(function (weatherInfo) {
        //console.log(weatherInfo);

        $("#temperature").html(weatherInfo.temperature + "<span>&#176</span>C");
        $("#weather_descriptions").html(weatherInfo.weather_descriptions.toString());
        $("#weather_icons").html('<img src="' + weatherInfo.weather_icons[0] + '" />');

        $("#feelslike").html(weatherInfo.feelslike);
        $("#pressure").html(weatherInfo.pressure);
        $("#humidity").html(weatherInfo.humidity);
        $("#wind").html(weatherInfo.wind_speed + "," + weatherInfo.wind_dir);
        $("#visibility").html(weatherInfo.visibility);
        $("#cloudcover").html(weatherInfo.cloudcover);
    });
}

function fetchTaxisArray(refresh) {
    if (refresh) taxisArray = undefined;
    return $.when(
        taxisArray ||
        $.get({
            url: baseAPIsURL + "m_GetAllTaxis",
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.length) {
                    taxisArray = response;
                }
            },
            error: function (err) { }
        })
    );
}

function onOpenTaxisPopup(refresh) {
    fetchTaxisArray(refresh).then(function (taxisArray) {
        //console.log(taxisArray);
        $('#taxi_tbl_body').html('');
        taxisArray.forEach(function (taxi) {
            var row = "<tr>"
                + "<td>" + taxi.SERVICE_NAME + "</td>"
                + "<td>" + taxi.PHONE + "</td>"
                + "</tr>";
            $('#taxi_tbl_body').append(row);
        });
        $("#taxi_tbl_body").niceScroll();
    });
}

function fetchBusRouteArray(refresh) {
    if (refresh) busRouteArray = undefined;
    return $.when(
        busRouteArray ||
        $.get({
            url: baseAPIsURL + "m_BusRouteDetails",
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.length) {
                    busRouteArray = response;
                }
            },
            error: function (err) { }
        })
    );
}

function onOpenBusRoutePopup(refresh) {
    fetchBusRouteArray(refresh).then(function (busRouteArray) {
        console.log(busRouteArray);
        $('#accordionExample').html('');
        var temp = $.trim($('#bus_route_entry').html());
        busRouteArray.forEach(function (obj) {
            var row = temp.replace(/{{routeNmae}}/ig, obj.routeNmae);
            row = row.replace(/{{RouteID}}/ig, obj.RouteID);
            row = row.replace(/{{Start}}/ig, obj.Start);
            row = row.replace(/{{End}}/ig, obj.End);
            row = row.replace(/{{TotalDistance}}/ig, obj.TotalDistance);
            var stops = "";
            obj.Intermediate.split(",").forEach(function (stop) {
                stops += "<li>" + stop + "</li>"
            });
            row = row.replace(/{{bus-stops}}/ig, stops);
            $('#accordionExample').append(row);
        });
        $("#accordionExample").niceScroll();
    });
}