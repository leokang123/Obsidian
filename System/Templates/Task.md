---
date:  <% tp.date.now("yyyy-MM-DD HH:mm") %>
updated:  <% tp.date.now("yyyy-MM-DD HH:mm") %>
banner: "![[yort.jpg]]"
banner_y: 0.088
---

<%* tp.user.makeLogData(tp.file.path(), tp.file.title) %>
#데일리노트

# <% tp.file.title %>

- [ ] #task #todo <% tp.file.cursor(0) %> 📅 <% tp.date.now() %> 

[[<% tp.user.getYesterday(tp.file.title) %>|< 전날]] | [[<% tp.user.getTomorrow(tp.file.title) %>|다음날 >]]

---

## 일감 감옥

```tasks  
tag includes #study
not done  
hide tags
hide toolbar
hide due date
hide edit button
short mode  
```
