---
cssclasses:
  - wide-page
생성일: 토요일, 8월 3일 2024, 7:32:30 오후
수정일:  2026-03-26 14:15:37
banner: "![[sky.jpg]]"
banner_y: 0.53184
tags: [대학교, 일반, 학습정리, 중요, 회고, 네이버, 개념, 잡, 프로젝트, 책리뷰, 3-2, 4-1, 4-2, 옵시디언, 정규표현식, 자바스크립트, 타입스크립트, 객체지향, 함수형프로그래밍, 비동기, Git, Jest, 컴파일러, 프로세스메모리, Clojure, 클로저, 렉시컬스코프, 커링, 불변성, 순수함수]
updated:  2026-04-15 20:41:12
---

# 메인 페이지

---

## 학습 정리

- #### [[공부]] #mcl/list-card
![[공부]]

## 작업

`$= dv.span('**' + moment().format('YYYY년 MM월 DD일, dddd') + '**')`

```todoist  
name: "Today & Overdue"
filter: "today | overdue"
view:  
  noTasksMessage: "Nothing due today! Take a break."
sorting:  
- date  
- priority

```

## 파일 관리 방식

````ad-multi-column
```ad-tip
title: 파일관리 방식
- **Studied 폴더에 모든 학습정리**를 한다
-  파일에서 **태그를 활용하여 관리**
- 주제에  **가장 주제에 알맞는 태그**를 적는다 
- 제목 쓰기 전에 **소괄호 안에 주제**를 적는다
- 시리즈로 정리하는 경우 **series 태그에 숫자 적기**
```

```ad-success
title: 태그 규칙
- 되도록 **한글**로, 어쩔수 없는 경우에만 영어 
- 줄임말 쓰지말고, **전체 단어쓰기** 
- 한번 태그만들면 그 이후에는 **새로 만들지 말고 기존 태그 사용**하기
```

```ad-question
title: 자동화 방식
- **CMD + N** 으로 폴더 **Studied에 파일 추가** 가능 
- 제목을 적을떄 **소괄호 안에 주제를 적고 마지막에 숫자**를 적음  
- 파일이름: **(주제)** 제목 **숫자**  → **자동으로 주제, 시리즈 태그**로 입력됨
- (주제) 에 적은 것은 띄워서써도 **전부 이어써진 채로 주제태그에 입력**됨
- 상황에 따라 **(대주제) (중주제) (메인주제)** 제목 숫자 순서로도 입력 가능 
```
````

```dataviewjs
dv.span("#### 노트정리")

const logPath = "System/Log/log.md";
const content = await dv.io.load(logPath) ?? "";

// [2024-08-04 23:58:59] Studied/파일명.md 생성
const lineRegex = /^\[(\d{4}-\d{2}-\d{2})\s+\d{2}:\d{2}:\d{2}\]\s+Studied\/(.+?)\.md\s+생성$/gm;

const dataByDate = {};
let match;

while ((match = lineRegex.exec(content)) !== null) {
  const [, date, rawTitle] = match;
  const title = rawTitle.trim();

  if (!dataByDate[date]) {
    dataByDate[date] = {
      count: 0,
      titles: []
    };
  }

  dataByDate[date].count += 1;
  dataByDate[date].titles.push(title);
}

renderHeatmapCalendar(this.container, {
  year: new Date().getFullYear(),
  entries: Object.entries(dataByDate).map(([date, info]) => ({
    date,
    intensity: info.count
  }))
});

let tooltip = document.getElementById("heatmap-note-tooltip");

if (!tooltip) {
  tooltip = document.createElement("div");
  tooltip.id = "heatmap-note-tooltip";
  Object.assign(tooltip.style, {
    position: "fixed",
    display: "none",
    padding: "8px 10px",
    background: "var(--background-primary)",
    border: "1px solid var(--background-modifier-border)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: "9999",
    pointerEvents: "none",
    fontSize: "13px",
    maxWidth: "240px",
    whiteSpace: "normal",
    lineHeight: "1.4"
  });
  document.body.appendChild(tooltip);
}

const hideTooltip = () => {
  tooltip.style.display = "none";
};

const truncate = (text, max = 18) =>
  text.length > max ? text.slice(0, max) + "..." : text;

setTimeout(() => {
  const root = this.container;
  if (root._heatmapTooltipBound) return;
  root._heatmapTooltipBound = true;

  root.addEventListener("mouseover", (e) => {
    const cell = e.target.closest("[data-date]");
    if (!cell || !root.contains(cell)) return;

    const date = cell.dataset.date;
    const info = dataByDate[date];
    if (!info) return;

    const firstTitle = truncate(info.titles[0] ?? "제목 없음");
    const extraCount = Math.max(0, info.count - 1);

    tooltip.innerHTML = `
      <div style="font-weight:600; margin-bottom:4px;">${date}</div>
      <div>${firstTitle}${extraCount > 0 ? ` 외 ${extraCount}개` : ""}</div>
    `;
    tooltip.style.display = "block";
  });

  root.addEventListener("mousemove", (e) => {
    const cell = e.target.closest("[data-date]");
    if (!cell || !root.contains(cell)) return;

    tooltip.style.left = `${e.clientX + 12}px`;
    tooltip.style.top = `${e.clientY + 12}px`;
  });

  root.addEventListener("mouseout", (e) => {
    const fromCell = e.target.closest("[data-date]");
    if (!fromCell) return;

    const toEl = e.relatedTarget;
    if (toEl && root.contains(toEl) && toEl.closest("[data-date]")) return;

    hideTooltip();
  });

  root.addEventListener("mouseleave", hideTooltip);
  window.addEventListener("scroll", hideTooltip, { passive: true });
}, 100);
```
