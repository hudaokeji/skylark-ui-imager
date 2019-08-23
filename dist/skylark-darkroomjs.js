/**
 * skylark-darkroomjs - A version of darkroomjs that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-darkroomjs/
 * @license MIT
 */
!function(t,i){var e=i.define,n=i.require,s="function"==typeof e&&e.amd,o=!s&&"undefined"!=typeof exports;if(!s&&!e){var a={};e=i.define=function(t,i,e){"function"==typeof e?(a[t]={factory:e,deps:i.map(function(i){return function(t,i){if("."!==t[0])return t;var e=i.split("/"),n=t.split("/");e.pop();for(var s=0;s<n.length;s++)"."!=n[s]&&(".."==n[s]?e.pop():e.push(n[s]));return e.join("/")}(i,t)}),resolved:!1,exports:null},n(t)):a[t]={factory:null,resolved:!0,exports:e}},n=i.require=function(t){if(!a.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var e=a[t];if(!e.resolved){var s=[];e.deps.forEach(function(t){s.push(n(t))}),e.exports=e.factory.apply(i,s)||null,e.resolved=!0}return e.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,i){t("skylark-darkroomjs/Imager",["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/finder","skylark-ui-swt/Widget","skylark-graphics-canvas2d"],function(t,i,e,n,s,o){"use strict";var a={};function r(t){return{height:Math.abs(t.getWidth()*Math.sin(t.getAngle()*Math.PI/180))+Math.abs(t.getHeight()*Math.cos(t.getAngle()*Math.PI/180)),width:Math.abs(t.getHeight()*Math.sin(t.getAngle()*Math.PI/180))+Math.abs(t.getWidth()*Math.cos(t.getAngle()*Math.PI/180))}}function h(t){this.element=t}function c(t){this.element=t}function l(t){this.element=t}h.prototype={createButtonGroup:function(t){var i=document.createElement("div");return i.className="darkroom-button-group",this.element.appendChild(i),new c(i)}},c.prototype={createButton:function(t){t=i.mixin({},{image:"help",type:"default",group:"default",hide:!1,disabled:!1},t);var e=document.createElement("button");e.type="button",e.className="darkroom-button darkroom-button-"+t.type,e.innerHTML='<svg class="darkroom-icon"><use xlink:href="#'+t.image+'" /></svg>',this.element.appendChild(e);var n=new l(e);return n.hide(t.hide),n.disable(t.disabled),n}},l.prototype={addEventListener:function(t,i){this.element.addEventListener?this.element.addEventListener(t,i):this.element.attachEvent&&this.element.attachEvent("on"+t,i)},removeEventListener:function(t,i){this.element.removeEventListener&&this.element.removeEventListener(t,i)},active:function(t){t?this.element.classList.add("darkroom-button-active"):this.element.classList.remove("darkroom-button-active")},hide:function(t){t?this.element.classList.add("darkroom-button-hidden"):this.element.classList.remove("darkroom-button-hidden")},disable:function(t){this.element.disabled=!!t}};var d=s.inherit({klassName:"Imager",_construct:function(t,i,e){"string"==typeof t&&(t=n.find(t)),this._initializeDOM(t),this.overrided(this.containerElement,i),this.plugins={},this._initializeImage(),this._initializePlugins(),this.refresh(function(){this.options.initialize.bind(this).call()}.bind(this))},containerElement:null,canvas:null,image:null,sourceCanvas:null,sourceImage:null,originalImageElement:null,transformations:[],options:{minWidth:null,minHeight:null,maxWidth:null,maxHeight:null,ratio:null,backgroundColor:"#fff",plugins:{},initialize:function(){}},selfDestroy:function(){var t=this.containerElement,i=new Image;i.onload=function(){t.parentNode.replaceChild(i,t)},i.src=this.sourceImage.toDataURL()},addEventListener:function(t,i){var e=this.canvas.getElement();e.addEventListener?e.addEventListener(t,i):e.attachEvent&&e.attachEvent("on"+t,i)},dispatchEvent:function(t){var i=document.createEvent("Event");i.initEvent(t,!0,!0),this.canvas.getElement().dispatchEvent(i)},refresh:function(t){var i=new Image;i.onload=function(){this._replaceCurrentImage(new o.Image(i)),t&&t()}.bind(this),i.src=this.sourceImage.toDataURL()},_replaceCurrentImage:function(t){this.image&&this.image.remove(),this.image=t,this.image.selectable=!1;var i=r(this.image),e=i.width,n=i.height;if(null!==this.options.ratio){var s=+this.options.ratio,o=e/n;o>s?n=e/s:o<s&&(e=n*s)}var a=1,h=1,c=1;null!==this.options.maxWidth&&this.options.maxWidth<e&&(h=this.options.maxWidth/e),null!==this.options.maxHeight&&this.options.maxHeight<n&&(c=this.options.maxHeight/n),a=Math.min(h,c),h=1,c=1,null!==this.options.minWidth&&this.options.minWidth>e&&(h=this.options.minWidth/e),null!==this.options.minHeight&&this.options.minHeight>n&&(c=this.options.minHeight/n);var l=Math.max(h,c)*a;e*=l,n*=l,this.image.setScaleX(1*l),this.image.setScaleY(1*l),this.canvas.add(this.image),this.canvas.setWidth(e),this.canvas.setHeight(n),this.canvas.centerObject(this.image),this.image.setCoords()},applyTransformation:function(t){this.transformations.push(t),t.applyTransformation(this.sourceCanvas,this.sourceImage,this._postTransformation.bind(this))},_postTransformation:function(t){t&&(this.sourceImage=t),this.refresh(function(){this.dispatchEvent("core:transformation")}.bind(this))},reinitializeImage:function(){this.sourceImage.remove(),this._initializeImage(),this._popTransformation(this.transformations.slice())},_popTransformation:function(t){if(0===t.length)return this.dispatchEvent("core:reinitialized"),void this.refresh();var i=t.shift();i.applyTransformation(this.sourceCanvas,this.sourceImage,function(i){i&&(this.sourceImage=i);this._popTransformation(t)}.bind(this))},_initializeDOM:function(t){var i=document.createElement("div");i.className="darkroom-container";var e=document.createElement("div");e.className="darkroom-toolbar",i.appendChild(e);var n=document.createElement("div");n.className="darkroom-image-container";var s=this.canvasElement=document.createElement("canvas");n.appendChild(s),i.appendChild(n);var o=document.createElement("div");o.className="darkroom-source-container",o.style.display="none";var a=this.sourceCanvasElement=document.createElement("canvas");o.appendChild(a),i.appendChild(o),t.parentNode.replaceChild(i,t),t.style.display="none",i.appendChild(t),this.containerElement=i,this.originalImageElement=t,this.toolbar=new h(e)},_initializeImage:function(){this.canvas=new o.Canvas(this.canvasElement,{selection:!1,backgroundColor:this.options.backgroundColor}),this.sourceCanvas=new o.Canvas(this.sourceCanvasElement,{selection:!1,backgroundColor:this.options.backgroundColor}),this.sourceImage=new o.Image(this.originalImageElement,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1}),this.sourceCanvas.add(this.sourceImage);var t=r(this.sourceImage),i=t.width,e=t.height;this.sourceCanvas.setWidth(i),this.sourceCanvas.setHeight(e),this.sourceCanvas.centerObject(this.sourceImage),this.sourceImage.setCoords()},_initializePlugins:function(){for(var t in a){var i=a[t],e=this.options.plugins[t];!1!==e&&(a.hasOwnProperty(t)&&(this.plugins[t]=new i.ctor(this,e)))}}});return d.Plugin=i.Evented.inherit({klassName:"Plugin",defaults:{},init:function(t,e){this.imager=t,this.options=i.mixin({},this.defaults,e)}}),d.Transformation=i.Evented.inherit({klassName:"Transformation",init:function(t){this.options=t}}),d.installPlugin=function(t){a[t.name]=t},t.attach("itg.darkroomjs.Imager",d)}),t("skylark-darkroomjs/plugins/history",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","skylark-graphics-canvas2d","../Imager"],function(t,i,e,n,s){"use strict";var o=s.Plugin.inherit({undoTransformations:null,init:function(t,i){this.overrided(t,i),this.undoTransformations=[],this._initButtons(),this.imager.addEventListener("core:transformation",this._onTranformationApplied.bind(this))},undo:function(){if(0!==this.imager.transformations.length){var t=this.imager.transformations.pop();this.undoTransformations.unshift(t),this.imager.reinitializeImage(),this._updateButtons()}},redo:function(){if(0!==this.undoTransformations.length){var t=this.undoTransformations.shift();this.imager.transformations.push(t),this.imager.reinitializeImage(),this._updateButtons()}},_initButtons:function(){var t=this.imager.toolbar.createButtonGroup();return this.backButton=t.createButton({image:"undo",disabled:!0}),this.forwardButton=t.createButton({image:"redo",disabled:!0}),this.backButton.addEventListener("click",this.undo.bind(this)),this.forwardButton.addEventListener("click",this.redo.bind(this)),this},_updateButtons:function(){this.backButton.disable(0===this.imager.transformations.length),this.forwardButton.disable(0===this.undoTransformations.length)},_onTranformationApplied:function(){this.undoTransformations=[],this._updateButtons()}}),a={name:"history",ctor:o};return s.installPlugin(a),a}),t("skylark-darkroomjs/plugins/crop",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/images","skylark-utils-dom/query","skylark-graphics-canvas2d","../Imager"],function(t,i,e,n,s,o){"use strict";var a=o.Transformation.inherit({applyTransformation:function(t,i,n){var o=new Image,a=function(t){return{height:Math.abs(t.getWidth()*Math.sin(t.getAngle()*Math.PI/180))+Math.abs(t.getHeight()*Math.cos(t.getAngle()*Math.PI/180)),width:Math.abs(t.getHeight()*Math.sin(t.getAngle()*Math.PI/180))+Math.abs(t.getWidth()*Math.cos(t.getAngle()*Math.PI/180))}}(i),r=a.width,h=a.height,c=this.options.left*r,l=this.options.top*h,d=Math.min(this.options.width*r,r-c),g=Math.min(this.options.height*h,h-l);o.src=t.toDataURL({left:c,top:l,width:d,height:g}),e.loaded(o).then(function(){if(!(r<1||a<1)){var e=new s.Image(o,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1}),a=o.width,r=o.height;t.setWidth(a),t.setHeight(r),i.remove(),t.add(e),n(e)}})}}),r=s.util.createClass(s.Rect,{_render:function(t){this.callSuper("_render",t);t.canvas;var i=this.flipX?-1:1,e=this.flipY?-1:1,n=i/this.scaleX,s=e/this.scaleY;t.scale(n,s),t.fillStyle="rgba(0, 0, 0, 0.5)",this._renderOverlay(t),void 0!==t.setLineDash?t.setLineDash([7,7]):void 0!==t.mozDash&&(t.mozDash=[7,7]),t.strokeStyle="rgba(0, 0, 0, 0.2)",this._renderBorders(t),this._renderGrid(t),t.lineDashOffset=7,t.strokeStyle="rgba(255, 255, 255, 0.4)",this._renderBorders(t),this._renderGrid(t),t.scale(1/n,1/s)},_renderOverlay:function(t){var i=t.canvas,e=Math.ceil(-this.getWidth()/2-this.getLeft()),n=Math.ceil(-this.getWidth()/2),s=Math.ceil(this.getWidth()/2),o=Math.ceil(this.getWidth()/2+(i.width-this.getWidth()-this.getLeft())),a=Math.ceil(-this.getHeight()/2-this.getTop()),r=Math.ceil(-this.getHeight()/2),h=Math.ceil(this.getHeight()/2),c=Math.ceil(this.getHeight()/2+(i.height-this.getHeight()-this.getTop()));t.beginPath(),t.moveTo(e-1,a-1),t.lineTo(o+1,a-1),t.lineTo(o+1,c+1),t.lineTo(e-1,c-1),t.lineTo(e-1,a-1),t.closePath(),t.moveTo(n,r),t.lineTo(n,h),t.lineTo(s,h),t.lineTo(s,r),t.lineTo(n,r),t.closePath(),t.fill()},_renderBorders:function(t){t.beginPath(),t.moveTo(-this.getWidth()/2,-this.getHeight()/2),t.lineTo(this.getWidth()/2,-this.getHeight()/2),t.lineTo(this.getWidth()/2,this.getHeight()/2),t.lineTo(-this.getWidth()/2,this.getHeight()/2),t.lineTo(-this.getWidth()/2,-this.getHeight()/2),t.stroke()},_renderGrid:function(t){}}),h=o.Plugin.inherit({startX:null,startY:null,isKeyCroping:!1,isKeyLeft:!1,isKeyUp:!1,defaults:{minHeight:1,minWidth:1,ratio:null,quickCropKey:!1},init:function(t,i){this.overrided(t,i);var e=this.imager.toolbar.createButtonGroup();this.cropButton=e.createButton({image:"crop"}),this.okButton=e.createButton({image:"done",type:"success",hide:!0}),this.cancelButton=e.createButton({image:"close",type:"danger",hide:!0}),this.cropButton.addEventListener("click",this.toggleCrop.bind(this)),this.okButton.addEventListener("click",this.cropCurrentZone.bind(this)),this.cancelButton.addEventListener("click",this.releaseFocus.bind(this)),this.imager.canvas.on("mouse:down",this.onMouseDown.bind(this)),this.imager.canvas.on("mouse:move",this.onMouseMove.bind(this)),this.imager.canvas.on("mouse:up",this.onMouseUp.bind(this)),this.imager.canvas.on("object:moving",this.onObjectMoving.bind(this)),this.imager.canvas.on("object:scaling",this.onObjectScaling.bind(this)),s.util.addListener(document,"keydown",this.onKeyDown.bind(this)),s.util.addListener(document,"keyup",this.onKeyUp.bind(this)),this.imager.addEventListener("core:transformation",this.releaseFocus.bind(this))},onObjectMoving:function(t){if(this.hasFocus()){var i=t.target;if(i===this.cropZone){var e=this.imager.canvas,n=i.getLeft(),s=i.getTop(),o=i.getWidth(),a=i.getHeight(),r=e.getWidth()-o,h=e.getHeight()-a;n<0&&i.set("left",0),s<0&&i.set("top",0),n>r&&i.set("left",r),s>h&&i.set("top",h),this.imager.dispatchEvent("crop:update")}}},onObjectScaling:function(t){if(this.hasFocus()){var i=!1,e=t.target;if(e===this.cropZone){var n=this.imager.canvas,s=n.getPointer(t.e),o=(s.x,s.y,e.getLeft()),a=e.getTop(),r=e.getLeft()+e.getWidth(),h=e.getTop()+e.getHeight();if(null!==this.options.ratio&&(o<0||r>n.getWidth()||a<0||h>n.getHeight())&&(i=!0),o<0||r>n.getWidth()||i){var c=this.lastScaleX||1;e.setScaleX(c)}if(o<0&&e.setLeft(0),a<0||h>n.getHeight()||i){var l=this.lastScaleY||1;e.setScaleY(l)}a<0&&e.setTop(0),e.getWidth()<this.options.minWidth&&e.scaleToWidth(this.options.minWidth),e.getHeight()<this.options.minHeight&&e.scaleToHeight(this.options.minHeight),this.lastScaleX=e.getScaleX(),this.lastScaleY=e.getScaleY(),this.imager.dispatchEvent("crop:update")}}},onMouseDown:function(t){if(this.hasFocus()){var i=this.imager.canvas;i.calcOffset();var e=i.getPointer(t.e),n=e.x,o=e.y,a=new s.Point(n,o),r=i.getActiveObject();r===this.cropZone||this.cropZone.containsPoint(a)||(i.discardActiveObject(),this.cropZone.setWidth(0),this.cropZone.setHeight(0),this.cropZone.setScaleX(1),this.cropZone.setScaleY(1),this.startX=n,this.startY=o)}},onMouseMove:function(t){if(this.isKeyCroping)return this.onMouseMoveKeyCrop(t);if(null!==this.startX&&null!==this.startY){var i=this.imager.canvas,e=i.getPointer(t.e),n=e.x,s=e.y;this._renderCropZone(this.startX,this.startY,n,s)}},onMouseMoveKeyCrop:function(t){var i=this.imager.canvas,e=this.cropZone,n=i.getPointer(t.e),s=n.x,o=n.y;e.left&&e.top||(e.setTop(o),e.setLeft(s)),this.isKeyLeft=s<e.left+e.width/2,this.isKeyUp=o<e.top+e.height/2,this._renderCropZone(Math.min(e.left,s),Math.min(e.top,o),Math.max(e.left+e.width,s),Math.max(e.top+e.height,o))},onMouseUp:function(t){if(null!==this.startX&&null!==this.startY){var i=this.imager.canvas;this.cropZone.setCoords(),i.setActiveObject(this.cropZone),i.calcOffset(),this.startX=null,this.startY=null}},onKeyDown:function(t){!1===this.options.quickCropKey||t.keyCode!==this.options.quickCropKey||this.isKeyCroping||(this.isKeyCroping=!0,this.imager.canvas.discardActiveObject(),this.cropZone.setWidth(0),this.cropZone.setHeight(0),this.cropZone.setScaleX(1),this.cropZone.setScaleY(1),this.cropZone.setTop(0),this.cropZone.setLeft(0))},onKeyUp:function(t){!1!==this.options.quickCropKey&&t.keyCode===this.options.quickCropKey&&this.isKeyCroping&&(this.isKeyCroping=!1,this.startX=1,this.startY=1,this.onMouseUp())},selectZone:function(t,i,e,n,s){this.hasFocus()||this.requireFocus(),s?this.cropZone.set({left:t,top:i,width:e,height:n}):this._renderCropZone(t,i,t+e,i+n);var o=this.imager.canvas;o.bringToFront(this.cropZone),this.cropZone.setCoords(),o.setActiveObject(this.cropZone),o.calcOffset(),this.imager.dispatchEvent("crop:update")},toggleCrop:function(){this.hasFocus()?this.releaseFocus():this.requireFocus()},cropCurrentZone:function(){if(this.hasFocus()&&!(this.cropZone.width<1&&this.cropZone.height<1)){var t=this.imager.image,i=this.cropZone.getTop()-t.getTop(),e=this.cropZone.getLeft()-t.getLeft(),n=this.cropZone.getWidth(),s=this.cropZone.getHeight();i<0&&(s+=i,i=0),e<0&&(n+=e,e=0),this.imager.applyTransformation(new a({top:i/t.getHeight(),left:e/t.getWidth(),width:n/t.getWidth(),height:s/t.getHeight()}))}},hasFocus:function(){return void 0!==this.cropZone},requireFocus:function(){this.cropZone=new r({fill:"transparent",hasBorders:!1,originX:"left",originY:"top",cornerColor:"#444",cornerSize:8,transparentCorners:!1,lockRotation:!0,hasRotatingPoint:!1}),null!==this.options.ratio&&this.cropZone.set("lockUniScaling",!0),this.imager.canvas.add(this.cropZone),this.imager.canvas.defaultCursor="crosshair",this.cropButton.active(!0),this.okButton.hide(!1),this.cancelButton.hide(!1)},releaseFocus:function(){void 0!==this.cropZone&&(this.cropZone.remove(),this.cropZone=void 0,this.cropButton.active(!1),this.okButton.hide(!0),this.cancelButton.hide(!0),this.imager.canvas.defaultCursor="default",this.imager.dispatchEvent("crop:update"))},_renderCropZone:function(t,i,e,n){var s=this.imager.canvas,o=e>t,a=!o,r=n>i,h=!r,c=Math.min(+this.options.minWidth,s.getWidth()),l=Math.min(+this.options.minHeight,s.getHeight()),d=Math.min(t,e),g=Math.max(t,e),u=Math.min(i,n),m=Math.max(i,n);d=Math.max(0,d),g=Math.min(s.getWidth(),g),u=Math.max(0,u),m=Math.min(s.getHeight(),m),g-d<c&&(o?g=d+c:d=g-c),m-u<l&&(r?m=u+l:u=m-l),d<0&&(g+=Math.abs(d),d=0),g>s.getWidth()&&(d-=g-s.getWidth(),g=s.getWidth()),u<0&&(m+=Math.abs(u),u=0),m>s.getHeight()&&(u-=m-s.getHeight(),m=s.getHeight());var p=g-d,f=m-u,v=p/f;if(this.options.ratio&&+this.options.ratio!==v){var k=+this.options.ratio;if(this.isKeyCroping&&(a=this.isKeyLeft,h=this.isKeyUp),v<k){var y=f*k;a&&(d-=y-p),p=y}else if(v>k){var b=f/(k*f/p);h&&(u-=b-f),f=b}if(d<0&&(d=0),u<0&&(u=0),d+p>s.getWidth()){var y=s.getWidth()-d;f=y*f/p,p=y,h&&(u=i-f)}if(u+f>s.getHeight()){var b=s.getHeight()-u;p=p*b/f,f=b,a&&(d=t-p)}}this.cropZone.left=d,this.cropZone.top=u,this.cropZone.width=p,this.cropZone.height=f,this.imager.canvas.bringToFront(this.cropZone),this.imager.dispatchEvent("crop:update")}}),c={name:"crop",ctor:h};return o.installPlugin(c),c}),t("skylark-darkroomjs/plugins/rotate",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","skylark-graphics-canvas2d","../Imager"],function(t,i,e,n,s){"use strict";var o=s.Transformation.inherit({applyTransformation:function(t,i,e){var n,s,o=(i.getAngle()+this.options.angle)%360;i.rotate(o),s=Math.abs(i.getWidth()*Math.sin(o*Math.PI/180))+Math.abs(i.getHeight()*Math.cos(o*Math.PI/180)),n=Math.abs(i.getHeight()*Math.sin(o*Math.PI/180))+Math.abs(i.getWidth()*Math.cos(o*Math.PI/180)),t.setWidth(n),t.setHeight(s),t.centerObject(i),i.setCoords(),t.renderAll(),e()}}),a=s.Plugin.inherit({init:function(t,i){this.overrided(t,i);var e=this.imager.toolbar.createButtonGroup(),n=e.createButton({image:"rotate-left"}),s=e.createButton({image:"rotate-right"});n.addEventListener("click",this.rotateLeft.bind(this)),s.addEventListener("click",this.rotateRight.bind(this))},rotateLeft:function(){this.rotate(-90)},rotateRight:function(){this.rotate(90)},rotate:function(t){this.imager.applyTransformation(new o({angle:t}))}}),r={name:"rotate",ctor:a};return s.installPlugin(r),r}),t("skylark-darkroomjs/plugins/save",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","skylark-graphics-canvas2d","../Imager"],function(t,i,e,n,s){"use strict";var o=s.Plugin.inherit({defaults:{callback:function(){this.imager.selfDestroy()}},init:function(t,i){this.overrided(t,i);var e=this.imager.toolbar.createButtonGroup();this.destroyButton=e.createButton({image:"save"}),this.destroyButton.addEventListener("click",this.options.callback.bind(this))}}),a={name:"save",ctor:o};return s.installPlugin(a),a}),t("skylark-darkroomjs/main",["./Imager","./plugins/history","./plugins/crop","./plugins/rotate","./plugins/save"],function(t){return t}),t("skylark-darkroomjs",["skylark-darkroomjs/main"],function(t){return t})}(e),!s){var r=n("skylark-langx/skylark");o?module.exports=r:i.skylarkjs=r}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-darkroomjs.js.map