(function e(i,t,s){function a(r,o){if(!t[r]){if(!i[r]){var l=typeof require=="function"&&require;if(!o&&l)return l(r,!0);if(n)return n(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var h=t[r]={exports:{}};i[r][0].call(h.exports,function(e){var t=i[r][1][e];return a(t?t:e)},h,h.exports,e,i,t,s)}return t[r].exports}var n=typeof require=="function"&&require;for(var r=0;r<s.length;r++)a(s[r]);return a})({"./src/Intermediate_MouseInteraction.ts":[function(e,i,t){var s=e("awayjs-core/lib/data/BitmapImage2D");var a=e("awayjs-core/lib/events/AssetEvent");var n=e("awayjs-core/lib/geom/Vector3D");var r=e("awayjs-core/lib/library/AssetLibrary");var o=e("awayjs-core/lib/net/URLRequest");var l=e("awayjs-core/lib/utils/RequestAnimationFrame");var c=e("awayjs-core/lib/ui/Keyboard");var h=e("awayjs-display/lib/containers/View");var d=e("awayjs-display/lib/controllers/HoverController");var u=e("awayjs-display/lib/bounds/BoundsType");var p=e("awayjs-display/lib/entities/LineSegment");var _=e("awayjs-display/lib/entities/Mesh");var f=e("awayjs-display/lib/entities/PointLight");var b=e("awayjs-display/lib/events/MouseEvent");var m=e("awayjs-display/lib/materials/BasicMaterial");var y=e("awayjs-display/lib/materials/lightpickers/StaticLightPicker");var w=e("awayjs-display/lib/pick/RaycastPicker");var v=e("awayjs-display/lib/prefabs/PrimitiveCubePrefab");var M=e("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");var g=e("awayjs-display/lib/prefabs/PrimitiveSpherePrefab");var P=e("awayjs-display/lib/prefabs/PrimitiveTorusPrefab");var k=e("awayjs-display/lib/textures/Single2DTexture");var j=e("awayjs-renderergl/lib/DefaultRenderer");var T=e("awayjs-renderergl/lib/pick/JSPickingCollider");var E=e("awayjs-methodmaterials/lib/MethodMaterial");var C=e("awayjs-parsers/lib/OBJParser");var O=function(){function e(){this._time=0;this._raycastPicker=new w(false);this._move=false;this._tiltSpeed=4;this._panSpeed=4;this._distanceSpeed=4;this._tiltIncrement=0;this._panIncrement=0;this._distanceIncrement=0;this.init()}e.prototype.init=function(){this.initEngine();this.initLights();this.initMaterials();this.initObjects();this.initListeners()};e.prototype.initEngine=function(){this._renderer=new j;this._view=new h(this._renderer);this._view.forceMouseMove=true;this._scene=this._view.scene;this._camera=this._view.camera;this._view.mousePicker=new w(true);this._cameraController=new d(this._camera,null,180,20,320,5)};e.prototype.initLights=function(){this._pointLight=new f;this._scene.addChild(this._pointLight);this._lightPicker=new y([this._pointLight])};e.prototype.initMaterials=function(){this._whiteMaterial=new E(16777215);this._whiteMaterial.lightPicker=this._lightPicker;this._blackMaterial=new E(3355443);this._blackMaterial.lightPicker=this._lightPicker;this._grayMaterial=new E(13421772);this._grayMaterial.lightPicker=this._lightPicker;this._blueMaterial=new E(255);this._blueMaterial.lightPicker=this._lightPicker;this._redMaterial=new E(16711680);this._redMaterial.lightPicker=this._lightPicker};e.prototype.initObjects=function(){var e=this;this._pickingPositionTracer=new g(2).getNewObject();this._pickingPositionTracer.material=new E(65280,.5);this._pickingPositionTracer.visible=false;this._pickingPositionTracer.mouseEnabled=false;this._pickingPositionTracer.mouseChildren=false;this._scene.addChild(this._pickingPositionTracer);this._scenePositionTracer=new g(2).getNewObject();this._pickingPositionTracer.material=new E(255,.5);this._scenePositionTracer.visible=false;this._scenePositionTracer.mouseEnabled=false;this._scene.addChild(this._scenePositionTracer);this._pickingNormalTracer=new p(new m(16777215),new n,new n,3);this._pickingNormalTracer.mouseEnabled=false;this._pickingNormalTracer.visible=false;this._view.scene.addChild(this._pickingNormalTracer);this._sceneNormalTracer=new p(new m(16777215),new n,new n,3);this._sceneNormalTracer.mouseEnabled=false;this._sceneNormalTracer.visible=false;this._view.scene.addChild(this._sceneNormalTracer);this._token=r.load(new o("assets/head.obj"),null,null,new C(25));this._token.addEventListener(a.ASSET_COMPLETE,function(i){return e.onAssetComplete(i)});this.createABunchOfObjects();this._raycastPicker.setIgnoreList([this._sceneNormalTracer,this._scenePositionTracer]);this._raycastPicker.onlyMouseEnabled=false};e.prototype.onAssetComplete=function(e){if(e.asset.isAsset(_)){this.initializeHeadModel(e.asset)}};e.prototype.initializeHeadModel=function(i){this._head=i;var t=new s(e.PAINT_TEXTURE_SIZE,e.PAINT_TEXTURE_SIZE,false,13421772);var a=new k(t);var n=new E(a);n.lightPicker=this._lightPicker;i.material=n;i.pickingCollider=new T(this._renderer.renderablePool);i.mouseEnabled=i.mouseChildren=true;this.enableMeshMouseListeners(i);this._view.scene.addChild(i)};e.prototype.createABunchOfObjects=function(){this._cubePrefab=new v(25,50,25);this._spherePrefab=new g(12);this._cylinderPrefab=new M(12,12,25);this._torusPrefab=new P(12,12);for(var e=0;e<40;e++){var i=this.createSimpleObject();i.rotationZ=360*Math.random();var t=200+100*Math.random();var s=2*Math.PI*Math.random();var a=.25*Math.PI*Math.random();i.x=t*Math.cos(a)*Math.sin(s);i.y=t*Math.sin(a);i.z=t*Math.cos(a)*Math.cos(s)}};e.prototype.createSimpleObject=function(){var e;var i;var t=Math.random();if(t>.75){e=this._cubePrefab.getNewObject()}else if(t>.5){e=this._spherePrefab.getNewObject();i=u.SPHERE}else if(t>.25){e=this._cylinderPrefab.getNewObject()}else{e=this._torusPrefab.getNewObject()}if(i)e.boundsType=i;var s=Math.random()>.5;if(s){e.pickingCollider=new T(this._renderer.renderablePool)}var a=Math.random()>.25;e.mouseEnabled=e.mouseChildren=a;var n=Math.random()>.25;if(a&&n){this.enableMeshMouseListeners(e)}this.choseMeshMaterial(e);this._view.scene.addChild(e);return e};e.prototype.choseMeshMaterial=function(e){if(!e.mouseEnabled){e.material=this._blackMaterial}else{if(!e.hasEventListener(b.MOUSE_MOVE)){e.material=this._grayMaterial}else{if(e.pickingCollider!=null){e.material=this._redMaterial}else{e.material=this._blueMaterial}}}};e.prototype.initListeners=function(){var e=this;window.onresize=function(i){return e.onResize(i)};document.onmousedown=function(i){return e.onMouseDown(i)};document.onmouseup=function(i){return e.onMouseUp(i)};document.onmousemove=function(i){return e.onMouseMove(i)};document.onmousewheel=function(i){return e.onMouseWheel(i)};document.onkeydown=function(i){return e.onKeyDown(i)};document.onkeyup=function(i){return e.onKeyUp(i)};this.onResize();this._timer=new l(this.onEnterFrame,this);this._timer.start()};e.prototype.onEnterFrame=function(e){this._pointLight.transform.position=this._camera.transform.position;var i=this._raycastPicker.getSceneCollision(this._camera.transform.position,this._view.camera.transform.forwardVector,this._view.scene);if(this._previoiusCollidingObject&&this._previoiusCollidingObject!=i){this._scenePositionTracer.visible=this._sceneNormalTracer.visible=false;this._scenePositionTracer.transform.position=new n}if(i){this._scenePositionTracer.visible=this._sceneNormalTracer.visible=true;this._scenePositionTracer.transform.position=i.displayObject.sceneTransform.transformVector(i.localPosition);this._sceneNormalTracer.transform.position=this._scenePositionTracer.transform.position;var t=i.displayObject.sceneTransform.deltaTransformVector(i.localNormal);t.normalize();t.scaleBy(25);this._sceneNormalTracer.endPosition=t.clone()}this._previoiusCollidingObject=i;this._view.render()};e.prototype.onKeyDown=function(e){switch(e.keyCode){case c.UP:case c.W:this._tiltIncrement=this._tiltSpeed;break;case c.DOWN:case c.S:this._tiltIncrement=-this._tiltSpeed;break;case c.LEFT:case c.A:this._panIncrement=this._panSpeed;break;case c.RIGHT:case c.D:this._panIncrement=-this._panSpeed;break;case c.Z:this._distanceIncrement=this._distanceSpeed;break;case c.X:this._distanceIncrement=-this._distanceSpeed;break}};e.prototype.onKeyUp=function(e){switch(e.keyCode){case c.UP:case c.W:case c.DOWN:case c.S:this._tiltIncrement=0;break;case c.LEFT:case c.A:case c.RIGHT:case c.D:this._panIncrement=0;break;case c.Z:case c.X:this._distanceIncrement=0;break}};e.prototype.enableMeshMouseListeners=function(e){var i=this;e.addEventListener(b.MOUSE_OVER,function(e){return i.onMeshMouseOver(e)});e.addEventListener(b.MOUSE_OUT,function(e){return i.onMeshMouseOut(e)});e.addEventListener(b.MOUSE_MOVE,function(e){return i.onMeshMouseMove(e)});e.addEventListener(b.MOUSE_DOWN,function(e){return i.onMeshMouseDown(e)})};e.prototype.onMeshMouseDown=function(e){};e.prototype.onMeshMouseOver=function(e){var i=e.object;i.debugVisible=true;if(i!=this._head)i.material=this._whiteMaterial;this._pickingPositionTracer.visible=this._pickingNormalTracer.visible=true;this.onMeshMouseMove(e)};e.prototype.onMeshMouseOut=function(e){var i=e.object;i.debugVisible=false;if(i!=this._head)this.choseMeshMaterial(i);this._pickingPositionTracer.visible=this._pickingNormalTracer.visible=false;this._pickingPositionTracer.transform.position=new n};e.prototype.onMeshMouseMove=function(e){this._pickingPositionTracer.visible=this._pickingNormalTracer.visible=true;this._pickingPositionTracer.transform.position=e.scenePosition;this._pickingNormalTracer.transform.position=this._pickingPositionTracer.transform.position;var i=e.sceneNormal.clone();i.scaleBy(25);this._pickingNormalTracer.endPosition=i.clone()};e.prototype.onMouseDown=function(e){this._lastPanAngle=this._cameraController.panAngle;this._lastTiltAngle=this._cameraController.tiltAngle;this._lastMouseX=e.clientX;this._lastMouseY=e.clientY;this._move=true};e.prototype.onMouseUp=function(e){this._move=false};e.prototype.onMouseMove=function(e){if(this._move){this._cameraController.panAngle=.3*(e.clientX-this._lastMouseX)+this._lastPanAngle;this._cameraController.tiltAngle=.3*(e.clientY-this._lastMouseY)+this._lastTiltAngle}};e.prototype.onMouseWheel=function(e){this._cameraController.distance-=e.wheelDelta;if(this._cameraController.distance<100)this._cameraController.distance=100;else if(this._cameraController.distance>2e3)this._cameraController.distance=2e3};e.prototype.onResize=function(e){if(e===void 0){e=null}this._view.y=0;this._view.x=0;this._view.width=window.innerWidth;this._view.height=window.innerHeight};e.PAINT_TEXTURE_SIZE=1024;return e}();window.onload=function(){new O}},{"awayjs-core/lib/data/BitmapImage2D":undefined,"awayjs-core/lib/events/AssetEvent":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/ui/Keyboard":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/bounds/BoundsType":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/controllers/HoverController":undefined,"awayjs-display/lib/entities/LineSegment":undefined,"awayjs-display/lib/entities/Mesh":undefined,"awayjs-display/lib/entities/PointLight":undefined,"awayjs-display/lib/events/MouseEvent":undefined,"awayjs-display/lib/materials/BasicMaterial":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-display/lib/pick/RaycastPicker":undefined,"awayjs-display/lib/prefabs/PrimitiveCubePrefab":undefined,"awayjs-display/lib/prefabs/PrimitiveCylinderPrefab":undefined,"awayjs-display/lib/prefabs/PrimitiveSpherePrefab":undefined,"awayjs-display/lib/prefabs/PrimitiveTorusPrefab":undefined,"awayjs-display/lib/textures/Single2DTexture":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-parsers/lib/OBJParser":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined,"awayjs-renderergl/lib/pick/JSPickingCollider":undefined}]},{},["./src/Intermediate_MouseInteraction.ts"]);

//# sourceMappingURL=Intermediate_MouseInteraction.js.map