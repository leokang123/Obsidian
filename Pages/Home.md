---
class: 
cssclasses:
  - wide-page
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 08월 04일 오전 01시 02분
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
// Display a title with some optional icons
dv.span("**노트정리**") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */

// Initialize the calendarData object with various configurations

const hue1 = 13 //red
const hue2 = 132 //green
const hue3 = 240 // blue
const makeHue = (hue, intense) => {
	const num = intense * 10;
	return [
	        `hsl(${hue+num}, 100%, 60%)`,
            `hsl(${hue+num*1.2}, 100%, 57%)`,   
            `hsl(${hue+num*1.4}, 100%, 54%)`,     
            `hsl(${hue+num*1.6}, 100%, 51%)`,    
            `hsl(${hue+num*1.8}, 100%, 48%)`,   
            `hsl(${hue+num*2.0}, 100%, 45%)`,     
            `hsl(${hue+num*2.2}, 100%, 42%)`,  
            `hsl(${hue+num*2.4}, 100%, 39%)`, 
            `hsl(${hue+num*2.6}, 100%, 36%)`,      
            `hsl(${hue+num*2.8}, 100%, 33%)`,      
        ];
}
const calendarData = {
    year: 2024,  // (optional) defaults to current year
    colors: {    // (optional) defaults to green
        customColor: makeHue(hue2,3),
    },
    showCurrentDayBorder: true, // (optional) defaults to true
    defaultEntryIntensity: 0,   // (optional) defaults to 4
    intensityScaleStart: 5,    // (optional) defaults to lowest value passed to entries.intensity
    intensityScaleEnd: 100,     // (optional) defaults to highest value passed to entries.intensity
    entries: [],                // (required) populated in the DataviewJS loop below 0~15, 16~25
}

// DataviewJS loop to iterate over pages in the "Studied" folder where the page has a 'series' property
const pageArr = dv.pages('"Studied"');
const pageArrLength = (pageArr.length-1)*10 + 1;
for (let page of pageArr.where(p => p.series)) {
    // Uncomment the following line for troubleshooting to see the file names
    // dv.span("<br>" + page.file.name)
    
    // Push the data into the calendarData.entries array
    calendarData.entries.push({
        date: page.생성일.slice(0,10),     // (required) Date in the format YYYY-MM-DD
        intensity: pageArrLength,   // (required) The data you want to track, will map color intensities automatically
        color: "customColor",          // (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used
    });
    console.log(page.file)
}

console.log(pageArrLength);
// Render the heatmap calendar using the populated calendarData
renderHeatmapCalendar(this.container, calendarData)

```