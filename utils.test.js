import * as utils from './utils';

describe('Utils', () => {
  describe('SanitizeHTML', () => {
    // TODO: change behaviour and strips all tags if none is provided
    it('Does not strips tags from given html if allowed tags is empty', () => {
      const given = '<p><i>An</i> html<br><strong>string</strong><script></script></p>';
      // const expected = 'An html string';
      expect(utils.sanitizeHTML(given)).toBe(given);
    });

    it('Strips tags from given html string except custom allowed tags', () => {
      const allowedTags = ['strong', 'br'];
      const given = '<p><i>An</i> html<br><strong>string</strong><script></script></p>';
      const expected = 'An html<br><strong>string</strong>';
      expect(utils.sanitizeHTML(given, allowedTags)).toBe(expected);
    });
  });
});
