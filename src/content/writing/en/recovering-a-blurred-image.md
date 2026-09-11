---
title: "Can you recover a blurred image?"
description: "An experiment with reverse convolution, deblurring and Julia notebooks."
date: 2024-03-10
locale: en
tags: [julia, imaging, experiments]
draft: false
featured: false
---

Blurring is a familiar image-processing operation: information from a pixel spreads to its neighbours according to a kernel. Reversing that process is much less forgiving. Noise, assumptions about the kernel and numerical stability all become part of the problem.

This is a short home for an ongoing adaptation of an older experiment, built in Julia and Pluto. The accompanying repository explores reverse convolution and the trade-offs that appear when attempting deblurring in practice.

See the work in [reverse-convolution](https://github.com/gonced8/reverse-convolution).
