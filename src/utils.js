/**
 * sanitizeHTML strips html tags in the given string
 * if allowedTags is empty, all tags are stripped
 * @param {*} htmlString  the HTML string
 * @param {*} allowedTags array of tags that are not stripped
 */
// eslint-disable-next-line import/prefer-default-export
export const sanitizeHTML = (htmlString, allowedTags = []) => {
  if (htmlString == null) {
    return '';
  }
  // Add an optional white space to the allowed tags
  const allowedTagsWhiteSpaced = allowedTags.map((tag) => `${tag}\\s*`);

  // Remove tag attributes
  // The solution for this was found on:
  // https://stackoverflow.com/questions/4885891/regex-for-removing-all-attributes-from-a-paragraph
  const htmlWithoutAttributes = htmlString.replace(/<(\w+)(.|[\r\n])*?>/g, '<$1>');

  const expression = (allowedTags.length > 0) ?
    // Regex explanation
    // Note: \ needs to be escaped in the final expression
    // '<' Match the starting tag
    // '(' Create a matching group
    // '?!' Use negative lookup
    //      we only want to match the tags that are not in the allowedTags array
    // '\s*?' Optional match of any white space charater before optional /
    // '\/?' Matches / zero to one time for the closing tag
    // '\s*?' Optional match of any white space charater after optional /
    // '(${allowedTags.join('|')})>' matching group of the allowed tags
    // ')' close the matching group of negative lookup
    // '\w*[^<>]*' matches any word that isn't in the excluded group
    // '>' Match closing tagq
    `<(?!\\s*\\/?\\s*(${allowedTagsWhiteSpaced.join('|')})>)\\w*[^<>]*>` :
    // Strips all tags
    '<(\\/?\\w*)\\w*[^<>]*>';

  const regExp = new RegExp(expression, 'gm');
  return htmlWithoutAttributes.replace(regExp, '');
};
