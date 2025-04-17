# TanStack Start Example Repository

This repository demonstrates the use of [TanStack](https://tanstack.com/).

## Features

- **TanStack Router**: Type-safe and flexible routing.
- **TypeScript**: Strongly typed codebase for better developer experience.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/keonik/tss.git
    ```
2. Install dependencies:
    ```bash
        bun install
        ```
    3. Start the development server:
        ```bash
        bun run dev
        ```

    ## Features

    - **TanStack Router**: Type-safe and flexible routing.
    - **TypeScript**: Strongly typed codebase for better developer experience.

    ## Folder Structure

    - `/app/components`: Reusable UI components.
    - `/app/routes`: Application routes powered by TanStack Router.

    ## Contributing

    Contributions are welcome! Feel free to open issues or submit pull requests.

    ## License

    This project is licensed under the [MIT License](LICENSE).

## Scripts

These scripts in package.json use bun by default, but you can modify them to use your preferred package manager.

auth:generate - Regenerate the auth db schema if you've made changes to your Better Auth config.
db - Run drizzle-kit commands. (e.g. bun db generate to generate a migration)
ui - The shadcn/ui CLI. (e.g. bun ui add button to add the button component)
format and lint - Run Prettier and ESLint.

