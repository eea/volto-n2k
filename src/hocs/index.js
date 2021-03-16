import React from 'react';

export function withScrollToHash(WrappedComponent) {
  return (props) => {
    const { timeout = 1000 } = props;
    const clock = React.useRef(null);
    const currentTime = React.useRef(0);
    React.useEffect(() => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        clock.current = setInterval(() => {
          const element = document.getElementById(id);
          if (element && document.readyState === 'complete') {
            element.scrollIntoView();
            clearInterval(clock.current);
            return;
          }
          if (currentTime.current > timeout) {
            clearInterval(clock.current);
            return;
          }
          currentTime.current += 100;
        }, 100);
      }

      return () => {
        clearInterval(clock.current);
      };
      /* eslint-disable-next-line */
    }, []);

    return <WrappedComponent {...props} />;
  };
}
