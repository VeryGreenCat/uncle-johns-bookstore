import { Carousel } from "antd";

const Banner = () => {
  const contentStyle: React.CSSProperties = {
    aspectRatio: "4.5/1",
    width: "100%",
    color: "black",
    textAlign: "center",
    background: "#364d79",
    borderRadius: "0.5rem", // Apply border-radius
    overflow: "hidden", // Clip content within the border-radius
  };

  return (
    <>
      <div className="px-6 py-5 rounded-lg">
        <Carousel
          autoplay={{ dotDuration: true }}
          autoplaySpeed={3000}
          arrows
          infinite={true}
          dots={false}
          className="rounded-lg"
        >
          <div>
            <img
              src="https://dummyimage.com/100/000/fff.png"
              alt="Slide 1"
              style={contentStyle}
            />
          </div>
          <div>
            <img
              src="https://dummyimage.com/100/000/5158b8.png"
              alt="Slide 2"
              style={contentStyle}
            />
          </div>
          <div>
            <img
              src="https://dummyimage.com/100/d613d6/b853b6.png"
              alt="Slide 3"
              style={contentStyle}
            />
          </div>
          <div>
            <img
              src="https://dummyimage.com/100/19b04e/b853b6.png"
              alt="Slide 4"
              style={contentStyle}
            />
          </div>
        </Carousel>
      </div>
    </>
  );
};
export default Banner;
