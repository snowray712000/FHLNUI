/**
 * mouserenter mouseleave 事件使用，改變 sn 顏色
 */
export class SN_Act_Color {
    static #s = null
    /** @type {SN_Act_Color} */
    static get s() { if (this.#s == null) this.#s = new SN_Act_Color(); return this.#s; }

    /**
     * jQuery selector
     * @returns {str} jQuery selector
     */
    ids(){
        // 下面會重複使用 lecMain 閱讀 search_result 搜尋結果 parsingTable 原文 commentScrollDiv 注釋
        let id_array_for_jquery = '#lecMain, #search_result, #parsingTable, #commentScrollDiv'
        return id_array_for_jquery
    }
    /**
     * .snAct .snAct2 remove
     */
    act_remove(){
        // sn.mouseleave event use
        $(this.ids()).find('.snAct, .snAct2').removeClass('snAct').removeClass('snAct2')
    }
    /**
     * snAct 標紅色
     * snAct2 標暗紅 ... 同源字
     * @param {str} sn sn，但要注意，應該都要把前面的零去掉。要小心，若想用 trim left 把 0 去掉，要小心不要遇到 00000 。 
     * @param {0|1} N 0 新約，1 舊約。 
     */
    act_add(sn, N){
        // Activate sn，標記為紅色
        let cod1 = `[sn=${sn}][N=${N}]` // 原本是 find('.sn[sn=sn][N=N]')，但現在多了 .sn-text 也要一樣的條件
        let needAddClassSnAct = $(this.ids()).find(`.sn${cod1}, .sn-text${cod1}`)
        needAddClassSnAct.addClass('snAct')
        // 希臘文比較麻煩，因為 <span class="sn sn-text"><span class="greek-char">...</span></span>，所以外面加上 snAct，仍然不會影響到 color，因為 greek-char 是內部的 span。
        // 若有內部的 .greek-char，也一併加上 snAct
        needAddClassSnAct.find('.greek-char').addClass('snAct');
    
        
        // 同源字，標記為暗紅色
        const Sd_same_json = window.Sd_same_json
        if ( Sd_same_json.s.filecontent != null) {
            // 下次觸發就有可能是存在了，一次沒觸發還好

            // n=0 新約，取 greek。n=1 舊約，取 hebrew
            let hg = N == 0 ? "greek" : "hebrew"

            /** @type {str[]} */
            let same = Sd_same_json.s.filecontent[hg][sn]
            if (same != undefined){
                // 移除 same2 中 所有 與 sn 一樣的值
                let same2 = same.filter(a1 => a1 != sn) // 太1，波阿斯 可驗證
                if (same2.length > 0){
                    let cod2 = same2.map(a1 => `[sn=${a1}][N=${N}]`).join(", ")
                    let needAddClassSnAct2 = $(this.ids()).find(`.sn${cod2}, .sn-text${cod2}`)
                    needAddClassSnAct2.addClass('snAct2')
                    needAddClassSnAct2.find('.greek-char').addClass('snAct2');
                }
            }   
        }                
    }
}
