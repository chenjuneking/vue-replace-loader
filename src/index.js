const { getOptions } = require('loader-utils');

const defaultOptions = {
  values: [],
};

module.exports = function VueReplaceLoader(source, map) {
  const options = getOptions(this) || defaultOptions;
  const callback = this.async();
  const { values } = options;
  let content = source;

  if (typeof content === 'string') {
    if (values && Array.isArray(values) && values.length > 0) {
      values.forEach((value) => {
        content = content.replace(value.regex, value.replacement);
      });
    }
  } else {
    this.emitWarning('\'source\' received by \'replace-loader\' was not a string');
  }

  if (this.cacheable && typeof this.cacheable === 'function') {
    this.cacheable();
  }
  callback(null, content, map);
};
