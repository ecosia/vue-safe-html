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
  tags.length > 0 &&
  tags.every(tag => typeof tag === 'string')
);

export { defaultTags as allowedTags };

export default (tags) => {
  const initialTags = areTagsValid(tags) ? tags : defaultTags;
  return (el, binding) => {
    const directiveTags = Object.keys(binding.modifiers);
    const finalTags = areTagsValid(directiveTags) ? directiveTags : initialTags;
    const sanitized = sanitizeHTML(binding.value, finalTags);
    el.innerHTML = sanitized;
  };
}
