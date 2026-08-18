---
layout: page
title: "Projects"
permalink: /projects/
---

# Projects

A running collection of research writeups, technical experiments, and projects I have built to understand ideas more clearly.

<div class="card card-accent">
  <h3>Crypto Momentum Map</h3>
  <p>
    A Python backtesting project testing cross-sectional momentum across a small cryptocurrency universe.
  </p>
  <p>
    The strategy ranks coins by recent returns, builds long-short portfolios,
    includes transaction costs, and compares performance across multiple lookback windows.
  </p>
  <p>
    <strong>Main finding:</strong> very short-term momentum failed after costs,
    while 30-day and 60-day momentum were more resilient.
  </p>
  <a class="button" href="{{ site.baseurl }}/crypto-momentum-map/">Read the full post →</a>
</div>

<div class="card card-neutral">
  <h3>SimFin Residual Momentum Appendix</h3>
  <p>
    An equity extension using SimFin data. I tested residual momentum on five large-cap
    technology stocks after adjusting for QQQ exposure.
  </p>
  <p>
    <strong>Main finding:</strong> a 60-day residual return signal had the strongest result
    in this small test, though the universe was too small to claim a robust strategy.
  </p>
  <a class="button-secondary" href="{{ site.baseurl }}/crypto-momentum-map/">Read the appendix →</a>
</div>

<div class="card-grid">
  <div class="card card-neutral">
    <h3>Quantitative finance</h3>
    <p>
      Backtests, market signals, risk, transaction costs, and practical research design.
    </p>
  </div>

  <div class="card card-neutral">
    <h3>Data science</h3>
    <p>
      Statistical modeling, machine learning, time series, and thoughtful data analysis.
    </p>
  </div>

  <div class="card card-neutral">
    <h3>More coming soon</h3>
    <p>
      This page will keep growing as I add more projects from quant finance,
      data science, physics, and ideas from the edge of my notebook.
    </p>
  </div>
</div>
