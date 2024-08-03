---
class: 
cssclasses:
  - wide-page
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 08월 03일 오후 20시 27분
banner: "![[sky.jpg]]"
banner_y: 0.5
---



## 페이지
- #### [[네이버]] #mcl/list-card
![[네이버]]
- #### [[공부]]
![[공부]]
- #### [[대학교]]
![[대학교]]

<br /> 

## 작업

> [!multi-column] 
> ```ad-blue
> ~~~dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "옵시디언",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
FROM #옵시디언 AND "Studied"
SORT series ASC
>~~~
> ```
> ```ad-pink
> ~~~dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "학습정리",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" 
FROM #학습정리 AND "Studied"
SORT series ASC
>~~~
> ```

---
## 파일관리 방식

> [!multi-column] 
>> [!tip] 파일관리 방식
>> - 현재 옵시디언 파일관리 방식을 **파일시스템 방식으로 관리하지 않고**
>>  - **태그로 관리로 파일 관리**하기로 함 
>> - **Studied 폴더에 모든 학습정리**를 하고, 파일에서 태그를 활용하여 관리
>
>> [!success]  태그 규칙
>> - 되도록 **한글**로, 어쩔수 없는 경우에만 영어 
>> - 줄임말 쓰지말고, **전체 단어쓰기** 
>>  - 한번 태그만들면 그 이후에는 **새로 만들지 말고 기존 태그 사용**하기
>>  - 시리즈로 정리하는 경우 **series 태그에 숫자 적기**
>

## 태그모음
- ### 전체관리 #mcl/list-card
> #학습정리 #중요 
> #asd
- ### 부분관리
> #회고 #네이버
> #asd 
> #asd
- ### 세부적
#옵시디언 #정규표현식 #자바스크립트 #타입스크립트 #객체지향 
 #함수형프로그래밍 #비동기 #Git #Jest #컴파일러 
 #프로세스메모리 #Clojure #클로저 #렉시컬스코프 #커링 
 #불변성 #순수함수 



