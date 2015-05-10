(function e(t,i,s){function a(r,o){if(!i[r]){if(!t[r]){var l=typeof require=="function"&&require;if(!o&&l)return l(r,!0);if(n)return n(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var h=i[r]={exports:{}};t[r][0].call(h.exports,function(e){var i=t[r][1][e];return a(i?i:e)},h,h.exports,e,t,i,s)}return i[r].exports}var n=typeof require=="function"&&require;for(var r=0;r<s.length;r++)a(s[r]);return a})({"./src/Basic_Load3DS.ts":[function(e,t,i){var s=e("awayjs-core/lib/events/AssetEvent");var a=e("awayjs-core/lib/events/LoaderEvent");var n=e("awayjs-core/lib/geom/Vector3D");var r=e("awayjs-core/lib/library/AssetLibrary");var o=e("awayjs-core/lib/library/AssetLoaderContext");var l=e("awayjs-core/lib/net/URLRequest");var d=e("awayjs-core/lib/utils/RequestAnimationFrame");var h=e("awayjs-display/lib/containers/Loader");var u=e("awayjs-display/lib/containers/View");var c=e("awayjs-display/lib/controllers/HoverController");var w=e("awayjs-display/lib/entities/DirectionalLight");var y=e("awayjs-display/lib/entities/Mesh");var p=e("awayjs-display/lib/materials/lightpickers/StaticLightPicker");var _=e("awayjs-display/lib/prefabs/PrimitivePlanePrefab");var f=e("awayjs-display/lib/textures/Single2DTexture");var v=e("awayjs-renderergl/lib/DefaultRenderer");var g=e("awayjs-methodmaterials/lib/MethodMaterial");var m=e("awayjs-methodmaterials/lib/methods/ShadowSoftMethod");var b=e("awayjs-parsers/lib/Max3DSParser");var j=function(){function e(){this._time=0;this._move=false;this.init()}e.prototype.init=function(){this.initEngine();this.initLights();this.initMaterials();this.initObjects();this.initListeners()};e.prototype.initEngine=function(){this._view=new u(new v);this._view.camera.projection.far=2100;this._cameraController=new c(this._view.camera,null,45,20,1e3,10)};e.prototype.initLights=function(){this._light=new w(-1,-1,1);this._direction=new n(-1,-1,1);this._lightPicker=new p([this._light]);this._view.scene.addChild(this._light)};e.prototype.initMaterials=function(){this._groundMaterial=new g;this._groundMaterial.shadowMethod=new m(this._light,10,5);this._groundMaterial.shadowMethod.epsilon=.2;this._groundMaterial.lightPicker=this._lightPicker;this._groundMaterial.specular=0};e.prototype.initObjects=function(){this._loader=new h;this._loader.transform.scale=new n(300,300,300);this._loader.z=-200;this._view.scene.addChild(this._loader);this._plane=new _(1e3,1e3);this._ground=this._plane.getNewObject();this._ground.material=this._groundMaterial;this._ground.castsShadows=false;this._view.scene.addChild(this._ground)};e.prototype.initListeners=function(){var e=this;window.onresize=function(t){return e.onResize(t)};document.onmousedown=function(t){return e.onMouseDown(t)};document.onmouseup=function(t){return e.onMouseUp(t)};document.onmousemove=function(t){return e.onMouseMove(t)};this.onResize();this._timer=new d(this.onEnterFrame,this);this._timer.start();var t=new o;t.mapUrl("texture.jpg","assets/soldier_ant.jpg");this._loader.addEventListener(s.ASSET_COMPLETE,function(t){return e.onAssetComplete(t)});this._loader.load(new l("assets/soldier_ant.3ds"),t,null,new b(false));r.addEventListener(a.RESOURCE_COMPLETE,function(t){return e.onResourceComplete(t)});r.load(new l("assets/CoarseRedSand.jpg"))};e.prototype.onEnterFrame=function(e){this._time+=e;this._direction.x=-Math.sin(this._time/4e3);this._direction.z=-Math.cos(this._time/4e3);this._light.direction=this._direction;this._view.render()};e.prototype.onAssetComplete=function(e){var t=e.asset;switch(t.assetType){case y.assetType:var i=e.asset;i.castsShadows=true;break;case g.assetType:var s=e.asset;s.shadowMethod=new m(this._light,10,5);s.shadowMethod.epsilon=.2;s.lightPicker=this._lightPicker;s.gloss=30;s.specular=1;s.color=3158080;s.ambient=1;break}};e.prototype.onResourceComplete=function(e){var t=e.assets;var i=t.length;for(var s=0;s<i;s++){var a=t[s];console.log(a.name,e.url);switch(e.url){case"assets/CoarseRedSand.jpg":this._groundMaterial.texture=new f(a);break}}};e.prototype.onMouseDown=function(e){this._lastPanAngle=this._cameraController.panAngle;this._lastTiltAngle=this._cameraController.tiltAngle;this._lastMouseX=e.clientX;this._lastMouseY=e.clientY;this._move=true};e.prototype.onMouseUp=function(e){this._move=false};e.prototype.onMouseMove=function(e){if(this._move){this._cameraController.panAngle=.3*(e.clientX-this._lastMouseX)+this._lastPanAngle;this._cameraController.tiltAngle=.3*(e.clientY-this._lastMouseY)+this._lastTiltAngle}};e.prototype.onResize=function(e){if(e===void 0){e=null}this._view.y=0;this._view.x=0;this._view.width=window.innerWidth;this._view.height=window.innerHeight};return e}();window.onload=function(){new j}},{"awayjs-core/lib/events/AssetEvent":undefined,"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/library/AssetLoaderContext":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/containers/Loader":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/controllers/HoverController":undefined,"awayjs-display/lib/entities/DirectionalLight":undefined,"awayjs-display/lib/entities/Mesh":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-display/lib/prefabs/PrimitivePlanePrefab":undefined,"awayjs-display/lib/textures/Single2DTexture":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-methodmaterials/lib/methods/ShadowSoftMethod":undefined,"awayjs-parsers/lib/Max3DSParser":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/Basic_Load3DS.ts"]);

//# sourceMappingURL=Basic_Load3DS.js.map