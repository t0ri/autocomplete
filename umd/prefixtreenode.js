!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e=e||self).prefixtreenode=r()}(this,(function(){"use strict";return class{constructor(e){this.charater=e,this.children={},this.terminal=!1}isTerminal(){return this.terminal}childrenCount(){return Object.keys(this.children).length}hasChild(e){return e in this.children}getChild(e){return this.hasChild(e)?this.children[e]:Error("No child exists for character "+e)}addChild(e,r){return this.hasChild(e)||(this.children[e]=r),Error("Child already exists for character "+e)}}}));
