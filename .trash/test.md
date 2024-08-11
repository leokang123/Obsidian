---

creation date: <% tp.file.creation_date() %>
tags: <% tp.file.creation_date("YYYY") %> <% tp.system.prompt("Tags?") %>
Aliases:
- <% tp.file.title %>
banner: "{image-url}"
---
<% tp.file.cursor(1) %>