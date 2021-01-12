export const sanitizeHTML = (htmlString, allowedElements = []) => {
  // ESLint is complaining about not needed escaped character,
  // but they need to be escaped
  /* eslint-disable-next-line */
  const expression = `<(?!((?:\/\s*)?(?:${allowedElements.join('|')})))([^>])+>`;
  const regExp = new RegExp(expression, 'g');
  return htmlString.replace(regExp, '');
};
