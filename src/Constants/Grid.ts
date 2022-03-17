interface IObj {
  [key: string]: any
}

export const SCREEN_WIDTH = 1080
export const GRID_ITEM_DEFAULT_HEIGHT = 15
export const LAYOUT__KEY: string = 'LAYOUT__KEY'
export const DEFAULT_ITEM_LAYOUT = {
  w: SCREEN_WIDTH,
  h: GRID_ITEM_DEFAULT_HEIGHT,
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
