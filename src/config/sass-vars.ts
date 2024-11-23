import variables from './variables.module.scss';

const pxExp = /(\d*\.?\d+)px/;

function parsePx(stringValue: string) {
  const result = pxExp.exec(stringValue);

  if (!result) {
    throw new Error('Unable to parse variable from SASS');
  }

  return Number(result[1]);
}

export const cellWidth = parsePx(variables.cellWidth);
export const cellHeight = parsePx(variables.cellHeight);
export const cellBorderSize = parsePx(variables.cellBorderSize);
export const gridBorderSize = parsePx(variables.gridBorderSize);
export const gridMargin = parsePx(variables.gridMargin);
