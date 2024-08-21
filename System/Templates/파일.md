---
주제: <% tp.user.makeSubject(tp.file.title) %>
cssclasses: wide-page
생성일:  <% tp.date.now("yyyy-MM-DD HH:mm") %>
수정일:  <% tp.date.now("yyyy-MM-DD HH:mm") %>
series: <% tp.user.getSeriesAndRandomBanner(tp.file.title) %>
tags: [일반]
---
<%* tp.user.toggleAndSaveFile() %>
<%* tp.user.makeLogData(tp.file.path(), tp.file.title) %>

# <% tp.user.getRidSubjectTitle(tp.file.title) %>

<% tp.user.makeSubjectTag(tp.file.title) %>

<% tp.file.cursor() %>