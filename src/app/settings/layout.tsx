import { Metadata } from "next";
import { Providers } from "../providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: '設定'
}

export default function settingsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
            {children}
        </>
    )
}