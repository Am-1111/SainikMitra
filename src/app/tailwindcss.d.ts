declare module 'tailwindcss/lib/util/flattenColorPalette' {
    type ColorPalette = { [key: string]: string | ColorPalette };
  
    const flattenColorPalette: (palette: ColorPalette) => string[];
    export default flattenColorPalette;
  }
  