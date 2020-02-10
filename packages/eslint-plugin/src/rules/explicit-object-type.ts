import {
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/experimental-utils';
import * as util from '../util';

type Options = [
  {
    allowInsideNewObject?: boolean;
  },
];
type MessageIds = 'missingObjectType';

export default util.createRule<Options, MessageIds>({
  name: 'explicit-object-type',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require explicit types on objects that are created',
      category: 'Best Practices',
      recommended: 'error',
    },
    messages: {
      missingObjectType: 'Object creation must be cast to a type.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowInsideNewObject: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [
    {
      allowInsideNewObject: false,
    },
  ],
  create(context, [options]) {
    function reportMissingObjectType(node: TSESTree.ObjectExpression): void {
      const messageId = 'missingObjectType';
      context.report({
        node,
        messageId,
      });
    }

    return {
      ObjectExpression(node): void {
        if (node.parent != null) {
          if (
            node.parent.type !== AST_NODE_TYPES.TSAsExpression &&
            node.parent.type !== AST_NODE_TYPES.TSTypeAssertion
          ) {
            if (
              node.parent.type == AST_NODE_TYPES.NewExpression &&
              options.allowInsideNewObject
            ) {
              // Anonymous object types inside of new initialization has been determined to be ok
            } else {
              reportMissingObjectType(node);
            }
          }
        }
      },
    };
  },
});
