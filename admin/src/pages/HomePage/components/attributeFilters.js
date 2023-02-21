import React from 'react';
import { useIntl } from 'react-intl';
import useAllowedAttributes from '../lib/useAllowedAttributes';
import Filters from './Filters';

const AttributeFilter = ({ contentType, slug, metadatas }) => {
  const { formatMessage } = useIntl();
  const allowedAttributes = useAllowedAttributes(contentType, slug);
  const displayedFilters = allowedAttributes.map((name) => {
    const attribute = contentType.attributes[name];
    const { type, enum: options } = attribute;

    const { label } = metadatas[name].list;

    return {
      name,
      metadatas: { label: formatMessage({ id: label, defaultMessage: label }) },
      fieldSchema: { type, options }
    };
  });

  return <Filters displayedFilters={displayedFilters} />;
};

export default AttributeFilter;
