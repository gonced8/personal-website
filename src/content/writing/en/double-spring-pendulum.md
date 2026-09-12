---
title: "Double Spring Pendulum"
description: "The complete Lagrangian derivation, Mathematica workings and original Python simulation of a double spring pendulum."
date: 2016-09-06
updated: 2026-09-12
locale: en
tags: [physics, simulation, python, lagrangian-mechanics]
draft: false
featured: false
---

> Originally published on [The Life of Go](https://thelifeofgo.blogspot.com/2016/09/double-spring-pendulum_3.html) in 2016. Republished here with the full text, equations, derivation images and code.

It's a small variation of a simple physics problem, the double pendulum. In this case, the wires are not rigid, but instead, they're springs, therefore, double spring pendulum.

The problem consists in finding the motion equations of this system. Here's a representation of the system:

[![Double spring pendulum diagram](/writing/double-spring-diagram.png)](/writing/double-spring-diagram.png)

## The Lagrangian

I chose to solve this problem with a Lagrangian approach. Of course it'd be possible with Newton, but it would be so much more "painful".

For this reason, I started by writing the Lagrangian of the system. There are 4 degrees of freedom: $\alpha$, $\beta$, $a$ and $b$. With those identified, we can write the kinetic energy followed by the potential energy.

$$
K = \frac{1}{2} m_{1}v_{1}^2 + \frac{1}{2} m_{2}v_{2}^2
$$

$$
\overrightarrow{v_{1}}=\overrightarrow{\dot{a}}+\overrightarrow{\dot{\alpha}a}
$$

$$
\overrightarrow{v_{2}}=\overrightarrow{v_{1}}+\overrightarrow{v'}= \overrightarrow{v_{1}} + \left ( \overrightarrow{\dot{b}}+\overrightarrow{\dot{\beta}b} \right )
$$

In this case $\overrightarrow{v_{1}}$ and $\overrightarrow{v_{2}}$ stand for the velocity of each mass, and $\overrightarrow{v'}$ for the relative velocity between the second mass with respect to the first.

It will be useful to find the expression for the square of each. The first one is very easy, due to the fact that the vectors are perpendicular. The second one, unfortunately, isn't that straight forward, but I'll spare you the math in between.

$$
v_{1}^2=\dot{a}^2+\dot{\alpha}^2a^2
$$

$$
\begin{aligned}
v_{2}^2 &= \dot{a}^2+\dot{\alpha}^2a^2+\dot{b}^2+\dot{\beta}^2b^2 \\
&+ 2\ sin(\alpha - \beta)\left (\dot{a}\dot{\beta}b - \dot{b}\dot{\alpha}a \right ) + 2\ cos(\alpha - \beta)\left (\dot{a}\dot{b} + \dot{\alpha}a\dot{\beta}b \right )
\end{aligned}
$$

The potential energy follows as:

$$
U=m_{1}gy_{1}+m_{2}gy_{2}+\frac{1}{2}k_{1}\Delta l_{1} ^2+\frac{1}{2}k_{2}\Delta l_{2} ^2
$$

$$
y_{1}=-a\ cos\ \alpha
$$

$$
y_{2}=-(a\ cos\ \alpha + b\ cos\ \beta)
$$

$$
\Delta l_{1} = a - l_{1}
$$

$$
\Delta l_{2} = b - l_{2}
$$

Where $l_{1}$ and $l_{2}$ are the springs' free lengths.

## Equations of motion

Now that we have defined the Lagrangian, we can calculate the Euler–Lagrange equations of motion:

$$
\frac{\partial L}{\partial \alpha}-\frac{\mathrm{d} }{\mathrm{d} t}\left ( \frac{\partial L}{\partial{\alpha}'} \right )=0
$$

$$
\frac{\partial L}{\partial \beta}-\frac{\mathrm{d} }{\mathrm{d} t}\left ( \frac{\partial L}{\partial{\beta}'} \right )=0
$$

$$
\frac{\partial L}{\partial a}-\frac{\mathrm{d} }{\mathrm{d} t}\left ( \frac{\partial L}{\partial{a}'} \right )=0
$$

$$
\frac{\partial L}{\partial b}-\frac{\mathrm{d} }{\mathrm{d} t}\left ( \frac{\partial L}{\partial{b}'} \right )=0
$$

## Mathematica derivation

At this part, I decided to use the tools of Wolfram Mathematica to solve this equations and find the solution of this system. The four pages of the original Mathematica derivation are below.

[![Mathematica derivation, page 1 of 4](/writing/double-spring-derivation.jpg)](/writing/double-spring-derivation.jpg)

[![Mathematica derivation, page 2 of 4](/writing/double-spring-derivation-2.jpg)](/writing/double-spring-derivation-2.jpg)

[![Mathematica derivation, page 3 of 4](/writing/double-spring-derivation-3.jpg)](/writing/double-spring-derivation-3.jpg)

[![Mathematica derivation, page 4 of 4](/writing/double-spring-derivation-4.jpg)](/writing/double-spring-derivation-4.jpg)

Otherwise, the result is:

$$
\alpha''=-\frac{1}{a} \left (2\,a'\,\alpha' + g\,sin(\alpha)+\frac{k_{2}}{m_{1}}\,(b-l_{2})\,sin(\alpha-\beta) \right )
$$

$$
\beta''=-\frac{1}{b} \left(\,2\,b'\,\beta' - \frac{k_{1}}{m_{1}}\,(a-l_{1})\,sin(\alpha-\beta)\,\right )
$$

$$
a''=\alpha'^2a+g\,cos(\alpha)-\frac{k_{1}}{m_{1}}\,(a-l_{1})+\frac{k_{2}}{m_{1}}\,(b-l_{2})\,cos(\alpha-\beta)
$$

$$
b''=\beta'^2\,b-\frac{k_{2}}{m_{2}}\,(b-l_{2})\,-\frac{k_{2}}{m_{1}}\,(b-l_{2})+\frac{k_{1}}{m_{1}}\,(a-l_{1})\,cos(\alpha-\beta)
$$

## Numerical simulation

Having these equations, I chose to make a little simulation in Python to test the results. In the next gif, you can see how it worked (for some arbitrary initial values):

![Double spring pendulum simulation](/writing/double-spring-simulation.gif)

## Original Python implementation

The original Python implementation follows:

```python
import math
from visual import *

def calc_a_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g):
    return ((k1*l1+g*m1*math.cos(alpha_0)-k2*l2*math.cos(alpha_0-beta_0)+k2*b_0*math.cos(alpha_0-beta_0)+a_0*(-k1+m1*(alpha_1**2)))/m1)

def calc_b_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g):
    return ((k2*l2*m1+k2*l2*m2-k1*l1*m2*math.cos(alpha_0-beta_0)+k1*m2*a_0*math.cos(alpha_0-beta_0)-b_0*(k2*(m1+m2)-m1*m2*(beta_1**2)))/(m1*m2))

def calc_alpha_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g):
    return (-((g*m1*math.sin(alpha_0)-k2*l2*math.sin(alpha_0-beta_0)+k2*b_0*math.sin(alpha_0-beta_0)+2*m1*a_1*alpha_1)/(m1*a_0)))

def calc_beta_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g):
    return ((-k1*l1*math.sin(alpha_0-beta_0)+k1*a_0*math.sin(alpha_0-beta_0)-2*m1*b_1*beta_1)/(m1*b_0))

alpha_0 = math.pi/2
beta_0 = 0
alpha_1 = 0
beta_1 = 0
alpha_2 = 0
beta_2 = 0

a_0 = 1
b_0 = 1
a_1 = 0
b_1 = 0
a_2 = 0
b_2 = 0

l1 = 1
l2 = 1
m1 = 1
m2 = 2
k1 = 200
k2 = 300
g = 9.81

dt = 0.001
t_max = 60
t=0


scene.autoscale = 0 # stop it from zooming in and out
scene.title = 'Double pendulum'
scene.range = (3, 3, 1)

#Center
ball0 = sphere(pos=vector(0, 0, 0), radius=0.05, color=color.cyan)

#Balls
ball1 = sphere(pos=vector(a_0*math.sin(alpha_0), -a_0*math.cos(alpha_0),0), radius=0.12, color=color.blue, make_trail=True, retain=int(1.0/dt))
ball2 = sphere(pos=vector(a_0*math.sin(alpha_0) + b_0*math.sin(beta_0), -a_0*math.cos(alpha_0) - b_0*math.cos(beta_0), 0), radius=0.12, color=color.red, make_trail=True, retain=int(1.0/dt))

#Strings
arm1 = cylinder(pos=(0,0,0), axis=(a_0*math.sin(alpha_0), -a_0*math.cos(alpha_0),0), radius=.03, color=color.white)
arm2 = cylinder(pos=(a_0*math.sin(alpha_0), -a_0*math.cos(alpha_0),0), axis=(b_0*math.sin(beta_0), -b_0*math.cos(beta_0), 0), radius=.03, color=color.white)

#while t<t_max :
while 1:
    rate(1/dt)

    if(round(t, int(-math.log10(dt)))%1 == 0):
        print "%ds" %t

    alpha_2 = calc_alpha_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g)
    beta_2 = calc_beta_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g)
    a_2 = calc_a_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g)
    b_2 = calc_b_2 (alpha_0,alpha_1, beta_0, beta_1, a_0, a_1, b_0, b_1, l1, l2, k1, k2, m1, m2, g)

    alpha_1 = alpha_1 + alpha_2*dt
    beta_1 = beta_1 + beta_2*dt
    a_1 = a_1 + a_2*dt
    b_1 = b_1 + b_2*dt

    alpha_0 = alpha_0 + alpha_1*dt
    beta_0 = beta_0 + beta_1*dt
    a_0 = a_0 + a_1*dt
    b_0 = b_0 + b_1*dt

    alpha_0 = alpha_0%(2*math.pi)
    beta_0 = beta_0%(2*math.pi)

    ball1.pos.x = a_0*math.sin(alpha_0)
    ball1.pos.y = -a_0*math.cos(alpha_0)
    arm1.axis = (ball1.pos.x, ball1.pos.y, 0)

    ball2.pos.x = ball1.pos.x + b_0*math.sin(beta_0)
    ball2.pos.y = ball1.pos.y - b_0*math.cos(beta_0)
    arm2.pos = (ball1.pos.x, ball1.pos.y, 0)
    arm2.axis = (ball2.pos.x - ball1.pos.x, ball2.pos.y - ball1.pos.y, 0)

#    if (t==0):
#        raw_input()

    t=t+dt
```

Hope that this was helpful to you in any way! If any doubt remains, feel free to contact me or to comment bellow.

## A note on this republication

This is the complete 2016 article, with its derivation and historical implementation. The code uses Python 2 and the old VPython `visual` module; it is preserved as an archive, not presented as a current installation guide. The original simulation uses simple time stepping and arbitrary initial conditions. Its numerical stability and energy conservation should be assessed before using it for further analysis.
