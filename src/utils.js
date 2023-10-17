// Strips all tags
const removeAllTagsRegex = /<\/?[^>]+(>|$)/g;
export const removeAllTags = (input) => (input.replace(removeAllTagsRegex, ''));

/**
 * sanitizeHTML strips html tags in the given string
 * if allowedTags is empty, all tags are stripped
 * @param {*} htmlString  the HTML strings
 * @param {*} allowedTags array of tags that are not stripped
 */
export const sanitizeHTML = (htmlString, allowedTags = [], allowedAttributes = []) => {
  if (!htmlString) {
    return '';
  }

  if(allowedTags.length === 0) {
    return removeAllTags(htmlString);
  }

  return htmlString.replace(/<(\/*)(\w+)([^>]*)>/g, (match, closing, tagName, attrs) => {
    if (allowedTags.includes(tagName)) {
      // If the tag is allowed, we'll retain only allowed attributes.
      if (closing) {
        // If it's a closing tag, simply return it as is.
        return `</${tagName}>`;
      }
      // Otherwise, reconstruct the opening tag with only allowed attributes.
      let allowedAttrs = attrs.split(/\s+/)
          .filter(attr => allowedAttributes.includes(attr.split('=')[0]))
          .join(' ');
      return `<${tagName}${allowedAttrs ? ' ' + allowedAttrs : ''}>`;
    }
    // If the tag is not allowed, strip it completely.
    return '';
  });
};
