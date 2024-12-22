"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";

export default function TopContributers() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
     <div className="fixed top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/bgvid.mp4" type="video/mp4" />
        </video>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid  place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center rounded-full h-6 w-6 gap-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex  items-center justify-between  p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full flex flex-col gap-8 my-10">
      <div className="flex flex-col justify-center items-center">
      <h1 className="mt-4 text-black text-2xl font-semibold text-center bg-gradient-to-r from-orange-400 via-white to-green-400 rounded-md min-w-[130px] p-1 px-2">
          Top Contributers
        </h1>
      </div>
  {cards.map((card, index) => (
    <motion.div
      layoutId={`card-${card.title}-${id}`}
      key={`card-${card.title}-${id}`}
      onClick={() => setActive(card)}
      className="p-6 flex flex-col md:flex-row justify-between items-center bg-gray-500/50 shadow-lg transition-transform transform hover:scale-105 rounded-xl cursor-pointer"
    >
      <div className="flex gap-6 flex-col md:flex-row">
        <motion.div layoutId={`image-${card.title}-${id}`}></motion.div>
        <div className="">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className="font-semibold text-white text-center md:text-left text-xl"
          >
            {card.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${card.description}-${id}`}
            className="text-white text-center md:text-left text-sm"
          >
            {card.description}
          </motion.p>
        </div>
      </div>
      <motion.button
        layoutId={`button-${card.title}-${id}`}
        className="px-5 py-3 text-sm rounded-full font-bold bg-black text-green-600 hover:bg-white-400 hover:text-white mt-4 md:mt-0 transition-colors duration-300"
      >
        {card.ctaText}
      </motion.button>
    </motion.div>
  ))}
</ul>

    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Nashik",
    title: "Anand Katkade",
    src: "https://www.linkedin.com/in/siddhesh-patole-b1b365259/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B6BvLtJJYTiqxCXEXz0ZvXQ%3D%3D",
    ctaText: "50000 INR",
    ctaLink: "",
    content: () => {
      return <p>
        Contributed to <span className="font-semibold">Captian Vikram Batra</span>
      </p>;
    },
  },
  {
    description: "Manchar",
    title: "Sahil Kale",
    src: "https://www.linkedin.com/in/siddhesh-patole-b1b365259/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B6BvLtJJYTiqxCXEXz0ZvXQ%3D%3D",
    ctaText: "40000 INR",
    ctaLink: "",
    content: () => {
      return <p>Contributed to <span className="font-semibold">Captian Vikram Batra</span></p>;
    },
  },
  {
    description: "Nashik",
    title: "Kamlesh Pawar",
    src: "https://www.linkedin.com/in/siddhesh-patole-b1b365259/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B6BvLtJJYTiqxCXEXz0ZvXQ%3D%3D",
    ctaText: "30000 INR",
    ctaLink: "",
    content: () => {
      return <p>Contributed to <span className="font-semibold">Captian Vikram Batra</span></p>;
    },
  },
  {
    description: "Nashik",
    title: "Abhishek Dangale",
    src: "https://www.linkedin.com/in/siddhesh-patole-b1b365259/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B6BvLtJJYTiqxCXEXz0ZvXQ%3D%3D",
    ctaText: "25000 INR",
    ctaLink: "",
    content: () => {
      return <p>Contributed to <span className="font-semibold">Captian Vikram Batra</span></p>;
    },
  },
  {
    description: "Pune",
    title: "Siddhesh Patole",
    src: "https://www.linkedin.com/in/siddhesh-patole-b1b365259/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B6BvLtJJYTiqxCXEXz0ZvXQ%3D%3D",
    ctaText: "20000 INR",
    ctaLink: "",
    content: () => {
      return <p>Contributed to <span className="font-semibold">Captian Vikram Batra</span></p>;
    },
  },
];
