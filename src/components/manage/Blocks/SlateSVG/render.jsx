import React from 'react';

export const SlateSvgElement = ({
  attributes,
  children,
  element,
  mode,
  ...rest
}) => {
  return mode === 'view' ? (
    <>
      <svg width="100%" height="100%" viewBox="0 0 280 280">
        <foreignObject
          width="100%"
          height="100%"
          position="absolute"
          x="0"
          y="0"
        >
          <div
            {...attributes}
            classname="slate-svg"
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              position: 'absolute',
              width: '100%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </>
  ) : (
    <span {...attributes} className="slate-svg slate-svg-edit">
      {children}
    </span>
  );
};
