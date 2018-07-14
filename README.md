# Trekker  [![Coverage Status](https://coveralls.io/repos/github/iamchristopher/trekker/badge.svg?branch=master)](https://coveralls.io/github/iamchristopher/trekker?branch=master) [![Build Status](https://travis-ci.org/iamchristopher/trekker.svg?branch=master)](https://travis-ci.org/iamchristopher/trekker)
_Note: Trekker is currently in a prerelease state and is therefore subject to frequent (sometimes undocumented) breaking changes._

## Installation
```
npm i trekker -S
```

## Usage
Trekker can be used on both the client- and server-side:
```js
import Trekker from 'trekker';

const grid = [
    [ 1, 1, 1 ],
    [ 1, 0, 1 ],
    [ 1, 1, 1 ],
];
const path = new Trekker(grid);
    .search(0, 0, 0, 2);
```

## API
The goal of the public API is to be chainable in any configuration. A notable exception to this, however, is `Trekker.search` which will terminate the chain as it returns a solution path instead of the Trekker object.

### `Trekker.search(x1, y1, x2, y2)`
#### Arguments
* **x1** (Number) &mdash; x position of the starting position  
* **y1** (Number) &mdash; y position of the starting position  
* **x2** (Number) &mdash; x position of the end position  
* **y2** (Number) &mdash; y position of the end position

**Returns** an `Array` of `Node`s representing the solution path. If no path is found, an empty `Array` is returned.

### `Trekker.setDiagonalMode(mode)`
#### Arguments
* **mode** (Number) &mdash; A value representing the diagonal mode to use. The following options are available from `Trekker.DIAGONAL_MODE`:  
  * `NEVER` &mdash; Disable diagonal movement (default)
  * `ALWAYS` &mdash; Allow diagonal movement regardless of obstacles
  * `ONE_OBSTACLE` &mdash; Allow diagonal movement with at most one obstacle
  * `NO_OBSTACLES` &mdash; Allow diagonal movement only when there are no obstacles

**Returns** a `Trekker` object for chaining.

### `Trekker.processNeighbour(fn)`
#### Arguments
* **fn(current, neighbour): Boolean** (Function) &mdash; A custom function to use for additional consideration when processing a neighbour tile

**Returns** a `Trekker` object for chaining.

### `Trekker.toString()`
**Returns** a `String` representing a solution path. An example output from the [Usage](#usage) section would be:
```
'[1,0],[2,0]'
```
_Note: This is primarly a utility for testing._
