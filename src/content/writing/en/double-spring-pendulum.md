---
title: "Double Spring Pendulum"
description: "A Lagrangian derivation and numerical experiment for a coupled spring pendulum."
date: 2016-09-06
locale: en
tags: [physics, simulation, python, lagrangian-mechanics]
draft: false
featured: false
---

> An edited republication of [my original post](https://thelifeofgo.blogspot.com/2016/09/double-spring-pendulum_3.html), published in 2016.

This variation on a double pendulum replaces the rigid rods with springs. Two angles and two changing spring lengths give the system four degrees of freedom.

![Diagram of the double spring pendulum](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUoq1l4g3X3VEKEyNAaaJcRxwRUH5_BC6j6i73C1NZnlc8g_0Zl93SlXFLJ1uBiazFzl4gKxTiMRQngipaptckDgQMkx6__TaemILlF8vJmpshMb3Z9KwDxqEl9YqBcbgci3xNnF1fpZU/s1600/Captura+de+Ecr%25C3%25A3+%2528196%2529.png)

## From mechanics to code

I used a Lagrangian formulation: express kinetic energy for both masses, add gravity and spring potential energy, then apply Euler–Lagrange equations to each coordinate. Mathematica helped solve the resulting coupled equations, and I wrote a small Python visualisation to test the model.

![Pages from the original derivation](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjj938qD9ge1yZXc3RvUs9io4WjMbyYq-ZBIzCRoJFn_7tyvj1KNPOql2Ju-_LFep-_ma6uLL_gZaDrv6PbBroHlO86wn7p3qZwIYhYZycw68Y8_QOHJRKtAgtTxgO-6Uwp_8Nx-ZRaik/s1600/Go2-page-001.jpg)

![Simulation of the coupled springs](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPtOq_cZasDk8692iBkNeQuapQOb51ofs_1HYqAFQj1jjOKrKD0fvbpIia18CQ8ELqbaCdnqxRTP2rpg_F_fmQTDhgw5L5TfQUVk1o9XhL1wVwdJmwK3m6FqremqEn7mMxXkZZUAzKxI8/s1600/Untitled2.gif)

The experiment also made numerical stability visible. The equations alone do not guarantee a stable simulation: a simple time-stepping method can add error and apparent energy. Reducing the time step helped, while a better ODE solver such as Runge–Kutta is the natural next step.

The original post has the full derivation and the historical Python implementation.
