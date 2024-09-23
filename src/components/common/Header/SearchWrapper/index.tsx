import { SearchSuggestionData } from "@/app/interface/redux/homeSlice";
import { closeIcon, CloseIconSm, searchIconSm, siteLogoDark, whatsAppIconLogo } from "@/assets/icons";
import comyImg from "@/assets/images/Comy.png";
import grayImg from "@/assets/images/Gray.png";
import { useAppDispatch } from "@/redux/hooks";
import { searchArtist } from "@/redux/slices/homeSlice";
import { Debounce } from "@/utils";
import { Input } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/he";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import SearchSuggestion from "../SearchSuggestion";

const { Search } = Input;

interface SearchWrapperProps {
    handleCloseClick: () => void;
    isMobile: any;
    searchInputFocus: any;
    setSearchInputFocus: any;
    searchInputRef: any;
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({
    handleCloseClick,
    isMobile,
    searchInputFocus,
    setSearchInputFocus,
    searchInputRef,
}) => {
    const [searchData, setSearchData] = useState<SearchSuggestionData[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isSearch, setIsSearch] = useState<string>("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleSearchClick = () => {
        if (isMobile) {
            setSearchInputFocus(!searchInputFocus);
        }
    };

    const extractDateTime = (events: any) => {
        return (
            events?.map((eventItems: any) => ({
                eventId: eventItems?.attributes?.Event_ID,
                day: dayjs(eventItems?.attributes?.Date_Time).locale("he").format("dddd"),
                time: dayjs(eventItems?.attributes?.Date_Time).format("DD.MM"),
            })) || []
        );
    };

    const processShows = (shows: any) => {
        let dateTime: any = [];
        shows?.forEach((showItems: any) => {
            dateTime = [...dateTime, ...extractDateTime(showItems?.attributes?.Events?.data)];
        });
        return dateTime;
    };

    const processSearchItems = (searchItems: any) => {
        const dateTime = processShows(searchItems?.attributes?.Shows?.data);
        return {
            artistLink: `/${searchItems?.attributes?.Slug}/${searchItems?.attributes?.Shows?.data[0]?.attributes?.Show_ID}`,
            artist_Image: searchItems?.attributes?.Artist_Image?.data?.attributes?.url,
            artistSlug: searchItems?.attributes?.Slug,
            featureId: searchItems?.attributes?.featureId,
            featureName: searchItems?.attributes?.Name,
            dayDate: dateTime,
        };
    };

    const handleSearch = (value: string) => {
        if (value) {
            dispatch(searchArtist({ search: value })).then((res) => {
                setIsSearch(value);
                if (res?.payload) {
                    const data = res?.payload?.map(processSearchItems);
                    setSearchData(data);
                }
            });
        } else {
            setSearch("");
            setIsSearch("");
            setSearchData([]);
            handleSearchClick();
        }
    };

    const handleSearchChange = useCallback(
        Debounce((value: string) => {
            handleSearch(value);
        }, 300),
        [Debounce]
    );
    const handleClose = () => {
        handleCloseClick();
        setSearch("");
        setIsSearch("");
        setSearchData([]);
    };
    const handleSiteLogo = () => {
        router.push("/");
        handleCloseClick();
        setIsSearch("");
        setSearch("");
        setSearchData([]);
    };
    // Function to handle rendering logic
    function renderSearchContent() {
        if (searchData?.length > 0) {
            return searchData.map((searchItems: SearchSuggestionData, index: number) => (
                <SearchSuggestion
                    key={searchItems.featureId}
                    data={searchItems}
                    setSearch={setSearch}
                    setIsSearch={setIsSearch}
                    setSearchData={setSearchData}
                    handleCloseClick={handleCloseClick}
                />
            ));
        }

        if (isSearch) {
            return (
                <div className="no-data">
                    <p>No data available</p>
                </div>
            );
        }

        return null; // Default return if none of the above conditions are met
    }
    return (
        <div className="search-wrapper">
            <div className="container">
                <div className="inner-search">
                    <div className="search-top-bar">
                        <div className="search-right-col">
                            <div className="kpt-site-logo" onClick={handleSiteLogo} aria-hidden="true">
                                <Link href="/">{siteLogoDark}</Link>
                            </div>
                        </div>
                        <div className="search-input-wrap">
                            <div className="input-field">
                                <Search
                                    allowClear={{
                                        clearIcon: (
                                            <span
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSearchInputFocus(false);
                                                    setSearch("");
                                                    setIsSearch("");
                                                    setSearchData([]);
                                                }}
                                                aria-hidden="true"
                                            >
                                                {CloseIconSm}
                                            </span>
                                        ),
                                    }}
                                    enterButton={searchIconSm}
                                    ref={searchInputRef}
                                    value={search}
                                    onFocus={handleSearchClick}
                                    onBlur={() => setSearchInputFocus(false)}
                                    onChange={(e) => {
                                        setSearch(e?.target?.value);
                                        handleSearchChange(e?.target?.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="search-left-col">
                            <div className="kpt-whatsapp hide-in-mobile">
                                <a href="#0" className="soc-link whatsapp-link">
                                    {whatsAppIconLogo}
                                </a>
                            </div>
                            <div className="close-wrap">
                                <div
                                    onClick={() => handleClose()}
                                    className="close"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                >
                                    {closeIcon}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search-info-wrapper">
                        <div className="search-data">{renderSearchContent()}</div>
                    </div>
                </div>
                <div className="search-footer hide-in-desktop">
                    <div className="logo-box">
                        <div className="logo">
                            <Image src={comyImg.src} alt="comyImg" width={65} height={30} />
                        </div>
                        <div className="logo">
                            <Image src={grayImg.src} alt="grayImg" width={65} height={30} />
                        </div>
                    </div>
                    <div className="search-footer-link">
                        <Link href="#0">תמיכה</Link>
                        <Link href="#0">הגדרות</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchWrapper;
