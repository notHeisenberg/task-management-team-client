import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import img01 from "../../../assets/background5.jpg";
import { FaQuoteLeft } from "react-icons/fa";

const Review = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Timer state to control countdown
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time) => {
    // Update the countdown timer
    setTimeLeft(Math.ceil(time / 1000));
  };

  const onSlideChange = () => {
    // Reset the timer when the slide changes
    setTimeLeft(0);
  };

  const reviews = [
    {
      quote: "Awesome Coding",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo tempore corporis tempora fuga ad autem error soluta. \
        Aenean venenatis ligula a ex tristique, et varius erat placerat. Integer sodales libero eget nisi tincidunt, nec consequat \
        lacus dignissim. Fusce malesuada velit vel ligula auctor, eget pharetra felis luctus. Nam eget risus felis. Sed vel magna \
        et velit ultrices fermentum. Proin auctor justo in arcu sodales, a feugiat felis faucibus. Duis sagittis faucibus justo, \
        ut suscipit ex vestibulum id. Cras nec purus lacus. Integer nec tristique orci. Nam id massa a eros interdum dapibus. \
        Etiam in lectus vitae justo dictum feugiat a sit amet libero. Phasellus scelerisque ligula ac leo accumsan, eu pharetra \
        metus porttitor. Suspendisse id justo vitae nisl vehicula convallis non sit amet arcu.",
      rating: 4,
      name: "John Doe",
      image: img01,
    },
    {
      quote: "Great Support",
      review:
        "Hic culpa eos fugit, veritatis quo placeat modi temporibus quis, earum nobis provident libero tenetur. \
        Vivamus lacinia eros ut nisi congue, in condimentum ligula vestibulum. Curabitur vel neque a felis malesuada \
        fermentum a non lorem. Mauris auctor bibendum turpis, quis dignissim justo faucibus non. Nullam congue urna id \
        purus convallis, vel sodales est pharetra. Praesent accumsan luctus libero, non tempus erat eleifend et. Duis ut \
        velit justo. Sed fermentum neque non justo sagittis ultrices. Donec pharetra risus eget arcu tempor, sit amet \
        ultrices ligula vehicula. Aenean et sapien eu justo hendrerit tincidunt non non arcu. Cras tincidunt vehicula nunc \
        eget rhoncus. Nulla aliquet augue a orci feugiat, et sodales elit posuere. Proin in sem et quam blandit dignissim.",
      rating: 5,
      name: "Jane Smith",
      image: img01,
    },
    {
      quote: "Exceptional Design",
      review:
        "Molestias adipisci mollitia similique neque esse ratione eos reprehenderit sint. Ut auctor erat sed arcu feugiat \
        ullamcorper. Duis vel dapibus sem. Mauris interdum purus at volutpat malesuada. Pellentesque cursus felis eget ante \
        vehicula, ac pharetra augue viverra. Suspendisse eget tortor suscipit, faucibus turpis sed, luctus velit. Nam eget \
        neque sed erat ultrices aliquam. Aenean interdum convallis ligula, nec vulputate nisi volutpat a. Integer sagittis, \
        nisi sit amet vehicula dapibus, justo nunc dignissim justo, et dignissim felis ligula vitae enim. Sed ac nibh ac ex \
        finibus iaculis. Donec suscipit id tortor a fringilla. Vestibulum sit amet bibendum urna, nec dictum mi. Aliquam erat \
        volutpat. Mauris sodales congue felis ut vehicula. Suspendisse malesuada dolor vel dolor posuere, eget tempor ipsum ultricies.",
      rating: 5,
      name: "Emily Johnson",
      image: img01,
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}  // Update timer
        onSlideChange={onSlideChange}  // Reset timer on slide change
        className="mySwiper w-3/4"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="border p-6 rounded space-y-3">
              <div className="flex items-end">
                <FaQuoteLeft className="text-7xl" />
                <h3 className="text-2xl font-bold">{review.quote}</h3>
              </div>
              <p>{review.review}</p>
              <p className="flex items-center gap-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>&#9733;</span> // Star icon
                ))}
              </p>
              <div className="flex justify-between items-center gap-3">
                <div className="flex gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={review.image}
                    alt={review.name}
                  />
                  <div>
                    <h3 className="font-semibold">Person Name</h3>
                    <p>{review.name}</p>
                  </div>
                </div>
                {/* Autoplay countdown */}
                <div
                  className="autoplay-countdown w-12 h-12 flex justify-center items-center text-center font-bold text-lg bg-gray-600  rounded-full"
                >
                  <span
                    ref={progressContent}
                    className="text-white"
                  >
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
