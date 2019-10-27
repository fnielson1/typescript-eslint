import path from 'path';
import { testWithoutLocation } from 'test-fixture';

testWithoutLocation(
  path.resolve(
    process.cwd(),
    '..',
    'shared-fixtures',
    'fixtures/javascript/objectLiteralComputedProperties/invalid-standalone-computed-variable-property.src.js',
  ),
  {
    useJSXTextNode: false,
  },
);