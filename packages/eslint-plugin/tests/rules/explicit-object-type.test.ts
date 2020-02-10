import rule from '../../src/rules/explicit-object-type';
import { RuleTester } from '../RuleTester';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('explicit-object-type', rule, {
  valid: [
    {
      filename: 'test.ts',
      code: `
let obj = {} as MyClass;
            `,
    },
    {
      filename: 'test.ts',
      code: `
let obj = &lt;MyClass&gt;{};
            `,
    },
    {
      filename: 'test.ts',
      code: `
let obj = {key: 'dude'} as MyClass;
            `,
    },
    {
      filename: 'test.ts',
      code: `
let obj = new SomeClass({});
      `,
      options: [
        {
          allowInsideNewObject: true,
        },
      ],
    },
    {
      filename: 'test.ts',
      code: `
let obj = new SomeClass({key: 'dude'});
      `,
      options: [
        {
          allowInsideNewObject: true,
        },
      ],
    },
  ],
  invalid: [
    {
      filename: 'test.ts',
      code: `
let obj = {};
      `,
      errors: [
        {
          messageId: 'missingObjectType',
          line: 1,
          endLine: 1,
          column: 10,
          endColumn: 12,
        },
      ],
    },
    {
      filename: 'test.ts',
      code: `
let obj = {key: 'dude'};
      `,
      errors: [
        {
          messageId: 'missingObjectType',
          line: 1,
          endLine: 1,
          column: 10,
          endColumn: 22,
        },
      ],
    },
    {
      filename: 'test.ts',
      code: `
let obj = {};
      `,
      options: [{ allowInsideNewObject: true }],
      errors: [
        {
          messageId: 'missingObjectType',
          line: 1,
          endLine: 1,
          column: 10,
          endColumn: 12,
        },
      ],
    },
    {
      filename: 'test.ts',
      code: `
let obj = {key: 'dude'};
      `,
      options: [{ allowInsideNewObject: true }],
      errors: [
        {
          messageId: 'missingObjectType',
          line: 1,
          endLine: 1,
          column: 10,
          endColumn: 22,
        },
      ],
    },
    {
      filename: 'test.ts',
      code: `
let obj = new SomeClass({})
      `,
      options: [
        {
          allowInsideNewObject: false,
        },
      ],
      errors: [
        {
          messageId: 'missingObjectType',
          line: 1,
          endLine: 1,
          column: 24,
          endColumn: 26,
        },
      ],
    },
  ],
});
