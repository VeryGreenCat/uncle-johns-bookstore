import { Carousel } from "antd";

const Banner = () => {
  const contentStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "100%",
    objectFit: "cover",
  };

  return (
    <div className="px-4 md:px-6 py-5">
      <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={3000}
        className="rounded-3xl overflow-hidden"
      >
        {[
          "https://dummyimage.com/1240x350/000/fff.png",
          "https://dummyimage.com/1240x350/ff0000/000000.png",
          "https://dummyimage.com/1240x350/304db3/e8d6e8.png",
          "https://dummyimage.com/1240x350/00c8ff/000000.png",
        ].map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={contentStyle}
              className="w-full h-auto md:h-[350px]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
