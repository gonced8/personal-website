---
title: "Pêndulo duplo com molas"
description: "A dedução lagrangiana completa, o desenvolvimento em Mathematica e a simulação original em Python de um pêndulo duplo com molas."
date: 2016-09-06
updated: 2026-09-12
locale: pt-PT
translationKey: double-spring-pendulum
tags: [física, simulação, python, mecânica-lagrangiana]
draft: false
featured: false
---

> Publicado originalmente no [The Life of Go](https://thelifeofgo.blogspot.com/2016/09/double-spring-pendulum_3.html) em 2016. Republicado aqui com o texto completo, as equações, as imagens da dedução e o código.

Esta é uma pequena variação de um problema simples de física: o pêndulo duplo. Neste caso, os fios não são rígidos; são molas. Temos, portanto, um pêndulo duplo com molas.

O problema consiste em encontrar as equações de movimento deste sistema. Esta é uma representação do sistema:

[![Diagrama de um pêndulo duplo com molas](/writing/double-spring-diagram.png)](/writing/double-spring-diagram.png)

## O lagrangiano

Escolhi resolver este problema através de uma abordagem lagrangiana. Seria, naturalmente, possível usar a mecânica newtoniana, mas seria muito mais trabalhoso.

Comecei, por isso, por escrever o lagrangiano do sistema. Existem quatro graus de liberdade: $\alpha$, $\beta$, $a$ e $b$. Depois de os identificar, podemos escrever primeiro a energia cinética e, em seguida, a energia potencial.

$$
K = \frac{1}{2} m_{1}v_{1}^2 + \frac{1}{2} m_{2}v_{2}^2
$$

$$
\overrightarrow{v_{1}}=\overrightarrow{\dot{a}}+\overrightarrow{\dot{\alpha}a}
$$

$$
\overrightarrow{v_{2}}=\overrightarrow{v_{1}}+\overrightarrow{v'}= \overrightarrow{v_{1}} + \left ( \overrightarrow{\dot{b}}+\overrightarrow{\dot{\beta}b} \right )
$$

Neste caso, $\overrightarrow{v_{1}}$ e $\overrightarrow{v_{2}}$ representam a velocidade de cada massa, e $\overrightarrow{v'}$ a velocidade relativa da segunda massa em relação à primeira.

Será útil encontrar a expressão do quadrado de cada velocidade. A primeira é muito simples, porque os vetores são perpendiculares. A segunda, infelizmente, não é tão direta, mas poupo-te aos cálculos intermédios.

$$
v_{1}^2=\dot{a}^2+\dot{\alpha}^2a^2
$$

$$
\begin{aligned}
v_{2}^2 &= \dot{a}^2+\dot{\alpha}^2a^2+\dot{b}^2+\dot{\beta}^2b^2 \\
&+ 2\ sin(\alpha - \beta)\left (\dot{a}\dot{\beta}b - \dot{b}\dot{\alpha}a \right ) + 2\ cos(\alpha - \beta)\left (\dot{a}\dot{b} + \dot{\alpha}a\dot{\beta}b \right )
\end{aligned}
$$

A energia potencial é dada por:

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

onde $l_{1}$ e $l_{2}$ são os comprimentos naturais das molas.

## Equações de movimento

Agora que definimos o lagrangiano, podemos calcular as equações de movimento de Euler–Lagrange:

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

## Dedução em Mathematica

Nesta fase, decidi usar as ferramentas do Wolfram Mathematica para resolver estas equações e encontrar a solução do sistema. As quatro páginas da dedução original em Mathematica encontram-se abaixo.

[![Dedução em Mathematica, página 1 de 4](/writing/double-spring-derivation.jpg)](/writing/double-spring-derivation.jpg)

[![Dedução em Mathematica, página 2 de 4](/writing/double-spring-derivation-2.jpg)](/writing/double-spring-derivation-2.jpg)

[![Dedução em Mathematica, página 3 de 4](/writing/double-spring-derivation-3.jpg)](/writing/double-spring-derivation-3.jpg)

[![Dedução em Mathematica, página 4 de 4](/writing/double-spring-derivation-4.jpg)](/writing/double-spring-derivation-4.jpg)

O resultado é:

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

## Simulação numérica

Com estas equações, fiz uma pequena simulação em Python para testar os resultados. No GIF seguinte podes ver como funcionou, usando alguns valores iniciais arbitrários:

![Simulação de um pêndulo duplo com molas](/writing/double-spring-simulation.gif)

## Implementação original em Python

Segue-se a implementação original em Python:

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

Espero que isto te tenha sido útil de alguma forma. Se restar alguma dúvida, podes contactar-me ou deixar um comentário.

## Nota sobre esta republicação

Este é o artigo completo de 2016, incluindo a dedução e a implementação histórica. O código usa Python 2 e o antigo módulo `visual` do VPython; é preservado como arquivo, não como um guia de instalação atual. A simulação original usa uma integração temporal simples e condições iniciais arbitrárias. A sua estabilidade numérica e conservação de energia devem ser avaliadas antes de ser usada para análises adicionais.
