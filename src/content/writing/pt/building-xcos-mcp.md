---
title: "Construir o xcos-mcp"
description: "Dar aos agentes de AI uma interface prática para modelos Scilab/Xcos."
date: 2026-09-12
locale: pt-PT
translationKey: xcos-mcp
tags: [mcp, python, engenharia, simulação]
draft: false
featured: true
---

As ferramentas de engenharia são muitas vezes poderosas, mas difíceis de ligar a workflows modernos de software. O **xcos-mcp** nasceu de uma pergunta simples: poderá um agente de AI trabalhar com um diagrama Xcos como um artefacto de engenharia real, em vez de apenas o descrever?

O projeto disponibiliza um servidor MCP para Scilab/Xcos. Dá ao agente uma forma controlada de inspecionar um modelo, criar e alterar diagramas, validar a sua estrutura e executar simulações. A ideia não é esconder o ambiente de simulação atrás de uma interface de chat; é tornar a ferramenta existente utilizável num workflow onde o software consegue analisar ficheiros, fazer alterações e verificar o resultado.

## Um limite útil

A parte interessante tem sido manter este limite honesto. Um agente pode propor um modelo e usar as ferramentas, mas uma simulação bem sucedida não transforma um modelo simplificado num resultado pronto para voo. Validação, pressupostos explícitos e resultados inspecionáveis continuam a ser importantes.

O código está disponível no [GitHub](https://github.com/gonced8/xcos-mcp).
