---
class: 
cssclass: wide-page,
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 08월 03일 오전 04시 46분
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
>>[!todo] %% fake title %%
>> ```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "중요"
FROM #important 
>> ```
>
>>[!example] %% fake title %% 
>> ```dataview 
TABLE WITHOUT ID
link(file.path,file.name) AS "최근 사용",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" FROM "Studied" 
SORT file.mtime DESC LIMIT 5
>> ```


<br />
<br />
<br />

---
# 파일관리 방식

> [!multi-column] 
>> [!tip] 파일관리 방식
>> - 현재 옵시디언 파일관리 방식을 **파일시스템 방식으로 관리하지 않고**
>>  - **태그로 관리로 파일 관리**하기로 함 
>> - **Studied 폴더에 모든 학습정리**를 하고, 파일에서 태그를 활용하여 관리
>
>> [!success]  태그 규칙
>> - 무조건 **영어 소문자**로 
>> - 줄임말 쓰지말고, **전체 단어쓰기** 
>>  - 되도록이면 하나의 태그에 대해 **여러 비슷한 태그 만들지 않기**
>


![[인상적인 옵시디언 문법]]