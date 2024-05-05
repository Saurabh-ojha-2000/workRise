// import Image from "next/image";
// import { useRouter } from "next/router";
// import React from "react";

// function PopularServices() {
//   const router = useRouter();
//   const popularServicesData = [
//     {
//       name: "Ai Artists",
//       label: "Add talent to AI",
//       image: "/service1.png",
//     },
//     {
//       name: "Logo Design",
//       label: "Build your brand",
//       image: "/service2.jpeg",
//     },
//     {
//       name: "Wordpress",
//       label: "Customize your site",
//       image: "/service3.jpeg",
//     },
//     {
//       name: "Voice Over",
//       label: "Share your message",
//       image: "/service4.jpeg",
//     },
//     {
//       name: "Social Media",
//       label: "Reach more customers",
//       image: "/service5.jpeg",
//     },
//     { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
//     {
//       name: "Illustration",
//       label: "Color your dreams",
//       image: "/service7.jpeg",
//     },
//     { name: "Translation", label: "Go global", image: "/service8.jpeg" },
//   ];
//   return (
//     <div className="mx-20 my-16">
//       <h2 className="text-4xl mb-5 text-[#404145] font-bold">
//         Popular Services
//       </h2>
//       <ul className="flex flex-wrap gap-16">
//         {popularServicesData.map(({ name, label, image }) => {
//           return (
//             <li key={name} className="relative cursor-pointer" onClick={() => router.push(`/search?q=${name.toLowerCase()}`)} >
//               <div className="absolute z-10 text-white left-5 top-4">
//                 <span>{label}</span>
//                 <h6 className="font-extrabold text-2xl">{name}</h6>
//               </div>
//               <div className="h-80 w-72 ">
//                 <Image src={image} fill alt="service"   style={{borderRadius:"50px"}}/>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default PopularServices;

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Slider() {
  const carouselRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const firstCardRef = useRef(null);
  const firstCardWidthRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const arrowLeft = document.getElementById("left");
    const arrowRight = document.getElementById("right");
    const wrapper = document.querySelector(".wrapper");

    firstCardRef.current = carousel.querySelector(".card");
    firstCardWidthRef.current = firstCardRef.current.offsetWidth;

    let isDragging = false;
    let startX, startScrollLeft;

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;

      const newScrollLeft = startScrollLeft - (e.pageX - startX);

      if (
        newScrollLeft <= 0 ||
        newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth
      ) {
        isDragging = false;
        return;
      }

      carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
      if (window.innerWidth < 800) return;

      const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
      if (carousel.scrollLeft >= maxScrollLeft) return;

      timeoutIdRef.current = setTimeout(
        () => (carousel.scrollLeft += firstCardWidthRef.current),
        100
      );
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () =>
      clearTimeout(timeoutIdRef.current)
    );
    wrapper.addEventListener("mouseleave", autoPlay);

    arrowLeft.addEventListener("click", () => {
      carousel.scrollLeft -= firstCardWidthRef.current;
    });

    arrowRight.addEventListener("click", () => {
      carousel.scrollLeft += firstCardWidthRef.current;
    });

    return () => {
      document.removeEventListener("mouseup", dragStop);
      wrapper.removeEventListener("mouseenter", () =>
        clearTimeout(timeoutIdRef.current)
      );
      wrapper.removeEventListener("mouseleave", autoPlay);
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  const router = useRouter();
  const popularServicesData = [
    {
      name: "Ai Artists",
      label: "Add talent to AI",
      image: "/service1.png",
    },
    {
      name: "Logo Design",
      label: "Build your brand",
      image: "/service2.jpeg",
    },
    {
      name: "Wordpress",
      label: "Customize your site",
      image: "/service3.jpeg",
    },
    {
      name: "Voice Over",
      label: "Share your message",
      image: "/service4.jpeg",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];

  return (
    <div className="mx-20 my-16">
      <div className="wrapper">
        <h2 className="text-4xl mb-5 text-[#404145] font-bold">
          Popular Services
        </h2>
        <br />

        <i className="fa-solid fa-angle-left icon" id="left"></i>
        <ul ref={carouselRef} className="carousel flex flex-wrap gap-16">
          {popularServicesData.map(({ name, label, image }) => {
            return (
              <li
                key={name}
                className="relative cursor-pointer card"
                onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
              >
                <div className="absolute z-10 text-white left-5 top-4">
                  <span>{label}</span>
                  <h6 className="font-extrabold text-2xl">{name}</h6>
                </div>
                <div className="h-80 w-72 img">
                  <Image
                    src={image}
                    fill
                    alt="service"
                    style={{ borderRadius: "5px" }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <i className="fa-solid fa-angle-right icon" id="right"></i>
      </div>
    </div>
  );
}

export default Slider;
