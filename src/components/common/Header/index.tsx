"use client";
import { headerLogo, searchIcon, userIcon, whatsAppIconLogo } from "@/assets/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSettings } from "@/redux/slices/homeSlice";
import dayjs from "dayjs";
import "dayjs/locale/he";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchWrapper from "./SearchWrapper";
import "./style.css";

dayjs.locale("he");

const Header = () => {
    const { settingDetails } = useAppSelector((state) => state.home);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchInputFocus, setSearchInputFocus] = useState(false);
    const [scrollValue, setScrollValue] = useState(0);
    const searchInputRef = useRef(null);

    const dispatch = useAppDispatch();

    const handleSearchClick = () => {
        setShowSearch(true);
        document.body.style.overflow = "hidden";
    };

    useEffect(() => {
        setTimeout(() => {
            if (searchInputRef?.current) {
                (searchInputRef.current as HTMLInputElement).focus();
            }
        }, 200);
    }, [showSearch]);

    const handleCloseClick = () => {
        setShowSearch(false);
        document.body.style.overflow = "";
    };

    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 767);
    };
    useEffect(() => {
        checkScreenSize();
        const handleScroll = () => {
            const scroll = window.scrollY;
            const headerElement = (document.querySelector(".header") as HTMLElement) || null;
            if (scroll >= 100) {
                setScrollValue(scroll);
                headerElement.classList.add("fixed");
            } else {
                headerElement.classList.remove("fixed");
                setScrollValue(0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);
    useEffect(() => {
        dispatch(getSettings());
    }, []);
    const { artistId, artistSlug } = useParams();
    return (
        <header
            className={`header ${scrollValue > 100 ? "fixed" : ""} ${showSearch ? "open-search" : ""} ${
                artistId && artistSlug ? "light-header" : ""
            } ${isMobile && searchInputFocus ? "input-focused" : ""}`}
        >
            <div className="kpt-whatsapp hide-in-desktop">
                <a
                    href={settingDetails?.Phone ? `https://wa.me/${settingDetails?.Phone}` : "/"}
                    className="soc-link whatsapp-link"
                    target="_blank"
                >
                    {whatsAppIconLogo}
                </a>
            </div>
            <div className="inner-header-wrap">
                <div className="container">
                    <div className="kpt-inner-wrap">
                        <div className="kpt-left-col">
                            <div className="kpt-site-logo">
                                <Link href="/">{headerLogo}</Link>
                            </div>
                        </div>
                        <div className="kpt-right-col">
                            <div className="kpt-social-links">
                                <div className="kpt-whatsapp hide-in-mobile">
                                    <a
                                        href={settingDetails?.Phone ? `https://wa.me/${settingDetails?.Phone}` : "/"}
                                        target="_blank"
                                        className="soc-link whatsapp-link"
                                    >
                                        {whatsAppIconLogo}
                                    </a>
                                </div>
                                <div className="kpt-search">
                                    <div
                                        className="soc-link search-link"
                                        onClick={() => handleSearchClick()}
                                        style={{ cursor: "pointer" }}
                                        aria-hidden="true"
                                    >
                                        {searchIcon}
                                    </div>
                                    <SearchWrapper
                                        handleCloseClick={handleCloseClick}
                                        isMobile={isMobile}
                                        searchInputRef={searchInputRef}
                                        searchInputFocus={searchInputFocus}
                                        setSearchInputFocus={setSearchInputFocus}
                                    />
                                </div>
                            </div>
                            <div className="kpt-user-logo">
                                <Link href="#0">{userIcon}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
