---
수정일: 월요일, 8월 5일 2024, 6:21:23 오전
생성일: 토요일, 8월 3일 2024, 5:24:50 오전
---

```ad-black
~~~ dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "옵시디언",
dateformat(file.mtime, "yyyy년 MM월 dd일 HH:mm") AS "" FROM #옵시디언 AND "Studied"
SORT series ASC
~~~
```
