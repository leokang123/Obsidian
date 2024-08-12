---
주제: 함수형프로그래밍
cssclasses: wide-page
생성일: 2024년 08월 12일 오후 16시 12분
수정일:  2024년 08월 12일 오후 23시 49분
series: 2
banner: "![[surfingBoards.jpg]]"
banner_y: 0.6
tags: [일반, 함수형프로그래밍, Clojure, 개념]
---

# LISP

#함수형프로그래밍 #Clojure #개념
![[Pasted image 20240812162039.png]]

## LISP란

```ad-white
**리스프(LISP)** 혹은 리습은 프로그래밍 언어의 계열로, **함수형 언어**로 포트란에 이어 두번쨰로 오래된 **고급 프로그래밍 언어**이다.

오늘날 가장 널리 알려진 일반 리스프 변종은 **커먼 리스프**와 **스킴**이다.

*내가 실습을 진행할 리스프 변종은 Clojure 이다*
```

```ad-white
본래 실용적인 목적 아래 컴퓨터 프로그래밍을 활용한 **수학 표기법을 나타내기 위한 목적**으로 만들어졌다. 

이는 알론소 처치의 **람다 대수**의 표기법을 많이 영향 받았다.
곧이어 인공지능 연구소에서 가장 인기있는 언어가 되었다. 

리스프는 컴퓨터 과학의 많은 개념들의 선구자로서 **트리 자료구조**, **가비지 컬렉션**, **동적 자료형**과 **인터프리터**와 같은 개념을 개척했다. 
```

```ad-white
LISP 이름 자체는 **LIS**t **P**rocessing의 줄임말으로, **연결리스트**는 리스프의 주요 자료구조 중 하나로 **리스프 코드는 그 자체로 하나의 리스트**이다. 
```

## LISP의 특징들

### 1. 코드와 데이터의 동일설 (Homoiconicity)

- LISP에서 코드와 데이터는 동일한 구조로 표현된다. 즉, 리스프에서 **코드는 리스트(List)** 로 표현되며, 이 리스트는 데이터로서도 취급될 수 있다
이러한 특징은 LISP의 **메타 프로그래밍 능력을 크게 강화**시킨다

- LISP 는 **S-표현식**으로 코드가 작성되며, S-표현식은 **리스트(List)와 원자(Atom)** 로 구성된다. 이 구조는 LISP의 데이터 구조와 동일하므로 프로그램의 **코드와 데이터가 본질적으로 동일한 형식**으로 다루어진다
- 이 특성으로 **프로그램 코드 자체가 데이터처럼 쉽게 조작** 될 수 있다. 프로그램이 **자신의 코드를 동적으로 생성, 변경, 평**가할 수 있는 **메타 프로그래밍**이 가능해진다

````ad-white
title: 간단한 문법 
collapse: true
```Lisp
;; 산술 연산 
(+ 1 2 3 4)  ;; 더하기, 결과: 10
(* 2 3 4)    ;; 곱하기, 결과: 24
(- 10 3)     ;; 빼기, 결과: 7
(/ 20 5)     ;; 나누기, 결과: 4

;; 변수정의 
(setq x 10)
(setq y 20)
(+ x y)  ;; 결과: 30

;; 함수정의 
(defun add (a b)
  (+ a b))

(add 5 7)  ;; 결과: 12

;; 조건문 
(defun check-number (x)
  (if (> x 0)
      "Positive"
      "Non-positive"))

(check-number 5)   ;; 결과: "Positive"
(check-number -3)  ;; 결과: "Non-positive"

;; 재귀함수 
(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

(factorial 5)  ;; 결과: 120

;; 리스트 처리 
(setq my-list '(1 2 3 4 5))

(car my-list)    ;; 리스트의 첫 번째 요소, 결과: 1
(cdr my-list)    ;; 리스트의 첫 번째 요소를 제외한 나머지, 결과: (2 3 4 5)
(append my-list '(6 7))  ;; 리스트를 합침, 결과: (1 2 3 4 5 6 7)

;; 매크로 정의 
(defmacro unless (condition &body body)
  `(if (not ,condition)
       (progn ,@body)))

(unless (= 1 2)
  (print "1 is not equal to 2"))

;; 반복문 
(loop for i from 1 to 5
      do (print i))

```
````

### 2. 함수형 프로그래밍 (Functional Programming)

LISP은 **함수형 프로그래밍 개념을 매우 잘 지원**한다. 함수형 프로그래밍은 **함수를 일급 객체**로 다루며, 함수 내에서 다른 함수를 인자로 받거나 반환 할 수 있다 또한 상태 변화 없이 **순수 함수**를 사용하는 것을 장려한다
- **고차함수**(High-Order Functions): LISP에선 함수가 일급 객체로, **함수를 인자로 전달**하거나 **반환값으로 사용**할 수 있다. → 고차함수 정의임

````ad-white
title:예시 
```lisp
(mapcar #'(lambda (x) (+ x 1)) '(1 2 3))
```
````

### 3. 재귀 (Recursion)

### 4. 매크로 시스템 (Macro System)

### 5. 동적 타이핑 (Dynamic Typing)

### 6. 가비지 컬렉션 (Garbage Collection)

### 7. 리스트 처리 기능 (List Processing)

### 8. 인터랙티브 프로그래밍 (Interactive Programming)

### 9. 자연스러운 확장성 (Extensibility)

### 10. 구조적 프로그램 제어 (Structured Program Control)
