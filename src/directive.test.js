import createDirective, { allowedTags } from './directive';

describe('Directive', () => {
  it('Exports allowedTags', () => {
    expect(allowedTags.every((tag) => typeof tag === 'string')).toBe(true);
  });

  describe('Sanitizes', () => {
    const expected = '<strong>Safe</strong> HTML';
    const directive = createDirective();

    it('Client-side', () => {
      const binding = {
        modifiers: {},
        value: '<p><strong>Safe</strong> HTML<script></script></p>',
      };
      const el = document.createElement('div');
      directive(el, binding);
      expect(el.innerHTML).toBe(expected);
    });

    it('Server-side', () => {
      // example bindings from Nuxt 2
      const binding = {
        name: 'safe-html',
        rawName: 'v-safe-html',
        value: '<p><strong>Safe</strong> HTML<script></script></p>',
        expression: 'paragraph',
      };
      const el = { data: {} };
      directive(el, binding);
      expect(el.data.domProps).toEqual({ innerHTML: expected });
    });
  });
});
