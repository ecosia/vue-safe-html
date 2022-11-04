import * as utils from './utils';

describe('Utils', () => {
  describe('SanitizeHTML', () => {
    it('Does not strips tags from given html if allowed tags is empty', () => {
      const given = '<p><i>An</i> html<br><strong>string</strong><script></script></p>';
      const expected = 'An htmlstring';
      expect(utils.sanitizeHTML(given)).toBe(expected);
    });

    it('Strips tags from given html string except custom allowed tags', () => {
      const allowedTags = ['strong', 'br'];
      const given = '<p><i>An</i> html<br><strong>string</strong><script></script></p>';
      const expected = 'An html<br><strong>string</strong>';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });

    it('Strips input tags', () => {
      const allowedTags = ['strong', 'i'];
      const given = '<p><i>An</i> <strong>input field</strong><input type="button" /></p>';
      const expected = '<i>An</i> <strong>input field</strong>';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });

    it('Strips similar tags', () => {
      const allowedTags = ['p', 'b', 's'];
      const given = '<sp>Test1</sp> <sssp>Test2</sssp><script></script> <blockquote>quote</blockquote>';
      const expected = 'Test1 Test2 quote';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });

    it('Considers whitespaces', () => {
      const allowedTags = ['p'];
      const given = '<p>Test1</ p><p>Test2</  p>';
      const expected = '<p>Test1</ p><p>Test2</  p>';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });

    it('Removes all tags with empty allowed tags', () => {
      const allowedTags = [];
      const given = '<p>Test1</p> <strong  >Test2</strong> <  i>Test3</i>';
      const expected = 'Test1 Test2 Test3';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });

    it('Removes attributes from html', () => {
      const allowedTags = ['p'];
      const given = '<p data-test="test" title="test2">Test1</p> <strong data-test=\'test2\'>Test2</strong>';
      const expected = '<p>Test1</p> Test2';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });
  });
});
