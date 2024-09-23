"use client";
import { ArtistData } from "@/app/interface/redux/homeSlice";
import { prevArrow } from "@/assets/icons";
import "@/components/common/Sliders/style.css";
import dayjs from "dayjs";
import Link from "next/link";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Images from "../../Image";

interface ArtistSliderPorps {
    data: ArtistData[];
    swiperTitle: string;
    swiperDescription?: string;
    type: string;
}

const ArtistSlider = ({ data, swiperTitle, swiperDescription, type }: ArtistSliderPorps) => {
    const handleImageClick = (artistType: string, slug: string, id: any, presentationId: string) => {
        if (artistType === "comy") {
            return `${process.env.NEXT_PUBLIC_COMMY_TICKET}/booking/features/${id}?prsntId=${presentationId}&display=list#map`;
        } else if (artistType === "gray") {
            return `${process.env.NEXT_PUBLIC_GRAY_TICKET}/booking/features/${id}?prsntId=${presentationId}&display=list#map`;
        } else if (artistType === "venue") {
            return slug ? `/${slug}/${id ?? ""}` : "#";
        } else {
            return "#";
        }
    };

    const handleTitleClick = (sties: string) => {
        if (type === "venue") {
            window.open(`/${data[0]?.venueSlug}`, "_self");
        }
    };

    const getClassName = (type: string) => {
        if (type === "gray") {
            return "purple-txt";
        } else if (type === "comy") {
            return "yellow-txt";
        } else {
            return "";
        }
    };

    return (
        <section className="comm-slider-sec">
            <div className="container">
                <div className="sec-title">
                    <h2 onClick={() => handleTitleClick(type)} aria-hidden="true">
                        <strong>
                            <span>{swiperDescription}</span>
                            <span className={getClassName(type)}>{swiperTitle}</span>
                        </strong>
                        <span className="icon">{prevArrow}</span>
                    </h2>
                </div>
                <div className="comm-slider-wrapper">
                    <Swiper
                        freeMode={true}
                        slidesPerView={5}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            392: {
                                slidesPerView: 2,
                            },
                            768: {
                                freeMode: false,
                                slidesPerView: 4,
                            },
                            991: {
                                freeMode: false,
                                slidesPerView: 5,
                            },
                        }}
                        modules={[FreeMode]}
                        className="artistSwiper"
                        dir="rtl"
                    >
                        {data?.length > 0 &&
                            data?.map((items) => {
                                return (
                                    <SwiperSlide key={items.Feature_ID} className="item">
                                        <div className="carousel__item">
                                            <div className="item-card">
                                                <Link
                                                    href={
                                                        handleImageClick(
                                                            type,
                                                            items?.artist_Slug,
                                                            items?.Feature_Id,
                                                            items?.presentationId
                                                        ) || "/"
                                                    }
                                                    className="img-wrapper"
                                                    target={type !== "venue" ? "_blank" : "_self"}
                                                >
                                                    <Images item={items} />
                                                </Link>
                                                <div className="card-body">
                                                    <h3>{items?.Feature_Name}</h3>
                                                    <p className="artist-info">
                                                        <span className="artist-location">{items?.locationName}</span>
                                                        <span
                                                            className="artist-datedayhour"
                                                            suppressHydrationWarning={true}
                                                        >
                                                            {items?.description
                                                                ? `${dayjs(items?.description)
                                                                      .locale("he")
                                                                      .format("dddd")} ${dayjs(
                                                                      items?.description
                                                                  ).format("DD.MM")}`
                                                                : ""}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
export default ArtistSlider;
