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
  });
});
