import React, { useState, useEffect, useRef } from 'react';
import style from './ButtonCounter.module.css';

export const ButtonCounter = ({ init = 0, cb, id, max }) => {
  const inputNumber = useRef();
  const [counter, setCounter] = useState(init);

  useEffect(() => {

    if(init > max){
      setCounter(max)
      cb(max, id);
    }

    cb(counter, id);
    inputNumber.current.value = counter;
  }, [counter]);

  return (
    <div className={style.wrapper}>
      <span
        className={style.minus}
        onClick={() => setCounter(state => (state <= 1 ? state : --state))}
      >
        -
      </span>
      <input
        ref={inputNumber}
        className={style.inputNumber}
        onChange={({ target }) => {
          const num = Number(target.value)
          num && num >= 1 && num <= max
            ? setCounter(Number(target.value))
            : (target.value = counter);
        }}
      />
      <span
        className={style.plus}
        onClick={() => setCounter(state => (state >= max ? state : ++state))}
      >
        +
      </span>
    </div>
  );
};
