import createDirective from './directive';

export default {
  install: (Vue, options) => {
    Vue.directive('safe-html', createDirective(options.allowedTags));
  }
}
