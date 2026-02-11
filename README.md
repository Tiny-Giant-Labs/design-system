# Priscope Design System

A reusable Vue 3 component library with Tailwind CSS v4 styling.

## Installation

```bash
# Using npm (from GitHub)
npm install github:YOUR_USERNAME/design-system

# Or with a specific tag
npm install github:YOUR_USERNAME/design-system#v0.1.0
```

## Peer Dependencies

This library requires the following peer dependencies in your project:

```bash
npm install vue tailwindcss @heroicons/vue @vueuse/core lodash-es date-fns date-fns-tz tippy.js
```

Optional (only needed if you use specific components):

```bash
npm install @vuepic/vue-datepicker  # for DateRangePicker
npm install maska                    # for Input (mask feature)
npm install vue-router               # for PasswordInput (forgot password link)
```

## Usage

### 1. Import the stylesheet

In your app's entry CSS file (e.g., `style.css` or `main.css`):

```css
@import "@priscope/design-system/style.css";
```

Or in your `main.ts`:

```ts
import "@priscope/design-system/style.css";
```

### 2. Use the components

```vue
<script setup lang="ts">
import { Button, Input, Modal, Toggle } from "@priscope/design-system";
</script>

<template>
  <Button text="Click me" variant="default" />
  <Input type="text" id="name" label="Name" placeholder="Enter name..." />
  <Toggle :model-value="true" label="Enable feature" />
</template>
```

## Available Components

| Component            | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `Button`             | Primary button with variants (default, outline, destructive) and sizes |
| `CardView`           | Simple card container with border and shadow                           |
| `DateRangePicker`    | Date/range picker with presets (requires `@vuepic/vue-datepicker`)     |
| `Dropdown`           | Tippy.js-powered dropdown menu                                         |
| `Filter`             | Filterable multi/single-select dropdown                                |
| `IconButton`         | Icon-only button                                                       |
| `Input`              | Text input with label, error, and optional mask support                |
| `Modal`              | Dialog modal with backdrop and transitions                             |
| `OTPInput`           | OTP/verification code input                                            |
| `Pagination`         | Pagination controls with page info                                     |
| `PasswordInput`      | Password input with show/hide toggle                                   |
| `PasswordValidation` | Password strength validator display                                    |
| `SearchableSelect`   | Searchable dropdown select with infinite scroll                        |
| `SegmentedControl`   | Segmented control (tab-like toggle)                                    |
| `Select`             | Native select dropdown with styling                                    |
| `ShopifyIcon`        | Shopify SVG icon                                                       |
| `SimpleImageUpload`  | Image upload with preview                                              |
| `SSOButton`          | SSO/OAuth login button                                                 |
| `Tabs`               | Tab navigation                                                         |
| `TextArea`           | Styled textarea with label and error                                   |
| `Toggle`             | Toggle switch                                                          |
| `Tooltip`            | Tippy.js-powered tooltip                                               |

## Customizing the Theme

Override the `--color-primary` CSS variable in your app to change the primary color:

```css
@theme {
  --color-primary: #your-color;
}
```

## Development

```bash
npm install
npm run dev    # Start dev server
npm run build  # Build the library
```
