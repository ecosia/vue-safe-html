import { shallowMount } from '@vue/test-utils';
import Plugin from './index';

describe('Integration', () => {
  it('Sanitizes given string', () => {
    const wrapper = shallowMount({
      template: '<div v-strip-html="\'<p><strong>Strip</strong> HTML<script></script></p>\'"></div>',
    }, { global: { plugins: [Plugin] } });
    const expected = '<div><strong>Strip</strong> HTML</div>';
    expect(wrapper.html()).toBe(expected);
  });

  it('Sanitizes with custom allowed tags', () => {
    const wrapper = shallowMount({
      template: '<div v-strip-html.span="\'<p><strong><span>Strip</span></strong> HTML<script></script></p>\'"></div>',
    }, { global: { plugins: [Plugin] } });
    const expected = '<div><span>Strip</span> HTML</div>';
    expect(wrapper.html()).toBe(expected);
  });
});
