import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";

import { HIDDEN_CELL_HIDE, HIDDEN_CELL_SHOW } from "../game.reducer";
import { Cell } from "./Cell";
import { WRONG_GUESSED_CELL, CORRECT_GUESSED_CELL } from "../game.utils";
import { ClientEventSystem } from "../../../client-events";

import PickSound from "../../../assets/sounds/effects/pick.m4a";
import useAudio from "../../../custom-hook/useAudio";

const FieldView = styled.div`
  width: 100%;
  max-width: 733px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0;
  opacity: ${({ animationState }) => animationState};
  transform: scale(${({ animationState }) => animationState});
  transition: opacity 0.2s ease, transform 0.3s ease;
`;

export const Field = memo(function Field({
  fieldSize = 0,
  cellCount = 0,
  space = 0,
  time = 700,
  field = [],
  hiddenCells = [],
  level = 1,
  showHidden = false,
  dispatch,
  resetLevel,
  visible,
}) {
  const cellSize = fieldSize / cellCount - space;

  const [playPickSound] = useAudio(PickSound);

  // const { gameField, onCellClick } = useGameField(
  //   field,
  //   hiddenCells,
  //   updateLevel
  // );

  const [gameField, setGameField] = useState(field);
  const [cellId, setCellId] = useState();

  function onCellClick({ target }) {
    playPickSound();
    const id = Number(target.id);
    setCellId(id);

    ClientEventSystem?.socket?.emit(ClientEventSystem.EventTypes.ON_CHOOSE_CELL, id);
    // console.log("Sent", id)

    if (hiddenCells.includes(id)) {
      setGameField(gameField.map((e, i) =>
        i === id ? CORRECT_GUESSED_CELL : e
      ));
    } else {
      setGameField(gameField.map((e, i) =>
        i === id ? WRONG_GUESSED_CELL : e
      ));
    }
  }

  useEffect(
    () => {
      dispatch({ type: HIDDEN_CELL_SHOW });
      setTimeout(() => dispatch({ type: HIDDEN_CELL_HIDE }), time);
    },
    [level]
  );

  useEffect(() => {
    ClientEventSystem?.socket?.on(ClientEventSystem.EventTypes.END_SESSION_GAME, (res) => {
      // console.log('END_SESSION_GAME' , cellId);
      setTimeout(resetLevel, 700);
    })
  }, [])

  return (
    <FieldView
      animationState={visible ? 1 : 0}
      onClick={!showHidden ? onCellClick : null}
    >
      {gameField.map((cellValue, i) => (
        <Cell
          size={cellSize}
          cellCount={cellCount}
          space={space}
          key={i}
          id={i}
          value={cellValue}
          forceShowHidden={showHidden}
        />
      ))}
    </FieldView>
  );
});
