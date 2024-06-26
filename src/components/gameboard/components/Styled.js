import styled from "styled-components";

export const GameView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;

export const GameFieldView = styled.div`
  width: ${({ fieldSize, cellCount, space }) =>
    fieldSize + cellCount * space}px;
  max-width: 733px;
  height: ${({ fieldSize, cellCount, space }) =>
    fieldSize + cellCount * space}px;
  margin: 20px 0;
`;

export const SwitchView = styled.div`
  display: flex;
  width: 100%;
`;
