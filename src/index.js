import createDirective, { allowedTags } from './directive';

export {
  allowedTags,
};

export default {
  install: (Vue, options = {}) => {
    Vue.directive('safe-html', createDirective(options.allowedTags));
  },
};
