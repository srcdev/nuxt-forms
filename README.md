# Nuxt Forms Layer

## NOTE: This is personal forms setup and not necessarily intended for widespread use

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Distributing your theme

### Release it

CLI Prompt assisted release and versioning

```bash
npm run release
```

## Install Nuxt Forms

```bash
npm install --save your-theme
```

Then add the dependency to their `extends` in `nuxt.config`:

```ts
defineNuxtConfig({
  extends: 'your-theme',
});
```

## Development Server

Start the development server on <http://localhost:3000>

```bash
npm dev
```

## Production

Build the application for production:

```bash
npm build
```

Or statically generate it with:

```bash
npm generate
```

Locally preview production build:

```bash
npm preview
```

## Themes

Styles exist for multiple themes/variants, primary, secondary, tertiary, error etc.

Colour scheme can be updated by modifying the css colour variables
