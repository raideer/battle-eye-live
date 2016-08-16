class Stylesheet{
    constructor(){
        this.sheet = "";

        this.sheet += `
            @keyframes bel-pulse {
                0% {
                    border-color: #27ae60;
                }

                10% {
                    border-color: #2ecc71;
                }

                100% {
                    border-color: #27ae60;
                }
            }
        `;

        this.addCSSRule('.clearfix:after', `
            content: "";
            display: table;
            clear: both;
        `);

        //General
        this.addCSSRule('.bel-country', `
            width: 28px;
            height: 25px;
            margin-bottom: -5px;
            margin-left: 5px;
            margin-right: 5px;
            display: inline-block;
        `);

        this.addCSSRule("#battle_eye_live", `
            width: 100%;
            position:relative;
            float:left;
            padding:10px;
            box-sizing: border-box;
            border-radius:0px 0px 20px 20px;
            background-color: #ffffff;
            color: #34495e;
            font-size:14px;
            font-family: "Lato",Helvetica,Arial,sans-serif;
            text-align: center;
            line-height: 1.7;
        `);

        this.addCSSRule('.color-silver', 'color: #bdc3c7');

        this.addCSSRule('.pull-left', 'float:left;');
        this.addCSSRule('.pull-right', 'float:right;');

        this.addCSSRule('#battle_eye_live *,#battle_eye_live *:after,#battle_eye_live *:before',
            '-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;');
        this.addCSSRule(".bel-value", `
            display: inline-block;
            line-height: 1.2;
            background-color: #ecf0f1;
            padding: 2px 10px;
            border-radius: 4px;
            margin: 0 2px 2px 2px;
        `);
        this.addCSSRule(".bel-value-hl", `
            animation: bel-pulse 5s infinite;
            border: 1px solid #27ae60;
        `);
        this.addCSSRule(".text-center", "text-align:center;");
        this.addCSSRule(".text-left", "text-align:left;");
        this.addCSSRule(".text-right", "text-align:right;");
        this.addCSSRule('.bel-version', 'background-color: #34495e;color:#ecf0f1;padding: 3px 8px;border-radius:4px;margin-right:4px;');
        this.addCSSRule('.bel-version-outdated', 'background-color: #e74c3c;');
        this.addCSSRule('.bel-title', 'background-color: #ecf0f1;margin-bottom:2px;margin-top:5px;');
        this.addCSSRule('.bel-titles', `
            font-weight: 700;
        `);
        this.addCSSRule('.bel-text-tiny', 'font-size:10px;');
        this.addCSSRule('.bel-highlight-title', `
            background-color: #34495e;
            color: #fff;
        `);
        this.addCSSRule('.bel-highlight', `
            color: #34495e;
        `);
        //Grids
        this.addCSSRule('.bel-grid:after', 'content: "";display: table;clear: both;');
        this.addCSSRule("[class*='bel-col-']", 'float: left;');
        this.addCSSRule('.bel-col-1-1', 'width: 100%;');
        this.addCSSRule('.bel-col-1-2', 'width: 50%;');
        this.addCSSRule('.bel-col-1-4', 'width: 25%;');
        this.addCSSRule('.bel-col-1-3', 'width: 33.3333%;');
        this.addCSSRule('.bel-col-1-8', 'width: 12.5%;');
        //Lists
        this.addCSSRule('.list-unstyled', 'list-style: outside none none;padding-left: 0;');
        this.addCSSRule('.list-inline li', 'display: inline-block;');

        //Settings
        this.addCSSRule('.bel-settings', `
            z-index: 100;
            position: absolute;
            width: 100%;
            opacity: 0.95;
            top: 0;
            left: 0;
            background-color: #ffffff;
            padding: 14px;
            text-align: left;
            overflow-y: scroll;
            height: 100%;
            min-height: 500px;

        `);

        this.addCSSRule('.bel-settings-group', `
            background-color: #34495e;
            color: #ecf0f1;
            padding-left: 10px;
        `);

        this.addCSSRule('.bel-settings-container', `
            padding-left: 5px;
        `);

        this.addCSSRule('.bel-settings-field', `
            margin-right: 3px;
        `);

        this.addCSSRule('.bel-field-description', `
            font-size: 12px;
            color: #95a5a6;
        `);

        this.addCSSRule('.bel-checkbox', `
            padding: 5px 3px;
            border-bottom: 1px solid #ecf0f1;
        `);

        this.addCSSRule('.bel-hidden',`
            display: none;
        `)

        //Button
        this.addCSSRule('.bel-btn', `
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: none !important;
            cursor: pointer;
            font-size: 13px;
            font-weight: normal;
            margin-bottom: 0;
            text-align: center;
            border-radius: 4px;
            padding: 3px 8px;
            font-family: "Lato",Helvetica,Arial,sans-serif;
        `);
        //
        // this.addCSSRule('.bel-btn-alert-success', `
        //     position: relative;
        //     overflow: hidden;
        // `);
        //
        // this.addCSSRule('.bel-btn-alert-success:after', `
        //     content: " ";
        //     position: absolute;
        //     width: 100%;
        //     height: 100%;
        //     top: -100%;
        //     left: 0;
        //     transition: top 1s;
        //     background-color: #27ae60;
        // `);
        //
        // this.addCSSRule('.bel-btn-alert-success.active:after', `
        //     top: 0;
        // `);

        this.addCSSRule('a.bel-btn', `
            padding: 4px 8px;
        `);

        this.addCSSRule('.bel-btn-default', `
            background-color: #1abc9c;
            color: #ffffff;
        `);

        this.addCSSRule('.bel-btn-default:hover', `
            background-color: #16a085;
        `);

        this.addCSSRule('.bel-btn-danger', `
            background-color: #e74c3c;
            color: #ffffff;
        `);

        this.addCSSRule('.bel-btn-danger:hover', `
            background-color: #c0392b;
        `);

        this.addCSSRule('.bel-btn-inverse', `
            background-color: #2c3e50;
            color: #ffffff;
        `);

        this.addCSSRule('.bel-btn-inverse:hover', `
            background-color: #34495e;
        `);

        this.addCSSRule('.bel-btn-info', `
            background-color: #2980b9;
            color: #ffffff;
        `);

        this.addCSSRule('.bel-btn-info:hover', `
            background-color: #3498db;
        `);


        //Header menu
        this.addCSSRule('.bel-header-menu', 'margin-bottom: 10px;');
        this.addCSSRule('.bel-header-menu li', 'padding: 0 5px;');

        //Team colors
        this.addCSSRule('.bel-teama', 'background-color: #27ae60;');
        this.addCSSRule('.bel-teamb', 'background-color: #c0392b;');
        this.addCSSRule('.bel-teama-color', 'color: #27ae60;');
        this.addCSSRule('.bel-teamb-color', 'color: #c0392b;');

        //Progress bars
        this.addCSSRule('.bel-progress', `
            height: 4px;
            position: relative;
            background: #ebedef none repeat scroll 0 0;
            border-radius: 32px;
            box-shadow: none;
            margin-top: 2px;
            overflow: hidden;
        `);

        this.addCSSRule('.bel-progress-bar', `
            box-shadow: none;
            line-height: 12px;
            color: #fff;
            float: left;
            font-size: 12px;
            height: 100%;
            line-height: 20px;
            text-align: center;
            transition: width 0.6s ease 0s;
            width: 0;
        `);

        this.addCSSRule('.bel-progress-center-marker', `
            border-right: 3px solid #ffffff;
            height: 10px;
            left: 50%;
            margin-left: -2px;
            opacity: 0.6;
            position: absolute;
        `);
        //Other
        this.addCSSRule('.bel-hr', `
            -moz-border-bottom-colors: none;
            -moz-border-left-colors: none;
            -moz-border-right-colors: none;
            -moz-border-top-colors: none;
            border-color: #eee -moz-use-text-color -moz-use-text-color;
            border-image: none;
            border-style: solid none none;
            border-width: 1px 0 0;
            margin-bottom: 20px;
        `);
    }

    addCSSRule(selector, rules) {
    	this.sheet += selector + "{" + rules + "}";
    }

    load(){
        $j('head').append(`<style>${this.sheet}</style>`);
    }
}
