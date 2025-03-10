"use client";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

const Banner = () => {
  const [banners, setBanners] = useState<string[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("book-images")
          .list("banners");
        if (error) throw error;

        const bannerUrls = data.map(
          (item) =>
            supabase.storage
              .from("book-images")
              .getPublicUrl(`banners/${item.name}`).data.publicUrl
        );

        setBanners(bannerUrls);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="md:px-6 py-5">
      <Carousel
        autoplay
        autoplaySpeed={3000}
        className="rounded-3xl overflow-hidden"
      >
        {banners.length > 0 ? (
          banners.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-48 md:h-72 object-cover"
              />
            </div>
          ))
        ) : (
          <div className="w-full h-48 md:h-72 flex items-center justify-center bg-gray-300">
            Loading...
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Banner;
