### twcb spec html

```
@startuml
skinparam handwritten true

note top of twcbflow: "藍色是與介面整合的"
note bottom of jquery: "綠色是全域lib"
note top of DText : "interface 在 js 中，主要配合 jsdoc 語法用"

class twcbflow #white-blue
class cbolflow #white-blue
class cvtDTextsToHtml #white-blue
class linqjs #white-green
class jquery #white-green
interface DText

twcbflow .> splitBtw
twcbflow .> splitBrOne
twcbflow .> splitReference
twcbflow .> linqjs

cbolflow .> splitBrOne

cvtDTextsToHtml .> jquery
cvtDTextsToHtml .> DText

splitBtw ..> matchGlobalWithCapture
splitBtw ..> linqjs

splitBrOne .> splitStringByRegex

splitStringByRegex ..> matchGlobalWithCapture

splitReference ..> splitStringByRegex
splitReference ..> BibleConstant
splitReference ..> BibleConstantHelper
splitReference ..> linqjs

BibleConstantHelper ..> BibleConstant
BibleConstantHelper ..> linqjs


@enduml
```

## 單獨 (開發單位-從上面複製下來)
### twcbflow 
```plantuml
@startuml
skinparam handwritten true

note top of twcbflow: "藍色是與介面整合的"
note bottom of linqjs: "綠色是全域lib"

class twcbflow #white-blue
class linqjs #white-green

twcbflow .> splitBtw
twcbflow .> splitStringByRegex
twcbflow .> splitReference
twcbflow .> linqjs

splitBtw ..> matchGlobalWithCapture
splitBtw ..> linqjs

splitStringByRegex ..> matchGlobalWithCapture

splitReference ..> splitStringByRegex
splitReference ..> BibleConstant
splitReference ..> BibleConstantHelper
splitReference ..> linqjs

BibleConstantHelper ..> BibleConstant
BibleConstantHelper ..> linqjs

@enduml
```

### cvtDTextsToHtml
```plantuml
@startuml
skinparam handwritten true

note top of cvtDTextsToHtml: "藍色是與介面整合的"
note bottom of jquery: "綠色是全域lib"
note top of DText : "interface 在 js 中，主要配合 jsdoc 語法用"

class cvtDTextsToHtml #white-blue
class jquery #white-green
interface DText

cvtDTextsToHtml .> jquery
cvtDTextsToHtml .> DText

@enduml

```

## 思考 click 事件

```plantuml
@startuml
skinparam handwritten true

    usecase "醫學器材" as op5
    usecase "DICOM" as op2

rectangle CAD{
    usecase "3D模型檔\n例如.stl .obj ..." as op1
    usecase "3D掃描" as op3
    usecase "顯示" as op4 #00FF00 
    usecase "設計工具" as op6 #00FF00 
}

op5 ..> op2 :產生
op3 ..> op1 :產生
op1 --> op4
op2 --> op4
op4 -> op6
op6 .up.> op1 : 完成
@enduml

@startuml
skinparam handwritten true


    usecase "CAD" as op6
rectangle CAM {
    usecase "產生(刀具)路徑" as op9 #00FF00
    usecase "切削加工" as op7
    usecase "3DPrinter" as op8
}
op6 ..> op9 : 產生
op9 --> op7
op9 --> op8
@enduml

```

