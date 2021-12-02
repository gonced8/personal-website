---
layout: page
title: Teaching
permalink: /teaching/
---

{% for course in site.teaching %}
  <h2>
    <a href="{{ course.url }}">
      {{ course.title }}
    </a>
  </h2>
{% endfor %}
