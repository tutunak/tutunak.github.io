---
title: "Why Native Prometheus Instrumentation Still Wins"
date: 2026-01-02T23:00:00+01:00
tags: ["prometheus", "opentelemetry", "observability", "performance"]
summary: "Julius Volz explains why native Prometheus instrumentation is safer than OTel: you keep target health monitoring and gain significant performance."
layout: "signals"
---

With the massive hype around OpenTelemetry, it’s tempting to use its SDKs for everything. However, Julius Volz (co-founder of Prometheus) argues that for **metrics**, native Prometheus instrumentation is often superior.

Key takeaways:
1.  **Target Health:** OTel’s push model loses the context of "what *should* be running." You lose the ability to detect silent failures (absent targets) that Prometheus's Service Discovery + Pull model provides out of the box.
2.  **Performance:** Benchmarks show Prometheus Go SDKs can be up to **30x faster** than OTel SDKs for simple counter increments.
3.  **Complexity:** Mapping OTel attributes to Prometheus labels often requires complex `target_info` joins or awkward metric renaming strategies.

[Read the full analysis: Why I recommend native Prometheus instrumentation →](https://promlabs.com/blog/2025/07/17/why-i-recommend-native-prometheus-instrumentation-over-opentelemetry/)
