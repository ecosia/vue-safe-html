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

export default (tags) => {
  const initialTags = areTagsValid(tags) ? tags : defaultTags;
  return (el, binding) => {
    const directiveTags = Object.keys(binding.modifiers);
    const finalTags = directiveTags.length > 0 && areTagsValid(directiveTags) ?
      directiveTags :
      initialTags;
    const sanitized = sanitizeHTML(binding.value, finalTags);

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
