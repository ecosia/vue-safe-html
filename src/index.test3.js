import { shallowMount } from '@vue/test-utils';
import Plugin from './index';

describe('Vue 3', () => {
  it('Sanitizes given string', () => {
    const wrapper = shallowMount({
      template: '<div v-safe-html="\'<p><strong>Safe</strong> HTML<script></script></p>\'"></div>',
    }, { global: { plugins: [Plugin] } });
    const expected = '<div><strong>Safe</strong> HTML</div>';
    expect(wrapper.html()).toBe(expected);
  });

  it('Sanitizes with custom allowed tags', () => {
    const wrapper = shallowMount({
      template: '<div v-safe-html.span="\'<p><strong><span>Safe</span></strong> HTML<script></script></p>\'"></div>',
    }, { global: { plugins: [Plugin] } });
    const expected = '<div><span>Safe</span> HTML</div>';
    expect(wrapper.html()).toBe(expected);
  });
});
