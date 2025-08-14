# Nuxt Forms Layer

## NOTE: This is personal forms setup and not necessarily intended for widespread use

## Layer extended into barebones project

Checkout the repo [SRCDEV Nuxt Forms being extended as layer into another Nuxt project](https://github.com/srcdev/nuxt-extend-nuxt-forms)

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
npm install --save srcdev-nuxt-forms
```

Then add the dependency to their `extends` in `nuxt.config`:

```ts
defineNuxtConfig({
  extends: 'srcdev-nuxt-forms',
});
```

## Development Server

Start the development server on <https://localhost:3000>

```bash
npm dev
```

## Browser https error

If you do not get a proceed to site ssl error, then you need to reset HSTS settings in browser

- Clearing all data for the site
- Click on the button to the left of the address bar
- Site settings
- Delete data
- Go to chrome://net-internals/#hsts and enter localhost into Delete domain security policies (or whichever domain you're having trouble with)
- Restart your browser

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

## Thing to note

Must add modifier class within nuxt config to enable local css overrides:

```bash
  app: {
    head: {
      htmlAttrs: {
        class: 'your-site-class',
      },
    },
  },
```

This class must be added to css files located at `~/assets/styles/extends-layer/srcdev-forms/components`
