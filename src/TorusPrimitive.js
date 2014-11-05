var AwayEvent = require("awayjs-core/lib/events/Event");
var URLLoader = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat = require("awayjs-core/lib/net/URLLoaderDataFormat");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var ParserUtils = require("awayjs-core/lib/parsers/ParserUtils");
var ImageTexture = require("awayjs-core/lib/textures/ImageTexture");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
var PrimitiveTorusPrefab = require("awayjs-display/lib/prefabs/PrimitiveTorusPrefab");
var StaticLightPicker = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var TriangleMethodMaterial = require("awayjs-methodmaterials/lib/TriangleMethodMaterial");
var TorusPrimitive = (function () {
    function TorusPrimitive() {
        var _this = this;
        this.initView();
        this._raf = new RequestAnimationFrame(this.render, this);
        this._raf.start();
        this.loadResources();
        window.onresize = function (event) { return _this.onResize(event); };
        this.onResize();
    }
    /**
     *
     */
    TorusPrimitive.prototype.initView = function () {
        this._view = new View(new DefaultRenderer()); // Create the Away3D View
        this._view.backgroundColor = 0x000000; // Change the background color to black
    };
    /**
     *
     */
    TorusPrimitive.prototype.loadResources = function () {
        var _this = this;
        var imgLoader = new URLLoader();
        imgLoader.dataFormat = URLLoaderDataFormat.BLOB;
        imgLoader.addEventListener(AwayEvent.COMPLETE, function (event) { return _this.urlCompleteHandler(event); });
        imgLoader.load(new URLRequest("assets/dots.png"));
    };
    /**
     *
     * @param event
     */
    TorusPrimitive.prototype.urlCompleteHandler = function (event) {
        var _this = this;
        this._image = ParserUtils.blobToImage(event.target.data);
        this._image.onload = function (event) { return _this.imageCompleteHandler(event); };
    };
    /**
     *
     */
    TorusPrimitive.prototype.initLights = function () {
        this._light = new DirectionalLight();
        this._light.diffuse = .7;
        this._light.specular = 1;
        this._view.scene.addChild(this._light);
        this._lightPicker = new StaticLightPicker([this._light]);
    };
    /**
     *
     */
    TorusPrimitive.prototype.initMaterial = function (image) {
        this._texture = new ImageTexture(image, false);
        this._material = new TriangleMethodMaterial(this._texture, true, true, false);
        this._material.lightPicker = this._lightPicker;
    };
    /**
     *
     */
    TorusPrimitive.prototype.initTorus = function () {
        this._torus = new PrimitiveTorusPrefab(220, 80, 32, 16, false);
        this._mesh = this._torus.getNewObject();
        this._mesh.material = this._material;
        this._view.scene.addChild(this._mesh);
    };
    /**
     *
     */
    TorusPrimitive.prototype.imageCompleteHandler = function (event) {
        this.initLights();
        this.initMaterial(event.target);
        this.initTorus();
    };
    /**
     *
     */
    TorusPrimitive.prototype.render = function (dt) {
        if (dt === void 0) { dt = null; }
        if (this._mesh)
            this._mesh.rotationY += 1;
        this._view.render();
    };
    /**
     *
     */
    TorusPrimitive.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    return TorusPrimitive;
})();
window.onload = function () {
    new TorusPrimitive();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9Ub3J1c1ByaW1pdGl2ZS50cyJdLCJuYW1lcyI6WyJUb3J1c1ByaW1pdGl2ZSIsIlRvcnVzUHJpbWl0aXZlLmNvbnN0cnVjdG9yIiwiVG9ydXNQcmltaXRpdmUuaW5pdFZpZXciLCJUb3J1c1ByaW1pdGl2ZS5sb2FkUmVzb3VyY2VzIiwiVG9ydXNQcmltaXRpdmUudXJsQ29tcGxldGVIYW5kbGVyIiwiVG9ydXNQcmltaXRpdmUuaW5pdExpZ2h0cyIsIlRvcnVzUHJpbWl0aXZlLmluaXRNYXRlcmlhbCIsIlRvcnVzUHJpbWl0aXZlLmluaXRUb3J1cyIsIlRvcnVzUHJpbWl0aXZlLmltYWdlQ29tcGxldGVIYW5kbGVyIiwiVG9ydXNQcmltaXRpdmUucmVuZGVyIiwiVG9ydXNQcmltaXRpdmUub25SZXNpemUiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sU0FBUyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFJL0QsSUFBTyxTQUFTLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLG1CQUFtQixXQUFhLHlDQUF5QyxDQUFDLENBQUM7QUFDbEYsSUFBTyxVQUFVLFdBQWUsZ0NBQWdDLENBQUMsQ0FBQztBQUNsRSxJQUFPLFdBQVcsV0FBZSxxQ0FBcUMsQ0FBQyxDQUFDO0FBRXhFLElBQU8sWUFBWSxXQUFlLHVDQUF1QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxxQkFBcUIsV0FBWSw2Q0FBNkMsQ0FBQyxDQUFDO0FBRXZGLElBQU8sSUFBSSxXQUFpQixvQ0FBb0MsQ0FBQyxDQUFDO0FBQ2xFLElBQU8sZ0JBQWdCLFdBQWMsOENBQThDLENBQUMsQ0FBQztBQUdyRixJQUFPLG9CQUFvQixXQUFhLGlEQUFpRCxDQUFDLENBQUM7QUFDM0YsSUFBTyxpQkFBaUIsV0FBYSw2REFBNkQsQ0FBQyxDQUFDO0FBRXBHLElBQU8sZUFBZSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFFN0UsSUFBTyxzQkFBc0IsV0FBWSxtREFBbUQsQ0FBQyxDQUFDO0FBRTlGLElBQU0s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Q0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDZEEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFM0JBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVEVDs7T0FFR0E7SUFDSUEsaUNBQVFBLEdBQWZBLFVBQWdCQSxLQUFvQkE7UUFBcEJVLHFCQUFvQkEsR0FBcEJBLFlBQW9CQTtRQUVuQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBQ0ZWLHFCQUFDQTtBQUFEQSxDQTNIQSxBQTJIQ0EsSUFBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFFZixJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLENBQUMsQ0FBQSIsImZpbGUiOiJUb3J1c1ByaW1pdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBd2F5RXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcbmltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiKTtcbmltcG9ydCBVUkxMb2FkZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJcIik7XG5pbXBvcnQgVVJMTG9hZGVyRGF0YUZvcm1hdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMTG9hZGVyRGF0YUZvcm1hdFwiKTtcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdFwiKTtcbmltcG9ydCBQYXJzZXJVdGlsc1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJVdGlsc1wiKTtcbmltcG9ydCBQZXJzcGVjdGl2ZVByb2plY3Rpb25cdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3Byb2plY3Rpb25zL1BlcnNwZWN0aXZlUHJvamVjdGlvblwiKTtcbmltcG9ydCBJbWFnZVRleHR1cmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0ltYWdlVGV4dHVyZVwiKTtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcblxuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgRGlyZWN0aW9uYWxMaWdodFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0RpcmVjdGlvbmFsTGlnaHRcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgU2t5Ym94XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1NreWJveFwiKTtcbmltcG9ydCBQcmltaXRpdmVUb3J1c1ByZWZhYlx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVRvcnVzUHJlZmFiXCIpO1xuaW1wb3J0IFN0YXRpY0xpZ2h0UGlja2VyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9saWdodHBpY2tlcnMvU3RhdGljTGlnaHRQaWNrZXJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9EZWZhdWx0UmVuZGVyZXJcIik7XG5cbmltcG9ydCBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsXHRcdD0gcmVxdWlyZShcImF3YXlqcy1tZXRob2RtYXRlcmlhbHMvbGliL1RyaWFuZ2xlTWV0aG9kTWF0ZXJpYWxcIik7XG5cbmNsYXNzIFRvcnVzUHJpbWl0aXZlXG57XG5cdHByaXZhdGUgX3ZpZXc6Vmlldztcblx0cHJpdmF0ZSBfdG9ydXM6UHJpbWl0aXZlVG9ydXNQcmVmYWI7XG5cdHByaXZhdGUgX21lc2g6TWVzaDtcblx0cHJpdmF0ZSBfcmFmOlJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0cHJpdmF0ZSBfaW1hZ2U6SFRNTEltYWdlRWxlbWVudDtcblx0cHJpdmF0ZSBfdGV4dHVyZTpJbWFnZVRleHR1cmU7XG5cdHByaXZhdGUgX21hdGVyaWFsOlRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWw7XG5cdHByaXZhdGUgX2xpZ2h0OkRpcmVjdGlvbmFsTGlnaHQ7XG5cdHByaXZhdGUgX2xpZ2h0UGlja2VyOlN0YXRpY0xpZ2h0UGlja2VyO1xuXG5cdGNvbnN0cnVjdG9yICgpXG5cdHtcblx0XHR0aGlzLmluaXRWaWV3KCk7XG5cblx0XHR0aGlzLl9yYWYgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLCB0aGlzKTtcblx0XHR0aGlzLl9yYWYuc3RhcnQoKTtcblxuXHRcdHRoaXMubG9hZFJlc291cmNlcygpO1xuXHRcdHdpbmRvdy5vbnJlc2l6ZSA9IChldmVudDpVSUV2ZW50KSA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KTtcblxuXHRcdHRoaXMub25SZXNpemUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHJpdmF0ZSBpbml0VmlldygpXG5cdHtcblx0XHR0aGlzLl92aWV3ID0gbmV3IFZpZXcobmV3IERlZmF1bHRSZW5kZXJlcigpKTsvLyBDcmVhdGUgdGhlIEF3YXkzRCBWaWV3XG5cdFx0dGhpcy5fdmlldy5iYWNrZ3JvdW5kQ29sb3IgPSAweDAwMDAwMDsvLyBDaGFuZ2UgdGhlIGJhY2tncm91bmQgY29sb3IgdG8gYmxhY2tcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHJpdmF0ZSBsb2FkUmVzb3VyY2VzKClcblx0e1xuXHRcdHZhciBpbWdMb2FkZXI6VVJMTG9hZGVyID0gbmV3IFVSTExvYWRlcigpO1xuXHRcdGltZ0xvYWRlci5kYXRhRm9ybWF0ID0gVVJMTG9hZGVyRGF0YUZvcm1hdC5CTE9CO1xuXHRcdGltZ0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEF3YXlFdmVudC5DT01QTEVURSwgKGV2ZW50OkF3YXlFdmVudCkgPT4gdGhpcy51cmxDb21wbGV0ZUhhbmRsZXIoZXZlbnQpKTtcblx0XHRpbWdMb2FkZXIubG9hZChuZXcgVVJMUmVxdWVzdChcImFzc2V0cy9kb3RzLnBuZ1wiKSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGV2ZW50XG5cdCAqL1xuXHRwcml2YXRlIHVybENvbXBsZXRlSGFuZGxlciAoZXZlbnQ6QXdheUV2ZW50KVxuXHR7XG5cdFx0dGhpcy5faW1hZ2UgPSBQYXJzZXJVdGlscy5ibG9iVG9JbWFnZSgoPFVSTExvYWRlcj4gZXZlbnQudGFyZ2V0KS5kYXRhKTtcblx0XHR0aGlzLl9pbWFnZS5vbmxvYWQgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMuaW1hZ2VDb21wbGV0ZUhhbmRsZXIoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwcml2YXRlIGluaXRMaWdodHMoKVxuXHR7XG5cdFx0dGhpcy5fbGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgpO1xuXHRcdHRoaXMuX2xpZ2h0LmRpZmZ1c2UgPSAuNztcblx0XHR0aGlzLl9saWdodC5zcGVjdWxhciA9IDE7XG5cdFx0dGhpcy5fdmlldy5zY2VuZS5hZGRDaGlsZCh0aGlzLl9saWdodCk7XG5cblx0XHR0aGlzLl9saWdodFBpY2tlciA9IG5ldyBTdGF0aWNMaWdodFBpY2tlcihbdGhpcy5fbGlnaHRdKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHJpdmF0ZSBpbml0TWF0ZXJpYWwoaW1hZ2U6SFRNTEltYWdlRWxlbWVudClcblx0e1xuXHRcdHRoaXMuX3RleHR1cmUgPSBuZXcgSW1hZ2VUZXh0dXJlKGltYWdlLCBmYWxzZSk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbCA9IG5ldyBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsICh0aGlzLl90ZXh0dXJlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG5cdFx0dGhpcy5fbWF0ZXJpYWwubGlnaHRQaWNrZXIgPSB0aGlzLl9saWdodFBpY2tlcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHJpdmF0ZSBpbml0VG9ydXMoKVxuXHR7XG5cdFx0dGhpcy5fdG9ydXMgPSBuZXcgUHJpbWl0aXZlVG9ydXNQcmVmYWIoMjIwLCA4MCwgMzIsIDE2LCBmYWxzZSk7XG5cblx0XHR0aGlzLl9tZXNoID0gPE1lc2g+IHRoaXMuX3RvcnVzLmdldE5ld09iamVjdCgpO1xuXHRcdHRoaXMuX21lc2gubWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbDtcblxuXHRcdHRoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5fbWVzaCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHByaXZhdGUgaW1hZ2VDb21wbGV0ZUhhbmRsZXIoZXZlbnQ6RXZlbnQpXG5cdHtcblx0XHR0aGlzLmluaXRMaWdodHMgKCk7XG5cdFx0dGhpcy5pbml0TWF0ZXJpYWwoPEhUTUxJbWFnZUVsZW1lbnQ+IGV2ZW50LnRhcmdldCk7XG5cdFx0dGhpcy5pbml0VG9ydXMgKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyByZW5kZXIoZHQ6bnVtYmVyID0gbnVsbClcblx0e1xuXHRcdGlmICh0aGlzLl9tZXNoKVxuXHRcdFx0dGhpcy5fbWVzaC5yb3RhdGlvblkgKz0gMTtcblxuXHRcdHRoaXMuX3ZpZXcucmVuZGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBvblJlc2l6ZShldmVudDpVSUV2ZW50ID0gbnVsbClcblx0e1xuXHRcdHRoaXMuX3ZpZXcueSA9IDA7XG5cdFx0dGhpcy5fdmlldy54ID0gMDtcblx0XHR0aGlzLl92aWV3LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5fdmlldy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cbn1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKClcbntcblx0bmV3IFRvcnVzUHJpbWl0aXZlKCk7XG59Il19