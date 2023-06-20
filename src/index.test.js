import { createLocalVue, shallowMount } from '@vue/test-utils';

import Plugin, { allowedTags as defaultAllowedTags, createDirective } from './index';

describe('Plugin', () => {
  it('Exports allowedTags and createDirective', () => {
    expect(defaultAllowedTags).toBeInstanceOf(Array);
    expect(createDirective).toBeInstanceOf(Function);
  });

  describe('Installs', () => {
    const localVue = createLocalVue();
    localVue.directive = jest.fn();

    beforeEach(() => {
      localVue.directive.mockClear();
    });

    it('Installs directive', () => {
      expect(Plugin).toBeInstanceOf(Object);
      expect(Plugin.install).toBeInstanceOf(Function);
      Plugin.install(localVue);
      expect(localVue.directive).toHaveBeenCalledTimes(1);
      expect(localVue.directive.mock.calls[0][0]).toBe('safe-html');
      expect(localVue.directive.mock.calls[0][1]).toBeInstanceOf(Function);
    });

    it('Installs directive with custom allowed tags', () => {
      const allowedTags = ['a', 'button'];
      Plugin.install(localVue, { allowedTags });
      expect(localVue.directive.mock.calls[0][0]).toBe('safe-html');
      expect(localVue.directive.mock.calls[0][1]).toBeInstanceOf(Function);
    });
  });

  describe('Integration', () => {
    it('Sanitizes given string', () => {
      const localVue = createLocalVue();
      localVue.use(Plugin);
      // eslint-disable-next-line vue/one-component-per-file
      const Component = localVue.component('SafeHtmlComponent', {
        template: '<div v-safe-html="\'<p><strong>Safe</strong> HTML<script></script></p>\'"></div>',
      });
      const wrapper = shallowMount(Component, { localVue });
      const expected = '<div><strong>Safe</strong> HTML</div>';
      expect(wrapper.html()).toBe(expected);
    });

    it('Sanitizes with custom allowed tags', () => {
      const localVue = createLocalVue();
      localVue.use(Plugin, {
        allowedTags: [
          ...defaultAllowedTags,
          'section',
        ],
      });
      // eslint-disable-next-line vue/one-component-per-file
      const Component = localVue.component('SafeHtmlComponent', {
        template: '<div v-safe-html="\'<p><section><strong>Safe</strong></section> HTML<script></script></p>\'"></div>',
      });
      const wrapper = shallowMount(Component, { localVue });
      const expected = '<div><section><strong>Safe</strong></section> HTML</div>';
      expect(wrapper.element.outerHTML).toBe(expected);
    });

    describe('Modifiers', () => {
      it('Handles allowed tags as modifiers', () => {
        const localVue = createLocalVue();
        localVue.use(Plugin, {
          allowedTags: [
            ...defaultAllowedTags,
            'section',
          ],
        });
        // eslint-disable-next-line vue/one-component-per-file
        const Component = localVue.component('SafeHtmlComponent', {
          template: '<div v-safe-html.p.strong="\'<p><section><strong>Safe</strong></section> HTML<script></script> &amp; <mark>marked text</mark></p>\'"></div>',
        });
        const wrapper = shallowMount(Component, { localVue });
        const expected = '<div><p><strong>Safe</strong> HTML &amp; marked text</p></div>';
        expect(wrapper.element.outerHTML).toBe(expected);
      });
    });

    describe('"strip-tags" argument', () => {
      it('strips all HTML but leaves HTML entities', () => {
        const localVue = createLocalVue();
        localVue.use(Plugin, {
          allowedTags: [
            ...defaultAllowedTags,
            'section',
          ],
        });
        // eslint-disable-next-line vue/one-component-per-file
        const Component = localVue.component('SafeHtmlComponent', {
          template: '<div v-safe-html:strip-tags="\'<p><strong>Cats<strong> &amp; <em>&quot;Dogs&quot;</em></p>\'"></div>',
        });
        const wrapper = shallowMount(Component, { localVue });
        const expected = '<div>Cats &amp; "Dogs"</div>';
        expect(wrapper.element.outerHTML).toBe(expected);
      });
    });
  });
});
