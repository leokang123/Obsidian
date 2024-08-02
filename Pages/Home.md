---
class: 
cssclass: wide-page, dashboard
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 08월 02일 오후 17시 20분
banner: "![[sky.jpg]]"
banner_y: 0.5
---

# Home


>[!multi-column] - 진행중인 일
>>[!quote] %%fake title %%
>> [[네이버]]
>>![[네이버]]
>
>>[! quote] %% fake title %%
>> [[잡다한 공부]]
>> ![[잡다한 공부]]
>
>>[! quote] %% fake title %%
>> [[대학교]]
>> ![[대학교]]

<br />

# 작업

>[!multi-column] - 진행중인 일
>>[!example] %% fake title %%
>> ```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "즐겨찾기"
FROM #중요 
>> ```
>
>>[!example] %% fake title %% 
>> ```dataview 
TABLE WITHOUT ID
link(file.path,file.name) AS "최근 사용",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" FROM "Folder" 
SORT file.mtime DESC LIMIT 5
>> ```


<br />
<br />
<br />



## 첨부사진 
>[!multi-column]
>>[!note]  titile
>>asdasd
>
>>[!info] 
>>asdasd
>

## 제목 
- ### 소주제1 
- ### 소주제2
- ### 소주제3