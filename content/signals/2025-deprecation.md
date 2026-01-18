---
title: "The Cost of Tooling: 2025 Deprecation Review"
date: 2026-01-15T10:00:00+01:00
tags: ["kaniko", "nginx", "deprecation", "devops"]
summary: "Kaniko, NGINX Unit, Ingress-NGINX... The more operator tools you use, the more time you will spend replacing them."
---

![Image description](/images/2o1bv12o1bv12o1b.jpg)

The more operator tools you use, the more time you will spend replacing them after deprecation. Your processes might be well-optimized, but a chain of deprecations can cause you to spend time solving problems you have already solved before, and now you have to make changes that could make your system less stable than before.

The year 2025 was a year of deprecation:

1. **Kaniko** was deprecated ([link](https://github.com/GoogleContainerTools/kaniko)). Our team spent quite some time finding a solution with similar performance to avoid increasing pipeline build times.

2. **NGINX Unit** ([link](https://unit.nginx.org/)) was discontinued. Similarly, we had to find an application server that could handle high loads without slowing down.

3. **Ingress-NGINX** ([link](https://github.com/kubernetes/ingress-nginx)) was discontinued—the most impactful. The options were either to migrate to another solution or start using an API gateway.

Finding an “ideal” solution that fits your current needs doesn’t guarantee stability in the long term. One day, you might have to migrate to something new, introducing potential instability to your system.
