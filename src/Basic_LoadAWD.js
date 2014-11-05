/*

AWD file loading example in Away3d

Demonstrates:

How to use the Loader3D object to load an embedded internal 3ds model.
How to map an external asset reference inside a file to an internal embedded asset.
How to extract material data and use it to set custom material properties on a model.

Code by Rob Bateman
rob@infiniteturtles.co.uk
http://www.infiniteturtles.co.uk

This code is distributed under the MIT License

Copyright (c) The Away Foundation http://www.theawayfoundation.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var AssetType = require("awayjs-core/lib/library/AssetType");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
var StaticLightPicker = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var AWDParser = require("awayjs-parsers/lib/AWDParser");
var Basic_LoadAWD = (function () {
    /**
     * Constructor
     */
    function Basic_LoadAWD() {
        this._time = 0;
        this.init();
    }
    /**
     * Global initialise function
     */
    Basic_LoadAWD.prototype.init = function () {
        this.initEngine();
        this.initLights();
        this.initMaterials();
        this.initObjects();
        this.initListeners();
    };
    /**
     * Initialise the engine
     */
    Basic_LoadAWD.prototype.initEngine = function () {
        this._view = new View(new DefaultRenderer());
        //set the background of the view to something suitable
        this._view.backgroundColor = 0x1e2125;
        //position the camera
        this._view.camera.z = -2000;
    };
    /**
     * Initialise the entities
     */
    Basic_LoadAWD.prototype.initLights = function () {
        //create the light for the scene
        this._light = new DirectionalLight();
        this._light.color = 0x683019;
        this._light.direction = new Vector3D(1, 0, 0);
        this._light.ambient = 0.5;
        this._light.ambientColor = 0x30353b;
        this._light.diffuse = 2.8;
        this._light.specular = 1.8;
        this._view.scene.addChild(this._light);
        //create the light picker for the material
        this._lightPicker = new StaticLightPicker([this._light]);
    };
    /**
     * Initialise the materials
     */
    Basic_LoadAWD.prototype.initMaterials = function () {
    };
    /**
     * Initialise the scene objects
     */
    Basic_LoadAWD.prototype.initObjects = function () {
    };
    /**
     * Initialise the listeners
     */
    Basic_LoadAWD.prototype.initListeners = function () {
        var _this = this;
        window.onresize = function (event) { return _this.onResize(event); };
        this.onResize();
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();
        AssetLibrary.enableParser(AWDParser);
        AssetLibrary.addEventListener(AssetEvent.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        AssetLibrary.load(new URLRequest('assets/suzanne.awd'));
    };
    /**
     * Navigation and render loop
     */
    Basic_LoadAWD.prototype.onEnterFrame = function (dt) {
        this._time += dt;
        if (this._suzanne)
            this._suzanne.rotationY += 1;
        this._view.render();
    };
    /**
     * Listener function for asset complete event on loader
     */
    Basic_LoadAWD.prototype.onAssetComplete = function (event) {
        var asset = event.asset;
        switch (asset.assetType) {
            case AssetType.MESH:
                var mesh = asset;
                mesh.y = -300;
                mesh.transform.scale = new Vector3D(900, 900, 900);
                this._suzanne = mesh;
                this._view.scene.addChild(mesh);
                break;
            case AssetType.MATERIAL:
                var material = asset;
                material.lightPicker = this._lightPicker;
                break;
        }
    };
    /**
     * stage listener for resize events
     */
    Basic_LoadAWD.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    return Basic_LoadAWD;
})();
window.onload = function () {
    new Basic_LoadAWD();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9CYXNpY19Mb2FkQVdELnRzIl0sIm5hbWVzIjpbIkJhc2ljX0xvYWRBV0QiLCJCYXNpY19Mb2FkQVdELmNvbnN0cnVjdG9yIiwiQmFzaWNfTG9hZEFXRC5pbml0IiwiQmFzaWNfTG9hZEFXRC5pbml0RW5naW5lIiwiQmFzaWNfTG9hZEFXRC5pbml0TGlnaHRzIiwiQmFzaWNfTG9hZEFXRC5pbml0TWF0ZXJpYWxzIiwiQmFzaWNfTG9hZEFXRC5pbml0T2JqZWN0cyIsIkJhc2ljX0xvYWRBV0QuaW5pdExpc3RlbmVycyIsIkJhc2ljX0xvYWRBV0Qub25FbnRlckZyYW1lIiwiQmFzaWNfTG9hZEFXRC5vbkFzc2V0Q29tcGxldGUiLCJCYXNpY19Mb2FkQVdELm9uUmVzaXplIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0NFO0FBRUYsSUFBTyxVQUFVLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNyRSxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLFlBQVksV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQzFFLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFcEUsSUFBTyxVQUFVLFdBQWUsZ0NBQWdDLENBQUMsQ0FBQztBQUNsRSxJQUFPLHFCQUFxQixXQUFZLDZDQUE2QyxDQUFDLENBQUM7QUFHdkYsSUFBTyxJQUFJLFdBQWlCLG9DQUFvQyxDQUFDLENBQUM7QUFFbEUsSUFBTyxnQkFBZ0IsV0FBYyw4Q0FBOEMsQ0FBQyxDQUFDO0FBRXJGLElBQU8saUJBQWlCLFdBQWEsNkRBQTZELENBQUMsQ0FBQztBQUVwRyxJQUFPLGVBQWUsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBSTdFLElBQU8sU0FBUyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFFL0QsSUFBTSxhQUFhO0lBZ0JsQkE7O09BRUdBO0lBQ0hBLFNBbkJLQSxhQUFhQTtRQWNWQyxVQUFLQSxHQUFV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QSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDaENBLEtBQUtBLENBQUNBO1lBQ1BBLEtBQUtBLFNBQVNBLENBQUNBLFFBQVFBO2dCQUN0QkEsSUFBSUEsUUFBUUEsR0FBbURBLEtBQUtBLENBQUNBO2dCQUNyRUEsUUFBUUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7Z0JBQ3pDQSxLQUFLQSxDQUFDQTtRQUNSQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEVDs7T0FFR0E7SUFDS0EsZ0NBQVFBLEdBQWhCQSxVQUFpQkEsS0FBb0JBO1FBQXBCVSxxQkFBb0JBLEdBQXBCQSxZQUFvQkE7UUFFcENBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDckNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO0lBQ3hDQSxDQUFDQTtJQUNGVixvQkFBQ0E7QUFBREEsQ0FwSkEsQUFvSkNBLElBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHO0lBRWYsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUEiLCJmaWxlIjoiQmFzaWNfTG9hZEFXRC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cbkFXRCBmaWxlIGxvYWRpbmcgZXhhbXBsZSBpbiBBd2F5M2RcblxuRGVtb25zdHJhdGVzOlxuXG5Ib3cgdG8gdXNlIHRoZSBMb2FkZXIzRCBvYmplY3QgdG8gbG9hZCBhbiBlbWJlZGRlZCBpbnRlcm5hbCAzZHMgbW9kZWwuXG5Ib3cgdG8gbWFwIGFuIGV4dGVybmFsIGFzc2V0IHJlZmVyZW5jZSBpbnNpZGUgYSBmaWxlIHRvIGFuIGludGVybmFsIGVtYmVkZGVkIGFzc2V0LlxuSG93IHRvIGV4dHJhY3QgbWF0ZXJpYWwgZGF0YSBhbmQgdXNlIGl0IHRvIHNldCBjdXN0b20gbWF0ZXJpYWwgcHJvcGVydGllcyBvbiBhIG1vZGVsLlxuXG5Db2RlIGJ5IFJvYiBCYXRlbWFuXG5yb2JAaW5maW5pdGV0dXJ0bGVzLmNvLnVrXG5odHRwOi8vd3d3LmluZmluaXRldHVydGxlcy5jby51a1xuXG5UaGlzIGNvZGUgaXMgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgVGhlIEF3YXkgRm91bmRhdGlvbiBodHRwOi8vd3d3LnRoZWF3YXlmb3VuZGF0aW9uLm9yZ1xuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSDigJxTb2Z0d2FyZeKAnSksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQg4oCcQVMgSVPigJ0sIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBBc3NldExpYnJhcnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5XCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IFJlcXVlc3RBbmltYXRpb25GcmFtZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCIpO1xuXG5pbXBvcnQgTG9hZGVyXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvTG9hZGVyXCIpO1xuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgSG92ZXJDb250cm9sbGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvSG92ZXJDb250cm9sbGVyXCIpO1xuaW1wb3J0IERpcmVjdGlvbmFsTGlnaHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9EaXJlY3Rpb25hbExpZ2h0XCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IFN0YXRpY0xpZ2h0UGlja2VyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9saWdodHBpY2tlcnMvU3RhdGljTGlnaHRQaWNrZXJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9EZWZhdWx0UmVuZGVyZXJcIik7XG5cbmltcG9ydCBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsXHRcdD0gcmVxdWlyZShcImF3YXlqcy1tZXRob2RtYXRlcmlhbHMvbGliL1RyaWFuZ2xlTWV0aG9kTWF0ZXJpYWxcIik7XG5cbmltcG9ydCBBV0RQYXJzZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXBhcnNlcnMvbGliL0FXRFBhcnNlclwiKTtcblxuY2xhc3MgQmFzaWNfTG9hZEFXRFxue1xuXHQvL2VuZ2luZSB2YXJpYWJsZXNcblx0cHJpdmF0ZSBfdmlldzpWaWV3O1xuXG5cdC8vbGlnaHQgb2JqZWN0c1xuXHRwcml2YXRlIF9saWdodDpEaXJlY3Rpb25hbExpZ2h0O1xuXHRwcml2YXRlIF9saWdodFBpY2tlcjpTdGF0aWNMaWdodFBpY2tlcjtcblxuXHQvL3NjZW5lIG9iamVjdHNcblx0cHJpdmF0ZSBfc3V6YW5uZTpNZXNoO1xuXG5cdC8vbmF2aWdhdGlvbiB2YXJpYWJsZXNcblx0cHJpdmF0ZSBfdGltZXI6UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRwcml2YXRlIF90aW1lOm51bWJlciA9IDA7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHbG9iYWwgaW5pdGlhbGlzZSBmdW5jdGlvblxuXHQgKi9cblx0cHJpdmF0ZSBpbml0KCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5pbml0RW5naW5lKCk7XG5cdFx0dGhpcy5pbml0TGlnaHRzKCk7XG5cdFx0dGhpcy5pbml0TWF0ZXJpYWxzKCk7XG5cdFx0dGhpcy5pbml0T2JqZWN0cygpO1xuXHRcdHRoaXMuaW5pdExpc3RlbmVycygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIGVuZ2luZVxuXHQgKi9cblx0cHJpdmF0ZSBpbml0RW5naW5lKCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fdmlldyA9IG5ldyBWaWV3KG5ldyBEZWZhdWx0UmVuZGVyZXIoKSk7XG5cblx0XHQvL3NldCB0aGUgYmFja2dyb3VuZCBvZiB0aGUgdmlldyB0byBzb21ldGhpbmcgc3VpdGFibGVcblx0XHR0aGlzLl92aWV3LmJhY2tncm91bmRDb2xvciA9IDB4MWUyMTI1O1xuXG5cdFx0Ly9wb3NpdGlvbiB0aGUgY2FtZXJhXG5cdFx0dGhpcy5fdmlldy5jYW1lcmEueiA9IC0yMDAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIGVudGl0aWVzXG5cdCAqL1xuXHRwcml2YXRlIGluaXRMaWdodHMoKTp2b2lkXG5cdHtcblx0XHQvL2NyZWF0ZSB0aGUgbGlnaHQgZm9yIHRoZSBzY2VuZVxuXHRcdHRoaXMuX2xpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoKTtcblx0XHR0aGlzLl9saWdodC5jb2xvciA9IDB4NjgzMDE5O1xuXHRcdHRoaXMuX2xpZ2h0LmRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzRCgxLCAwLCAwKTtcblx0XHR0aGlzLl9saWdodC5hbWJpZW50ID0gMC41O1xuXHRcdHRoaXMuX2xpZ2h0LmFtYmllbnRDb2xvciA9IDB4MzAzNTNiO1xuXHRcdHRoaXMuX2xpZ2h0LmRpZmZ1c2UgPSAyLjg7XG5cdFx0dGhpcy5fbGlnaHQuc3BlY3VsYXIgPSAxLjg7XG5cdFx0dGhpcy5fdmlldy5zY2VuZS5hZGRDaGlsZCh0aGlzLl9saWdodCk7XG5cblx0XHQvL2NyZWF0ZSB0aGUgbGlnaHQgcGlja2VyIGZvciB0aGUgbWF0ZXJpYWxcblx0XHR0aGlzLl9saWdodFBpY2tlciA9IG5ldyBTdGF0aWNMaWdodFBpY2tlcihbdGhpcy5fbGlnaHRdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBtYXRlcmlhbHNcblx0ICovXG5cdHByaXZhdGUgaW5pdE1hdGVyaWFscygpOnZvaWRcblx0e1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIHNjZW5lIG9iamVjdHNcblx0ICovXG5cdHByaXZhdGUgaW5pdE9iamVjdHMoKTp2b2lkXG5cdHtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBsaXN0ZW5lcnNcblx0ICovXG5cdHByaXZhdGUgaW5pdExpc3RlbmVycygpOnZvaWRcblx0e1xuXHRcdHdpbmRvdy5vbnJlc2l6ZSAgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vblJlc2l6ZShldmVudCk7XG5cblx0XHR0aGlzLm9uUmVzaXplKCk7XG5cblx0XHR0aGlzLl90aW1lciA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5vbkVudGVyRnJhbWUsIHRoaXMpO1xuXHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cblx0XHRBc3NldExpYnJhcnkuZW5hYmxlUGFyc2VyKEFXRFBhcnNlcik7XG5cblx0XHRBc3NldExpYnJhcnkuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpKTtcblx0XHRBc3NldExpYnJhcnkubG9hZChuZXcgVVJMUmVxdWVzdCgnYXNzZXRzL3N1emFubmUuYXdkJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRpb24gYW5kIHJlbmRlciBsb29wXG5cdCAqL1xuXHRwcml2YXRlIG9uRW50ZXJGcmFtZShkdDpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMuX3RpbWUgKz0gZHQ7XG5cblx0XHRpZiAodGhpcy5fc3V6YW5uZSlcblx0XHRcdHRoaXMuX3N1emFubmUucm90YXRpb25ZICs9IDE7XG5cblx0XHR0aGlzLl92aWV3LnJlbmRlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3RlbmVyIGZ1bmN0aW9uIGZvciBhc3NldCBjb21wbGV0ZSBldmVudCBvbiBsb2FkZXJcblx0ICovXG5cdHByaXZhdGUgb25Bc3NldENvbXBsZXRlKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblx0XHR2YXIgYXNzZXQ6SUFzc2V0ID0gZXZlbnQuYXNzZXQ7XG5cblx0XHRzd2l0Y2ggKGFzc2V0LmFzc2V0VHlwZSlcblx0XHR7XG5cdFx0XHRjYXNlIEFzc2V0VHlwZS5NRVNIIDpcblx0XHRcdFx0dmFyIG1lc2g6TWVzaCA9IDxNZXNoPiBhc3NldDtcblx0XHRcdFx0bWVzaC55ID0gLTMwMDtcblx0XHRcdFx0bWVzaC50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgVmVjdG9yM0QoOTAwLCA5MDAsIDkwMCk7XG5cblx0XHRcdFx0dGhpcy5fc3V6YW5uZSA9IG1lc2g7XG5cdFx0XHRcdHRoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQobWVzaCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBBc3NldFR5cGUuTUFURVJJQUw6XG5cdFx0XHRcdHZhciBtYXRlcmlhbDpUcmlhbmdsZU1ldGhvZE1hdGVyaWFsID0gPFRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWw+IGFzc2V0O1xuXHRcdFx0XHRtYXRlcmlhbC5saWdodFBpY2tlciA9IHRoaXMuX2xpZ2h0UGlja2VyO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogc3RhZ2UgbGlzdGVuZXIgZm9yIHJlc2l6ZSBldmVudHNcblx0ICovXG5cdHByaXZhdGUgb25SZXNpemUoZXZlbnQ6VUlFdmVudCA9IG51bGwpOnZvaWRcblx0e1xuXHRcdHRoaXMuX3ZpZXcueSA9IDA7XG5cdFx0dGhpcy5fdmlldy54ID0gMDtcblx0XHR0aGlzLl92aWV3LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5fdmlldy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cbn1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpXG57XG5cdG5ldyBCYXNpY19Mb2FkQVdEKCk7XG59Il19