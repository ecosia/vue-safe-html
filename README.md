![Node](https://img.shields.io/node/v/vue-safe-html)
[![NPM](https://img.shields.io/npm/v/vue-safe-html)](https://www.npmjs.com/package/vue-directive-tooltip)
[![Vue.js](https://img.shields.io/badge/vue-2-green.svg)](https://vuejs.org)

# vue-safe-html

A Vue directive which renders sanitised HTML dynamically. Zero-dependency,

## Installation

Install package:

```sh
npm install @ecosia/vue-safe-html
# OR
yarn add @ecosia/vue-safe-html
```

Use the plugin:

```js
import Vue from 'vue';
import VueSafeHTML from '@ecosia/vue-safe-html';

Vue.use(VueSafeHTML);
```

## Usage

In your component:

```html
<template>
  <div v-safe-html="myUnsafeHTML">
</template>
```

```js
export default {
  computed: {
    myUnsafeHTML() {
      return '<script>oh my!</script> I am safe!';
    }
  }
}
```

Renders to:

```html
<div>I am safe!</div>
```

### Options

#### allowedTags

Array of strings. Default: `['a', 'b', 'br', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup']`.

Customize the tags that are allowed to be rendered, either by providing new ones:

```js
Vue.use(VueSafeHTML, {
  allowedTags: ['marquee', 'blockquote'],
});
```

Or extending the default ones:

```js
import VueSafeHTML, { allowedTags } from '@ecosia/vue-safe-html';

Vue.use(VueSafeHTML, {
  allowedTags: [...allowedTags, 'marquee', 'blockquote'],
});
```

If no tags are passed, all tags are stripped:

```js
import VueSafeHTML, { allowedTags } from '@ecosia/vue-safe-html';

Vue.use(VueSafeHTML, {
  allowedTags: [],
});
```

### Nuxt

`vue-safe-html` is written as a Vue plugin so you can easily use it inside Nuxt by following [the Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins#vue-plugins).

## License

[MIT](./LICENSE)
