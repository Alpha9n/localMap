import Heading from "@/components/Heading";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export default function Settings() {
    return (
        <main className="h-fit md:py-10">
            <div className="md:mx-auto md:rounded-xl md:w-5/6 h-full bg-foreground-200 py-3 px-5">
                <Heading
                    level={1} text={"環境設定"}
                />
                <div className="px-5">
                    <div className="w-full my-2">
                        <h2>テーマ設定</h2>
                        <ThemeSwitch/>
                    </div>
                    <div className="w-full my-2">
                        <h2>GoogleMap設定</h2>
                    </div>
                </div>
            </div>
        </main>
    );
};