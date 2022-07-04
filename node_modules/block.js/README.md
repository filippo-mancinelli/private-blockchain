# block.js

A simple javascript utility for blocking thread specified milliseconds

## Block.js
You may have to simulate some operations take specified time, and Block.js is there for you.

Install with npm
```blash
npm install block.js --save
```

Use with webpack:
```javascript
import block from 'block.js'
```

## Usage
The `block`function takes one argument which must be number as millisecond you want to block.
```javascript
console.time('block about 400ms')
block(400)
console.timeEnd('block about 400ms')
```

## License
MIT. Copyright (c) 2017 Joe Zheng.

