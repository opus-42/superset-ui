(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{768:function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0,exports.default=void 0;var a,_chart=__webpack_require__(28),_Sankey=(a=__webpack_require__(774))&&a.__esModule?a:{default:a};var _default=(0,_chart.reactify)(_Sankey.default);exports.default=_default},774:function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0,exports.default=void 0;var _d=_interopRequireDefault(__webpack_require__(772)),_propTypes=_interopRequireDefault(__webpack_require__(1)),_d3Sankey=__webpack_require__(775),_color=__webpack_require__(300),_numberFormat=__webpack_require__(117);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}__webpack_require__(776);var propTypes={data:_propTypes.default.arrayOf(_propTypes.default.shape({source:_propTypes.default.string,target:_propTypes.default.string,value:_propTypes.default.number})),width:_propTypes.default.number,height:_propTypes.default.number,colorScheme:_propTypes.default.string},formatNumber=(0,_numberFormat.getNumberFormatter)(_numberFormat.NumberFormats.FLOAT);function Sankey(a,b){function d(a){o.html(function(){return function(a){var b;if(a.sourceLinks)b=a.name+" Value: <span class='emph'>"+formatNumber(a.value)+"</span>";else{var c=formatNumber(a.value),d=_d.default.round(a.value/a.source.value*100,1),e=_d.default.round(a.value/a.target.value*100,1);b=["<div class=''>Path Value: <span class='emph'>",c,"</span></div>","<div class='percents'>","<span class='emph'>",Number.isFinite(d)?d:"100","%</span> of ",a.source.name,"<br/>","<span class='emph'>"+(Number.isFinite(e)?e:"--")+"%</span> of ",a.target.name,"target","</div>"].join("")}return b}(a)}).transition().duration(200).style("left",_d.default.event.offsetX+10+"px").style("top",_d.default.event.offsetY+10+"px").style("opacity",.95)}function e(){o.transition().duration(100).style("opacity",0)}var f=b.data,g=b.width,h=b.height,i=b.colorScheme,j=_d.default.select(a);j.classed("superset-legacy-chart-sankey",!0);var k_top=5,k_right=5,k_bottom=5,k_left=5,l=g-k_left-k_right,m=h-k_top-k_bottom;j.selectAll("*").remove();var n=j.append("svg").attr("width",l+k_left+k_right).attr("height",m+k_top+k_bottom).append("g").attr("transform","translate("+k_left+","+k_top+")"),o=j.append("div").attr("class","sankey-tooltip").style("opacity",0),p=_color.CategoricalColorNamespace.getScale(i),q=(0,_d3Sankey.sankey)().nodeWidth(15).nodePadding(10).size([l,m]),r=q.link(),s={},t=f.map(function(a){var b=Object.assign({},a);return b.source=s[b.source]||(s[b.source]={name:b.source}),b.target=s[b.target]||(s[b.target]={name:b.target}),b.value=+b.value,b});s=_d.default.values(s),q.nodes(s).links(t).layout(32);var u=n.append("g").selectAll(".link").data(t).enter().append("path").attr("class","link").attr("d",r).style("stroke-width",function(a){return Math.max(1,a.dy)}).sort(function(c,a){return a.dy-c.dy}).on("mouseover",d).on("mouseout",e),v=n.append("g").selectAll(".node").data(s).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"}).call(_d.default.behavior.drag().origin(function(a){return a}).on("dragstart",function(){this.parentNode.appendChild(this)}).on("drag",function(a){_d.default.select(this).attr("transform","translate("+a.x+","+(a.y=Math.max(0,Math.min(h-a.dy,_d.default.event.y)))+")"),q.relayout(),u.attr("d",r)}));v.append("rect").attr("height",function(a){return a.dy>5?a.dy:5}).attr("width",q.nodeWidth()).style("fill",function(a){var b=a.name||"N/A";return a.color=p(b.replace(/ .*/,"")),a.color}).style("stroke",function(a){return _d.default.rgb(a.color).darker(2)}).on("mouseover",d).on("mouseout",e),v.append("text").attr("x",-6).attr("y",function(a){return a.dy/2}).attr("dy",".35em").attr("text-anchor","end").attr("transform",null).text(function(a){return a.name}).filter(function(a){return a.x<l/2}).attr("x",6+q.nodeWidth()).attr("text-anchor","start")}Sankey.displayName="Sankey",Sankey.propTypes=propTypes;var _default=Sankey;exports.default=_default},775:function(module,exports,__webpack_require__){!function(exports,d3Array,d3Collection,d3Interpolate){"use strict";exports.sankey=function(){var sankey={},nodeWidth=24,nodePadding=8,size=[1,1],nodes=[],links=[];function computeNodeBreadths(){for(var nextNodes,kx,remainingNodes=nodes,x=0;remainingNodes.length;)nextNodes=[],remainingNodes.forEach(function(node){node.x=x,node.dx=nodeWidth,node.sourceLinks.forEach(function(link){nextNodes.indexOf(link.target)<0&&nextNodes.push(link.target)})}),remainingNodes=nextNodes,++x;(function(x){nodes.forEach(function(node){node.sourceLinks.length||(node.x=x-1)})})(x),kx=(size[0]-nodeWidth)/(x-1),nodes.forEach(function(node){node.x*=kx})}function computeLinkDepths(){function ascendingSourceDepth(a,b){return a.source.y-b.source.y}function ascendingTargetDepth(a,b){return a.target.y-b.target.y}nodes.forEach(function(node){node.sourceLinks.sort(ascendingTargetDepth),node.targetLinks.sort(ascendingSourceDepth)}),nodes.forEach(function(node){var sy=0,ty=0;node.sourceLinks.forEach(function(link){link.sy=sy,sy+=link.dy}),node.targetLinks.forEach(function(link){link.ty=ty,ty+=link.dy})})}function center(node){return node.y+node.dy/2}function value(link){return link.value}return sankey.nodeWidth=function(_){return arguments.length?(nodeWidth=+_,sankey):nodeWidth},sankey.nodePadding=function(_){return arguments.length?(nodePadding=+_,sankey):nodePadding},sankey.nodes=function(_){return arguments.length?(nodes=_,sankey):nodes},sankey.links=function(_){return arguments.length?(links=_,sankey):links},sankey.size=function(_){return arguments.length?(size=_,sankey):size},sankey.layout=function(iterations){return nodes.forEach(function(node){node.sourceLinks=[],node.targetLinks=[]}),links.forEach(function(link){var source=link.source,target=link.target;"number"==typeof source&&(source=link.source=nodes[link.source]),"number"==typeof target&&(target=link.target=nodes[link.target]),source.sourceLinks.push(link),target.targetLinks.push(link)}),nodes.forEach(function(node){node.value=Math.max(d3Array.sum(node.sourceLinks,value),d3Array.sum(node.targetLinks,value))}),computeNodeBreadths(),function(iterations){var ky,nodesByBreadth=d3Collection.nest().key(function(d){return d.x}).sortKeys(d3Array.ascending).entries(nodes).map(function(d){return d.values});ky=d3Array.min(nodesByBreadth,function(nodes){return(size[1]-(nodes.length-1)*nodePadding)/d3Array.sum(nodes,value)}),nodesByBreadth.forEach(function(nodes){nodes.forEach(function(node,i){node.y=i,node.dy=node.value*ky})}),links.forEach(function(link){link.dy=link.value*ky}),resolveCollisions();for(var alpha=1;iterations>0;--iterations)relaxRightToLeft(alpha*=.99),resolveCollisions(),relaxLeftToRight(alpha),resolveCollisions();function relaxLeftToRight(alpha){function weightedSource(link){return center(link.source)*link.value}nodesByBreadth.forEach(function(nodes){nodes.forEach(function(node){if(node.targetLinks.length){var y=d3Array.sum(node.targetLinks,weightedSource)/d3Array.sum(node.targetLinks,value);node.y+=(y-center(node))*alpha}})})}function relaxRightToLeft(alpha){function weightedTarget(link){return center(link.target)*link.value}nodesByBreadth.slice().reverse().forEach(function(nodes){nodes.forEach(function(node){if(node.sourceLinks.length){var y=d3Array.sum(node.sourceLinks,weightedTarget)/d3Array.sum(node.sourceLinks,value);node.y+=(y-center(node))*alpha}})})}function resolveCollisions(){nodesByBreadth.forEach(function(nodes){var node,dy,i,y0=0,n=nodes.length;for(nodes.sort(ascendingDepth),i=0;i<n;++i)node=nodes[i],(dy=y0-node.y)>0&&(node.y+=dy),y0=node.y+node.dy+nodePadding;if((dy=y0-nodePadding-size[1])>0)for(y0=node.y-=dy,i=n-2;i>=0;--i)node=nodes[i],(dy=node.y+node.dy+nodePadding-y0)>0&&(node.y-=dy),y0=node.y})}function ascendingDepth(a,b){return a.y-b.y}}(iterations),computeLinkDepths(),sankey},sankey.relayout=function(){return computeLinkDepths(),sankey},sankey.link=function(){var curvature=.5;function link(d){var x0=d.source.x+d.source.dx,x1=d.target.x,xi=d3Interpolate.interpolateNumber(x0,x1),x2=xi(curvature),x3=xi(1-curvature),y0=d.source.y+d.sy+d.dy/2,y1=d.target.y+d.ty+d.dy/2;return"M"+x0+","+y0+"C"+x2+","+y0+" "+x3+","+y1+" "+x1+","+y1}return link.curvature=function(_){return arguments.length?(curvature=+_,link):curvature},link},sankey},Object.defineProperty(exports,"__esModule",{value:!0})}(exports,__webpack_require__(73),__webpack_require__(301),__webpack_require__(302))},776:function(module,exports,__webpack_require__){var content=__webpack_require__(777);"string"==typeof content&&(content=[[module.i,content,""]]);var options={hmr:!0,transform:void 0,insertInto:void 0};__webpack_require__(95)(content,options);content.locals&&(module.exports=content.locals)},777:function(module,exports,__webpack_require__){(module.exports=__webpack_require__(94)(!1)).push([module.i,'/**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n.superset-legacy-chart-sankey .node rect {\n  cursor: move;\n  fill-opacity: .9;\n  shape-rendering: crispEdges;\n}\n\n.superset-legacy-chart-sankey .node text {\n  pointer-events: none;\n  text-shadow: 0 1px 0 #fff;\n}\n\n.superset-legacy-chart-sankey .link {\n  fill: none;\n  stroke: #000;\n  stroke-opacity: .2;\n}\n\n.superset-legacy-chart-sankey .link:hover {\n  stroke-opacity: .5;\n}\n\n.superset-legacy-chart-sankey-tooltip {\n  position: absolute;\n  width: auto;\n  background: #ddd;\n  padding: 10px;\n  font-size: 12px;\n  font-weight: 200;\n  color: #333;\n  border: 1px solid #fff;\n  text-align: center;\n  pointer-events: none;\n}\n',""])}}]);
//# sourceMappingURL=4.eab008f06c242dee8489.bundle.js.map