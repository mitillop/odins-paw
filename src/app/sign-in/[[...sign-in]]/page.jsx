"use client";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Page() {
  const carouselImages = [
    {
      src: "/welcome/cat-dog.jpg",
      alt: "Mascotas saludables",
    },
    {
      src: "/welcome/cat-dog2.jpg",
      alt: "Cuidado para perros",
    },
    {
      src: "/welcome/cat.jpg",
      alt: "Salud felina",
    },
    {
      src: "/welcome/goldens.jpg",
      alt: "Nueva imagen",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Columna izquierda con imagen */}
      <div className="hidden md:flex md:w-1/2 bg-[var(--foreground)] items-center justify-center relative overflow-hidden">
        <div className="absolute top-10 left-10 right-10 text-left p-4 rounded-lg backdrop-blur-sm z-10">
          <h2 className="text-white text-2xl mb-2">Odin's Paw</h2>
          <p className="text-white">
            La mejor plataforma de atención personalizada para tu mascota.
          </p>
        </div>
        <div className="w-full h-full">
          <Slider {...settings} className="w-full h-full pt-50">
            {carouselImages.map((image, index) => (
              <div key={index} className="h-full w-full flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={350}
                    height={250}
                    className="object-contain rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div>
            <SignIn
              className="pl-50"
              appearance={{
                elements: {
                  card: "shadow-none",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
