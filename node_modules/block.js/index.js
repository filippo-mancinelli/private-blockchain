(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    function block (millisecond) {
        if (millisecond <= 0) return

        var now = performance.now()
        const end = now + millisecond

        while(now <= end) {
            now = performance.now()
        }
    }

    return block;
}));