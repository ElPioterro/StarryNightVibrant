// colorful-background-ts.ts
export class ColorfulBackgroundGenerator {
  layers: ColorfulBackgroundLayer[];

  constructor() {
    this.layers = [];
  }

  getNumberOfLayers(): number {
    return this.layers.length;
  }

  getLayerByIndex(index: number): ColorfulBackgroundLayer | undefined {
    return index >= 0 && index < this.getNumberOfLayers()
      ? this.layers[index]
      : undefined;
  }

  addLayer(layer: ColorfulBackgroundLayer, index?: number): void {
    if (index === undefined || index > this.getNumberOfLayers()) {
      this.layers.push(layer);
    } else {
      this.layers.splice(index, 0, layer);
    }
  }

  deleteLayer(index: number): void {
    if (index >= 0 && index < this.getNumberOfLayers()) {
      this.layers.splice(index, 1);
    }
  }

  deleteAllLayers(): void {
    this.layers = [];
  }

  getCSS(includeWebkit: boolean = true): string {
    let css = this.getCSSProperty();
    return includeWebkit ? this.getCSSProperty("-webkit-") + css : css.trim();
  }

  getCSSProperty(prefix: string = ""): string {
    return (
      "background:\n    " +
      this.layers
        .map((layer, i) => layer.getCSSProperty(i === 0, prefix))
        .join("")
    );
  }

  getCSSAsText(): string {
    return `.colorful {\n  ${this.getCSS(true)}}`;
  }

  assignStyleToElementId(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      this.assignStyleToElement(element);
    }
  }

  assignStyleToElementByClass(className: string): void {
    const element = document.querySelector(`.${className}`);
    if (element) {
      this.assignStyleToElement(element as HTMLElement);
    }
  }

  assignStyleToElement(element: HTMLElement): void {
    element.setAttribute("style", this.getCSS());
  }
}

// In colorful-background-ts.ts, modify the getCSSProperty() method for ColorfulBackgroundLayer:

export class ColorfulBackgroundLayer {
  degree: number;
  hue: number;
  saturation: number;
  lightness: number;
  posColor: number; // Intended stop for the opaque (solid) color
  posTransparency: number; // This value (plus offset) is used for the transparent stop

  constructor(params?: Partial<ColorfulBackgroundLayer>) {
    this.degree = params?.degree ?? 45;
    this.hue = params?.hue ?? 200;
    // Expect saturation as a fraction (0–1)
    this.saturation = Math.min(params?.saturation ?? 1, 1);
    // Expect lightness as a fraction; boost slightly for richer colors.
    this.lightness = Math.min((params?.lightness ?? 0.5) * 1.3, 0.9);
    this.posColor = params?.posColor ?? 0;
    this.posTransparency = params?.posTransparency ?? 7;
  }

  getCSSProperty(isLast: boolean, prefix: string = ""): string {
    const s = `${roundToTwo(this.hue)}, ${roundToTwo(
      this.saturation * 100
    )}%, ${roundToTwo(this.lightness * 100)}%`;

    // Compute the two percent stops.
    // We add an offset of 30 to posTransparency as before.
    const posOpaque = this.posColor;
    const posTrans = Math.min(100, this.posTransparency + 30);
    const lowerStop = Math.min(posOpaque, posTrans);
    const higherStop = Math.max(posOpaque, posTrans);

    // Determine which stop should be opaque.
    // If posColor is lower or equal to posTrans, then assign opaque to the lower stop.
    // Otherwise, assign opaque to the higher stop.
    let css: string;
    if (posOpaque <= posTrans) {
      css = `${prefix}linear-gradient(${this.getDegreeForVendor(
        prefix
      )}deg, hsla(${s}, 1) ${lowerStop}%, hsla(${s}, 0) ${higherStop}%)`;
    } else {
      css = `${prefix}linear-gradient(${this.getDegreeForVendor(
        prefix
      )}deg, hsla(${s}, 0) ${lowerStop}%, hsla(${s}, 1) ${higherStop}%)`;
    }
    return isLast ? css + ";\n  " : css + ",\n    ";
  }

  getDegreeForVendor(prefix: string): number {
    if (prefix === "-webkit-") {
      let adjustedDegree = 360 - this.degree + 90;
      return adjustedDegree >= 360 ? adjustedDegree - 360 : adjustedDegree;
    }
    return this.degree;
  }
}

function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100;
}
