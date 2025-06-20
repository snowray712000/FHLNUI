// (function (root) {
//     root.gbText = gbText
// })(this)

import { TPPageState } from "./TPPageState.es2023.js";

// gb: 1 or 0 2020/11 繁簡合併
export function gbText(str, gb) {
    const pageState = TPPageState.s
    
    if (gb == undefined) {
        gb = pageState.gb;
    }
    if (gb !== 1) { return str; }

    var r1 = {
        "設定": "设定",
        "原文編號": "原文编号",
        "即時顯示": "即时显示",
        "繁簡切換": "繁简切换",
        "地圖顯示": "地图显示",
        "圖片顯示": "图片显示",
        "字體大小": "字体大小",
        "聖經版本選擇": "圣经版本选择",
        "歷史記錄": "历史纪录",
        "清除記錄": "清除记录",
        "經卷選擇": "经卷选择",

        "整卷聖經": "整卷圣经",
        "摩西五經": "摩西五经",
        "舊約歷史書": "旧约历史书",
        "詩歌智慧書": "诗歌智慧书",
        "大先知書": "大先知书",
        "小先知書": "小先知书",
        "福音書": "福音书",
        "新約歷史書": "新约历史书",
        "保羅書信": "保罗书信",
        "其他書信": "其他书信",
        "預言書": "预言书",
        "交錯（段落）": "交错（段落）",
        "併排（段落）": "并排（段落）",
        "交錯（單節）": "交错（单节）",
        "併排（單節）": "并排（单节）",
    };

    for (var a1 in r1) {
        if (str === a1) {
            return r1[a1];
        }
    }
    return str;
}
