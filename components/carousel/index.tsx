import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Announcement } from "@/types/announcement.types";

interface CarouselProps {
  data: Announcement[];
}

export const Carousel = ({ data }: CarouselProps) => {
  const images =
    data?.map((item: Announcement) => {
      return {
        src: item.img,
        alt: item.title,
        path: item.url
          ? item.url.startsWith("http")
            ? item.url
            : `https://${item.url}`
          : undefined,
      };
    }) || [];
  return (
    <div className="w-full relative flex justify-center h-fit">
      <Splide
        aria-label="Announcement Images"
        className="max-w-[640px] h-[218px] md:h-[320px]"
        options={{
          type: "loop",
          autoplay: true,
          rewind: true,
          interval: 5000,
          perPage: 1,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide
            key={index}
            onClick={() =>
              image.path &&
              window.open(image.path, "_blank", "noopener noreferrer")
            }
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover h-[218px] md:h-[320px] w-full rounded-lg"
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
