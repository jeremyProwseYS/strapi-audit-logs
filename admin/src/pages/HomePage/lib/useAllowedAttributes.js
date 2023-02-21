import get from 'lodash/get';

const NOT_ALLOWED_FILTERS = ['json', 'component', 'media', 'richtext', 'dynamiczone', 'password'];

const useAllowedAttributes = (contentType) => {

  const attributesArray = Object.keys(get(contentType, ['attributes']), {});
  const allowedAttributes = attributesArray
    .filter((attr) => {
      const current = get(contentType, ['attributes', attr], {});

      if (!current.type) {
        return false;
      }

      if (NOT_ALLOWED_FILTERS.includes(current.type)) {
        return false;
      }

      return true;
    })
    .sort();

  return allowedAttributes;
};

export default useAllowedAttributes;
