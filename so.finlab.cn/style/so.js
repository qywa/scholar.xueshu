var includeCaption=1;var zoomTime=5;var zoomSteps=15;var fade=1;var minBorder=90;var myWidth=0,myHeight=0,myScroll=0;myScrollWidth=0;myScrollHeight=0;var zoomOpen=false,preloadFrame=1,preloadActive=false,preloadTime=0,imgPreload=new Image();var zoomActive=new Array();var zoomTimer=new Array();var zoomOrigW=new Array();var zoomOrigH=new Array();var zoomOrigX=new Array();var zoomOrigY=new Array();var zoomID="ZoomBox";var theID="ZoomImage";var theCap="ZoomCaption";var theCapDiv="ZoomCapDiv";function setupZoom(){prepZooms();insertZoomHTML();zoomdiv=document.getElementById(zoomID);zoomimg=document.getElementById(theID)}function prepZooms(){if(!document.getElementsByTagName){return}var A=document.getElementsByTagName("a");for(i=0;i<A.length;i++){if(A[i].getAttribute("href")&&(A[i].getAttribute("rel"))){if(A[i].getAttribute("rel").indexOf("zoom:")==0){A[i].onclick=function(){zoomClick(this);return false};A[i].onmouseover=function(){zoomPreload(this)}}}}}function zoomPreload(B){var A=B.getAttribute("href");if(imgPreload.src.indexOf(B.getAttribute("href").substr(B.getAttribute("href").lastIndexOf("/")))==-1){preloadActive=true;imgPreload=new Image();imgPreload.onload=function(){preloadActive=false};imgPreload.src=A}}function preloadAnimStart(){preloadTime=new Date();document.getElementById("ZoomSpin").style.left=(myWidth/2)+"px";document.getElementById("ZoomSpin").style.top=((myHeight/2)+myScroll)+"px";document.getElementById("ZoomSpin").style.visibility="visible";preloadFrame=1;document.getElementById("SpinImage").src=zoomImageURI+"zoom-spin-"+preloadFrame+".png";preloadAnimTimer=setInterval("preloadAnim()",100)}function preloadAnim(A){if(preloadActive!=false){document.getElementById("SpinImage").src=zoomImageURI+"zoom-spin-"+preloadFrame+".png";preloadFrame++;if(preloadFrame>12){preloadFrame=1}}else{document.getElementById("ZoomSpin").style.visibility="hidden";clearInterval(preloadAnimTimer);zoomIn(preloadFrom)}}function zoomClick(A){getSize();if(preloadActive==true){preloadFrom=A;preloadAnimStart()}else{zoomIn(A)}}function zoomIn(A){zoomimg.src=A.getAttribute("href");if(A.childNodes[0].width){startW=A.childNodes[0].width;startH=A.childNodes[0].height;startPos=findElementPos(A.childNodes[0])}else{startW=50;startH=12;startPos=findElementPos(A)}hostX=startPos[0];hostY=startPos[1];if(document.getElementById("scroller")){hostX=hostX-document.getElementById("scroller").scrollLeft}endW=imgPreload.width;endH=imgPreload.height;if(zoomActive[theID]!=true){document.getElementById("ShadowBox").style.visibility="hidden";document.getElementById("ZoomClose").style.visibility="hidden";if(includeCaption==1){zoomcap=document.getElementById(theCap);zoomcapd=document.getElementById(theCapDiv);if(A.getAttribute("title")&&includeCaption==1){zoomcapd.style.display="block";zoomcap.innerHTML=A.getAttribute("title")}else{zoomcapd.style.display="none"}}zoomOrigW[theID]=startW;zoomOrigH[theID]=startH;zoomOrigX[theID]=hostX;zoomOrigY[theID]=hostY;zoomimg.style.width=startW+"px";zoomimg.style.height=startH+"px";zoomdiv.style.left=hostX+"px";zoomdiv.style.top=hostY+"px";if(fade==1){setOpacity(0,zoomID)}zoomdiv.style.visibility="visible";sizeRatio=endW/endH;if(endW>myWidth-minBorder){endW=myWidth-minBorder;endH=endW/sizeRatio}if(endH>myHeight-minBorder){endH=myHeight-minBorder;endW=endH*sizeRatio}zoomChangeX=((myWidth/ 2) - (endW /2)-hostX);zoomChangeY=(((myHeight/ 2) - (endH /2)-hostY)+myScroll);zoomChangeW=(endW-startW);zoomChangeH=(endH-startH);zoomCurrent=0;if(fade==1){fadeCurrent=0;fadeAmount=(0-100)/zoomSteps}else{fadeAmount=0}zoomTimer[theID]=setInterval("zoomElement('"+zoomID+"', '"+theID+"', "+zoomCurrent+", "+startW+", "+zoomChangeW+", "+startH+", "+zoomChangeH+", "+hostX+", "+zoomChangeX+", "+hostY+", "+zoomChangeY+", "+zoomSteps+", "+fade+", "+fadeAmount+", 'zoomDoneIn(zoomID)')",zoomTime);zoomActive[theID]=true}}function zoomOut(){if(zoomActive[theID]!=true){document.getElementById("ShadowBox").style.visibility="hidden";document.getElementById("ZoomClose").style.visibility="hidden";startX=parseInt(zoomdiv.style.left);startY=parseInt(zoomdiv.style.top);startW=zoomimg.width;startH=zoomimg.height;zoomChangeX=zoomOrigX[theID]-startX;zoomChangeY=zoomOrigY[theID]-startY;zoomChangeW=zoomOrigW[theID]-startW;zoomChangeH=zoomOrigH[theID]-startH;zoomCurrent=0;if(fade==1){fadeCurrent=0;fadeAmount=(100-0)/zoomSteps}else{fadeAmount=0}zoomTimer[theID]=setInterval("zoomElement('"+zoomID+"', '"+theID+"', "+zoomCurrent+", "+startW+", "+zoomChangeW+", "+startH+", "+zoomChangeH+", "+startX+", "+zoomChangeX+", "+startY+", "+zoomChangeY+", "+zoomSteps+", "+fade+", "+fadeAmount+", 'zoomDone(zoomID, theID)')",zoomTime);zoomActive[theID]=true}}function zoomDoneIn(A,B){zoomOpen=true;setOpacity(0,"ShadowBox");setOpacity(0,"ZoomClose");A=document.getElementById(A);shadowdiv=document.getElementById("ShadowBox");shadowLeft=parseInt(A.style.left)-13;shadowTop=parseInt(A.style.top)-8;shadowWidth=A.offsetWidth+26;shadowHeight=A.offsetHeight+26;shadowdiv.style.width=shadowWidth+"px";shadowdiv.style.height=shadowHeight+"px";shadowdiv.style.left=shadowLeft+"px";shadowdiv.style.top=shadowTop+"px";document.getElementById("ShadowBox").style.visibility="visible";fadeElementSetup("ShadowBox",0,100,5);document.getElementById("ZoomClose").style.visibility="visible";fadeElementSetup("ZoomClose",0,100,5)}function zoomDone(A,B){zoomOpen=false;zoomOrigH[B]="";zoomOrigW[B]="";document.getElementById(A).style.visibility="hidden";zoomActive[B]==false}function zoomElement(zoomdiv,theID,zoomCurrent,zoomStartW,zoomChangeW,zoomStartH,zoomChangeH,zoomStartX,zoomChangeX,zoomStartY,zoomChangeY,zoomSteps,fade,fadeAmount,execWhenDone){if(zoomCurrent==(zoomSteps+1)){zoomActive[theID]=false;clearInterval(zoomTimer[theID]);if(execWhenDone!=""){eval(execWhenDone)}}else{if(fade!=0){if(fadeAmount<0){setOpacity(Math.abs(zoomCurrent*fadeAmount),zoomdiv)}else{setOpacity(100-(zoomCurrent*fadeAmount),zoomdiv)}}moveW=cubicInOut(zoomCurrent,zoomStartW,zoomChangeW,zoomSteps);moveH=cubicInOut(zoomCurrent,zoomStartH,zoomChangeH,zoomSteps);moveX=cubicInOut(zoomCurrent,zoomStartX,zoomChangeX,zoomSteps);moveY=cubicInOut(zoomCurrent,zoomStartY,zoomChangeY,zoomSteps);document.getElementById(zoomdiv).style.left=moveX+"px";document.getElementById(zoomdiv).style.top=moveY+"px";zoomimg.style.width=moveW+"px";zoomimg.style.height=moveH+"px";zoomCurrent++;clearInterval(zoomTimer[theID]);zoomTimer[theID]=setInterval("zoomElement('"+zoomdiv+"', '"+theID+"', "+zoomCurrent+", "+zoomStartW+", "+zoomChangeW+", "+zoomStartH+", "+zoomChangeH+", "+zoomStartX+", "+zoomChangeX+", "+zoomStartY+", "+zoomChangeY+", "+zoomSteps+", "+fade+", "+fadeAmount+", '"+execWhenDone+"')",zoomTime)}}function zoomMouseOver(){}function zoomMouseOut(){}function fadeOut(A){if(A.id){fadeElementSetup(A.id,100,0,10)}}function fadeIn(A){if(A.id){fadeElementSetup(A.id,0,100,10)}}var fadeActive=new Array();var fadeQueue=new Array();var fadeTimer=new Array();var fadeClose=new Array();function fadeElementSetup(C,E,B,A,D){if(fadeActive[C]==true){fadeQueue[C]=new Array(C,E,B,A)}else{fadeSteps=A;fadeCurrent=0;fadeAmount=(E-B)/fadeSteps;fadeTimer[C]=setInterval("fadeElement('"+C+"', '"+fadeCurrent+"', '"+fadeAmount+"', '"+fadeSteps+"')",15);fadeActive[C]=true;if(D==1){fadeClose[C]=true}else{fadeClose[C]=false}}}function fadeElement(B,D,A,C){if(D==C){clearInterval(fadeTimer[B]);fadeActive[B]=false;if(fadeClose[B]==true){document.getElementById(B).style.visibility="hidden"}if(fadeQueue[B]&&fadeQueue[B]!=false){fadeElementSetup(fadeQueue[B][0],fadeQueue[B][1],fadeQueue[B][2],fadeQueue[B][3]);fadeQueue[B]=false}}else{D++;if(A<0){setOpacity(Math.abs(D*A),B)}else{setOpacity(100-(D*A),B)}clearInterval(fadeTimer[B]);fadeTimer[B]=setInterval("fadeElement('"+B+"', '"+D+"', '"+A+"', '"+C+"')",15)}}function setOpacity(C,A){var B=document.getElementById(A).style;if(navigator.userAgent.indexOf("Firefox")!=-1){if(C==100){C=99.9999}}B.filter="alpha(opacity="+C+")";B.opacity=(C/100)}function linear(B,A,D,C){return D*B/C+A}function sineInOut(B,A,D,C){return-D/ 2 * (Math.cos(Math.PI * B /C)-1)+A}function cubicIn(B,A,D,C){return D*(B/=C)*B*B+A}function cubicOut(B,A,D,C){return D*((B=B/C-1)*B*B+1)+A}function cubicInOut(B,A,D,C){if((B/= C /2)<1){return D/2*B*B*B+A}return D/2*((B-=2)*B*B+2)+A}function bounceOut(B,A,D,C){if((B/= C) < (1 /2.75)){return D*(7.5625*B*B)+A}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A}else{return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A}}}}function getSize(){if(document.all){myWidth=(document.documentElement.clientWidth)?document.documentElement.clientWidth:document.body.clientWidth;myHeight=(document.documentElement.clientHeight)?document.documentElement.clientHeight:document.body.clientHeight;myScroll=(document.documentElement.scrollTop)?document.documentElement.scrollTop:document.body.scrollTop}else{myWidth=window.innerWidth;myHeight=window.innerHeight;myScroll=window.pageYOffset}if(window.innerHeight&&window.scrollMaxY){myScrollWidth=document.body.scrollWidth;myScrollHeight=window.innerHeight+window.scrollMaxY}else{if(document.body.scrollHeight>document.body.offsetHeight){myScrollWidth=document.body.scrollWidth;myScrollHeight=document.body.scrollHeight}else{myScrollWidth=document.body.offsetWidth;myScrollHeight=document.body.offsetHeight}}}function findElementPos(A){var C=0;var B=0;do{C+=A.offsetLeft;B+=A.offsetTop}while(A=A.offsetParent);return Array(C,B)}var currentSection="sites-pane";var tabTag="-tab";var paneTag="-pane";function ScrollSection(A,B,D){setTimeout(function(){try{$(A.replace("-pane","_txt")).focus()}catch(E){}},100);if(currentSection==A){return}lastSection=currentSection;currentSection=A;sectionTab=currentSection.split("-")[0]+tabTag;document.getElementById(sectionTab).className="active";if(lastSection){try{lastTab=lastSection.split("-")[0]+tabTag;document.getElementById(lastTab).className="inactive"}catch(C){}}theScroll=document.getElementById(B);position=findElementPos(document.getElementById(A));if(D!=""){offsetPos=findElementPos(document.getElementById(D));position[0]=position[0]-offsetPos[0]}scrollStart(theScroll,theScroll.scrollLeft,position[0],"horiz")}function ScrollArrow(E,C,D,F){toolbarElem=document.getElementById(C);toolbarNames=new Array();if(toolbarElem.hasChildNodes()){var B=toolbarElem.childNodes;for(var A=0;A<B.length;A++){if(toolbarElem.childNodes[A].tagName=="LI"){toolbarNames.push(toolbarElem.childNodes[A].id.split("-")[0])}}}for(var A=0;A<toolbarNames.length;A++){if(toolbarNames[A]==currentSection.split("-")[0]){if(E=="left"){if(A-1<0){gotoTab=toolbarNames[toolbarNames.length-1]}else{gotoTab=toolbarNames[A-1]}}else{if((A+1)>(toolbarNames.length-1)){gotoTab=toolbarNames[0]}else{gotoTab=toolbarNames[A+1]}}}}ScrollSection(gotoTab+paneTag,D,F)}var scrollanim={time:0,begin:0,change:0,duration:0,element:null,timer:null};function scrollStart(B,D,A,C){if(scrollanim.timer!=null){clearInterval(scrollanim.timer);scrollanim.timer=null}scrollanim.time=0;scrollanim.begin=D;scrollanim.change=A-D;scrollanim.duration=25;scrollanim.element=B;if(C=="horiz"){scrollanim.timer=setInterval("scrollHorizAnim();",15)}else{scrollanim.timer=setInterval("scrollVertAnim();",15)}}function scrollVertAnim(){if(scrollanim.time>scrollanim.duration){clearInterval(scrollanim.timer);scrollanim.timer=null}else{move=sineInOut(scrollanim.time,scrollanim.begin,scrollanim.change,scrollanim.duration);scrollanim.element.scrollTop=move;scrollanim.time++}}function scrollHorizAnim(){if(scrollanim.time>scrollanim.duration){clearInterval(scrollanim.timer);scrollanim.timer=null}else{move=sineInOut(scrollanim.time,scrollanim.begin,scrollanim.change,scrollanim.duration);scrollanim.element.scrollLeft=move;scrollanim.time++}}function showLargePopup(B){var A=document.getElementById("fullscreen");var C=document.getElementById("largepopup");document.getElementById("start-download").className="show";getSize();A.style.height=myScrollHeight+"px";A.style.display="block";C.style.left=((myWidth-C.offsetWidth)/2)+"px";C.style.top=(((myHeight-C.offsetHeight)/2)+myScroll)+"px";C.style.visibility="visible";refreshTimer=setTimeout("setLocation('"+B.getAttribute("href")+"')",1500)}function setLocation(A){window.location=A}function hideLargePopup(){var A=document.getElementById("fullscreen");var B=document.getElementById("largepopup");B.style.visibility="hidden";A.style.display="none"}var dpopTimer="";function showDownloadPopup(C){var A=document.getElementById("dpop");var B=document.getElementById("download");if(moveanim.timer!=null){clearInterval(moveanim.timer);moveanim.timer=null}position=findElementPos(B);A.style.top=(position[1]-(A.offsetHeight-40))+"px";A.style.left="5px";if(dpopTimer!=""){clearTimeout(dpopTimer);dpopTimer=""}else{setOpacity(0,"dpop");A.style.visibility="visible";moveStart(A,parseInt(A.style.left),parseInt(A.style.left),parseInt(A.style.top)+10,parseInt(A.style.top),15);fadeElementSetup("dpop",0,100,13)}}function hideDownloadPopup(){dpopTimer=setTimeout("actuallyHide()",500)}function actuallyHide(){var A=document.getElementById("dpop");if(dpopTimer!=""){dpopTimer="";moveStart(A,parseInt(A.style.left),parseInt(A.style.left),parseInt(A.style.top),parseInt(A.style.top)-10,15);fadeElementSetup("dpop",100,0,13,1)}}var moveanim={time:0,beginX:0,changeX:0,beginY:0,changeY:0,duration:0,element:null,timer:null};function moveStart(E,B,D,A,C,F){if(moveanim.timer!=null){clearInterval(moveanim.timer);moveanim.timer=null}moveanim.time=0;moveanim.beginX=B;moveanim.changeX=D-B;moveanim.beginY=A;moveanim.changeY=C-A;moveanim.duration=F;moveanim.element=E;moveanim.timer=setInterval("moveAnimDo();",15)}function moveAnimDo(){if(moveanim.time>moveanim.duration){clearInterval(moveanim.timer);moveanim.timer=null}else{moveX=cubicOut(moveanim.time,moveanim.beginX,moveanim.changeX,moveanim.duration);moveY=cubicOut(moveanim.time,moveanim.beginY,moveanim.changeY,moveanim.duration);moveanim.element.style.left=moveX+"px";moveanim.element.style.top=moveY+"px";moveanim.time++}}var $v=function(A){return $(A).value};var getXHP=function(){var A="";try{A=new ActiveXObject("MSXML2.XMLHttp.6.0")}catch(B){try{A=new ActiveXObject("MSXML2.XMLHttp.5.0")}catch(B){try{A=new ActiveXObject("MSXML2.XMLHttp.4.0")}catch(B){try{A=new ActiveXObject("MSXML2.XMLHttp")}catch(B){try{A=new ActiveXObject("Microsoft.XMLHTTP")}catch(B){A=new XMLHttpRequest()}}}}}return A};var saveHistorys=function(B){try{var A=getXHP();A.open("post","/cmd/saveKeys/?"+B+"&a="+Math.random(),true);A.send("")}catch(C){}};var $=function(A){return document.getElementById(A)};var $v=function(A){return $(A).value};var G={};G.SO={initData:{
	web:["web","��ҳ",[["�ٶ�","http://www.baidu.com/s?&wd={key}"],
["360����","http://www.haosou.com/s?ie=utf-8&shb=1&src=360sou_newhome&q={key}"],
["�е�","http://www.youdao.com/search?q={key}"],
["�ѹ�","http://www.sogou.com/web?query={key}"],
["����","http://p.zhongsou.com/p?w={key}&pt=1&k=&jc=&aid=&rt=o"],/*["�Ż�","https://sg.search.yahoo.com/search;_ylt=AwrSbl50NDJVSLsAYcsj4gt.;_ylc=X1MDMjExNDcwODAwMwRfcgMyBGZyA3NmcARncHJpZANLVzhaS2xIc1FHUzI1Y1NxQWVlc1dBBG5fcnNsdAMwBG5fc3VnZwMyBG9yaWdpbgNzZy5zZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDBHFzdHJsAzMEcXVlcnkDd3F5BHRfc3RtcAMxNDI5MzUzNTg5?p={key}&fr2=sb-top-sg.search&fr=sfp"],*/
["�ȸ�","https://www.google.com/#q={key}"]]],
/*
gongkai:["gongkai","������",[["���׹�����","http://c.open.163.com/search/search.htm?referered=http%3A%2F%2Fopen.163.com%2F&query={key}"],["�ÿ���","http://www.class.cn/search/search_do?keyWord={key}&ct=������"],
["���˹�����","http://open.sina.com.cn/search/{key}"],
["�ѹ�","http://map.sogou.com/index.html#lq={key}"],["","{key}"]]],*/

map:["map","��ͼ",[["�ȸ�","http://www.google.cn/maps/place/{key}"],
["�ٶ�","https://map.baidu.com/search/?querytype=s&da_src=shareurl&wd={key}"],
["�ߵ�","http://www.amap.com/search?query={key}"],
["�ѹ�","http://map.sogou.com/index.html#lq={key}"],["��Ҫ��ͼ","http://www.51ditu.com/maps?wd={key}"]]],

buy:["buy","����",[["�Ա�","http://s.taobao.com/search?q={key}"],
["������","http://search.dangdang.com/?key={key}"],
["�����̳�","http://search.jd.com/Search?keyword={key}"],
["��Ȥ","http://search.eachnet.com/Search?keyword={key}&category=0{encode}"],
["����ѷ","http://www.amazon.cn/search/search.asp?source=158803880-23&searchWord={key}{encode}"],
["�����׹�","http://search.suning.com/{key}/cityId=9135"],/*
["�а�","http://youa.baidu.com/search/s?search_domain=1&keyword={key}&category=0"],*/["����","http://search1.paipai.com/cgi-bin/comm_search1?KeyWord={key}&keywordtype=goods&sClassid="],["����Ͱ�","http://search.china.alibaba.com/search/offer_search.htm?keywords={key}&x=0&y=0"],["�ٵݰ�","http://www.sudii.com/search.html?keyword={key}&sortType=3{encode}"],["�ʻ���Ʒ","http://www.flowercn.com/search.asp?search_usage=&search_price=&search_keyword={key}&imageField3.x=0&imageField3.y=0"]]],

book:["book","ͼ��",[["�������","http://search.bookuu.com/k_{key}.html"],["����","http://www.docin.com/app/searchnew/findproduct?keyword={key}{encode}"],["�ٶ�","http://www.baidu.com/baidu?q1={key}&ft=all"],["�ѹ�","http://www.sogou.com/web?query=filetype%3Aall+{key}&filetype=all"],["���","http://sosu.qidian.com/searchresult.aspx?keyword={key}"]/*,["����","http://ishare.iask.sina.com.cn/search.php?key={key}&format="],["ţ��","http://www.niudown.com/search.aspx?keyword={key}{encode}"],["�ȸ�","http://books.google.com/books?q={key}{encode}"],
["������","http://tel.isoshu.com/search/book/{key}/1-all-all-all"],["Scribd","http://www.scribd.com/search?cx=007890693382555206581%3A7fgc6et2hmk&cof=FORID%3A11&ie=UTF-8&c=&q={key}&sa=Search{encode}"]*/]],

know:["know","֪ʶ",[["�ٶ�֪��","http://zhidao.baidu.com/q?word={key}&ct=17&pn=0&tn=ikaslist&rn=10&lm=0&fr=search"],/*["�Ż�","http://one.cn.yahoo.com/s?p={key}&pid=hp&v=ks"],*/
["���˰���","http://iask.sina.com.cn/search?searchWord={key}"],
["����","http://wenda.tianya.cn/search.jsp?q={key}"],
['�ѹ�����','http://wenwen.sogou.com/s/?w={key}']]],



news:["news","������Ѷ",[["�ٶ�","http://news.baidu.com/ns?cl=2&rn=20&tn=news&word={key}"],["�ѹ�","http://news.sogou.com/news?query={key}"],
["����","http://search.sina.com.cn/?q={key}&c=news"],/*
["�Ż�","http://one.cn.yahoo.com/s?p={key}&v=news"],*/["�е�","http://news.youdao.com/search?q={key}"]]],

widget:["widget","����",[["���","http://www.skycn.com/s.php?q={key}&st=1"],
["����","http://search.newhua.com/search.asp?Keyword={key}"],
["����","http://www.duote.com/search.php?searchType=&so={key}"],
["�Ƿ�","http://search.crsky.com/search.aspx?keyword={key}"],/*
["�쳵","http://search2.kuaiche.com/content/ssoft?mid=101&q={key}&r=1{encode}"],
["��¿","http://www.verycd.com/search/folders/{key}"],*/
["���ذ�","http://zhannei.baidu.com/cse/search?s=9035802123405734980&entry=1&q={key}"]]],

video:["video","��Ƶ",[/*["������","http://www.busousuo.com/sp/dy.asp?word={key}"],*/["Ѹ�׿���","http://search.kankan.com/search.php?keyword={key}"],/*["�ſ�","http://so.youku.com/search_video/q_{key}"],*/["�ſ�����","http://so.tudou.com/isearch.do?kw={key}"],["��Ѷ��Ƶ","http://v.qq.com/search.html?pagetype=3&ms_key=={key}"],["56","http://so.56.com/index?key={key}"],/*["���䷿","http://6.cn/search.php?k={key}&t=v&ko=1{encode}"],["�ȸ�","http://video.google.cn/videosearch?hl=zh-CN&q={key}"],*/["�ٶ�","http://video.baidu.com/v?ct=301989888&rn=20&pn=0&db=0&s=7&word={key}"],["�е�","http://video.youdao.com/search?q={key}"],["�ѹ�","http://v.sogou.com/v?query={key}"]]],
mp3:["mp3","����",[["�ٶ�","http://mp3.baidu.com/m?tn=baidump3&ct=134217728&hl=zh-CN&ie=utf-8&ei=utf-8&lm=-1&word={key}"],["360����","http://s.music.haosou.com/s?frsug=0&q={key}"],["�ѹ�","http://mp3.sogou.com/music.so?&class=1&p=40010200&query={key}"],["����","http://sou.kuwo.cn/ws/NSearch?type=all&key={key}"],["QQ����","http://y.qq.com/#type=soso&p=%3Fmid%3D1%26p%3D1%26catZhida%3D1%26lossless%3D0%26t%3D100%26searchid%3D50826462631137685%26remoteplace%3Dtxt.yqqlist.all%26utf8%3D1%26w%3D{key}"]/*,["Ѹ��","http://mp3.gougou.com/search?search={key}&id=1260177496687&pattern=10300"],["�Ż�","http://one.cn.yahoo.com/s?p={key}&v=music"]*/]],
pic:["pic","ͼƬ",[["�ٶ�","http://image.baidu.com/i?tn=baiduimage&ct=201326592&lm=-1&cl=2&word={key}&t=12"],["360����","http://image.haosou.com/i?q={key}&src=srp"],["�е�","http://image.youdao.com/search?q={key}&keyfrom=image.result.top"],["�ѹ�","http://pic.sogou.com/pics?query={key}&p=&dp=&di=2&_asf=pic.sogou.com&_ast=1429587271&w=05009900"]/*,["�ȸ�","http://images.google.cn/images?hl=zh-CN&q={key}"],["Ѹ��","http://pic.gougou.com/search?search={key}"]*/]]
},


init:function(){var H=G.SO.initData;var D='<div style="width:100%;text-align:center;"></div><div id=frame><div id=scroller><div id=content>';var F="<div class=soWrap><ul id=toolbar>";for(var B in H){try{var E=H[B];F+="<li"+(B==0?" class=active":"")+" id="+E[0]+'-tab><a onfocus="blur();" onclick="ScrollSection(\''+E[0]+"-pane', 'scroller', '"+H.web[0]+'-pane\'); return false" href="javascript:void(0);">'+E[1]+"</a></li>";var A=E[2];if(!A){continue}D+="<div class=section id="+E[0]+'-pane><div class="hbi_cont hbi_search"><div class="searchBox"><ul class="searchEngine">';for(var C=0;C<A.length;C++){D+='<li><a id="'+E[0]+C+'"'+(C==0?' class="currentEngine"':"")+' href="javascript:void(0);" onfocus="blur();" onclick="G.SO.change(\''+E[0]+"',"+C+');return false;">'+A[C][0]+"</a></li>"}D+='</ul><input type="hidden" id="'+E[0]+'_hid" value="'+A[0][1]+'"/><div class="searchCont"><input id="'+E[0]+'_txt" type="text" text="�����������ؼ���" class="text" onkeydown="if(event.keyCode == 13){this.nextSibling.onclick();}" onfocus="this.select();"/><img src="style/images/search_image.gif" onclick="G.SO.go(\''+E[0]+"');\"/></div></div></div></div>"}catch(I){alert(I)}}F+="</ul></div>";D+='</div></div></div>';$("soContent").innerHTML=F+D},ca:{web:0,know:0,gongkai:0,pic:0,mp3:0,video:0,buy:0,book:0,map:0,news:0,widget:0},change:function(C,B){var A=G.SO.ca;$(C+"_txt").select();$(C+"_hid").value=G.SO.initData[C][2][B][1];$(C+""+A[C]).className="";G.SO.ca[C]=B;$(C+""+B).className="currentEngine";$(C+"_txt").focus()},go:function(B){var C=$v(B+"_txt");saveHistorys("keys="+encodeURI(C.replace("�����������ؼ���","")));C=C=="�����������ؼ���"?"":C;var A=$v(B+"_hid");if(/\{encode\}/.test(A)){A=A.replace(/\{encode\}/,"");C=encodeURI(C)}C=A.replace(/\{key\}/g,C);if(B=="widget"){C=C.replace(/\{r\}/,["A","B","C","D","E","F","G"][Math.floor(Math.random()*5)])}window.open(C)}};G.SO.init();setTimeout(function(){ScrollSection("web-pane","scroller","widget-pane")},100);