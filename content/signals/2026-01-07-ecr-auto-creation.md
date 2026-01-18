---
title: "AWS ECR: Automatic Repository Creation"
date: 2026-01-18T21:00:00+01:00
tags: ["aws", "ecr", "docker", "quality of life"]
summary: "AWS now supports creating ECR repositories on push. A massive quality-of-life improvement that eliminates the need for 'workaround' infrastructure code."
layout: "signals"
---

Not a big feature, but a massive quality-of-life improvement. **Automatic ECR repository creation** is one of those features we’ve needed for a long time.

Literally a couple of weeks ago, we discussed with the team how to automate this to simplify life for both us and the developers. Now it’s native, and we won’t have to spend time building "workarounds" or custom Lambda triggers just to `docker push` a new service.

[Read the announcement: Creating repositories on push →](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ecr-creating-repositories-on-push/)
