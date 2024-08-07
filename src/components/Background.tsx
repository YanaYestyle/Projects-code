import { AnimationContainer, LightningContainer, Lightning, BoomContainer, Shape } from "../styles/componets";

const AnimatedBackground = () => {
  return (
    <AnimationContainer>
      <LightningContainer>
        <Lightning className="white">X</Lightning>
        <Lightning className="red">0</Lightning>
      </LightningContainer>
      <BoomContainer>
        <Shape className="circle big white" />
        <Shape className="circle white" />
        <Shape className="triangle big yellow" />
        <Shape className="disc white" />
        <Shape className="triangle blue" />
      </BoomContainer>
      <BoomContainer className="second">
        <Shape className="circle big white" />
        <Shape className="circle white" />
        <Shape className="disc white" />
        <Shape className="triangle blue" />
      </BoomContainer>
    </AnimationContainer>
  );
};

export default AnimatedBackground;
