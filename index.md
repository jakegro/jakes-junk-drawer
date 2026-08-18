---
layout: home
title: "Jake's Junk Drawer"
---

{% assign latest_post = site.posts.first %}

<div class="hero">
  <div class="hero-kicker">Project notebook</div>

  <h1>Jake’s Junk Drawer</h1>

  <p>
    <strong>Quant finance, data science, physics, and useful nonsense.</strong>
  </p>

  <p>
    A project blog for ideas I am trying to understand by building.
  </p>

  <div class="label-row">
    <span class="drawer-label">Quant research</span>
    <span class="drawer-label">Statistical modeling</span>
    <span class="drawer-label">Time series</span>
    <span class="drawer-label">Technical notes</span>
  </div>

  <div class="button-row">
    <a class="button" href="{{ latest_post.url | relative_url }}">Read latest post</a>
    <a class="button-secondary" href="{{ site.baseurl }}/projects/">View projects</a>
  </div>
</div>

## Latest from the notebook

<div class="card card-accent">
  <h3>{{ latest_post.title }}</h3>

  <p>
    I tested whether recent crypto winners continue to outperform recent crypto losers
    using Python, long-short portfolio construction, transaction costs, sensitivity analysis,
    and benchmark exposure checks.
  </p>

  <p>
    <strong>Main finding:</strong> very short-term crypto momentum failed after costs,
    while 30-day and 60-day momentum were more resilient.
  </p>

  <a class="button" href="{{ latest_post.url | relative_url }}">Read the post →</a>
</div>

## Research areas

<div class="card-grid">

  <div class="card card-accent">
    <h3>Quantitative finance</h3>
    <p>
      Backtests, signals, risk, transaction costs, and the difference between
      a promising idea and a strategy that survives implementation.
    </p>
  </div>

  <div class="card card-neutral">
    <h3>Data science</h3>
    <p>
      Python projects, statistical modeling, machine learning, time series,
      and model evaluation on imperfect data.
    </p>
  </div>

  <div class="card card-neutral">
    <h3>Physics-inspired modeling</h3>
    <p>
      Breaking complicated systems into simpler models and checking whether
      the assumptions actually hold.
    </p>
  </div>

  <div class="card card-neutral">
    <h3>Project notes</h3>
    <p>
      Technical writeups, research ideas, experiments, and lessons from
      projects that are still developing.
    </p>
  </div>

</div>

<script src="{{ site.baseurl }}/assets/js/notebook-background.js"></script>
