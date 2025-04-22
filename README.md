# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Git Commits with Gitmoji

This project uses [gitmoji](https://gitmoji.dev/) to add emojis to commit messages, making them more expressive and easier to understand at a glance.

### How to use

Instead of using the regular `git commit` command, use:

```bash
pnpm run commit
```

This will start an interactive prompt that helps you:

1. Select an appropriate emoji for your commit
2. Write a commit title
3. Write a longer commit description (optional)

### Common Gitmojis

- 🎨 `:art:` - Improve structure/format of the code
- ✨ `:sparkles:` - Introduce new features
- 🐛 `:bug:` - Fix a bug
- 📝 `:memo:` - Add or update documentation
- ♻️ `:recycle:` - Refactor code
- 💄 `:lipstick:` - Add or update UI and style files

For a complete list of available emojis, run:

```bash
npx gitmoji -l
```
