---
layout: post
title: "Crypto Momentum Map: What Survives Trading Costs?"
date: 2026-08-17 16:35:00 -0400
categories: quant finance crypto data-science
---

> **Project type:** Quantitative research backtest  
> **Tools:** Python, pandas, plotnine, yfinance, SimFin  
> **Main idea:** Test whether recent winners continue to outperform recent losers  
> **Key finding:** Short-term crypto momentum failed after costs, but 30-day and 60-day momentum were more resilient  

# Crypto Momentum Map: What Survives Trading Costs?

This project started with a simple question:

**Do cryptocurrencies with strong recent returns continue to outperform cryptocurrencies with weak recent returns?**

In quant finance, this idea is called momentum. If recent winners keep winning, a strategy can try to buy the strongest assets and short the weakest assets. That sounds simple, but the hard part is figuring out whether the signal is real after trading costs, risk, and bad periods.

For this project, I tested cross-sectional momentum across a small universe of cryptocurrencies. I ranked coins by recent performance, built long-short portfolios, added trading costs, and evaluated whether the strategy still looked attractive.

The main lesson was clear:

**Short-term crypto momentum looked interesting before costs, but slower 30-day and 60-day momentum was more resilient after costs.**

---

## Why I Built This

I wanted to practice the full quant research process, not just make a chart that looked good. That meant asking whether the strategy survived trading costs, whether it worked across multiple horizons, and whether the returns were just hidden market exposure.

The goal was not to claim I found a perfect trading strategy. The goal was to build a careful research process.

---

## The Strategy

The strategy is simple:

- Rank cryptocurrencies by recent returns.
- Buy the strongest recent winners.
- Short the weakest recent losers.
- Keep the portfolio dollar-neutral.
- Include trading costs.
- Test multiple lookback windows.

The main lookback windows were:

```text
3 days, 7 days, 14 days, 30 days, 60 days

## Sensitivity Analysis

Next, I tested whether the strategy worked better at different lookback windows.

![Momentum performance by lookback window]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_momentum_performance_by_lookback.png)
