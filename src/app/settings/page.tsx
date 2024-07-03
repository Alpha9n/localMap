'use client';
import Heading from "@/components/Heading";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import React from "react";

export type MapTypeId = 'roadmap' | 'hybrid' | 'satellite' | 'terrain';

export interface MapOpts {
    mapTypeControl:     boolean;
    selectedMapType:    MapTypeId | string;
    zoomControl:        boolean;
    streetViewControl:  boolean;
    fullscreenControl:  boolean;
}

interface CustomizableMapOptions extends MapOpts {
    setMapTypeControl:      React.Dispatch<React.SetStateAction<boolean>>;
    setMapType:             React.Dispatch<React.SetStateAction<MapTypeId|string>>;
    setZoomControl:         React.Dispatch<React.SetStateAction<boolean>>;
    setStreetViewControl:   React.Dispatch<React.SetStateAction<boolean>>;
    setFullscreenControl:   React.Dispatch<React.SetStateAction<boolean>>;
}

const mapTypeList = [
    {mapTypeId: 'roadmap', jpName: 'デフォルト', description: 'このマップ タイプは通常の市街地図を表示します。'},
    {mapTypeId: 'hybrid', jpName: '航空写真(主要道路付き)', description: 'このマップ タイプは、航空写真上に主要な道路の透明なレイヤを表示します。'},
    {mapTypeId: 'satellite', jpName: '航空写真', description: 'このマップ タイプは航空写真を表示します。'},
    {mapTypeId: 'terrain', jpName: '地形図', description: 'このマップ タイプは地形や樹木などの地形的特徴を持つ地図を表示します。'}
]

export default function Settings() {
    const {value, setValueAndStorage} = useLocalStorage('settings', '{"mapTypeControl":false,"selectedMapType":"roadmap","zoomControl":true,"streetViewControl":false,"fullscreenControl":false}');

    let storage: MapOpts = JSON.parse(value);

    const [mapTypeControl, setMapTypeControl] = React.useState<boolean>(storage.mapTypeControl);
    const [selectedMapType, setMapType] = React.useState<MapTypeId|string>(storage.selectedMapType);
    const [zoomControl, setZoomControl] = React.useState<boolean>(storage.zoomControl);
    const [streetViewControl, setStreetViewControl] = React.useState<boolean>(storage.streetViewControl);
    const [fullscreenControl, setFullscreenControl] = React.useState<boolean>(storage.fullscreenControl);

    React.useEffect(() => {
        storage = JSON.parse(value);
        setValueAndStorage(JSON.stringify({mapTypeControl, selectedMapType, zoomControl, streetViewControl, fullscreenControl}));
    }, [mapTypeControl, selectedMapType, zoomControl, streetViewControl, fullscreenControl, setValueAndStorage, value]);

    return (
        <main className="h-[90%] md:py-10">
            <div className="md:mx-auto md:rounded-xl md:w-5/6 h-full bg-foreground-50 py-5 px-5">
                <Heading
                    level={1} text={"環境設定"}
                />
                <div className="px-5 flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-6">
                        <h2>テーマ設定</h2>
                        <ThemeSwitch/>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <h2>GoogleMap設定</h2>
                        <MapSettings 
                            mapTypeControl={mapTypeControl}
                            setMapTypeControl={setMapTypeControl}
                            selectedMapType={selectedMapType}
                            setMapType={setMapType}
                            zoomControl={zoomControl}
                            streetViewControl={streetViewControl}
                            setZoomControl={setZoomControl}
                            setStreetViewControl={setStreetViewControl} 
                            setFullscreenControl={setFullscreenControl} 
                            fullscreenControl={fullscreenControl}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};


function MapSettings({
        mapTypeControl, 
        setMapTypeControl, 
        selectedMapType, 
        setMapType, 
        setStreetViewControl, 
        setZoomControl, 
        streetViewControl, 
        zoomControl,
        fullscreenControl,
        setFullscreenControl
    }: CustomizableMapOptions) {
    return (
        <div className="flex flex-col gap-4">
            <Switch
                isSelected={mapTypeControl}
                onValueChange={setMapTypeControl}
            >
                マップタイプ選択ボタン
            </Switch>
            <Switch
                isSelected={streetViewControl}
                onValueChange={setStreetViewControl}
            >
                ストリートビュー
            </Switch>
            <Switch
                isSelected={zoomControl}
                onValueChange={setZoomControl}
            >
                ズームボタン
            </Switch>
            <Switch
                isSelected={fullscreenControl}
                onValueChange={setFullscreenControl}
            >
                フルスクリーンボタン
            </Switch>
            <Select
                label={'マップタイプ'}
                defaultSelectedKeys={[selectedMapType]}
                onChange={(e) => setMapType(e.target.value)}
            >
                {mapTypeList.map((item) => {
                    return (<SelectItem key={item.mapTypeId} value={item.mapTypeId}>{item.jpName}</SelectItem>);
                })}
            </Select>
        </div>
    );
}