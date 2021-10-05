import { defineMessages } from 'react-intl';
import { makeInlineElementPlugin } from 'volto-slate/components/ElementEditor';
import { SlateSvgSchema } from './schema';
import { withSlateSvg } from './extensions';
import { SLATESVG } from './constants';
import { SlateSvgElement } from './render';
import triangleSVG from '@plone/volto/icons/triangle.svg';

import './styles.less';

const messages = defineMessages({
  edit: {
    id: 'Edit slate svg',
    defaultMessage: 'Edit slate svg',
  },
  delete: {
    id: 'Remove slate svg',
    defaultMessage: 'Remove slate svg',
  },
});

export default function install(config) {
  const opts = {
    pluginId: SLATESVG,
    elementType: SLATESVG,
    element: SlateSvgElement,
    editSchema: SlateSvgSchema,
    isInlineElement: true,
    hasValue: () => true,
    extensions: [withSlateSvg],
    toolbarButtonIcon: triangleSVG,
    title: 'Slate svg',
    messages,
  };
  const [installSlateSvgEditor] = makeInlineElementPlugin(opts);
  config = installSlateSvgEditor(config);

  const { slate } = config.settings;

  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'slatesvg'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'slatesvg',
  ];

  return config;
}
