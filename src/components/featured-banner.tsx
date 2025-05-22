"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Play, Film } from "lucide-react";
import { useRouter } from "next/navigation";

// Định nghĩa kiểu cho FeaturedMovie với thuộc tính idindatabase
type FeaturedMovie = {
  id: number;
  idindatabase: number; // id của phim trong database
  title: string;
  description: string;
  imageUrl: string;
  trailerUrl?: string;
};

// Dữ liệu mẫu với thuộc tính idindatabase được truyền trực tiếp
const featuredMovies: FeaturedMovie[] = [
  {
    id: 1,
    idindatabase: 57,
    title: "Yêu Từng Bước",
    description:
      "Gia đình của Mai rơi vào tuyệt vọng khi anh trai cô gặp tai nạn nghiêm trọng và cần một khoản tiền lớn để điều trị.",
    imageUrl: "/Enamorarse paso a paso.webp",
    trailerUrl: "https://example.com/trailer1",
  },
  {
    id: 2,
    idindatabase: 8,
    title: "Biến CEO Thành Bố",
    description:
      "Cô gái có buổi phỏng vấn đầu tiên và chửi CEO là ngốc, nhưng trong hàng trăm ứng viên, cô là người duy nhất được chọn",
    imageUrl: "/Haz Que El CEO Sea Papá.webp",
    trailerUrl: "https://example.com/trailer2",
  },
  {
    id: 3,
    idindatabase: 3,
    title: "Bạn Gái Phép Thuật",
    description:
      "Một buổi chiều yên tĩnh, một cô phù thủy nhỏ đang thực hành phép thuật để triệu hồi... đồ ăn nhẹ, nhưng vì lý do nào đó, cô đã sử dụng sai câu thần chú và suýt đưa một bà cụ tội nghiệp sang thế giới bên kia.",
    imageUrl: "/Mi Novia Mágica.webp",
    trailerUrl: "https://example.com/trailer3",
  },
];

export default function FeaturedBanner() {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    dotsClass: "slick-dots !bottom-5",
    customPaging: () => (
      <div className="w-2 h-2 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-all" />
    ),
  };

  
  return (
    <div className="relative w-full">
      <Slider
        {...settings}
        className="[&_.slick-slide]:relative [&_.slick-slide]:block [&_.slick-track]:flex"
      >
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="relative w-full">
            {/* Container chứa hình ảnh với chiều cao linh hoạt */}
            <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
              <Image
                src={movie.imageUrl || "/placeholder.svg"}
                alt={movie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                quality={90}
              />
              {/* Overlay gradient để cải thiện độ hiển thị */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
            </div>

            {/* Container chứa nội dung phim */}
            <div className="absolute inset-0 flex items-end pb-16 sm:pb-20 md:pb-24">
              <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 space-y-2 sm:space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  {movie.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[90%] md:max-w-[70%] lg:max-w-[50%] line-clamp-2 sm:line-clamp-3">
                  {movie.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href={`/movie/${movie.idindatabase}`}>
                    <Button
                      size="sm"
                      className="sm:text-base md:text-lg h-9 sm:h-10 md:h-11"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Xem ngay
                    </Button>
                  </Link>
                  <Link href={`/movie/${movie.idindatabase}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="sm:text-base md:text-lg h-9 sm:h-10 md:h-11"
                    >
                      <Film className="mr-2 h-4 w-4" />
                      Xem trailer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
