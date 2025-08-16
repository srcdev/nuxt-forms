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

## Styles Architecture

The `/app/assets/styles` folder contains the CSS architecture for this Nuxt layer, organized into two main directories:

### `/app/assets/styles/setup/`

This directory contains the foundational styles that will be mirrored in any app that extends this layer. It includes:

- **`index.css`** - Main setup file that imports all setup modules
- **`_head.css`** - Head-level styles and document setup
- **`a11y/`** - Accessibility utilities and variables
- **`theming/`** - Theme definitions, color schemes, and theme variants
- **`typography/`** - Typography setup, font definitions, and text utility classes
- **`utility-classes/`** - General utility classes including fluid spacing and animations

These styles form the base layer and will be automatically available in any app that extends this layer.

### `/app/assets/styles/extends-layer/srcdev-forms/`

This directory contains override styles specifically for apps that extend this layer. It includes:

- **`index.css`** - Main override file
- **`components/`** - Component-specific overrides
- **`setup/`** - Setup overrides for extended apps

This folder structure will also be present in the extending app's assets directory, allowing for easy customization and theming.

### Layer Override Namespace

To enable proper CSS override functionality, the extending app must include the `srcdev-forms-extended` class namespace:

```ts
// nuxt.config.ts in the extending app
export default defineNuxtConfig({
  extends: 'srcdev-nuxt-forms',
  app: {
    head: {
      htmlAttrs: {
        class: 'srcdev-forms-extended',
      },
    },
  },
});
```

**Important:** All override CSS files in the extending app's `~/assets/styles/extends-layer/srcdev-forms/` directory must use the `.srcdev-forms-extended` class as a namespace prefix to ensure proper specificity and override behavior.

Example override structure in the extending app:

```css
/* ~/assets/styles/extends-layer/srcdev-forms/components/button.css */
.srcdev-forms-extended .btn-primary {
  /* Your custom button styles */
}
```
