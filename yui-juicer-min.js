YUI.add("juicer",function(b){var a=function(){var c=[].slice.call(arguments);c.push(a.options);if(arguments.length==1){return a.compile.apply(a,c);}if(arguments.length>=2){return a.to_html.apply(a,c);}};window.__escapehtml={__escapehash:{"<":"&lt;",">":"&gt;",'"':"&quot;","&":"&amp;"},__escapereplace:function(c){return __escapehtml.__escapehash[c];},__escape:function(c){return typeof(c)!=="string"?c:c.replace(/[&<>"]/igm,__escapehtml.__escapereplace);},__detection:function(c){return typeof(c)==="undefined"?"":c;}};a.__cache={};a.version="0.3.0-dev";a.settings={forstart:/{@each\s*([\w\.]*?)\s*as\s*(\w*?)(,\w*?)?}/igm,forend:/{@\/each}/igm,ifstart:/{@if\s*([^}]*?)}/igm,ifend:/{@\/if}/igm,elsestart:/{@else}/igm,interpolate:/\${([\s\S]+?)}/igm,noneencode:/\$\${([\s\S]+?)}/igm,inlinecomment:/{#[^}]*?}/igm,rangestart:/{@each\s*(\w*?)\s*in\s*range\((\d+?),(\d+?)\)}/igm};a.options={cache:true,strip:true,errorhandling:true};a.set=function(c,d){this.options[c]=d;};a.template=function(){var c=this;this.__interpolate=function(e,h,f){var d=e.split("|"),g="";if(d.length>1){e=d.shift();g=d.shift();}return"<%= "+(h?"__escapehtml.__escape":"")+"("+(!f||f.detection!==false?"__escapehtml.__detection":"")+"("+g+"("+e+"))) %>";};this.__shell=function(e,d){var f=0;e=e.replace(a.settings.forstart,function(k,h,j,i){var j=j||"value",i=i&&i.substr(1);var g="i"+f++;return"<% for(var "+g+"=0,l"+g+"="+h+".length;"+g+"<l"+g+";"+g+"++) {var "+j+"="+h+"["+g+"];"+(i?("var "+i+"="+g+";"):"")+" %>";}).replace(a.settings.forend,"<% } %>").replace(a.settings.ifstart,function(g,h){return"<% if("+h+") { %>";}).replace(a.settings.ifend,"<% } %>").replace(a.settings.elsestart,function(g){return"<% } else { %>";}).replace(a.settings.noneencode,function(h,g){return c.__interpolate(g,false,d);}).replace(a.settings.interpolate,function(h,g){return c.__interpolate(g,true,d);}).replace(a.settings.inlinecomment,"").replace(a.settings.rangestart,function(j,i,k,g){var h="j"+f++;return"<% for(var "+h+"=0;"+h+"<"+(g-k)+";"+h+"++) {var "+i+"="+h+"; %>";});if(!d||d.errorhandling!==false){e="<% try { %>"+e+'<% } catch(e) {console && console.warn("Juicer Render Exception: "+e.message);} %>';}return e;};this.__pure=function(e,d){return this.__convert(e,!d||d.strip);};this.__lexical=function(f){var e=[];var j="";var h=function(k,m){for(var l=0;l<k.length;l++){if(k[l]==m){return l;}}return -1;};var d=function(k,i){i=i.match(/\w+/igm)[0];(e.indexOf?e.indexOf(i):h(e,i))===-1&&e.push(i);};f.replace(a.settings.forstart,d).replace(a.settings.interpolate,d).replace(a.settings.ifstart,d);for(var g=0;g<e.length;g++){j+="var "+e[g]+"=data."+e[g]+";";}return"<% "+j+" %>";};this.__convert=function(e,f){var d=[].join("");d+="var data=data||{};";d+="var out='';out+='";if(f!==false){d+=e.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out;";}else{d+=e.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out.replace(/[\\r\\n]\\t+[\\r\\n]/g,'\\r\\n');";}return d;};this.parse=function(e,d){if(!d||d.loose!==false){e=this.__lexical(e)+e;}e=this.__shell(e,d);e=this.__pure(e,d);e='"use strict";'+e;this.render=new Function("data",e);return this;};};a.compile=function(d,c){try{var f=this.__cache[d]?this.__cache[d]:new this.template().parse(d,c);if(!c||c.cache!==false){this.__cache[d]=f;}return f;}catch(g){console&&console.warn("Juicer Compile Exception: "+g.message);return{render:function(){}};}};a.to_html=function(d,e,c){return this.compile(d,c).render(e);};b.juicer=a;},"0.3.0-dev");