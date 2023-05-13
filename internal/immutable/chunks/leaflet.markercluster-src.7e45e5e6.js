import{m as x,d as O}from"./IconBase.svelte_svelte_type_style_lang.e55a11b1.js";function w(y,M){for(var g=0;g<M.length;g++){const p=M[g];if(typeof p!="string"&&!Array.isArray(p)){for(const v in p)if(v!=="default"&&!(v in y)){const t=Object.getOwnPropertyDescriptor(p,v);t&&Object.defineProperty(y,v,t.get?t:{enumerable:!0,get:()=>p[v]})}}}return Object.freeze(Object.defineProperty(y,Symbol.toStringTag,{value:"Module"}))}var k={exports:{}};(function(y,M){(function(g,p){p(M)})(O,function(g){var p=L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,clusterPane:L.Marker.prototype.options.pane,spiderfyOnEveryZoom:!1,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyShapePositions:null,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(t){L.Util.setOptions(this,t),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var e=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,e?this._withAnimation:this._noAnimation),this._markerCluster=e?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(t){if(t instanceof L.LayerGroup)return this.addLayers([t]);if(!t.getLatLng)return this._nonPointGroup.addLayer(t),this.fire("layeradd",{layer:t}),this;if(!this._map)return this._needsClustering.push(t),this.fire("layeradd",{layer:t}),this;if(this.hasLayer(t))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(t,this._maxZoom),this.fire("layeradd",{layer:t}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var e=t,i=this._zoom;if(t.__parent)for(;e.__parent._zoom>=i;)e=e.__parent;return this._currentShownBounds.contains(e.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(t,e):this._animationAddLayerNonAnimated(t,e)),this},removeLayer:function(t){return t instanceof L.LayerGroup?this.removeLayers([t]):t.getLatLng?this._map?t.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(t)),this._removeLayer(t,!0),this.fire("layerremove",{layer:t}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),t.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(t)&&(this._featureGroup.removeLayer(t),t.clusterShow&&t.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,t)&&this.hasLayer(t)&&this._needsRemoving.push({layer:t,latlng:t._latlng}),this.fire("layerremove",{layer:t}),this):(this._nonPointGroup.removeLayer(t),this.fire("layerremove",{layer:t}),this)},addLayers:function(t,e){if(!L.Util.isArray(t))return this.addLayer(t);var i=this._featureGroup,n=this._nonPointGroup,s=this.options.chunkedLoading,o=this.options.chunkInterval,r=this.options.chunkProgress,h=t.length,a=0,u=!0,l;if(this._map){var d=new Date().getTime(),_=L.bind(function(){var c=new Date().getTime();for(this._map&&this._unspiderfy&&this._unspiderfy();a<h;a++){if(s&&a%200===0){var C=new Date().getTime()-c;if(C>o)break}if(l=t[a],l instanceof L.LayerGroup){u&&(t=t.slice(),u=!1),this._extractNonGroupLayers(l,t),h=t.length;continue}if(!l.getLatLng){n.addLayer(l),e||this.fire("layeradd",{layer:l});continue}if(!this.hasLayer(l)&&(this._addLayer(l,this._maxZoom),e||this.fire("layeradd",{layer:l}),l.__parent&&l.__parent.getChildCount()===2)){var m=l.__parent.getAllChildMarkers(),P=m[0]===l?m[1]:m[0];i.removeLayer(P)}}r&&r(a,h,new Date().getTime()-d),a===h?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(_,this.options.chunkDelay)},this);_()}else for(var f=this._needsClustering;a<h;a++){if(l=t[a],l instanceof L.LayerGroup){u&&(t=t.slice(),u=!1),this._extractNonGroupLayers(l,t),h=t.length;continue}if(!l.getLatLng){n.addLayer(l);continue}this.hasLayer(l)||f.push(l)}return this},removeLayers:function(t){var e,i,n=t.length,s=this._featureGroup,o=this._nonPointGroup,r=!0;if(!this._map){for(e=0;e<n;e++){if(i=t[e],i instanceof L.LayerGroup){r&&(t=t.slice(),r=!1),this._extractNonGroupLayers(i,t),n=t.length;continue}this._arraySplice(this._needsClustering,i),o.removeLayer(i),this.hasLayer(i)&&this._needsRemoving.push({layer:i,latlng:i._latlng}),this.fire("layerremove",{layer:i})}return this}if(this._unspiderfy){this._unspiderfy();var h=t.slice(),a=n;for(e=0;e<a;e++){if(i=h[e],i instanceof L.LayerGroup){this._extractNonGroupLayers(i,h),a=h.length;continue}this._unspiderfyLayer(i)}}for(e=0;e<n;e++){if(i=t[e],i instanceof L.LayerGroup){r&&(t=t.slice(),r=!1),this._extractNonGroupLayers(i,t),n=t.length;continue}if(!i.__parent){o.removeLayer(i),this.fire("layerremove",{layer:i});continue}this._removeLayer(i,!0,!0),this.fire("layerremove",{layer:i}),s.hasLayer(i)&&(s.removeLayer(i),i.clusterShow&&i.clusterShow())}return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],this._needsRemoving=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(t){t.off(this._childMarkerEventHandlers,this),delete t.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var t=new L.LatLngBounds;this._topClusterLevel&&t.extend(this._topClusterLevel._bounds);for(var e=this._needsClustering.length-1;e>=0;e--)t.extend(this._needsClustering[e].getLatLng());return t.extend(this._nonPointGroup.getBounds()),t},eachLayer:function(t,e){var i=this._needsClustering.slice(),n=this._needsRemoving,s,o,r;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(i),o=i.length-1;o>=0;o--){for(s=!0,r=n.length-1;r>=0;r--)if(n[r].layer===i[o]){s=!1;break}s&&t.call(e,i[o])}this._nonPointGroup.eachLayer(t,e)},getLayers:function(){var t=[];return this.eachLayer(function(e){t.push(e)}),t},getLayer:function(t){var e=null;return t=parseInt(t,10),this.eachLayer(function(i){L.stamp(i)===t&&(e=i)}),e},hasLayer:function(t){if(!t)return!1;var e,i=this._needsClustering;for(e=i.length-1;e>=0;e--)if(i[e]===t)return!0;for(i=this._needsRemoving,e=i.length-1;e>=0;e--)if(i[e].layer===t)return!1;return!!(t.__parent&&t.__parent._group===this)||this._nonPointGroup.hasLayer(t)},zoomToShowLayer:function(t,e){var i=this._map;typeof e!="function"&&(e=function(){});var n=function(){(i.hasLayer(t)||i.hasLayer(t.__parent))&&!this._inZoomAnimation&&(this._map.off("moveend",n,this),this.off("animationend",n,this),i.hasLayer(t)?e():t.__parent._icon&&(this.once("spiderfied",e,this),t.__parent.spiderfy()))};t._icon&&this._map.getBounds().contains(t.getLatLng())?e():t.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",n,this),this._map.panTo(t.getLatLng())):(this._map.on("moveend",n,this),this.on("animationend",n,this),t.__parent.zoomToBounds())},onAdd:function(t){this._map=t;var e,i,n;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(t),this._nonPointGroup.addTo(t),this._gridClusters||this._generateInitialClusters(),this._maxLat=t.options.crs.projection.MAX_LATITUDE,e=0,i=this._needsRemoving.length;e<i;e++)n=this._needsRemoving[e],n.newlatlng=n.layer._latlng,n.layer._latlng=n.latlng;for(e=0,i=this._needsRemoving.length;e<i;e++)n=this._needsRemoving[e],this._removeLayer(n.layer,!0),n.layer._latlng=n.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),i=this._needsClustering,this._needsClustering=[],this.addLayers(i,!0)},onRemove:function(t){t.off("zoomend",this._zoomEnd,this),t.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(t){for(var e=t;e&&!e._icon;)e=e.__parent;return e||null},_arraySplice:function(t,e){for(var i=t.length-1;i>=0;i--)if(t[i]===e)return t.splice(i,1),!0},_removeFromGridUnclustered:function(t,e){for(var i=this._map,n=this._gridUnclustered,s=Math.floor(this._map.getMinZoom());e>=s&&n[e].removeObject(t,i.project(t.getLatLng(),e));e--);},_childMarkerDragStart:function(t){t.target.__dragStart=t.target._latlng},_childMarkerMoved:function(t){if(!this._ignoreMove&&!t.target.__dragStart){var e=t.target._popup&&t.target._popup.isOpen();this._moveChild(t.target,t.oldLatLng,t.latlng),e&&t.target.openPopup()}},_moveChild:function(t,e,i){t._latlng=e,this.removeLayer(t),t._latlng=i,this.addLayer(t)},_childMarkerDragEnd:function(t){var e=t.target.__dragStart;delete t.target.__dragStart,e&&this._moveChild(t.target,e,t.target._latlng)},_removeLayer:function(t,e,i){var n=this._gridClusters,s=this._gridUnclustered,o=this._featureGroup,r=this._map,h=Math.floor(this._map.getMinZoom());e&&this._removeFromGridUnclustered(t,this._maxZoom);var a=t.__parent,u=a._markers,l;for(this._arraySplice(u,t);a&&(a._childCount--,a._boundsNeedUpdate=!0,!(a._zoom<h));)e&&a._childCount<=1?(l=a._markers[0]===t?a._markers[1]:a._markers[0],n[a._zoom].removeObject(a,r.project(a._cLatLng,a._zoom)),s[a._zoom].addObject(l,r.project(l.getLatLng(),a._zoom)),this._arraySplice(a.__parent._childClusters,a),a.__parent._markers.push(l),l.__parent=a.__parent,a._icon&&(o.removeLayer(a),i||o.addLayer(l))):a._iconNeedsUpdate=!0,a=a.__parent;delete t.__parent},_isOrIsParent:function(t,e){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},fire:function(t,e,i){if(e&&e.layer instanceof L.MarkerCluster){if(e.originalEvent&&this._isOrIsParent(e.layer._icon,e.originalEvent.relatedTarget))return;t="cluster"+t}L.FeatureGroup.prototype.fire.call(this,t,e,i)},listens:function(t,e){return L.FeatureGroup.prototype.listens.call(this,t,e)||L.FeatureGroup.prototype.listens.call(this,"cluster"+t,e)},_defaultIconCreateFunction:function(t){var e=t.getChildCount(),i=" marker-cluster-";return e<10?i+="small":e<100?i+="medium":i+="large",new L.DivIcon({html:"<div><span>"+e+"</span></div>",className:"marker-cluster"+i,iconSize:new L.Point(40,40)})},_bindEvents:function(){var t=this._map,e=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick,s=this.options.spiderfyOnEveryZoom;(e||n||s)&&this.on("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),t.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(t){var e=t.layer,i=e;if(!(t.type==="clusterkeypress"&&t.originalEvent&&t.originalEvent.keyCode!==13)){for(;i._childClusters.length===1;)i=i._childClusters[0];i._zoom===this._maxZoom&&i._childCount===e._childCount&&this.options.spiderfyOnMaxZoom?e.spiderfy():this.options.zoomToBoundsOnClick&&e.zoomToBounds(),this.options.spiderfyOnEveryZoom&&e.spiderfy(),t.originalEvent&&t.originalEvent.keyCode===13&&this._map._container.focus()}},_showCoverage:function(t){var e=this._map;this._inZoomAnimation||(this._shownPolygon&&e.removeLayer(this._shownPolygon),t.layer.getChildCount()>2&&t.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(t.layer.getConvexHull(),this.options.polygonOptions),e.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var t=this.options.spiderfyOnMaxZoom,e=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this.options.spiderfyOnEveryZoom,s=this._map;(t||i||n)&&this.off("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),e&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),s.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var t=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),t),this._currentShownBounds=t}},_generateInitialClusters:function(){var t=Math.ceil(this._map.getMaxZoom()),e=Math.floor(this._map.getMinZoom()),i=this.options.maxClusterRadius,n=i;typeof i!="function"&&(n=function(){return i}),this.options.disableClusteringAtZoom!==null&&(t=this.options.disableClusteringAtZoom-1),this._maxZoom=t,this._gridClusters={},this._gridUnclustered={};for(var s=t;s>=e;s--)this._gridClusters[s]=new L.DistanceGrid(n(s)),this._gridUnclustered[s]=new L.DistanceGrid(n(s));this._topClusterLevel=new this._markerCluster(this,e-1)},_addLayer:function(t,e){var i=this._gridClusters,n=this._gridUnclustered,s=Math.floor(this._map.getMinZoom()),o,r;for(this.options.singleMarkerMode&&this._overrideMarkerIcon(t),t.on(this._childMarkerEventHandlers,this);e>=s;e--){o=this._map.project(t.getLatLng(),e);var h=i[e].getNearObject(o);if(h){h._addChild(t),t.__parent=h;return}if(h=n[e].getNearObject(o),h){var a=h.__parent;a&&this._removeLayer(h,!1);var u=new this._markerCluster(this,e,h,t);i[e].addObject(u,this._map.project(u._cLatLng,e)),h.__parent=u,t.__parent=u;var l=u;for(r=e-1;r>a._zoom;r--)l=new this._markerCluster(this,r,l),i[r].addObject(l,this._map.project(h.getLatLng(),r));a._addChild(l),this._removeFromGridUnclustered(h,e);return}n[e].addObject(t,o)}this._topClusterLevel._addChild(t),t.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(t){t instanceof L.MarkerCluster&&t._iconNeedsUpdate&&t._updateIcon()})},_enqueue:function(t){this._queue.push(t),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var t=0;t<this._queue.length;t++)this._queue[t].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var t=Math.round(this._map._zoom);this._processQueue(),this._zoom<t&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,t)):this._zoom>t?(this._animationStart(),this._animationZoomOut(this._zoom,t)):this._moveEnd()},_getExpandedVisibleBounds:function(){if(this.options.removeOutsideVisibleBounds){if(L.Browser.mobile)return this._checkBoundsMaxLat(this._map.getBounds())}else return this._mapBoundsInfinite;return this._checkBoundsMaxLat(this._map.getBounds().pad(1))},_checkBoundsMaxLat:function(t){var e=this._maxLat;return e!==void 0&&(t.getNorth()>=e&&(t._northEast.lat=1/0),t.getSouth()<=-e&&(t._southWest.lat=-1/0)),t},_animationAddLayerNonAnimated:function(t,e){if(e===t)this._featureGroup.addLayer(t);else if(e._childCount===2){e._addToMap();var i=e.getAllChildMarkers();this._featureGroup.removeLayer(i[0]),this._featureGroup.removeLayer(i[1])}else e._updateIcon()},_extractNonGroupLayers:function(t,e){var i=t.getLayers(),n=0,s;for(e=e||[];n<i.length;n++){if(s=i[n],s instanceof L.LayerGroup){this._extractNonGroupLayers(s,e);continue}e.push(s)}return e},_overrideMarkerIcon:function(t){var e=t.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[t]}});return e}});L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(t,e){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),t),this._topClusterLevel._recursivelyAddChildrenToMap(null,e,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(t,e){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),t),this._topClusterLevel._recursivelyAddChildrenToMap(null,e,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(t,e){this._animationAddLayerNonAnimated(t,e)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(t,e){var i=this._getExpandedVisibleBounds(),n=this._featureGroup,s=Math.floor(this._map.getMinZoom()),o;this._ignoreMove=!0,this._topClusterLevel._recursively(i,t,s,function(r){var h=r._latlng,a=r._markers,u;for(i.contains(h)||(h=null),r._isSingleParent()&&t+1===e?(n.removeLayer(r),r._recursivelyAddChildrenToMap(null,e,i)):(r.clusterHide(),r._recursivelyAddChildrenToMap(h,e,i)),o=a.length-1;o>=0;o--)u=a[o],i.contains(u._latlng)||n.removeLayer(u)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(i,e),n.eachLayer(function(r){!(r instanceof L.MarkerCluster)&&r._icon&&r.clusterShow()}),this._topClusterLevel._recursively(i,t,e,function(r){r._recursivelyRestoreChildPositions(e)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(i,t,s,function(r){n.removeLayer(r),r.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(t,e){this._animationZoomOutSingle(this._topClusterLevel,t-1,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,e,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),t,this._getExpandedVisibleBounds())},_animationAddLayer:function(t,e){var i=this,n=this._featureGroup;n.addLayer(t),e!==t&&(e._childCount>2?(e._updateIcon(),this._forceLayout(),this._animationStart(),t._setPos(this._map.latLngToLayerPoint(e.getLatLng())),t.clusterHide(),this._enqueue(function(){n.removeLayer(t),t.clusterShow(),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(e,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(t,e,i){var n=this._getExpandedVisibleBounds(),s=Math.floor(this._map.getMinZoom());t._recursivelyAnimateChildrenInAndAddSelfToMap(n,s,e+1,i);var o=this;this._forceLayout(),t._recursivelyBecomeVisible(n,i),this._enqueue(function(){if(t._childCount===1){var r=t._markers[0];this._ignoreMove=!0,r.setLatLng(r.getLatLng()),this._ignoreMove=!1,r.clusterShow&&r.clusterShow()}else t._recursively(n,i,s,function(h){h._recursivelyRemoveChildrenFromMap(n,s,e+1)});o._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(document.body.offsetWidth)}}),L.markerClusterGroup=function(t){return new L.MarkerClusterGroup(t)};var v=L.MarkerCluster=L.Marker.extend({options:L.Icon.prototype.options,initialize:function(t,e,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this,pane:t.options.clusterPane}),this._group=t,this._zoom=e,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(t,e){t=t||[];for(var i=this._childClusters.length-1;i>=0;i--)this._childClusters[i].getAllChildMarkers(t,e);for(var n=this._markers.length-1;n>=0;n--)e&&this._markers[n].__dragStart||t.push(this._markers[n]);return t},getChildCount:function(){return this._childCount},zoomToBounds:function(t){for(var e=this._childClusters.slice(),i=this._group._map,n=i.getBoundsZoom(this._bounds),s=this._zoom+1,o=i.getZoom(),r;e.length>0&&n>s;){s++;var h=[];for(r=0;r<e.length;r++)h=h.concat(e[r]._childClusters);e=h}n>s?this._group._map.setView(this._latlng,s):n<=o?this._group._map.setView(this._latlng,o+1):this._group._map.fitBounds(this._bounds,t)},getBounds:function(){var t=new L.LatLngBounds;return t.extend(this._bounds),t},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(t,e){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(t),t instanceof L.MarkerCluster?(e||(this._childClusters.push(t),t.__parent=this),this._childCount+=t._childCount):(e||this._markers.push(t),this._childCount++),this.__parent&&this.__parent._addChild(t,!0)},_setClusterCenter:function(t){this._cLatLng||(this._cLatLng=t._cLatLng||t._latlng)},_resetBounds:function(){var t=this._bounds;t._southWest&&(t._southWest.lat=1/0,t._southWest.lng=1/0),t._northEast&&(t._northEast.lat=-1/0,t._northEast.lng=-1/0)},_recalculateBounds:function(){var t=this._markers,e=this._childClusters,i=0,n=0,s=this._childCount,o,r,h,a;if(s!==0){for(this._resetBounds(),o=0;o<t.length;o++)h=t[o]._latlng,this._bounds.extend(h),i+=h.lat,n+=h.lng;for(o=0;o<e.length;o++)r=e[o],r._boundsNeedUpdate&&r._recalculateBounds(),this._bounds.extend(r._bounds),h=r._wLatLng,a=r._childCount,i+=h.lat*a,n+=h.lng*a;this._latlng=this._wLatLng=new L.LatLng(i/s,n/s),this._boundsNeedUpdate=!1}},_addToMap:function(t){t&&(this._backupLatlng=this._latlng,this.setLatLng(t)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(t,e,i){this._recursively(t,this._group._map.getMinZoom(),i-1,function(n){var s=n._markers,o,r;for(o=s.length-1;o>=0;o--)r=s[o],r._icon&&(r._setPos(e),r.clusterHide())},function(n){var s=n._childClusters,o,r;for(o=s.length-1;o>=0;o--)r=s[o],r._icon&&(r._setPos(e),r.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(t,e,i,n){this._recursively(t,n,e,function(s){s._recursivelyAnimateChildrenIn(t,s._group._map.latLngToLayerPoint(s.getLatLng()).round(),i),s._isSingleParent()&&i-1===n?(s.clusterShow(),s._recursivelyRemoveChildrenFromMap(t,e,i)):s.clusterHide(),s._addToMap()})},_recursivelyBecomeVisible:function(t,e){this._recursively(t,this._group._map.getMinZoom(),e,null,function(i){i.clusterShow()})},_recursivelyAddChildrenToMap:function(t,e,i){this._recursively(i,this._group._map.getMinZoom()-1,e,function(n){if(e!==n._zoom)for(var s=n._markers.length-1;s>=0;s--){var o=n._markers[s];i.contains(o._latlng)&&(t&&(o._backupLatlng=o.getLatLng(),o.setLatLng(t),o.clusterHide&&o.clusterHide()),n._group._featureGroup.addLayer(o))}},function(n){n._addToMap(t)})},_recursivelyRestoreChildPositions:function(t){for(var e=this._markers.length-1;e>=0;e--){var i=this._markers[e];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(t-1===this._zoom)for(var n=this._childClusters.length-1;n>=0;n--)this._childClusters[n]._restorePosition();else for(var s=this._childClusters.length-1;s>=0;s--)this._childClusters[s]._recursivelyRestoreChildPositions(t)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(t,e,i,n){var s,o;this._recursively(t,e-1,i-1,function(r){for(o=r._markers.length-1;o>=0;o--)s=r._markers[o],(!n||!n.contains(s._latlng))&&(r._group._featureGroup.removeLayer(s),s.clusterShow&&s.clusterShow())},function(r){for(o=r._childClusters.length-1;o>=0;o--)s=r._childClusters[o],(!n||!n.contains(s._latlng))&&(r._group._featureGroup.removeLayer(s),s.clusterShow&&s.clusterShow())})},_recursively:function(t,e,i,n,s){var o=this._childClusters,r=this._zoom,h,a;if(e<=r&&(n&&n(this),s&&r===i&&s(this)),r<e||r<i)for(h=o.length-1;h>=0;h--)a=o[h],a._boundsNeedUpdate&&a._recalculateBounds(),t.intersects(a._bounds)&&a._recursively(t,e,i,n,s)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}});L.Marker.include({clusterHide:function(){var t=this.options.opacity;return this.setOpacity(0),this.options.opacity=t,this},clusterShow:function(){return this.setOpacity(this.options.opacity)}}),L.DistanceGrid=function(t){this._cellSize=t,this._sqCellSize=t*t,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(t,e){var i=this._getCoord(e.x),n=this._getCoord(e.y),s=this._grid,o=s[n]=s[n]||{},r=o[i]=o[i]||[],h=L.Util.stamp(t);this._objectPoint[h]=e,r.push(t)},updateObject:function(t,e){this.removeObject(t),this.addObject(t,e)},removeObject:function(t,e){var i=this._getCoord(e.x),n=this._getCoord(e.y),s=this._grid,o=s[n]=s[n]||{},r=o[i]=o[i]||[],h,a;for(delete this._objectPoint[L.Util.stamp(t)],h=0,a=r.length;h<a;h++)if(r[h]===t)return r.splice(h,1),a===1&&delete o[i],!0},eachObject:function(t,e){var i,n,s,o,r,h,a,u=this._grid;for(i in u){r=u[i];for(n in r)for(h=r[n],s=0,o=h.length;s<o;s++)a=t.call(e,h[s]),a&&(s--,o--)}},getNearObject:function(t){var e=this._getCoord(t.x),i=this._getCoord(t.y),n,s,o,r,h,a,u,l,d=this._objectPoint,_=this._sqCellSize,f=null;for(n=i-1;n<=i+1;n++)if(r=this._grid[n],r){for(s=e-1;s<=e+1;s++)if(h=r[s],h)for(o=0,a=h.length;o<a;o++)u=h[o],l=this._sqDist(d[L.Util.stamp(u)],t),(l<_||l<=_&&f===null)&&(_=l,f=u)}return f},_getCoord:function(t){var e=Math.floor(t/this._cellSize);return isFinite(e)?e:t},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}},function(){L.QuickHull={getDistant:function(t,e){var i=e[1].lat-e[0].lat,n=e[0].lng-e[1].lng;return n*(t.lat-e[0].lat)+i*(t.lng-e[0].lng)},findMostDistantPointFromBaseLine:function(t,e){var i=0,n=null,s=[],o,r,h;for(o=e.length-1;o>=0;o--){if(r=e[o],h=this.getDistant(r,t),h>0)s.push(r);else continue;h>i&&(i=h,n=r)}return{maxPoint:n,newPoints:s}},buildConvexHull:function(t,e){var i=[],n=this.findMostDistantPointFromBaseLine(t,e);return n.maxPoint?(i=i.concat(this.buildConvexHull([t[0],n.maxPoint],n.newPoints)),i=i.concat(this.buildConvexHull([n.maxPoint,t[1]],n.newPoints)),i):[t[0]]},getConvexHull:function(t){var e=!1,i=!1,n=!1,s=!1,o=null,r=null,h=null,a=null,u=null,l=null,d;for(d=t.length-1;d>=0;d--){var _=t[d];(e===!1||_.lat>e)&&(o=_,e=_.lat),(i===!1||_.lat<i)&&(r=_,i=_.lat),(n===!1||_.lng>n)&&(h=_,n=_.lng),(s===!1||_.lng<s)&&(a=_,s=_.lng)}i!==e?(l=r,u=o):(l=a,u=h);var f=[].concat(this.buildConvexHull([l,u],t),this.buildConvexHull([u,l],t));return f}}}(),L.MarkerCluster.include({getConvexHull:function(){var t=this.getAllChildMarkers(),e=[],i,n;for(n=t.length-1;n>=0;n--)i=t[n].getLatLng(),e.push(i);return L.QuickHull.getConvexHull(e)}}),L.MarkerCluster.include({_2PI:Math.PI*2,_circleFootSeparation:25,_circleStartAngle:0,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(!(this._group._spiderfied===this||this._group._inZoomAnimation)){var t=this.getAllChildMarkers(null,!0),e=this._group,i=e._map,n=i.latLngToLayerPoint(this._latlng),s;this._group._unspiderfy(),this._group._spiderfied=this,this._group.options.spiderfyShapePositions?s=this._group.options.spiderfyShapePositions(t.length,n):t.length>=this._circleSpiralSwitchover?s=this._generatePointsSpiral(t.length,n):(n.y+=10,s=this._generatePointsCircle(t.length,n)),this._animationSpiderfy(t,s)}},unspiderfy:function(t){this._group._inZoomAnimation||(this._animationUnspiderfy(t),this._group._spiderfied=null)},_generatePointsCircle:function(t,e){var i=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+t),n=i/this._2PI,s=this._2PI/t,o=[],r,h;for(n=Math.max(n,35),o.length=t,r=0;r<t;r++)h=this._circleStartAngle+r*s,o[r]=new L.Point(e.x+n*Math.cos(h),e.y+n*Math.sin(h))._round();return o},_generatePointsSpiral:function(t,e){var i=this._group.options.spiderfyDistanceMultiplier,n=i*this._spiralLengthStart,s=i*this._spiralFootSeparation,o=i*this._spiralLengthFactor*this._2PI,r=0,h=[],a;for(h.length=t,a=t;a>=0;a--)a<t&&(h[a]=new L.Point(e.x+n*Math.cos(r),e.y+n*Math.sin(r))._round()),r+=s/n+a*5e-4,n+=o/r;return h},_noanimationUnspiderfy:function(){var t=this._group,e=t._map,i=t._featureGroup,n=this.getAllChildMarkers(null,!0),s,o;for(t._ignoreMove=!0,this.setOpacity(1),o=n.length-1;o>=0;o--)s=n[o],i.removeLayer(s),s._preSpiderfyLatlng&&(s.setLatLng(s._preSpiderfyLatlng),delete s._preSpiderfyLatlng),s.setZIndexOffset&&s.setZIndexOffset(0),s._spiderLeg&&(e.removeLayer(s._spiderLeg),delete s._spiderLeg);t.fire("unspiderfied",{cluster:this,markers:n}),t._ignoreMove=!1,t._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(t,e){var i=this._group,n=i._map,s=i._featureGroup,o=this._group.options.spiderLegPolylineOptions,r,h,a,u;for(i._ignoreMove=!0,r=0;r<t.length;r++)u=n.layerPointToLatLng(e[r]),h=t[r],a=new L.Polyline([this._latlng,u],o),n.addLayer(a),h._spiderLeg=a,h._preSpiderfyLatlng=h._latlng,h.setLatLng(u),h.setZIndexOffset&&h.setZIndexOffset(1e6),s.addLayer(h);this.setOpacity(.3),i._ignoreMove=!1,i.fire("spiderfied",{cluster:this,markers:t})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(t,e){var i=this,n=this._group,s=n._map,o=n._featureGroup,r=this._latlng,h=s.latLngToLayerPoint(r),a=L.Path.SVG,u=L.extend({},this._group.options.spiderLegPolylineOptions),l=u.opacity,d,_,f,c,C,m;for(l===void 0&&(l=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),a?(u.opacity=0,u.className=(u.className||"")+" leaflet-cluster-spider-leg"):u.opacity=l,n._ignoreMove=!0,d=0;d<t.length;d++)_=t[d],m=s.layerPointToLatLng(e[d]),f=new L.Polyline([r,m],u),s.addLayer(f),_._spiderLeg=f,a&&(c=f._path,C=c.getTotalLength()+.1,c.style.strokeDasharray=C,c.style.strokeDashoffset=C),_.setZIndexOffset&&_.setZIndexOffset(1e6),_.clusterHide&&_.clusterHide(),o.addLayer(_),_._setPos&&_._setPos(h);for(n._forceLayout(),n._animationStart(),d=t.length-1;d>=0;d--)m=s.layerPointToLatLng(e[d]),_=t[d],_._preSpiderfyLatlng=_._latlng,_.setLatLng(m),_.clusterShow&&_.clusterShow(),a&&(f=_._spiderLeg,c=f._path,c.style.strokeDashoffset=0,f.setStyle({opacity:l}));this.setOpacity(.3),n._ignoreMove=!1,setTimeout(function(){n._animationEnd(),n.fire("spiderfied",{cluster:i,markers:t})},200)},_animationUnspiderfy:function(t){var e=this,i=this._group,n=i._map,s=i._featureGroup,o=t?n._latLngToNewLayerPoint(this._latlng,t.zoom,t.center):n.latLngToLayerPoint(this._latlng),r=this.getAllChildMarkers(null,!0),h=L.Path.SVG,a,u,l,d,_,f;for(i._ignoreMove=!0,i._animationStart(),this.setOpacity(1),u=r.length-1;u>=0;u--)a=r[u],a._preSpiderfyLatlng&&(a.closePopup(),a.setLatLng(a._preSpiderfyLatlng),delete a._preSpiderfyLatlng,f=!0,a._setPos&&(a._setPos(o),f=!1),a.clusterHide&&(a.clusterHide(),f=!1),f&&s.removeLayer(a),h&&(l=a._spiderLeg,d=l._path,_=d.getTotalLength()+.1,d.style.strokeDashoffset=_,l.setStyle({opacity:0})));i._ignoreMove=!1,setTimeout(function(){var c=0;for(u=r.length-1;u>=0;u--)a=r[u],a._spiderLeg&&c++;for(u=r.length-1;u>=0;u--)a=r[u],a._spiderLeg&&(a.clusterShow&&a.clusterShow(),a.setZIndexOffset&&a.setZIndexOffset(0),c>1&&s.removeLayer(a),n.removeLayer(a._spiderLeg),delete a._spiderLeg);i._animationEnd(),i.fire("unspiderfied",{cluster:e,markers:r})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(t){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(t))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(t){this._spiderfied&&this._spiderfied.unspiderfy(t)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(t){t._spiderLeg&&(this._featureGroup.removeLayer(t),t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),this._map.removeLayer(t._spiderLeg),delete t._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(t){return t?t instanceof L.MarkerClusterGroup?t=t._topClusterLevel.getAllChildMarkers():t instanceof L.LayerGroup?t=t._layers:t instanceof L.MarkerCluster?t=t.getAllChildMarkers():t instanceof L.Marker&&(t=[t]):t=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(t),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(t),this},_flagParentsIconsNeedUpdate:function(t){var e,i;for(e in t)for(i=t[e].__parent;i;)i._iconNeedsUpdate=!0,i=i.__parent},_refreshSingleMarkerModeMarkers:function(t){var e,i;for(e in t)i=t[e],this.hasLayer(i)&&i.setIcon(this._overrideMarkerIcon(i))}}),L.Marker.include({refreshIconOptions:function(t,e){var i=this.options.icon;return L.setOptions(i,t),this.setIcon(i),e&&this.__parent&&this.__parent._group.refreshClusters(this),this}}),g.MarkerClusterGroup=p,g.MarkerCluster=v,Object.defineProperty(g,"__esModule",{value:!0})})})(k,k.exports);var S=k.exports;const b=x(S),I=w({__proto__:null,default:b},[S]);export{I as l};
