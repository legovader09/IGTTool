import * as React from 'react';
import { useState } from 'react';
import { IGTInstructionProps } from '../../../interfaces/IGTInstructionProps';

export const Instructions = ({ onStart, startingMoney, numberOfRounds }: IGTInstructionProps) => {
  const [isHiding, setIsHiding] = useState(false);

  const handleClick = () => {
    setIsHiding(true);

    setTimeout(() => {
      onStart();
    }, 250);
  };

  return (
    <section className={`col-12 p-3 mb-3 igt-game--instructions animate-visible ${isHiding ? 'hide' : ''}`}>
      <h3 className="mb-2">Instructions</h3>
      <p>
        In this task, you play a &quot;gambling&quot; game. You need to choose one
        of 4 buttons (A, B, C, or D) with the mouse.
      </p>
      <p>
        Each time, you can win some money, but you may sometimes
        also have to pay a fee to the bank. After each trial, you need to
        collect your money, which will adjust your pot of money.
      </p>
      <p>You start with a loan of <b>£{startingMoney}</b>.</p>
      <p>There are <b>{numberOfRounds}</b> trials (taking 5 minutes or so).</p>
      <p>
        Go on until it stops and see how much you
        can make on top the loan of <b>£{startingMoney}</b>.
      </p>
      <p><b>Press Start Game to begin. Good luck!</b></p>
      <button type="button" className="btn btn--secondary" onClick={handleClick}>Start Game</button>
    </section>
  );
};
