---
주제: <% tp.user.makeSubject(tp.file.title) %>
cssclasses: wide-page
생성일: 2024. 8. 4. 오후 11:00:23
수정일: 2024년 08월 04일 오후 21시 52분
series: <% tp.user.getSeriesFromTitle(tp.file.title) %>
<% tp.user.getRandomBanner()%>
<%* tp.user.makeLogData(tp.file.path(), tp.file.title) %>
---

# <% tp.user.getRidSubjectTitle(tp.file.title) %>
<% tp.user.makeSubjectTag(tp.file.title) %>

<% tp.date.now("yyyy-MM-DD HH:mm") %>