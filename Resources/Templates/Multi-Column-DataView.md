---
수정일: 2024년 08월 03일 오후 22시 50분
---

> [!multi-column] 
> ```ad-blue
> ~~~ dataview
>TABLE WITHOUT ID
>link(file.path,file.name) AS "옵시디언",
>dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
>FROM #옵시디언 AND "Studied"
>SORT series ASC
>~~~
> ```
> ```ad-white
> ~~~ dataview
>TABLE WITHOUT ID
>link(file.path,file.name) AS "학습정리",
>dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
>FROM #학습정리 AND "Studied"
>SORT series ASC
>~~~
> ```