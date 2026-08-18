---
layout: post
title: "Crypto Momentum Map: What Survives Trading Costs?"
date: 2026-08-17 16:35:00 -0400
categories: quant finance crypto data-science
permalink: /crypto-momentum-map/
---

<div class="project-meta">
  <p><strong>Project type:</strong> Quantitative research backtest</p>
  <p><strong>Tools:</strong> Python, pandas, plotnine, yfinance, SimFin</p>
  <p><strong>Main idea:</strong> Test whether recent crypto winners continue to outperform recent crypto losers</p>
  <p><strong>Key finding:</strong> Short-term crypto momentum looked interesting before costs, but only the slower 30-day and 60-day versions survived trading costs</p>
</div>

# Crypto Momentum Map: What Survives Trading Costs?

This project started with a simple question:

**Do cryptocurrencies with strong recent returns continue to outperform cryptocurrencies with weak recent returns?**

In quant finance, this idea is called momentum. The basic version is easy to explain: rank assets by recent performance, buy the recent winners, short the recent losers, and see whether that pattern continues.

The harder part is figuring out whether the idea still works after reality shows up.

Reality means trading costs. Reality means turnover. Reality means drawdowns. Reality means one coin randomly exploding while you are short it.

So instead of only asking, “Does momentum exist?” I wanted to ask a more useful question:

**What kind of crypto momentum, if any, survives trading costs?**

---

## Why I Built This

I wanted to practice the full quant research process, not just make a chart that looked good.

That meant:

- using only past information to form signals,
- trading after the signal is observed,
- building a long-short portfolio,
- including transaction costs,
- comparing multiple lookback windows,
- checking drawdowns,
- testing benchmark exposure,
- and not pretending the best-looking result is automatically a real strategy.

The goal was not to claim I found a perfect trading strategy. The goal was to build a careful research process and learn where the idea works, where it breaks, and why.

---

## The Data

I used daily price data for ten cryptocurrencies:

<div class="label-row">
  <span class="drawer-label">BTC</span>
  <span class="drawer-label">ETH</span>
  <span class="drawer-label">SOL</span>
  <span class="drawer-label">BNB</span>
  <span class="drawer-label">XRP</span>
  <span class="drawer-label">ADA</span>
  <span class="drawer-label">DOGE</span>
  <span class="drawer-label">AVAX</span>
  <span class="drawer-label">LINK</span>
  <span class="drawer-label">LTC</span>
</div>

The cleaned price panel had **2,054 daily observations** and **10 assets**, with no missing values in the final panel.

Before building a strategy, I looked at the assets individually. This helped me understand the world the strategy was trading in.

SOL was the strongest coin in the sample. One dollar in SOL grew to about **$40.82**, while LTC was the weakest and ended at about **$0.35**. That already tells an important story: crypto returns were extremely uneven. Some coins had massive runs, while others lost value over the same period.

![Growth of one dollar by coin]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_growth_of_one_dollar_by_coin.png)

The risk-adjusted table told a more complete story. SOL had the strongest risk-adjusted performance, followed by BNB. DOGE had a huge total return, but it was also extremely volatile, so its risk-adjusted score was much lower than SOL or BNB.

That is one reason I like looking beyond just total return. A coin can go up a lot and still be a difficult asset to trade if the ride is too wild.

---

## First Test: 7-Day Momentum

I started with a simple 7-day momentum signal.

For each day, I ranked the coins by their return over the previous seven days. Then I asked whether the recent winners outperformed the recent losers on the next day.

The first diagnostic looked promising, but only slightly.

| Metric | Result |
|---|---:|
| Average winner next-day return | 0.238% |
| Average loser next-day return | 0.114% |
| Average daily spread | 0.125% |
| Spread hit rate | 52.39% |
| Risk-adjusted score | 0.46 |
| Worst spread day | -176.40% |

The winner group did outperform the loser group on average. The hit rate was also slightly above 50%.

But this was not a “wow, free money” result. It was a weak edge. And weak edges are exactly where trading costs matter the most.

---

## The DOGE Lesson

The first major warning came from the worst spread day: **January 27, 2021**.

On that day, the strategy would have been short DOGE because DOGE had been one of the weakest coins over the previous week. Then DOGE jumped about **355.5%** the next day.

That one event crushed the raw spread.

This was a useful reminder that shorting crypto is not like shorting a boring stock. A coin can look weak, then suddenly rip higher because of retail attention, news, memes, liquidity, or some combination of all of them.

For me, this was one of the most important parts of the project. The average signal looked slightly positive, but the tail risk was huge.

A strategy can be right often enough to look interesting and still be dangerous if the bad days are large enough.

---

## Building the Actual Strategy

After the first diagnostic, I built a cleaner long-short strategy.

Each day, the strategy:

- ranked the coins by recent performance,
- bought the top two coins,
- shorted the bottom two coins,
- left the middle coins alone,
- kept the portfolio dollar-neutral,
- used 50% long exposure and 50% short exposure,
- and earned the next day’s returns.

The portfolio passed the basic sanity checks:

| Check | Result |
|---|---:|
| Maximum absolute net exposure | 0.0 |
| Average gross exposure | 1.0 |
| Number of long positions | 2 |
| Number of short positions | 2 |

This matters because I wanted the results to come from the signal, not from accidentally being long the crypto market.

---

## What Happened to the 7-Day Strategy?

The 7-day strategy looked decent before trading costs.

After costs, it fell apart.

| Metric | Before trading costs | After 20 bps trading costs |
|---|---:|---:|
| Average daily return | 0.09% | -0.04% |
| Daily volatility | 2.84% | 2.84% |
| Approximate annual return | 31.91% | -14.63% |
| Annualized volatility | 54.25% | 54.26% |
| Risk-adjusted score | 0.59 | -0.27 |
| Percent positive days | 50.44% | 45.60% |
| Worst single day | -87.72% | -87.82% |
| Largest peak-to-trough loss | -89.03% | -93.65% |
| Ending value of one dollar | 1.15 | 0.08 |
| Average daily trading activity | 63.78% | 63.78% |

Before costs, one dollar became **$1.15**. After 20 basis point trading costs, one dollar became only **$0.08**.

That is the whole problem with short-horizon stat-arb. The signal can be real, but if the strategy trades too much, the signal does not have enough room to survive.

![Seven-day strategy before and after costs]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_7_day_strategy_before_after_costs.png)

The drawdown was also brutal. Even before costs, the strategy had an almost **-89%** drawdown. After costs, the max drawdown was about **-93.65%**.

![Seven-day strategy drawdown]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_7_day_strategy_drawdown.png)

At this point, the conclusion was clear:

**The 7-day signal had weak gross predictive value, but it was not tradable under the 20 bps market-order cost assumption.**

---

## Sensitivity Analysis: Maybe the Window Matters

The next question was whether 7 days was just the wrong horizon.

So I tested multiple lookback windows:

<div class="label-row">
  <span class="drawer-label">3 days</span>
  <span class="drawer-label">7 days</span>
  <span class="drawer-label">14 days</span>
  <span class="drawer-label">30 days</span>
  <span class="drawer-label">60 days</span>
</div>

I also compared three trading-cost assumptions:

- **0 bps**, which shows the raw signal,
- **7 bps**, which is closer to a commission-only assumption,
- **20 bps**, which is the market-order assumption.

This was the most important part of the project because it showed the difference between short-horizon noise and slower momentum.

![Momentum performance by lookback window]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_momentum_performance_by_lookback.png)

At 20 bps costs, the results were:

| Lookback window | CAGR | Volatility | Risk-adjusted score | Positive days | Max drawdown | Ending value | Trading activity |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 3 days | -49.48% | 55.67% | -0.64 | 43.07% | -98.11% | 0.02 | 95.34% |
| 7 days | -35.69% | 54.26% | -0.27 | 45.60% | -93.65% | 0.08 | 63.78% |
| 14 days | -8.91% | 39.64% | -0.04 | 45.95% | -70.00% | 0.59 | 48.26% |
| 30 days | 5.35% | 38.28% | 0.32 | 47.95% | -58.03% | 1.33 | 32.78% |
| 60 days | 4.75% | 32.36% | 0.30 | 48.57% | -56.38% | 1.29 | 23.65% |

This table is where the story became much clearer.

The 3-day and 7-day strategies were destroyed by costs. They traded too much, and the edge was not strong enough.

The 14-day strategy was better, but still not attractive after costs.

The 30-day and 60-day strategies were the only versions that finished above breakeven after 20 bps costs.

![Trading activity by lookback window]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_trading_activity_by_lookback.png)

The turnover chart explains why. As the lookback window got longer, the portfolio traded less. Less trading meant fewer costs. The slower signals did not need to be amazing to beat the shorter signals; they just needed to stop bleeding so much through turnover.

![Ending value by lookback window]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_ending_value_by_lookback.png)

The 30-day strategy had the best net result. It ended at **$1.33**, with a risk-adjusted score of **0.32**. The 60-day strategy ended at **$1.29**, with a slightly lower risk-adjusted score of **0.30**, but it had lower volatility and lower turnover.

That gave me the main project finding:

**Very short-term crypto momentum was too fragile after costs. Slower 30-day and 60-day momentum held up better.**

---

## Was This Just a Hidden Bet on Crypto Going Up?

A long-short strategy should not just be a disguised long-crypto bet.

To check this, I compared the 30-day and 60-day strategies against two benchmarks:

- BTC,
- and an equal-weight crypto benchmark made from the full 10-coin universe.

BTC is the obvious crypto benchmark. The equal-weight benchmark checks whether the strategy is just accidentally exposed to the broader set of coins.

The benchmark itself had strong performance. BTC turned one dollar into about **$2.15**, while the equal-weight crypto benchmark turned one dollar into about **$9.19** over the sample.

But the momentum strategy was designed to be market-neutral, so I cared less about whether it beat those benchmarks directly and more about whether it was highly correlated with them.

The answer was encouraging.

| Lookback | Benchmark | Beta | Daily alpha | Annual alpha | Correlation |
|---:|---|---:|---:|---:|---:|
| 30 days | BTC | -0.014 | 0.0350% | 12.76% | -2.12% |
| 30 days | Equal-weight crypto | -0.001 | 0.0341% | 12.43% | -0.22% |
| 60 days | BTC | -0.032 | 0.0287% | 10.49% | -5.50% |
| 60 days | Equal-weight crypto | -0.029 | 0.0299% | 10.91% | -6.49% |

The beta and correlation numbers were close to zero. That suggests the strategy was not simply riding the crypto market.

![Market exposure by strategy]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_market_exposure_by_strategy.png)

That part was important. The strategy still had serious problems, but at least the returns were not obviously just hidden BTC exposure.

---

## Final Crypto Strategy Candidates

After all of the tests, the only crypto strategies I would even consider discussing further were the 30-day and 60-day versions.

| Lookback | CAGR | Volatility | Risk-adjusted score | Positive days | Max drawdown | Ending value | Turnover | Beta vs BTC | Annual alpha vs BTC | Correlation vs BTC |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 30 days | 5.35% | 38.28% | 0.32 | 47.95% | -58.03% | 1.33 | 32.78% | -0.014 | 12.76% | -2.12% |
| 60 days | 4.75% | 32.36% | 0.30 | 48.57% | -56.38% | 1.29 | 23.65% | -0.032 | 10.49% | -5.50% |

The 30-day strategy had the better return and risk-adjusted score.

The 60-day strategy was a little weaker, but it traded less and had lower volatility.

Neither one is production-ready. A risk-adjusted score around 0.3 with drawdowns above 50% is not something I would pretend is a finished strategy. But compared to the shorter lookbacks, these slower versions were much more defensible.

---

## Main Crypto Conclusion

This project tested whether recent crypto winners continue to outperform recent crypto losers.

The answer was:

**Sometimes, but only after slowing the signal down and being honest about costs.**

The first major finding was that very short-term momentum was fragile. The 3-day and 7-day strategies had high turnover and performed poorly after 20 basis point transaction costs. The 7-day strategy had some positive gross predictive value, but transaction costs turned the net result negative.

The second major finding was that slower momentum performed better. After costs, the 30-day and 60-day strategies were the only versions that ended above breakeven. The 30-day strategy had the strongest net result, while the 60-day strategy was slightly more conservative because it traded less.

The third finding was that the better strategies had low beta and low correlation versus BTC and the equal-weight crypto benchmark. That suggests the results were not simply disguised long-crypto exposure.

My final interpretation:

**Crypto momentum was more promising at intermediate horizons than at very short horizons. But the strategy still needs a lot of work before it could be considered serious.**

The next steps would be:

- test a larger crypto universe,
- add liquidity and volume filters,
- control position sizes by volatility,
- add stop-loss or drawdown controls,
- test out-of-sample performance,
- and compare market orders versus cheaper execution assumptions.

---

# Appendix: SimFin Residual Momentum Extension

After finishing the crypto project, I wanted to see whether the same research process could transfer to equities.

This appendix is separate from the main crypto project. The goal was not to prove an equity strategy. The goal was to test whether the framework could be reused in another asset class.

Instead of raw momentum, I tested **residual momentum**.

A residual return is the part of a stock’s return that is left after adjusting for a benchmark. In this case, I used QQQ as the benchmark and estimated each stock’s rolling beta using a 252-day window.

The equity universe was:

<div class="label-row">
  <span class="drawer-label">AAPL</span>
  <span class="drawer-label">MSFT</span>
  <span class="drawer-label">NVDA</span>
  <span class="drawer-label">AMZN</span>
  <span class="drawer-label">META</span>
</div>

The residual strategy ranked stocks by recent benchmark-adjusted returns. It bought the strongest two stocks and shorted the weakest two stocks. Since the universe had five stocks, one stock was left untraded each day.

The portfolio passed the same sanity checks as the crypto strategy:

| Check | Result |
|---|---:|
| Maximum absolute net exposure | 0.0 |
| Average gross exposure | 1.0 |
| Number of long positions | 2 |
| Number of short positions | 2 |

The residualization step worked as intended. The raw stock returns were highly correlated with QQQ, but the residual returns had correlations close to zero. That means the benchmark adjustment removed most of the broad market movement.

---

## Baseline Residual Momentum Result

The baseline residual strategy used a 20-day signal.

It was only mildly positive:

| Metric | Result |
|---|---:|
| CAGR | 0.83% |
| Annualized volatility | 13.95% |
| Risk-adjusted score | 0.13 |
| Positive days | 49.48% |
| Max drawdown | -25.98% |
| Ending value | 1.03 |
| Average daily trading activity | 25.75% |

That was not very exciting. But it was stable enough to keep testing.

---

## Residual Momentum Sensitivity

I tested four residual lookback windows: 5, 20, 60, and 120 days, using a 5 basis point trading-cost assumption.

| Lookback window | CAGR | Volatility | Risk-adjusted score | Positive days | Max drawdown | Ending value | Trading activity |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 5 days | 5.00% | 14.67% | 0.41 | 48.73% | -20.27% | 1.21 | 53.11% |
| 20 days | 0.83% | 13.95% | 0.13 | 49.48% | -25.98% | 1.03 | 25.75% |
| 60 days | 7.64% | 14.21% | 0.59 | 52.05% | -18.86% | 1.31 | 13.70% |
| 120 days | 4.72% | 14.37% | 0.39 | 49.77% | -14.47% | 1.17 | 10.38% |

The 60-day residual strategy performed best. It had the strongest risk-adjusted score, the highest ending value, and reasonable turnover.

![SimFin residual momentum score]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_simfin_residual_momentum_score.png)

The final 60-day residual strategy produced:

| Metric | Result |
|---|---:|
| Average daily return | 0.03% |
| CAGR | 7.64% |
| Annualized volatility | 14.21% |
| Risk-adjusted score | 0.59 |
| Positive days | 52.05% |
| Worst single day | -4.57% |
| Max drawdown | -18.86% |
| Ending value | 1.31 |
| Average daily trading activity | 13.70% |

![Final SimFin residual equity curve]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_final_simfin_residual_equity.png)

![Final SimFin residual drawdown]({{ site.baseurl }}/assets/images/crypto-momentum-map/figure_final_simfin_residual_drawdown.png)

This appendix was interesting because the residual equity strategy was much more stable than the crypto momentum strategies. The drawdown was smaller, the volatility was lower, and the strategy did not rely on raw market exposure.

But I would still treat it carefully.

The universe had only five stocks, and all five were large-cap technology companies. A better test would include more stocks, more sectors, longer history, and out-of-sample validation.

---

# Final Takeaway

The biggest lesson from this project was not that momentum always works.

The lesson was that **research design matters**.

A signal can look good before costs and fail after costs. A strategy can have positive average returns and still have terrible drawdowns. A backtest can look impressive until one tail event reveals the real risk.

For the crypto project, short-horizon momentum was too fragile. The slower 30-day and 60-day versions were more interesting, but still not strong enough to call production-ready.

For the SimFin appendix, residual momentum looked more stable, especially at the 60-day window, but the test was too small to overclaim.

Overall, this project gave me a better understanding of how a quant idea moves from a simple question to a real research process:

<div class="project-meta">
  <p><strong>Start with an idea.</strong></p>
  <p><strong>Build the signal carefully.</strong></p>
  <p><strong>Test it after costs.</strong></p>
  <p><strong>Check the risk.</strong></p>
  <p><strong>Do not overstate the result.</strong></p>
</div>

That is what I wanted this project to be: not a perfect strategy, but a better way of thinking.

<script src="{{ site.baseurl }}/assets/js/notebook-background.js"></script>
