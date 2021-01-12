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
  <div vue-safe-html="myUnsafeHTML">
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

## License

[MIT](./LICENSE)
