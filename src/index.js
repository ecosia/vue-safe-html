import createDirective, { allowedTags } from './directive';

export {
  allowedTags,
  createDirective,
};

export default {
  install: (Vue, options = {}) => {
    Vue.directive('safe-html', createDirective(options.allowedTags, options.allowedAttributes));
  },
};
