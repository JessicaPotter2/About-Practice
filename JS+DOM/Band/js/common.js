/*addLoadEvent()函数，把函数绑定到window.onload事件上*/
		function addLoadEvent(func){
			var oldonload=window.onload;
			if(typeof window.onload!='function'){
				window.onload=func;
			}else{
				window.onload=function(){
					oldonload();
					func();
				}
			}
		}
//调用方法：addLoadEvent(func);
/*在targetElement后面插入newElement*/
function insertAfter(newElement,targetElement){
			var parent=targetElement.parentNode;
			if(parent.lastChild==targetElement){
				parent.appendChild(newElement);
			}else{
				parent.insertBefore(newElement,targetElement.nextSibling);
			}
		}
/*创建缩略词列表*/
function displayAbbreviations(){
				if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
				//获取所有的abbr
				var abbreviations=document.getElementsByTagName("abbr");
				if(abbreviations.length<1) return false; 
				var defs=new Array();
				//遍历abbr
				for(var i=0;i<abbreviations.length;i++){
					var current_abbr=abbreviations[i];
					if(current_abbr.childNodes.length<1) continue;//如果当前元素没有子节点，就立刻开始下一次循环，IE6及以下不支持abbr
					var definition=current_abbr.getAttribute("title");
					var key=current_abbr.lastChild.nodeValue;
					defs[key]=definition;
				}
				//创建dl列表
				var dlist=document.createElement("dl");
				//循环定义列表
				for(key in defs){
					var definition=defs[key];
					//创建dt
					var dtitle=document.createElement("dt");
					var dtitle_text=document.createTextNode(key);
					dtitle.appendChild(dtitle_text);
					//创建描述
					var ddesc=document.createElement("dd");
					var ddesc_text=document.createTextNode(definition);
					ddesc.appendChild(ddesc_text);
					//添加到定义列表
					dlist.appendChild(dtitle);
					dlist.appendChild(ddesc);
				}
				if(dlist.childNodes.length<1) return false;//如果对应于错略次表中的dl元素没有任何子节点，则立刻退出displayAbbreviations()函数，针对IE6及以下
				//创建标题
				var header=document.createElement("h2");
				var header_text=document.createTextNode("Abbreviations");
				header.appendChild(header_text);
				//将标题添加到body 上
				document.body.appendChild(header);
				document.body.appendChild(dlist);
			}
/*创建引用链接*/
function displayCitations(){
				if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
				var quotes=document.getElementsByTagName("blockquote");
				for(var i=0;i<quotes.length;i++){
					if(!quotes[i].getAttribute("cite")) continue;
					var url=quotes[i].getAttribute("cite");
					var quoteChildren=quotes[i].getElementsByTagName("*");
					if(quoteChildren.length<1) continue;
					var elem=quoteChildren[quoteChildren.length-1];
					var link=document.createElement("a");
					var link_text=document.createTextNode("source");
					link.appendChild(link_text);
					link.setAttribute("href",url);
					var superscript=document.createElement("sup");
					superscript.appendChild(link);
					elem.appendChild(superscript);

				}
			}
/*创建快捷键列表*/
function displayAccessKeys(){
				if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
				//获取所有的链接
				var links=document.getElementsByTagName("a");
				//创建一个数组去存储快捷键
				var akeys=new Array();
				//循环链接
				for(var i=0;i<links.length;i++){
					var current_link=links[i];
					//如果没有快捷键则退出循环
					if(!current_link.getAttribute("accesskey")) continue;
					//获取快键键
					var key=current_link.getAttribute("accesskey");
					//获取快捷键的对象
					var text=current_link.lastChild.nodeValue;
					//将其添加到数组中
					akeys[key]=text;
				}
				//创建快捷键列表
				var list=document.createElement("ul");
				//循环快捷键
				for(key in akeys){
					var text=akeys[key];
					//创建放在列表中的字符串
					var str=key+": "+text;
					var item=document.createElement("li");
					var item_text=document.createTextNode(str);
					item.appendChild(item_text);
					list.appendChild(item);
				}
				var header=document.createElement("h3");
				var header_text=document.createTextNode("Accesskey");
				header.appendChild(header_text);
				document.body.appendChild(header);
				document.body.appendChild(list);
			}
/*给元素添加类class*/

		function addClass(element,value){
			if(!element.className){
				element.className=value;
			}else{
				newClassName=element.className+" "+value;
				element.className=newClassName;
			}
		}
/*获取紧跟元素的节点*/
function getNextElement(node){
			if(node.nodeType==1){
				return node;
			}
			if(node.nextSibling){
				return getNextElement(node.nextSibling);
			}
			return null;
		}
/*给元素紧跟节点添加样式*/

		function styleElementSiblings(tag,theclass){
			if(!document.getElementsByTagName) return false;
			var elems=document.getElementsByTagName(tag);
			for(var i=0;i<elems.length;i++){
				var elem=getNextElement(elems[i].nextSibling);
				addClass(elem,theclass);
			}
		}
/*用JS实现动画*/
function moveElement(elementID,final_x,final_y,interval){
			if(!document.getElementById) return false;
			if(!document.getElementById(elementID)) return false;
			var elem=document.getElementById(elementID);
			if(elem.movement){
				clearTimeout(elem.movement);//对movement进行复位，使实际执行的只有一条setTimeout（）函数调用语句，setTimeout队列里不再有积累的事件
			}
			if(!elem.style.left){
				elem.style.left="0px";
			}
			if(!elem.style.top){
				elem.style.top="0px";
			}
			var xpos=parseInt(elem.style.left);
			var ypos=parseInt(elem.style.top);
			if(xpos==final_x && ypos==final_y){
				return true;
			}
			if(xpos<final_x){
				var dist=Math.ceil((final_x-xpos)/10);//向上取整,目标值与现在的值的十分之一
				xpos=xpos+dist;
			}
			if(xpos>final_x){
				var dist=Math.ceil((xpos-final_x)/10);
				xpos=xpos-dist;
			}
			if(ypos<final_y){
				var dist=Math.ceil((final_y-ypos)/10);
				ypos=ypos+dist;
			}
			if(ypos>final_y){
				var dist=Math.ceil((ypos-final_y)/10);
				ypos=ypos-dist;
			}
			elem.style.left=xpos+"px";
			elem.style.top=ypos+"px";
			repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
			elem.movement=setTimeout(repeat,interval);
		}
