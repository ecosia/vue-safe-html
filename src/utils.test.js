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
      const allowedTags = ['p'];
      const given = '<sp>Test1</sp> <sssp>Test2</sssp>';
      const expected = 'Test1 Test2';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });

    it('Considers whitespaces', () => {
      const allowedTags = ['p'];
      const given = '<p>Test1</ p><p>Test2</  p>';
      const expected = '<p>Test1</ p><p>Test2</  p>';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });
  });
});
