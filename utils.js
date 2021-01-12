/**
 * sanitizeHTML strips html tags in the given string
 * if allowedTags is empty, all tags are stripped
 * @param {*} htmlString  the HTML strings
 * @param {*} allowedTags array of tags that are not stripped
 */
// eslint-disable-next-line import/prefer-default-export
export const sanitizeHTML = (htmlString, allowedTags = []) => {
  const expression = (allowedTags.length > 0) ?
    `<(?!((?:/s*)?(?:${allowedTags.join('|')})))([^>])+>` :
    '<[^>]*>';
  const regExp = new RegExp(expression, 'g');
  return htmlString.replace(regExp, '');
};
