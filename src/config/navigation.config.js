export const navigationConfig = [
  {
    id: 'installation',
    label: 'Installation',
    path: './installation.html',
  },
  {
    id: 'layout',
    label: 'Layout',
    children: [
      {
        id: 'aspect-ratio',
        label: 'aspect-ratio',
        path: './aspect-ratio.html',
      },
      {
        id: 'columns',
        label: 'columns',
        path: './columns.html',
      },
      {
        id: 'object-fit',
        label: 'object-fit',
        path: './object-fit.html',
      },
    ],
  },
  {
    id: 'spacing',
    label: 'Spacing',
    children: [
      {
        id: 'padding',
        label: 'padding',
        path: './padding.html',
      },
      {
        id: 'margin',
        label: 'margin',
        path: './margin.html',
      },
    ],
  },
  {
    id: 'size',
    label: 'Size',
    children: [
      {
        id: 'width',
        label: 'width',
        path: './width.html',
      },
      {
        id: 'height',
        label: 'height',
        path: './height.html',
      },
    ],
  },
];
