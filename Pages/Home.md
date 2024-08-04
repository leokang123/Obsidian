---
class: 
cssclasses:
  - wide-page
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 08월 05일 오전 03시 31분
banner: "![[sky.jpg]]"
banner_y: 0.49584
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
link(file.path,file.name) AS "학습정리 :LiBookCheck: ",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
FROM #학습정리 AND "Studied"
SORT 주제, series
>~~~
> ```
> ```ad-pink
> ~~~ dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "최근이용 :LiTimer:",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
FROM  "Studied"
SORT file.mtime  DESC
LIMIT 15
>~~~
> ```


## 파일관리 방식

> [!multi-column] 
>```ad-tip
> title: 파일관리 방식
> - **Studied 폴더에 모든 학습정리**를 한다
> -  파일에서 **태그를 활용하여 관리**
> - 주제에  **가장 주제에 알맞는 태그**를 적는다 
> - 제목 쓰기 전에 **소괄호 안에 주제**를 적는다
> - 시리즈로 정리하는 경우 **series 태그에 숫자 적기**
>```
>```ad-success
> title: 태그 규칙
> - 되도록 **한글**로, 어쩔수 없는 경우에만 영어 
> - 줄임말 쓰지말고, **전체 단어쓰기** 
> - 한번 태그만들면 그 이후에는 **새로 만들지 말고 기존 태그 사용**하기
>```
>```ad-question
> title: 자동화 방식
> - **CMD + N** 으로 폴더 **Studied에 파일 추가** 가능 
> - 제목을 적을떄 **소괄호 안에 주제를 적고 마지막에 숫자**를 적음  
> - 파일이름: **(주제)** 제목 **숫자**  → **자동으로 주제, 시리즈 태그**로 입력됨
> - (주제) 에 적은 것은 띄워서써도 **전부 이어써진 채로 주제태그에 입력**됨
>```



## 태그모음
- #### 전체관리 #mcl/list-card
 #학습정리 #중요 

- #### 부분관리
#회고 #네이버 #개념 #잡


- #### 세부적
#옵시디언 #정규표현식 #자바스크립트 #타입스크립트 #객체지향 
 #함수형프로그래밍 #비동기 #Git #Jest #컴파일러 
 #프로세스메모리 #Clojure #클로저 #렉시컬스코프 #커링 
 #불변성 #순수함수 


~~~ dataviewjs
// Display a title with some optional icons
dv.span("#### 노트정리") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */

// Initialize the calendarData object with various configurations

const hueRed = 0;      // 빨강 (Red)
const hueOrange = 30;  // 주황 (Orange)
const hueYellow = 50;  // 노랑 (Yellow)
const hueGreen = 130;  // 초록 (Green)
const hueCyan = 180;   // 청록 (Cyan)
const hueBlue = 240;   // 파랑 (Blue)
const huePurple = 280; // 보라 (Purple)
const huePink = 320;   // 분홍 (Pink)

const makeHue = (hue, intense, per) => {
	const num = intense * 10;
	return [
	        `hsl(${hue+num*0}, 100%, ${per}%)`,
            `hsl(${hue+num*0.4}, 100%, ${per}%)`,   
            `hsl(${hue+num*0.8}, 100%, ${per}%)`,     
            `hsl(${hue+num*1.2}, 100%, ${per}%)`,    
            `hsl(${hue+num*1.6}, 100%, ${per}%)`,   
            `hsl(${hue+num*2.0}, 100%, ${per}%)`,     
            `hsl(${hue+num*2.4}, 100%, ${per}%)`,  
            `hsl(${hue+num*2.8}, 100%, ${per}%)`, 
            `hsl(${hue+num*3.2}, 100%, ${per}%)`,      
            `hsl(${hue+num*3.6}, 100%, ${per}%)`,      
        ];
}
const calendarData = {
    year: 2024,  // (optional) defaults to current year
    colors: {    // (optional) defaults to green
        customColor: makeHue(hueOrange,7,85),
    },
    showCurrentDayBorder: true, // (optional) defaults to true
    defaultEntryIntensity: 0,   // (optional) defaults to 4
    intensityScaleStart: 5,    // (optional) defaults to lowest value passed to entries.intensity
    intensityScaleEnd: 100,     // (optional) defaults to highest value passed to entries.intensity
    entries: [],                // (required) populated in the DataviewJS loop below 0~15, 16~25
}
// log에 기록한 데이터 기반으로 마킹한다 
// 따라서 잘못 추가한 파일은 로그에서 수동으로 지워줘야 한다
const logPath = 'Resources/Log/log.md';
const fileContents = await dv.io.load(logPath);
const bracketPattern = /\[(.*?)\]/g; // 정규 표현식을 사용하여 대괄호 사이의 모든 정보 추출 
const matches = fileContents.match(bracketPattern); 
let extractedInfo = ""; 
if (matches) { 
	extractedInfo = matches.map(p => p.slice(1,p.length-1))
}

const lengthObj = {};
extractedInfo.forEach(p => {
	const date = p.substring(0,10);
	if (!lengthObj.hasOwnProperty(date)) lengthObj[date] = 0;
	lengthObj[date] += 10;
})

for (let dateInfo of Object.entries(lengthObj)) {
    const date = dateInfo[0].substring(0,10);
	const pageDate = date
	const pageCount = dateInfo[1] - 9;
    calendarData.entries.push({
        date: date,     // (required) Date in the format YYYY-MM-DD
        intensity: pageCount,   // (required) The data you want to track, will map color intensities automatically
        color: "customColor",          // (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used
    });
}

// Render the heatmap calendar using the populated calendarData
renderHeatmapCalendar(this.container, calendarData)
~~~

