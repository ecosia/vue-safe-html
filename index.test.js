import { createLocalVue, shallowMount } from '@vue/test-utils';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, jest } from '@jest/globals';
import createDirective from './directive';
import VueSafeHTML from './index';

describe('Plugin', () => {
  describe('Installs', () => {
    const localVue = createLocalVue();
    localVue.directive = jest.fn();

    beforeEach(() => {
      localVue.directive.mockClear();
    });

    it('Installs directive', () => {
      expect(VueSafeHTML).toBeInstanceOf(Object);
      expect(VueSafeHTML.install).toBeInstanceOf(Function);
      VueSafeHTML.install(localVue);
      expect(localVue.directive).toHaveBeenCalledTimes(1);
      expect(localVue.directive.mock.calls[0][0]).toBe('safe-html');
      expect(localVue.directive.mock.calls[0][1]).toBeInstanceOf(Function);
    });

    it('Installs directive with custom allowed tags', () => {
      const allowedTags = ['a', 'button']
      VueSafeHTML.install(localVue, { allowedTags });
      expect(localVue.directive.mock.calls[0][0]).toBe('safe-html');
      expect(localVue.directive.mock.calls[0][1]).toBeInstanceOf(Function);
    });
  });

  describe('Integration', () => {
    const localVue = createLocalVue();
    localVue.use(VueSafeHTML);

    it('Sanitizes given string', () => {
      const Component = localVue.component('safe-html-component', {
        template: '<div v-safe-html="\'<p><strong>Safe</strong> HTML<script></script></p>\'"></div>',
      });
      const wrapper = shallowMount(Component, { localVue });
      const expected = '<div><strong>Safe</strong> HTML</div>';
      expect(wrapper.html()).toBe(expected);
    })

    it('Sanitizes with custom allowed tags', () => {
      const Component = localVue.component('safe-html-component', {
        template: '<div v-safe-html.span="\'<p><strong><span>Safe</span></strong> HTML<script></script></p>\'"></div>',
      });
      const wrapper = shallowMount(Component, { localVue });
      const expected = '<div><span>Safe</span> HTML</div>';
      expect(wrapper.html()).toBe(expected);
    });
  });
});
