/*

AWD3 file loading example in AwayJS

Demonstrates:

How to use the Loader object to load an embedded internal awd model.

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
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var AssetType = require("awayjs-core/lib/library/AssetType");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var PerspectiveProjection = require("awayjs-core/lib/projections/PerspectiveProjection");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var HoverController = require("awayjs-display/lib/controllers/HoverController");
var Loader = require("awayjs-display/lib/containers/Loader");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var AWDParser = require("awayjs-parsers/lib/AWDParser");
var AWD3Viewer = (function () {
    /**
     * Constructor
     */
    function AWD3Viewer() {
        this._time = 0;
        this.init();
    }
    /**
     * Global initialise function
     */
    AWD3Viewer.prototype.init = function () {
        this.initEngine();
        this.initObjects();
        this.initListeners();
    };
    /**
     * Initialise the engine
     */
    AWD3Viewer.prototype.initEngine = function () {
        //create the view
        this._view = new View(new DefaultRenderer());
        this._view.backgroundColor = 0xffffff;
        //create custom lens
        this._view.camera.projection = new PerspectiveProjection(120);
        this._view.camera.projection.far = 500000;
        this._view.camera.projection.near = 0.1;
        //setup controller to be used on the camera
        this._cameraController = new HoverController(this._view.camera, null, 0, 0, 300, 10, 90);
        this._cameraController.lookAtPosition = new Vector3D(0, 50, 0);
        this._cameraController.tiltAngle = 0;
        this._cameraController.panAngle = 0;
        this._cameraController.minTiltAngle = 5;
        this._cameraController.maxTiltAngle = 60;
        this._cameraController.autoUpdate = false;
    };
    /**
     * Initialise the scene objects
     */
    AWD3Viewer.prototype.initObjects = function () {
        var _this = this;
        AssetLibrary.enableParser(AWDParser);
        //kickoff asset loading
        var loader = new Loader();
        loader.addEventListener(AssetEvent.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        loader.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onRessourceComplete(event); });
        ;
        loader.load(new URLRequest("assets/test.awd"));
        // console.log("START LOADING");
        //this._view.scene.addChild(loader);
    };
    /**
     * Initialise the listeners
     */
    AWD3Viewer.prototype.initListeners = function () {
        var _this = this;
        window.onresize = function (event) { return _this.onResize(event); };
        document.onmousedown = function (event) { return _this.onMouseDown(event); };
        document.onmouseup = function (event) { return _this.onMouseUp(event); };
        document.onmousemove = function (event) { return _this.onMouseMove(event); };
        document.onmousewheel = function (event) { return _this.onMouseWheel(event); };
        this.onResize();
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();
    };
    /**
     * loader listener for asset complete events
     */
    AWD3Viewer.prototype.onAssetComplete = function (event) {
        if (event.asset.assetType == AssetType.GEOMETRY) {
        }
        if (event.asset.assetType == AssetType.TIMELINE) {
            this._rootTimeLine = event.asset;
            this._rootTimeLine.start(); // we want to start all timelines for now...
        }
    };
    /**
     * loader listener for asset complete events
     */
    AWD3Viewer.prototype.onRessourceComplete = function (event) {
        if (this._rootTimeLine) {
            console.log("LOADING A ROOT name = " + this._rootTimeLine.name + " duration=" + this._rootTimeLine.duration);
            this._rootTimeLine.start();
            this._view.scene.addChild(this._rootTimeLine);
        }
    };
    /**
     * Render loop
     */
    AWD3Viewer.prototype.onEnterFrame = function (dt) {
        this._time += dt;
        //update camera controler
        this._cameraController.update();
        if (this._rootTimeLine != undefined) {
            //console.log("RENDER = ");
            this._rootTimeLine.update(dt);
        }
        //console.log("RENDER = ");
        //update view
        this._view.render();
    };
    AWD3Viewer.prototype.onMouseDown = function (event) {
        this._lastPanAngle = this._cameraController.panAngle;
        this._lastTiltAngle = this._cameraController.tiltAngle;
        this._lastMouseX = event.clientX;
        this._lastMouseY = event.clientY;
        this._move = true;
    };
    AWD3Viewer.prototype.onMouseUp = function (event) {
        this._move = false;
    };
    AWD3Viewer.prototype.onMouseMove = function (event) {
        if (this._move) {
            this._cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
            this._cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
        }
    };
    AWD3Viewer.prototype.onMouseWheel = function (event) {
        this._cameraController.distance -= event.wheelDelta * 5;
        if (this._cameraController.distance < 100) {
            this._cameraController.distance = 100;
        }
        else if (this._cameraController.distance > 2000) {
            this._cameraController.distance = 2000;
        }
    };
    AWD3Viewer.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    return AWD3Viewer;
})();
window.onload = function () {
    new AWD3Viewer();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9BV0QzVmlld2VyLnRzIl0sIm5hbWVzIjpbIkFXRDNWaWV3ZXIiLCJBV0QzVmlld2VyLmNvbnN0cnVjdG9yIiwiQVdEM1ZpZXdlci5pbml0IiwiQVdEM1ZpZXdlci5pbml0RW5naW5lIiwiQVdEM1ZpZXdlci5pbml0T2JqZWN0cyIsIkFXRDNWaWV3ZXIuaW5pdExpc3RlbmVycyIsIkFXRDNWaWV3ZXIub25Bc3NldENvbXBsZXRlIiwiQVdEM1ZpZXdlci5vblJlc3NvdXJjZUNvbXBsZXRlIiwiQVdEM1ZpZXdlci5vbkVudGVyRnJhbWUiLCJBV0QzVmlld2VyLm9uTW91c2VEb3duIiwiQVdEM1ZpZXdlci5vbk1vdXNlVXAiLCJBV0QzVmlld2VyLm9uTW91c2VNb3ZlIiwiQVdEM1ZpZXdlci5vbk1vdXNlV2hlZWwiLCJBV0QzVmlld2VyLm9uUmVzaXplIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWtDRTtBQUVGLElBQU8sWUFBWSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFDMUUsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNwRSxJQUFPLFVBQVUsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ3JFLElBQU8sVUFBVSxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxXQUFXLFdBQWUsb0NBQW9DLENBQUMsQ0FBQztBQUN2RSxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLHFCQUFxQixXQUFZLG1EQUFtRCxDQUFDLENBQUM7QUFFN0YsSUFBTyxxQkFBcUIsV0FBWSw2Q0FBNkMsQ0FBQyxDQUFDO0FBRXZGLElBQU8sSUFBSSxXQUFpQixvQ0FBb0MsQ0FBQyxDQUFDO0FBSWxFLElBQU8sZUFBZSxXQUFjLGdEQUFnRCxDQUFDLENBQUM7QUFDdEYsSUFBTyxNQUFNLFdBQWdCLHNDQUFzQyxDQUFDLENBQUM7QUFJckUsSUFBTyxlQUFlLFdBQWMsdUNB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Q0EsQ0FBQ0EsR0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDekJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQU9BLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO1FBQ3pDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFNQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUM1Q0EsQ0FBQ0E7SUFFSGIsaUJBQUNBO0FBQURBLENBeE1BLEFBd01DQSxJQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNmLElBQUksVUFBVSxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDIiwiZmlsZSI6IkFXRDNWaWV3ZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXG5BV0QzIGZpbGUgbG9hZGluZyBleGFtcGxlIGluIEF3YXlKU1xuXG5EZW1vbnN0cmF0ZXM6XG5cbkhvdyB0byB1c2UgdGhlIExvYWRlciBvYmplY3QgdG8gbG9hZCBhbiBlbWJlZGRlZCBpbnRlcm5hbCBhd2QgbW9kZWwuXG5cbkNvZGUgYnkgUm9iIEJhdGVtYW5cbnJvYkBpbmZpbml0ZXR1cnRsZXMuY28udWtcbmh0dHA6Ly93d3cuaW5maW5pdGV0dXJ0bGVzLmNvLnVrXG5cblRoaXMgY29kZSBpcyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSBUaGUgQXdheSBGb3VuZGF0aW9uIGh0dHA6Ly93d3cudGhlYXdheWZvdW5kYXRpb24ub3JnXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIOKAnFNvZnR3YXJl4oCdKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCDigJxBUyBJU+KAnSwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG5cbmltcG9ydCBBc3NldExpYnJhcnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5XCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Mb2FkZXJFdmVudFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IFBlcnNwZWN0aXZlUHJvamVjdGlvblx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvUGVyc3BlY3RpdmVQcm9qZWN0aW9uXCIpO1xuaW1wb3J0IEtleWJvYXJkXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3VpL0tleWJvYXJkXCIpO1xuaW1wb3J0IFJlcXVlc3RBbmltYXRpb25GcmFtZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCIpO1xuXG5pbXBvcnQgVmlld1x0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvVmlld1wiKTtcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcbmltcG9ydCBDb250YWluZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcbmltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dlb21ldHJ5XCIpO1xuaW1wb3J0IEhvdmVyQ29udHJvbGxlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0hvdmVyQ29udHJvbGxlclwiKTtcbmltcG9ydCBMb2FkZXJcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9Mb2FkZXJcIik7XG5pbXBvcnQgVGltZUxpbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvVGltZUxpbmVcIik7XG5pbXBvcnQgUHJpbWl0aXZlQ3ViZVByZWZhYlx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9EZWZhdWx0UmVuZGVyZXJcIik7XG5pbXBvcnQgQ29sb3JNYXRlcmlhbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXJlbmRlcmVyZ2wvbGliL21hdGVyaWFscy9UcmlhbmdsZUJhc2ljTWF0ZXJpYWxcIik7XG5cbmltcG9ydCBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsXHRcdD0gcmVxdWlyZShcImF3YXlqcy1tZXRob2RtYXRlcmlhbHMvbGliL1RyaWFuZ2xlTWV0aG9kTWF0ZXJpYWxcIik7XG5cbmltcG9ydCBBV0RQYXJzZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXBhcnNlcnMvbGliL0FXRFBhcnNlclwiKTtcblxuY2xhc3MgQVdEM1ZpZXdlclxue1xuICAvL2VuZ2luZSB2YXJpYWJsZXNcbiAgcHJpdmF0ZSBfdmlldzogVmlldztcbiAgcHJpdmF0ZSBfY2FtZXJhQ29udHJvbGxlcjogSG92ZXJDb250cm9sbGVyO1xuXG4gIHByaXZhdGUgX3Jvb3RUaW1lTGluZTogVGltZUxpbmU7XG5cbiAgcHJpdmF0ZSBfdGltZXI6IFJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgcHJpdmF0ZSBfdGltZTogbnVtYmVyID0gMDtcblxuICAvL25hdmlnYXRpb25cbiAgcHJpdmF0ZSBfbGFzdFBhbkFuZ2xlOiBudW1iZXI7XG4gIHByaXZhdGUgX2xhc3RUaWx0QW5nbGU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbGFzdE1vdXNlWDogbnVtYmVyO1xuICBwcml2YXRlIF9sYXN0TW91c2VZOiBudW1iZXI7XG4gIHByaXZhdGUgX21vdmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHbG9iYWwgaW5pdGlhbGlzZSBmdW5jdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWRcbiAge1xuICAgIHRoaXMuaW5pdEVuZ2luZSgpO1xuICAgIHRoaXMuaW5pdE9iamVjdHMoKTtcbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBlbmdpbmVcbiAgICovXG4gIHByaXZhdGUgaW5pdEVuZ2luZSgpOiB2b2lkXG4gIHtcbiAgICAvL2NyZWF0ZSB0aGUgdmlld1xuICAgIHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhuZXcgRGVmYXVsdFJlbmRlcmVyKCkpO1xuICAgIHRoaXMuX3ZpZXcuYmFja2dyb3VuZENvbG9yID0gMHhmZmZmZmY7XG5cbiAgICAvL2NyZWF0ZSBjdXN0b20gbGVuc1xuICAgIHRoaXMuX3ZpZXcuY2FtZXJhLnByb2plY3Rpb24gPSBuZXcgUGVyc3BlY3RpdmVQcm9qZWN0aW9uKDEyMCk7XG4gICAgdGhpcy5fdmlldy5jYW1lcmEucHJvamVjdGlvbi5mYXIgPSA1MDAwMDA7XG4gICAgdGhpcy5fdmlldy5jYW1lcmEucHJvamVjdGlvbi5uZWFyID0gMC4xO1xuXG4gICAgLy9zZXR1cCBjb250cm9sbGVyIHRvIGJlIHVzZWQgb24gdGhlIGNhbWVyYVxuICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIgPSBuZXcgSG92ZXJDb250cm9sbGVyKHRoaXMuX3ZpZXcuY2FtZXJhLCBudWxsLCAwLCAwLCAzMDAsIDEwLCA5MCk7XG4gICAgdGhpcy5fY2FtZXJhQ29udHJvbGxlci5sb29rQXRQb3NpdGlvbiA9IG5ldyBWZWN0b3IzRCgwLCA1MCwgMCk7XG4gICAgdGhpcy5fY2FtZXJhQ29udHJvbGxlci50aWx0QW5nbGUgPSAwO1xuICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIucGFuQW5nbGUgPSAwO1xuICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIubWluVGlsdEFuZ2xlID0gNTtcbiAgICB0aGlzLl9jYW1lcmFDb250cm9sbGVyLm1heFRpbHRBbmdsZSA9IDYwO1xuICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIuYXV0b1VwZGF0ZSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgdGhlIHNjZW5lIG9iamVjdHNcbiAgICovXG4gIHByaXZhdGUgaW5pdE9iamVjdHMoKTogdm9pZFxuICB7XG4gICAgQXNzZXRMaWJyYXJ5LmVuYWJsZVBhcnNlcihBV0RQYXJzZXIpO1xuXG4gICAgLy9raWNrb2ZmIGFzc2V0IGxvYWRpbmdcbiAgICB2YXIgbG9hZGVyOkxvYWRlciA9IG5ldyBMb2FkZXIoKTtcbiAgICBsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCAoZXZlbnQ6IEFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbXBsZXRlKGV2ZW50KSk7XG4gICAgbG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIChldmVudDogTG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNzb3VyY2VDb21wbGV0ZShldmVudCkpO1xuXG4gICAgLypcbiAgICB2YXIgX2N1YmU6UHJpbWl0aXZlQ3ViZVByZWZhYiA9IG5ldyBQcmltaXRpdmVDdWJlUHJlZmFiKDIwLjAsIDIwLjAsIDIwLjApO1xuICAgIHZhciBuZXdtZXNoMjpNZXNoPTwgTWVzaD5fY3ViZS5nZXROZXdPYmplY3QoKTtcbiAgICAvLyBuZXdtZXNoMi5tYXRlcmlhbD1uZXcgQ29sb3JNYXRlcmlhbCgweGZmMDAwMCwgMS4wKTtcbiAgICAvL25ld21lc2gyLm1hdGVyaWFsLmJvdGhTaWRlcz10cnVlO1xuICAgIHZhciBtYXRUeDpUcmlhbmdsZU1ldGhvZE1hdGVyaWFsID0gbmV3IFRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWwgKDB4RkYwMDAwKTtcbiAgICBtYXRUeC5ib3RoU2lkZXMgPSB0cnVlO1xuICAgIG5ld21lc2gyLm1hdGVyaWFsPW1hdFR4O1xuICAgIHRoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQobmV3bWVzaDIpO1xuICAgIGNvbnNvbGUubG9nKFwiTE9BREVUIEEgR2VvbSBuYW1lID0gXCIpKi87XG4gICAgbG9hZGVyLmxvYWQobmV3IFVSTFJlcXVlc3QoXCJhc3NldHMvdGVzdC5hd2RcIikpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU1RBUlQgTE9BRElOR1wiKTtcbiAgICAvL3RoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQobG9hZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBsaXN0ZW5lcnNcbiAgICovXG4gIHByaXZhdGUgaW5pdExpc3RlbmVycygpOiB2b2lkXG4gIHtcbiAgICB3aW5kb3cub25yZXNpemUgID0gKGV2ZW50KSA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KTtcblxuICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gKGV2ZW50KSA9PiB0aGlzLm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICBkb2N1bWVudC5vbm1vdXNldXAgPSAoZXZlbnQpID0+IHRoaXMub25Nb3VzZVVwKGV2ZW50KTtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IChldmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShldmVudCk7XG4gICAgZG9jdW1lbnQub25tb3VzZXdoZWVsID0gKGV2ZW50KSA9PiB0aGlzLm9uTW91c2VXaGVlbChldmVudCk7XG5cbiAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICB0aGlzLl90aW1lciA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5vbkVudGVyRnJhbWUsIHRoaXMpO1xuICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG4gIH1cblxuICAvKipcbiAgICogbG9hZGVyIGxpc3RlbmVyIGZvciBhc3NldCBjb21wbGV0ZSBldmVudHNcbiAgICovXG4gIHByaXZhdGUgb25Bc3NldENvbXBsZXRlKGV2ZW50OiBBc3NldEV2ZW50KTogdm9pZFxuICB7XG4gICAgaWYoZXZlbnQuYXNzZXQuYXNzZXRUeXBlID09IEFzc2V0VHlwZS5HRU9NRVRSWSkge1xuICAgICAgLy92YXIgbmV3bWVzaDpNZXNoPW5ldyBNZXNoKDxHZW9tZXRyeT5ldmVudC5hc3NldCk7XG4gICAgICAvL3ZhciBtYXRUeDpUcmlhbmdsZU1ldGhvZE1hdGVyaWFsID0gbmV3IFRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWwgKDB4RkYwMDAwKTtcbiAgICAgIC8vbWF0VHguYm90aFNpZGVzPXRydWU7XG4gICAgICAvL25ld21lc2gubWF0ZXJpYWw9bWF0VHg7XG4gICAgICAvLy8gdGhpcy5fdmlldy5zY2VuZS5hZGRDaGlsZChuZXdtZXNoKTtcbiAgICAgIC8vdmFyIF9jdWJlOlByaW1pdGl2ZUN1YmVQcmVmYWIgPSBuZXcgUHJpbWl0aXZlQ3ViZVByZWZhYigyMC4wLCAyMC4wLCAyMC4wKTtcbiAgICAgIC8vdmFyIG5ld21lc2gyOk1lc2g9PCBNZXNoPl9jdWJlLmdldE5ld09iamVjdCgpO1xuICAgICAgLy90aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKG5ld21lc2gyKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJMT0FERVQgQSBHZW9tIG5hbWUgPSBcIik7XG4gICAgfVxuXG4gICAgaWYoZXZlbnQuYXNzZXQuYXNzZXRUeXBlID09IEFzc2V0VHlwZS5USU1FTElORSkge1xuICAgICAgdGhpcy5fcm9vdFRpbWVMaW5lID0gPFRpbWVMaW5lPiBldmVudC5hc3NldDtcbiAgICAgIHRoaXMuX3Jvb3RUaW1lTGluZS5zdGFydCgpOyAvLyB3ZSB3YW50IHRvIHN0YXJ0IGFsbCB0aW1lbGluZXMgZm9yIG5vdy4uLlxuICAgICAgLy90aGlzLl9yb290VGltZUxpbmUuZ290b0FuZFN0b3AoMCk7XG4gICAgICAvL3RoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5fcm9vdFRpbWVMaW5lKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJMT0FERVQgQSBUaW1lTGluZSBuYW1lID0gXCIgKyB0aGlzLl9yb290VGltZUxpbmUubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGxvYWRlciBsaXN0ZW5lciBmb3IgYXNzZXQgY29tcGxldGUgZXZlbnRzXG4gICAqL1xuICBwcml2YXRlIG9uUmVzc291cmNlQ29tcGxldGUoZXZlbnQ6IExvYWRlckV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jvb3RUaW1lTGluZSkge1xuICAgICAgY29uc29sZS5sb2coXCJMT0FESU5HIEEgUk9PVCBuYW1lID0gXCIgKyB0aGlzLl9yb290VGltZUxpbmUubmFtZSArIFwiIGR1cmF0aW9uPVwiICsgdGhpcy5fcm9vdFRpbWVMaW5lLmR1cmF0aW9uKTtcbiAgICAgIHRoaXMuX3Jvb3RUaW1lTGluZS5zdGFydCgpO1xuICAgICAgdGhpcy5fdmlldy5zY2VuZS5hZGRDaGlsZCh0aGlzLl9yb290VGltZUxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgbG9vcFxuICAgKi9cbiAgcHJpdmF0ZSBvbkVudGVyRnJhbWUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3RpbWUgKz0gZHQ7XG5cbiAgICAvL3VwZGF0ZSBjYW1lcmEgY29udHJvbGVyXG4gICAgdGhpcy5fY2FtZXJhQ29udHJvbGxlci51cGRhdGUoKTtcbiAgICBpZiAodGhpcy5fcm9vdFRpbWVMaW5lICE9IHVuZGVmaW5lZCkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlJFTkRFUiA9IFwiKTtcbiAgICAgIHRoaXMuX3Jvb3RUaW1lTGluZS51cGRhdGUoZHQpO1xuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiUkVOREVSID0gXCIpO1xuICAgIC8vdXBkYXRlIHZpZXdcbiAgICB0aGlzLl92aWV3LnJlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlRG93bihldmVudCk6IHZvaWRcbiAge1xuICAgIHRoaXMuX2xhc3RQYW5BbmdsZSA9IHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIucGFuQW5nbGU7XG4gICAgdGhpcy5fbGFzdFRpbHRBbmdsZSA9IHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIudGlsdEFuZ2xlO1xuICAgIHRoaXMuX2xhc3RNb3VzZVggPSBldmVudC5jbGllbnRYO1xuICAgIHRoaXMuX2xhc3RNb3VzZVkgPSBldmVudC5jbGllbnRZO1xuICAgIHRoaXMuX21vdmUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlVXAoZXZlbnQpOiB2b2lkXG4gIHtcbiAgICB0aGlzLl9tb3ZlID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50KVxuICB7XG4gICAgaWYgKHRoaXMuX21vdmUpIHtcbiAgICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIucGFuQW5nbGUgPSAwLjMqKGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0TW91c2VYKSArIHRoaXMuX2xhc3RQYW5BbmdsZTtcbiAgICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIudGlsdEFuZ2xlID0gMC4zKihldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdE1vdXNlWSkgKyB0aGlzLl9sYXN0VGlsdEFuZ2xlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZVdoZWVsKGV2ZW50KTogdm9pZFxuICB7XG4gICAgdGhpcy5fY2FtZXJhQ29udHJvbGxlci5kaXN0YW5jZSAtPSBldmVudC53aGVlbERlbHRhICogNTtcblxuICAgIGlmICh0aGlzLl9jYW1lcmFDb250cm9sbGVyLmRpc3RhbmNlIDwgMTAwKSB7XG4gICAgICB0aGlzLl9jYW1lcmFDb250cm9sbGVyLmRpc3RhbmNlID0gMTAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY2FtZXJhQ29udHJvbGxlci5kaXN0YW5jZSA+IDIwMDApIHtcbiAgICAgIHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIuZGlzdGFuY2UgPSAyMDAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25SZXNpemUoZXZlbnQgPSBudWxsKTogdm9pZFxuICB7XG4gICAgdGhpcy5fdmlldy55ICAgICAgICAgPSAwO1xuICAgIHRoaXMuX3ZpZXcueCAgICAgICAgID0gMDtcbiAgICB0aGlzLl92aWV3LndpZHRoICAgICA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuX3ZpZXcuaGVpZ2h0ICAgID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbn1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0bmV3IEFXRDNWaWV3ZXIoKTtcbn07XG4iXX0=