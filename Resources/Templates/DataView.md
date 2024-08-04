---
수정일: 2024년 08월 05일 오전 03시 57분
---

```ad-black
~~~ dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "옵시디언",
dateformat(file.mtime, "yyyy년 MM월 dd일 HH:mm") AS "" FROM #옵시디언 AND "Studied"
SORT series ASC
~~~
```
