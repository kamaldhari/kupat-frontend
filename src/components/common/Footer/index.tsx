"use client";
import { facebookIcon, instagramIcon, whatsAppIcon } from "@/assets/icons";
import Link from "next/link";
import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Image from "next/image";
import siteLogoDark from "@/assets/images/site-logo-dark.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSettings } from "@/redux/slices/homeSlice";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { settingDetails } = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSettings());
    }, []);
    useEffect(() => {
        let footerAnim = gsap.timeline({
            scrollTrigger: {
                trigger: "footer",
                end: "bottom bottom",
                scrub: 2,
                // markers: true,
            },
        });
        footerAnim.to("footer .inner-wrap > *", {
            duration: 1.5,
            autoAlpha: 1,
            transform: "translateY(0)",
        });
    });

    return (
        <footer>
            <div className="container">
                <div className="inner-wrap">
                    <div className="social-logo">
                        <div className="logo">
                            <Link href="/">
                                <Image src={siteLogoDark.src} alt="site-logo" width={98} height={27} />
                            </Link>
                        </div>
                        <ul className="social-link">
                            <li>
                                <Link
                                    href={settingDetails?.Phone ? `https://wa.me/${settingDetails.Phone}` : "/"}
                                    target="_blank"
                                >
                                    {whatsAppIcon}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={settingDetails?.Instagram ? `${settingDetails.Instagram}` : "/"}
                                    target="_blank"
                                >
                                    {instagramIcon}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={settingDetails?.Facebook ? `${settingDetails.Facebook}` : "/"}
                                    target="_blank"
                                >
                                    {facebookIcon}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="service-address">
                        <div className="service-box">
                            <p>
                                <strong>שירות לקוחות</strong>
                                <a
                                    href={
                                        settingDetails?.Customer_Service
                                            ? `tel:${settingDetails.Customer_Service}`
                                            : "/"
                                    }
                                    target="_blank"
                                >
                                    {settingDetails?.Customer_Service || ""}
                                </a>
                            </p>
                        </div>
                        <div className="address-box">
                            <strong>
                                <address>כתובתינו</address>
                            </strong>
                            <p>יחזקאל קויפמן 2 קומה 13</p>
                        </div>
                    </div>
                    <div className="footer-pages">
                        {settingDetails?.Footer_Link?.map((footerItem, i) => {
                            return (
                                <a href={footerItem?.Link || "/"} target="_blank" key={footerItem.Link}>
                                    {footerItem.Label || ""}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
