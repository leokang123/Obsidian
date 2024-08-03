---
class: 
cssclasses:
  - wide-page
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 08월 03일 오후 23시 37분
banner: "![[sky.jpg]]"
banner_y: 0.512
---



## 페이지
- #### [[네이버]] #mcl/list-card
![[네이버]]
- #### [[공부]]
![[공부]]
- #### [[대학교]]
![[대학교]]

## 작업

> [!multi-column] 
> ```ad-blue
> ~~~ dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "옵시디언",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
FROM #옵시디언 AND "Studied"
SORT series ASC
>~~~
> ```
> ```ad-pink
> ~~~ dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "학습정리",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
FROM #학습정리 AND "Studied"
SORT series ASC
>~~~
> ```


## 파일관리 방식

> [!multi-column] 
>```ad-tip
> title: 파일관리 방식
> - 현재 옵시디언 파일관리 방식을 **파일시스템 방식으로 관리하지 않고**
> - **태그로 관리로 파일 관리**하기로 함 
> 	- asd
> - **Studied 폴더에 모든 학습정리**를 하고, 파일에서 태그를 활용하여 관리
>```
>```ad-success
> title: 태그 규칙
> - 되도록 **한글**로, 어쩔수 없는 경우에만 영어 
> - 줄임말 쓰지말고, **전체 단어쓰기** 
> - 한번 태그만들면 그 이후에는 **새로 만들지 말고 기존 태그 사용**하기
> - 시리즈로 정리하는 경우 **series 태그에 숫자 적기**
>```

## 태그모음
- ### 전체관리 #mcl/list-card
 #학습정리 #중요 

- ### 부분관리
#회고 #네이버 

- ### 세부적
#옵시디언 #정규표현식 #자바스크립트 #타입스크립트 #객체지향 
 #함수형프로그래밍 #비동기 #Git #Jest #컴파일러 
 #프로세스메모리 #Clojure #클로저 #렉시컬스코프 #커링 
 #불변성 #순수함수 


```dataviewjs
dv.span("**노트정리**") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */
const calendarData = {
    year: 2022,  // (optional) defaults to current year
    colors: {    // (optional) defaults to green
        blue:        ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"], // first entry is considered default if supplied
        green:       ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"],
        red:         ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"],
        orange:      ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"],
        pink:        ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"],
        orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"]
    },
    showCurrentDayBorder: true, // (optional) defaults to true
    defaultEntryIntensity: 4,   // (optional) defaults to 4
    intensityScaleStart: 10,    // (optional) defaults to lowest value passed to entries.intensity
    intensityScaleEnd: 100,     // (optional) defaults to highest value passed to entries.intensity
    entries: [],                // (required) populated in the DataviewJS loop below
}

//DataviewJS loop
for (let page of dv.pages('"Studied"').where(p => p.exercise)) {
    //dv.span("<br>" + page.file.name) // uncomment for troubleshooting
    calendarData.entries.push({
        date: page.file.name,     // (required) Format YYYY-MM-DD
        intensity: page.exercise, // (required) the data you want to track, will map color intensities automatically
        content: "🏋️",           // (optional) Add text to the date cell
        color: "orange",          // (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used
    })
}

renderHeatmapCalendar(this.container, calendarData)
```