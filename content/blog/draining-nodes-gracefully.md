+++
title = "Draining Kubernetes Nodes Without Waking Anyone"
date = 2026-05-18
description = "PodDisruptionBudgets, terminationGracePeriod, and the small settings that make node rotation boring."
[taxonomies]
tags = ["kubernetes", "operations"]
[extra]
toc = true
+++

Rotating nodes should be a non-event. In practice it pages people, because the
defaults optimize for "it works on an empty cluster," not "it works while
serving traffic." Here are the knobs that matter.

## PodDisruptionBudgets

A `PodDisruptionBudget` tells the eviction API how much disruption a workload
can tolerate. Without one, `kubectl drain` will happily evict every replica at
once.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api
spec:
  minAvailable: 80%
  selector:
    matchLabels:
      app: api
```

Prefer `minAvailable` as a percentage over an absolute count, so it scales with
the deployment.

## Termination grace period

The drain sends `SIGTERM`, then waits `terminationGracePeriodSeconds` before
`SIGKILL`. Your app must:

1. Stop accepting new connections on `SIGTERM`.
2. Finish in-flight requests.
3. Exit before the deadline.

> If your readiness probe keeps the pod in rotation during shutdown, you'll drop
> requests no matter how long the grace period is. Fail readiness first.

## Putting it together

With a PDB, a sane grace period, and a `preStop` sleep to let the load balancer
deregister, a full node roll becomes something you can run at 2pm instead of 2am.
