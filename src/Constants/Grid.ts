interface IObj {
  [key: string]: any
}

export const LAYOUT__KEY: string = 'LAYOUT__KEY'
export const DEFAULT_ITEM_LAYOUT: IObj = {
  w: 100,
  h: 19,
  x: 0,
  y: 0,
  i: '0',
  minW: undefined,
  maxW: undefined,
  minH: undefined,
  maxH: undefined,
  moved: false,
  static: false,
  isDraggable: undefined,
  isResizable: undefined,
}
