"use client";

import backgroundImg from "@/assets/images/backgroundVideo.png";
import * as cheerio from "cheerio";
import gsap from "gsap";
import Image from "next/image";
import { useEffect } from "react";
import AnimatedLink from "../common/AnimatedLink";

const HomeBanner = ({ bannerData }: { bannerData: any }) => {
    useEffect(() => {
        let heroSec = gsap.timeline({});
        heroSec.to(".kpt-hero-banner .kpt-vdo-col", {
            duration: 0.5,
            autoAlpha: 1,
        });

        heroSec.to(".kpt-inner-info-col > *", {
            duration: 0.5,
            autoAlpha: 1,
            transform: "translateY(0px)",
            stagger: {
                amount: 1,
            },
        });
    }, []);

    function extractTextFromHTML(htmlString: string) {
        const $ = cheerio?.load(htmlString ?? "");
        return $("body").text()?.trim();
    }
    return (
        <section className="kpt-hero-banner section">
            <div className="container">
                <div className="kpt-inner-wrap">
                    <div className="kpt-info-col">
                        <div className="kpt-inner-info-col">
                            <div className="kpt-banner-title">
                                <h1>{bannerData.Title !== "undefined" && bannerData.Title}</h1>
                            </div>
                            <div className="kpt-banner-info">
                                <p className="kpt-date" suppressHydrationWarning={true}>
                                    {bannerData?.Sub_Title}
                                </p>
                                <p>
                                    {bannerData?.bannerFeatureDescription !== "undefined" &&
                                        (extractTextFromHTML(bannerData?.bannerFeatureDescription).length > 100
                                            ? extractTextFromHTML(bannerData?.bannerFeatureDescription).slice(0, 100) +
                                              "..."
                                            : extractTextFromHTML(bannerData?.bannerFeatureDescription))}
                                </p>
                            </div>
                            <div className="kpt-btn-wrap" suppressHydrationWarning={true}>
                                {(bannerData?.Button_Link || bannerData?.Artist_Url) && (
                                    <AnimatedLink
                                        dynamicClass="kpt-btn btn-red"
                                        links={
                                            bannerData?.Artist_Url ? bannerData?.Artist_Url : bannerData?.Button_Link
                                        }
                                        linkTarget={bannerData?.Artist_Url ? "_blank" : "_self"}
                                    >
                                        {bannerData.Button_Text !== "undefined" && bannerData?.Button_Text}
                                    </AnimatedLink>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="kpt-vdo-col">
                        <div className="kpt-vdo-wrapper">
                            {bannerData?.Featured_Video ? (
                                <video width="1924" height="1924" controls={false} loop autoPlay muted playsInline>
                                    <source
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${bannerData?.Featured_Video}`}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                (bannerData?.Featured_Image && (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${bannerData?.Featured_Image}`}
                                        width={1924}
                                        height={1924}
                                        loading="eager"
                                        alt="Background"
                                    />
                                )) || (
                                    <Image
                                        src={backgroundImg}
                                        width={1924}
                                        height={1924}
                                        loading="eager"
                                        alt="Background"
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;
