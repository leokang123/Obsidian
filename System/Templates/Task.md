---
created: <% tp.date.now("yyyy년 MM월 DD일 a HH시 mm분") %>
수정일:  2024년 08월 06일 오후 12시 47분
banner: "![[yort.jpg]]"
banner_y: 0.088
---

<%* tp.user.makeLogData(tp.file.path(), tp.file.title) %>
#데일리노트

# <% tp.file.title %>

- [ ] TBU
- [ ] TBU

[[<% tp.user.getYesterday(tp.file.title) %>|< 전날]] | [[<% tp.user.getTomorrow(tp.file.title) %>|다음날 >]]

---

## 일감 감옥

```tasks  
path includes task  
not done  
tag does not include #todo 
tag does not include #naver
short mode  
```
