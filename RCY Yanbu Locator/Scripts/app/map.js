var yanbuMap = undefined;;
var yanbuMapLayer = undefined;
var initExtent = undefined;
var mapLayerDetails = undefined;
var ArcGISDynamicMapServiceLayer;
var Point;
var Color;
var PictureMarkerSymbol;
var Graphic;
var SpatialReference;
var TextSymbol;
var IdentifyTask, IdentifyParams;
var Polyline;
var SimpleLineSymbol;
function initMap() {
    require([
        "dojo/_base/connect",
        "dojo/dom",
        "dojo/parser",
        "dojo/on",
        "esri/Color",
        "esri/map",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/SpatialReference",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/TextSymbol",
        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",
        "dojo/_base/array",
        "dojo/domReady!"], function (connect, dom, parser, on, Color, Map, graphic, InfoTemplate, Extent, ArcGISDynamicMapServiceLayer, Point, Polyline, SpatialReference, PictureMarkerSymbol, SimpleLineSymbol, TextSymbol, IdentifyTask, IdentifyParameters, arrayUtils) {
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

            this.Color = Color;
            this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
            this.Point = Point;
            this.Polyline = Polyline;
            this.PictureMarkerSymbol = PictureMarkerSymbol;
            this.SimpleLineSymbol = SimpleLineSymbol;
            this.Graphic = graphic;
            this.SpatialReference = SpatialReference;
            this.TextSymbol = TextSymbol;
            //this.IdentifyTask = identifyTask;
            //this.IdentifyParams = identifyParams;

            var identifyTask, identifyParams;
            //map creation
            yanbuMap = new Map("map-container", {
                basemap: "topo", // Valid values are: "streets" | "satellite" | "hybrid" | "topo" | "gray" | "dark-gray" | "oceans" | "national-geographic" | "terrain" | "osm" | "dark-gray-vector" | "gray-vector" | "streets-vector" | "streets-night-vector" | "streets-relief-vector" | "streets-navigation-vector" | "topo-vector"
                //extent: initExtent,
                logo: false,
                sliderPosition: "bottom-left",
                sliderStyle: "small"

            });

            dojo.connect(yanbuMap, "onLoad", function mapReady() {
                setTimeout(function () {
                    console.log('map ready');
                    // map.setLevel(12);
                    yanbuMap.centerAndZoom(new Point(38.206150, 24.000854), 14);
                    getMapLayerDetails().then(function (mapLayerDetails) {
                        //console.log(mapLayerDetails);
                        yanbuMapLayer = new ArcGISDynamicMapServiceLayer(mapLayerDetails.MapUrl, {});
                        yanbuMapLayer.setVisibleLayers([6, 7]); //haii and harah boundary visible
                        yanbuMap.addLayer(yanbuMapLayer);
                        fillMapLayersDD(mapLayerDetails.Layers, yanbuMapLayer.visibleLayers);

                        yanbuMap.on("click", executeIdentifyTask);
                        identifyTask = new IdentifyTask(mapLayerDetails.MapUrl);

                        identifyParams = new IdentifyParameters();
                        identifyParams.tolerance = 3;
                        identifyParams.returnGeometry = true;
                        //identifyParams.layerIds = [1, 2, 3, 4, 5, 6, 7];
                        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
                        identifyParams.width = yanbuMap.width;
                        identifyParams.height = yanbuMap.height;
                    });
                }, 100);
            });

            function executeIdentifyTask(event) {
                identifyParams.geometry = event.mapPoint;
                identifyParams.mapExtent = yanbuMap.extent;

                var deferred = identifyTask
                    .execute(identifyParams)
                    .addCallback(function (response) {
                        // response is an array of identify result objects
                        // Let's return an array of features.
                        return arrayUtils.map(response, function (result) {
                            var feature = result.feature;
                            var layerName = result.layerName;
                            var layerId = result.layerId;

                            feature.attributes.layerName = layerName;
                            feature.attributes.layerId = layerId;
                            if (layerId == 1) { //Landmarks
                                var template = new InfoTemplate($.i18n('Landmarks'),
                                    "<b>MADHKAL</b>: ${MADHKAL}<br/>"
                                    + "<b>Type</b>: ${Type}<br/>"
                                    + "<b>LAND LABEL </b>: ${LAND LABEL}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            } else if (layerId == 2) { //Bus Route
                                var template = new InfoTemplate($.i18n('Bus_Route'),
                                    "<b>Route Name</b>: ${RouteNameEn}<br/>"
                                    + "<b>Origin</b>: ${Origine}<br/>"
                                    + "<b>Destination</b>: ${Destination}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            } else if (layerId == 3) { //Buildings
                                var template = new InfoTemplate($.i18n('Buildings'),
                                    "<b>Building Name</b>: ${BLDG_NAME}<br/>"
                                    + "<b>LANDUSE TYPE</b>: ${LANDUSE_TYPE}<br/>"
                                    + "<b>STATUS</b>: ${STATUS}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            } else if (layerId == 4) { //LOT
                                var template = new InfoTemplate($.i18n('LOT'),
                                    "<b>NAME</b>: ${NAME}<br/>"
                                    + "<b>BLOCK_NO</b>: ${BLOCK_NO}<br/>"
                                    + "<b>STATUS</b>: ${STATUS}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            } else if (layerId == 5) {//Block 
                                var template = new InfoTemplate($.i18n('Block'),
                                    "<b>MANTEKA NO</b>: ${MANTEKA_NO}<br/>"
                                    + "<b>BLOCK_NO</b>: ${BLOCK_NO}<br/>"
                                    + "<b>STATUS</b>: ${STATUS}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            } else if (layerId == 6) { //HaiiBoundary 
                                var template = new InfoTemplate($.i18n('HaiiBoundary'),
                                    "<b>MANTEKA NO</b>: ${MANTEKA_NO}<br/>"
                                    + "<b>HAII NO</b>: ${HAII_NO}<br/>"
                                    + "<b>HAII NAME</b>: ${HAII_NAME}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            } else if (layerId == 7) { //HarahBoundary
                                var template = new InfoTemplate($.i18n('HarahBoundary'),
                                    "<b>MANTEKA NO</b>: ${MANTEKA_NO}<br/>"
                                    + "<b>HAII NO</b>: ${HAII_NO}<br/>"
                                    + "<b>HARAH NO</b>: ${HARAH_NO}<br/>"

                                );
                                feature.setInfoTemplate(template);
                            }
                            
                            return feature;
                        });
                    });

                yanbuMap.infoWindow.setFeatures([deferred]);
                yanbuMap.infoWindow.show(event.mapPoint);
            }
        });
}

function toggleLayer(cb, layer, Id) {
    //console.log(cb.checked, layer, Id);
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
    return $.when(
        mapLayerDetails ||
        $.get({
            url: baseAPIsURL + 'm_GetYanbuLocatorMapDetails',
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                if (typeof response == "object") {
                    mapLayerDetails = response;
                }
            },
            error: function (err) {

            }
        })
    );
}

function fillMapLayersDD(layersArr, visibleLayers) {
    var iconBaseUrl = "/Content/images/geom/";
    $('#map-layers-list-dd').html('');
    var tempDDEntry = $.trim($('#map-layer-dd-entry').html());
    layersArr.forEach(function (obj) {
        //console.log(obj);
        var row = tempDDEntry.replace(/{{layerName}}/ig, obj.Name);
        row = row.replace(/{{Id}}/ig, obj.Id);
        if (obj.FeatureType == META.esriGeometryPoint) {
            row = row.replace(/{{iconUrl}}/ig, iconBaseUrl + "point.png");
        } else if (obj.FeatureType == META.esriGeometryPolyline) {
            row = row.replace(/{{iconUrl}}/ig, iconBaseUrl + "line.png");
        } else {
            row = row.replace(/{{iconUrl}}/ig, iconBaseUrl + "polygon.png");
        }
        if (visibleLayers.indexOf(obj.Id) != -1) {
            row = row.replace(/{{checked}}/ig, "checked");
        } else {
            row = row.replace(/{{checked}}/ig, "");
        }
        $('#map-layers-list-dd').append(row);
    });
}

function onHotelClick(Id, lat, lon, name) {
    console.log(Id, lat, lon);
    yanbuMap.graphics.clear();
    var pictureMarkerSymbol = new PictureMarkerSymbol('/Content/images/geom/marker-icon.png', 32, 32).setOffset(0, 16);
    var point = new Point(lat, lon , new SpatialReference({ wkid: 4326 }));
    var icon = new Graphic(point, pictureMarkerSymbol);
    var label = new Graphic(point, new TextSymbol(name).setOffset(0, 32));
    yanbuMap.graphics.add(icon);
    yanbuMap.graphics.add(label);
    yanbuMap.centerAndZoom(point, 13);
}

function onBusRouteClick(routeID, source, dest) {
    //console.log(routeID);
    $.get({
        url: baseAPIsURL + "m_GetBusRouteDetailsById?Id=" + routeID,
        dataType: 'json',
        contentType: "application/json",
        success: function (response) {
            if (typeof response == "object") {
                //console.log(response);
                yanbuMap.graphics.clear();
                var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#FDAF85"), 4);
                var pictureMarkerSymbol = new PictureMarkerSymbol('/Content/images/geom/marker-icon.png', 32, 32).setOffset(0, 16);

                var polyline = new Polyline({
                    "spatialReference": { "wkid": 4326 },
                    "paths": [response.features[0].geometry.coordinates]
                });
                var sourceCoords = response.features[0].geometry.coordinates[0];
                var destCoords = response.features[0].geometry.coordinates[response.features[0].geometry.coordinates.length - 1];

                var sourcePoint = new Point(sourceCoords[0], sourceCoords[1], new SpatialReference({ wkid: 4326 }));
                var destPoint = new Point(destCoords[0], destCoords[1], new SpatialReference({ wkid: 4326 }));

                var sourceGraphic = new Graphic(sourcePoint, pictureMarkerSymbol);
                var destGraphic = new Graphic(destPoint, pictureMarkerSymbol);

                var sourceLabel = new Graphic(sourcePoint, new TextSymbol(source).setOffset(0, 32));
                var destLabel = new Graphic(destPoint, new TextSymbol(dest).setOffset(0, 32));

                var routeGraphic = new Graphic(polyline, sls);

                yanbuMap.graphics.add(routeGraphic);
                yanbuMap.graphics.add(sourceGraphic);
                yanbuMap.graphics.add(destGraphic);
                yanbuMap.graphics.add(sourceLabel);
                yanbuMap.graphics.add(destLabel);
                //yanbuMap.setExtent(polyline.getExtent());
                yanbuMap.centerAndZoom(polyline.getExtent().getCenter(), 15);
            }
        },
        error: function (err) { }
    })
}