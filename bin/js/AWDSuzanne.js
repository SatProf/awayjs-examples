(function e(i,t,n){function a(s,o){if(!t[s]){if(!i[s]){var l=typeof require=="function"&&require;if(!o&&l)return l(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=t[s]={exports:{}};i[s][0].call(d.exports,function(e){var t=i[s][1][e];return a(t?t:e)},d,d.exports,e,i,t,n)}return t[s].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)a(n[s]);return a})({"./src/AWDSuzanne.ts":[function(e,i,t){var n=e("awayjs-core/lib/events/LoaderEvent");var a=e("awayjs-core/lib/geom/Vector3D");var r=e("awayjs-core/lib/library/AssetLibrary");var s=e("awayjs-core/lib/net/URLRequest");var o=e("awayjs-core/lib/utils/RequestAnimationFrame");var l=e("awayjs-display/lib/containers/View");var h=e("awayjs-display/lib/entities/DirectionalLight");var d=e("awayjs-display/lib/entities/Mesh");var c=e("awayjs-display/lib/pick/JSPickingCollider");var u=e("awayjs-display/lib/events/MouseEvent");var w=e("awayjs-display/lib/materials/lightpickers/StaticLightPicker");var v=e("awayjs-renderergl/lib/DefaultRenderer");var y=e("awayjs-methodmaterials/lib/MethodMaterial");var f=e("awayjs-parsers/lib/AWDParser");var m=function(){function e(){var e=this;this._lookAtPosition=new a;this._cameraIncrement=0;this._mouseOverMaterial=new y(16711680);this.initView();this.loadAssets();this.initLights();window.onresize=function(i){return e.onResize(i)};this.onResize()}e.prototype.initView=function(){this._renderer=new v;this._view=new l(this._renderer);this._view.camera.projection.far=6e3;this._view.forceMouseMove=true};e.prototype.loadAssets=function(){var e=this;this._timer=new o(this.render,this);this._timer.start();r.enableParser(f);var i=r.getLoaderSession();i.addEventListener(n.RESOURCE_COMPLETE,function(i){return e.onResourceComplete(i)});i.load(new s("assets/suzanne.awd"))};e.prototype.initLights=function(){this._light=new h;this._light.color=6828057;this._light.direction=new a(1,0,0);this._light.ambient=.1;this._light.ambientColor=8762061;this._light.diffuse=2.8;this._light.specular=1.8;this._view.scene.addChild(this._light);this._lightPicker=new w([this._light])};e.prototype.onResize=function(e){if(e===void 0){e=null}this._view.y=0;this._view.x=0;this._view.width=window.innerWidth;this._view.height=window.innerHeight};e.prototype.render=function(e){if(this._view.camera){this._view.camera.lookAt(this._lookAtPosition);this._cameraIncrement+=.01;this._view.camera.x=Math.cos(this._cameraIncrement)*1400;this._view.camera.z=Math.sin(this._cameraIncrement)*1400;this._light.x=Math.cos(this._cameraIncrement)*1400;this._light.y=Math.sin(this._cameraIncrement)*1400}this._view.render()};e.prototype.onResourceComplete=function(e){var i=this;var t=e.target;var n=t.baseDependency.assets.length;for(var r=0;r<n;++r){var s=t.baseDependency.assets[r];switch(s.assetType){case d.assetType:var o=s;this._suzane=o;this._suzane.material.lightPicker=this._lightPicker;this._suzane.y=-100;this._mouseOutMaterial=this._suzane.material;for(var l=0;l<80;l++){var h=o.clone();var w=this.getRandom(50,200);h.x=this.getRandom(-2e3,2e3);h.y=this.getRandom(-2e3,2e3);h.z=this.getRandom(-2e3,2e3);h.transform.scale=new a(w,w,w);h.rotationY=this.getRandom(0,360);h.addEventListener(u.MOUSE_OVER,function(e){return i.onMouseOver(e)});h.addEventListener(u.MOUSE_OUT,function(e){return i.onMouseOut(e)});this._view.scene.addChild(h)}o.transform.scale=new a(500,500,500);o.pickingCollider=new c;o.addEventListener(u.MOUSE_OVER,function(e){return i.onMouseOver(e)});o.addEventListener(u.MOUSE_OUT,function(e){return i.onMouseOut(e)});this._view.scene.addChild(o);break}}};e.prototype.onMouseOver=function(e){e.object.material=this._mouseOverMaterial;console.log("mouseover")};e.prototype.onMouseOut=function(e){e.object.material=this._mouseOutMaterial;console.log("mouseout")};e.prototype.getRandom=function(e,i){return Math.random()*(i-e)+e};return e}();window.onload=function(){new m}},{"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/entities/DirectionalLight":undefined,"awayjs-display/lib/entities/Mesh":undefined,"awayjs-display/lib/events/MouseEvent":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-display/lib/pick/JSPickingCollider":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-parsers/lib/AWDParser":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/AWDSuzanne.ts"]);

//# sourceMappingURL=AWDSuzanne.js.map