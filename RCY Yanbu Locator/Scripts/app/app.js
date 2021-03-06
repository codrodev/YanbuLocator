﻿var salahTimings;
var hotelsArray;
var weatherInfo;
var taxisArray;
var busRouteArray;
var newsArray;
var eventsArray;
var currenciesArray;
var fromCurrencyId;
var toCurrencyId;
var initFromCurrrency = "SAR";
var initToCurrrency = "USD";
var inputCurrency;
var currentConvertedCurrencyVal;
var emergencyServices;
var poisAndKIOSKObj;

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
        //console.log(busRouteArray);
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

function fetchNewsArray(refresh) {
    if (refresh) newsArray = newsArray;
    return $.when(
        newsArray ||
        $.get({
            url: baseAPIsURL + "GetRCYNews",
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.length) {
                    newsArray = response;
                }
            },
            error: function (err) { }
        })
    );
}

function fetchEventsArray(refresh) {
    if (refresh) eventsArray = eventsArray;
    return $.when(
        eventsArray ||
        $.get({
            url: baseAPIsURL + "GetRCYEvents",
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.length) {
                    eventsArray = response;
                }
            },
            error: function (err) { }
        })
    );
}

function onOpenNewsEventsPopup(refresh) {

    fetchNewsArray(refresh).then(function (newsArray) {
        //console.log(newsArray);
        $('#nav-home').html('');
        var temp = $.trim($('#news-entry').html());
        newsArray.forEach(function (obj) {
            var row = temp.replace(/{{IMAGE_URL}}/ig, obj.IMAGE_URL);
            row = row.replace(/{{NEWS_DATE}}/ig, obj.NEWS_DATE);
            row = row.replace(/{{NEWS}}/ig, obj["NEWS_" + lang.toUpperCase()]);
            row = row.replace(/{{DESCRIPTION}}/ig, obj["DESCRIPTION_" + lang.toUpperCase()]);

            $('#nav-home').append(row);
        });

        $(".news-popup .tab-pane").niceScroll();
    });

    fetchEventsArray(refresh).then(function (eventsArray) {
        //console.log(eventsArray);
        $('#nav-profile').html('');
        var temp = $.trim($('#events-entry').html());
        eventsArray.forEach(function (obj) {
            var row = temp.replace(/{{PICTURE_URL}}/ig, obj.PICTURE_URL);
            row = row.replace(/{{EVENT_DATE}}/ig, obj.EVENT_DATE);
            row = row.replace(/{{NAME}}/ig, obj["NAME_" + lang.toUpperCase()]);
            row = row.replace(/{{DESCRIPTION}}/ig, obj["DESCRIPTION_" + lang.toUpperCase()]);
            row = row.replace(/{{LOC_COORDINATES}}/ig, obj.LOC_COORDINATES);
            row = row.replace(/{{NAME}}/ig, obj["NAME_" + lang.toUpperCase()]);

            $('#nav-profile').append(row);
        });
    });
}

function fetchCurrenciesArray(refresh) {
    if (refresh) currenciesArray = currenciesArray;
    return $.when(
        currenciesArray ||
        $.get({
            url: baseAPIsURL + "m_GetAllCurrencies",
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object" && response.length) {
                    currenciesArray = response;
                }
            },
            error: function (err) { }
        })
    );
}

function onOpenCurrencyExchangePopup() {
    if (!currenciesArray) {
        fetchCurrenciesArray().then(function (currenciesArray) {
            currenciesArray.forEach(function (obj) {
                $("#from_currency_dd").append($("<option     />").val(obj.CurrencyId).text(obj.CurrencyId + " " + obj.CurrencyName));
                $("#to_currency_dd").append($("<option     />").val(obj.CurrencyId).text(obj.CurrencyId + " " + obj.CurrencyName));
            });

            $("#from_currency_dd").val(initFromCurrrency);
            $("#to_currency_dd").val(initToCurrrency);

            $("#from_currency_dd").on("change", function () {
                fromCurrencyId = $("#from_currency_dd").val();
                $("#from_currency_id").text(fromCurrencyId);
                currencyDDChange();
            }).change()

            $("#to_currency_dd").on("change", function () {
                toCurrencyId = $("#to_currency_dd").val();
                $(".to_currency_id").text(toCurrencyId);
                currencyDDChange();
            }).change()

            $("#input_currency_tf").on("change paste keyup wheel", function () {
                inputCurrency = this.value;
                inputCurrencyChange();
            })
            inputCurrency = $("#input_currency_tf").val();

        });
    }
}

function fetchEmergencyServices(refresh) {
    if (refresh) emergencyServices = undefined;
    var deferred = new $.Deferred();

    emergencyServices ? deferred.resolve(emergencyServices) :
        $.get({
            url: baseAPIsURL + "GetRCYEmergencyServices",
            dataType: 'json',

            success: function (response) {
                if (typeof response == "object") {
                    emergencyServices = {};
                    try {
                        response.forEach(function (obj) {
                            if (!emergencyServices[obj.SERVICETYPE]) emergencyServices[obj.SERVICETYPE] = [];
                            emergencyServices[obj.SERVICETYPE].push(obj);
                        });
                        deferred.resolve(emergencyServices);
                    } catch (e) {
                        emergencyServices = undefined;
                    }
                }
            },
            error: function (err) {

            }
        })
    return deferred.promise();
}

function onOpenEmergencyServicesPopup(refresh) {
    fetchEmergencyServices(refresh).then(function (emergencyServices) {
        //console.log(emergencyServices);
        $('#emergency-content').html('');
        var temp = $.trim($('#emergency-item-entry').html());
        var subtemp = $.trim($('#emergency-sub-item-entry').html());
        Object.keys(emergencyServices).forEach(function (key) {
            var row = temp.replace(/{{SERVICETYPE}}/ig, key);
            var subrows = "";
            emergencyServices[key].forEach(function (obj) {
                var subrow = subtemp.replace(/{{NAME}}/ig, obj.NAME);
                subrow = subrow.replace(/{{PHONE}}/ig, obj.PHONE);
                subrows += subrow;
            });
            row = row.replace(/{{emergencySubItems}}/ig, subrows);
            $('#emergency-content').append(row);
        });
        ///Content/images/helmet.svg
        ///Content/images/heart.svg
        $('#emergency-content').niceScroll();
    });
}

function fetchPOIAndKiosk(refresh) {
    if (refresh) poisAndKIOSKObj = undefined;
    var deferred = new $.Deferred();

    poisAndKIOSKObj ? deferred.resolve(poisAndKIOSKObj) :
        $.get({
            url: baseAPIsURL + "m_GetKioskAndCategories",
            dataType: 'json',

            success: function (response) {
                if (typeof response == "object") {
                    poisAndKIOSKObj = response;
                    deferred.resolve(poisAndKIOSKObj);
                }
            },
            error: function (err) {
            }
        })
    return deferred.promise();
}

//

function onOpenPOIAndKiosk(refresh) {
    fetchPOIAndKiosk(refresh).then(function (poisAndKIOSKObj) {
        $('#nav-poi').html('');
        var pois = poisAndKIOSKObj.CategoriesDetail;
        var Kiosk = poisAndKIOSKObj.Kiosk;
        pois.forEach(function (poi) {
            var toAppend = '<div class="poi-items" onclick="onPoiClick(\'{{name}}\', \'{{imageUrl}}\', {{code}})"><img src="' + poi.imageUrl + '" /> ' + poi.name + '</div>';
            toAppend = toAppend.replace(/{{name}}/ig, poi.name);
            toAppend = toAppend.replace(/{{imageUrl}}/ig, poi.imageUrl);
            toAppend = toAppend.replace(/{{code}}/ig, poi.code);
            $('#nav-poi').append(toAppend);
        });
        $("#nav-poi").niceScroll();
    });

}

//---------------------------------------------------//
function currencyDDChange() {
    //console.log(fromCurrencyId, toCurrencyId);
    if (fromCurrencyId && toCurrencyId) {
        $.get({
            url: baseAPIsURL + "m_GetCurrencyValue?key=" + fromCurrencyId + "_" + toCurrencyId,
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                //console.log(response);
                if (typeof response == "number") {
                    currentConvertedCurrencyVal = response;
                    $("#current_currency_value").text(response.toFixed(3));
                    inputCurrencyChange();
                }
            },
            error: function (err) { }
        })
    }
}

function inputCurrencyChange() {
    //console.log(inputCurrency);
    $("#input_currency_value").text((inputCurrency * currentConvertedCurrencyVal).toFixed(3));
}