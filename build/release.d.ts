/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/initString
 * @param init_set `~lib/string/String`
 * @returns `~lib/array/Array<~lib/array/Array<~lib/string/String>>`
 */
export declare function initString(init_set: string): Array<Array<string>>;
/**
 * assembly/index/initNumbers
 * @param init_set `~lib/array/Array<i32>`
 * @returns `~lib/array/Array<~lib/array/Array<i32>>`
 */
export declare function initNumbers(init_set: Array<number>): Array<Array<number>>;
/**
 * assembly/index/createMarkupElement
 * @param name `~lib/string/String`
 * @param template `~lib/string/String`
 * @returns `~lib/string/String`
 */
export declare function createMarkupElement(name: string, template: string): string;
/**
 * assembly/index/setPanels
 * @param panels `i32`
 * @returns `~lib/string/String`
 */
export declare function setPanels(panels: number): string;
/**
 * assembly/index/createSVGPattern
 * @param init_set `~lib/string/String`
 * @param template `~lib/string/String`
 * @returns `~lib/string/String`
 */
export declare function createSVGPattern(init_set: string, template: string): string;
/**
 * assembly/index/createImagePattern
 * @param svg `~lib/string/String`
 * @param img `~lib/string/String`
 * @returns `~lib/string/String`
 */
export declare function createImagePattern(svg: string, img: string): string;
/**
 * assembly/index/createAbstractRectangle
 * @param id `~lib/string/String`
 * @returns `~lib/array/Array<assembly/geometry/Point>`
 */
export declare function createAbstractRectangle(id: string): Array<__Internref23>;
/**
 * assembly/index/createSVGDocument
 * @param ratio `f64`
 * @param map `~lib/string/String`
 * @param text `~lib/string/String`
 * @returns `~lib/string/String`
 */
export declare function createSVGDocument(ratio: number, map: string, text: string): string;
/** assembly/geometry/Point */
declare class __Internref23 extends Number {
  private __nominal23: symbol;
  private __nominal0: symbol;
}
