import React from 'react';

export default function withScreenSize(WrappedComponent) {
  return (props) => {
    const [screenHeight, setScreenHeight] = React.useState(null);
    const [screenWidth, setScreenWidth] = React.useState(null);

    const updateScreenSize = () => {
      if (__CLIENT__) {
        const screenHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight ||
          0;
        const screenWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth ||
          0;

        setScreenHeight(screenHeight);
        setScreenWidth(screenWidth);
      }
    };

    React.useEffect(() => {
      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
      return () => {
        window.removeEventListener('resize', updateScreenSize);
      };
      /* eslint-disable-next-line */
    }, []);

    return (
      <WrappedComponent
        {...props}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      />
    );
  };
}
