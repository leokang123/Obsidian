---
주제: <% if (tp.file.title.match(/\[(.*)\]/).isArray()) return tp.file.title.match(/\[(.*)\]/)[1]; return "Default";%>
cssclasses: wide-page
생성일: <% tp.date.now("yyyy-MM-DD HH:mm") %>
수정일: 2024년 08월 04일 오후 18시 35분
series: <% Number(tp.file.title.match(/\d+/)) + 1 || 1 %>
---


# 파일이름