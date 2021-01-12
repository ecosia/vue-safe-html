import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

import './index';

const Component = Vue.component('safe-html-component', {
  template: `
    <div v-safe-html='"<p><strong>Safe</strong> HTML<script></script></p>"'>
    </div>
  `,
});

describe('SafeHTML', () => {
  it('sanitizes given string', () => {
    const wrapper = shallowMount(Component);
    const expected = '<div><strong>Safe</strong> HTML</div>';
    expect(wrapper.html()).toBe(expected);
  });
});
