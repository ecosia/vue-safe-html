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
const areTagsValid = (tags) => Array.isArray(tags) && tags.every(tag => typeof tag === 'string')

export { defaultTags as allowedTags };

export default (tags) => {
  const initialTags = areTagsValid(tags) ? tags : defaultTags;
  return (el, binding) => {
    const directiveTags = binding.arg.allowedTags;
    const finalTags = areTagsValid(directiveTags) ? directiveTags : initialTags;
    const sanitized = sanitizeHTML(binding.value, finalTags);
    el.innerHTML = sanitized;
  };
}
