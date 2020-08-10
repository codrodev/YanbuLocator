var yanbuMap;
var initExtent = undefined;
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
                
            });

            dojo.connect(yanbuMap, "onLoad", mapReady);
        });
}

function toggleLayer(e, layer) {
    alert('layer toggle');
}

function mapReady() {
    setTimeout(function () {
        console.log('map ready');
        // map.setLevel(12);
        yanbuMap.centerAndZoom(new esri.geometry.Point(38.206150, 24.020854), 10);
    }, 100);
}
function onHotelClick(Id, lat, lon) {
    console.log(Id, lat, lon);
}