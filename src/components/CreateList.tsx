import { Autocomplete, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ListData } from "./CreatePlace";

interface CreateListModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
}

export default function CreateListModal({isOpen, onOpen, onOpenChange}: CreateListModalProps) {
    const { handleSubmit, control, register } = useForm<ListData>();
    const onSubmit: SubmitHandler<ListData> = (data) => {
        console.log(data);
    };

    return (
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
                            >
                                <h1>地点リストの作成</h1>
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                                    <Input
                                        isRequired
                                        label={"タイトル"}
                                        labelPlacement={"outside"}
                                        placeholder={"タイトルを入力"}
                                        {...register('title')}
                                    />
                                    <Input
                                        isRequired
                                        label={"ID"}
                                        labelPlacement={"outside"}
                                        placeholder={"英数字でIDを入力"}
                                        inputMode={"text"}
                                        {...register('tag')}
                                    />
                                    <Textarea
                                        label={"説明"}
                                        labelPlacement={"outside"}
                                        placeholder={"説明文を入力"}
                                        {...register('description')}
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
    );
}