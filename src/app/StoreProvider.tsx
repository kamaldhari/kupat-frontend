"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export default function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>{children}</Provider>
        </I18nextProvider>
    );
}
