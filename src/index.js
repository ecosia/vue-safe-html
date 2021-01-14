import createDirective from './directive';

export default {
  install: (Vue, options = {}) => {
    Vue.directive('strip-html', createDirective(options.allowedTags));
  },
};
