import styled from "styled-components";
import Marquee from "react-fast-marquee";
import img01 from "../../../assets/marqueLogo/microsof.png";
import img02 from "../../../assets/marqueLogo/google.png";
import img03 from "../../../assets/marqueLogo/toyto.png";
import img04 from "../../../assets/marqueLogo/tesla.png";
import img05 from "../../../assets/marqueLogo/samsung.png";
import img06 from "../../../assets/marqueLogo/oracle.png";
import img07 from "../../../assets/marqueLogo/sonny.png";

const MarquePage = () => {
  const row1=[
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
  ]
  const row2=[
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
  ]

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 my-28 overflow-hidden">
      <div className="mb-10">
        <h1 className="text-4xl text-center font-semibold text-primary-foreground mb-2">
        Accelerate with the Best Teams
        </h1>
        <p className="text-center text-gray-300 text-sm">Empowering Collaboration for Unstoppable Growth</p>
      </div>

      {/* First Marquee */}
      <div className="w-full overflow-hidden mb-8 px-4">
        <Marquee speed={50} gradient={false}>
          {row1.map((el, index) => (
            <ImageWrapper key={`row1-${index}`}>
              <img
                src={el}
                alt={`Row 1 Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md "
              />
            </ImageWrapper>
          ))}
        </Marquee>
      </div>

      {/* Second Marquee */}
      <div className="w-full overflow-hidden mb-8 px-4">
        <Marquee speed={50} gradient={false} direction="right">
          {row2.map((el, index) => (
            <ImageWrapper key={`row2-${index}`}>
              <img
                src={el}
                alt={`Row 2 Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md "
              />
            </ImageWrapper>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarquePage;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 8rem;
  padding: 0.5rem;
`;
