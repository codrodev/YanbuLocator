var yanbuMap = undefined;;
var yanbuMapLayer = undefined;
var initExtent = undefined;
var mapLayerDetails = undefined;
function initMap() {
    require([
        "dojo/_base/connect",
        "dojo/dom",
        "dojo/parser",
        "dojo/on",
        "esri/Color",
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/geometry/Point",
        "esri/SpatialReference",
        "dojo/domReady!"], function (connect, dom, parser, on, Color, Map, Extent, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer,
            Point, SpatialReference) {
        parser.parse();
        //initExtent = new Extent({
        //    "xmin": 419580.3022800002,
        //    "ymin": 2654701.434447549,
        //    "xmax": 420661.2023200004,
        //    "ymax": 2655088.3304228694,
        //    "spatialReference": {
        //        "wkid": 32637
        //    }
        //});

        yanbuMap = new Map("map-container", {
            basemap: "streets-night-vector", // Valid values are: "streets" | "satellite" | "hybrid" | "topo" | "gray" | "dark-gray" | "oceans" | "national-geographic" | "terrain" | "osm" | "dark-gray-vector" | "gray-vector" | "streets-vector" | "streets-night-vector" | "streets-relief-vector" | "streets-navigation-vector" | "topo-vector"
            //extent: initExtent,
            logo: false,
            sliderPosition: "bottom-left",
            sliderStyle: "small"

        });

        dojo.connect(yanbuMap, "onLoad", function mapReady() {
            setTimeout(function () {
                console.log('map ready');
                // map.setLevel(12);
                yanbuMap.centerAndZoom(new esri.geometry.Point(38.206150, 24.020854), 12);
                getMapLayerDetails();
            }, 100);
        });
    });
}

function toggleLayer(cb, layer, Id) {
    console.log(cb.checked, layer, Id);
    var visibleLayers = yanbuMapLayer.visibleLayers;
    if (cb.checked) {
        if (visibleLayers.indexOf(Id) == -1) {
            visibleLayers.push(Id);
        }
    } else {
        if (visibleLayers.indexOf(Id) != -1) {
            visibleLayers.splice(visibleLayers.indexOf(Id), 1);
        }
    }
    yanbuMapLayer.setVisibleLayers(visibleLayers);
}



function getMapLayerDetails() {
    $.get({
        url: baseAPIsURL + 'm_GetYanbuLocatorMapDetails',
        dataType: 'json',
        contentType: "application/json",
        success: function (response) {
            if (typeof response == "object") {
                mapLayerDetails = response;
                console.log(mapLayerDetails);

                yanbuMapLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mapLayerDetails.MapUrl, {});
                yanbuMapLayer.setVisibleLayers([]);
                yanbuMap.addLayer(yanbuMapLayer);
                fillMapLayersDD(mapLayerDetails.Layers);
            }
        },
        error: function (err) {

        }
    });
}

function fillMapLayersDD(arr) {
    $('#map-layers-list-dd').html('');
    var tempDDEntry = $.trim($('#map-layer-dd-entry').html());
    arr.forEach(function (obj) {
        //console.log(obj);
        var row = tempDDEntry.replace(/{{layerName}}/ig, obj.Name);
        row = row.replace(/{{Id}}/ig, obj.Id);
        //row = row.replace(/{{iconUrl}}/ig, hotel.Address);
        $('#map-layers-list-dd').append(row);
    });
}

function onHotelClick(Id, lat, lon) {
    console.log(Id, lat, lon);
}