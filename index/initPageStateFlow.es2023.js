/// <reference path="DPageState.d.js" />

import { triggerGoEventWhenPageStateAddressChange } from './triggerGoEventWhenPageStateAddressChange.es2023.js'
import { TPPageState } from './TPPageState.es2023.js';


export function initPageStateFlow(currentSWVer) {
  //fhlTopMenu.init(pageState);
  //fhlTopMenu.render(pageState);
  //Check cache
  if (localStorage.getItem("fhlPageState") != null) {
    //console.log(localStorage.getItem("fhlPageState"));
    var tmp = JSON.parse(localStorage.getItem("fhlPageState"));
    if (tmp.swVer != currentSWVer) {
      // pageState 版本變更            
      // replace by snow. 2021.07 不要再直接更新所有設定，
      // 而是透過 makeSureValueExistForNewVersions 新增的 key
      // pageStateInit(); 
      const pageState = tmp // 然後缺的會在下面補足
      pageState.swVer = currentSWVer // 更新   
      TPPageState.s.updateFromDict(pageState)
    } else {
      // 從 localStorage 載入
      TPPageState.s.updateFromDict(tmp);
    }
  } else {
    pageStateInit();
    // 2017.07 若人家是直接貼上url含有 書卷章節, 就從裡面取代
  }

  makeSureValueExistForNewVersions()
    
  $(function () {
    triggerGoEventWhenPageStateAddressChange(TPPageState.s);
  })

  return
  function pageStateInit() {
    TPPageState.s.updateFromDict(genereateDefaultPageState());
  }
  /** 
   * 當工程師，在新增 pageState 參數時，因為版本沒更新，所以常常忘了它是 undfined
   * 所以這個會自動將 不存在的 pageState 補上，我們只有專注維護 genereateDefaultPageState
   * 另外，這樣也才不會，因為更新版本，過去的設定都清空歸 0 了
   */
  function makeSureValueExistForNewVersions() {
    const ps2 = TPPageState.s;
    var ps = genereateDefaultPageState()    
    for (var k in ps) {
      if (ps2[k] == undefined) {
        ps2[k] = ps[k]
      }
    }
  }
  /**
   * 
   * @returns {TPPageState}
   */
  function genereateDefaultPageState() {
    return {
      // 'Gen'
      engs: "Gen",
      // '創'
      chineses: "創",
      // 1
      chap: 1,
      // 1
      sec: 1,
      // 滑鼠移過去的，而上面的 chap sec 是，滑鼠按下去 activate 的節 
      book_hover: -1,
      chap_hover: -1,
      sec_hover: -1,
      // bookIndex, book 這個先被用掉了.
      bookIndex: 1,
      // ['unv', 'svc']
      version: ["unv"],
      // 0
      strong: 0,
      // 0
      gb: 0, // 0: 繁體預設值
      isVisibleInfoWindow: 1,  // add by snow. 2021.07
      isVisibleLeftWindow: 1, // add by snow. 2021.07
      cxInfoWindow: 500, // add by snow. 2021.07
      cxLeftWindow: 190, // add by snow. 2021.07
      fontSizeHebrew: 26, // add by snow. 2021.07
      fontSizeGreek: 26, // add by snow. 2021.07
      fontSizeStrongNumber: 14, // add by snow. 2021.07
      // book 別以為是 bookIndex, 因為 book 先被注釋用掉了 sc.php 參數
      book: 3, N: 0, k: "", cname: ["FHL和合本"], realTimePopUp: 0, titleId: "fhlInfoComment",
      history: [{ chineses: "創", chap: 1 }], fontSize: 12, commentBackgroundChap: 1, commentBackgroundSec: 1,
      leftBtmWinShow: true, searchTitleMsg: "", audio: 0, swVer: "0.0.0",
      ispho: false, ispos: false
    }
  }
}
