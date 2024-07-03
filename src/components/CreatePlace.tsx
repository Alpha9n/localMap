import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button, Divider, Textarea, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LocationDataValues } from "./LocationList";

interface CreatePlaceModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    latlng: google.maps.LatLngLiteral;
}

export interface ListData {
    title: string;
    tag: string;
    description: string;
}

export let listTag: ListData[] = [
    {title: "お気に入り", tag: "favorite" , description: "お気に入りの地点リストです。"}
];

export default function CreatePlaceModal({latlng, isOpen, onOpen, onOpenChange}: CreatePlaceModalProps) {
    const { handleSubmit, control, register } = useForm<LocationDataValues>();
    const onSubmit: SubmitHandler<LocationDataValues> = (data) => {
        console.log(data);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="bottom-center"
                backdrop="blur"
                scrollBehavior="outside"
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
                                            isRequired
                                            label={"カテゴリタグ"}
                                            placeholder={"タグを選択"}
                                            defaultSelectedKey={'favorite'}
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