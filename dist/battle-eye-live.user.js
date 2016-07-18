// ==UserScript==
// @name        Battle Eye Live
// @namespace   battle-eye-live
// @author      Industrials / Raideer
// @homepage    https://github.com/raideer
// @description LIVE battlefield statistics
// @include     http*://www.erepublik.com/*/military/battlefield-new/*
// @version     1.1.4-a
// @require     https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js
// @run-at      document-idle
// @grant       unsafeWindow
// @grant       GM_info
// @grant       GM_addStyle
// ==/UserScript==

"use strict";function _possibleConstructorReturn(e,i){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?e:i}function _inherits(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(e,i):e.__proto__=i)}function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}var _get=function e(i,t,s){null===i&&(i=Function.prototype);var n=Object.getOwnPropertyDescriptor(i,t);if(void 0===n){var l=Object.getPrototypeOf(i);return null===l?void 0:e(l,t,s)}if("value"in n)return n.value;var a=n.get;if(void 0!==a)return a.call(s)},_createClass=function(){function e(e,i){for(var t=0;t<i.length;t++){var s=i[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(i,t,s){return t&&e(i.prototype,t),s&&e(i,s),i}}(),DpsHandler=function(){function e(i){_classCallCheck(this,e),this.rememberDpsFor=i,this.hitHistory=new HitHistory(1e3*i),this.hitStreakSeconds=0,this.lastHit=0,this.dps=0}return _createClass(e,[{key:"addHit",value:function(e){this.lastHit=(new Date).getTime(),this.hitHistory.add(e)}},{key:"updateDps",value:function(e){var i=this.hitHistory.getTotal();this.hitStreakSeconds<this.rememberDpsFor&&this.hitStreakSeconds++,this.dps=Math.round(i/this.hitStreakSeconds),e.time-this.lastHit>=1e4&&(this.hitHistory.clear(),this.hitStreakSeconds=0)}}]),e}(),Divisions=function(){function e(){_classCallCheck(this,e),this.div1=new DivisionStats(1),this.div2=new DivisionStats(2),this.div3=new DivisionStats(3),this.div4=new DivisionStats(4)}return _createClass(e,[{key:"handle",value:function(e){this.div1.handle(e),this.div2.handle(e),this.div3.handle(e),this.div4.handle(e)}},{key:"updateDps",value:function(e){this.div1.updateDps(e),this.div2.updateDps(e),this.div3.updateDps(e),this.div4.updateDps(e)}},{key:"toObject",value:function(){return{div1:this.div1.toObject(),div2:this.div2.toObject(),div3:this.div3.toObject(),div4:this.div4.toObject()}}}]),e}(),DivisionStats=function(e){function i(e){_classCallCheck(this,i);var t=_possibleConstructorReturn(this,Object.getPrototypeOf(i).call(this,10));return t.division=e,t.hits=0,t.damage=0,t}return _inherits(i,e),_createClass(i,[{key:"handle",value:function(e){e.division==this.division&&(this.addHit(e.msg.damage),this.hits++,this.damage+=e.msg.damage)}},{key:"toObject",value:function(){return{damage:this.damage,id:this.id,dps:this.dps,hits:this.hits,avgHit:Math.round(this.damage/this.hits)}}}]),i}(DpsHandler),EventHandler=function(){function e(){_classCallCheck(this,e),this.events={}}return _createClass(e,[{key:"emit",value:function(e,i){this.events[e]&&this.events[e].forEach(function(e){return e(i)})}},{key:"on",value:function(e,i){this.events[e]=this.events[e]||[],this.events[e].push(i)}},{key:"off",value:function(e,i){if(this.events[e])for(var t in this.events[e]){var s=this.events[e][t];s==i&&this.events[e].splice(t,1)}}}]),e}(),HitHistory=function(){function e(){var i=arguments.length<=0||void 0===arguments[0]?3e4:arguments[0];_classCallCheck(this,e),this.rememberFor=i,this.history={}}return _createClass(e,[{key:"add",value:function(e){var i=(new Date).getTime();this.history[i]=e,this.trimOld(i)}},{key:"trimOld",value:function(){var e=arguments.length<=0||void 0===arguments[0]?(new Date).getTime():arguments[0];for(var i in this.history)e-i-this.rememberFor>0&&delete this.history[i]}},{key:"clear",value:function(){this.history={}}},{key:"getTotal",value:function(){this.trimOld();var e=0;for(var i in this.history)e+=this.history[i];return e}}]),e}(),Layout=function(){function e(i){_classCallCheck(this,e),Handlebars.registerHelper("percentage",function(e,i,t){var s=0,n=0;return e+i!=0&&(s=Math.round(100*e/(e+i)*10)/10,n=Math.round(100*i/(e+i)*10)/10),t.fn({a:s,b:n})}),Handlebars.registerHelper("number",function(e){return parseFloat(e).toLocaleString()}),this.template=Handlebars.compile(this.createLayout());var t=document.createElement("div");t.setAttribute("id","battle_eye_live"),document.getElementById("content").appendChild(t),i.load()}return _createClass(e,[{key:"update",value:function(e){null==e?e=this.lastData:this.lastData=e,e.version=GM_info.script.version;var i=this.template(e);document.getElementById("battle_eye_live").innerHTML=i}},{key:"createLayout",value:function(){var e='\n            <div class="text-left"><span class="bel-version">{{version}}</span> BATTLE EYE LIVE</div>\n            <div class="bel-grid">\n                <div class="bel-col-1-2 text-left" style="color:#27ae60;font-weight:700;font-size:1.3em;">\n                    {{teamAName}}\n                </div>\n                <div class="bel-col-1-2 text-right" style="color:#c0392b;font-weight:700;font-size:1.3em;">\n                    {{teamBName}}\n                </div>\n                <div class="bel-col-1-1 text-center bel-title">\n                    DIV 1\n                </div>\n                <div class="bel-col-1-3 text-right">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number left.divisions.div1.hits}} kills</span>\n                            <span class="bel-value">{{number left.divisions.div1.damage}}</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number left.divisions.div1.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number left.divisions.div1.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-center">\n                    <ul class="list-unstyled" style="font-weight:700;">\n                        <li>Total Damage</li>\n                        <!-- <li>Average Damage</li> -->\n                        <li>DPS</li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-left">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number right.divisions.div1.damage}}</span>\n                            <span class="bel-value">{{number right.divisions.div1.hits}} kills</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number left.divisions.div1.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number right.divisions.div1.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-1">\n                    <!-- <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div1.damage right.divisions.div1.damage}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div> -->\n                    <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div1.dps right.divisions.div1.dps}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div>\n                </div>\n\n                <div class="bel-col-1-1 text-center bel-title">\n                    DIV 2\n                </div>\n                <div class="bel-col-1-3 text-right">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number left.divisions.div2.hits}} kills</span>\n                            <span class="bel-value">{{number left.divisions.div2.damage}}</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number left.divisions.div2.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number left.divisions.div2.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-center">\n                    <ul class="list-unstyled" style="font-weight:700;">\n                        <li>Total Damage</li>\n                        <!-- <li>Average Damage</li> -->\n                        <li>DPS</li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-left">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number right.divisions.div2.damage}}</span>\n                            <span class="bel-value">{{number right.divisions.div2.hits}} kills</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number right.divisions.div2.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number right.divisions.div2.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-1">\n                    <!-- <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div2.damage right.divisions.div2.damage}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div> -->\n\n                    <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div2.dps right.divisions.div2.dps}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div>\n                </div>\n\n                <div class="bel-col-1-1 text-center bel-title">\n                    DIV 3\n                </div>\n                <div class="bel-col-1-3 text-right">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number left.divisions.div3.hits}} kills</span>\n                            <span class="bel-value">{{number left.divisions.div3.damage}}</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number left.divisions.div3.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number left.divisions.div3.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-center">\n                    <ul class="list-unstyled" style="font-weight:700;">\n                        <li>Total Damage</li>\n                        <!-- <li>Average Damage</li> -->\n                        <li>DPS</li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-left">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number right.divisions.div3.damage}}</span>\n                            <span class="bel-value">{{number right.divisions.div3.hits}} kills</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number right.divisions.div3.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number right.divisions.div3.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-1">\n                    <!-- <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div3.damage right.divisions.div3.damage}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div> -->\n\n                    <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div3.dps right.divisions.div3.dps}}\n                            <div class="bel-progress-bar" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div>\n                </div>\n\n                <div class="bel-col-1-1 text-center bel-title">\n                    DIV 4\n                </div>\n                <div class="bel-col-1-3 text-right">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number left.divisions.div4.hits}} kills</span>\n                            <span class="bel-value">{{number left.divisions.div4.damage}}</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number left.divisions.div4.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number left.divisions.div4.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-center">\n                    <ul class="list-unstyled" style="font-weight:700;">\n                        <li>Total Damage</li>\n                        <!-- <li>Average Damage</li> -->\n                        <li>DPS</li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-3 text-left">\n                    <ul class="list-unstyled">\n                        <li>\n                            <span class="bel-value">{{number right.divisions.div4.damage}}</span>\n                            <span class="bel-value">{{number right.divisions.div4.hits}} kills</span>\n                        </li>\n                        <!-- <li><span class="bel-value">{{number right.divisions.div4.avgHit}}</span></li> -->\n                        <li><span class="bel-value">{{number right.divisions.div4.dps}}</span></li>\n                    </ul>\n                </div>\n                <div class="bel-col-1-1">\n                    <!-- <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div4.damage right.divisions.div4.damage}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div> -->\n\n                    <div class="bel-progress">\n                        <div class="bel-progress-center-marker"></div>\n                        {{#percentage left.divisions.div4.dps right.divisions.div4.dps}}\n                            <div class="bel-progress-bar bel-teama" style="width: {{a}}%;"></div>\n                            <div class="bel-progress-bar bel-teamb" style="width: {{b}}%;"></div>\n                        {{/percentage}}\n                    </div>\n                </div>\n            </div>\n        ';return e}}]),e}(),Stats=function(e){function i(e){_classCallCheck(this,i);var t=_possibleConstructorReturn(this,Object.getPrototypeOf(i).call(this,10));return t.id=e,t.damage=0,t.hits=0,t.divisions=new Divisions,t}return _inherits(i,e),_createClass(i,[{key:"isSide",value:function(e){return this.id==e}},{key:"updateDps",value:function(e){_get(Object.getPrototypeOf(i.prototype),"updateDps",this).call(this,e),this.divisions.updateDps(e)}},{key:"handle",value:function(e){this.isSide(e.side)&&(this.divisions.handle(e),this.addHit(e.msg.damage),this.hits++,this.damage+=e.msg.damage)}},{key:"toObject",value:function(){return{damage:this.damage,id:this.id,dps:this.dps,hits:this.hits,avgHit:Math.round(this.damage/this.hits),divisions:this.divisions.toObject()}}}]),i}(DpsHandler),Stylesheet=function(){function e(){_classCallCheck(this,e),this.sheet="",this.addCSSRule("#battle_eye_live",'\n            width: 100%;\n            position:relative;\n            float:left;\n            padding:10px;\n            box-sizing: border-box;\n            border-radius:0px 0px 20px 20px;\n            background-color: #ffffff;\n            color: #34495e;\n            font-size:14px;\n            font-family: "Lato",\n            Helvetica,Arial,sans-serif;\n            text-align: center;\n            line-height: 1.7;\n        '),this.addCSSRule("#battle_eye_live *,#battle_eye_live *:after,#battle_eye_live *:before","-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;"),this.addCSSRule(".bel-value","background-color: #ecf0f1;padding: 2px 10px;border-radius: 4px;margin: 0 2px;"),this.addCSSRule(".text-center","text-align:center;"),this.addCSSRule(".text-left","text-align:left;"),this.addCSSRule(".text-right","text-align:right;"),this.addCSSRule(".bel-version","background-color: #34495e;color:#ecf0f1;padding: 3px 8px;border-radius:4px;margin-right:4px;"),this.addCSSRule(".bel-title","background-color: #ecf0f1;margin-bottom:2px;margin-top:5px;"),this.addCSSRule(".bel-grid:after",'content: "";display: table;clear: both;'),this.addCSSRule("[class*='bel-col-']","float: left;"),this.addCSSRule(".bel-col-1-1","width: 100%;"),this.addCSSRule(".bel-col-1-2","width: 50%;"),this.addCSSRule(".bel-col-1-4","width: 25%;"),this.addCSSRule(".bel-col-1-3","width: 33.3333%;"),this.addCSSRule(".bel-col-1-8","width: 12.5%;"),this.addCSSRule(".list-unstyled","list-style: outside none none;padding-left: 0;"),this.addCSSRule(".bel-progress","\n            height: 4px;\n            position: relative;\n            background: #ebedef none repeat scroll 0 0;\n            border-radius: 32px;\n            box-shadow: none;\n            margin-top: 2px;\n            overflow: hidden;\n        "),this.addCSSRule(".bel-teama","background-color: #27ae60;"),this.addCSSRule(".bel-teamb","background-color: #c0392b;"),this.addCSSRule(".bel-progress-bar","\n            box-shadow: none;\n            line-height: 12px;\n            color: #fff;\n            float: left;\n            font-size: 12px;\n            height: 100%;\n            line-height: 20px;\n            text-align: center;\n            transition: width 0.6s ease 0s;\n            width: 0;\n        "),this.addCSSRule(".bel-progress-center-marker","\n            border-right: 3px solid #ffffff;\n            height: 10px;\n            left: 50%;\n            margin-left: -2px;\n            opacity: 0.6;\n            position: absolute;\n        "),this.addCSSRule(".bel-hr","\n            -moz-border-bottom-colors: none;\n            -moz-border-left-colors: none;\n            -moz-border-right-colors: none;\n            -moz-border-top-colors: none;\n            border-color: #eee -moz-use-text-color -moz-use-text-color;\n            border-image: none;\n            border-style: solid none none;\n            border-width: 1px 0 0;\n            margin-bottom: 20px;\n        ")}return _createClass(e,[{key:"addCSSRule",value:function(e,i){this.sheet+=e+"{"+i+"}"}},{key:"load",value:function(){GM_addStyle(this.sheet)}}]),e}(),Utils=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"uid",value:function(){return("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)}}]),e}(),UTILS=new Utils,battleEyeLive={init:function(){console.log("Battle Eye INIT"),this.window=unsafeWindow,this.events=new EventHandler,this.teamA=new Stats(this.window.SERVER_DATA.leftBattleId),this.teamAName=this.window.SERVER_DATA.countries[this.window.SERVER_DATA.leftBattleId],this.teamB=new Stats(this.window.SERVER_DATA.rightBattleId),this.teamBName=this.window.SERVER_DATA.countries[this.window.SERVER_DATA.rightBattleId],this.overridePomelo(),this.layout=new Layout(new Stylesheet),this.runTicker(),this.handleEvents()},getTeamStats:function(){return{teamAName:this.teamAName,teamBName:this.teamBName,left:this.teamA.toObject(),right:this.teamB.toObject()}},runTicker:function(){var e=this,i=0,t=function(){i++;var t={second:i,time:(new Date).getTime()};e.events.emit("tick",t)};e.interval=setInterval(t,1e3)},handleEvents:function(){var e=this;e.events.on("tick",function(i){e.teamA.updateDps(i),e.teamB.updateDps(i),e.layout.update(e.getTeamStats())})},overridePomelo:function(){var e=this,i=function(i){"Maximum"!==e.window.currentPlayerDisplayRateValue?e.window.battleFX.checkPlayerDisplayRate(e.window.currentPlayerDisplayRateValue)&&e.window.battleFX.populatePlayerData(i):e.window.battleFX.populatePlayerData(i),e.handle(i)};e.window.pomelo.on("onMessage",exportFunction(i,unsafeWindow))},handle:function(e){this.teamA.handle(e),this.teamB.handle(e),this.layout.update(this.getTeamStats())}};setTimeout(function(){function e(){var e=document.getElementById("cometchat_base");if(null!=e){var t="width:auto;position:aboslute;right:0;background:none;";e.setAttribute("style",t),clearInterval(i)}}battleEyeLive.init();var i=setInterval(e,500)},2e3);