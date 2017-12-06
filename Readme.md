# deabsdeep

Recursively replace absolute paths in object keys and values or array values with a `~`.

## Installation

```bash
npm install deabsdeep
```

## Usage

```js
const deabsDeep = require('deabsdeep')

// __dirname = /foo/bar

deabsDeep({
  '/foo/bar/a.txt': {
      baz: '/foo/bar/a.txt'
  }
})
/* =>
{
  '~/a.txt': {
    baz: '~/a.txt'
  }
}
*/

deabsDeep([
  '/foo/bar/a.txt',
  '/foo/bar/a.txt'
])
/* =>
[
  '~/a.txt',
  '~/a.txt'
]
*/
```

## Options

### `root` (default: project root)

A root folder, by default the project root folder (where your `package.json` is) will be used:

```js
deabsDeep(obj, { root: '/root/directory' })
```

### `mask` (default: `~`)

A string to replace the root folder with:

```js
deabsDeep(obj, { mask: '<rootDir>' })
```

## Jest serializer

Update your `package.json` to make Jest replace all absolute paths in snapshots:

```json
{
  "jest": {
    "snapshotSerializers": ["deabsdeep/serializer"]
  }
}
```

## Change log

The change log can be found on the [Releases page](https://github.com/sapegin/deabsdeep/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Artem Sapegin](http://sapegin.me) and [contributors](https://github.com/sapegin/deabsdeep/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
