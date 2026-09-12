---
title: "Can you recover a blurred image?"
description: "What reverse convolution can recover — and the information it still needs."
date: 2020-09-13
updated: 2026-09-12
locale: en
tags: [julia, imaging, convolution, linear-algebra]
draft: false
featured: false
---

> An edited republication of [my original Medium article](https://medium.com/@gonced8/can-you-recover-a-blurred-image-61bbcaa969d5), published in 2020.

Can a blurred image be recovered? Usually, blur discards useful information. But when the blur operation, boundary treatment and output dimensions are all known, convolution can be written as a linear system and, in a controlled case, inverted.

![An animation showing convolution as a filter moving over an image](/writing/convolution-animation.gif)

_Convolution illustration by [vdumoulin/conv_arithmetic](https://github.com/vdumoulin/conv_arithmetic), as credited in the original article._

## Convolution as a linear system

For an image `x`, kernel `k` and output `y`, convolution can be represented as `A · x = y`. `A` is determined by the kernel and padding rule. If convolution makes the output smaller than the input, the system is underdetermined and there is no unique original image.

With suitable padding, an odd-sized kernel and a same-size output, `A` can be square. When it is invertible, the original can be calculated from `x = A⁻¹ · y`.

![The same-size convolution system represented as a square matrix](/writing/convolution-square-matrix.png)

## The Julia experiment

I implemented this in Julia and Pluto using a Gaussian blur with replicate padding. Knowing the exact kernel and padding, I built `A` and recovered the original from the blurred result alone. In that controlled setup, the reconstruction is exact.

![Original image and Gaussian-blurred image](/writing/blurred-original.png)

_Original and blurred image._

![Blurred image and exact reconstruction](/writing/blurred-reconstruction.png)

_Blurred image and reconstruction using the known kernel and padding._

This is not a general-purpose deblurring technique. A slightly different kernel leaves blur and artefacts; the wrong padding can make the result unusable. The matrix also grows rapidly with image size. It is a useful experiment in convolutions, linear algebra and image processing, rather than a way to recover arbitrary blurred photographs.

![Reconstruction with an incorrect kernel](/writing/blurred-wrong-kernel.png)

_Using an incorrect kernel leaves blur and artefacts._

The [reverse-convolution repository](https://github.com/gonced8/reverse-convolution) contains the notebook. The original article includes the worked visual examples and fuller derivation.
