---
title: "É possível recuperar uma imagem desfocada?"
description: "Inverter uma convolução em Julia: a explicação completa, equações e experiências de reconstrução."
date: 2020-09-13
updated: 2026-09-12
locale: pt-PT
translationKey: recovering-a-blurred-image
projectId: reverse-convolution
tags: [julia, imagem, convolução, álgebra-linear]
draft: false
featured: false
---

> Publicado originalmente no [Medium](https://medium.com/@gonced8/can-you-recover-a-blurred-image-61bbcaa969d5) em 2020. Republicado aqui na íntegra, com as imagens guardadas localmente e os créditos originais.

Estava a ver um vídeo de Grant Sanderson (também conhecido como 3Blue1Brown) sobre convoluções, processamento de imagem e a linguagem de programação Julia (uma linguagem fantástica!) quando alguém fez esta pergunta.

[Vê o vídeo de Grant Sanderson sobre convoluções e Julia](https://www.youtube.com/watch?v=8rrHTtUzyZA&t=878s). Recomendo-o vivamente!

Ele respondeu (corretamente) que não achava que fosse possível, porque estaríamos a perder informação. No entanto, pensei um pouco mais na questão e percebi que seria possível se a imagem de saída tivesse o mesmo tamanho que a imagem de entrada. Dessa forma, a saída teria píxeis — e informação — suficientes para recuperar a imagem original.

## A convolução como filtro

Comecemos por explicar o que é uma convolução e como pode ser usada para desfocar uma imagem. Para uma explicação aprofundada, sugiro o vídeo acima; para uma versão rápida, continua por aqui. Uma convolução é uma operação matemática que, quando aplicada a imagens, pode ser entendida como um filtro.

![GIF da aplicação de uma operação de convolução a uma imagem](/writing/convolution-animation.gif)

_Imagem do GitHub: [vdumoulin](https://github.com/vdumoulin)/[conv_arithmetic](https://github.com/vdumoulin/conv_arithmetic)._

Nesta animação vemos um exemplo da convolução de uma imagem com um filtro ou _kernel_. A imagem original é a matriz azul, o _kernel_ é a matriz azul-escura que desliza sobre ela e a saída é a matriz azul-esverdeada.

A convolução obtém-se multiplicando os elementos sobrepostos do _kernel_ e da imagem e somando os produtos. As equações seguintes podem ajudar: dada uma imagem _x_ e um _kernel_ _k_, o resultado da convolução será _y_,

[![convolução de x 4 por 4 com k 3 por 3, resultando em y 2 por 2](/writing/convolution-example.png)](/writing/convolution-example.png)

com

[![Expressões para cada elemento de y como soma de produtos de x e k](/writing/convolution-equations.png)](/writing/convolution-equations.png)

Se já sabias como funcionavam as convoluções em imagens, talvez este sistema de equações não seja demasiado assustador. Se não sabias, não te preocupes: não tens de o memorizar, esse é o trabalho do programa. Uma representação útil consiste em interpretar a convolução como uma multiplicação de matrizes, que não é muito difícil de escrever a partir das equações anteriores:

[![Convolução de x e k na forma matricial](/writing/convolution-matrix.png)](/writing/convolution-matrix.png)

equivalente à equação matricial

[![A 4 por 16 multiplicada por x 16 por 1 é igual a y 4 por 1](/writing/convolution-rectangular-system.png)](/writing/convolution-rectangular-system.png)

Com esta representação, parece que, conhecendo _A_ e _y_, poderíamos calcular _x_ resolvendo a equação acima. Contudo, como _A_ tem mais colunas do que linhas, o sistema é indeterminado, o que significa que não conseguimos obter uma única solução.

## Manter a entrada e a saída com o mesmo tamanho

Comecei por dizer que, para ser possível inverter uma convolução, a entrada e a saída teriam de ter o mesmo tamanho. Na forma matricial, isto corresponderia a _A_ ser quadrada — ter o mesmo número de linhas e colunas —, permitindo invertê-la e calcular _x_ como

[![x é igual a A inversa multiplicada por y](/writing/convolution-inverse.png)](/writing/convolution-inverse.png)

Neste momento, a entrada é 4×4 e a saída é 2×2. Como podemos obter uma saída com o mesmo tamanho da entrada? Uma possibilidade é adicionar preenchimento (_padding_) à imagem de entrada — por exemplo, _zero-padding_,

[![convolução de x 4 por 4 com k 3 por 3 e zero-padding de 1, resultando em y 4 por 4](/writing/convolution-padding-example.png)](/writing/convolution-padding-example.png)

Desta forma, a saída seria 4×4, tal como a entrada original. Em detalhe, neste caso simples de uma convolução com _padding_, as dimensões da saída podem ser calculadas como

[![tamanho da saída igual ao tamanho da entrada mais duas vezes o padding, menos o tamanho do kernel, mais um](/writing/convolution-output-size.png)](/writing/convolution-output-size.png)

Se quisermos que a entrada e a saída tenham o mesmo tamanho, então o _padding_ tem de ser

[![padding igual ao tamanho do kernel menos um, a dividir por dois](/writing/convolution-padding-size.png)](/writing/convolution-padding-size.png)

o que impõe uma condição importante: o tamanho do _kernel_ tem de ser ímpar, uma vez que o _padding_ é um valor inteiro.

Esta convolução também pode ser representada como uma multiplicação de matrizes semelhante à anterior, mas poupo-te à leitura porque as dimensões seriam muito maiores. Bastaria escrever as equações da convolução associadas a cada entrada de _y_ e organizá-las numa multiplicação matricial como a anterior.

[![A 16 por 16 multiplicada por x 16 por 1 é igual a y 16 por 1](/writing/convolution-square-matrix.png)](/writing/convolution-square-matrix.png)

Repara que, apesar de a entrada com _padding_ ser 6×6, correspondendo a 36 elementos, apenas 4×4 desses elementos são variáveis únicas e desconhecidas. Assim, o _x_ da equação pode ter apenas 16×1 elementos, em vez de 36×1.

**Para calcular _x_ e inverter a convolução, basta conhecer _A_ e _y_. Para construir _A_, é preciso conhecer o _kernel_ usado na convolução e o tipo de _padding_ aplicado.**

## Uma experiência em Julia

Como é que isto pode ser usado?

Uma imagem pode ser desfocada através de uma convolução. Por exemplo, um desfoque gaussiano é obtido convoluindo uma imagem com um _kernel_ ou filtro que segue uma distribuição gaussiana, com o maior valor no centro e valores cuja soma é 1. Um exemplo seria o _kernel_

[![Exemplo de um kernel gaussiano 3 por 3](/writing/convolution-gaussian-kernel.png)](/writing/convolution-gaussian-kernel.png)

Fiz uma implementação simples deste problema em Julia para confirmar que é, de facto, possível inverter a convolução. Podes consultar e experimentar o código na ligação abaixo.

[gonced8/reverse-convolution](https://github.com/gonced8/reverse-convolution)

Comecei por desfocar uma imagem com um desfoque gaussiano. Apliquei uma convolução à imagem original com um _kernel_ gaussiano e usei _replicate padding_: os valores fora da imagem original são definidos como o valor mais próximo da margem, em vez de zero.

[![Imagem original à esquerda e imagem desfocada à direita](/writing/blurred-original.png)](/writing/blurred-original.png)

_Imagem original à esquerda e imagem desfocada à direita._

Como conhecia o _kernel_ utilizado, consegui construir a matriz _A_ e resolver a equação em ordem a _x_. O resultado foi o esperado: a imagem reconstruída é exatamente igual à original.

[![Imagem desfocada e reconstrução usando o kernel e o padding conhecidos](/writing/blurred-reconstruction.png)](/writing/blurred-reconstruction.png)

_Imagem desfocada à esquerda e imagem reconstruída à direita._

Podes consultar a implementação acima e confirmar que a imagem original não foi usada na reconstrução.

## Quando o kernel ou o padding estão errados

Esta reconstrução a 100% só é possível porque conhecemos o _kernel_ e o _padding_ usados. O que acontece se usarmos um _kernel_ que não é exatamente igual ao usado para desfocar a imagem original?

[![Imagem desfocada à esquerda e reconstruída à direita; a reconstrução continua desfocada e contém artefactos](/writing/blurred-wrong-kernel.png)](/writing/blurred-wrong-kernel.png)

_Imagem desfocada à esquerda e reconstruída à direita quando não se usa o kernel exato._

E se assumirmos _zero-padding_ quando foi usado _replicate padding_?

[![Imagem desfocada à esquerda e reconstruída à direita; a reconstrução é ruído psicadélico e não se assemelha à original](/writing/blurred-wrong-padding.png)](/writing/blurred-wrong-padding.png)

_Imagem desfocada à esquerda e reconstruída à direita quando não se assume o padding exato._

Como vemos, se não conhecermos o _kernel_ e o _padding_ usados, não conseguimos reconstruir a imagem original. Neste sentido, o processo pode quase ser visto como um problema de encriptação: se conhecermos a “chave”, conseguimos reconstruir a mensagem original sem perdas nem ruído adicional.

Reconstruir a imagem original também é uma tarefa muito dispendiosa, porque a matriz _A_ cresce muito depressa com o tamanho da imagem. Se a imagem original tiver 4×4 píxeis, _A_ terá 16×16 elementos — o número de elementos cresce com N².

Espero que tenhas gostado desta breve explicação e que a tenhas achado interessante. Eu achei, e foi uma excelente forma de aprender mais sobre Julia, convoluções, processamento de imagem e álgebra linear. Se tiveres alguma pergunta ou encontrares algum erro, partilha-o comigo.

> Como nota de despedida, acho que ainda não precisamos de nos preocupar com alguém inverter o desfoque das nossas fotografias.

[![Imagem desfocada à esquerda e reconstruída à direita; a imagem reconstruída mostra um macaco](/writing/blurred-monkey.png)](/writing/blurred-monkey.png)

_Imagem desfocada à esquerda e reconstruída à direita._

[![Imagem desfocada e reconstruída de uma mulher chamada Lena](/writing/blurred-featured.png)](/writing/blurred-featured.png)

_Imagem de destaque._

## Nota sobre esta republicação

O texto original acima foi preservado de 2020. Uma matriz quadrada não é necessariamente invertível: a recuperação também exige um operador não singular e o condicionamento numérico é relevante. A condição de o _kernel_ ser ímpar pressupõe _padding_ inteiro simétrico e _stride_ unitário. Aqui, $N$ representa o número de píxeis da imagem, pelo que uma matriz de convolução densa $N \times N$ armazena $N^2$ elementos. A analogia histórica com encriptação é apenas intuitiva, não uma garantia de segurança.
