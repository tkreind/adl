import { getTagValue } from '@azure-tools/adl.core';
import { Rule } from '@azure-tools/adl.core/linter/rule';
export default <Rule>{
  activation: 'edit',
  meta: {
    name: 'http-tag-valid-verb',
    code: 'R1009',
    type: 'warning',
    description: 'Each operation definition must have a HTTP verb specified. This verb is specified is in the http tag. The permissible values are DELETE/GET/PUT/PATCH/HEAD/OPTIONS/POST/TRACE.',
    documentationUrl: 'PLACEHOLDER',
    category: 'SDK Warning'
  },
  onOperation: (model, operation) => {
    const tag = getTagValue(operation, 'http');
    const verbs = [
      'DELETE',
      'GET',
      'PUT',
      'PATCH',
      'HEAD',
      'OPTIONS',
      'POST', 
      'TRACE'
    ];

    if (tag !== undefined && !verbs.includes(tag.split(' ')[0].toUpperCase())) {
      return {
        message: `The operation '${operation.name}' contains an invalid http tag. The tag must have the format '@http <HTTP VERB> <PATH>' and the permissible values for HTTP VERB are DELETE, GET, PUT, PATCH, HEAD, OPTIONS, POST, TRACE.`
      };
    }

    return;
  }
};

