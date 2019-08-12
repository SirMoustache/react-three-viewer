import React, { useEffect, useRef, useState } from 'react';

type State = {
  counter: number;
};

export const useCounter = () => {
  let [{ counter }, setState] = useState<State>({
    counter: 0,
  });

  useEffect(() => {
    let interval = window.setInterval(() => {
      counter++;
      setState({ counter });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return counter;
};
