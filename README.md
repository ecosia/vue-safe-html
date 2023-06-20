# vue-safe-html

![Node](https://img.shields.io/node/v/vue-safe-html)
[![NPM](https://img.shields.io/npm/v/vue-safe-html)](https://www.npmjs.com/package/vue-safe-html)
[![Github Checks Status](https://img.shields.io/github/workflow/status/ecosia/vue-safe-html/CI)](https://github.com/ecosia/vue-safe-html/tree/main)
[![Vue.js](https://img.shields.io/badge/vue-2-green.svg)](https://vuejs.org)
[![Vue.js](https://img.shields.io/badge/vue-3-green.svg)](https://v3.vuejs.org)

A Vue directive which renders sanitised HTML dynamically. Zero dependencies, compatible with Vue versions 3 and 2, TypeScript-ready.

**Note:** This library is not XSS-safe, but only strips tags programmatically.

## Installation

Install package:

```sh
npm install vue-safe-html
# OR
yarn add vue-safe-html
```

Use the plugin:

```js
import Vue from 'vue';
import VueSafeHTML from 'vue-safe-html';

Vue.use(VueSafeHTML);
```

## Usage

In your component:

```jsx
<template>
  <div v-safe-html="myUnsafeHTML" />
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
import VueSafeHTML, { allowedTags } from 'vue-safe-html';

Vue.use(VueSafeHTML, {
  allowedTags: [...allowedTags, 'marquee', 'blockquote'],
});
```

If no tags are passed, all tags are stripped:

```js
import VueSafeHTML from 'vue-safe-html';

Vue.use(VueSafeHTML, {
  allowedTags: [],
});
```

It is also possible to provide custom allowed tags directly to the directive tag, using directive modifiers. This allows local override of the option:

```jsx
<template>
  <div v-safe-html.p.strong="myUnsafeHTML" />
</template>
```

> Only allow p and strong tags

#### Stripping all tags for HTML entity decoding

To decode HTML entities only with no tags you can use the `strip-tags` directive argument:

```jsx
<template>
  <div v-safe-html:strip-tags="unsafeHTML" />
</template>
```

```js
export default {
  computed: {
    myUnsafeHTML() {
      return '<p><strong>Cats<strong> &amp; <em>&quot;Dogs&quot;</em></p>';
    }
  }
}
```

Renders to:

```html
<div>Cats &amp; "Dogs"</div>
```

### Nuxt

`vue-safe-html` is written as a Vue plugin so you can easily use it inside Nuxt by following [the Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins#vue-plugins).

## License

[Do No Harm](./LICENSE)
