import { SearchSuggestionData } from "@/app/interface/redux/homeSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import leftArrow from "@/assets/images/leftArrow.svg";
import "./style.css";

import gsap from "gsap";
import { useRouter } from "next/navigation";
interface SearchSuggestionProps {
    data: SearchSuggestionData;
    setIsSearch: React.Dispatch<React.SetStateAction<string>>;
    handleCloseClick: any;
    setSearchData: any;
    setSearch: any;
}
const SearchSuggestion = ({ data, handleCloseClick, setSearchData, setSearch, setIsSearch }: SearchSuggestionProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    useEffect(() => {
        gsap.to(".list-item-wrap", {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            ease: "power4.out",
        });
    }, [data]); // Trigger animation when data changes
    const handleDateTimeClick = (e: React.MouseEvent, idx: number) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveIndex(idx);
        handleCloseClick();
        setSearchData([]);
        setSearch("");
        setIsSearch("");
    };

    const handleArtistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleCloseClick();
        setSearchData([]);
        setSearch("");
        router.push(`${data?.artistLink}`);
        setIsSearch("");
    };
    return (
        <div className="list-item-wrap">
            <div className="list-item">
                <div className="artist-info">
                    <div className="artist-img" onClick={(e) => handleArtistClick(e)} aria-hidden="true">
                        {data?.artist_Image && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.artist_Image}`}
                                alt="search-artist"
                                width={80}
                                height={80}
                            />
                        )}
                    </div>
                    <div className="artist-data">
                        <h3>{data?.featureName}</h3>
                    </div>
                </div>
                <div className="artist-date">
                    <ul>
                        {data?.dayDate?.slice(0, 3)?.map((dayItems, index: number) => (
                            <li
                                className={activeIndex === index ? "active" : ""}
                                key={dayItems.day}
                                onClick={(e) => handleDateTimeClick(e, index)}
                                suppressHydrationWarning={true}
                                aria-hidden="true"
                            >
                                <p suppressHydrationWarning={true}>{dayItems?.time}</p>
                                <strong suppressHydrationWarning={true}>{dayItems?.day}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="list-arrow">
                    <div>
                        <Image src={leftArrow} alt="blue-arrow-prev" width={8} height={14} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSuggestion;
