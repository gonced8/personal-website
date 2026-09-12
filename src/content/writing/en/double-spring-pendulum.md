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

![Diagram of the double spring pendulum](/writing/double-spring-diagram.png)

## From mechanics to code

I used a Lagrangian formulation: express kinetic energy for both masses, add gravity and spring potential energy, then apply Euler–Lagrange equations to each coordinate. Mathematica helped solve the resulting coupled equations, and I wrote a small Python visualisation to test the model.

![Pages from the original derivation](/writing/double-spring-derivation.jpg)

![Simulation of the coupled springs](/writing/double-spring-simulation.gif)

The experiment also made numerical stability visible. The equations alone do not guarantee a stable simulation: a simple time-stepping method can add error and apparent energy. Reducing the time step helped, while a better ODE solver such as Runge–Kutta is the natural next step.

The original post has the full derivation and the historical Python implementation.
