(function e(i,t,r){function n(a,o){if(!t[a]){if(!i[a]){var u=typeof require=="function"&&require;if(!o&&u)return u(a,!0);if(s)return s(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var l=t[a]={exports:{}};i[a][0].call(l.exports,function(e){var t=i[a][1][e];return n(t?t:e)},l,l.exports,e,i,t,r)}return t[a].exports}var s=typeof require=="function"&&require;for(var a=0;a<r.length;a++)n(r[a]);return n})({"./src/Basic_Skybox.ts":[function(e,i,t){var r=e("awayjs-core/lib/events/LoaderEvent");var n=e("awayjs-core/lib/geom/Vector3D");var s=e("awayjs-core/lib/library/AssetLibrary");var a=e("awayjs-core/lib/library/LoaderContext");var o=e("awayjs-core/lib/net/URLRequest");var u=e("awayjs-core/lib/projections/PerspectiveProjection");var d=e("awayjs-core/lib/utils/RequestAnimationFrame");var l=e("awayjs-display/lib/containers/View");var c=e("awayjs-display/lib/entities/Skybox");var w=e("awayjs-display/lib/prefabs/PrimitiveTorusPrefab");var h=e("awayjs-display/lib/textures/SingleCubeTexture");var y=e("awayjs-renderergl/lib/DefaultRenderer");var b=e("awayjs-methodmaterials/lib/MethodMaterial");var f=e("awayjs-methodmaterials/lib/methods/EffectEnvMapMethod");var v=function(){function e(){this._time=0;this.init()}e.prototype.init=function(){this.initEngine();this.initMaterials();this.initObjects();this.initListeners()};e.prototype.initEngine=function(){this._view=new l(new y);this._view.camera.z=-600;this._view.camera.y=0;this._view.camera.lookAt(new n);this._view.camera.projection=new u(90);this._view.backgroundColor=16776960;this._mouseX=window.innerWidth/2};e.prototype.initMaterials=function(){this._torusMaterial=new b(16777215,1);this._torusMaterial.specular=.5;this._torusMaterial.ambient=.25;this._torusMaterial.color=1118617;this._torusMaterial.ambient=1};e.prototype.initObjects=function(){this._torus=new w(150,60,40,20).getNewObject();this._torus.material=this._torusMaterial;this._torus.debugVisible=true;this._view.scene.addChild(this._torus)};e.prototype.initListeners=function(){var e=this;document.onmousemove=function(i){return e.onMouseMove(i)};window.onresize=function(i){return e.onResize(i)};this.onResize();this._timer=new d(this.onEnterFrame,this);this._timer.start();s.addEventListener(r.RESOURCE_COMPLETE,function(i){return e.onResourceComplete(i)});var i=new a;i.dependencyBaseUrl="assets/skybox/";s.load(new o("assets/skybox/snow_texture.cube"),i)};e.prototype.onEnterFrame=function(e){this._torus.rotationX+=2;this._torus.rotationY+=1;this._view.camera.transform.position=new n;this._view.camera.rotationY+=.5*(this._mouseX-window.innerWidth/2)/800;this._view.camera.transform.moveBackward(600);this._view.render()};e.prototype.onResourceComplete=function(e){switch(e.url){case"assets/skybox/snow_texture.cube":this._cubeTexture=new h(e.assets[0]);this._skyBox=new c(this._cubeTexture);this._view.scene.addChild(this._skyBox);this._torusMaterial.addEffectMethod(new f(this._cubeTexture,1));break}};e.prototype.onMouseMove=function(e){this._mouseX=e.clientX;this._mouseY=e.clientY};e.prototype.onResize=function(e){if(e===void 0){e=null}this._view.y=0;this._view.x=0;this._view.width=window.innerWidth;this._view.height=window.innerHeight};return e}();window.onload=function(){new v}},{"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/library/LoaderContext":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/projections/PerspectiveProjection":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/entities/Skybox":undefined,"awayjs-display/lib/prefabs/PrimitiveTorusPrefab":undefined,"awayjs-display/lib/textures/SingleCubeTexture":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-methodmaterials/lib/methods/EffectEnvMapMethod":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/Basic_Skybox.ts"]);

//# sourceMappingURL=Basic_Skybox.js.map