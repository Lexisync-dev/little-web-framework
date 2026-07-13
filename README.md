# Little Web Framework

A lightweight, experimental frontend web framework built from scratch with TypeScript. 

## Overview

This framework is designed to demonstrate advanced TypeScript patterns and the principles of object-oriented programming, specifically favoring **composition over inheritance**. It provides a structured way to build web applications by separating concerns into distinct, reusable modules.

It draws heavy inspiration from classic MVC (Model-View) libraries like Backbone.js, providing the essential building blocks for data binding, event handling, network synchronization, and DOM updates without the overhead of larger, modern frameworks.

## Core Modules

The framework is divided into several composable pieces:

- **Attributes**: Manages the internal state/data of a model.
- **Eventing**: A custom eventing system that allows objects to trigger and listen to specific events (pub/sub).
- **Sync**: Handles all REST API communications (fetching and saving data) using `axios`.
- **Model**: Ties together Attributes, Eventing, and Sync to represent a cohesive data entity (like a `User` or `Post`).
- **View**: Handles DOM manipulation and rendering HTML templates. It automatically listens for changes in its corresponding Model and re-renders the UI accordingly.
- **Collection / CollectionView**: Manages lists of Models and renders them efficiently into the DOM.

## Use Case

This framework is perfect for:
- **Learning & Education**: Understanding the underlying mechanics of modern frontend libraries (like React or Vue) by seeing how state management, eventing, and DOM rendering can be built from the ground up.
- **Lightweight Applications**: Small to medium applications where you want strict typing and a clean, object-oriented architecture without bringing in a heavy dependency ecosystem.
- **Granular Architecture**: Scenarios where you need fine-grained control over how your data layers interact with your presentation layers.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
