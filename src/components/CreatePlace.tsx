import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, UseDisclosureProps, useDisclosure, Button, Divider, Textarea, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LocationDataValues } from "./LocationList";
import ExportFile from "@/hooks/exportJsonFile";

interface CreatePlaceModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    latlng: google.maps.LatLngLiteral;
}

export const listTag = [
    {title: "呪術廻戦-聖地巡礼", tag: "pilgrimagePlace-jujutu" , description: "呪術廻戦全編の聖地をまとめたリスト"},
    {title: "食い倒れ-大阪", tag: "kuidaore-osaka" , description: "大阪市内の食い倒れスポットをまとめたリスト"}
] as const

export default function CreatePlaceModal({latlng, isOpen, onOpen, onOpenChange}: CreatePlaceModalProps) {
    const { handleSubmit, control, register } = useForm<LocationDataValues>();
    const onSubmit: SubmitHandler<LocationDataValues> = (data) => {
        
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="auto"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => {
                        return (
                            <>
                                <ModalHeader
                                    className="flex flex-col gap-1"
                                >地点登録</ModalHeader>
                                <ModalBody>
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                                        <Input
                                            isRequired
                                            label={"タイトル"}
                                            labelPlacement={"outside"}
                                            placeholder={"地名を入力"}
                                            {...register('title')}
                                        />
                                        <div
                                            className={"flex gap-4"}
                                        >
                                            <Input
                                                isRequired
                                                label={"緯度"}
                                                labelPlacement={"outside"}
                                                value={latlng.lat.toString()}
                                                type={"number"}
                                                endContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">度</span>
                                                    </div>
                                                }
                                                {...register("latLng.lat")}
                                            />
                                            <Input
                                                isRequired
                                                label={"経度"}
                                                labelPlacement={"outside"}
                                                value={latlng.lng.toString()}
                                                type={"number"}
                                                endContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">度</span>
                                                    </div>
                                                }
                                                {...register("latLng.lng")}
                                            />
                                        </div>
                                        <Divider/>
                                        <Textarea
                                            isRequired
                                            label={"概要"}
                                            labelPlacement={"outside"}
                                            placeholder={"説明を入力"}
                                            {...register("description")}
                                        />
                                        <Autocomplete
                                            label={"カテゴリタグ"}
                                            placeholder={"タグを選択"}
                                            defaultItems={listTag}
                                            {...register("tag")}
                                        >
                                            {(item) => <AutocompleteItem key={item.tag}>{item.title}</AutocompleteItem>}
                                        </Autocomplete>
                                        <Input
                                            type={"url"}
                                            label={"画像URL"}
                                            labelPlacement={"outside"}
                                            {...register("imgLink")}
                                        />
                                        <Input
                                            type={"url"}
                                            label={"公式サイト"}
                                            labelPlacement={"outside"}
                                            {...register("link")}
                                        />
                                        <Button color={"primary"} type={"submit"}>
                                            追加
                                        </Button>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color={"danger"} onPress={onClose}>
                                        閉じる
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                    }}
                </ModalContent>
            </Modal>
        </>
    );
}