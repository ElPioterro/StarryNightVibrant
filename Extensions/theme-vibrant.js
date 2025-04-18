(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var themeDvibrant = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // external-global-plugin:react
  var require_react = __commonJS({
    "external-global-plugin:react"(exports, module) {
      module.exports = Spicetify.React;
    }
  });

  // external-global-plugin:react-dom
  var require_react_dom = __commonJS({
    "external-global-plugin:react-dom"(exports, module) {
      module.exports = Spicetify.ReactDOM;
    }
  });

  // ../../../../node_modules/@vibrant/image/dist/esm/histogram.js
  var Histogram = class {
    constructor(pixels, opts) {
      this.pixels = pixels;
      this.opts = opts;
      const { sigBits } = opts;
      const getColorIndex = (r2, g2, b2) => (r2 << 2 * sigBits) + (g2 << sigBits) + b2;
      this.getColorIndex = getColorIndex;
      const rshift = 8 - sigBits;
      const hn = 1 << 3 * sigBits;
      const hist = new Uint32Array(hn);
      let rmax;
      let rmin;
      let gmax;
      let gmin;
      let bmax;
      let bmin;
      let r;
      let g;
      let b;
      let a;
      rmax = gmax = bmax = 0;
      rmin = gmin = bmin = Number.MAX_VALUE;
      const n = pixels.length / 4;
      let i = 0;
      while (i < n) {
        const offset = i * 4;
        i++;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        if (a === 0)
          continue;
        r = r >> rshift;
        g = g >> rshift;
        b = b >> rshift;
        const index = getColorIndex(r, g, b);
        if (hist[index] === void 0)
          hist[index] = 0;
        hist[index] += 1;
        if (r > rmax)
          rmax = r;
        if (r < rmin)
          rmin = r;
        if (g > gmax)
          gmax = g;
        if (g < gmin)
          gmin = g;
        if (b > bmax)
          bmax = b;
        if (b < bmin)
          bmin = b;
      }
      this._colorCount = hist.reduce(
        (total, c) => c > 0 ? total + 1 : total,
        0
      );
      this.hist = hist;
      this.rmax = rmax;
      this.rmin = rmin;
      this.gmax = gmax;
      this.gmin = gmin;
      this.bmax = bmax;
      this.bmin = bmin;
    }
    get colorCount() {
      return this._colorCount;
    }
  };

  // ../../../../node_modules/@vibrant/image/dist/esm/index.js
  var ImageBase = class {
    scaleDown(opts) {
      const width = this.getWidth();
      const height = this.getHeight();
      let ratio = 1;
      if (opts.maxDimension > 0) {
        const maxSide = Math.max(width, height);
        if (maxSide > opts.maxDimension)
          ratio = opts.maxDimension / maxSide;
      } else {
        ratio = 1 / opts.quality;
      }
      if (ratio < 1)
        this.resize(width * ratio, height * ratio, ratio);
    }
  };
  function applyFilters(imageData, filters) {
    var _a;
    if (filters.length > 0) {
      const pixels = imageData.data;
      const n = pixels.length / 4;
      let offset;
      let r;
      let g;
      let b;
      let a;
      for (let i = 0; i < n; i++) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        for (let j = 0; j < filters.length; j++) {
          if (!((_a = filters[j]) == null ? void 0 : _a.call(filters, r, g, b, a))) {
            pixels[offset + 3] = 0;
            break;
          }
        }
      }
    }
    return imageData;
  }

  // ../../../../node_modules/@vibrant/image-browser/dist/esm/index.js
  function isRelativeUrl(url) {
    const u = new URL(url, location.href);
    return u.protocol === location.protocol && u.host === location.host && u.port === location.port;
  }
  function isSameOrigin(a, b) {
    const ua = new URL(a);
    const ub = new URL(b);
    return ua.protocol === ub.protocol && ua.hostname === ub.hostname && ua.port === ub.port;
  }
  var BrowserImage = class extends ImageBase {
    _getCanvas() {
      if (!this._canvas) {
        throw new Error("Canvas is not initialized");
      }
      return this._canvas;
    }
    _getContext() {
      if (!this._context) {
        throw new Error("Context is not initialized");
      }
      return this._context;
    }
    _getWidth() {
      if (!this._width) {
        throw new Error("Width is not initialized");
      }
      return this._width;
    }
    _getHeight() {
      if (!this._height) {
        throw new Error("Height is not initialized");
      }
      return this._height;
    }
    _initCanvas() {
      const img = this.image;
      if (!img) {
        throw new Error("Image is not initialized");
      }
      const canvas = this._canvas = document.createElement("canvas");
      const context3 = canvas.getContext("2d");
      if (!context3)
        throw new ReferenceError("Failed to create canvas context");
      this._context = context3;
      canvas.className = "@vibrant/canvas";
      canvas.style.display = "none";
      this._width = canvas.width = img.width;
      this._height = canvas.height = img.height;
      context3.drawImage(img, 0, 0);
      document.body.appendChild(canvas);
    }
    load(image) {
      let img;
      let src;
      if (typeof image === "string") {
        img = document.createElement("img");
        src = image;
        if (!isRelativeUrl(src) && !isSameOrigin(window.location.href, src)) {
          img.crossOrigin = "anonymous";
        }
        img.src = src;
      } else if (image instanceof HTMLImageElement) {
        img = image;
        src = image.src;
      } else {
        return Promise.reject(
          new Error(`Cannot load buffer as an image in browser`)
        );
      }
      this.image = img;
      return new Promise((resolve, reject) => {
        const onImageLoad = () => {
          this._initCanvas();
          resolve(this);
        };
        if (img.complete) {
          onImageLoad();
        } else {
          img.onload = onImageLoad;
          img.onerror = (_e) => reject(new Error(`Fail to load image: ${src}`));
        }
      });
    }
    clear() {
      this._getContext().clearRect(0, 0, this._getWidth(), this._getHeight());
    }
    update(imageData) {
      this._getContext().putImageData(imageData, 0, 0);
    }
    getWidth() {
      return this._getWidth();
    }
    getHeight() {
      return this._getHeight();
    }
    resize(targetWidth, targetHeight, ratio) {
      if (!this.image) {
        throw new Error("Image is not initialized");
      }
      this._width = this._getCanvas().width = targetWidth;
      this._height = this._getCanvas().height = targetHeight;
      this._getContext().scale(ratio, ratio);
      this._getContext().drawImage(this.image, 0, 0);
    }
    getPixelCount() {
      return this._getWidth() * this._getHeight();
    }
    getImageData() {
      return this._getContext().getImageData(
        0,
        0,
        this._getWidth(),
        this._getHeight()
      );
    }
    remove() {
      if (this._canvas && this._canvas.parentNode) {
        this._canvas.parentNode.removeChild(this._canvas);
      }
    }
  };

  // ../../../../node_modules/@vibrant/core/dist/esm/utils.js
  function assignDeep(target, ...sources) {
    sources.forEach((s) => {
      if (!s)
        return;
      for (const key in s) {
        if (s.hasOwnProperty(key)) {
          const v = s[key];
          if (Array.isArray(v)) {
            target[key] = v.slice(0);
          } else if (typeof v === "object") {
            if (!target[key])
              target[key] = {};
            assignDeep(target[key], v);
          } else {
            target[key] = v;
          }
        }
      }
    });
    return target;
  }

  // ../../../../node_modules/@vibrant/core/dist/esm/options.js
  function buildProcessOptions(opts, override) {
    const { colorCount, quantizer, generators, filters } = opts;
    const commonQuantizerOpts = { colorCount };
    const q = typeof quantizer === "string" ? { name: quantizer, options: {} } : quantizer;
    q.options = assignDeep({}, commonQuantizerOpts, q.options);
    return assignDeep(
      {},
      {
        quantizer: q,
        generators,
        filters
      },
      override
    );
  }

  // ../../../../node_modules/@vibrant/core/dist/esm/builder.js
  var Builder = class {
    constructor(src, opts = {}) {
      this._src = src;
      this._opts = assignDeep({}, Vibrant.DefaultOpts, opts);
    }
    maxColorCount(n) {
      this._opts.colorCount = n;
      return this;
    }
    maxDimension(d) {
      this._opts.maxDimension = d;
      return this;
    }
    addFilter(name) {
      if (!this._opts.filters) {
        this._opts.filters = [name];
      } else {
        this._opts.filters.push(name);
      }
      return this;
    }
    removeFilter(name) {
      if (this._opts.filters) {
        const i = this._opts.filters.indexOf(name);
        if (i > 0)
          this._opts.filters.splice(i);
      }
      return this;
    }
    clearFilters() {
      this._opts.filters = [];
      return this;
    }
    quality(q) {
      this._opts.quality = q;
      return this;
    }
    useImageClass(imageClass) {
      this._opts.ImageClass = imageClass;
      return this;
    }
    useGenerator(generator, options) {
      if (!this._opts.generators)
        this._opts.generators = [];
      this._opts.generators.push(
        options ? { name: generator, options } : generator
      );
      return this;
    }
    useQuantizer(quantizer, options) {
      this._opts.quantizer = options ? { name: quantizer, options } : quantizer;
      return this;
    }
    build() {
      return new Vibrant(this._src, this._opts);
    }
    getPalette() {
      return this.build().getPalette();
    }
  };

  // ../../../../node_modules/@vibrant/core/dist/esm/pipeline/index.js
  var Stage = class {
    constructor(pipeline2) {
      this.pipeline = pipeline2;
      this._map = {};
    }
    names() {
      return Object.keys(this._map);
    }
    has(name) {
      return !!this._map[name];
    }
    get(name) {
      return this._map[name];
    }
    register(name, stageFn) {
      this._map[name] = stageFn;
      return this.pipeline;
    }
  };
  var BasicPipeline = class {
    constructor() {
      this.filter = new Stage(this);
      this.quantizer = new Stage(this);
      this.generator = new Stage(this);
    }
    _buildProcessTasks({
      filters,
      quantizer,
      generators
    }) {
      if (generators.length === 1 && generators[0] === "*") {
        generators = this.generator.names();
      }
      return {
        filters: filters.map((f) => createTask(this.filter, f)),
        quantizer: createTask(this.quantizer, quantizer),
        generators: generators.map((g) => createTask(this.generator, g))
      };
      function createTask(stage, o) {
        let name;
        let options;
        if (typeof o === "string") {
          name = o;
        } else {
          name = o.name;
          options = o.options;
        }
        return {
          name,
          fn: stage.get(name),
          options
        };
      }
    }
    async process(imageData, opts) {
      const { filters, quantizer, generators } = this._buildProcessTasks(opts);
      const imageFilterData = await this._filterColors(filters, imageData);
      const colors = await this._generateColors(quantizer, imageFilterData);
      const palettes = await this._generatePalettes(generators, colors);
      return {
        colors,
        palettes
      };
    }
    _filterColors(filters, imageData) {
      return Promise.resolve(
        applyFilters(
          imageData,
          filters.map(({ fn }) => fn)
        )
      );
    }
    _generateColors(quantizer, imageData) {
      return Promise.resolve(quantizer.fn(imageData.data, quantizer.options));
    }
    async _generatePalettes(generators, colors) {
      const promiseArr = await Promise.all(
        generators.map(({ fn, options }) => Promise.resolve(fn(colors, options)))
      );
      return Promise.resolve(
        promiseArr.reduce(
          (promises, promiseVal, i) => {
            promises[generators[i].name] = promiseVal;
            return promises;
          },
          {}
        )
      );
    }
  };

  // ../../../../node_modules/@vibrant/color/dist/esm/converter.js
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
  }
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max6 = Math.max(r, g, b);
    const min6 = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max6 + min6) / 2;
    if (max6 !== min6) {
      const d = max6 - min6;
      s = l > 0.5 ? d / (2 - max6 - min6) : d / (max6 + min6);
      switch (max6) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    let r;
    let g;
    let b;
    function hue2rgb(p, q, t) {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p + (q - p) * 6 * t;
      if (t < 1 / 2)
        return q;
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
  }

  // ../../../../node_modules/@vibrant/color/dist/esm/index.js
  var Swatch = class {
    static applyFilters(colors, filters) {
      return filters.length > 0 ? colors.filter(({ r, g, b }) => {
        var _a;
        for (let j = 0; j < filters.length; j++) {
          if (!((_a = filters[j]) == null ? void 0 : _a.call(filters, r, g, b, 255)))
            return false;
        }
        return true;
      }) : colors;
    }
    static clone(swatch) {
      return new Swatch(swatch._rgb, swatch._population);
    }
    get r() {
      return this._rgb[0];
    }
    get g() {
      return this._rgb[1];
    }
    get b() {
      return this._rgb[2];
    }
    get rgb() {
      return this._rgb;
    }
    get hsl() {
      if (!this._hsl) {
        const [r, g, b] = this._rgb;
        this._hsl = rgbToHsl(r, g, b);
      }
      return this._hsl;
    }
    get hex() {
      if (!this._hex) {
        const [r, g, b] = this._rgb;
        this._hex = rgbToHex(r, g, b);
      }
      return this._hex;
    }
    get population() {
      return this._population;
    }
    toJSON() {
      return {
        rgb: this.rgb,
        population: this.population
      };
    }
    getYiq() {
      if (!this._yiq) {
        const rgb3 = this._rgb;
        this._yiq = (rgb3[0] * 299 + rgb3[1] * 587 + rgb3[2] * 114) / 1e3;
      }
      return this._yiq;
    }
    get titleTextColor() {
      if (!this._titleTextColor) {
        this._titleTextColor = this.getYiq() < 200 ? "#fff" : "#000";
      }
      return this._titleTextColor;
    }
    get bodyTextColor() {
      if (!this._bodyTextColor) {
        this._bodyTextColor = this.getYiq() < 150 ? "#fff" : "#000";
      }
      return this._bodyTextColor;
    }
    constructor(rgb3, population) {
      this._rgb = rgb3;
      this._population = population;
    }
  };

  // ../../../../node_modules/@vibrant/core/dist/esm/index.js
  var _Vibrant = class _Vibrant2 {
    constructor(_src, opts) {
      this._src = _src;
      this.opts = assignDeep({}, _Vibrant2.DefaultOpts, opts);
    }
    static use(pipeline2) {
      this._pipeline = pipeline2;
    }
    static from(src) {
      return new Builder(src);
    }
    get result() {
      return this._result;
    }
    _process(image, opts) {
      image.scaleDown(this.opts);
      const processOpts = buildProcessOptions(this.opts, opts);
      return _Vibrant2._pipeline.process(image.getImageData(), processOpts);
    }
    async getPalette() {
      const image = new this.opts.ImageClass();
      try {
        const image1 = await image.load(this._src);
        const result1 = await this._process(image1, {
          generators: ["default"]
        });
        this._result = result1;
        const res = result1.palettes["default"];
        if (!res) {
          throw new Error(
            `Something went wrong and a palette was not found, please file a bug against our GitHub repo: https://github.com/vibrant-Colors/node-vibrant/`
          );
        }
        image.remove();
        return res;
      } catch (err) {
        image.remove();
        return Promise.reject(err);
      }
    }
    async getPalettes() {
      const image = new this.opts.ImageClass();
      try {
        const image1 = await image.load(this._src);
        const result1 = await this._process(image1, {
          generators: ["*"]
        });
        this._result = result1;
        const res = result1.palettes;
        image.remove();
        return res;
      } catch (err) {
        image.remove();
        return Promise.reject(err);
      }
    }
  };
  _Vibrant.DefaultOpts = {
    colorCount: 64,
    quality: 5,
    filters: []
  };
  var Vibrant = _Vibrant;

  // node_modules/node-vibrant/dist/esm/configs/config.js
  Vibrant.DefaultOpts.quantizer = "mmcq";
  Vibrant.DefaultOpts.generators = ["default"];
  Vibrant.DefaultOpts.filters = ["default"];

  // node_modules/node-vibrant/dist/esm/configs/browser.js
  Vibrant.DefaultOpts.ImageClass = BrowserImage;

  // ../../../../node_modules/@vibrant/quantizer-mmcq/dist/esm/vbox.js
  var SIGBITS = 5;
  var RSHIFT = 8 - SIGBITS;
  var VBox = class {
    constructor(r1, r2, g1, g2, b1, b2, histogram) {
      this.histogram = histogram;
      this._volume = -1;
      this._avg = null;
      this._count = -1;
      this.dimension = { r1, r2, g1, g2, b1, b2 };
    }
    static build(pixels) {
      const h = new Histogram(pixels, { sigBits: SIGBITS });
      const { rmin, rmax, gmin, gmax, bmin, bmax } = h;
      return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, h);
    }
    invalidate() {
      this._volume = this._count = -1;
      this._avg = null;
    }
    volume() {
      if (this._volume < 0) {
        const { r1, r2, g1, g2, b1, b2 } = this.dimension;
        this._volume = (r2 - r1 + 1) * (g2 - g1 + 1) * (b2 - b1 + 1);
      }
      return this._volume;
    }
    count() {
      if (this._count < 0) {
        const { hist, getColorIndex } = this.histogram;
        const { r1, r2, g1, g2, b1, b2 } = this.dimension;
        let c = 0;
        for (let r = r1; r <= r2; r++) {
          for (let g = g1; g <= g2; g++) {
            for (let b = b1; b <= b2; b++) {
              const index = getColorIndex(r, g, b);
              if (!hist[index]) {
                continue;
              }
              c += hist[index];
            }
          }
        }
        this._count = c;
      }
      return this._count;
    }
    clone() {
      const { histogram } = this;
      const { r1, r2, g1, g2, b1, b2 } = this.dimension;
      return new VBox(r1, r2, g1, g2, b1, b2, histogram);
    }
    avg() {
      if (!this._avg) {
        const { hist, getColorIndex } = this.histogram;
        const { r1, r2, g1, g2, b1, b2 } = this.dimension;
        let ntot = 0;
        const mult = 1 << 8 - SIGBITS;
        let rsum;
        let gsum;
        let bsum;
        rsum = gsum = bsum = 0;
        for (let r = r1; r <= r2; r++) {
          for (let g = g1; g <= g2; g++) {
            for (let b = b1; b <= b2; b++) {
              const index = getColorIndex(r, g, b);
              const h = hist[index];
              if (!h)
                continue;
              ntot += h;
              rsum += h * (r + 0.5) * mult;
              gsum += h * (g + 0.5) * mult;
              bsum += h * (b + 0.5) * mult;
            }
          }
        }
        if (ntot) {
          this._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)];
        } else {
          this._avg = [
            ~~(mult * (r1 + r2 + 1) / 2),
            ~~(mult * (g1 + g2 + 1) / 2),
            ~~(mult * (b1 + b2 + 1) / 2)
          ];
        }
      }
      return this._avg;
    }
    contains(rgb3) {
      let [r, g, b] = rgb3;
      const { r1, r2, g1, g2, b1, b2 } = this.dimension;
      r >>= RSHIFT;
      g >>= RSHIFT;
      b >>= RSHIFT;
      return r >= r1 && r <= r2 && g >= g1 && g <= g2 && b >= b1 && b <= b2;
    }
    split() {
      const { hist, getColorIndex } = this.histogram;
      const { r1, r2, g1, g2, b1, b2 } = this.dimension;
      const count = this.count();
      if (!count)
        return [];
      if (count === 1)
        return [this.clone()];
      const rw = r2 - r1 + 1;
      const gw = g2 - g1 + 1;
      const bw = b2 - b1 + 1;
      const maxw = Math.max(rw, gw, bw);
      let accSum = null;
      let sum;
      let total;
      sum = total = 0;
      let maxd = null;
      if (maxw === rw) {
        maxd = "r";
        accSum = new Uint32Array(r2 + 1);
        for (let r = r1; r <= r2; r++) {
          sum = 0;
          for (let g = g1; g <= g2; g++) {
            for (let b = b1; b <= b2; b++) {
              const index = getColorIndex(r, g, b);
              if (!hist[index])
                continue;
              sum += hist[index];
            }
          }
          total += sum;
          accSum[r] = total;
        }
      } else if (maxw === gw) {
        maxd = "g";
        accSum = new Uint32Array(g2 + 1);
        for (let g = g1; g <= g2; g++) {
          sum = 0;
          for (let r = r1; r <= r2; r++) {
            for (let b = b1; b <= b2; b++) {
              const index = getColorIndex(r, g, b);
              if (!hist[index])
                continue;
              sum += hist[index];
            }
          }
          total += sum;
          accSum[g] = total;
        }
      } else {
        maxd = "b";
        accSum = new Uint32Array(b2 + 1);
        for (let b = b1; b <= b2; b++) {
          sum = 0;
          for (let r = r1; r <= r2; r++) {
            for (let g = g1; g <= g2; g++) {
              const index = getColorIndex(r, g, b);
              if (!hist[index])
                continue;
              sum += hist[index];
            }
          }
          total += sum;
          accSum[b] = total;
        }
      }
      let splitPoint = -1;
      const reverseSum = new Uint32Array(accSum.length);
      for (let i = 0; i < accSum.length; i++) {
        const d = accSum[i];
        if (!d)
          continue;
        if (splitPoint < 0 && d > total / 2)
          splitPoint = i;
        reverseSum[i] = total - d;
      }
      const vbox = this;
      function doCut(d) {
        const dim1 = d + "1";
        const dim2 = d + "2";
        const d1 = vbox.dimension[dim1];
        let d2 = vbox.dimension[dim2];
        const vbox1 = vbox.clone();
        const vbox2 = vbox.clone();
        const left = splitPoint - d1;
        const right = d2 - splitPoint;
        if (left <= right) {
          d2 = Math.min(d2 - 1, ~~(splitPoint + right / 2));
          d2 = Math.max(0, d2);
        } else {
          d2 = Math.max(d1, ~~(splitPoint - 1 - left / 2));
          d2 = Math.min(vbox.dimension[dim2], d2);
        }
        while (!accSum[d2])
          d2++;
        let c2 = reverseSum[d2];
        while (!c2 && accSum[d2 - 1])
          c2 = reverseSum[--d2];
        vbox1.dimension[dim2] = d2;
        vbox2.dimension[dim1] = d2 + 1;
        return [vbox1, vbox2];
      }
      return doCut(maxd);
    }
  };

  // ../../../../node_modules/@vibrant/quantizer-mmcq/dist/esm/pqueue.js
  var PQueue = class {
    _sort() {
      if (!this._sorted) {
        this.contents.sort(this._comparator);
        this._sorted = true;
      }
    }
    constructor(comparator) {
      this._comparator = comparator;
      this.contents = [];
      this._sorted = false;
    }
    push(item) {
      this.contents.push(item);
      this._sorted = false;
    }
    peek(index) {
      this._sort();
      index = typeof index === "number" ? index : this.contents.length - 1;
      return this.contents[index];
    }
    pop() {
      this._sort();
      return this.contents.pop();
    }
    size() {
      return this.contents.length;
    }
    map(mapper) {
      this._sort();
      return this.contents.map(mapper);
    }
  };

  // ../../../../node_modules/@vibrant/quantizer-mmcq/dist/esm/index.js
  var fractByPopulations = 0.75;
  function _splitBoxes(pq, target) {
    let lastSize = pq.size();
    while (pq.size() < target) {
      const vbox = pq.pop();
      if (vbox && vbox.count() > 0) {
        const [vbox1, vbox2] = vbox.split();
        if (!vbox1)
          break;
        pq.push(vbox1);
        if (vbox2 && vbox2.count() > 0)
          pq.push(vbox2);
        if (pq.size() === lastSize) {
          break;
        } else {
          lastSize = pq.size();
        }
      } else {
        break;
      }
    }
  }
  var MMCQ = (pixels, opts) => {
    if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
      throw new Error("Wrong MMCQ parameters");
    }
    const vbox = VBox.build(pixels);
    vbox.histogram.colorCount;
    const pq = new PQueue((a, b) => a.count() - b.count());
    pq.push(vbox);
    _splitBoxes(pq, fractByPopulations * opts.colorCount);
    const pq2 = new PQueue(
      (a, b) => a.count() * a.volume() - b.count() * b.volume()
    );
    pq2.contents = pq.contents;
    _splitBoxes(pq2, opts.colorCount - pq2.size());
    return generateSwatches(pq2);
  };
  function generateSwatches(pq) {
    const swatches = [];
    while (pq.size()) {
      const v = pq.pop();
      const color = v.avg();
      swatches.push(new Swatch(color, v.count()));
    }
    return swatches;
  }

  // ../../../../node_modules/@vibrant/generator-default/dist/esm/index.js
  var DefaultOpts = {
    targetDarkLuma: 0.26,
    maxDarkLuma: 0.45,
    minLightLuma: 0.55,
    targetLightLuma: 0.74,
    minNormalLuma: 0.3,
    targetNormalLuma: 0.5,
    maxNormalLuma: 0.7,
    targetMutesSaturation: 0.3,
    maxMutesSaturation: 0.4,
    targetVibrantSaturation: 1,
    minVibrantSaturation: 0.35,
    weightSaturation: 3,
    weightLuma: 6.5,
    weightPopulation: 0.5
  };
  function _findMaxPopulation(swatches) {
    let p = 0;
    swatches.forEach((s) => {
      p = Math.max(p, s.population);
    });
    return p;
  }
  function _isAlreadySelected(palette, s) {
    return palette.Vibrant === s || palette.DarkVibrant === s || palette.LightVibrant === s || palette.Muted === s || palette.DarkMuted === s || palette.LightMuted === s;
  }
  function _createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {
    function weightedMean(...values) {
      let sum = 0;
      let weightSum = 0;
      for (let i = 0; i < values.length; i += 2) {
        const value = values[i];
        const weight = values[i + 1];
        if (!value || !weight)
          continue;
        sum += value * weight;
        weightSum += weight;
      }
      return sum / weightSum;
    }
    function invertDiff(value, targetValue) {
      return 1 - Math.abs(value - targetValue);
    }
    return weightedMean(
      invertDiff(saturation, targetSaturation),
      opts.weightSaturation,
      invertDiff(luma, targetLuma),
      opts.weightLuma,
      population / maxPopulation,
      opts.weightPopulation
    );
  }
  function _findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {
    let max6 = null;
    let maxValue = 0;
    swatches.forEach((swatch) => {
      const [, s, l] = swatch.hsl;
      if (s >= minSaturation && s <= maxSaturation && l >= minLuma && l <= maxLuma && !_isAlreadySelected(palette, swatch)) {
        const value = _createComparisonValue(
          s,
          targetSaturation,
          l,
          targetLuma,
          swatch.population,
          maxPopulation,
          opts
        );
        if (max6 === null || value > maxValue) {
          max6 = swatch;
          maxValue = value;
        }
      }
    });
    return max6;
  }
  function _generateVariationColors(swatches, maxPopulation, opts) {
    const palette = {
      Vibrant: null,
      DarkVibrant: null,
      LightVibrant: null,
      Muted: null,
      DarkMuted: null,
      LightMuted: null
    };
    palette.Vibrant = _findColorVariation(
      palette,
      swatches,
      maxPopulation,
      opts.targetNormalLuma,
      opts.minNormalLuma,
      opts.maxNormalLuma,
      opts.targetVibrantSaturation,
      opts.minVibrantSaturation,
      1,
      opts
    );
    palette.LightVibrant = _findColorVariation(
      palette,
      swatches,
      maxPopulation,
      opts.targetLightLuma,
      opts.minLightLuma,
      1,
      opts.targetVibrantSaturation,
      opts.minVibrantSaturation,
      1,
      opts
    );
    palette.DarkVibrant = _findColorVariation(
      palette,
      swatches,
      maxPopulation,
      opts.targetDarkLuma,
      0,
      opts.maxDarkLuma,
      opts.targetVibrantSaturation,
      opts.minVibrantSaturation,
      1,
      opts
    );
    palette.Muted = _findColorVariation(
      palette,
      swatches,
      maxPopulation,
      opts.targetNormalLuma,
      opts.minNormalLuma,
      opts.maxNormalLuma,
      opts.targetMutesSaturation,
      0,
      opts.maxMutesSaturation,
      opts
    );
    palette.LightMuted = _findColorVariation(
      palette,
      swatches,
      maxPopulation,
      opts.targetLightLuma,
      opts.minLightLuma,
      1,
      opts.targetMutesSaturation,
      0,
      opts.maxMutesSaturation,
      opts
    );
    palette.DarkMuted = _findColorVariation(
      palette,
      swatches,
      maxPopulation,
      opts.targetDarkLuma,
      0,
      opts.maxDarkLuma,
      opts.targetMutesSaturation,
      0,
      opts.maxMutesSaturation,
      opts
    );
    return palette;
  }
  function _generateEmptySwatches(palette, _maxPopulation, opts) {
    if (!palette.Vibrant && !palette.DarkVibrant && !palette.LightVibrant) {
      if (!palette.DarkVibrant && palette.DarkMuted) {
        let [h, s, l] = palette.DarkMuted.hsl;
        l = opts.targetDarkLuma;
        palette.DarkVibrant = new Swatch(hslToRgb(h, s, l), 0);
      }
      if (!palette.LightVibrant && palette.LightMuted) {
        let [h, s, l] = palette.LightMuted.hsl;
        l = opts.targetDarkLuma;
        palette.DarkVibrant = new Swatch(hslToRgb(h, s, l), 0);
      }
    }
    if (!palette.Vibrant && palette.DarkVibrant) {
      let [h, s, l] = palette.DarkVibrant.hsl;
      l = opts.targetNormalLuma;
      palette.Vibrant = new Swatch(hslToRgb(h, s, l), 0);
    } else if (!palette.Vibrant && palette.LightVibrant) {
      let [h, s, l] = palette.LightVibrant.hsl;
      l = opts.targetNormalLuma;
      palette.Vibrant = new Swatch(hslToRgb(h, s, l), 0);
    }
    if (!palette.DarkVibrant && palette.Vibrant) {
      let [h, s, l] = palette.Vibrant.hsl;
      l = opts.targetDarkLuma;
      palette.DarkVibrant = new Swatch(hslToRgb(h, s, l), 0);
    }
    if (!palette.LightVibrant && palette.Vibrant) {
      let [h, s, l] = palette.Vibrant.hsl;
      l = opts.targetLightLuma;
      palette.LightVibrant = new Swatch(hslToRgb(h, s, l), 0);
    }
    if (!palette.Muted && palette.Vibrant) {
      let [h, s, l] = palette.Vibrant.hsl;
      l = opts.targetMutesSaturation;
      palette.Muted = new Swatch(hslToRgb(h, s, l), 0);
    }
    if (!palette.DarkMuted && palette.DarkVibrant) {
      let [h, s, l] = palette.DarkVibrant.hsl;
      l = opts.targetMutesSaturation;
      palette.DarkMuted = new Swatch(hslToRgb(h, s, l), 0);
    }
    if (!palette.LightMuted && palette.LightVibrant) {
      let [h, s, l] = palette.LightVibrant.hsl;
      l = opts.targetMutesSaturation;
      palette.LightMuted = new Swatch(hslToRgb(h, s, l), 0);
    }
  }
  var DefaultGenerator = (swatches, opts) => {
    opts = Object.assign({}, DefaultOpts, opts);
    const maxPopulation = _findMaxPopulation(swatches);
    const palette = _generateVariationColors(swatches, maxPopulation, opts);
    _generateEmptySwatches(palette, maxPopulation, opts);
    return palette;
  };

  // node_modules/node-vibrant/dist/esm/pipeline/index.js
  var pipeline = new BasicPipeline().filter.register(
    "default",
    (r, g, b, a) => a >= 125 && !(r > 250 && g > 250 && b > 250)
  ).quantizer.register("mmcq", MMCQ).generator.register("default", DefaultGenerator);

  // node_modules/node-vibrant/dist/esm/browser.js
  Vibrant.use(pipeline);

  // node_modules/gsap/gsap-core.js
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _reverting;
  var _context;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  };
  var _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  };
  var _revertConfig = {
    suppressEvents: true
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _parseRelative = function _parseRelative2(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
    _lazyTweens.length && !_reverting && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || (obj[p] = defaults2[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
    return function(obj, defaults2) {
      for (var p in defaults2) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults2[p]);
      }
    };
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params, timeline2) {
    var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min6, max6, value) {
    return value < min6 ? min6 : value > max6 ? max6 : value;
  };
  var getUnit = function getUnit2(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  };
  var clamp = function clamp2(min6, max6, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min6, max6, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray = function toArray2(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max6, min6, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max6 = -_bigNum;
          while (max6 < (max6 = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt < l && wrapAt--;
        }
        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max6 = 0;
        min6 = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max6 && (max6 = d);
          d < min6 && (min6 = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max6 - min6;
        distances.min = min6;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray = _isArray(snapTo), radius, is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min6 = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min6) {
          min6 = dx;
          closest = i;
        }
      }
      closest = !radius || min6 <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min6, max6, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min6) ? !max6 : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min6) ? min6[~~(Math.random() * min6.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min6 - roundingIncrement / 2 + Math.random() * (max6 - min6 + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min6, max6, value) {
    return mapRange(min6, max6, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min6, max6, value) {
    var range = max6 - min6;
    return _isArray(min6) ? _wrapArray(min6, wrap2(0, min6.length), max6) : _conditionalReturn(value, function(value2) {
      return (range + (value2 - min6) % range) % range + min6;
    });
  };
  var wrapYoyo = function wrapYoyo2(min6, max6, value) {
    var range = max6 - min6, total = range * 2;
    return _isArray(min6) ? _wrapArray(min6, wrapYoyo2(0, min6.length - 1), max6) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min6) % total) % total || 0;
      return min6 + (value2 > range ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels = timeline2.labels, min6 = _bigNum, p, distance, label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min6 > (distance = Math.abs(distance))) {
        label = p;
        min6 = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    context3 && (_context = context3);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _registerPluginQueue = [];
  var _createPlugin = function _createPlugin2(config3) {
    if (!config3)
      return;
    config3 = !config3.name && config3["default"] || config3;
    if (_windowExists() || config3.headless) {
      var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
        this._props = [];
      } : config3, instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
      _wake();
      if (config3 !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config3.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config3.register && config3.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config3);
    }
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max6, min6, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max6 = Math.max(r, g, b);
      min6 = Math.min(r, g, b);
      l = (max6 + min6) / 2;
      if (max6 === min6) {
        h = s = 0;
      } else {
        d = max6 - min6;
        s = l > 0.5 ? d / (2 - max6 - min6) : d / (max6 + min6);
        h = max6 === r ? (g - b) / d + (g < b ? 6 : 0) : max6 === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = function() {
    var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners2 = [], _id, _req, _raf, _self, _delta, _i, _tick = function _tick2(v) {
      var elapsed = _getTime() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
      (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1e3;
        _self.time = time = time / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id = _req(_tick2));
      if (dispatch) {
        for (_i = 0; _i < _listeners2.length; _i++) {
          _listeners2[_i](time, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity;
        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function(t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners2[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners2.indexOf(callback)) && _listeners2.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners2
    };
    return _self;
  }();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split = (name + "").split("("), ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max6 = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max6, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value, suppressEvents) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config3) {
      if (config3 === void 0) {
        config3 = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config3;
      if (this._initted || this._startAt) {
        this.timeline && this.timeline.revert(config3);
        this.totalTime(-0.01, config3.suppressEvents);
      }
      this.data !== "nested" && config3.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (Math.abs(animation._ts) || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
      this._dur || (this._zTime = -_tinyNum);
      return this;
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self.then;
          self.then = null;
          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };
        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill() {
      _interrupt(this);
    };
    return Animation2;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render3(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && time && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      child.parent === this && _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max6 = 0, self = this, child = self._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }
      if (self._dirty) {
        parent = self.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max6 -= start;
            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }
            self.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max6 && child._ts && (max6 = child._end);
          child = prev;
        }
        _setDuration(self, self === _globalTimeline && self._time > max6 ? self._time : max6, 1, 1);
        self._dirty = 0;
      }
      return self._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _forceAllPropTweens;
  var _initTween = function _initTween2(tween, time, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards;
    if (!tl || keyframes && !vars.stagger) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1);
        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function() {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt)));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            time && (tween._zTime = time);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (!prevStartAt) {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender,
            stagger: 0,
            parent
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
    keyframes && time <= 0 && tl.render(_bigNum, true, true);
  };
  var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            pt = pt._next;
          }
        }
        if (!pt) {
          _forceAllPropTweens = 1;
          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT;
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
    }
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []);
      obj.forEach(function(value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
  var _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = /* @__PURE__ */ function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults2 || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0, a, kf, v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function(frame) {
              return tl.to(parsedTargets, frame, ">");
            });
            tl.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function(a2, b) {
                return a2.t - b.t;
              });
              time = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time);
                time += v.duration;
              }
            }
            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render3(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
        time = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time = dur;
              iteration--;
            } else if (time > dur) {
              time = dur;
            }
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted && iteration === prevIteration) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (time && !prevTime && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
        return this.resetTo(property, value, start, startIsRelative, 1);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting);
        return this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl = new Timeline(), params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next, pt2, first, last;
    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ function() {
    function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween2.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween2;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [];
  var _listeners = {};
  var _emptyArray = [];
  var _lastMediaTime = 0;
  var _contextID = 0;
  var _dispatch = function _dispatch2(type) {
    return (_listeners[type] || _emptyArray).map(function(f) {
      return f();
    });
  };
  var _onMediaChange = function _onMediaChange2() {
    var time = Date.now(), matches = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function(c) {
        var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches;
          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function(c) {
        return c.onMatch(c, function(func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
  var Context = /* @__PURE__ */ function() {
    function Context2(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      this.id = _contextID++;
      func && this.add(func);
    }
    var _proto5 = Context2.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self = this, f = function f2() {
        var prev = _context, prevSelector = self.selector, result;
        prev && prev !== self && prev.data.push(self);
        scope && (self.selector = selector(scope));
        _context = self;
        result = func.apply(self, arguments);
        _isFunction(result) && self._r.push(result);
        _context = prev;
        self.selector = prevSelector;
        self.isReverted = false;
        return result;
      };
      self.last = f;
      return name === _isFunction ? f(self, function(func2) {
        return self.add(null, func2);
      }) : name ? self[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function(e) {
        return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill(revert, matchMedia2) {
      var _this4 = this;
      if (revert) {
        (function() {
          var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
          while (i2--) {
            t = _this4.data[i2];
            if (t.data === "isFlip") {
              t.revert();
              t.getChildren(true, true, false).forEach(function(tween) {
                return tweens.splice(tweens.indexOf(tween), 1);
              });
            }
          }
          tweens.map(function(t2) {
            return {
              g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
              t: t2
            };
          }).sort(function(a, b) {
            return b.g - a.g || -Infinity;
          }).forEach(function(o) {
            return o.t.revert(revert);
          });
          i2 = _this4.data.length;
          while (i2--) {
            t = _this4.data[i2];
            if (t instanceof Timeline) {
              if (t.data !== "nested") {
                t.scrollTrigger && t.scrollTrigger.revert();
                t.kill();
              }
            } else {
              !(t instanceof Tween) && t.revert && t.revert(revert);
            }
          }
          _this4._r.forEach(function(f) {
            return f(revert, _this4);
          });
          _this4.isReverted = true;
        })();
      } else {
        this.data.forEach(function(e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia2) {
        var i = _media.length;
        while (i--) {
          _media[i].id === this.id && _media.splice(i, 1);
        }
      }
    };
    _proto5.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    return Context2;
  }();
  var MatchMedia = /* @__PURE__ */ function() {
    function MatchMedia2(scope) {
      this.contexts = [];
      this.scope = scope;
      _context && _context.data.push(this);
    }
    var _proto6 = MatchMedia2.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
      _context && !context3.selector && (context3.selector = _context.selector);
      this.contexts.push(context3);
      func = context3.add("onMatch", func);
      context3.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context3) < 0 && _media.push(context3);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context3, function(f) {
        return context3.add(null, f);
      });
      return this;
    };
    _proto6.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    _proto6.kill = function kill(revert) {
      this.contexts.forEach(function(c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia2;
  }();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _setDefaults22;
      var tween = gsap.to(target, _setDefaults((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults2), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars), child, next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function(c) {
        var cond = c.conditions, found, p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type], i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context2(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      rawVars: 1,
      init: function init4(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp2, p;
          if (_isString(vars)) {
            temp2 = {};
            _forEachName(vars, function(name2) {
              return temp2[name2] = 1;
            });
            vars = temp2;
          }
          if (modifier) {
            temp2 = {};
            for (p in vars) {
              temp2[p] = modifier(vars[p]);
            }
            vars = temp2;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.12.7";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/gsap/CSSPlugin.js
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _reverting2;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _saveStyle = function _saveStyle2(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style, cache = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function(a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
        property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function(p) {
          return _saveStyle2.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  };
  var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _revertStyle = function _revertStyle2() {
    var props = this.props, target = this.target, style = target.style, cache = target._gsap, i, p;
    for (i = 0; i < props.length; i += 3) {
      if (!props[i + 1]) {
        props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
      } else if (props[i + 1] === 2) {
        target[props[i]](props[i + 2]);
      } else {
        target[props[i]] = props[i + 2];
      }
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache[p] = this.tfm[p];
      }
      if (cache.svg) {
        cache.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting2();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache.zOrigin + "px";
          cache.zOrigin = 0;
          cache.renderTransform();
        }
        cache.uncache = 1;
      }
    }
  };
  var _getStyleSaver = function _getStyleSaver2(target, properties) {
    var saver = {
      target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || gsap.core.getCache(target);
    properties && target.style && target.nodeType && properties.split(",").forEach(function(p) {
      return saver.save(p);
    });
    return saver;
  };
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e && e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
    var e = element || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _reverting2 = gsap.core.reverting;
      _pluginInitted = 1;
    }
  };
  var _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
    var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true), bbox;
    clone.style.display = "block";
    svg.appendChild(clone);
    _docElement.appendChild(svg);
    try {
      bbox = clone.getBBox();
    } catch (e) {
    }
    svg.removeChild(clone);
    _docElement.removeChild(svg);
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds, cloned;
    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getReparentedCloneBBox(target);
      cloned = 1;
    }
    bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style, first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _nonStandardLayouts = {
    grid: 1,
    flex: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
      return _round(curValue / cache.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get = function _get2(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache) {
          cache.svg && target.removeAttribute("transform");
          style.scale = style.rotate = style.translate = "none";
          _parseTransform(target, 1);
          cache.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp2, addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
      temp2 = target.transform.baseVal.consolidate().matrix;
      matrix = [temp2.a, temp2.b, temp2.c, temp2.d, temp2.e, temp2.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      temp2 = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
        addedToDOM = 1;
        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp2 ? style.display = temp2 : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache = target._gsap || new GSCache(target);
    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }
    var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos6, sin5, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache.svg);
    if (cache.svg) {
      if (cache.uncache) {
        t2 = target.getBBox();
        origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin");
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos6 = Math.cos(-angle);
          sin5 = Math.sin(-angle);
          t1 = a12 * cos6 + a13 * sin5;
          t2 = a22 * cos6 + a23 * sin5;
          t3 = a32 * cos6 + a33 * sin5;
          a13 = a12 * -sin5 + a13 * cos6;
          a23 = a22 * -sin5 + a23 * cos6;
          a33 = a32 * -sin5 + a33 * cos6;
          a43 = a42 * -sin5 + a43 * cos6;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos6 = Math.cos(-angle);
          sin5 = Math.sin(-angle);
          t1 = a * cos6 - a13 * sin5;
          t2 = b * cos6 - a23 * sin5;
          t3 = c * cos6 - a33 * sin5;
          a43 = d * sin5 + a43 * cos6;
          a = t1;
          b = t2;
          c = t3;
        }
        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos6 = Math.cos(angle);
          sin5 = Math.sin(angle);
          t1 = a * cos6 + b * sin5;
          t2 = a12 * cos6 + a22 * sin5;
          b = b * cos6 - a * sin5;
          a22 = a22 * cos6 - a12 * sin5;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache.svg) {
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    _renderCSSTransforms(ratio, cache);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
    var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos6;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos6 = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos6 * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos6 * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
    var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp2;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp2 = Math.tan(skewX - skewY);
        temp2 = Math.sqrt(1 + temp2 * temp2);
        a12 *= temp2;
        a22 *= temp2;
        if (skewY) {
          temp2 = Math.tan(skewY);
          temp2 = Math.sqrt(1 + temp2 * temp2);
          a11 *= temp2;
          a21 *= temp2;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp2 = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp2.width);
      ty = _round(ty + yPercent / 100 * temp2.height);
    }
    temp2 = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp2);
    forceCSS && (target.style[_transformProp] = temp2);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
    var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render2(ratio, data) {
      if (data.tween._time || !_reverting2()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);

  // node_modules/gsap/index.js
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // node_modules/spcr-settings/settingsSection.tsx
  var import_react = __toESM(require_react());
  var import_react_dom = __toESM(require_react_dom());
  var SettingsSection = class {
    constructor(name, settingsId, initialSettingsFields = {}) {
      this.name = name;
      this.settingsId = settingsId;
      this.initialSettingsFields = initialSettingsFields;
      this.settingsFields = this.initialSettingsFields;
      this.setRerender = null;
      this.pushSettings = async () => {
        Object.entries(this.settingsFields).forEach(([nameId, field]) => {
          if (field.type !== "button" && this.getFieldValue(nameId) === void 0) {
            this.setFieldValue(nameId, field.defaultValue);
          }
        });
        while (!Spicetify?.Platform?.History?.listen) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (this.stopHistoryListener)
          this.stopHistoryListener();
        this.stopHistoryListener = Spicetify.Platform.History.listen((e) => {
          if (e.pathname === "/preferences") {
            this.render();
          }
        });
        if (Spicetify.Platform.History.location.pathname === "/preferences") {
          await this.render();
        }
      };
      this.rerender = () => {
        if (this.setRerender) {
          this.setRerender(Math.random());
        }
      };
      this.render = async () => {
        while (!document.getElementById("desktop.settings.selectLanguage")) {
          if (Spicetify.Platform.History.location.pathname !== "/preferences")
            return;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        const allSettingsContainer = document.querySelector(
          ".main-view-container__scroll-node-child main div"
        );
        if (!allSettingsContainer)
          return console.error("[spcr-settings] settings container not found");
        let pluginSettingsContainer = Array.from(
          allSettingsContainer.children
        ).find((child) => child.id === this.settingsId);
        if (!pluginSettingsContainer) {
          pluginSettingsContainer = document.createElement("div");
          pluginSettingsContainer.id = this.settingsId;
          allSettingsContainer.appendChild(pluginSettingsContainer);
        } else {
          console.log(pluginSettingsContainer);
        }
        import_react_dom.default.render(/* @__PURE__ */ import_react.default.createElement(this.FieldsContainer, null), pluginSettingsContainer);
      };
      this.addButton = (nameId, description, value, onClick, events) => {
        this.settingsFields[nameId] = {
          type: "button",
          description,
          value,
          events: {
            onClick,
            ...events
          }
        };
      };
      this.addInput = (nameId, description, defaultValue, onChange, inputType, events) => {
        this.settingsFields[nameId] = {
          type: "input",
          description,
          defaultValue,
          inputType,
          events: {
            onChange,
            ...events
          }
        };
      };
      this.addHidden = (nameId, defaultValue) => {
        this.settingsFields[nameId] = {
          type: "hidden",
          defaultValue
        };
      };
      this.addToggle = (nameId, description, defaultValue, onChange, events) => {
        this.settingsFields[nameId] = {
          type: "toggle",
          description,
          defaultValue,
          events: {
            onChange,
            ...events
          }
        };
      };
      this.addDropDown = (nameId, description, options, defaultIndex, onSelect, events) => {
        this.settingsFields[nameId] = {
          type: "dropdown",
          description,
          defaultValue: options[defaultIndex],
          options,
          events: {
            onSelect,
            ...events
          }
        };
      };
      this.getFieldValue = (nameId) => {
        return JSON.parse(
          Spicetify.LocalStorage.get(`${this.settingsId}.${nameId}`) || "{}"
        )?.value;
      };
      this.setFieldValue = (nameId, newValue) => {
        Spicetify.LocalStorage.set(
          `${this.settingsId}.${nameId}`,
          JSON.stringify({ value: newValue })
        );
      };
      this.FieldsContainer = () => {
        const [rerender, setRerender] = (0, import_react.useState)(0);
        this.setRerender = setRerender;
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: "x-settings-section",
          key: rerender
        }, /* @__PURE__ */ import_react.default.createElement("h2", {
          className: "TypeElement-cello-textBase-type"
        }, this.name), Object.entries(this.settingsFields).map(([nameId, field]) => {
          return /* @__PURE__ */ import_react.default.createElement(this.Field, {
            nameId,
            field
          });
        }));
      };
      this.Field = (props) => {
        const id = `${this.settingsId}.${props.nameId}`;
        let defaultStateValue;
        if (props.field.type === "button") {
          defaultStateValue = props.field.value;
        } else {
          defaultStateValue = this.getFieldValue(props.nameId);
        }
        if (props.field.type === "hidden") {
          return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null);
        }
        const [value, setValueState] = (0, import_react.useState)(defaultStateValue);
        const setValue = (newValue) => {
          if (newValue !== void 0) {
            setValueState(newValue);
            this.setFieldValue(props.nameId, newValue);
          }
        };
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: "x-settings-row"
        }, /* @__PURE__ */ import_react.default.createElement("div", {
          className: "x-settings-firstColumn"
        }, /* @__PURE__ */ import_react.default.createElement("label", {
          className: "TypeElement-viola-textSubdued-type",
          htmlFor: id
        }, props.field.description || "")), /* @__PURE__ */ import_react.default.createElement("div", {
          className: "x-settings-secondColumn"
        }, props.field.type === "input" ? /* @__PURE__ */ import_react.default.createElement("input", {
          className: "x-settings-input",
          id,
          dir: "ltr",
          value,
          type: props.field.inputType || "text",
          ...props.field.events,
          onChange: (e) => {
            setValue(e.currentTarget.value);
            const onChange = props.field.events?.onChange;
            if (onChange)
              onChange(e);
          }
        }) : props.field.type === "button" ? /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement("button", {
          id,
          className: "Button-sc-y0gtbx-0 Button-small-buttonSecondary-useBrowserDefaultFocusStyle x-settings-button",
          ...props.field.events,
          onClick: (e) => {
            setValue();
            const onClick = props.field.events?.onClick;
            if (onClick)
              onClick(e);
          },
          type: "button"
        }, value)) : props.field.type === "toggle" ? /* @__PURE__ */ import_react.default.createElement("label", {
          className: "x-settings-secondColumn x-toggle-wrapper"
        }, /* @__PURE__ */ import_react.default.createElement("input", {
          id,
          className: "x-toggle-input",
          type: "checkbox",
          checked: value,
          ...props.field.events,
          onClick: (e) => {
            setValue(e.currentTarget.checked);
            const onClick = props.field.events?.onClick;
            if (onClick)
              onClick(e);
          }
        }), /* @__PURE__ */ import_react.default.createElement("span", {
          className: "x-toggle-indicatorWrapper"
        }, /* @__PURE__ */ import_react.default.createElement("span", {
          className: "x-toggle-indicator"
        }))) : props.field.type === "dropdown" ? /* @__PURE__ */ import_react.default.createElement("select", {
          className: "main-dropDown-dropDown",
          id,
          ...props.field.events,
          onChange: (e) => {
            setValue(
              props.field.options[e.currentTarget.selectedIndex]
            );
            const onChange = props.field.events?.onChange;
            if (onChange)
              onChange(e);
          }
        }, props.field.options.map((option, i) => {
          return /* @__PURE__ */ import_react.default.createElement("option", {
            selected: option === value,
            value: i + 1
          }, option);
        })) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null)));
      };
    }
  };

  // ../../../../node_modules/chroma-js/src/utils/limit.js
  var { min, max } = Math;
  var limit_default = (x, low = 0, high = 1) => {
    return min(max(low, x), high);
  };

  // ../../../../node_modules/chroma-js/src/utils/clip_rgb.js
  var clip_rgb_default = (rgb3) => {
    rgb3._clipped = false;
    rgb3._unclipped = rgb3.slice(0);
    for (let i = 0; i <= 3; i++) {
      if (i < 3) {
        if (rgb3[i] < 0 || rgb3[i] > 255)
          rgb3._clipped = true;
        rgb3[i] = limit_default(rgb3[i], 0, 255);
      } else if (i === 3) {
        rgb3[i] = limit_default(rgb3[i], 0, 1);
      }
    }
    return rgb3;
  };

  // ../../../../node_modules/chroma-js/src/utils/type.js
  var classToType = {};
  for (let name of [
    "Boolean",
    "Number",
    "String",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Undefined",
    "Null"
  ]) {
    classToType[`[object ${name}]`] = name.toLowerCase();
  }
  function type_default(obj) {
    return classToType[Object.prototype.toString.call(obj)] || "object";
  }

  // ../../../../node_modules/chroma-js/src/utils/unpack.js
  var unpack_default = (args, keyOrder = null) => {
    if (args.length >= 3)
      return Array.prototype.slice.call(args);
    if (type_default(args[0]) == "object" && keyOrder) {
      return keyOrder.split("").filter((k) => args[0][k] !== void 0).map((k) => args[0][k]);
    }
    return args[0].slice(0);
  };

  // ../../../../node_modules/chroma-js/src/utils/last.js
  var last_default = (args) => {
    if (args.length < 2)
      return null;
    const l = args.length - 1;
    if (type_default(args[l]) == "string")
      return args[l].toLowerCase();
    return null;
  };

  // ../../../../node_modules/chroma-js/src/utils/index.js
  var { PI, min: min2, max: max2 } = Math;
  var rnd2 = (a) => Math.round(a * 100) / 100;
  var rnd3 = (a) => Math.round(a * 100) / 100;
  var TWOPI = PI * 2;
  var PITHIRD = PI / 3;
  var DEG2RAD = PI / 180;
  var RAD2DEG = 180 / PI;
  function reverse3(arr) {
    return [...arr.slice(0, 3).reverse(), ...arr.slice(3)];
  }

  // ../../../../node_modules/chroma-js/src/io/input.js
  var input_default = {
    format: {},
    autodetect: []
  };

  // ../../../../node_modules/chroma-js/src/Color.js
  var Color = class {
    constructor(...args) {
      const me = this;
      if (type_default(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
        return args[0];
      }
      let mode = last_default(args);
      let autodetect = false;
      if (!mode) {
        autodetect = true;
        if (!input_default.sorted) {
          input_default.autodetect = input_default.autodetect.sort((a, b) => b.p - a.p);
          input_default.sorted = true;
        }
        for (let chk of input_default.autodetect) {
          mode = chk.test(...args);
          if (mode)
            break;
        }
      }
      if (input_default.format[mode]) {
        const rgb3 = input_default.format[mode].apply(
          null,
          autodetect ? args : args.slice(0, -1)
        );
        me._rgb = clip_rgb_default(rgb3);
      } else {
        throw new Error("unknown format: " + args);
      }
      if (me._rgb.length === 3)
        me._rgb.push(1);
    }
    toString() {
      if (type_default(this.hex) == "function")
        return this.hex();
      return `[${this._rgb.join(",")}]`;
    }
  };
  var Color_default = Color;

  // ../../../../node_modules/chroma-js/src/version.js
  var version = "3.1.2";

  // ../../../../node_modules/chroma-js/src/chroma.js
  var chroma = (...args) => {
    return new Color_default(...args);
  };
  chroma.version = version;
  var chroma_default = chroma;

  // ../../../../node_modules/chroma-js/src/colors/w3cx11.js
  var w3cx11 = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    laserlemon: "#ffff54",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrod: "#fafad2",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    maroon2: "#7f0000",
    maroon3: "#b03060",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    purple2: "#7f007f",
    purple3: "#a020f0",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  var w3cx11_default = w3cx11;

  // ../../../../node_modules/chroma-js/src/io/hex/hex2rgb.js
  var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
  var hex2rgb = (hex2) => {
    if (hex2.match(RE_HEX)) {
      if (hex2.length === 4 || hex2.length === 7) {
        hex2 = hex2.substr(1);
      }
      if (hex2.length === 3) {
        hex2 = hex2.split("");
        hex2 = hex2[0] + hex2[0] + hex2[1] + hex2[1] + hex2[2] + hex2[2];
      }
      const u = parseInt(hex2, 16);
      const r = u >> 16;
      const g = u >> 8 & 255;
      const b = u & 255;
      return [r, g, b, 1];
    }
    if (hex2.match(RE_HEXA)) {
      if (hex2.length === 5 || hex2.length === 9) {
        hex2 = hex2.substr(1);
      }
      if (hex2.length === 4) {
        hex2 = hex2.split("");
        hex2 = hex2[0] + hex2[0] + hex2[1] + hex2[1] + hex2[2] + hex2[2] + hex2[3] + hex2[3];
      }
      const u = parseInt(hex2, 16);
      const r = u >> 24 & 255;
      const g = u >> 16 & 255;
      const b = u >> 8 & 255;
      const a = Math.round((u & 255) / 255 * 100) / 100;
      return [r, g, b, a];
    }
    throw new Error(`unknown hex color: ${hex2}`);
  };
  var hex2rgb_default = hex2rgb;

  // ../../../../node_modules/chroma-js/src/io/hex/rgb2hex.js
  var { round } = Math;
  var rgb2hex = (...args) => {
    let [r, g, b, a] = unpack_default(args, "rgba");
    let mode = last_default(args) || "auto";
    if (a === void 0)
      a = 1;
    if (mode === "auto") {
      mode = a < 1 ? "rgba" : "rgb";
    }
    r = round(r);
    g = round(g);
    b = round(b);
    const u = r << 16 | g << 8 | b;
    let str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    let hxa = "0" + round(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    switch (mode.toLowerCase()) {
      case "rgba":
        return `#${str}${hxa}`;
      case "argb":
        return `#${hxa}${str}`;
      default:
        return `#${str}`;
    }
  };
  var rgb2hex_default = rgb2hex;

  // ../../../../node_modules/chroma-js/src/io/named/index.js
  Color_default.prototype.name = function() {
    const hex2 = rgb2hex_default(this._rgb, "rgb");
    for (let n of Object.keys(w3cx11_default)) {
      if (w3cx11_default[n] === hex2)
        return n.toLowerCase();
    }
    return hex2;
  };
  input_default.format.named = (name) => {
    name = name.toLowerCase();
    if (w3cx11_default[name])
      return hex2rgb_default(w3cx11_default[name]);
    throw new Error("unknown color name: " + name);
  };
  input_default.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
      if (!rest.length && type_default(h) === "string" && w3cx11_default[h.toLowerCase()]) {
        return "named";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/ops/alpha.js
  Color_default.prototype.alpha = function(a, mutate = false) {
    if (a !== void 0 && type_default(a) === "number") {
      if (mutate) {
        this._rgb[3] = a;
        return this;
      }
      return new Color_default([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
    }
    return this._rgb[3];
  };

  // ../../../../node_modules/chroma-js/src/ops/clipped.js
  Color_default.prototype.clipped = function() {
    return this._rgb._clipped || false;
  };

  // ../../../../node_modules/chroma-js/src/io/lab/lab-constants.js
  var labConstants = {
    Kn: 18,
    labWhitePoint: "d65",
    Xn: 0.95047,
    Yn: 1,
    Zn: 1.08883,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 8856452e-9,
    kE: 216 / 24389,
    kKE: 8,
    kK: 24389 / 27,
    RefWhiteRGB: {
      X: 0.95047,
      Y: 1,
      Z: 1.08883
    },
    MtxRGB2XYZ: {
      m00: 0.4124564390896922,
      m01: 0.21267285140562253,
      m02: 0.0193338955823293,
      m10: 0.357576077643909,
      m11: 0.715152155287818,
      m12: 0.11919202588130297,
      m20: 0.18043748326639894,
      m21: 0.07217499330655958,
      m22: 0.9503040785363679
    },
    MtxXYZ2RGB: {
      m00: 3.2404541621141045,
      m01: -0.9692660305051868,
      m02: 0.055643430959114726,
      m10: -1.5371385127977166,
      m11: 1.8760108454466942,
      m12: -0.2040259135167538,
      m20: -0.498531409556016,
      m21: 0.041556017530349834,
      m22: 1.0572251882231791
    },
    As: 0.9414285350000001,
    Bs: 1.040417467,
    Cs: 1.089532651,
    MtxAdaptMa: {
      m00: 0.8951,
      m01: -0.7502,
      m02: 0.0389,
      m10: 0.2664,
      m11: 1.7135,
      m12: -0.0685,
      m20: -0.1614,
      m21: 0.0367,
      m22: 1.0296
    },
    MtxAdaptMaI: {
      m00: 0.9869929054667123,
      m01: 0.43230526972339456,
      m02: -0.008528664575177328,
      m10: -0.14705425642099013,
      m11: 0.5183602715367776,
      m12: 0.04004282165408487,
      m20: 0.15996265166373125,
      m21: 0.0492912282128556,
      m22: 0.9684866957875502
    }
  };
  var lab_constants_default = labConstants;
  var ILLUMINANTS = /* @__PURE__ */ new Map([
    ["a", [1.0985, 0.35585]],
    ["b", [1.0985, 0.35585]],
    ["c", [0.98074, 1.18232]],
    ["d50", [0.96422, 0.82521]],
    ["d55", [0.95682, 0.92149]],
    ["d65", [0.95047, 1.08883]],
    ["e", [1, 1, 1]],
    ["f2", [0.99186, 0.67393]],
    ["f7", [0.95041, 1.08747]],
    ["f11", [1.00962, 0.6435]],
    ["icc", [0.96422, 0.82521]]
  ]);
  function setLabWhitePoint(name) {
    const ill = ILLUMINANTS.get(String(name).toLowerCase());
    if (!ill) {
      throw new Error("unknown Lab illuminant " + name);
    }
    labConstants.labWhitePoint = name;
    labConstants.Xn = ill[0];
    labConstants.Zn = ill[1];
  }
  function getLabWhitePoint() {
    return labConstants.labWhitePoint;
  }

  // ../../../../node_modules/chroma-js/src/io/lab/lab2rgb.js
  var lab2rgb = (...args) => {
    args = unpack_default(args, "lab");
    const [L, a, b] = args;
    const [x, y, z] = lab2xyz(L, a, b);
    const [r, g, b_] = xyz2rgb(x, y, z);
    return [r, g, b_, args.length > 3 ? args[3] : 1];
  };
  var lab2xyz = (L, a, b) => {
    const { kE, kK, kKE, Xn, Yn, Zn } = lab_constants_default;
    const fy = (L + 16) / 116;
    const fx = 2e-3 * a + fy;
    const fz = fy - 5e-3 * b;
    const fx3 = fx * fx * fx;
    const fz3 = fz * fz * fz;
    const xr = fx3 > kE ? fx3 : (116 * fx - 16) / kK;
    const yr = L > kKE ? Math.pow((L + 16) / 116, 3) : L / kK;
    const zr = fz3 > kE ? fz3 : (116 * fz - 16) / kK;
    const x = xr * Xn;
    const y = yr * Yn;
    const z = zr * Zn;
    return [x, y, z];
  };
  var compand = (linear) => {
    const sign = Math.sign(linear);
    linear = Math.abs(linear);
    return (linear <= 31308e-7 ? linear * 12.92 : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055) * sign;
  };
  var xyz2rgb = (x, y, z) => {
    const { MtxAdaptMa, MtxAdaptMaI, MtxXYZ2RGB, RefWhiteRGB, Xn, Yn, Zn } = lab_constants_default;
    const As = Xn * MtxAdaptMa.m00 + Yn * MtxAdaptMa.m10 + Zn * MtxAdaptMa.m20;
    const Bs = Xn * MtxAdaptMa.m01 + Yn * MtxAdaptMa.m11 + Zn * MtxAdaptMa.m21;
    const Cs = Xn * MtxAdaptMa.m02 + Yn * MtxAdaptMa.m12 + Zn * MtxAdaptMa.m22;
    const Ad = RefWhiteRGB.X * MtxAdaptMa.m00 + RefWhiteRGB.Y * MtxAdaptMa.m10 + RefWhiteRGB.Z * MtxAdaptMa.m20;
    const Bd = RefWhiteRGB.X * MtxAdaptMa.m01 + RefWhiteRGB.Y * MtxAdaptMa.m11 + RefWhiteRGB.Z * MtxAdaptMa.m21;
    const Cd = RefWhiteRGB.X * MtxAdaptMa.m02 + RefWhiteRGB.Y * MtxAdaptMa.m12 + RefWhiteRGB.Z * MtxAdaptMa.m22;
    const X1 = (x * MtxAdaptMa.m00 + y * MtxAdaptMa.m10 + z * MtxAdaptMa.m20) * (Ad / As);
    const Y1 = (x * MtxAdaptMa.m01 + y * MtxAdaptMa.m11 + z * MtxAdaptMa.m21) * (Bd / Bs);
    const Z1 = (x * MtxAdaptMa.m02 + y * MtxAdaptMa.m12 + z * MtxAdaptMa.m22) * (Cd / Cs);
    const X2 = X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
    const Y2 = X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
    const Z2 = X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;
    const r = compand(
      X2 * MtxXYZ2RGB.m00 + Y2 * MtxXYZ2RGB.m10 + Z2 * MtxXYZ2RGB.m20
    );
    const g = compand(
      X2 * MtxXYZ2RGB.m01 + Y2 * MtxXYZ2RGB.m11 + Z2 * MtxXYZ2RGB.m21
    );
    const b = compand(
      X2 * MtxXYZ2RGB.m02 + Y2 * MtxXYZ2RGB.m12 + Z2 * MtxXYZ2RGB.m22
    );
    return [r * 255, g * 255, b * 255];
  };
  var lab2rgb_default = lab2rgb;

  // ../../../../node_modules/chroma-js/src/io/lab/rgb2lab.js
  var rgb2lab = (...args) => {
    const [r, g, b, ...rest] = unpack_default(args, "rgb");
    const [x, y, z] = rgb2xyz(r, g, b);
    const [L, a, b_] = xyz2lab(x, y, z);
    return [L, a, b_, ...rest.length > 0 && rest[0] < 1 ? [rest[0]] : []];
  };
  function xyz2lab(x, y, z) {
    const { Xn, Yn, Zn, kE, kK } = lab_constants_default;
    const xr = x / Xn;
    const yr = y / Yn;
    const zr = z / Zn;
    const fx = xr > kE ? Math.pow(xr, 1 / 3) : (kK * xr + 16) / 116;
    const fy = yr > kE ? Math.pow(yr, 1 / 3) : (kK * yr + 16) / 116;
    const fz = zr > kE ? Math.pow(zr, 1 / 3) : (kK * zr + 16) / 116;
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  function gammaAdjustSRGB(companded) {
    const sign = Math.sign(companded);
    companded = Math.abs(companded);
    const linear = companded <= 0.04045 ? companded / 12.92 : Math.pow((companded + 0.055) / 1.055, 2.4);
    return linear * sign;
  }
  var rgb2xyz = (r, g, b) => {
    r = gammaAdjustSRGB(r / 255);
    g = gammaAdjustSRGB(g / 255);
    b = gammaAdjustSRGB(b / 255);
    const { MtxRGB2XYZ, MtxAdaptMa, MtxAdaptMaI, Xn, Yn, Zn, As, Bs, Cs } = lab_constants_default;
    let x = r * MtxRGB2XYZ.m00 + g * MtxRGB2XYZ.m10 + b * MtxRGB2XYZ.m20;
    let y = r * MtxRGB2XYZ.m01 + g * MtxRGB2XYZ.m11 + b * MtxRGB2XYZ.m21;
    let z = r * MtxRGB2XYZ.m02 + g * MtxRGB2XYZ.m12 + b * MtxRGB2XYZ.m22;
    const Ad = Xn * MtxAdaptMa.m00 + Yn * MtxAdaptMa.m10 + Zn * MtxAdaptMa.m20;
    const Bd = Xn * MtxAdaptMa.m01 + Yn * MtxAdaptMa.m11 + Zn * MtxAdaptMa.m21;
    const Cd = Xn * MtxAdaptMa.m02 + Yn * MtxAdaptMa.m12 + Zn * MtxAdaptMa.m22;
    let X = x * MtxAdaptMa.m00 + y * MtxAdaptMa.m10 + z * MtxAdaptMa.m20;
    let Y = x * MtxAdaptMa.m01 + y * MtxAdaptMa.m11 + z * MtxAdaptMa.m21;
    let Z = x * MtxAdaptMa.m02 + y * MtxAdaptMa.m12 + z * MtxAdaptMa.m22;
    X *= Ad / As;
    Y *= Bd / Bs;
    Z *= Cd / Cs;
    x = X * MtxAdaptMaI.m00 + Y * MtxAdaptMaI.m10 + Z * MtxAdaptMaI.m20;
    y = X * MtxAdaptMaI.m01 + Y * MtxAdaptMaI.m11 + Z * MtxAdaptMaI.m21;
    z = X * MtxAdaptMaI.m02 + Y * MtxAdaptMaI.m12 + Z * MtxAdaptMaI.m22;
    return [x, y, z];
  };
  var rgb2lab_default = rgb2lab;

  // ../../../../node_modules/chroma-js/src/io/lab/index.js
  Color_default.prototype.lab = function() {
    return rgb2lab_default(this._rgb);
  };
  var lab = (...args) => new Color_default(...args, "lab");
  Object.assign(chroma_default, { lab, getLabWhitePoint, setLabWhitePoint });
  input_default.format.lab = lab2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "lab");
      if (type_default(args) === "array" && args.length === 3) {
        return "lab";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/ops/darken.js
  Color_default.prototype.darken = function(amount = 1) {
    const me = this;
    const lab3 = me.lab();
    lab3[0] -= lab_constants_default.Kn * amount;
    return new Color_default(lab3, "lab").alpha(me.alpha(), true);
  };
  Color_default.prototype.brighten = function(amount = 1) {
    return this.darken(-amount);
  };
  Color_default.prototype.darker = Color_default.prototype.darken;
  Color_default.prototype.brighter = Color_default.prototype.brighten;

  // ../../../../node_modules/chroma-js/src/ops/get.js
  Color_default.prototype.get = function(mc) {
    const [mode, channel] = mc.split(".");
    const src = this[mode]();
    if (channel) {
      const i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
      if (i > -1)
        return src[i];
      throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
      return src;
    }
  };

  // ../../../../node_modules/chroma-js/src/ops/luminance.js
  var { pow } = Math;
  var EPS = 1e-7;
  var MAX_ITER = 20;
  Color_default.prototype.luminance = function(lum2, mode = "rgb") {
    if (lum2 !== void 0 && type_default(lum2) === "number") {
      if (lum2 === 0) {
        return new Color_default([0, 0, 0, this._rgb[3]], "rgb");
      }
      if (lum2 === 1) {
        return new Color_default([255, 255, 255, this._rgb[3]], "rgb");
      }
      let cur_lum = this.luminance();
      let max_iter = MAX_ITER;
      const test = (low, high) => {
        const mid = low.interpolate(high, 0.5, mode);
        const lm = mid.luminance();
        if (Math.abs(lum2 - lm) < EPS || !max_iter--) {
          return mid;
        }
        return lm > lum2 ? test(low, mid) : test(mid, high);
      };
      const rgb3 = (cur_lum > lum2 ? test(new Color_default([0, 0, 0]), this) : test(this, new Color_default([255, 255, 255]))).rgb();
      return new Color_default([...rgb3, this._rgb[3]]);
    }
    return rgb2luminance(...this._rgb.slice(0, 3));
  };
  var rgb2luminance = (r, g, b) => {
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  var luminance_x = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);
  };

  // ../../../../node_modules/chroma-js/src/interpolator/index.js
  var interpolator_default = {};

  // ../../../../node_modules/chroma-js/src/generator/mix.js
  var mix_default = (col1, col2, f = 0.5, ...rest) => {
    let mode = rest[0] || "lrgb";
    if (!interpolator_default[mode] && !rest.length) {
      mode = Object.keys(interpolator_default)[0];
    }
    if (!interpolator_default[mode]) {
      throw new Error(`interpolation mode ${mode} is not defined`);
    }
    if (type_default(col1) !== "object")
      col1 = new Color_default(col1);
    if (type_default(col2) !== "object")
      col2 = new Color_default(col2);
    return interpolator_default[mode](col1, col2, f).alpha(
      col1.alpha() + f * (col2.alpha() - col1.alpha())
    );
  };

  // ../../../../node_modules/chroma-js/src/ops/mix.js
  Color_default.prototype.mix = Color_default.prototype.interpolate = function(col2, f = 0.5, ...rest) {
    return mix_default(this, col2, f, ...rest);
  };

  // ../../../../node_modules/chroma-js/src/ops/premultiply.js
  Color_default.prototype.premultiply = function(mutate = false) {
    const rgb3 = this._rgb;
    const a = rgb3[3];
    if (mutate) {
      this._rgb = [rgb3[0] * a, rgb3[1] * a, rgb3[2] * a, a];
      return this;
    } else {
      return new Color_default([rgb3[0] * a, rgb3[1] * a, rgb3[2] * a, a], "rgb");
    }
  };

  // ../../../../node_modules/chroma-js/src/io/lch/lch2lab.js
  var { sin, cos } = Math;
  var lch2lab = (...args) => {
    let [l, c, h] = unpack_default(args, "lch");
    if (isNaN(h))
      h = 0;
    h = h * DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
  };
  var lch2lab_default = lch2lab;

  // ../../../../node_modules/chroma-js/src/io/lch/lch2rgb.js
  var lch2rgb = (...args) => {
    args = unpack_default(args, "lch");
    const [l, c, h] = args;
    const [L, a, b_] = lch2lab_default(l, c, h);
    const [r, g, b] = lab2rgb_default(L, a, b_);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  var lch2rgb_default = lch2rgb;

  // ../../../../node_modules/chroma-js/src/io/lch/hcl2rgb.js
  var hcl2rgb = (...args) => {
    const hcl2 = reverse3(unpack_default(args, "hcl"));
    return lch2rgb_default(...hcl2);
  };
  var hcl2rgb_default = hcl2rgb;

  // ../../../../node_modules/chroma-js/src/io/lch/lab2lch.js
  var { sqrt, atan2, round: round2 } = Math;
  var lab2lch = (...args) => {
    const [l, a, b] = unpack_default(args, "lab");
    const c = sqrt(a * a + b * b);
    let h = (atan2(b, a) * RAD2DEG + 360) % 360;
    if (round2(c * 1e4) === 0)
      h = Number.NaN;
    return [l, c, h];
  };
  var lab2lch_default = lab2lch;

  // ../../../../node_modules/chroma-js/src/io/lch/rgb2lch.js
  var rgb2lch = (...args) => {
    const [r, g, b, ...rest] = unpack_default(args, "rgb");
    const [l, a, b_] = rgb2lab_default(r, g, b);
    const [L, c, h] = lab2lch_default(l, a, b_);
    return [L, c, h, ...rest.length > 0 && rest[0] < 1 ? [rest[0]] : []];
  };
  var rgb2lch_default = rgb2lch;

  // ../../../../node_modules/chroma-js/src/io/lch/index.js
  Color_default.prototype.lch = function() {
    return rgb2lch_default(this._rgb);
  };
  Color_default.prototype.hcl = function() {
    return reverse3(rgb2lch_default(this._rgb));
  };
  var lch = (...args) => new Color_default(...args, "lch");
  var hcl = (...args) => new Color_default(...args, "hcl");
  Object.assign(chroma_default, { lch, hcl });
  input_default.format.lch = lch2rgb_default;
  input_default.format.hcl = hcl2rgb_default;
  ["lch", "hcl"].forEach(
    (m) => input_default.autodetect.push({
      p: 2,
      test: (...args) => {
        args = unpack_default(args, m);
        if (type_default(args) === "array" && args.length === 3) {
          return m;
        }
      }
    })
  );

  // ../../../../node_modules/chroma-js/src/ops/saturate.js
  Color_default.prototype.saturate = function(amount = 1) {
    const me = this;
    const lch3 = me.lch();
    lch3[1] += lab_constants_default.Kn * amount;
    if (lch3[1] < 0)
      lch3[1] = 0;
    return new Color_default(lch3, "lch").alpha(me.alpha(), true);
  };
  Color_default.prototype.desaturate = function(amount = 1) {
    return this.saturate(-amount);
  };

  // ../../../../node_modules/chroma-js/src/ops/set.js
  Color_default.prototype.set = function(mc, value, mutate = false) {
    const [mode, channel] = mc.split(".");
    const src = this[mode]();
    if (channel) {
      const i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
      if (i > -1) {
        if (type_default(value) == "string") {
          switch (value.charAt(0)) {
            case "+":
              src[i] += +value;
              break;
            case "-":
              src[i] += +value;
              break;
            case "*":
              src[i] *= +value.substr(1);
              break;
            case "/":
              src[i] /= +value.substr(1);
              break;
            default:
              src[i] = +value;
          }
        } else if (type_default(value) === "number") {
          src[i] = value;
        } else {
          throw new Error(`unsupported value for Color.set`);
        }
        const out = new Color_default(src, mode);
        if (mutate) {
          this._rgb = out._rgb;
          return this;
        }
        return out;
      }
      throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
      return src;
    }
  };

  // ../../../../node_modules/chroma-js/src/ops/shade.js
  Color_default.prototype.tint = function(f = 0.5, ...rest) {
    return mix_default(this, "white", f, ...rest);
  };
  Color_default.prototype.shade = function(f = 0.5, ...rest) {
    return mix_default(this, "black", f, ...rest);
  };

  // ../../../../node_modules/chroma-js/src/interpolator/rgb.js
  var rgb = (col1, col2, f) => {
    const xyz0 = col1._rgb;
    const xyz1 = col2._rgb;
    return new Color_default(
      xyz0[0] + f * (xyz1[0] - xyz0[0]),
      xyz0[1] + f * (xyz1[1] - xyz0[1]),
      xyz0[2] + f * (xyz1[2] - xyz0[2]),
      "rgb"
    );
  };
  interpolator_default.rgb = rgb;

  // ../../../../node_modules/chroma-js/src/interpolator/lrgb.js
  var { sqrt: sqrt2, pow: pow2 } = Math;
  var lrgb = (col1, col2, f) => {
    const [x1, y1, z1] = col1._rgb;
    const [x2, y2, z2] = col2._rgb;
    return new Color_default(
      sqrt2(pow2(x1, 2) * (1 - f) + pow2(x2, 2) * f),
      sqrt2(pow2(y1, 2) * (1 - f) + pow2(y2, 2) * f),
      sqrt2(pow2(z1, 2) * (1 - f) + pow2(z2, 2) * f),
      "rgb"
    );
  };
  interpolator_default.lrgb = lrgb;

  // ../../../../node_modules/chroma-js/src/interpolator/lab.js
  var lab2 = (col1, col2, f) => {
    const xyz0 = col1.lab();
    const xyz1 = col2.lab();
    return new Color_default(
      xyz0[0] + f * (xyz1[0] - xyz0[0]),
      xyz0[1] + f * (xyz1[1] - xyz0[1]),
      xyz0[2] + f * (xyz1[2] - xyz0[2]),
      "lab"
    );
  };
  interpolator_default.lab = lab2;

  // ../../../../node_modules/chroma-js/src/interpolator/_hsx.js
  var hsx_default = (col1, col2, f, m) => {
    let xyz0, xyz1;
    if (m === "hsl") {
      xyz0 = col1.hsl();
      xyz1 = col2.hsl();
    } else if (m === "hsv") {
      xyz0 = col1.hsv();
      xyz1 = col2.hsv();
    } else if (m === "hcg") {
      xyz0 = col1.hcg();
      xyz1 = col2.hcg();
    } else if (m === "hsi") {
      xyz0 = col1.hsi();
      xyz1 = col2.hsi();
    } else if (m === "lch" || m === "hcl") {
      m = "hcl";
      xyz0 = col1.hcl();
      xyz1 = col2.hcl();
    } else if (m === "oklch") {
      xyz0 = col1.oklch().reverse();
      xyz1 = col2.oklch().reverse();
    }
    let hue0, hue1, sat0, sat1, lbv0, lbv1;
    if (m.substr(0, 1) === "h" || m === "oklch") {
      [hue0, sat0, lbv0] = xyz0;
      [hue1, sat1, lbv1] = xyz1;
    }
    let sat, hue, lbv, dh;
    if (!isNaN(hue0) && !isNaN(hue1)) {
      if (hue1 > hue0 && hue1 - hue0 > 180) {
        dh = hue1 - (hue0 + 360);
      } else if (hue1 < hue0 && hue0 - hue1 > 180) {
        dh = hue1 + 360 - hue0;
      } else {
        dh = hue1 - hue0;
      }
      hue = hue0 + f * dh;
    } else if (!isNaN(hue0)) {
      hue = hue0;
      if ((lbv1 == 1 || lbv1 == 0) && m != "hsv")
        sat = sat0;
    } else if (!isNaN(hue1)) {
      hue = hue1;
      if ((lbv0 == 1 || lbv0 == 0) && m != "hsv")
        sat = sat1;
    } else {
      hue = Number.NaN;
    }
    if (sat === void 0)
      sat = sat0 + f * (sat1 - sat0);
    lbv = lbv0 + f * (lbv1 - lbv0);
    return m === "oklch" ? new Color_default([lbv, sat, hue], m) : new Color_default([hue, sat, lbv], m);
  };

  // ../../../../node_modules/chroma-js/src/interpolator/lch.js
  var lch2 = (col1, col2, f) => {
    return hsx_default(col1, col2, f, "lch");
  };
  interpolator_default.lch = lch2;
  interpolator_default.hcl = lch2;

  // ../../../../node_modules/chroma-js/src/io/num/num2rgb.js
  var num2rgb = (num3) => {
    if (type_default(num3) == "number" && num3 >= 0 && num3 <= 16777215) {
      const r = num3 >> 16;
      const g = num3 >> 8 & 255;
      const b = num3 & 255;
      return [r, g, b, 1];
    }
    throw new Error("unknown num color: " + num3);
  };
  var num2rgb_default = num2rgb;

  // ../../../../node_modules/chroma-js/src/io/num/rgb2num.js
  var rgb2num = (...args) => {
    const [r, g, b] = unpack_default(args, "rgb");
    return (r << 16) + (g << 8) + b;
  };
  var rgb2num_default = rgb2num;

  // ../../../../node_modules/chroma-js/src/io/num/index.js
  Color_default.prototype.num = function() {
    return rgb2num_default(this._rgb);
  };
  var num = (...args) => new Color_default(...args, "num");
  Object.assign(chroma_default, { num });
  input_default.format.num = num2rgb_default;
  input_default.autodetect.push({
    p: 5,
    test: (...args) => {
      if (args.length === 1 && type_default(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
        return "num";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/interpolator/num.js
  var num2 = (col1, col2, f) => {
    const c1 = col1.num();
    const c2 = col2.num();
    return new Color_default(c1 + f * (c2 - c1), "num");
  };
  interpolator_default.num = num2;

  // ../../../../node_modules/chroma-js/src/io/hcg/hcg2rgb.js
  var { floor } = Math;
  var hcg2rgb = (...args) => {
    args = unpack_default(args, "hcg");
    let [h, c, _g] = args;
    let r, g, b;
    _g = _g * 255;
    const _c = c * 255;
    if (c === 0) {
      r = g = b = _g;
    } else {
      if (h === 360)
        h = 0;
      if (h > 360)
        h -= 360;
      if (h < 0)
        h += 360;
      h /= 60;
      const i = floor(h);
      const f = h - i;
      const p = _g * (1 - c);
      const q = p + _c * (1 - f);
      const t = p + _c * f;
      const v = p + _c;
      switch (i) {
        case 0:
          [r, g, b] = [v, t, p];
          break;
        case 1:
          [r, g, b] = [q, v, p];
          break;
        case 2:
          [r, g, b] = [p, v, t];
          break;
        case 3:
          [r, g, b] = [p, q, v];
          break;
        case 4:
          [r, g, b] = [t, p, v];
          break;
        case 5:
          [r, g, b] = [v, p, q];
          break;
      }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  var hcg2rgb_default = hcg2rgb;

  // ../../../../node_modules/chroma-js/src/io/hcg/rgb2hcg.js
  var rgb2hcg = (...args) => {
    const [r, g, b] = unpack_default(args, "rgb");
    const minRgb = min2(r, g, b);
    const maxRgb = max2(r, g, b);
    const delta = maxRgb - minRgb;
    const c = delta * 100 / 255;
    const _g = minRgb / (255 - delta) * 100;
    let h;
    if (delta === 0) {
      h = Number.NaN;
    } else {
      if (r === maxRgb)
        h = (g - b) / delta;
      if (g === maxRgb)
        h = 2 + (b - r) / delta;
      if (b === maxRgb)
        h = 4 + (r - g) / delta;
      h *= 60;
      if (h < 0)
        h += 360;
    }
    return [h, c, _g];
  };
  var rgb2hcg_default = rgb2hcg;

  // ../../../../node_modules/chroma-js/src/io/hcg/index.js
  Color_default.prototype.hcg = function() {
    return rgb2hcg_default(this._rgb);
  };
  var hcg = (...args) => new Color_default(...args, "hcg");
  chroma_default.hcg = hcg;
  input_default.format.hcg = hcg2rgb_default;
  input_default.autodetect.push({
    p: 1,
    test: (...args) => {
      args = unpack_default(args, "hcg");
      if (type_default(args) === "array" && args.length === 3) {
        return "hcg";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/interpolator/hcg.js
  var hcg2 = (col1, col2, f) => {
    return hsx_default(col1, col2, f, "hcg");
  };
  interpolator_default.hcg = hcg2;

  // ../../../../node_modules/chroma-js/src/io/hsi/hsi2rgb.js
  var { cos: cos2 } = Math;
  var hsi2rgb = (...args) => {
    args = unpack_default(args, "hsi");
    let [h, s, i] = args;
    let r, g, b;
    if (isNaN(h))
      h = 0;
    if (isNaN(s))
      s = 0;
    if (h > 360)
      h -= 360;
    if (h < 0)
      h += 360;
    h /= 360;
    if (h < 1 / 3) {
      b = (1 - s) / 3;
      r = (1 + s * cos2(TWOPI * h) / cos2(PITHIRD - TWOPI * h)) / 3;
      g = 1 - (b + r);
    } else if (h < 2 / 3) {
      h -= 1 / 3;
      r = (1 - s) / 3;
      g = (1 + s * cos2(TWOPI * h) / cos2(PITHIRD - TWOPI * h)) / 3;
      b = 1 - (r + g);
    } else {
      h -= 2 / 3;
      g = (1 - s) / 3;
      b = (1 + s * cos2(TWOPI * h) / cos2(PITHIRD - TWOPI * h)) / 3;
      r = 1 - (g + b);
    }
    r = limit_default(i * r * 3);
    g = limit_default(i * g * 3);
    b = limit_default(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
  };
  var hsi2rgb_default = hsi2rgb;

  // ../../../../node_modules/chroma-js/src/io/hsi/rgb2hsi.js
  var { min: min3, sqrt: sqrt3, acos } = Math;
  var rgb2hsi = (...args) => {
    let [r, g, b] = unpack_default(args, "rgb");
    r /= 255;
    g /= 255;
    b /= 255;
    let h;
    const min_ = min3(r, g, b);
    const i = (r + g + b) / 3;
    const s = i > 0 ? 1 - min_ / i : 0;
    if (s === 0) {
      h = NaN;
    } else {
      h = (r - g + (r - b)) / 2;
      h /= sqrt3((r - g) * (r - g) + (r - b) * (g - b));
      h = acos(h);
      if (b > g) {
        h = TWOPI - h;
      }
      h /= TWOPI;
    }
    return [h * 360, s, i];
  };
  var rgb2hsi_default = rgb2hsi;

  // ../../../../node_modules/chroma-js/src/io/hsi/index.js
  Color_default.prototype.hsi = function() {
    return rgb2hsi_default(this._rgb);
  };
  var hsi = (...args) => new Color_default(...args, "hsi");
  chroma_default.hsi = hsi;
  input_default.format.hsi = hsi2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "hsi");
      if (type_default(args) === "array" && args.length === 3) {
        return "hsi";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/interpolator/hsi.js
  var hsi2 = (col1, col2, f) => {
    return hsx_default(col1, col2, f, "hsi");
  };
  interpolator_default.hsi = hsi2;

  // ../../../../node_modules/chroma-js/src/io/hsl/hsl2rgb.js
  var hsl2rgb = (...args) => {
    args = unpack_default(args, "hsl");
    const [h, s, l] = args;
    let r, g, b;
    if (s === 0) {
      r = g = b = l * 255;
    } else {
      const t3 = [0, 0, 0];
      const c = [0, 0, 0];
      const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const t1 = 2 * l - t2;
      const h_ = h / 360;
      t3[0] = h_ + 1 / 3;
      t3[1] = h_;
      t3[2] = h_ - 1 / 3;
      for (let i = 0; i < 3; i++) {
        if (t3[i] < 0)
          t3[i] += 1;
        if (t3[i] > 1)
          t3[i] -= 1;
        if (6 * t3[i] < 1)
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        else if (2 * t3[i] < 1)
          c[i] = t2;
        else if (3 * t3[i] < 2)
          c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
        else
          c[i] = t1;
      }
      [r, g, b] = [c[0] * 255, c[1] * 255, c[2] * 255];
    }
    if (args.length > 3) {
      return [r, g, b, args[3]];
    }
    return [r, g, b, 1];
  };
  var hsl2rgb_default = hsl2rgb;

  // ../../../../node_modules/chroma-js/src/io/hsl/rgb2hsl.js
  var rgb2hsl = (...args) => {
    args = unpack_default(args, "rgba");
    let [r, g, b] = args;
    r /= 255;
    g /= 255;
    b /= 255;
    const minRgb = min2(r, g, b);
    const maxRgb = max2(r, g, b);
    const l = (maxRgb + minRgb) / 2;
    let s, h;
    if (maxRgb === minRgb) {
      s = 0;
      h = Number.NaN;
    } else {
      s = l < 0.5 ? (maxRgb - minRgb) / (maxRgb + minRgb) : (maxRgb - minRgb) / (2 - maxRgb - minRgb);
    }
    if (r == maxRgb)
      h = (g - b) / (maxRgb - minRgb);
    else if (g == maxRgb)
      h = 2 + (b - r) / (maxRgb - minRgb);
    else if (b == maxRgb)
      h = 4 + (r - g) / (maxRgb - minRgb);
    h *= 60;
    if (h < 0)
      h += 360;
    if (args.length > 3 && args[3] !== void 0)
      return [h, s, l, args[3]];
    return [h, s, l];
  };
  var rgb2hsl_default = rgb2hsl;

  // ../../../../node_modules/chroma-js/src/io/hsl/index.js
  Color_default.prototype.hsl = function() {
    return rgb2hsl_default(this._rgb);
  };
  var hsl = (...args) => new Color_default(...args, "hsl");
  chroma_default.hsl = hsl;
  input_default.format.hsl = hsl2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "hsl");
      if (type_default(args) === "array" && args.length === 3) {
        return "hsl";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/interpolator/hsl.js
  var hsl2 = (col1, col2, f) => {
    return hsx_default(col1, col2, f, "hsl");
  };
  interpolator_default.hsl = hsl2;

  // ../../../../node_modules/chroma-js/src/io/hsv/hsv2rgb.js
  var { floor: floor2 } = Math;
  var hsv2rgb = (...args) => {
    args = unpack_default(args, "hsv");
    let [h, s, v] = args;
    let r, g, b;
    v *= 255;
    if (s === 0) {
      r = g = b = v;
    } else {
      if (h === 360)
        h = 0;
      if (h > 360)
        h -= 360;
      if (h < 0)
        h += 360;
      h /= 60;
      const i = floor2(h);
      const f = h - i;
      const p = v * (1 - s);
      const q = v * (1 - s * f);
      const t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          [r, g, b] = [v, t, p];
          break;
        case 1:
          [r, g, b] = [q, v, p];
          break;
        case 2:
          [r, g, b] = [p, v, t];
          break;
        case 3:
          [r, g, b] = [p, q, v];
          break;
        case 4:
          [r, g, b] = [t, p, v];
          break;
        case 5:
          [r, g, b] = [v, p, q];
          break;
      }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };
  var hsv2rgb_default = hsv2rgb;

  // ../../../../node_modules/chroma-js/src/io/hsv/rgb2hsv.js
  var { min: min4, max: max3 } = Math;
  var rgb2hsl2 = (...args) => {
    args = unpack_default(args, "rgb");
    let [r, g, b] = args;
    const min_ = min4(r, g, b);
    const max_ = max3(r, g, b);
    const delta = max_ - min_;
    let h, s, v;
    v = max_ / 255;
    if (max_ === 0) {
      h = Number.NaN;
      s = 0;
    } else {
      s = delta / max_;
      if (r === max_)
        h = (g - b) / delta;
      if (g === max_)
        h = 2 + (b - r) / delta;
      if (b === max_)
        h = 4 + (r - g) / delta;
      h *= 60;
      if (h < 0)
        h += 360;
    }
    return [h, s, v];
  };
  var rgb2hsv_default = rgb2hsl2;

  // ../../../../node_modules/chroma-js/src/io/hsv/index.js
  Color_default.prototype.hsv = function() {
    return rgb2hsv_default(this._rgb);
  };
  var hsv = (...args) => new Color_default(...args, "hsv");
  chroma_default.hsv = hsv;
  input_default.format.hsv = hsv2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "hsv");
      if (type_default(args) === "array" && args.length === 3) {
        return "hsv";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/interpolator/hsv.js
  var hsv2 = (col1, col2, f) => {
    return hsx_default(col1, col2, f, "hsv");
  };
  interpolator_default.hsv = hsv2;

  // ../../../../node_modules/chroma-js/src/utils/multiply-matrices.js
  function multiplyMatrices(A, B) {
    let m = A.length;
    if (!Array.isArray(A[0])) {
      A = [A];
    }
    if (!Array.isArray(B[0])) {
      B = B.map((x) => [x]);
    }
    let p = B[0].length;
    let B_cols = B[0].map((_, i) => B.map((x) => x[i]));
    let product = A.map(
      (row) => B_cols.map((col) => {
        if (!Array.isArray(row)) {
          return col.reduce((a, c) => a + c * row, 0);
        }
        return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
      })
    );
    if (m === 1) {
      product = product[0];
    }
    if (p === 1) {
      return product.map((x) => x[0]);
    }
    return product;
  }

  // ../../../../node_modules/chroma-js/src/io/oklab/oklab2rgb.js
  var oklab2rgb = (...args) => {
    args = unpack_default(args, "lab");
    const [L, a, b, ...rest] = args;
    const [X, Y, Z] = OKLab_to_XYZ([L, a, b]);
    const [r, g, b_] = xyz2rgb(X, Y, Z);
    return [r, g, b_, ...rest.length > 0 && rest[0] < 1 ? [rest[0]] : []];
  };
  function OKLab_to_XYZ(OKLab) {
    var LMStoXYZ = [
      [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
      [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
      [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
    ];
    var OKLabtoLMS = [
      [1, 0.3963377773761749, 0.2158037573099136],
      [1, -0.1055613458156586, -0.0638541728258133],
      [1, -0.0894841775298119, -1.2914855480194092]
    ];
    var LMSnl = multiplyMatrices(OKLabtoLMS, OKLab);
    return multiplyMatrices(
      LMStoXYZ,
      LMSnl.map((c) => c ** 3)
    );
  }
  var oklab2rgb_default = oklab2rgb;

  // ../../../../node_modules/chroma-js/src/io/oklab/rgb2oklab.js
  var rgb2oklab = (...args) => {
    const [r, g, b, ...rest] = unpack_default(args, "rgb");
    const xyz = rgb2xyz(r, g, b);
    const oklab3 = XYZ_to_OKLab(xyz);
    return [...oklab3, ...rest.length > 0 && rest[0] < 1 ? [rest[0]] : []];
  };
  function XYZ_to_OKLab(XYZ) {
    const XYZtoLMS = [
      [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
      [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
      [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
    ];
    const LMStoOKLab = [
      [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
      [1.9779985324311684, -2.42859224204858, 0.450593709617411],
      [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
    ];
    const LMS = multiplyMatrices(XYZtoLMS, XYZ);
    return multiplyMatrices(
      LMStoOKLab,
      LMS.map((c) => Math.cbrt(c))
    );
  }
  var rgb2oklab_default = rgb2oklab;

  // ../../../../node_modules/chroma-js/src/io/oklab/index.js
  Color_default.prototype.oklab = function() {
    return rgb2oklab_default(this._rgb);
  };
  var oklab = (...args) => new Color_default(...args, "oklab");
  Object.assign(chroma_default, { oklab });
  input_default.format.oklab = oklab2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "oklab");
      if (type_default(args) === "array" && args.length === 3) {
        return "oklab";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/interpolator/oklab.js
  var oklab2 = (col1, col2, f) => {
    const xyz0 = col1.oklab();
    const xyz1 = col2.oklab();
    return new Color_default(
      xyz0[0] + f * (xyz1[0] - xyz0[0]),
      xyz0[1] + f * (xyz1[1] - xyz0[1]),
      xyz0[2] + f * (xyz1[2] - xyz0[2]),
      "oklab"
    );
  };
  interpolator_default.oklab = oklab2;

  // ../../../../node_modules/chroma-js/src/interpolator/oklch.js
  var oklch = (col1, col2, f) => {
    return hsx_default(col1, col2, f, "oklch");
  };
  interpolator_default.oklch = oklch;

  // ../../../../node_modules/chroma-js/src/generator/average.js
  var { pow: pow3, sqrt: sqrt4, PI: PI2, cos: cos3, sin: sin2, atan2: atan22 } = Math;
  var average_default = (colors, mode = "lrgb", weights = null) => {
    const l = colors.length;
    if (!weights)
      weights = Array.from(new Array(l)).map(() => 1);
    const k = l / weights.reduce(function(a, b) {
      return a + b;
    });
    weights.forEach((w, i) => {
      weights[i] *= k;
    });
    colors = colors.map((c) => new Color_default(c));
    if (mode === "lrgb") {
      return _average_lrgb(colors, weights);
    }
    const first = colors.shift();
    const xyz = first.get(mode);
    const cnt = [];
    let dx = 0;
    let dy = 0;
    for (let i = 0; i < xyz.length; i++) {
      xyz[i] = (xyz[i] || 0) * weights[0];
      cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
      if (mode.charAt(i) === "h" && !isNaN(xyz[i])) {
        const A = xyz[i] / 180 * PI2;
        dx += cos3(A) * weights[0];
        dy += sin2(A) * weights[0];
      }
    }
    let alpha = first.alpha() * weights[0];
    colors.forEach((c, ci) => {
      const xyz2 = c.get(mode);
      alpha += c.alpha() * weights[ci + 1];
      for (let i = 0; i < xyz.length; i++) {
        if (!isNaN(xyz2[i])) {
          cnt[i] += weights[ci + 1];
          if (mode.charAt(i) === "h") {
            const A = xyz2[i] / 180 * PI2;
            dx += cos3(A) * weights[ci + 1];
            dy += sin2(A) * weights[ci + 1];
          } else {
            xyz[i] += xyz2[i] * weights[ci + 1];
          }
        }
      }
    });
    for (let i = 0; i < xyz.length; i++) {
      if (mode.charAt(i) === "h") {
        let A = atan22(dy / cnt[i], dx / cnt[i]) / PI2 * 180;
        while (A < 0)
          A += 360;
        while (A >= 360)
          A -= 360;
        xyz[i] = A;
      } else {
        xyz[i] = xyz[i] / cnt[i];
      }
    }
    alpha /= l;
    return new Color_default(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
  };
  var _average_lrgb = (colors, weights) => {
    const l = colors.length;
    const xyz = [0, 0, 0, 0];
    for (let i = 0; i < colors.length; i++) {
      const col = colors[i];
      const f = weights[i] / l;
      const rgb3 = col._rgb;
      xyz[0] += pow3(rgb3[0], 2) * f;
      xyz[1] += pow3(rgb3[1], 2) * f;
      xyz[2] += pow3(rgb3[2], 2) * f;
      xyz[3] += rgb3[3] * f;
    }
    xyz[0] = sqrt4(xyz[0]);
    xyz[1] = sqrt4(xyz[1]);
    xyz[2] = sqrt4(xyz[2]);
    if (xyz[3] > 0.9999999)
      xyz[3] = 1;
    return new Color_default(clip_rgb_default(xyz));
  };

  // ../../../../node_modules/chroma-js/src/generator/scale.js
  var { pow: pow4 } = Math;
  function scale_default(colors) {
    let _mode = "rgb";
    let _nacol = chroma_default("#ccc");
    let _spread = 0;
    let _domain = [0, 1];
    let _pos = [];
    let _padding = [0, 0];
    let _classes = false;
    let _colors = [];
    let _out = false;
    let _min = 0;
    let _max = 1;
    let _correctLightness = false;
    let _colorCache = {};
    let _useCache = true;
    let _gamma = 1;
    const setColors = function(colors2) {
      colors2 = colors2 || ["#fff", "#000"];
      if (colors2 && type_default(colors2) === "string" && chroma_default.brewer && chroma_default.brewer[colors2.toLowerCase()]) {
        colors2 = chroma_default.brewer[colors2.toLowerCase()];
      }
      if (type_default(colors2) === "array") {
        if (colors2.length === 1) {
          colors2 = [colors2[0], colors2[0]];
        }
        colors2 = colors2.slice(0);
        for (let c = 0; c < colors2.length; c++) {
          colors2[c] = chroma_default(colors2[c]);
        }
        _pos.length = 0;
        for (let c = 0; c < colors2.length; c++) {
          _pos.push(c / (colors2.length - 1));
        }
      }
      resetCache();
      return _colors = colors2;
    };
    const getClass = function(value) {
      if (_classes != null) {
        const n = _classes.length - 1;
        let i = 0;
        while (i < n && value >= _classes[i]) {
          i++;
        }
        return i - 1;
      }
      return 0;
    };
    let tMapLightness = (t) => t;
    let tMapDomain = (t) => t;
    const getColor = function(val, bypassMap) {
      let col, t;
      if (bypassMap == null) {
        bypassMap = false;
      }
      if (isNaN(val) || val === null) {
        return _nacol;
      }
      if (!bypassMap) {
        if (_classes && _classes.length > 2) {
          const c = getClass(val);
          t = c / (_classes.length - 2);
        } else if (_max !== _min) {
          t = (val - _min) / (_max - _min);
        } else {
          t = 1;
        }
      } else {
        t = val;
      }
      t = tMapDomain(t);
      if (!bypassMap) {
        t = tMapLightness(t);
      }
      if (_gamma !== 1) {
        t = pow4(t, _gamma);
      }
      t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
      t = limit_default(t, 0, 1);
      const k = Math.floor(t * 1e4);
      if (_useCache && _colorCache[k]) {
        col = _colorCache[k];
      } else {
        if (type_default(_colors) === "array") {
          for (let i = 0; i < _pos.length; i++) {
            const p = _pos[i];
            if (t <= p) {
              col = _colors[i];
              break;
            }
            if (t >= p && i === _pos.length - 1) {
              col = _colors[i];
              break;
            }
            if (t > p && t < _pos[i + 1]) {
              t = (t - p) / (_pos[i + 1] - p);
              col = chroma_default.interpolate(
                _colors[i],
                _colors[i + 1],
                t,
                _mode
              );
              break;
            }
          }
        } else if (type_default(_colors) === "function") {
          col = _colors(t);
        }
        if (_useCache) {
          _colorCache[k] = col;
        }
      }
      return col;
    };
    var resetCache = () => _colorCache = {};
    setColors(colors);
    const f = function(v) {
      const c = chroma_default(getColor(v));
      if (_out && c[_out]) {
        return c[_out]();
      } else {
        return c;
      }
    };
    f.classes = function(classes) {
      if (classes != null) {
        if (type_default(classes) === "array") {
          _classes = classes;
          _domain = [classes[0], classes[classes.length - 1]];
        } else {
          const d = chroma_default.analyze(_domain);
          if (classes === 0) {
            _classes = [d.min, d.max];
          } else {
            _classes = chroma_default.limits(d, "e", classes);
          }
        }
        return f;
      }
      return _classes;
    };
    f.domain = function(domain) {
      if (!arguments.length) {
        return _domain;
      }
      _min = domain[0];
      _max = domain[domain.length - 1];
      _pos = [];
      const k = _colors.length;
      if (domain.length === k && _min !== _max) {
        for (let d of Array.from(domain)) {
          _pos.push((d - _min) / (_max - _min));
        }
      } else {
        for (let c = 0; c < k; c++) {
          _pos.push(c / (k - 1));
        }
        if (domain.length > 2) {
          const tOut = domain.map((d, i) => i / (domain.length - 1));
          const tBreaks = domain.map((d) => (d - _min) / (_max - _min));
          if (!tBreaks.every((val, i) => tOut[i] === val)) {
            tMapDomain = (t) => {
              if (t <= 0 || t >= 1)
                return t;
              let i = 0;
              while (t >= tBreaks[i + 1])
                i++;
              const f2 = (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
              const out = tOut[i] + f2 * (tOut[i + 1] - tOut[i]);
              return out;
            };
          }
        }
      }
      _domain = [_min, _max];
      return f;
    };
    f.mode = function(_m) {
      if (!arguments.length) {
        return _mode;
      }
      _mode = _m;
      resetCache();
      return f;
    };
    f.range = function(colors2, _pos2) {
      setColors(colors2, _pos2);
      return f;
    };
    f.out = function(_o) {
      _out = _o;
      return f;
    };
    f.spread = function(val) {
      if (!arguments.length) {
        return _spread;
      }
      _spread = val;
      return f;
    };
    f.correctLightness = function(v) {
      if (v == null) {
        v = true;
      }
      _correctLightness = v;
      resetCache();
      if (_correctLightness) {
        tMapLightness = function(t) {
          const L0 = getColor(0, true).lab()[0];
          const L1 = getColor(1, true).lab()[0];
          const pol = L0 > L1;
          let L_actual = getColor(t, true).lab()[0];
          const L_ideal = L0 + (L1 - L0) * t;
          let L_diff = L_actual - L_ideal;
          let t0 = 0;
          let t1 = 1;
          let max_iter = 20;
          while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
            (function() {
              if (pol) {
                L_diff *= -1;
              }
              if (L_diff < 0) {
                t0 = t;
                t += (t1 - t) * 0.5;
              } else {
                t1 = t;
                t += (t0 - t) * 0.5;
              }
              L_actual = getColor(t, true).lab()[0];
              return L_diff = L_actual - L_ideal;
            })();
          }
          return t;
        };
      } else {
        tMapLightness = (t) => t;
      }
      return f;
    };
    f.padding = function(p) {
      if (p != null) {
        if (type_default(p) === "number") {
          p = [p, p];
        }
        _padding = p;
        return f;
      } else {
        return _padding;
      }
    };
    f.colors = function(numColors, out) {
      if (arguments.length < 2) {
        out = "hex";
      }
      let result = [];
      if (arguments.length === 0) {
        result = _colors.slice(0);
      } else if (numColors === 1) {
        result = [f(0.5)];
      } else if (numColors > 1) {
        const dm = _domain[0];
        const dd = _domain[1] - dm;
        result = __range__(0, numColors, false).map(
          (i) => f(dm + i / (numColors - 1) * dd)
        );
      } else {
        colors = [];
        let samples = [];
        if (_classes && _classes.length > 2) {
          for (let i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            samples.push((_classes[i - 1] + _classes[i]) * 0.5);
          }
        } else {
          samples = _domain;
        }
        result = samples.map((v) => f(v));
      }
      if (chroma_default[out]) {
        result = result.map((c) => c[out]());
      }
      return result;
    };
    f.cache = function(c) {
      if (c != null) {
        _useCache = c;
        return f;
      } else {
        return _useCache;
      }
    };
    f.gamma = function(g) {
      if (g != null) {
        _gamma = g;
        return f;
      } else {
        return _gamma;
      }
    };
    f.nodata = function(d) {
      if (d != null) {
        _nacol = chroma_default(d);
        return f;
      } else {
        return _nacol;
      }
    };
    return f;
  }
  function __range__(left, right, inclusive) {
    let range = [];
    let ascending = left < right;
    let end = !inclusive ? right : ascending ? right + 1 : right - 1;
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
      range.push(i);
    }
    return range;
  }

  // ../../../../node_modules/chroma-js/src/generator/bezier.js
  var binom_row = function(n) {
    let row = [1, 1];
    for (let i = 1; i < n; i++) {
      let newrow = [1];
      for (let j = 1; j <= row.length; j++) {
        newrow[j] = (row[j] || 0) + row[j - 1];
      }
      row = newrow;
    }
    return row;
  };
  var bezier = function(colors) {
    let I, lab0, lab1, lab22;
    colors = colors.map((c) => new Color_default(c));
    if (colors.length === 2) {
      [lab0, lab1] = colors.map((c) => c.lab());
      I = function(t) {
        const lab3 = [0, 1, 2].map((i) => lab0[i] + t * (lab1[i] - lab0[i]));
        return new Color_default(lab3, "lab");
      };
    } else if (colors.length === 3) {
      [lab0, lab1, lab22] = colors.map((c) => c.lab());
      I = function(t) {
        const lab3 = [0, 1, 2].map(
          (i) => (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab22[i]
        );
        return new Color_default(lab3, "lab");
      };
    } else if (colors.length === 4) {
      let lab3;
      [lab0, lab1, lab22, lab3] = colors.map((c) => c.lab());
      I = function(t) {
        const lab4 = [0, 1, 2].map(
          (i) => (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab22[i] + t * t * t * lab3[i]
        );
        return new Color_default(lab4, "lab");
      };
    } else if (colors.length >= 5) {
      let labs, row, n;
      labs = colors.map((c) => c.lab());
      n = colors.length - 1;
      row = binom_row(n);
      I = function(t) {
        const u = 1 - t;
        const lab3 = [0, 1, 2].map(
          (i) => labs.reduce(
            (sum, el, j) => sum + row[j] * u ** (n - j) * t ** j * el[i],
            0
          )
        );
        return new Color_default(lab3, "lab");
      };
    } else {
      throw new RangeError("No point in running bezier with only one color.");
    }
    return I;
  };
  var bezier_default = (colors) => {
    const f = bezier(colors);
    f.scale = () => scale_default(f);
    return f;
  };

  // ../../../../node_modules/chroma-js/src/io/rgb/index.js
  var { round: round3 } = Math;
  Color_default.prototype.rgb = function(rnd = true) {
    if (rnd === false)
      return this._rgb.slice(0, 3);
    return this._rgb.slice(0, 3).map(round3);
  };
  Color_default.prototype.rgba = function(rnd = true) {
    return this._rgb.slice(0, 4).map((v, i) => {
      return i < 3 ? rnd === false ? v : round3(v) : v;
    });
  };
  var rgb2 = (...args) => new Color_default(...args, "rgb");
  Object.assign(chroma_default, { rgb: rgb2 });
  input_default.format.rgb = (...args) => {
    const rgba = unpack_default(args, "rgba");
    if (rgba[3] === void 0)
      rgba[3] = 1;
    return rgba;
  };
  input_default.autodetect.push({
    p: 3,
    test: (...args) => {
      args = unpack_default(args, "rgba");
      if (type_default(args) === "array" && (args.length === 3 || args.length === 4 && type_default(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
        return "rgb";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/generator/blend.js
  var blend = (bottom, top, mode) => {
    if (!blend[mode]) {
      throw new Error("unknown blend mode " + mode);
    }
    return blend[mode](bottom, top);
  };
  var blend_f = (f) => (bottom, top) => {
    const c0 = chroma_default(top).rgb();
    const c1 = chroma_default(bottom).rgb();
    return chroma_default.rgb(f(c0, c1));
  };
  var each = (f) => (c0, c1) => {
    const out = [];
    out[0] = f(c0[0], c1[0]);
    out[1] = f(c0[1], c1[1]);
    out[2] = f(c0[2], c1[2]);
    return out;
  };
  var normal = (a) => a;
  var multiply = (a, b) => a * b / 255;
  var darken = (a, b) => a > b ? b : a;
  var lighten = (a, b) => a > b ? a : b;
  var screen = (a, b) => 255 * (1 - (1 - a / 255) * (1 - b / 255));
  var overlay = (a, b) => b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
  var burn = (a, b) => 255 * (1 - (1 - b / 255) / (a / 255));
  var dodge = (a, b) => {
    if (a === 255)
      return 255;
    a = 255 * (b / 255) / (1 - a / 255);
    return a > 255 ? 255 : a;
  };
  blend.normal = blend_f(each(normal));
  blend.multiply = blend_f(each(multiply));
  blend.screen = blend_f(each(screen));
  blend.overlay = blend_f(each(overlay));
  blend.darken = blend_f(each(darken));
  blend.lighten = blend_f(each(lighten));
  blend.dodge = blend_f(each(dodge));
  blend.burn = blend_f(each(burn));
  var blend_default = blend;

  // ../../../../node_modules/chroma-js/src/generator/cubehelix.js
  var { pow: pow5, sin: sin3, cos: cos4 } = Math;
  function cubehelix_default(start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0, 1]) {
    let dh = 0, dl;
    if (type_default(lightness) === "array") {
      dl = lightness[1] - lightness[0];
    } else {
      dl = 0;
      lightness = [lightness, lightness];
    }
    const f = function(fract) {
      const a = TWOPI * ((start + 120) / 360 + rotations * fract);
      const l = pow5(lightness[0] + dl * fract, gamma);
      const h = dh !== 0 ? hue[0] + fract * dh : hue;
      const amp = h * l * (1 - l) / 2;
      const cos_a = cos4(a);
      const sin_a = sin3(a);
      const r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
      const g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
      const b = l + amp * (1.97294 * cos_a);
      return chroma_default(clip_rgb_default([r * 255, g * 255, b * 255, 1]));
    };
    f.start = function(s) {
      if (s == null) {
        return start;
      }
      start = s;
      return f;
    };
    f.rotations = function(r) {
      if (r == null) {
        return rotations;
      }
      rotations = r;
      return f;
    };
    f.gamma = function(g) {
      if (g == null) {
        return gamma;
      }
      gamma = g;
      return f;
    };
    f.hue = function(h) {
      if (h == null) {
        return hue;
      }
      hue = h;
      if (type_default(hue) === "array") {
        dh = hue[1] - hue[0];
        if (dh === 0) {
          hue = hue[1];
        }
      } else {
        dh = 0;
      }
      return f;
    };
    f.lightness = function(h) {
      if (h == null) {
        return lightness;
      }
      if (type_default(h) === "array") {
        lightness = h;
        dl = h[1] - h[0];
      } else {
        lightness = [h, h];
        dl = 0;
      }
      return f;
    };
    f.scale = () => chroma_default.scale(f);
    f.hue(hue);
    return f;
  }

  // ../../../../node_modules/chroma-js/src/generator/random.js
  var digits = "0123456789abcdef";
  var { floor: floor3, random: random3 } = Math;
  var random_default = () => {
    let code = "#";
    for (let i = 0; i < 6; i++) {
      code += digits.charAt(floor3(random3() * 16));
    }
    return new Color_default(code, "hex");
  };

  // ../../../../node_modules/chroma-js/src/utils/analyze.js
  var { log, pow: pow6, floor: floor4, abs } = Math;
  function analyze(data, key = null) {
    const r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    if (type_default(data) === "object") {
      data = Object.values(data);
    }
    data.forEach((val) => {
      if (key && type_default(val) === "object")
        val = val[key];
      if (val !== void 0 && val !== null && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min)
          r.min = val;
        if (val > r.max)
          r.max = val;
        r.count += 1;
      }
    });
    r.domain = [r.min, r.max];
    r.limits = (mode, num3) => limits(r, mode, num3);
    return r;
  }
  function limits(data, mode = "equal", num3 = 7) {
    if (type_default(data) == "array") {
      data = analyze(data);
    }
    const { min: min6, max: max6 } = data;
    const values = data.values.sort((a, b) => a - b);
    if (num3 === 1) {
      return [min6, max6];
    }
    const limits2 = [];
    if (mode.substr(0, 1) === "c") {
      limits2.push(min6);
      limits2.push(max6);
    }
    if (mode.substr(0, 1) === "e") {
      limits2.push(min6);
      for (let i = 1; i < num3; i++) {
        limits2.push(min6 + i / num3 * (max6 - min6));
      }
      limits2.push(max6);
    } else if (mode.substr(0, 1) === "l") {
      if (min6 <= 0) {
        throw new Error(
          "Logarithmic scales are only possible for values > 0"
        );
      }
      const min_log = Math.LOG10E * log(min6);
      const max_log = Math.LOG10E * log(max6);
      limits2.push(min6);
      for (let i = 1; i < num3; i++) {
        limits2.push(pow6(10, min_log + i / num3 * (max_log - min_log)));
      }
      limits2.push(max6);
    } else if (mode.substr(0, 1) === "q") {
      limits2.push(min6);
      for (let i = 1; i < num3; i++) {
        const p = (values.length - 1) * i / num3;
        const pb = floor4(p);
        if (pb === p) {
          limits2.push(values[pb]);
        } else {
          const pr = p - pb;
          limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
        }
      }
      limits2.push(max6);
    } else if (mode.substr(0, 1) === "k") {
      let cluster;
      const n = values.length;
      const assignments = new Array(n);
      const clusterSizes = new Array(num3);
      let repeat = true;
      let nb_iters = 0;
      let centroids = null;
      centroids = [];
      centroids.push(min6);
      for (let i = 1; i < num3; i++) {
        centroids.push(min6 + i / num3 * (max6 - min6));
      }
      centroids.push(max6);
      while (repeat) {
        for (let j = 0; j < num3; j++) {
          clusterSizes[j] = 0;
        }
        for (let i = 0; i < n; i++) {
          const value = values[i];
          let mindist = Number.MAX_VALUE;
          let best;
          for (let j = 0; j < num3; j++) {
            const dist = abs(centroids[j] - value);
            if (dist < mindist) {
              mindist = dist;
              best = j;
            }
            clusterSizes[best]++;
            assignments[i] = best;
          }
        }
        const newCentroids = new Array(num3);
        for (let j = 0; j < num3; j++) {
          newCentroids[j] = null;
        }
        for (let i = 0; i < n; i++) {
          cluster = assignments[i];
          if (newCentroids[cluster] === null) {
            newCentroids[cluster] = values[i];
          } else {
            newCentroids[cluster] += values[i];
          }
        }
        for (let j = 0; j < num3; j++) {
          newCentroids[j] *= 1 / clusterSizes[j];
        }
        repeat = false;
        for (let j = 0; j < num3; j++) {
          if (newCentroids[j] !== centroids[j]) {
            repeat = true;
            break;
          }
        }
        centroids = newCentroids;
        nb_iters++;
        if (nb_iters > 200) {
          repeat = false;
        }
      }
      const kClusters = {};
      for (let j = 0; j < num3; j++) {
        kClusters[j] = [];
      }
      for (let i = 0; i < n; i++) {
        cluster = assignments[i];
        kClusters[cluster].push(values[i]);
      }
      let tmpKMeansBreaks = [];
      for (let j = 0; j < num3; j++) {
        tmpKMeansBreaks.push(kClusters[j][0]);
        tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
      }
      tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
      limits2.push(tmpKMeansBreaks[0]);
      for (let i = 1; i < tmpKMeansBreaks.length; i += 2) {
        const v = tmpKMeansBreaks[i];
        if (!isNaN(v) && limits2.indexOf(v) === -1) {
          limits2.push(v);
        }
      }
    }
    return limits2;
  }

  // ../../../../node_modules/chroma-js/src/utils/contrast.js
  var contrast_default = (a, b) => {
    a = new Color_default(a);
    b = new Color_default(b);
    const l1 = a.luminance();
    const l2 = b.luminance();
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
  };

  // ../../../../node_modules/chroma-js/src/utils/contrastAPCA.js
  var W_offset = 0.027;
  var P_in = 5e-4;
  var P_out = 0.1;
  var R_scale = 1.14;
  var B_threshold = 0.022;
  var B_exp = 1.414;
  var contrastAPCA_default = (text, bg) => {
    text = new Color_default(text);
    bg = new Color_default(bg);
    if (text.alpha() < 1) {
      text = mix_default(bg, text, text.alpha(), "rgb");
    }
    const l_text = lum(...text.rgb());
    const l_bg = lum(...bg.rgb());
    const Y_text = l_text >= B_threshold ? l_text : l_text + Math.pow(B_threshold - l_text, B_exp);
    const Y_bg = l_bg >= B_threshold ? l_bg : l_bg + Math.pow(B_threshold - l_bg, B_exp);
    const S_norm = Math.pow(Y_bg, 0.56) - Math.pow(Y_text, 0.57);
    const S_rev = Math.pow(Y_bg, 0.65) - Math.pow(Y_text, 0.62);
    const C = Math.abs(Y_bg - Y_text) < P_in ? 0 : Y_text < Y_bg ? S_norm * R_scale : S_rev * R_scale;
    const S_apc = Math.abs(C) < P_out ? 0 : C > 0 ? C - W_offset : C + W_offset;
    return S_apc * 100;
  };
  function lum(r, g, b) {
    return 0.2126729 * Math.pow(r / 255, 2.4) + 0.7151522 * Math.pow(g / 255, 2.4) + 0.072175 * Math.pow(b / 255, 2.4);
  }

  // ../../../../node_modules/chroma-js/src/utils/delta-e.js
  var { sqrt: sqrt5, pow: pow7, min: min5, max: max4, atan2: atan23, abs: abs2, cos: cos5, sin: sin4, exp, PI: PI3 } = Math;
  function delta_e_default(a, b, Kl = 1, Kc = 1, Kh = 1) {
    var rad2deg = function(rad) {
      return 360 * rad / (2 * PI3);
    };
    var deg2rad = function(deg) {
      return 2 * PI3 * deg / 360;
    };
    a = new Color_default(a);
    b = new Color_default(b);
    const [L1, a1, b1] = Array.from(a.lab());
    const [L2, a2, b2] = Array.from(b.lab());
    const avgL = (L1 + L2) / 2;
    const C1 = sqrt5(pow7(a1, 2) + pow7(b1, 2));
    const C2 = sqrt5(pow7(a2, 2) + pow7(b2, 2));
    const avgC = (C1 + C2) / 2;
    const G = 0.5 * (1 - sqrt5(pow7(avgC, 7) / (pow7(avgC, 7) + pow7(25, 7))));
    const a1p = a1 * (1 + G);
    const a2p = a2 * (1 + G);
    const C1p = sqrt5(pow7(a1p, 2) + pow7(b1, 2));
    const C2p = sqrt5(pow7(a2p, 2) + pow7(b2, 2));
    const avgCp = (C1p + C2p) / 2;
    const arctan1 = rad2deg(atan23(b1, a1p));
    const arctan2 = rad2deg(atan23(b2, a2p));
    const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
    const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
    const avgHp = abs2(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
    const T = 1 - 0.17 * cos5(deg2rad(avgHp - 30)) + 0.24 * cos5(deg2rad(2 * avgHp)) + 0.32 * cos5(deg2rad(3 * avgHp + 6)) - 0.2 * cos5(deg2rad(4 * avgHp - 63));
    let deltaHp = h2p - h1p;
    deltaHp = abs2(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
    deltaHp = 2 * sqrt5(C1p * C2p) * sin4(deg2rad(deltaHp) / 2);
    const deltaL = L2 - L1;
    const deltaCp = C2p - C1p;
    const sl = 1 + 0.015 * pow7(avgL - 50, 2) / sqrt5(20 + pow7(avgL - 50, 2));
    const sc = 1 + 0.045 * avgCp;
    const sh = 1 + 0.015 * avgCp * T;
    const deltaTheta = 30 * exp(-pow7((avgHp - 275) / 25, 2));
    const Rc = 2 * sqrt5(pow7(avgCp, 7) / (pow7(avgCp, 7) + pow7(25, 7)));
    const Rt = -Rc * sin4(2 * deg2rad(deltaTheta));
    const result = sqrt5(
      pow7(deltaL / (Kl * sl), 2) + pow7(deltaCp / (Kc * sc), 2) + pow7(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh))
    );
    return max4(0, min5(100, result));
  }

  // ../../../../node_modules/chroma-js/src/utils/distance.js
  function distance_default(a, b, mode = "lab") {
    a = new Color_default(a);
    b = new Color_default(b);
    const l1 = a.get(mode);
    const l2 = b.get(mode);
    let sum_sq = 0;
    for (let i in l1) {
      const d = (l1[i] || 0) - (l2[i] || 0);
      sum_sq += d * d;
    }
    return Math.sqrt(sum_sq);
  }

  // ../../../../node_modules/chroma-js/src/utils/valid.js
  var valid_default = (...args) => {
    try {
      new Color_default(...args);
      return true;
    } catch (e) {
      return false;
    }
  };

  // ../../../../node_modules/chroma-js/src/utils/scales.js
  var scales_default = {
    cool() {
      return scale_default([chroma_default.hsl(180, 1, 0.9), chroma_default.hsl(250, 0.7, 0.4)]);
    },
    hot() {
      return scale_default(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode(
        "rgb"
      );
    }
  };

  // ../../../../node_modules/chroma-js/src/colors/colorbrewer.js
  var colorbrewer = {
    OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
    PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
    BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
    Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
    BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
    YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
    YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
    Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
    RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
    Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
    YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
    Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
    GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
    Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
    YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
    PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
    Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
    PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
    Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
    Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
    RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
    RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
    PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
    PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
    RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
    BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
    RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
    PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
    Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
    Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
    Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
    Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
    Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
    Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
    Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
    Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
  };
  var colorbrewerTypes = Object.keys(colorbrewer);
  var typeMap = new Map(colorbrewerTypes.map((key) => [key.toLowerCase(), key]));
  var colorbrewerProxy = typeof Proxy === "function" ? new Proxy(colorbrewer, {
    get(target, prop) {
      const lower = prop.toLowerCase();
      if (typeMap.has(lower)) {
        return target[typeMap.get(lower)];
      }
    },
    getOwnPropertyNames() {
      return Object.getOwnPropertyNames(colorbrewerTypes);
    }
  }) : colorbrewer;
  var colorbrewer_default = colorbrewerProxy;

  // ../../../../node_modules/chroma-js/src/io/cmyk/cmyk2rgb.js
  var cmyk2rgb = (...args) => {
    args = unpack_default(args, "cmyk");
    const [c, m, y, k] = args;
    const alpha = args.length > 4 ? args[4] : 1;
    if (k === 1)
      return [0, 0, 0, alpha];
    return [
      c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
      m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
      y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
      alpha
    ];
  };
  var cmyk2rgb_default = cmyk2rgb;

  // ../../../../node_modules/chroma-js/src/io/cmyk/rgb2cmyk.js
  var { max: max5 } = Math;
  var rgb2cmyk = (...args) => {
    let [r, g, b] = unpack_default(args, "rgb");
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const k = 1 - max5(r, max5(g, b));
    const f = k < 1 ? 1 / (1 - k) : 0;
    const c = (1 - r - k) * f;
    const m = (1 - g - k) * f;
    const y = (1 - b - k) * f;
    return [c, m, y, k];
  };
  var rgb2cmyk_default = rgb2cmyk;

  // ../../../../node_modules/chroma-js/src/io/cmyk/index.js
  Color_default.prototype.cmyk = function() {
    return rgb2cmyk_default(this._rgb);
  };
  var cmyk = (...args) => new Color_default(...args, "cmyk");
  Object.assign(chroma_default, { cmyk });
  input_default.format.cmyk = cmyk2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "cmyk");
      if (type_default(args) === "array" && args.length === 4) {
        return "cmyk";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/io/css/hsl2css.js
  var hsl2css = (...args) => {
    const hsla = unpack_default(args, "hsla");
    let mode = last_default(args) || "lsa";
    hsla[0] = rnd2(hsla[0] || 0) + "deg";
    hsla[1] = rnd2(hsla[1] * 100) + "%";
    hsla[2] = rnd2(hsla[2] * 100) + "%";
    if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
      hsla[3] = "/ " + (hsla.length > 3 ? hsla[3] : 1);
      mode = "hsla";
    } else {
      hsla.length = 3;
    }
    return `${mode.substr(0, 3)}(${hsla.join(" ")})`;
  };
  var hsl2css_default = hsl2css;

  // ../../../../node_modules/chroma-js/src/io/css/lab2css.js
  var lab2css = (...args) => {
    const laba = unpack_default(args, "lab");
    let mode = last_default(args) || "lab";
    laba[0] = rnd2(laba[0]) + "%";
    laba[1] = rnd2(laba[1]);
    laba[2] = rnd2(laba[2]);
    if (mode === "laba" || laba.length > 3 && laba[3] < 1) {
      laba[3] = "/ " + (laba.length > 3 ? laba[3] : 1);
    } else {
      laba.length = 3;
    }
    return `lab(${laba.join(" ")})`;
  };
  var lab2css_default = lab2css;

  // ../../../../node_modules/chroma-js/src/io/css/lch2css.js
  var lch2css = (...args) => {
    const lcha = unpack_default(args, "lch");
    let mode = last_default(args) || "lab";
    lcha[0] = rnd2(lcha[0]) + "%";
    lcha[1] = rnd2(lcha[1]);
    lcha[2] = isNaN(lcha[2]) ? "none" : rnd2(lcha[2]) + "deg";
    if (mode === "lcha" || lcha.length > 3 && lcha[3] < 1) {
      lcha[3] = "/ " + (lcha.length > 3 ? lcha[3] : 1);
    } else {
      lcha.length = 3;
    }
    return `lch(${lcha.join(" ")})`;
  };
  var lch2css_default = lch2css;

  // ../../../../node_modules/chroma-js/src/io/css/oklab2css.js
  var oklab2css = (...args) => {
    const laba = unpack_default(args, "lab");
    laba[0] = rnd2(laba[0] * 100) + "%";
    laba[1] = rnd3(laba[1]);
    laba[2] = rnd3(laba[2]);
    if (laba.length > 3 && laba[3] < 1) {
      laba[3] = "/ " + (laba.length > 3 ? laba[3] : 1);
    } else {
      laba.length = 3;
    }
    return `oklab(${laba.join(" ")})`;
  };
  var oklab2css_default = oklab2css;

  // ../../../../node_modules/chroma-js/src/io/oklch/rgb2oklch.js
  var rgb2oklch = (...args) => {
    const [r, g, b, ...rest] = unpack_default(args, "rgb");
    const [l, a, b_] = rgb2oklab_default(r, g, b);
    const [L, c, h] = lab2lch_default(l, a, b_);
    return [L, c, h, ...rest.length > 0 && rest[0] < 1 ? [rest[0]] : []];
  };
  var rgb2oklch_default = rgb2oklch;

  // ../../../../node_modules/chroma-js/src/io/css/oklch2css.js
  var oklch2css = (...args) => {
    const lcha = unpack_default(args, "lch");
    lcha[0] = rnd2(lcha[0] * 100) + "%";
    lcha[1] = rnd3(lcha[1]);
    lcha[2] = isNaN(lcha[2]) ? "none" : rnd2(lcha[2]) + "deg";
    if (lcha.length > 3 && lcha[3] < 1) {
      lcha[3] = "/ " + (lcha.length > 3 ? lcha[3] : 1);
    } else {
      lcha.length = 3;
    }
    return `oklch(${lcha.join(" ")})`;
  };
  var oklch2css_default = oklch2css;

  // ../../../../node_modules/chroma-js/src/io/css/rgb2css.js
  var { round: round4 } = Math;
  var rgb2css = (...args) => {
    const rgba = unpack_default(args, "rgba");
    let mode = last_default(args) || "rgb";
    if (mode.substr(0, 3) === "hsl") {
      return hsl2css_default(rgb2hsl_default(rgba), mode);
    }
    if (mode.substr(0, 3) === "lab") {
      const prevWhitePoint = getLabWhitePoint();
      setLabWhitePoint("d50");
      const cssColor = lab2css_default(rgb2lab_default(rgba), mode);
      setLabWhitePoint(prevWhitePoint);
      return cssColor;
    }
    if (mode.substr(0, 3) === "lch") {
      const prevWhitePoint = getLabWhitePoint();
      setLabWhitePoint("d50");
      const cssColor = lch2css_default(rgb2lch_default(rgba), mode);
      setLabWhitePoint(prevWhitePoint);
      return cssColor;
    }
    if (mode.substr(0, 5) === "oklab") {
      return oklab2css_default(rgb2oklab_default(rgba));
    }
    if (mode.substr(0, 5) === "oklch") {
      return oklch2css_default(rgb2oklch_default(rgba));
    }
    rgba[0] = round4(rgba[0]);
    rgba[1] = round4(rgba[1]);
    rgba[2] = round4(rgba[2]);
    if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
      rgba[3] = "/ " + (rgba.length > 3 ? rgba[3] : 1);
      mode = "rgba";
    }
    return `${mode.substr(0, 3)}(${rgba.slice(0, mode === "rgb" ? 3 : 4).join(" ")})`;
  };
  var rgb2css_default = rgb2css;

  // ../../../../node_modules/chroma-js/src/io/oklch/oklch2rgb.js
  var oklch2rgb = (...args) => {
    args = unpack_default(args, "lch");
    const [l, c, h, ...rest] = args;
    const [L, a, b_] = lch2lab_default(l, c, h);
    const [r, g, b] = oklab2rgb_default(L, a, b_);
    return [r, g, b, ...rest.length > 0 && rest[0] < 1 ? [rest[0]] : []];
  };
  var oklch2rgb_default = oklch2rgb;

  // ../../../../node_modules/chroma-js/src/io/css/css2rgb.js
  var INT_OR_PCT = /((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source;
  var FLOAT_OR_PCT = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source;
  var PCT = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source;
  var RE_S = /\s*/.source;
  var SEP = /\s+/.source;
  var COMMA = /\s*,\s*/.source;
  var ANLGE = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source;
  var ALPHA = /\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source;
  var RE_RGB = new RegExp(
    "^rgba?\\(" + RE_S + [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT].join(SEP) + ALPHA + "\\)$"
  );
  var RE_RGB_LEGACY = new RegExp(
    "^rgb\\(" + RE_S + [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT].join(COMMA) + RE_S + "\\)$"
  );
  var RE_RGBA_LEGACY = new RegExp(
    "^rgba\\(" + RE_S + [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT, FLOAT_OR_PCT].join(COMMA) + RE_S + "\\)$"
  );
  var RE_HSL = new RegExp(
    "^hsla?\\(" + RE_S + [ANLGE, PCT, PCT].join(SEP) + ALPHA + "\\)$"
  );
  var RE_HSL_LEGACY = new RegExp(
    "^hsl?\\(" + RE_S + [ANLGE, PCT, PCT].join(COMMA) + RE_S + "\\)$"
  );
  var RE_HSLA_LEGACY = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
  var RE_LAB = new RegExp(
    "^lab\\(" + RE_S + [FLOAT_OR_PCT, FLOAT_OR_PCT, FLOAT_OR_PCT].join(SEP) + ALPHA + "\\)$"
  );
  var RE_LCH = new RegExp(
    "^lch\\(" + RE_S + [FLOAT_OR_PCT, FLOAT_OR_PCT, ANLGE].join(SEP) + ALPHA + "\\)$"
  );
  var RE_OKLAB = new RegExp(
    "^oklab\\(" + RE_S + [FLOAT_OR_PCT, FLOAT_OR_PCT, FLOAT_OR_PCT].join(SEP) + ALPHA + "\\)$"
  );
  var RE_OKLCH = new RegExp(
    "^oklch\\(" + RE_S + [FLOAT_OR_PCT, FLOAT_OR_PCT, ANLGE].join(SEP) + ALPHA + "\\)$"
  );
  var { round: round5 } = Math;
  var roundRGB = (rgb3) => {
    return rgb3.map((v, i) => i <= 2 ? limit_default(round5(v), 0, 255) : v);
  };
  var percentToAbsolute = (pct, min6 = 0, max6 = 100, signed = false) => {
    if (typeof pct === "string" && pct.endsWith("%")) {
      pct = parseFloat(pct.substring(0, pct.length - 1)) / 100;
      if (signed) {
        pct = min6 + (pct + 1) * 0.5 * (max6 - min6);
      } else {
        pct = min6 + pct * (max6 - min6);
      }
    }
    return +pct;
  };
  var noneToValue = (v, noneValue) => {
    return v === "none" ? noneValue : v;
  };
  var css2rgb = (css2) => {
    css2 = css2.toLowerCase().trim();
    if (css2 === "transparent") {
      return [0, 0, 0, 0];
    }
    let m;
    if (input_default.format.named) {
      try {
        return input_default.format.named(css2);
      } catch (e) {
      }
    }
    if ((m = css2.match(RE_RGB)) || (m = css2.match(RE_RGB_LEGACY))) {
      let rgb3 = m.slice(1, 4);
      for (let i = 0; i < 3; i++) {
        rgb3[i] = +percentToAbsolute(noneToValue(rgb3[i], 0), 0, 255);
      }
      rgb3 = roundRGB(rgb3);
      const alpha = m[4] !== void 0 ? +percentToAbsolute(m[4], 0, 1) : 1;
      rgb3[3] = alpha;
      return rgb3;
    }
    if (m = css2.match(RE_RGBA_LEGACY)) {
      const rgb3 = m.slice(1, 5);
      for (let i = 0; i < 4; i++) {
        rgb3[i] = +percentToAbsolute(rgb3[i], 0, 255);
      }
      return rgb3;
    }
    if ((m = css2.match(RE_HSL)) || (m = css2.match(RE_HSL_LEGACY))) {
      const hsl3 = m.slice(1, 4);
      hsl3[0] = +noneToValue(hsl3[0].replace("deg", ""), 0);
      hsl3[1] = +percentToAbsolute(noneToValue(hsl3[1], 0), 0, 100) * 0.01;
      hsl3[2] = +percentToAbsolute(noneToValue(hsl3[2], 0), 0, 100) * 0.01;
      const rgb3 = roundRGB(hsl2rgb_default(hsl3));
      const alpha = m[4] !== void 0 ? +percentToAbsolute(m[4], 0, 1) : 1;
      rgb3[3] = alpha;
      return rgb3;
    }
    if (m = css2.match(RE_HSLA_LEGACY)) {
      const hsl3 = m.slice(1, 4);
      hsl3[1] *= 0.01;
      hsl3[2] *= 0.01;
      const rgb3 = hsl2rgb_default(hsl3);
      for (let i = 0; i < 3; i++) {
        rgb3[i] = round5(rgb3[i]);
      }
      rgb3[3] = +m[4];
      return rgb3;
    }
    if (m = css2.match(RE_LAB)) {
      const lab3 = m.slice(1, 4);
      lab3[0] = percentToAbsolute(noneToValue(lab3[0], 0), 0, 100);
      lab3[1] = percentToAbsolute(noneToValue(lab3[1], 0), -125, 125, true);
      lab3[2] = percentToAbsolute(noneToValue(lab3[2], 0), -125, 125, true);
      const wp = getLabWhitePoint();
      setLabWhitePoint("d50");
      const rgb3 = roundRGB(lab2rgb_default(lab3));
      setLabWhitePoint(wp);
      const alpha = m[4] !== void 0 ? +percentToAbsolute(m[4], 0, 1) : 1;
      rgb3[3] = alpha;
      return rgb3;
    }
    if (m = css2.match(RE_LCH)) {
      const lch3 = m.slice(1, 4);
      lch3[0] = percentToAbsolute(lch3[0], 0, 100);
      lch3[1] = percentToAbsolute(noneToValue(lch3[1], 0), 0, 150, false);
      lch3[2] = +noneToValue(lch3[2].replace("deg", ""), 0);
      const wp = getLabWhitePoint();
      setLabWhitePoint("d50");
      const rgb3 = roundRGB(lch2rgb_default(lch3));
      setLabWhitePoint(wp);
      const alpha = m[4] !== void 0 ? +percentToAbsolute(m[4], 0, 1) : 1;
      rgb3[3] = alpha;
      return rgb3;
    }
    if (m = css2.match(RE_OKLAB)) {
      const oklab3 = m.slice(1, 4);
      oklab3[0] = percentToAbsolute(noneToValue(oklab3[0], 0), 0, 1);
      oklab3[1] = percentToAbsolute(noneToValue(oklab3[1], 0), -0.4, 0.4, true);
      oklab3[2] = percentToAbsolute(noneToValue(oklab3[2], 0), -0.4, 0.4, true);
      const rgb3 = roundRGB(oklab2rgb_default(oklab3));
      const alpha = m[4] !== void 0 ? +percentToAbsolute(m[4], 0, 1) : 1;
      rgb3[3] = alpha;
      return rgb3;
    }
    if (m = css2.match(RE_OKLCH)) {
      const oklch3 = m.slice(1, 4);
      oklch3[0] = percentToAbsolute(noneToValue(oklch3[0], 0), 0, 1);
      oklch3[1] = percentToAbsolute(noneToValue(oklch3[1], 0), 0, 0.4, false);
      oklch3[2] = +noneToValue(oklch3[2].replace("deg", ""), 0);
      const rgb3 = roundRGB(oklch2rgb_default(oklch3));
      const alpha = m[4] !== void 0 ? +percentToAbsolute(m[4], 0, 1) : 1;
      rgb3[3] = alpha;
      return rgb3;
    }
  };
  css2rgb.test = (s) => {
    return RE_RGB.test(s) || RE_HSL.test(s) || RE_LAB.test(s) || RE_LCH.test(s) || RE_OKLAB.test(s) || RE_OKLCH.test(s) || RE_RGB_LEGACY.test(s) || RE_RGBA_LEGACY.test(s) || RE_HSL_LEGACY.test(s) || RE_HSLA_LEGACY.test(s) || s === "transparent";
  };
  var css2rgb_default = css2rgb;

  // ../../../../node_modules/chroma-js/src/io/css/index.js
  Color_default.prototype.css = function(mode) {
    return rgb2css_default(this._rgb, mode);
  };
  var css = (...args) => new Color_default(...args, "css");
  chroma_default.css = css;
  input_default.format.css = css2rgb_default;
  input_default.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
      if (!rest.length && type_default(h) === "string" && css2rgb_default.test(h)) {
        return "css";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/io/gl/index.js
  input_default.format.gl = (...args) => {
    const rgb3 = unpack_default(args, "rgba");
    rgb3[0] *= 255;
    rgb3[1] *= 255;
    rgb3[2] *= 255;
    return rgb3;
  };
  var gl = (...args) => new Color_default(...args, "gl");
  chroma_default.gl = gl;
  Color_default.prototype.gl = function() {
    const rgb3 = this._rgb;
    return [rgb3[0] / 255, rgb3[1] / 255, rgb3[2] / 255, rgb3[3]];
  };

  // ../../../../node_modules/chroma-js/src/io/hex/index.js
  Color_default.prototype.hex = function(mode) {
    return rgb2hex_default(this._rgb, mode);
  };
  var hex = (...args) => new Color_default(...args, "hex");
  chroma_default.hex = hex;
  input_default.format.hex = hex2rgb_default;
  input_default.autodetect.push({
    p: 4,
    test: (h, ...rest) => {
      if (!rest.length && type_default(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
        return "hex";
      }
    }
  });

  // ../../../../node_modules/chroma-js/src/io/temp/temperature2rgb.js
  var { log: log2 } = Math;
  var temperature2rgb = (kelvin) => {
    const temp2 = kelvin / 100;
    let r, g, b;
    if (temp2 < 66) {
      r = 255;
      g = temp2 < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp2 - 2) + 104.49216199393888 * log2(g);
      b = temp2 < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp2 - 10) + 115.67994401066147 * log2(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp2 - 55) - 40.25366309332127 * log2(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp2 - 50) - 28.0852963507957 * log2(g);
      b = 255;
    }
    return [r, g, b, 1];
  };
  var temperature2rgb_default = temperature2rgb;

  // ../../../../node_modules/chroma-js/src/io/temp/rgb2temperature.js
  var { round: round6 } = Math;
  var rgb2temperature = (...args) => {
    const rgb3 = unpack_default(args, "rgb");
    const r = rgb3[0], b = rgb3[2];
    let minTemp = 1e3;
    let maxTemp = 4e4;
    const eps = 0.4;
    let temp2;
    while (maxTemp - minTemp > eps) {
      temp2 = (maxTemp + minTemp) * 0.5;
      const rgb4 = temperature2rgb_default(temp2);
      if (rgb4[2] / rgb4[0] >= b / r) {
        maxTemp = temp2;
      } else {
        minTemp = temp2;
      }
    }
    return round6(temp2);
  };
  var rgb2temperature_default = rgb2temperature;

  // ../../../../node_modules/chroma-js/src/io/temp/index.js
  Color_default.prototype.temp = Color_default.prototype.kelvin = Color_default.prototype.temperature = function() {
    return rgb2temperature_default(this._rgb);
  };
  var temp = (...args) => new Color_default(...args, "temp");
  Object.assign(chroma_default, { temp, kelvin: temp, temperature: temp });
  input_default.format.temp = input_default.format.kelvin = input_default.format.temperature = temperature2rgb_default;

  // ../../../../node_modules/chroma-js/src/io/oklch/index.js
  Color_default.prototype.oklch = function() {
    return rgb2oklch_default(this._rgb);
  };
  var oklch2 = (...args) => new Color_default(...args, "oklch");
  Object.assign(chroma_default, { oklch: oklch2 });
  input_default.format.oklch = oklch2rgb_default;
  input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, "oklch");
      if (type_default(args) === "array" && args.length === 3) {
        return "oklch";
      }
    }
  });

  // ../../../../node_modules/chroma-js/index.js
  Object.assign(chroma_default, {
    analyze,
    average: average_default,
    bezier: bezier_default,
    blend: blend_default,
    brewer: colorbrewer_default,
    Color: Color_default,
    colors: w3cx11_default,
    contrast: contrast_default,
    contrastAPCA: contrastAPCA_default,
    cubehelix: cubehelix_default,
    deltaE: delta_e_default,
    distance: distance_default,
    input: input_default,
    interpolate: mix_default,
    limits,
    mix: mix_default,
    random: random_default,
    scale: scale_default,
    scales: scales_default,
    valid: valid_default
  });
  var chroma_js_default = chroma_default;

  // src/app.tsx
  var SETTINGS_SECTION_ID = "gradient-theme-settings";
  var MODE_SETTING_ID = "gradient-mode";
  var SECTIONS_SETTING_ID = "gradient-sections";
  var ANIMATION_TYPE_SETTING_ID = "gradient-anim-type";
  var FIXED_DURATION_SETTING_ID = "gradient-anim-fixed-duration";
  var REGULAR_DURATION_SETTING_ID = "gradient-anim-regular-duration";
  var FIRST_DURATION_SETTING_ID = "gradient-anim-first-duration";
  var HOVER_STYLE_SETTING_ID = "gradient-hover-style";
  var FIRST_TIME_STORAGE_KEY = "gradientThemeFirstTime";
  var NOW_PLAYING_BAR_SELECTOR = ".main-nowPlayingWidget-trackInfo";
  var COVER_ART_SELECTOR = ".main-nowPlayingWidget-coverArt img";
  var DEFAULT_MODE = "Progress-Based";
  var DEFAULT_SECTIONS = 2;
  var DEFAULT_ANIMATION_TYPE = "Fixed";
  var DEFAULT_FIXED_DURATION = 1.5;
  var DEFAULT_REGULAR_DURATION = 1.5;
  var DEFAULT_FIRST_DURATION = 1.5;
  var DEFAULT_SECONDARY_COLOR = "#142b44";
  var HOVER_STYLE_OPTIONS = ["Static Black", "Dynamic Gradient"];
  var DEFAULT_HOVER_STYLE = "Static Black";
  var DEFAULT_DYNAMIC_CARD_BG = "rgba(255, 255, 255, 0.1)";
  var DEFAULT_DYNAMIC_TRACK_BG = "rgba(255, 255, 255, 0.08)";
  var DEFAULT_DYNAMIC_LISTROW_AFTER_BG = "rgba(255, 255, 255, 0.06)";
  var STATIC_DARK_CARD_BG = "rgba(0, 0, 0, .8)";
  var STATIC_DARK_TRACK_BG = "rgba(0, 0, 0, .8)";
  var STATIC_DARK_LISTROW_AFTER_BG = "rgba(0, 0, 0, .8)";
  var currentSection = -1;
  var settings;
  var progressIntervalId = null;
  async function main() {
    while (!(Spicetify == null ? void 0 : Spicetify.Platform) || !(Spicetify == null ? void 0 : Spicetify.showNotification) || !(Spicetify == null ? void 0 : Spicetify.Player)) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    initializeSettings();
    localStorage.removeItem(FIRST_TIME_STORAGE_KEY);
    document.documentElement.style.setProperty(
      "--dynamic-card-hover-bg",
      DEFAULT_DYNAMIC_CARD_BG
    );
    document.documentElement.style.setProperty(
      "--dynamic-track-hover-bg",
      DEFAULT_DYNAMIC_TRACK_BG
    );
    document.documentElement.style.setProperty(
      "--dynamic-listRow-after-hover-bg",
      DEFAULT_DYNAMIC_LISTROW_AFTER_BG
    );
    try {
      const user = await Spicetify.Platform.UserAPI.getUser();
      Spicetify.showNotification(
        `Gradient Theme Initialized for ${user.displayName}`
      );
    } catch (e) {
      console.warn("Couldn't fetch user info for notification", e);
      Spicetify.showNotification(`Gradient Theme Initialized`);
    }
    initializeThemeExtension();
  }
  function initializeSettings() {
    settings = new SettingsSection(
      "Gradient Theme Settings",
      SETTINGS_SECTION_ID
    );
    settings.addDropDown(
      MODE_SETTING_ID,
      "Gradient Update Mode",
      ["Static", "Random Static", "Progress-Based"],
      ["Static", "Random Static", "Progress-Based"].indexOf(DEFAULT_MODE),
      () => {
        const newValue = settings.getFieldValue(MODE_SETTING_ID);
        console.log("Mode changed to:", newValue);
        resetThemeLogic();
      }
    );
    settings.addInput(
      SECTIONS_SETTING_ID,
      "Number of Sections (for Progress-Based mode)",
      DEFAULT_SECTIONS.toString(),
      () => {
        const newValue = settings.getFieldValue(SECTIONS_SETTING_ID);
        console.log("Sections changed to:", newValue);
        const currentMode = settings.getFieldValue(MODE_SETTING_ID);
        if (currentMode === "Progress-Based") {
          currentSection = -1;
        }
      }
    );
    settings.addDropDown(
      ANIMATION_TYPE_SETTING_ID,
      "Animation Duration Type",
      ["Fixed", "Dynamic", "Dynamic Adjusted"],
      ["Fixed", "Dynamic", "Dynamic Adjusted"].indexOf(DEFAULT_ANIMATION_TYPE),
      () => {
        const newValue = settings.getFieldValue(
          ANIMATION_TYPE_SETTING_ID
        );
        console.log("Animation type changed:", newValue);
      }
    );
    settings.addInput(
      FIXED_DURATION_SETTING_ID,
      "Fixed Animation Duration (seconds)",
      DEFAULT_FIXED_DURATION.toString()
    );
    settings.addInput(
      REGULAR_DURATION_SETTING_ID,
      "Regular Animation Duration (seconds, for Dynamic modes)",
      DEFAULT_REGULAR_DURATION.toString()
    );
    settings.addInput(
      FIRST_DURATION_SETTING_ID,
      "First Animation Duration (seconds, for Dynamic modes)",
      DEFAULT_FIRST_DURATION.toString()
    );
    settings.addDropDown(
      HOVER_STYLE_SETTING_ID,
      "Element Hover Background Style",
      HOVER_STYLE_OPTIONS,
      HOVER_STYLE_OPTIONS.indexOf(DEFAULT_HOVER_STYLE),
      () => {
        console.log("Hover style changed");
        const currentSecondary = getComputedStyle(document.documentElement).getPropertyValue("--gradient-secondary").trim() || DEFAULT_SECONDARY_COLOR;
        updateHoverBackgrounds(currentSecondary);
      }
    );
    settings.pushSettings();
  }
  function initializeThemeExtension() {
    console.log("Initializing theme extension...");
    const nowPlayingBar = document.querySelector(
      NOW_PLAYING_BAR_SELECTOR
    );
    if (!nowPlayingBar) {
      console.error("Now-playing bar not found. Cannot initialize theme.");
      return;
    }
    console.log("Now-playing bar found:", nowPlayingBar);
    const observer = new MutationObserver((mutations) => {
      console.log("Now-playing bar content changed (Mutation Observer)");
      if (settings.getFieldValue(MODE_SETTING_ID) === "Progress-Based") {
        currentSection = -1;
      }
      applyGradientFromCoverArt(true);
    });
    observer.observe(nowPlayingBar, {
      childList: true,
      subtree: true,
      characterData: true
    });
    setupProgressTracking();
    applyGradientFromCoverArt(true);
  }
  function setupProgressTracking() {
    if (progressIntervalId !== null) {
      clearInterval(progressIntervalId);
      progressIntervalId = null;
      console.log("Cleared existing progress interval.");
    }
    const currentMode = settings.getFieldValue(MODE_SETTING_ID);
    if (currentMode === "Progress-Based") {
      console.log("Starting progress tracking interval.");
      progressIntervalId = window.setInterval(updateGradientOnProgress, 1e3);
    } else {
      console.log("Mode is not Progress-Based, progress tracking stopped.");
    }
  }
  function resetThemeLogic() {
    console.log("Resetting theme logic due to settings change...");
    setupProgressTracking();
    applyGradientFromCoverArt(true);
  }
  function applyGradientFromCoverArt(isInitialApplication = false) {
    const coverArt = document.querySelector(COVER_ART_SELECTOR);
    const currentMode = settings.getFieldValue(MODE_SETTING_ID);
    if (!isInitialApplication && (currentMode === "Static" || currentMode === "Random Static")) {
      return;
    }
    if (coverArt && coverArt.src) {
      const proxyUrl = getProxyImageUrl(coverArt.src);
      Vibrant.from(proxyUrl).getPalette().then((palette) => {
        var _a, _b, _c;
        if (!palette) {
          console.error("Palette extraction failed");
          return;
        }
        const paletteKeys = Object.keys(palette).filter((key) => palette[key]);
        if (paletteKeys.length === 0) {
          console.error("No valid palette keys found.");
          morphGradient(
            "#000000",
            DEFAULT_SECONDARY_COLOR,
            isInitialApplication
          );
          return;
        }
        let mainColor = "#000000";
        let secondaryColor = DEFAULT_SECONDARY_COLOR;
        let logReason = "";
        switch (currentMode) {
          case "Static":
            secondaryColor = ((_a = palette[paletteKeys[0]]) == null ? void 0 : _a.hex) || DEFAULT_SECONDARY_COLOR;
            logReason = "Static mode - First Key";
            break;
          case "Random Static":
            const randomKey = paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
            secondaryColor = ((_b = palette[randomKey]) == null ? void 0 : _b.hex) || DEFAULT_SECONDARY_COLOR;
            logReason = `Random Static mode - Key: ${randomKey}`;
            break;
          case "Progress-Based":
            const numSections = parseInt(
              settings.getFieldValue(SECTIONS_SETTING_ID),
              10
            ) || DEFAULT_SECTIONS;
            const sectionIndex = 0;
            const paletteKeyProgress = paletteKeys[sectionIndex % paletteKeys.length];
            secondaryColor = ((_c = palette[paletteKeyProgress]) == null ? void 0 : _c.hex) || DEFAULT_SECONDARY_COLOR;
            logReason = `Progress-Based mode - Initial Apply (Section 0) - Key: ${paletteKeyProgress}`;
            break;
        }
        console.log(
          `${logReason} -> Extracted colors:`,
          mainColor,
          secondaryColor
        );
        morphGradient(mainColor, secondaryColor, isInitialApplication);
      }).catch((error) => {
        console.error("Error extracting colors:", error);
        morphGradient("#000000", DEFAULT_SECONDARY_COLOR, isInitialApplication);
      });
    } else {
      console.warn(
        "Cover art not found or source is missing. Cannot apply gradient."
      );
    }
  }
  function updateGradientOnProgress() {
    const currentMode = settings.getFieldValue(MODE_SETTING_ID);
    if (currentMode !== "Progress-Based") {
      return;
    }
    const progress = Spicetify.Player.getProgress();
    const duration = Spicetify.Player.getDuration();
    if (progress != null && duration != null && duration > 0) {
      const progressFraction = progress / duration;
      const numSections = parseInt(settings.getFieldValue(SECTIONS_SETTING_ID), 10) || DEFAULT_SECTIONS;
      const section = Math.min(
        Math.floor(progressFraction * numSections),
        numSections - 1
      );
      if (section !== currentSection) {
        console.warn(`CHANGE SECTION: ${currentSection} -> ${section}`);
        currentSection = section;
        updatePaletteForSection(section);
      }
    }
  }
  function updatePaletteForSection(section) {
    const coverArt = document.querySelector(COVER_ART_SELECTOR);
    if (coverArt && coverArt.src) {
      const proxyUrl = getProxyImageUrl(coverArt.src);
      Vibrant.from(proxyUrl).getPalette().then((palette) => {
        var _a;
        if (!palette) {
          console.error(`Section ${section + 1}: Palette extraction failed`);
          return;
        }
        const paletteKeys = Object.keys(palette).filter((key) => palette[key]);
        if (paletteKeys.length === 0) {
          console.error(`Section ${section + 1}: No valid palette keys found.`);
          return;
        }
        const numSections = parseInt(settings.getFieldValue(SECTIONS_SETTING_ID), 10) || DEFAULT_SECTIONS;
        const paletteKey = paletteKeys[section % paletteKeys.length];
        const mainColor = "#000000";
        const secondaryColor = ((_a = palette[paletteKey]) == null ? void 0 : _a.hex) || DEFAULT_SECONDARY_COLOR;
        console.log(
          `Section ${section + 1}/${numSections}: Extracted colors (Key: ${paletteKey})`,
          mainColor,
          secondaryColor
        );
        morphGradient(mainColor, secondaryColor, false);
      }).catch(
        (error) => console.error(`Section ${section + 1}: Error extracting colors:`, error)
      );
    } else {
      console.warn(
        `Section ${section + 1}: Cover art not found or source is missing.`
      );
    }
  }
  function updateHoverBackgrounds(secondaryColor) {
    const root = document.documentElement;
    const hoverStyle = settings.getFieldValue(HOVER_STYLE_SETTING_ID) || DEFAULT_HOVER_STYLE;
    try {
      let cardBg, trackBg, listRowAfterBg;
      if (hoverStyle === "Dynamic Gradient") {
        cardBg = chroma_js_default(secondaryColor).darken(1.2).hex("rgba");
        trackBg = chroma_js_default(secondaryColor).darken(0.8).hex("rgba");
        listRowAfterBg = chroma_js_default(secondaryColor).darken(0.5).hex("rgba");
      } else {
        cardBg = STATIC_DARK_CARD_BG;
        trackBg = STATIC_DARK_TRACK_BG;
        listRowAfterBg = STATIC_DARK_LISTROW_AFTER_BG;
      }
      root.style.setProperty("--dynamic-card-hover-bg", cardBg);
      root.style.setProperty("--dynamic-track-hover-bg", trackBg);
      root.style.setProperty("--dynamic-listRow-after-hover-bg", listRowAfterBg);
    } catch (error) {
      console.error("Error setting hover background colors:", error);
      root.style.setProperty("--dynamic-card-hover-bg", DEFAULT_DYNAMIC_CARD_BG);
      root.style.setProperty(
        "--dynamic-track-hover-bg",
        DEFAULT_DYNAMIC_TRACK_BG
      );
      root.style.setProperty(
        "--dynamic-listRow-after-hover-bg",
        DEFAULT_DYNAMIC_LISTROW_AFTER_BG
      );
    }
  }
  function morphGradient(newMain, newSecondary, isInitialApplication) {
    const root = document.documentElement;
    const currentMain = getComputedStyle(root).getPropertyValue("--gradient-main").trim() || "#000000";
    const currentSecondary = getComputedStyle(root).getPropertyValue("--gradient-secondary").trim() || DEFAULT_SECONDARY_COLOR;
    if (newMain === currentMain && newSecondary === currentSecondary) {
      updateHoverBackgrounds(newSecondary);
      return;
    }
    updateHoverBackgrounds(newSecondary);
    const duration = getAnimationDuration(isInitialApplication);
    console.log(`Morphing gradient to ${newSecondary} over ${duration}s`);
    gsapWithCSS.to(root, {
      "--gradient-main": newMain,
      "--gradient-secondary": newSecondary,
      duration,
      ease: "power2.inOut",
      onComplete: () => {
        console.log("Gradient morph completed.");
      }
    });
  }
  function getAnimationDuration(isInitialApplication) {
    const animType = settings.getFieldValue(ANIMATION_TYPE_SETTING_ID);
    const fixedDuration = parseFloat(settings.getFieldValue(FIXED_DURATION_SETTING_ID)) || DEFAULT_FIXED_DURATION;
    const regularDuration = parseFloat(settings.getFieldValue(REGULAR_DURATION_SETTING_ID)) || DEFAULT_REGULAR_DURATION;
    const firstDuration = parseFloat(settings.getFieldValue(FIRST_DURATION_SETTING_ID)) || DEFAULT_FIRST_DURATION;
    switch (animType) {
      case "Fixed":
        return fixedDuration;
      case "Dynamic":
      case "Dynamic Adjusted":
        const isFirstTime = localStorage.getItem(FIRST_TIME_STORAGE_KEY) === null;
        let duration;
        if (isFirstTime && isInitialApplication) {
          localStorage.setItem(FIRST_TIME_STORAGE_KEY, "false");
          duration = firstDuration;
          console.log("Using FIRST animation duration:", duration);
        } else {
          duration = regularDuration;
          console.log("Using REGULAR animation duration:", duration);
        }
        if (animType === "Dynamic Adjusted") {
          const currentMode = settings.getFieldValue(MODE_SETTING_ID);
          if (currentMode === "Progress-Based") {
            const songDurationMs = Spicetify.Player.getDuration();
            const numSections = parseInt(
              settings.getFieldValue(SECTIONS_SETTING_ID),
              10
            ) || DEFAULT_SECTIONS;
            if (songDurationMs && numSections > 0) {
              const sectionDurationSec = songDurationMs / 1e3 / numSections;
              if (sectionDurationSec > 0) {
                const adjustedDuration = Math.min(
                  duration,
                  sectionDurationSec * 0.9
                );
                console.log(
                  `Dynamic Adjusted: Regular=${duration}, Section=${sectionDurationSec.toFixed(
                    2
                  )}, Adjusted=${adjustedDuration.toFixed(2)}`
                );
                return adjustedDuration;
              }
            }
          }
        }
        return duration;
      default:
        return DEFAULT_FIXED_DURATION;
    }
  }
  function getProxyImageUrl(spotifyUri) {
    if (spotifyUri.startsWith("spotify:image:")) {
      return spotifyUri.replace("spotify:image:", "https://i.scdn.co/image/");
    }
    if (spotifyUri.startsWith("https://i.scdn.co/image/")) {
      return spotifyUri;
    }
    console.warn("Unexpected image URI format:", spotifyUri);
    return spotifyUri;
  }
  var app_default = main;

  // ../../../../AppData/Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();
/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
/**
 * @license
 *
 * The APCA contrast prediction algorithm is based of the formulas published
 * in the APCA-1.0.98G specification by Myndex. The specification is available at:
 * https://raw.githubusercontent.com/Myndex/apca-w3/master/images/APCAw3_0.1.17_APCA0.0.98G.svg
 *
 * Note that the APCA implementation is still beta, so please update to
 * future versions of chroma.js when they become available.
 *
 * You can read more about the APCA Readability Criterion at
 * https://readtech.org/ARC/
 */

      })();