import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
    Image,
    Modal,
    ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import Editor from 'react-simple-wysiwyg';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import {CameraIcon} from "../../components/Icons/CameraIcon";
import "./CreateProduct.css";
import {useMutation} from "@apollo/client";
import {CREATE_PRODUCT, UPLOAD_FILES} from "../../graphQL/Mutations";
import {ProductsTypes} from "../../utils/constants";
import * as constants from "node:constants";

interface ErrorsType {
    name?: string;
    price?: string;
    images?: string;
}

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<string>('0');
    const [html, setHtml] = useState('Описание товара');
    const [images, setImages] = React.useState([]);
    const [selectedKey, setSelectedKey] = useState(ProductsTypes[0]);
    const [errors, setErrors] = useState<ErrorsType>({});
    const [isOpen, setOpen] = useState(false);
    const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);
    const [uploadFiles] = useMutation(UPLOAD_FILES);
    const handleCreateProduct = async () => {
        try {
            await createProduct({
                variables: {
                    name: name,
                    price: parseFloat(price),
                    description: html,
                    type: selectedKey,
                    menuId: 2,
                    currency: 'USD'
                }
            }).then(r => {
                console.log(r)
            });
        } catch (error) {
            console.log(error)
        }
    };
    const maxNumber = 70;

    const onOpenChange = () => {
        setOpen(!isOpen);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHtml(e.target.value);
    }

    const uploadMultipleImages = async (filesArray) => {
        try {
            const formData = new FormData();
            filesArray.forEach((file) => {
                formData.append('files', file.file);
            });
           await uploadFiles({
                variables: {
                    variables: { files: formData },
                }
            }).catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    useEffect(() => {
        console.log(error)
    }, [error]);

    const validateForm = () => {
        const newErrors: ErrorsType = {};

        if (!name.trim()) {
            setOpen(true);
            newErrors.name = 'Введите название товара';
        }

        if (!price) {
            setOpen(true);
            newErrors.price = 'Введите цену товара';
        }

        // if (!images.length) {
        //     setOpen(true);
        //     newErrors.images = 'Добавьте изображение товара';
        // }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const createNewProductHandler = async (e: any) => {
        e.preventDefault();
        console.log('321')
        // handleCreateProduct();
        uploadMultipleImages(images);

        console.log(images)

        // if (!validateForm()) {
        //     return;
        // }
        //
        // const formData = new FormData();
        //
        // formData.append('name', name);
        // formData.append('price', price);
        // formData.append('description', html);
        // formData.append('type', selectedKey);
        // formData.append('menuId', 2);
        // formData.append('currency', 'USD');
        //
        // // images.forEach(image => {
        // //     formData.append('images', image.file);
        // // });
        //
        // // axios.post('http://localhost:3000/products/create', data).then((res) => {
        // //     if (res.status === 200 || res.status === 201) {
        // //         window.location.href = '/products';
        // //     }
        // // });
        // try {
        //    const {data} = await createProduct({
        //         variables: {
        //             formData
        //         },
        //     }).catch((error) => {
        //         console.log(error)
        //     })
        //
        //     alert('is OK')
        //
        //     // window.location.href = `/event/${data.createEvent.event_id}`;
        // } catch (error: any) {
        //     console.log(error)
        // }
    }

    const onChangeImage = (imageList: []) => {
        setImages(imageList);
    };

    return (
        <div className="create-product">
            <h1>Новый продукт</h1>
            <form className="create-product__form">
                <Input required className="create-product__input" type="text" name="name" variant="bordered"
                       label="Название товара"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />
                <label className="create-product__label">Описание</label>
                <Editor value={html} onChange={onChange}/>
                <label className="create-product__label">Статус</label>
                <Dropdown classNames={{
                    base: "create-product__dropdown"
                }}>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            {selectedKey}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKey}
                        onSelectionChange={(keys) => setSelectedKey(keys.values().next().value)}
                    >
                        {ProductsTypes.map((type, index) => (
                            <DropdownItem key={type}>{type}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <label className="create-product__label">Фото продукта</label>
                <span className="create-product__sublabel">Нажмите или перетащите изображение чтобы добавить</span>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChangeImage}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                          imageList,
                          onImageUpload,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                      }) => (
                        <div className="upload__image-wrapper">
                            {imageList.map((image, index) => (
                                <div key={index} className="flex image-item align-middle">
                                    <Image className="create-product__image" src={image['data_url']} alt="" width="100"
                                           height="100"/>
                                    <div className="image-item__btn-wrapper">
                                        <Button className="create-product__image-controller" color="primary"
                                                onClick={() => onImageUpdate(index)}>Изменить</Button>
                                        <Button className="create-product__image-controller" color="danger"
                                                onClick={() => onImageRemove(index)}>Удалить</Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                style={isDragging ? {color: 'red'} : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                startContent={<CameraIcon/>}
                            >
                                Добавить
                            </Button>
                        </div>
                    )}
                </ImageUploading>

                <Input className="create-product__input" type="number" name="price" variant="bordered"
                       label="Цена товара"
                       value={price}
                       onChange={(e) => setPrice(e.target.value)}
                />
                <Button className="create-product__button" color="primary"
                        onClick={createNewProductHandler}>Сохранить</Button>
                <Link to={"/products"}><Button color="default">Отмена</Button></Link>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Заполните все поля!</ModalHeader>
                            <ModalBody>
                                <ul>
                                    {
                                        Object.keys(errors).map((key, index) => {
                                            const errorKey = key as keyof ErrorsType;
                                            return (
                                                <li key={index}>- {errors[errorKey]}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Я понял Кэп!
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateProduct;