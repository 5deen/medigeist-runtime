async function instantiate(module, imports = {}) {
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    initString(init_set) {
      // assembly/index/initString(~lib/string/String) => ~lib/array/Array<~lib/array/Array<~lib/string/String>>
      init_set = __lowerString(init_set) || __notnull();
      return __liftArray(pointer => __liftArray(pointer => __liftString(new Uint32Array(memory.buffer)[pointer >>> 2]), 2, new Uint32Array(memory.buffer)[pointer >>> 2]), 2, exports.initString(init_set) >>> 0);
    },
    initNumbers(init_set) {
      // assembly/index/initNumbers(~lib/array/Array<i32>) => ~lib/array/Array<~lib/array/Array<i32>>
      init_set = __lowerArray((pointer, value) => { new Int32Array(memory.buffer)[pointer >>> 2] = value; }, 8, 2, init_set) || __notnull();
      return __liftArray(pointer => __liftArray(pointer => new Int32Array(memory.buffer)[pointer >>> 2], 2, new Uint32Array(memory.buffer)[pointer >>> 2]), 2, exports.initNumbers(init_set) >>> 0);
    },
    createMarkupElement(name, template) {
      // assembly/index/createMarkupElement(~lib/string/String, ~lib/string/String) => ~lib/string/String
      name = __retain(__lowerString(name) || __notnull());
      template = __lowerString(template) || __notnull();
      try {
        return __liftString(exports.createMarkupElement(name, template) >>> 0);
      } finally {
        __release(name);
      }
    },
    setPanels(panels) {
      // assembly/index/setPanels(i32) => ~lib/string/String
      return __liftString(exports.setPanels(panels) >>> 0);
    },
    createSVGPattern(init_set, template) {
      // assembly/index/createSVGPattern(~lib/string/String, ~lib/string/String) => ~lib/string/String
      init_set = __retain(__lowerString(init_set) || __notnull());
      template = __lowerString(template) || __notnull();
      try {
        return __liftString(exports.createSVGPattern(init_set, template) >>> 0);
      } finally {
        __release(init_set);
      }
    },
    createImagePattern(svg, img) {
      // assembly/index/createImagePattern(~lib/string/String, ~lib/string/String) => ~lib/string/String
      svg = __retain(__lowerString(svg) || __notnull());
      img = __lowerString(img) || __notnull();
      try {
        return __liftString(exports.createImagePattern(svg, img) >>> 0);
      } finally {
        __release(svg);
      }
    },
    createAbstractRectangle(id) {
      // assembly/index/createAbstractRectangle(~lib/string/String) => ~lib/array/Array<assembly/geometry/Point>
      id = __lowerString(id) || __notnull();
      return __liftArray(pointer => __liftInternref(new Uint32Array(memory.buffer)[pointer >>> 2]), 2, exports.createAbstractRectangle(id) >>> 0);
    },
    createSVGDocument(ratio, map, text) {
      // assembly/index/createSVGDocument(f64, ~lib/string/String, ~lib/string/String) => ~lib/string/String
      map = __retain(__lowerString(map) || __notnull());
      text = __lowerString(text) || __notnull();
      try {
        return __liftString(exports.createSVGDocument(ratio, map, text) >>> 0);
      } finally {
        __release(map);
      }
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __lowerString(value) {
    if (value == null) return 0;
    const
      length = value.length,
      pointer = exports.__new(length << 1, 2) >>> 0,
      memoryU16 = new Uint16Array(memory.buffer);
    for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
    return pointer;
  }
  function __liftArray(liftElement, align, pointer) {
    if (!pointer) return null;
    const
      memoryU32 = new Uint32Array(memory.buffer),
      dataStart = memoryU32[pointer + 4 >>> 2],
      length = memoryU32[pointer + 12 >>> 2],
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(dataStart + (i << align >>> 0));
    return values;
  }
  function __lowerArray(lowerElement, id, align, values) {
    if (values == null) return 0;
    const
      length = values.length,
      buffer = exports.__pin(exports.__new(length << align, 1)) >>> 0,
      header = exports.__pin(exports.__new(16, id)) >>> 0,
      memoryU32 = new Uint32Array(memory.buffer);
    memoryU32[header + 0 >>> 2] = buffer;
    memoryU32[header + 4 >>> 2] = buffer;
    memoryU32[header + 8 >>> 2] = length << align;
    memoryU32[header + 12 >>> 2] = length;
    for (let i = 0; i < length; ++i) lowerElement(buffer + (i << align >>> 0), values[i]);
    exports.__unpin(buffer);
    exports.__unpin(header);
    return header;
  }
  class Internref extends Number {}
  const registry = new FinalizationRegistry(__release);
  function __liftInternref(pointer) {
    if (!pointer) return null;
    const sentinel = new Internref(__retain(pointer));
    registry.register(sentinel, pointer);
    return sentinel;
  }
  const refcounts = new Map();
  function __retain(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount) refcounts.set(pointer, refcount + 1);
      else refcounts.set(exports.__pin(pointer), 1);
    }
    return pointer;
  }
  function __release(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount === 1) exports.__unpin(pointer), refcounts.delete(pointer);
      else if (refcount) refcounts.set(pointer, refcount - 1);
      else throw Error(`invalid refcount '${refcount}' for reference '${pointer}'`);
    }
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  return adaptedExports;
}
export const {
  memory,
  initString,
  initNumbers,
  createMarkupElement,
  setPanels,
  createSVGPattern,
  createImagePattern,
  createAbstractRectangle,
  createSVGDocument
} = await (async url => instantiate(
  await (async () => {
    try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
    catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
  })(), {
  }
))(new URL("release.wasm", import.meta.url));
