---
주제: 
cssclasses: wide-page
생성일: 2024-08-04 18:11
수정일: 2024년 08월 04일 오후 18시 18분
series: 2
---


# 파일이름
```dataviewjs
const a = dv.pages('"Studied"').filter(p => p.file.name === 'asd asd 2');
const name = a.file.name[0];
const match = name.match(/\d+/);
console.log(match[0]);
```