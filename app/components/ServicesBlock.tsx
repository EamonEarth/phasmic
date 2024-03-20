"use client";

import React, { useEffect, useRef, useState } from "react";
import { ubuntu, bungeeHairline } from "../../lib/fonts";
import { cn } from "@/lib/utils";
import ScrollingTicker from "./ScrollingTicker";
import {
  AudioWaveform,
  Clapperboard,
  Pencil,
  Projector,
  SearchIcon,
} from "lucide-react";
import Search from "./Search";

const adminContent = [
  "Grant Applications",
  "•",
  "Proofreading",
  "•",
  "Copywriting",
  "•",
  "Accounting",
  "•",
  "Project Structuring",
  "•",
  "Production",
  "•",
  "Report",
  "•",
  "Analysis",
  "•",
];

const soundContent = [
  "Sound Technicians",
  "•",
  "DJs",
  "•",
  "Session Musicians",
  "•",
  "Mixing",
  "•",
  "Mastering",
  "•",
  "Engineering",
  "•",
];

const visualsContent = [
  "Lighting Technicians",
  "•",
  "VJs",
  "•",
  "Graphic Design",
  "•",
  "Motion Graphics",
  "•",
  "Storyboarding",
  "•",
];

const filmContent = [
  "Cine- and Videographers",
  "•",
  "Animation Scanning",
  "•",
  "Analog Photography processing",
  "•",
  "Photographers",
  "•",
  "Video production",
  "•",
];

const allContentTitles: string[] = [
  ...adminContent,
  ...soundContent,
  ...visualsContent,
  ...filmContent,
].filter((_, i) => i % 2 == 0);
const contentArray = [
  {
    title: "Writing & Admin",
    scrollSpeed: "scrolling-content-slow",
    content: adminContent.filter((item, index) => index % 2 === 0),
    icon: Pencil,
  },
  {
    title: "Film & Photography",
    scrollSpeed: "scrolling-content-slow",
    content: visualsContent.filter((item, index) => index % 2 === 0),
    icon: Clapperboard,
  },
  {
    title: "Music & Audio",
    scrollSpeed: "scrolling-content",
    content: soundContent.filter((item, index) => index % 2 === 0),
    icon: AudioWaveform,
  },
  {
    title: "Lighting & Visuals",
    scrollSpeed: "scrolling-content",
    content: filmContent.filter((item, index) => index % 2 === 0),
    icon: Projector,
  },
];

interface ServicesBlockProps {
  className: string;
}

const ServicesBlock = ({ className }: ServicesBlockProps) => {
  const [showTooltip, setShowTooltip] = useState("");
  const [expandTooltip, setExpandTooltip] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [highlightedCategories, setHighlightedCategories] = useState([
    0, 0, 0, 0,
  ]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (searchInput) {
      const newState = contentArray.map((content) =>
        content.content.some((service) =>
          service.toLowerCase().includes(searchInput.toLowerCase())
        )
          ? 1
          : 0
      );
      setHighlightedCategories(newState);
    } else {
      setHighlightedCategories(Array(contentArray.length).fill(0));
    }
  }, [searchInput]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTooltipTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center bg-white md:pl-4 pr-0 rounded-t-xl">
      <div
        className={cn(
          " md:hidden uppercase tracking-wider font-bold text-center py-3 my-4 h-full w-[50%] border-gray-400 border-dashed  border  flex  items-center justify-center",
          ubuntu.className
        )}
      >
        Services
      </div>

      <div className={cn("grid grid-cols-10 items-center ", className)}>
        <p
          id="desktop services"
          className={cn(
            "hidden relative md:flex flex-col col-span-2 font-bold h-[90%] border-gray-400 border-dashed border-b-[1px] md:border-b-0 w-[50%] md:w-auto md:border-r-[1px] p-2 justify-center items-center uppercase tracking-widest",
            ubuntu.className
          )}
        >
          Services
          {showSearch ? (
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setShowSearch={setShowSearch}
            />
          ) : (
            <SearchIcon
              style={{ transition: "transform 0.3s ease-in-out" }}
              className="hover:scale-150 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
          )}
        </p>
        <div
          className={cn(
            "col-span-10 md:col-span-8 text-left md:py-8 pb-8 text-xs md:text-sm tracking-wide flex flex-col gap-y-4 relative",
            bungeeHairline.className
          )}
        >
          {contentArray.map((content, index) => (
            <span
              style={{ transition: "padding 0.8s" }}
              className={cn(showTooltip == content.title && "py-2")}
              onMouseOver={() => {
                clearTooltipTimeout();
                setTimeout(() => setShowTooltip(content.title), 200);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setShowTooltip("");
                }, 1000);
              }}
              key={content.title}
            >
              <ScrollingTicker
                Icon={content.icon}
                scrollingContentType={content.scrollSpeed}
                title={content.title}
                content={content.content}
                showTooltip={showTooltip}
                setShowTooltip={setShowTooltip}
                highlighted={highlightedCategories[index] === 1}
                searchInput={searchInput}
              />
            </span>
          ))}
          <p
            style={{ WebkitTextStroke: "0.5px black" }}
            className=" absolute bottom-2 right-2 w-full text-end pr-4 pt-3"
          >
            Tell us your needs and we&apos;ll find the right team for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesBlock;