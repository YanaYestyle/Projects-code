import { keyframes } from "styled-components";

export const shrinkjump = keyframes`
  10%, 35% {
    transform: scale(1, 0.5) translate(0, 0);
  }
  
  45%, 50% {
    transform: scale(1) translate(0, -25px);
  }
  
  80% {
    transform: scale(1) translate(0, 0);
  }
`;

export const woosh = keyframes`
  0% {
    width: 12px;
    transform: translate(0px, 0px) rotate(-35deg);
  }
  15% {
    width: 50px;
  }
  30% {
    width: 12px;
    transform: translate(214px, -150px) rotate(-35deg);
  }
  30.1% {
    transform: translate(214px, -150px) rotate(46deg);
  }
  50% {
    width: 110px;
  }
  70% {
    width: 12px;
    transform: translate(500px, 150px) rotate(46deg);
  }
  70.1% {
    transform: translate(500px, 150px) rotate(-37deg);
  }
  85% {
    width: 50px;
  }
  100% {
    width: 12px;
    transform: translate(700px, 0) rotate(-37deg);
  }
`;

export const boomCircle = keyframes`
  0% { opacity: 0; }
  5% { opacity: 1; }
  30% { opacity: 0; transform: scale(3); }
  100% {}
`;

export const boomTriangleBig = keyframes`
  0% { opacity: 0; }
  5% { opacity: 1; }
  40% { opacity: 0; transform: scale(2.5) translate(50px, -50px) rotate(360deg); }
  100% {}
`;

export const boomTriangle = keyframes`
  0% { opacity: 0; }
  5% { opacity: 1; }
  30% { opacity: 0; transform: scale(3) translate(20px, 40px) rotate(360deg); }
  100% {}
`;

export const boomDisc = keyframes`
  0% { opacity: 0; }
  5% { opacity: 1; }
  40% { opacity: 0; transform: scale(2) translate(-70px, -30px); }
  100% {}
`;
