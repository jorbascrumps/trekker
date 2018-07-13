# Trekker
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

### `Trekker.processAdjacent(fn)`
#### Arguments
* **fn(current, neighbour): Boolean** (Function) &mdash; A custom function to use for additional consideration when processing a neighbour tile

**Returns** a `Boolean` specifying whether or not the neighbour is valid

### `Trekker.toString()`
**Returns** a `String` representing a solution path. An example output from the [Usage](#usage) section would be:
```
'[1,0],[2,0]'
```
_Note: This is primarly a utility for testing._
