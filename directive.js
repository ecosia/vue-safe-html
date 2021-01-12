import { sanitizeHTML } from './utils';

const ALLOWED_ELEMENTS = [
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

export default (el, binding) => {
  const sanitized = sanitizeHTML(binding.value, ALLOWED_ELEMENTS);
  // eslint-disable-next-line
  el.innerHTML = sanitized;
};
