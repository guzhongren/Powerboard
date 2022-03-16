interface IObj {
  [key: string]: any
}

export const SCREEN_WIDTH = 100
export const GRID_ITEM_DEFAULT_HEIGHT = 8
export const LAYOUT__KEY: string = 'LAYOUT__KEY'
export const DEFAULT_ITEM_LAYOUT = {
  w: SCREEN_WIDTH,
  h: 20,
  x: 0,
  y: 0,
  i: '0',
  minW: 0,
  maxW: SCREEN_WIDTH,
  minH: GRID_ITEM_DEFAULT_HEIGHT,
  maxH: SCREEN_WIDTH,
  moved: false,
  static: false,
  isDraggable: true,
  isResizable: true,
}
