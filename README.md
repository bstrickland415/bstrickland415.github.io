# A web-app for Lead Department using the Shadcn-UI Template 

[![Netlify Status](https://api.netlify.com/api/v1/badges/8d59383f-bc24-43c2-bf02-b7e59ecb8ac9/deploy-status)](https://app.netlify.com/projects/neon-meerkat-182925/deploys)

# Usage Instructions

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration
- `src/pages/Index.tsx` - Home page logic

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

- The `@/` path alias points to the `src/` directory
- In your typescript code, don't re-export types that you're already importing

# Commands

**Install Dependencies**

```shell
pnpm i
```

**Add Dependencies**

```shell
pnpm add some_new_dependency
```
**Start Preview**

```shell
pnpm run dev
```

**To Build**

```shell
pnpm run build
```
## For high quality web design at a fair price with highly skilled development visit https://www.themicrotechs.org !!!

