"use client";
import artistImage from "@/assets/images/album1.png";
import { formateDate } from "@/helpers";
import * as cheerio from "cheerio";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedButton from "../../AnimatedButton";
import AnimatedLink from "../../AnimatedLink";

import "./style.css";
interface TicketComponentProps {
    data: any;
    dynamicClass?: string;
}
const Ticket = ({ data, dynamicClass }: TicketComponentProps) => {
    const [selectedVenue, setSelectedVenue] = useState<number>(0);
    const [selectVenueIndex, setSelectVenueIndex] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [imageSrc, setImageSrc] = useState<string>(data?.showImage || artistImage);
    const showNameSwiperRef = useRef<any>(null);
    const router = useRouter();
    const [text, setText] = useState("");
    const handleActiveClass = (idx: number) => {
        setTimeout(() => {
            setSelectedIndex(idx);
        }, 300);
    };

    const handleActiveIndex = (idx: number) => {
        setSelectVenueIndex(idx);
        setTimeout(() => {
            setSelectedVenue(idx);
        }, 800);
    };

    const handleSlideClick = (index: number) => {
        if (showNameSwiperRef?.current?.swiper) {
            showNameSwiperRef.current.swiper.slideTo(index);
            handleActiveIndex(index);
            handleActiveClass(index);
        }
    };

    const handleImageClick = (slug: string, id: string) => {
        if (slug) {
            router.push(`/${slug}/${id ?? ""}`);
        } else {
            router.push("/");
        }
    };

    function extractTextFromHTML(htmlString: string) {
        const $ = cheerio?.load(htmlString ?? "");
        return $("body")?.text()?.trim();
    }

    const handleTimeRedirect = (idx: number) => {
        if (!data?.ArtistSlug) {
            return;
        }
        const url = `/${data?.ArtistSlug}/${data?.Feature_Id}/?activeEvent=${data?.showVenueTime[selectVenueIndex]?.slots?.[idx]?.Event_ID}&time=${data?.showVenueTime[selectVenueIndex]?.slots?.[idx]?.time}`;
        router.push(url);
    };

    useEffect(() => {
        setText(extractTextFromHTML(data?.Feature_Description));
    }, [data]);

    const getProcessedText = (text: string) => {
        if (text === "undefined") {
            return "";
        }
        if (text.length > 100) {
            return text.slice(0, 100) + "...";
        }
        return text;
    };
    const renderButton = () => {
        if (data?.allSoldOut) {
            return <AnimatedButton dynamicClass="cta_btn">Sold out</AnimatedButton>;
        }

        if (data?.isLessTicket) {
            const linkUrl = data?.Artist_Url ? `${data?.Artist_Url}` : `/${data?.ArtistSlug}/${data?.Feature_Id}`;
            const linkTarget = data?.Artist_Url ? "_blank" : "_self";

            return (
                <AnimatedLink dynamicClass="kpt-btn cta_btn" links={linkUrl} linkTarget={linkTarget}>
                    כרטיסים אחרונים
                </AnimatedLink>
            );
        }

        return null;
    };

    return (
        <section className="ticket-sec ticket-mob-sec section">
            <div className={`card_carousel_section ${dynamicClass}`}>
                <div className="container">
                    {
                        <div className="card_box_inner">
                            <div className="doodle circle-doodle tl-doodle"></div>
                            <div className="doodle circle-doodle tr-doodle doodle-border"></div>
                            <div className="doodle circle-doodle lb-doodle"></div>
                            <div className="doodle circle-doodle rb-doodle doodle-border"></div>
                            <div className="text_box_wrap">
                                <div className="inner-info">
                                    <div className="txt_content">
                                        {data?.featureCategoryName && <h2>{data?.featureCategoryName}</h2>}
                                        <span className="small_txt" suppressHydrationWarning={true}>
                                            {formateDate(data?.dateTime)}
                                        </span>
                                        <p>{getProcessedText(text)}</p>
                                    </div>
                                    <div className="show-name-tab" suppressHydrationWarning={true}>
                                        <Swiper
                                            slidesPerView={"auto"}
                                            spaceBetween={16}
                                            pagination={{ clickable: true }}
                                            loop={false}
                                            dir="rtl"
                                            className="show-nameSwiper"
                                            ref={showNameSwiperRef}
                                        >
                                            {data?.showVenueTime?.length > 0 &&
                                                data?.showVenueTime?.map((venue: any, index: number) => (
                                                    <SwiperSlide
                                                        key={venue}
                                                        onClick={() => handleSlideClick(index)}
                                                        className={selectedIndex === index ? "active" : ""}
                                                    >
                                                        <div className="nav">
                                                            <h3 className="nav-link">{venue?.venue}</h3>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                        </Swiper>
                                        <Swiper
                                            slideToClickedSlide={true}
                                            slidesPerView={"auto"}
                                            spaceBetween={16}
                                            pagination={{ clickable: true }}
                                            navigation={true}
                                            loop={false}
                                            dir="rtl"
                                            className="show-DayTimeSwiper"
                                            modules={[Navigation]}
                                        >
                                            {data?.showVenueTime[selectedVenue]?.slots?.length > 0 &&
                                                data?.showVenueTime[selectedVenue].slots.map(
                                                    (slot: any, slotIndex: number) => (
                                                        <SwiperSlide
                                                            key={slot}
                                                            className={
                                                                selectedIndex === selectVenueIndex ? "active" : ""
                                                            }
                                                            onClick={() => {
                                                                handleTimeRedirect(slotIndex);
                                                            }}
                                                        >
                                                            <div className="show-info" suppressHydrationWarning={true}>
                                                                <p className="show-day text-anim-wrap">
                                                                    <span suppressHydrationWarning={true}>
                                                                        {slot?.day}
                                                                    </span>
                                                                </p>
                                                                <p
                                                                    className="show-time text-anim-wrap"
                                                                    suppressHydrationWarning={true}
                                                                >
                                                                    <span suppressHydrationWarning={true}>
                                                                        {slot?.time}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                )}
                                        </Swiper>
                                    </div>
                                </div>
                                <div className="btn_wrap">{renderButton()}</div>
                            </div>
                            <div className="image_box_wrap">
                                <div className="img-wrapper">
                                    <div className="img-wrap">
                                        {data?.showImage && (
                                            <Image
                                                onClick={() => handleImageClick(data?.ArtistSlug, data?.Feature_Id)}
                                                src={imageSrc}
                                                alt="Ticket BG"
                                                width={1920}
                                                height={1080}
                                                onError={() => setImageSrc(artistImage.src)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Ticket;
