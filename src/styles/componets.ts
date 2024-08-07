import styled, { css  } from "styled-components";
import { woosh, boomTriangle, boomTriangleBig, boomDisc, boomCircle, shrinkjump } from "./animations";
import { AnimationProps, BgColor, Player, WinningLineProps } from "./models";

export const Wrapper = styled.div<BgColor>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw; 
  height: 100%; 
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ $bgColor }) => $bgColor || 'transparent'};
  position: relative;
  z-index: 100;
`;

export const Status = styled.div`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.font};
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const InputWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.font};
  }
  input {
    padding: 10px;
    border: 3px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
  }
`;

export const Grid = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 100px);
  grid-template-rows: repeat(${(props) => props.size}, 100px);
  position: relative;
`;

export const Cell = styled.div<Player>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 2px solid ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  user-select: none;
  position: relative;
  color: ${({ $player, theme }) =>
    $player === "X" ? theme.colors.primary : theme.colors.secondary};
`;

export const WinningLine = styled.div<WinningLineProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  display: ${(props) => (props.$line ? "block" : "none")};

  &::before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.colors.winningLine};
    height: 0.5rem;
    width: 100%;
    transition: all 0.5s ease-in-out;

    ${({ $line, $size }) => {
      if (!$line) return "";

      const start = $line[0];
      const end = $line[$line.length - 1];
      const rowStart = Math.floor(start / $size);
      const colStart = start % $size;
      const rowEnd = Math.floor(end / $size);
      const colEnd = end % $size;

      if (rowStart === rowEnd) {
        // Horizontal line
        return css`
          top: ${rowStart * 100 + 50}px;
          left: 0;
          width: ${$size * 100}px;
        `;
      } else if (colStart === colEnd) {
        // Vertical line
        return css`
          left: ${colStart * 100 + 50}px;
          top: 0;
          height: ${$size * 100}px;
          width: 0.5rem;
          transform: translateX(-50%);
        `;
      } else if (start % ($size + 1) === 0) {
        // Diagonal from top-left to bottom-right
        return css`
          top: 0;
          left: 0;
          width: ${Math.sqrt(2) * $size * 100}px;
          height: 0.5rem;
          transform: translateY(-50%) rotate(45deg);
          transform-origin: 0 50%;
        `;
      } else if (start % ($size - 1) === 0) {
        // Diagonal from top-right to bottom-left
        return css`
          top: 0;
          right: 0;
          width: ${Math.sqrt(2) * $size * 100}px;
          height: 0.5rem;
          transform: translateY(-50%) rotate(-45deg);
          transform-origin: top right;
        `;
      }
    }};
  }
`;

export const WordSpan = styled.span<AnimationProps>`
  cursor: pointer;
  display: inline-block;
  font-size: 100px;
  user-select: none;
  line-height: 0.8;
  transition: transform 0.2s ease-in-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${shrinkjump} 0.5s ease-in-out;
      transform-origin: bottom center;
    `}
`;


export const AnimationContainer = styled.div`
  display: block;
  position: relative;
  width: 800px;
  z-index: -1;
  max-width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const LightningContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  transform: translateY(-50%);
`;

export const Lightning = styled.div`
  position: absolute;
  display: block;
  height: 50px;
  width: 12px;
  border-radius: 12px;
  transform-origin: 6px 6px;
  animation: ${woosh} 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite
    alternate;

  &.white {
    color: ${({ theme }) => theme.colors.primary};;
    font-size: 50px;
  }

  &.red {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 50px;
    animation-delay: 0.2s;
  }
`;

export const BoomContainer = styled.div`
  position: absolute;
  display: flex;
  width: 80px;
  height: 80px;
  text-align: center;
  align-items: center;
  transform: translateY(-50%);
  left: 200px;
  top: -145px;

  &.second {
    left: 485px;
    top: 155px;
  }
`;

export const Shape = styled.div`
  display: inline-block;
  position: relative;
  opacity: 0;
  transform-origin: center center;

  &.triangle {
    width: 0;
    height: 0;
    border-style: solid;
    transform-origin: 50% 80%;
    animation: ${boomTriangle} 1s ease-out infinite;
    margin-left: -15px;
    border-width: 0 2.5px 5px 2.5px;
    border-color: transparent transparent #42e599 transparent;

    &.big {
      margin-left: -25px;
      border-width: 0 5px 10px 5px;
      border-color: transparent transparent #fade28 transparent;
      animation: ${boomTriangleBig} 1s ease-out infinite;
    }
  }

  &.disc {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #d15ff4;
    animation: ${boomDisc} 1s ease-out infinite;
  }

  &.circle {
    width: 20px;
    height: 20px;
    animation: ${boomCircle} 1s ease-out infinite;
    border-radius: 100%;
    margin-left: -30px;

    &.white {
      border: 1px solid white;
    }

    &.big {
      width: 40px;
      height: 40px;
      margin-left: 0px;

      &.white {
        border: 2px solid white;
      }
    }
  }

  &.triangle,
  &.circle,
  &.circle.big,
  &.disc {
    animation-delay: 0.38s;
    animation-duration: 3s;
  }

  &.circle {
    animation-delay: 0.6s;
  }
`;
