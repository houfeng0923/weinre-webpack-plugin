#!/bin/bash
set -e
set -o pipefail

# echo 'Testing Package for publishing...'
# npm run test

echo 'Attempting npm publish...'
npm publish --registry=https://registry.npmjs.org/

echo 'Success'

exit 0
