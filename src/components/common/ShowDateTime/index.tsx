import { formateDateTime } from "@/helpers";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedLink from "../AnimatedLink";
import "./style.css";
import { ArtistShowDetail, ShowSlot, ShowVenueTime } from "@/app/interface/redux/artistSlice";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "swiper/css";
import AnimatedButton from "../AnimatedButton";
const ShowDateTime = ({ artistData, setPrice, setEventId }: { artistData: ArtistShowDetail }) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
    const activeEvent = searchParams.get("activeEvent");

    let showVenueTime: ShowVenueTime[] = [];
    const [selectedVenue, setSelectedVenue] = useState<number>(0);
    const [selectedTime, setSelectedTime] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [selectVenueIndex, setSelectVenueIndex] = useState<number>(0);
    const showNameSwiperRef = useRef<any>(null);
    const [text, setText] = useState("");

    artistData[0]?.attributes?.Events?.data.map((venueItems: any) => {
        if (dayjs(venueItems?.attributes?.Date_Time).isBefore(dayjs(), "day")) {
            return;
        }
        let venueName = venueItems?.attributes?.Location_Name;
        let slot = {
            day: dayjs(venueItems?.attributes?.Date_Time).locale("he").format("dddd"),
            time: dayjs(venueItems?.attributes?.Date_Time).format("DD.MM"),
            hour: dayjs(venueItems?.attributes?.Date_Time).format("HH:mm"),
            dateTime: formateDateTime(venueItems?.attributes?.Date_Time),
            Soldout: venueItems?.attributes?.Soldout,
            Event_ID: venueItems?.attributes?.Event_ID,
        };
        const existingVenue = showVenueTime.find((locationItem: ShowVenueTime) => locationItem.venueName === venueName);
        if (existingVenue) {
            existingVenue.slots.push(slot);
        } else {
            showVenueTime.push({
                venueName: venueName,
                price: `${venueItems?.attributes?.Min_Price || ""}`,
                slots: [slot],
            });
        }
    });
    showVenueTime.forEach((venue: any) => {
        venue.slots.sort((a: any, b: any) => {
            const dateA = dayjs(a.time, "DD.MM");
            const dateB = dayjs(b.time, "DD.MM");
            return dateA.valueOf() - dateB.valueOf();
        });
    });

    const handleActiveClass = (idx: number) => {
        if (activeEvent) {
            router.replace(`${pathName}`);
        }
        setTimeout(() => {
            setSelectedIndex(idx);
        }, 300);
    };

    const getVenueIndexByEventId = (venues: ShowVenueTime[], eventId: number) => {
        for (let i = 0; i < venues.length; i++) {
            let slotIndex = venues[i]?.slots?.findIndex((slotItems) => slotItems?.Event_ID == eventId);
            if (slotIndex !== -1) {
                return { venueIndex: i, slotIndex };
            }
        }
    };

    useEffect(() => {
        if (showVenueTime?.length > 0 && activeEvent) {
            const { venueIndex, slotIndex } = getVenueIndexByEventId(showVenueTime, activeEvent);
            if (venueIndex !== null || venueIndex !== undefined) {
                setSelectedVenue(venueIndex);
                setSelectedIndex(venueIndex);
                setSelectedTime(slotIndex);
            }
        }
    }, [activeEvent, showVenueTime, searchParams]);

    const handleActiveIndex = (idx: number) => {
        setSelectVenueIndex(idx);
        setTimeout(() => {
            setSelectedVenue(idx);
        }, 800);
    };

    useEffect(() => {
        if (showVenueTime?.length > 0) {
            setPrice(showVenueTime[selectedVenue]?.price);
            setEventId(selectedVenue);
        }
    }, [selectedVenue, showVenueTime]);
    const handleSlideClick = (index: number) => {
        if (showNameSwiperRef.current && showNameSwiperRef.current.swiper) {
            showNameSwiperRef.current.swiper.slideTo(index);
            handleActiveIndex(index);
            handleActiveClass(index);
        }
    };
    function extractTextFromHTML(htmlString: string) {
        const $ = cheerio?.load(htmlString ? htmlString : "");
        return $("body")?.text()?.trim();
    }
    useEffect(() => {
        setText(extractTextFromHTML(artistData[0]?.attributes?.Synopsis));
    }, [artistData]);

    return (
        <div className="text_box_wrap">
            <div className="btn_wrap">
                {artistData[0]?.attributes?.Events?.data?.every(
                    (v: { attributes: { Soldout: any } }) => v?.attributes?.Soldout
                ) ? (
                    <AnimatedButton dynamicClass="cta_btn">Sold out</AnimatedButton>
                ) : artistData[0]?.attributes?.Events?.data?.every(
                      (v: { attributes: { Avail_Ratio: number } }) => v?.attributes?.Avail_Ratio <div 0.15
                  ) ? (
                    <AnimatedLink
                        dynamicClass="cta_btn anim-btn"
                        links={`https://kupatlv-test/booking/features/${artistData[0]?.attributes?.Show_ID}`}
                    >
                        כרטיסים אחרונים
                    </AnimatedLink>
                ) : (
                    ""
                )}
            </div>
            <div className="inner-info">
                <div className="txt_content">
                    <h2 className="text-anim-wrap">
                        <span>{artistData[0]?.attributes?.Name}</span>
                    </h2>
                    <p className="small_txt text-anim-wrap" suppressHydrationWarning={true}>
                        <span suppressHydrationWarning={true}>{showVenueTime[selectedVenue]?.slots[0]?.dateTime}</span>
                    </p>
                    <p>{text?.length > 100 ? text + "..." : text}</p>
                </div>
                <div className="show-name-tab">
                    <div className="slider-wrapper">
                        <Swiper
                            slidesPerView={"auto"}
                            spaceBetween={16}
                            slideToClickedSlide={true}
                            pagination={{ clickable: true }}
                            loop={false}
                            dir="rtl"
                            className="show-nameSwiper"
                        >
                            {showVenueTime?.map((list: ShowVenueTime, index: any) => (
                                <SwiperSlide
                                    key={index}
                                    onClick={() => {
                                        handleSlideClick(index);
                                        handleActiveClass(index);
                                        handleActiveIndex(index);
                                    }}
                                    className={selectedIndex === index ? "active" : ""}
                                >
                                    <div className="nav">
                                        <h3 className="nav-link">{list?.venueName}</h3>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Swiper
                            key={selectedTime}
                            slidesPerView={1}
                            slideToClickedSlide={true}
                            pagination={{ clickable: true }}
                            initialSlide={selectedTime}
                            loop={false}
                            dir="rtl"
                            className="show-DayTimeSwiper"
                        >
                            {showVenueTime[selectedVenue]?.slots?.map((slot: ShowSlot, index: any) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className={selectedTime === index ? "active" : ""}
                                        onClick={() => {
                                            setSelectedTime(index);
                                            if (activeEvent) {
                                                router.replace(`${pathName}`);
                                            }
                                        }}
                                    >
                                        <div className="show-info">
                                            <p className="text-anim-wrap show-day" suppressHydrationWarning={true}>
                                                <span suppressHydrationWarning={true}>{slot?.day}</span>
                                            </p>
                                            <p className="text-anim-wrap show-time" suppressHydrationWarning={true}>
                                                <span suppressHydrationWarning={true}>{slot?.time}</span>
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        {showVenueTime?.length > 0 && (
                            <div className="shows-time-row">
                                <div className="show-double-time">
                                    <p className="text-anim-wrap" suppressHydrationWarning={true}>
                                        <span suppressHydrationWarning={true}>
                                            {showVenueTime[selectVenueIndex]?.slots[selectedTime]?.hour}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDateTime;
