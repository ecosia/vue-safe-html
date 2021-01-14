![Node](https://img.shields.io/node/v/vue-strip-html)
[![NPM](https://img.shields.io/npm/v/vue-strip-html)](https://www.npmjs.com/package/vue-strip-html)
[![Vue.js](https://img.shields.io/badge/vue-2-green.svg)](https://vuejs.org)

# vue-strip-html

A Vue directive which renders sanitised HTML dynamically.

## Installation

Install package:

```sh
npm install @ecosia/vue-strip-html
# OR
yarn add @ecosia/vue-strip-html
```

Use the plugin:

```js
import Vue from 'vue';
import VueStripHTML from '@ecosia/vue-strip-html';

Vue.use(VueStripHTML);
```

## Usage

In your component:

```html
<template>
  <div v-strip-html="myUnstrippedHTML">
</template>
```

```js
export default {
  computed: {
    myUnstrippedHTML() {
      return '<script>Oh my!</script> I am stripped!';
    }
  }
}
```

Renders to:

```html
<div>I am stripped!</div>
```

### Options

#### allowedTags

Array of strings. Default: `['a', 'b', 'br', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup']`.

Customize the tags that are allowed to be rendered, either by providing new ones:

```js
Vue.use(VueStripHTML, {
  allowedTags: ['marquee', 'blockquote'],
});
```

Or extending the default ones:

```js
import VueStripHTML, { allowedTags } from '@ecosia/vue-strip-html';

Vue.use(VueStripHTML, {
  allowedTags: [...allowedTags, 'marquee', 'blockquote'],
});
```

If no tags are passed, all tags are stripped:

```js
import VueStripHTML, { allowedTags } from '@ecosia/vue-strip-html';

Vue.use(VueStripHTML, {
  allowedTags: [],
});
```

It is also possible to provide custom allowed tags directly to the directive tag, using directive modifiers. This allows local override of the option:

```html
<template>
  <!-- only allow p and strong tags -->
  <div v-strip-html.p.strong="myUnstrippedHTML">
</template>
```

### Nuxt

`vue-strip-html` is written as a Vue plugin so you can easily use it inside Nuxt by following [the Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins#vue-plugins).

## License

[MIT](./LICENSE)
