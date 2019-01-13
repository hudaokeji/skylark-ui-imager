/**
 * skylark-ui-imager - The skylark imager widget
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-imager/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/noder","skylark-utils/images","skylark-utils/query","skylark-utils-canvas2d","../Imager"],function(t,i,e,s,o,h){"use strict";function n(t){return{height:Math.abs(t.getWidth()*Math.sin(t.getAngle()*Math.PI/180))+Math.abs(t.getHeight()*Math.cos(t.getAngle()*Math.PI/180)),width:Math.abs(t.getHeight()*Math.sin(t.getAngle()*Math.PI/180))+Math.abs(t.getWidth()*Math.cos(t.getAngle()*Math.PI/180))}}var a=h.Transformation.inherit({applyTransformation:function(t,i,s){var h=new Image,a=n(i),r=a.width,c=a.height,g=this.options.left*r,l=this.options.top*c,p=Math.min(this.options.width*r,r-g),d=Math.min(this.options.height*c,c-l);h.src=t.toDataURL({left:g,top:l,width:p,height:d}),e.loaded(h).then(function(){if(!(a<1||n<1)){var e=new o.Image(h,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1}),n=h.width,a=h.height;t.setWidth(n),t.setHeight(a),i.remove(),t.add(e),s(e)}})}}),r=o.util.createClass(o.Rect,{_render:function(t){this.callSuper("_render",t);var i=(t.canvas,7),e=this.flipX?-1:1,s=this.flipY?-1:1,o=e/this.scaleX,h=s/this.scaleY;t.scale(o,h),t.fillStyle="rgba(0, 0, 0, 0.5)",this._renderOverlay(t),void 0!==t.setLineDash?t.setLineDash([i,i]):void 0!==t.mozDash&&(t.mozDash=[i,i]),t.strokeStyle="rgba(0, 0, 0, 0.2)",this._renderBorders(t),this._renderGrid(t),t.lineDashOffset=i,t.strokeStyle="rgba(255, 255, 255, 0.4)",this._renderBorders(t),this._renderGrid(t),t.scale(1/o,1/h)},_renderOverlay:function(t){var i=t.canvas,e=Math.ceil(-this.getWidth()/2-this.getLeft()),s=Math.ceil(-this.getWidth()/2),o=Math.ceil(this.getWidth()/2),h=Math.ceil(this.getWidth()/2+(i.width-this.getWidth()-this.getLeft())),n=Math.ceil(-this.getHeight()/2-this.getTop()),a=Math.ceil(-this.getHeight()/2),r=Math.ceil(this.getHeight()/2),c=Math.ceil(this.getHeight()/2+(i.height-this.getHeight()-this.getTop()));t.beginPath(),t.moveTo(e-1,n-1),t.lineTo(h+1,n-1),t.lineTo(h+1,c+1),t.lineTo(e-1,c-1),t.lineTo(e-1,n-1),t.closePath(),t.moveTo(s,a),t.lineTo(s,r),t.lineTo(o,r),t.lineTo(o,a),t.lineTo(s,a),t.closePath(),t.fill()},_renderBorders:function(t){t.beginPath(),t.moveTo(-this.getWidth()/2,-this.getHeight()/2),t.lineTo(this.getWidth()/2,-this.getHeight()/2),t.lineTo(this.getWidth()/2,this.getHeight()/2),t.lineTo(-this.getWidth()/2,this.getHeight()/2),t.lineTo(-this.getWidth()/2,-this.getHeight()/2),t.stroke()},_renderGrid:function(t){}}),c=h.Plugin.inherit({startX:null,startY:null,isKeyCroping:!1,isKeyLeft:!1,isKeyUp:!1,defaults:{minHeight:1,minWidth:1,ratio:null,quickCropKey:!1},init:function(t,i){this.overrided(t,i);var e=this.imager.toolbar.createButtonGroup();this.cropButton=e.createButton({image:"crop"}),this.okButton=e.createButton({image:"done",type:"success",hide:!0}),this.cancelButton=e.createButton({image:"close",type:"danger",hide:!0}),this.cropButton.addEventListener("click",this.toggleCrop.bind(this)),this.okButton.addEventListener("click",this.cropCurrentZone.bind(this)),this.cancelButton.addEventListener("click",this.releaseFocus.bind(this)),this.imager.canvas.on("mouse:down",this.onMouseDown.bind(this)),this.imager.canvas.on("mouse:move",this.onMouseMove.bind(this)),this.imager.canvas.on("mouse:up",this.onMouseUp.bind(this)),this.imager.canvas.on("object:moving",this.onObjectMoving.bind(this)),this.imager.canvas.on("object:scaling",this.onObjectScaling.bind(this)),o.util.addListener(document,"keydown",this.onKeyDown.bind(this)),o.util.addListener(document,"keyup",this.onKeyUp.bind(this)),this.imager.addEventListener("core:transformation",this.releaseFocus.bind(this))},onObjectMoving:function(t){if(this.hasFocus()){var i=t.target;if(i===this.cropZone){var e=this.imager.canvas,s=i.getLeft(),o=i.getTop(),h=i.getWidth(),n=i.getHeight(),a=e.getWidth()-h,r=e.getHeight()-n;s<0&&i.set("left",0),o<0&&i.set("top",0),s>a&&i.set("left",a),o>r&&i.set("top",r),this.imager.dispatchEvent("crop:update")}}},onObjectScaling:function(t){if(this.hasFocus()){var i=!1,e=t.target;if(e===this.cropZone){var s=this.imager.canvas,o=s.getPointer(t.e),h=(o.x,o.y,e.getLeft()),n=e.getTop(),a=e.getLeft()+e.getWidth(),r=e.getTop()+e.getHeight();if(null!==this.options.ratio&&(h<0||a>s.getWidth()||n<0||r>s.getHeight())&&(i=!0),h<0||a>s.getWidth()||i){var c=this.lastScaleX||1;e.setScaleX(c)}if(h<0&&e.setLeft(0),n<0||r>s.getHeight()||i){var g=this.lastScaleY||1;e.setScaleY(g)}n<0&&e.setTop(0),e.getWidth()<this.options.minWidth&&e.scaleToWidth(this.options.minWidth),e.getHeight()<this.options.minHeight&&e.scaleToHeight(this.options.minHeight),this.lastScaleX=e.getScaleX(),this.lastScaleY=e.getScaleY(),this.imager.dispatchEvent("crop:update")}}},onMouseDown:function(t){if(this.hasFocus()){var i=this.imager.canvas;i.calcOffset();var e=i.getPointer(t.e),s=e.x,h=e.y,n=new o.Point(s,h),a=i.getActiveObject();a===this.cropZone||this.cropZone.containsPoint(n)||(i.discardActiveObject(),this.cropZone.setWidth(0),this.cropZone.setHeight(0),this.cropZone.setScaleX(1),this.cropZone.setScaleY(1),this.startX=s,this.startY=h)}},onMouseMove:function(t){if(this.isKeyCroping)return this.onMouseMoveKeyCrop(t);if(null!==this.startX&&null!==this.startY){var i=this.imager.canvas,e=i.getPointer(t.e),s=e.x,o=e.y;this._renderCropZone(this.startX,this.startY,s,o)}},onMouseMoveKeyCrop:function(t){var i=this.imager.canvas,e=this.cropZone,s=i.getPointer(t.e),o=s.x,h=s.y;e.left&&e.top||(e.setTop(h),e.setLeft(o)),this.isKeyLeft=o<e.left+e.width/2,this.isKeyUp=h<e.top+e.height/2,this._renderCropZone(Math.min(e.left,o),Math.min(e.top,h),Math.max(e.left+e.width,o),Math.max(e.top+e.height,h))},onMouseUp:function(t){if(null!==this.startX&&null!==this.startY){var i=this.imager.canvas;this.cropZone.setCoords(),i.setActiveObject(this.cropZone),i.calcOffset(),this.startX=null,this.startY=null}},onKeyDown:function(t){!1===this.options.quickCropKey||t.keyCode!==this.options.quickCropKey||this.isKeyCroping||(this.isKeyCroping=!0,this.imager.canvas.discardActiveObject(),this.cropZone.setWidth(0),this.cropZone.setHeight(0),this.cropZone.setScaleX(1),this.cropZone.setScaleY(1),this.cropZone.setTop(0),this.cropZone.setLeft(0))},onKeyUp:function(t){!1!==this.options.quickCropKey&&t.keyCode===this.options.quickCropKey&&this.isKeyCroping&&(this.isKeyCroping=!1,this.startX=1,this.startY=1,this.onMouseUp())},selectZone:function(t,i,e,s,o){this.hasFocus()||this.requireFocus(),o?this.cropZone.set({left:t,top:i,width:e,height:s}):this._renderCropZone(t,i,t+e,i+s);var h=this.imager.canvas;h.bringToFront(this.cropZone),this.cropZone.setCoords(),h.setActiveObject(this.cropZone),h.calcOffset(),this.imager.dispatchEvent("crop:update")},toggleCrop:function(){this.hasFocus()?this.releaseFocus():this.requireFocus()},cropCurrentZone:function(){if(this.hasFocus()&&!(this.cropZone.width<1&&this.cropZone.height<1)){var t=this.imager.image,i=this.cropZone.getTop()-t.getTop(),e=this.cropZone.getLeft()-t.getLeft(),s=this.cropZone.getWidth(),o=this.cropZone.getHeight();i<0&&(o+=i,i=0),e<0&&(s+=e,e=0),this.imager.applyTransformation(new a({top:i/t.getHeight(),left:e/t.getWidth(),width:s/t.getWidth(),height:o/t.getHeight()}))}},hasFocus:function(){return void 0!==this.cropZone},requireFocus:function(){this.cropZone=new r({fill:"transparent",hasBorders:!1,originX:"left",originY:"top",cornerColor:"#444",cornerSize:8,transparentCorners:!1,lockRotation:!0,hasRotatingPoint:!1}),null!==this.options.ratio&&this.cropZone.set("lockUniScaling",!0),this.imager.canvas.add(this.cropZone),this.imager.canvas.defaultCursor="crosshair",this.cropButton.active(!0),this.okButton.hide(!1),this.cancelButton.hide(!1)},releaseFocus:function(){void 0!==this.cropZone&&(this.cropZone.remove(),this.cropZone=void 0,this.cropButton.active(!1),this.okButton.hide(!0),this.cancelButton.hide(!0),this.imager.canvas.defaultCursor="default",this.imager.dispatchEvent("crop:update"))},_renderCropZone:function(t,i,e,s){var o=this.imager.canvas,h=e>t,n=!h,a=s>i,r=!a,c=Math.min(+this.options.minWidth,o.getWidth()),g=Math.min(+this.options.minHeight,o.getHeight()),l=Math.min(t,e),p=Math.max(t,e),d=Math.min(i,s),u=Math.max(i,s);l=Math.max(0,l),p=Math.min(o.getWidth(),p),d=Math.max(0,d),u=Math.min(o.getHeight(),u),p-l<c&&(h?p=l+c:l=p-c),u-d<g&&(a?u=d+g:d=u-g),l<0&&(p+=Math.abs(l),l=0),p>o.getWidth()&&(l-=p-o.getWidth(),p=o.getWidth()),d<0&&(u+=Math.abs(d),d=0),u>o.getHeight()&&(d-=u-o.getHeight(),u=o.getHeight());var f=p-l,v=u-d,m=f/v;if(this.options.ratio&&+this.options.ratio!==m){var M=+this.options.ratio;if(this.isKeyCroping&&(n=this.isKeyLeft,r=this.isKeyUp),m<M){var y=v*M;n&&(l-=y-f),f=y}else if(m>M){var Z=v/(M*v/f);r&&(d-=Z-v),v=Z}if(l<0&&(l=0),d<0&&(d=0),l+f>o.getWidth()){var y=o.getWidth()-l;v=y*v/f,f=y,r&&(d=i-v)}if(d+v>o.getHeight()){var Z=o.getHeight()-d;f=f*Z/v,v=Z,n&&(l=t-f)}}this.cropZone.left=l,this.cropZone.top=d,this.cropZone.width=f,this.cropZone.height=v,this.imager.canvas.bringToFront(this.cropZone),this.imager.dispatchEvent("crop:update")}}),g={name:"crop",ctor:c};return h.installPlugin(g),g});
//# sourceMappingURL=../sourcemaps/plugins/crop.js.map
