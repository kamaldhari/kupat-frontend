"use client";
import ticketBG from "@/assets/images/outlinr-bg-new.png";
import ticketMobBG from "@/assets/images/outlinr-Mob-bg-new.png";
import { emailValidation, nameValidation } from "@/helpers/formValidation";
import { useAppDispatch } from "@/redux/hooks";
import { createNewsLetter } from "@/redux/slices/homeSlice";
import { Form, Input, message } from "antd";
import { useState } from "react";
import AnimatedAntButton from "../AnimatedAntButton";
import "./style.css";

const NewsLaterForm = ({
    title,
    subTitle,
    submitBtnText,
}: {
    title?: string;
    subTitle?: string;
    submitBtnText?: string;
}) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = (values: { Phone: string; Email: string }) => {
        setLoading(true);
        dispatch(createNewsLetter({ payload: values })).then((res) => {
            if (res.payload.attributes) {
                message.success("תודה שפנית אלינו");
                form.resetFields();
                setLoading(false);
            }
        });
    };

    return (
        <section className="outline-cta-section">
            <div className="container">
                <div className="outline-box-inner">
                    <div className="doodle circle-doodle lb-doodle"></div>
                    <div className="doodle circle-doodle rb-doodle"></div>
                    <div className="doodle circle-doodle tl-doodle"></div>
                    <div className="doodle circle-doodle tr-doodle"></div>
                    <div className="outline-box-wrap">
                        <div className="form-inner-info">
                            <div className="txt_content">
                                <h2>{title}</h2>
                                <p>{subTitle}</p>
                            </div>

                            <div className="form-wrap">
                                <Form form={form} onFinish={onFinish}>
                                    <div className="input-field-wrapper">
                                        <Form.Item
                                            className="input-field"
                                            name="Phone"
                                            rules={[{ required: true, validator: nameValidation }]}
                                        >
                                            <Input
                                                placeholder="טלפון"
                                                maxLength={10}
                                                onKeyDown={(e) => {
                                                    if (!/\d/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onPaste={(e) => {
                                                    const pasteData = e.clipboardData.getData("Text");
                                                    if (!/^\d+$/.test(pasteData)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onPressEnter={() => form.submit()}
                                            />
                                        </Form.Item>
                                        <span className="separator doodle">ו/או</span>
                                        <Form.Item
                                            className="input-field"
                                            name="Email"
                                            rules={[{ validator: emailValidation }]}
                                        >
                                            <Input placeholder="מייל" />
                                        </Form.Item>
                                    </div>
                                    <AnimatedAntButton
                                        dynamicClass="cta_btn btn-dark"
                                        htmlType="submit"
                                        isDisabled={loading}
                                    >
                                        {submitBtnText}
                                    </AnimatedAntButton>
                                </Form>
                            </div>
                        </div>

                        <div className="image_box_wrap">
                            <div className="img-wrapper">
                                <div className="img-wrap">
                                    <img
                                        className="hide-in-mobile"
                                        alt="Ticket BG"
                                        width="1920"
                                        height="1080"
                                        src={ticketBG.src}
                                    />
                                    <img
                                        className="hide-in-desktop"
                                        alt="Ticket BG"
                                        width="1080"
                                        height="1920"
                                        src={ticketMobBG.src}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default NewsLaterForm;
