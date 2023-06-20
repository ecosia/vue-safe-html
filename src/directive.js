import { sanitizeHTML } from './utils';

const defaultTags = [
  'a',
  'b',
  'br',
  'strong',
  'i',
  'em',
  'mark',
  'small',
  'del',
  'ins',
  'sub',
  'sup',
];
const areTagsValid = (tags) => (
  Array.isArray(tags) &&
  tags.every((tag) => typeof tag === 'string')
);

export { defaultTags as allowedTags };

const getAllowedTags = (initialTags, binding) => {
  if (binding?.arg === 'strip-tags') {
    // v-safe-html:strip-tags returns no tags
    return [];
  }

  if (binding.modifiers) {
    // v-safe-html.p.strong returns 'p' and 'strong'
    const directiveTags = Object.keys(binding.modifiers);
    if (directiveTags.length > 0 && areTagsValid(directiveTags)) {
      return directiveTags;
    }
  }

  return initialTags;
};

export default (tags) => {
  const initialTags = areTagsValid(tags) ? tags : defaultTags;
  return (el, binding) => {
    const allowedTags = getAllowedTags(initialTags, binding);
    const sanitized = sanitizeHTML(binding.value, allowedTags);

    if (typeof el.innerHTML === 'string') {
      // we're client-side and `el` is an HTMLElement
      el.innerHTML = sanitized;
    } else {
      // we're server-side and `el` is a VNode
      // see https://vuejs.org/v2/guide/security.html#Injecting-HTML
      el.data.domProps = { innerHTML: sanitized };
    }
  };
};
