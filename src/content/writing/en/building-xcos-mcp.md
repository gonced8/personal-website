---
title: "Building xcos-mcp"
description: "Giving AI agents a practical interface to Scilab/Xcos models."
date: 2026-09-12
locale: en
translationKey: xcos-mcp
tags: [mcp, python, engineering, simulation]
draft: false
featured: true
---

Engineering tools are often powerful but difficult to connect to modern software workflows. **xcos-mcp** started with a straightforward question: can an AI agent work with an Xcos diagram as a real engineering artefact rather than merely describe one?

The project provides an MCP server around Scilab/Xcos. It gives an agent a controlled way to inspect a model, create and modify diagrams, validate their structure, and run simulations. The point is not to hide the simulation environment behind a chat interface; it is to make the existing tool usable in a workflow where software can reason over files, make changes, and verify the outcome.

## A useful boundary

The interesting part has been keeping the boundary honest. An agent can propose a model and drive the tools, but a successful run does not turn a simplified model into a flight-ready result. Validation, explicit assumptions and inspectable output matter.

That makes the project a natural meeting point for things I enjoy: Python services, MCP tooling, engineering simulation, and an aerospace background that still shapes how I think about models.

The source is available on [GitHub](https://github.com/gonced8/xcos-mcp).
