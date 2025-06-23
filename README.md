# Tasklito

A to-do list web app using react.js

## Description

A to-do list web app using react.js. Features includes CRUD operation on to-do's, filtering, modern UI, to-do's have categories, description and due-to, this project demonstrate my understanding on context api and managing global state, enhancing rendering performance.

![demo](./public/tasklito-demo.gif)

## Getting Started

### Dependencies

- node.js, vite, react.js, tailwindcss, lucide-react, react-datepicker

## Installing

To get the project up and running, following steps:

1. Download and install Node: <https://nodejs.org/>
2. Clone this repo: `git clone https://github.com/Mohamed-Maghraby/tasklito.git` (HTTPS)
3. Install project dependencies: `npm install`
4. Start the development environment: `npm run dev`
5. Open your browser and visit <http://localhost:port>

## Why this project?

This project helped me to understand how global state work and the performance effect on rendering. In this to-do app each to-do is an object
inside a state array in context. This context has a provider for consumer component, and since its and array all components consumes this context
get's re-rendered. that introduced me to more advanced technique on how to render tasks as user scroll, which is a feature to be implemented in
the future. Also as this project grows advanced state management libraries can be used as (zustand, redux) or even react-context-selector.
More about this is explained as a comment in src/context/TasksProvider.
This project is simple as it seems but it has a huge benefits on understanding of react core concept, absolutely shifted me more steps forward

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
