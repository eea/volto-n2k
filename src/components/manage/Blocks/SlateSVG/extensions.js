import { SLATESVG } from './constants';

export const withSlateSvg = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element.type === SLATESVG ? true : isInline(element);
  };

  return editor;
};
