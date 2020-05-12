var CS;
(function (CS) {
    class rAd {
        /**
         * Initializes a new instance of the `PluginName` plugin.
         *
         * @param element   The DOM element.
         * @param options   Plugin options.
         */
        constructor(display, reportEl, radPath2, reportUrl) {
            this.styles = {
                "tinymodal-overlay": "position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.5)",
                "tinymodal-window": "position:absolute;width:200px;top:10%;left: 50%;-webkit-box-shadow:0 0 6px rgba(0,0,0,0.3),0 6px 30px rgba(0,0,0,0.25);box-shadow:0 0 6px rgba(0,0,0,0.3),0 6px 30px rgba(0,0,0,0.25);margin-left: -100px;",
                "tinymodal-title": "position:relative;padding:16.666666666666668px 25px;font-size:130%;font-weight:bold;text-shadow:0 1px rgba(0,0,0,0.7);color:#fbfbfb;background:#1d2a4d;-webkit-border-top-left-radius:3px;border-top-left-radius:3px;-webkit-border-top-right-radius:3px;border-top-right-radius:3px;",
                "tinymodal-close": "position:absolute;top:50%;right:.5em;margin-top:-.5em;font-size:150%;line-height:1;cursor:pointer",
                "tinymodal-content": "padding:25px;background:#fff; max-height:300px;overflow-y:auto",
                "tinymodal-buttons": "zoom:1;padding:25px;background:-webkit-linear-gradient(#d9d9d9, #fff);background:-moz-linear-gradient(#d9d9d9, #fff);background:-o-linear-gradient(#d9d9d9, #fff);background:-ms-linear-gradient(#d9d9d9, #fff);background:linear-gradient(#d9d9d9, #fff);-webkit-border-bottom-left-radius:3px;border-bottom-left-radius:3px;-webkit-border-bottom-right-radius:3px;border-bottom-right-radius:3px;",
                "tinymodal-buttons .inner": "float:right",
                "tinymodal-buttons button": "margin-left:.5em;padding:.6em 1.25em;line-height:1;color:#fbfbfb;font-weight:bold;text-shadow:0 1px rgba(0,0,0,0.7);background:#198a48;border:0;border:1px solid #167c41;border-bottom:1px solid #0f532b;-webkit-border-radius:3px;border-radius:3px;-webkit-box-shadow:inset 0 1px rgba(255,255,255,0.45);box-shadow:inset 0 1px rgba(255,255,255,0.45)",
            };
            this._reportEl = reportEl;
            this._displayEl = display;
            this._rad2 = radPath2;
            rAd.reportUrl = reportUrl;
            this.init();
        }
        loadModal() {
            window["rad-offender"] = this._reportEl;
            var script = document.createElement('script');
            script.src = this._rad2;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        /**
         * Initialization.
         */
        init() {
            var reportAdDiv = document.createElement('div');
            reportAdDiv.setAttribute("style", "height:10px;width:35px;position:fixed;right:0px;bottom:0px;z-index:999999999999999;font-size:8px;background:#F15757;cursor:pointer;border-top-left-radius: 5px;padding-left: 5px;");
            var textNode = document.createTextNode("Report Ad");
            reportAdDiv.appendChild(textNode);
            this._displayEl.appendChild(reportAdDiv);
            var self = this;
            reportAdDiv.onclick = function () { self.loadModal(); return false; };
        }
        injectAd(div, content, height) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = "0";
            var adWidth = Math.max(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]);
            if (adWidth > 320)
                adWidth = 320;
            iframe.width = adWidth + "px"; //"100%"; setting width to 100% will make the iframe wider than its content and you might not be able to center it 
            rAd.adHtml += "||ad-unit||" + content;
            iframe.height = height + "px";
            iframe.scrolling = "no";
            div.appendChild(iframe);
            var trial = '<!DOCTYPE html><html><body style="margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;">';
            var trialEnd = '</body> </html>';
            iframe.contentWindow["content"] = trial + content + trialEnd;
            iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
            iframe.src = 'javascript:window["content"]';
            //if (div.addEventListener) {
            //    var removeSandBox = function () {
            //        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
            //    };
            //    div.addEventListener("mouseover", removeSandBox);
            //    div.addEventListener("touchstart", removeSandBox);
            //} 
        }
    }
    rAd.reportUrl = "";
    rAd.adHtml = "";
    CS.rAd = rAd;
})(CS || (CS = {}));
//# sourceMappingURL=ReportAd.js.map