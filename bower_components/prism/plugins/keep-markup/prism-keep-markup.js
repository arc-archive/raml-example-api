(function(){if(typeof self==="undefined"||!self.Prism||!self.document||!document.createRange)return;Prism.plugins.KeepMarkup=true;Prism.hooks.add("before-highlight",function(env){if(!env.element.children.length)return;var pos=0;var data=[];var f=function(elt,baseNode){var o={};if(!baseNode){o.clone=elt.cloneNode(false);o.posOpen=pos;data.push(o)}for(var i=0,l=elt.childNodes.length;i<l;i++){var child=elt.childNodes[i];if(child.nodeType===1)f(child);else if(child.nodeType===3)pos+=child.data.length}if(!baseNode)o.posClose=
pos};f(env.element,true);if(data&&data.length)env.keepMarkup=data});Prism.hooks.add("after-highlight",function(env){if(env.keepMarkup&&env.keepMarkup.length){var walk=function(elt,nodeState){for(var i=0,l=elt.childNodes.length;i<l;i++){var child=elt.childNodes[i];if(child.nodeType===1){if(!walk(child,nodeState))return false}else if(child.nodeType===3){if(!nodeState.nodeStart&&nodeState.pos+child.data.length>nodeState.node.posOpen){nodeState.nodeStart=child;nodeState.nodeStartPos=nodeState.node.posOpen-
nodeState.pos}if(nodeState.nodeStart&&nodeState.pos+child.data.length>=nodeState.node.posClose){nodeState.nodeEnd=child;nodeState.nodeEndPos=nodeState.node.posClose-nodeState.pos}nodeState.pos+=child.data.length}if(nodeState.nodeStart&&nodeState.nodeEnd){var range=document.createRange();range.setStart(nodeState.nodeStart,nodeState.nodeStartPos);range.setEnd(nodeState.nodeEnd,nodeState.nodeEndPos);nodeState.node.clone.appendChild(range.extractContents());range.insertNode(nodeState.node.clone);range.detach();
return false}}return true};env.keepMarkup.forEach(function(node){walk(env.element,{node:node,pos:0})});env.highlightedCode=env.element.innerHTML}})})();