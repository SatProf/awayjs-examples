var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var AssetType = require("awayjs-core/lib/library/AssetType");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var Debug = require("awayjs-core/lib/utils/Debug");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var View = require("awayjs-display/lib/containers/View");
var DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
var StaticLightPicker = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var TriangleMethodMaterial = require("awayjs-methodmaterials/lib/TriangleMethodMaterial");
var OBJParser = require("awayjs-parsers/lib/OBJParser");
var ObjLoaderMasterChief = (function () {
    function ObjLoaderMasterChief() {
        var _this = this;
        this.meshes = new Array();
        this.spartan = new DisplayObjectContainer();
        this.spartanFlag = false;
        this.terrainObjFlag = false;
        Debug.LOG_PI_ERRORS = false;
        Debug.THROW_ERRORS = false;
        this.view = new View(new DefaultRenderer());
        this.view.camera.z = -50;
        this.view.camera.y = 20;
        this.view.camera.projection.near = 0.1;
        this.view.backgroundColor = 0xCEC8C6;
        this.raf = new RequestAnimationFrame(this.render, this);
        this.light = new DirectionalLight();
        this.light.color = 0xc1582d;
        this.light.direction = new Vector3D(1, 0, 0);
        this.light.ambient = 0.4;
        this.light.ambientColor = 0x85b2cd;
        this.light.diffuse = 2.8;
        this.light.specular = 1.8;
        this.spartan.transform.scale = new Vector3D(.25, .25, .25);
        this.spartan.y = 0;
        this.view.scene.addChild(this.light);
        AssetLibrary.enableParser(OBJParser);
        this.token = AssetLibrary.load(new URLRequest('assets/Halo_3_SPARTAN4.obj'));
        this.token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        this.token = AssetLibrary.load(new URLRequest('assets/terrain.obj'));
        this.token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        this.token = AssetLibrary.load(new URLRequest('assets/masterchief_base.png'));
        this.token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        this.token = AssetLibrary.load(new URLRequest('assets/stone_tx.jpg'));
        this.token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        window.onresize = function (event) { return _this.onResize(); };
        this.raf.start();
    }
    ObjLoaderMasterChief.prototype.render = function () {
        if (this.terrain)
            this.terrain.rotationY += 0.4;
        this.spartan.rotationY += 0.4;
        this.view.render();
    };
    ObjLoaderMasterChief.prototype.onResourceComplete = function (event) {
        var loader = event.target;
        var l = loader.baseDependency.assets.length;
        console.log('------------------------------------------------------------------------------');
        console.log('away.events.LoaderEvent.RESOURCE_COMPLETE', event, l, loader);
        console.log('------------------------------------------------------------------------------');
        var loader = event.target;
        var l = loader.baseDependency.assets.length;
        for (var c = 0; c < l; c++) {
            var d = loader.baseDependency.assets[c];
            console.log(d.name, event.url);
            switch (d.assetType) {
                case AssetType.MESH:
                    if (event.url == 'assets/Halo_3_SPARTAN4.obj') {
                        var mesh = d;
                        this.spartan.addChild(mesh);
                        this.spartanFlag = true;
                        this.meshes.push(mesh);
                    }
                    else if (event.url == 'assets/terrain.obj') {
                        this.terrainObjFlag = true;
                        this.terrain = d;
                        this.terrain.y = 98;
                        this.view.scene.addChild(this.terrain);
                    }
                    break;
                case AssetType.TEXTURE:
                    if (event.url == 'assets/masterchief_base.png') {
                        this.mat = new TriangleMethodMaterial(d, true, true, false);
                        this.mat.lightPicker = new StaticLightPicker([this.light]);
                    }
                    else if (event.url == 'assets/stone_tx.jpg') {
                        this.terrainMaterial = new TriangleMethodMaterial(d, true, true, false);
                        this.terrainMaterial.lightPicker = new StaticLightPicker([this.light]);
                    }
                    break;
            }
        }
        if (this.terrainObjFlag && this.terrainMaterial) {
            this.terrain.material = this.terrainMaterial;
            this.terrain.geometry.scaleUV(20, 20);
        }
        if (this.mat && this.spartanFlag)
            for (var c = 0; c < this.meshes.length; c++)
                this.meshes[c].material = this.mat;
        this.view.scene.addChild(this.spartan);
        this.onResize();
    };
    ObjLoaderMasterChief.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this.view.y = 0;
        this.view.x = 0;
        this.view.width = window.innerWidth;
        this.view.height = window.innerHeight;
    };
    return ObjLoaderMasterChief;
})();
window.onload = function () {
    new ObjLoaderMasterChief(); // Start the demo
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9PYmpMb2FkZXJNYXN0ZXJDaGllZi50cyJdLCJuYW1lcyI6WyJPYmpMb2FkZXJNYXN0ZXJDaGllZiIsIk9iakxvYWRlck1hc3RlckNoaWVmLmNvbnN0cnVjdG9yIiwiT2JqTG9hZGVyTWFzdGVyQ2hpZWYucmVuZGVyIiwiT2JqTG9hZGVyTWFzdGVyQ2hpZWYub25SZXNvdXJjZUNvbXBsZXRlIiwiT2JqTG9hZGVyTWFzdGVyQ2hpZWYub25SZXNpemUiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sV0FBVyxXQUFlLG9DQUFvQyxDQUFDLENBQUM7QUFDdkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxZQUFZLFdBQWUsc0NBQXNDLENBQUMsQ0FBQztBQUcxRSxJQUFPLFNBQVMsV0FBa0IsbUNBQW1DLENBQUMsQ0FBQztBQUV2RSxJQUFPLFVBQVUsV0FBZSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWxFLElBQU8sS0FBSyxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzNELElBQU8scUJBQXFCLFdBQVksNkNBQTZDLENBQUMsQ0FBQztBQUV2RixJQUFPLHNCQUFzQixXQUFZLHNEQUFzRCxDQUFDLENBQUM7QUFDakcsSUFBTyxJQUFJLFdBQWlCLG9DQUFvQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxnQkFBZ0IsV0FBYyw4Q0FBOEMsQ0FBQyxDQUFDO0FBRXJGLElBQU8saUJBQWlCLFdBQWEsNkRBQTZELENBQUMsQ0FBQztBQUVwRyxJQUFPLGVBQWUsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTdFLElBQU8sc0JBQXNCLFdBQVksbURBQW1ELENBQUMsQ0FBQztBQUU5RixJQUFPLFNBQVMsV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRS9ELElBQU0sb0JBQW9CO0lBZXpCQSxTQWZLQSxvQkFBb0JBO1FBQTFCQyxpQkE0SUNBO1FBdklRQSxXQUFNQSxHQUFlQSxJQUFJQSxLQUFLQSxFQUFRQSxDQUFDQTtRQU92Q0EsWUFBT0EsR0FBMEJB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LENBQUNBLEVBQUVBO2dCQUNqREEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFFckNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQ3ZDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUgsdUNBQVFBLEdBQWZBLFVBQWdCQSxLQUFvQkE7UUFBcEJJLHFCQUFvQkEsR0FBcEJBLFlBQW9CQTtRQUVuQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWhCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUNwQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBQ0ZKLDJCQUFDQTtBQUFEQSxDQTVJQSxBQTRJQ0EsSUFBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFFZixJQUFJLG9CQUFvQixFQUFFLEVBQUUsaUJBQWlCO0FBQzlDLENBQUMsQ0FBQSxFQUQyQiIsImZpbGUiOiJPYmpMb2FkZXJNYXN0ZXJDaGllZi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiKTtcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclRva2VuXCIpO1xuaW1wb3J0IEFzc2V0VHlwZSAgIFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0ICAgXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdFwiKTtcbmltcG9ydCBJbWFnZVRleHR1cmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0ltYWdlVGV4dHVyZVwiKTtcbmltcG9ydCBEZWJ1Z1x0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9EZWJ1Z1wiKTtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcblxuaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcbmltcG9ydCBWaWV3XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9WaWV3XCIpO1xuaW1wb3J0IERpcmVjdGlvbmFsTGlnaHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9EaXJlY3Rpb25hbExpZ2h0XCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IFN0YXRpY0xpZ2h0UGlja2VyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9saWdodHBpY2tlcnMvU3RhdGljTGlnaHRQaWNrZXJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9EZWZhdWx0UmVuZGVyZXJcIik7XG5cbmltcG9ydCBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsXHRcdD0gcmVxdWlyZShcImF3YXlqcy1tZXRob2RtYXRlcmlhbHMvbGliL1RyaWFuZ2xlTWV0aG9kTWF0ZXJpYWxcIik7XG5cbmltcG9ydCBPQkpQYXJzZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXBhcnNlcnMvbGliL09CSlBhcnNlclwiKTtcblxuY2xhc3MgT2JqTG9hZGVyTWFzdGVyQ2hpZWZcbntcblx0cHJpdmF0ZSB0b2tlbjpBc3NldExvYWRlclRva2VuO1xuXHRwcml2YXRlIHZpZXc6Vmlldztcblx0cHJpdmF0ZSByYWY6UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRwcml2YXRlIG1lc2hlczpBcnJheTxNZXNoPiA9IG5ldyBBcnJheTxNZXNoPigpO1xuXHRwcml2YXRlIG1hdDpUcmlhbmdsZU1ldGhvZE1hdGVyaWFsO1xuXG5cdHByaXZhdGUgdGVycmFpbk1hdGVyaWFsOlRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWw7XG5cblx0cHJpdmF0ZSBsaWdodDpEaXJlY3Rpb25hbExpZ2h0O1xuXG5cdHByaXZhdGUgc3BhcnRhbjpEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gbmV3IERpc3BsYXlPYmplY3RDb250YWluZXIoKTtcblx0cHJpdmF0ZSB0ZXJyYWluOk1lc2g7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0RGVidWcuTE9HX1BJX0VSUk9SUyA9IGZhbHNlO1xuXHRcdERlYnVnLlRIUk9XX0VSUk9SUyA9IGZhbHNlO1xuXG5cdFx0dGhpcy52aWV3ID0gbmV3IFZpZXcobmV3IERlZmF1bHRSZW5kZXJlcigpKTtcblx0XHR0aGlzLnZpZXcuY2FtZXJhLnogPSAtNTA7XG5cdFx0dGhpcy52aWV3LmNhbWVyYS55ID0gMjA7XG5cdFx0dGhpcy52aWV3LmNhbWVyYS5wcm9qZWN0aW9uLm5lYXIgPSAwLjE7XG5cdFx0dGhpcy52aWV3LmJhY2tncm91bmRDb2xvciA9IDB4Q0VDOEM2O1xuXG5cdFx0dGhpcy5yYWYgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLCB0aGlzKTtcblxuXHRcdHRoaXMubGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgpO1xuXHRcdHRoaXMubGlnaHQuY29sb3IgPSAweGMxNTgyZDtcblx0XHR0aGlzLmxpZ2h0LmRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzRCgxLCAwLCAwKTtcblx0XHR0aGlzLmxpZ2h0LmFtYmllbnQgPSAwLjQ7XG5cdFx0dGhpcy5saWdodC5hbWJpZW50Q29sb3IgPSAweDg1YjJjZDtcblx0XHR0aGlzLmxpZ2h0LmRpZmZ1c2UgPSAyLjg7XG5cdFx0dGhpcy5saWdodC5zcGVjdWxhciA9IDEuODtcblxuXHRcdHRoaXMuc3BhcnRhbi50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgVmVjdG9yM0QoLjI1LCAuMjUsIC4yNSk7XG5cdFx0dGhpcy5zcGFydGFuLnkgPSAwO1xuXG5cdFx0dGhpcy52aWV3LnNjZW5lLmFkZENoaWxkKHRoaXMubGlnaHQpO1xuXG5cdFx0QXNzZXRMaWJyYXJ5LmVuYWJsZVBhcnNlcihPQkpQYXJzZXIpO1xuXG5cdFx0dGhpcy50b2tlbiA9IEFzc2V0TGlicmFyeS5sb2FkKG5ldyBVUkxSZXF1ZXN0KCdhc3NldHMvSGFsb18zX1NQQVJUQU40Lm9iaicpKTtcblx0XHR0aGlzLnRva2VuLmFkZEV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIChldmVudDpMb2FkZXJFdmVudCkgPT4gdGhpcy5vblJlc291cmNlQ29tcGxldGUoZXZlbnQpKTtcblxuXHRcdHRoaXMudG9rZW4gPSBBc3NldExpYnJhcnkubG9hZChuZXcgVVJMUmVxdWVzdCgnYXNzZXRzL3RlcnJhaW4ub2JqJykpO1xuXHRcdHRoaXMudG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgKGV2ZW50OkxvYWRlckV2ZW50KSA9PiB0aGlzLm9uUmVzb3VyY2VDb21wbGV0ZShldmVudCkpO1xuXG5cdFx0dGhpcy50b2tlbiA9IEFzc2V0TGlicmFyeS5sb2FkKG5ldyBVUkxSZXF1ZXN0KCdhc3NldHMvbWFzdGVyY2hpZWZfYmFzZS5wbmcnKSk7XG5cdFx0dGhpcy50b2tlbi5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KSk7XG5cblx0XHR0aGlzLnRva2VuID0gQXNzZXRMaWJyYXJ5LmxvYWQobmV3IFVSTFJlcXVlc3QoJ2Fzc2V0cy9zdG9uZV90eC5qcGcnKSk7XG5cdFx0dGhpcy50b2tlbi5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KSk7XG5cblx0XHR3aW5kb3cub25yZXNpemUgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vblJlc2l6ZSgpO1xuXG5cdFx0dGhpcy5yYWYuc3RhcnQoKTtcblx0fVxuXG5cdHByaXZhdGUgcmVuZGVyKClcblx0e1xuXHRcdGlmICggdGhpcy50ZXJyYWluKVxuXHRcdFx0dGhpcy50ZXJyYWluLnJvdGF0aW9uWSArPSAwLjQ7XG5cblx0XHR0aGlzLnNwYXJ0YW4ucm90YXRpb25ZICs9IDAuNDtcblx0XHR0aGlzLnZpZXcucmVuZGVyKCk7XG5cdH1cblxuXHRwcml2YXRlIHNwYXJ0YW5GbGFnICAgIDpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgdGVycmFpbk9iakZsYWcgOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwdWJsaWMgb25SZXNvdXJjZUNvbXBsZXRlIChldmVudDpMb2FkZXJFdmVudClcblx0e1xuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgPSA8QXNzZXRMb2FkZXI+IGV2ZW50LnRhcmdldDtcblx0XHR2YXIgbDpudW1iZXIgPSBsb2FkZXIuYmFzZURlcGVuZGVuY3kuYXNzZXRzLmxlbmd0aDtcblxuXHRcdGNvbnNvbGUubG9nKCAnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG5cdFx0Y29uc29sZS5sb2coICdhd2F5LmV2ZW50cy5Mb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURScgLCBldmVudCAsIGwgLCBsb2FkZXIgKTtcblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuXG5cdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IDxBc3NldExvYWRlcj4gZXZlbnQudGFyZ2V0O1xuXHRcdHZhciBsOm51bWJlciA9IGxvYWRlci5iYXNlRGVwZW5kZW5jeS5hc3NldHMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbDsgYysrKSB7XG5cblx0XHRcdHZhciBkOklBc3NldCA9IGxvYWRlci5iYXNlRGVwZW5kZW5jeS5hc3NldHNbY107XG5cblx0XHRcdGNvbnNvbGUubG9nKCBkLm5hbWUgLCBldmVudC51cmwpO1xuXG5cdFx0XHRzd2l0Y2ggKGQuYXNzZXRUeXBlKSB7XG5cdFx0XHRcdGNhc2UgQXNzZXRUeXBlLk1FU0g6XG5cdFx0XHRcdFx0aWYgKGV2ZW50LnVybCA9PSdhc3NldHMvSGFsb18zX1NQQVJUQU40Lm9iaicpIHtcblx0XHRcdFx0XHRcdHZhciBtZXNoOk1lc2ggPSA8TWVzaD4gZDtcblxuXHRcdFx0XHRcdFx0dGhpcy5zcGFydGFuLmFkZENoaWxkKG1lc2gpO1xuXHRcdFx0XHRcdFx0dGhpcy5zcGFydGFuRmxhZyA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLm1lc2hlcy5wdXNoKG1lc2gpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQudXJsID09J2Fzc2V0cy90ZXJyYWluLm9iaicpIHtcblx0XHRcdFx0XHRcdHRoaXMudGVycmFpbk9iakZsYWcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dGhpcy50ZXJyYWluID0gPE1lc2g+IGQ7XG5cdFx0XHRcdFx0XHR0aGlzLnRlcnJhaW4ueSA9IDk4O1xuXHRcdFx0XHRcdFx0dGhpcy52aWV3LnNjZW5lLmFkZENoaWxkKHRoaXMudGVycmFpbik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgQXNzZXRUeXBlLlRFWFRVUkUgOlxuXHRcdFx0XHRcdGlmIChldmVudC51cmwgPT0gJ2Fzc2V0cy9tYXN0ZXJjaGllZl9iYXNlLnBuZycgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm1hdCA9IG5ldyBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsKCA8SW1hZ2VUZXh0dXJlPiBkLCB0cnVlLCB0cnVlLCBmYWxzZSApO1xuXHRcdFx0XHRcdFx0dGhpcy5tYXQubGlnaHRQaWNrZXIgPSBuZXcgU3RhdGljTGlnaHRQaWNrZXIoW3RoaXMubGlnaHRdKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LnVybCA9PSAnYXNzZXRzL3N0b25lX3R4LmpwZycpIHtcblx0XHRcdFx0XHRcdHRoaXMudGVycmFpbk1hdGVyaWFsID0gbmV3IFRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWwoPEltYWdlVGV4dHVyZT4gZCwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0dGhpcy50ZXJyYWluTWF0ZXJpYWwubGlnaHRQaWNrZXIgPSBuZXcgU3RhdGljTGlnaHRQaWNrZXIoW3RoaXMubGlnaHRdKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy50ZXJyYWluT2JqRmxhZyAmJiB0aGlzLnRlcnJhaW5NYXRlcmlhbCkge1xuXHRcdFx0dGhpcy50ZXJyYWluLm1hdGVyaWFsID0gdGhpcy50ZXJyYWluTWF0ZXJpYWw7XG5cdFx0XHR0aGlzLnRlcnJhaW4uZ2VvbWV0cnkuc2NhbGVVVigyMCwgMjApO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm1hdCAmJiB0aGlzLnNwYXJ0YW5GbGFnKVxuXHRcdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgdGhpcy5tZXNoZXMubGVuZ3RoOyBjKyspXG5cdFx0XHRcdHRoaXMubWVzaGVzW2NdLm1hdGVyaWFsID0gdGhpcy5tYXQ7XG5cblx0XHR0aGlzLnZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5zcGFydGFuKTtcblx0XHR0aGlzLm9uUmVzaXplKCk7XG5cdH1cblxuXHRwdWJsaWMgb25SZXNpemUoZXZlbnQ6VUlFdmVudCA9IG51bGwpXG5cdHtcblx0XHR0aGlzLnZpZXcueSA9IDA7XG5cdFx0dGhpcy52aWV3LnggPSAwO1xuXG5cdFx0dGhpcy52aWV3LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy52aWV3LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0fVxufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKClcbntcblx0bmV3IE9iakxvYWRlck1hc3RlckNoaWVmKCk7IC8vIFN0YXJ0IHRoZSBkZW1vXG59Il19