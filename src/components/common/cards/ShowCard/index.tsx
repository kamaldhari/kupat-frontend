"use client";

import gsap from "gsap";
import Image from "next/image";
import React from "react";
import { ShowCardData } from "../../../../app/interface/redux/homeSlice";
import AnimatedLink from "../../AnimatedLink";
import "./style.css";
interface ShowCardProps {
    data: ShowCardData;
    dynamicClass?: string;
}
const ShowCard = ({ data, dynamicClass }: ShowCardProps) => {
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotationY = ((x - centerX) / centerX) * 30;
        const rotationX = ((y - centerY) / centerY) * -30;

        gsap.to(".outline-cta-section .img-wrapper", {
            duration: 0.6,
            rotationY,
            rotationX,
            ease: "power1.out",
            transformPerspective: 1000,
        });
    };
    const handleMouseLeave = () => {
        gsap.to(".outline-cta-section .img-wrapper", {
            duration: 0.6,
            rotationY: 0,
            rotationX: 0,
            ease: "power1.out",
            transformPerspective: 1000,
            transformOrigin: "center",
        });
    };

    return (
        <section className="ticket-sec ticket-mob-sec section">
            <div className={`outline-cta-section ${dynamicClass}`}>
                <div className="container">
                    <div className="outline-box-inner" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <div className="doodle circle-doodle lb-doodle"></div>
                        <div className="doodle circle-doodle rb-doodle"></div>
                        <div className="doodle circle-doodle tl-doodle"></div>
                        <div className="doodle circle-doodle tr-doodle"></div>
                        <div className="outline-box-wrap">
                            <div className="image_box_wrap">
                                <div className="img-wrapper">
                                    <div className="img-wrap s">
                                        {data.Image && (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.Image}`}
                                                alt="Gift Card Image"
                                                width={360}
                                                height={247}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="inner-info">
                                <div className="txt_content">
                                    <h2>{data.Title}</h2>
                                    <small suppressHydrationWarning={true}>{data.Sub_Title}</small>
                                    <p>{data.Description}</p>
                                </div>
                                <div className="btn_wrap" suppressHydrationWarning={true}>
                                    <AnimatedLink dynamicClass={"cta_btn btn-dark"} links={data?.Button_Link}>
                                        {data?.Button_Text}
                                    </AnimatedLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowCard;
