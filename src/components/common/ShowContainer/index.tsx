import { cameraIcon, clockIcon, costIcon, peopleIcon, showLengthIcon, showTypeIcon } from "@/assets/icons";
import "./style.css";
interface ShowInfoProps {
    about: {
        Camera: {
            Is_Show: boolean;
            Camera: string;
        };
        Price: {
            Is_Show: boolean;
            Price: string;
        };
        Door_Open: {
            Is_Show: boolean;
            Door_Open_Time: string;
        };
        Age: {
            Is_Show: boolean;
            Age_Type: string;
        };
        Time_Duration: {
            Is_Show: boolean;
            Time_Duration: string | null;
        };
        Categories: {
            Is_Show: boolean;
            Category_Name: string;
        };
    };
}

const ShowContainer = ({ about }: ShowInfoProps) => {
    return (
        <div className="kpt_icon_text_block">
            {about?.Camera?.Is_Show && (
                <div className="icon_txt_box">
                    <div className="icon">{cameraIcon}</div>
                    <div className="content">
                        <h4>{about?.Camera?.Camera}</h4>
                    </div>
                </div>
            )}

            {about?.Price?.Is_Show && (
                <div className="icon_txt_box">
                    <div className="icon">{costIcon}</div>
                    <div className="content">
                        <h4>
                            {about?.Price?.First_Price && `${about?.Price?.First_Price}-${about?.Price?.Last_Price}`}{" "}
                            ש״ח
                        </h4>
                    </div>
                </div>
            )}
            {about?.Door_Open?.Is_Show && (
                <div className="icon_txt_box">
                    <div className="icon">{clockIcon}</div>
                    <div className="content">
                        <h4>
                            <span>
                                {about?.Door_Open?.Door_Open_Time
                                    ? about.Door_Open.Door_Open_Time.split(":").slice(0, 2).join(":")
                                    : ""}
                            </span>
                            <br />
                            <span>פתיחת דלתות</span>
                        </h4>
                    </div>
                </div>
            )}

            {about?.Age?.Is_Show && (
                <div className="icon_txt_box">
                    <div className="icon">{peopleIcon}</div>
                    <div className="content">
                        <h4>{about?.Age?.Age_Type ? about?.Age?.Age_Type : "כל הגילאים"}</h4>
                    </div>
                </div>
            )}

            {about?.Time_Duration?.Is_Show && (
                <div className="icon_txt_box">
                    <div className="icon">{showLengthIcon}</div>
                    <div className="content">
                        <h4>
                            {about?.Time_Duration?.Time_Duration
                                ? `${Number(about?.Time_Duration?.Time_Duration) / 60} שעות`
                                : "8 שעות"}
                        </h4>
                    </div>
                </div>
            )}

            {about?.Categories?.Is_Show && (
                <div className="icon_txt_box">
                    <div className="icon">{showTypeIcon}</div>
                    <div className="content">
                        <h4>{about?.Categories?.Category_Name ? about?.Categories?.Category_Name : "רוק"}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowContainer;
