---
title: "Can you recover a blurred image?"
description: "Reversing a convolution in Julia: the full explanation, equations and reconstruction experiments."
date: 2020-09-13
updated: 2026-09-12
locale: en
translationKey: recovering-a-blurred-image
projectId: reverse-convolution
tags: [julia, imaging, convolution, linear-algebra]
draft: false
featured: false
---

> Originally published on [Medium](https://medium.com/@gonced8/can-you-recover-a-blurred-image-61bbcaa969d5) in 2020. Republished here in full, with locally stored images and the original credits.

I was watching a video by Grant Sanderson (aka 3Blue1Brown) about convolutions, image processing, and the Julia programming language (awesome language!) when someone asked this question.

[Watch Grant Sanderson’s video on convolutions and Julia](https://www.youtube.com/watch?v=8rrHTtUzyZA&t=878s). I recommend it very much!

He answered (correctly) that he didn’t think so, because we’d be losing information. However, I thought a little more about the question and figured that it would actually be possible if the output image had the same size as the input one! This way, the output has enough pixels/information to recover the original one.

## Convolution as a filter

First, I should start by explaining what a convolution is and how it can be used to blur an image. If you want a thorough explanation, I suggest the video above, but if you want a quick one, I got you. So, a convolution is a mathematical operation that, when applied to images, can be seen as a filter applied to it.

![GIF of the implementation of a convolution operation on an image](/writing/convolution-animation.gif)

_Image from GitHub: [vdumoulin](https://github.com/vdumoulin)/[conv_arithmetic](https://github.com/vdumoulin/conv_arithmetic) ._

In this animation, we can see an example of a convolution of an image with a filter/kernel. The original image would be the blue matrix, the kernel the sliding dark blue matrix, and the output the greenish-blue matrix.

The convolution is obtained by multiplying the overlapping kernel and image and summing the products. The following equations may help: given an image _x_ and a kernel _k_, the result of the convolution will be*y*,

[![convolution(x4, 4, k3, 3) = y2, 2](/writing/convolution-example.png)](/writing/convolution-example.png)

with

[![Expressions for each element of y, as a sum of products of x and k.](/writing/convolution-equations.png)](/writing/convolution-equations.png)

If you already knew how convolutions on images worked, maybe this system of equations isn’t too scary. If you didn’t, don’t worry, you won’t have to remember it, that’s the program job! A useful representation is to interpret the convolution as a matrix multiplication, which isn’t too difficult to write from the equations above:

[![Convolution of x and k in matrix form.](/writing/convolution-matrix.png)](/writing/convolution-matrix.png)

equivalent to the matrix equation

[![A4 x 16 x16 x 1 = y4 x 1](/writing/convolution-rectangular-system.png)](/writing/convolution-rectangular-system.png)

With this representation, it seems that knowing _A_ and _y_, then _x_ could be calculated by solving the equation above. However, since _A_ has more columns than rows, the system is said to be undetermined, which means that we can’t obtain only one solution.

## Keeping the input and output the same size

I started by saying that, to be possible to reverse a convolution, the input and output sizes would have to be the same. In matrix form, this would correspond to *A*being square (same number of rows and columns), allowing us to invert it and calculate _x_ as

[![x = A^-1 * y](/writing/convolution-inverse.png)](/writing/convolution-inverse.png)

Now, our input is 4x4 and the output is 2x2. How can we obtain an output with the same size as the input? One way would be to add a padding to the input image, for example, 0-padding,

[![convolution(x4, 4, k3, 3 with 0-padding of 1) = y3, 3](/writing/convolution-padding-example.png)](/writing/convolution-padding-example.png)

This way, the output would be 4x4 like the original input. In detail, for this simple case of a convolution with padding, the output dimensions can be calculated as,

[![out size = in size + 2 * padding — kernel size + 1](/writing/convolution-output-size.png)](/writing/convolution-output-size.png)

If we want the input and output to have the same size, then the padding has to be,

[![padding = (kernel size — 1) / 2](/writing/convolution-padding-size.png)](/writing/convolution-padding-size.png)

which yields an important condition: the kernel size has to be odd since the padding is an integer value.

This convolution can also be represented as a matrix multiplication as the one above, but I’ll spare you the boredom of reading it since the dimensions would be much larger. One would write the equations of the convolution associated with each entry of *y*and then structure it as a matrix multiplication as above.

[![A16 x 16 x16 x 1 = y16 x 1](/writing/convolution-square-matrix.png)](/writing/convolution-square-matrix.png)

Notice that despite the padded input being 6x6, corresponding to 36 elements, only 4x4 of those elements are unique and unknown variables. Therefore, _x_ in the equation can be only 16x1, instead of 36x1.

**To solve for *x*and reverse the convolution, one only needs to know _A_ and _y_. To construct _A_, one needs to know the kernel used for the convolution and the type of padding used.**

## A Julia experiment

Now, how could this be used?

An image can be blurred by doing a convolution. For example, a Gaussian Blur is obtained by convolving an image with a kernel/filter that has a Gaussian distribution with the largest value at the center and values that sum to 1. An example would be the kernel

[![Example of a 3x3 Gaussian kernel.](/writing/convolution-gaussian-kernel.png)](/writing/convolution-gaussian-kernel.png)

I did a simple implementation of this problem in Julia to check that it is, in fact possible, to reverse the convolution, which you can review and use at the link below.

[gonced8/reverse-convolution](https://github.com/gonced8/reverse-convolution)

So I started by blurring an image with a Gaussian Blur. I did a convolution of the original one with a Gaussian kernel and used replicate padding (values outside the original image are set to the nearest border value, instead of 0).

[![original image on the left and blurred image on the right](/writing/blurred-original.png)](/writing/blurred-original.png)

_Original image on the left and blurred one on the right._

Since I knew the kernel used, I was able to construct the matrix _A_ and then solve for _x_. The results are as expected: the reconstructed image is exactly equal to the original one.

[![Blurred image and reconstruction using the known kernel and padding](/writing/blurred-reconstruction.png)](/writing/blurred-reconstruction.png)

_Blurred image on the left and reconstructed one on the right._

Feel free to check the implementation linked above and verify that the original image was not used in the reconstruction.

## When the kernel or padding is wrong

Now, this 100% reconstruction is only possible because the kernel and padding used are known. What happens if we use a kernel that is not exactly the same as the one used to blur the original image?

[![Blurred image on the left and reconstructed on the right. Reconstructed is still blurry and has artifacts/stripes.](/writing/blurred-wrong-kernel.png)](/writing/blurred-wrong-kernel.png)

_Blurred image on the left and reconstructed one on the right, when not using the exact kernel._

And what if we assume 0-padding when replicate padding was used?

[![Blurred image on the left and reconstructed on the right. Reconstructed is like a psychedelic noise, nowhere similar.](/writing/blurred-wrong-padding.png)](/writing/blurred-wrong-padding.png)

_Blurred image on the left and reconstructed one on the right, when not assuming the exact padding._

As we can see, if we don’t know the kernel and padding used, then we’re not able to reconstruct the original image. In this sense, it can almost be seen as an encryption problem: if we know the “key”, then we’re able to reconstruct the original message without any loss or additional noise.

Reconstructing the original image is also a very expensive task since matrix _A_ grows very fast depending on the size of the original image. If the original image was 4x4, then A would be 16x16 — the number of elements scale with N².

Hope you liked this brief explanation and found it interesting. I surely did and it was a very good way to learn more about Julia, convolutions, image processing, and linear algebra. If you have any questions and/or find any error, feel free to share.

> As a goodbye note, I think we don’t need to worry about people reversing our blurred photos, for now.

[![Blurred image on the left and reconstructed one on the right. Reconstructed image is of a monkey.](/writing/blurred-monkey.png)](/writing/blurred-monkey.png)

_Blurred image on the left and reconstructed one on the right._

[![Blurred and reconstructed image of woman named Lena.](/writing/blurred-featured.png)](/writing/blurred-featured.png)

_Featured image._

## A note on this republication

The original text above is preserved from 2020. A square matrix is not necessarily invertible: recovery also requires a nonsingular operator, and numerical conditioning matters. The odd-kernel condition assumes symmetric integer padding and unit stride. Here, $N$ denotes the number of image pixels, so a dense $N \\times N$ convolution matrix stores $N^2$ entries. The historical analogy with encryption is an intuition, not a security guarantee.
