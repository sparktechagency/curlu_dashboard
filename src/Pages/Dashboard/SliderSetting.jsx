import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { MdOutlineFilterList } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button, Calendar, Dropdown, Form, Input, Modal, Slider, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from "react-icons/fa6";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CiMenuKebab } from "react-icons/ci";
import { render } from "react-dom";

const data = [
    {
        key: "#1239",
        slider_image:
            "https://s3-alpha-sig.figma.com/img/80f1/779a/ccf59a4e68961f84764c13e17fff046d?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MuOF4HJwTshR4EGViRv3Gz3KNFPjaYWelvR5wM9emsA9qGG6S5DCJXQb90nVakQroT-G5HH0n30-06JWZ7JUDBRC2BCC2kA97T~b~dng8YStvySa6DWLKXa7YUq6RSayJFtGO9JRNYwpxUn86o8L7axSln7yudMbUNYnS3NVfkL1k-SU1QROFztNmIGJK~MdvjggJAEV-3hCwPUloM1v6bVWIpRV0dVHT5P4nYLTkr6mo4V3dKRRoBM21nzuDhBvmRwOyiCly8VoezxumgnI0QhguKMTqyZC0r5jR8GdV4YUa4O2c3OWiGXKWNyo1hTNeJ2IVDf7ivBcDz~mZc1MUw__",
        slider_name: "Perfect Nail Salon",
    },
    {
        key: "#12388",
        slider_image:
            "https://s3-alpha-sig.figma.com/img/80f1/779a/ccf59a4e68961f84764c13e17fff046d?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MuOF4HJwTshR4EGViRv3Gz3KNFPjaYWelvR5wM9emsA9qGG6S5DCJXQb90nVakQroT-G5HH0n30-06JWZ7JUDBRC2BCC2kA97T~b~dng8YStvySa6DWLKXa7YUq6RSayJFtGO9JRNYwpxUn86o8L7axSln7yudMbUNYnS3NVfkL1k-SU1QROFztNmIGJK~MdvjggJAEV-3hCwPUloM1v6bVWIpRV0dVHT5P4nYLTkr6mo4V3dKRRoBM21nzuDhBvmRwOyiCly8VoezxumgnI0QhguKMTqyZC0r5jR8GdV4YUa4O2c3OWiGXKWNyo1hTNeJ2IVDf7ivBcDz~mZc1MUw__",
        slider_name: "Perfect Nail Salon",
    },
    {
        key: "#1256",
        slider_image:
            "https://s3-alpha-sig.figma.com/img/80f1/779a/ccf59a4e68961f84764c13e17fff046d?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MuOF4HJwTshR4EGViRv3Gz3KNFPjaYWelvR5wM9emsA9qGG6S5DCJXQb90nVakQroT-G5HH0n30-06JWZ7JUDBRC2BCC2kA97T~b~dng8YStvySa6DWLKXa7YUq6RSayJFtGO9JRNYwpxUn86o8L7axSln7yudMbUNYnS3NVfkL1k-SU1QROFztNmIGJK~MdvjggJAEV-3hCwPUloM1v6bVWIpRV0dVHT5P4nYLTkr6mo4V3dKRRoBM21nzuDhBvmRwOyiCly8VoezxumgnI0QhguKMTqyZC0r5jR8GdV4YUa4O2c3OWiGXKWNyo1hTNeJ2IVDf7ivBcDz~mZc1MUw__",
        slider_name: "Perfect Nail Salon",
    },
];


const SliderSetting = () => {
    const [category, setCategory] = useState("location");
    const [page, setPage] = useState(
        new URLSearchParams(window.location.search).get("page") || 1
    );
    const [imgFile, setImgFile] = useState(null);
    const handleChange = (e) => {
        setImgFile(e.target.files[0]);
    };
    const [itemForEdit, setItemForEdit] = useState(null);
    const [openAddModel, setOpenAddModel] = useState(false);
    const dropdownRef = useRef();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const config = {
        readonly: false,
        placeholder: "Start typings...",
        style: {
            height: 200,
        },
    };
    const [open, setOpen] = useState(false)
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDate(false);
                setOpen("");
                setFilter(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
            width: 100,
        },
        {
            title: "Slider image",
            dataIndex: "slider_image",
            key: "slider_image",
            width: 200,
            render: (img) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <img
                            style={{
                                height: 48,
                                width: 147,
                                borderRadius: 8,
                                backgroundSize: "cover",
                            }}
                            src={img}
                            alt="ok"
                        />
                    </div>
                );
            },
        },

        {
            title: "Slider Name",
            dataIndex: "slider_name",
            key: "slider_name",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 150,
            textAlign: "center",
            render: (_, record) => (
                <p
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <button
                        onClick={() => setOpenAddModel(true)}
                        style={{
                            cursor: "pointer",
                            border: "none",
                            outline: "none",
                            color: "#F25C05",
                            background: "white",
                        }}
                    >
                        <CiEdit size={25} />
                    </button>
                    <button onClick={() => setOpen(true)}
                        style={{
                            cursor: "pointer",
                            border: "none",
                            outline: "none",
                            background: "white",
                            color: "#F25C05",
                        }}
                    >
                        <FaRegTrashAlt size={20} />
                    </button>
                </p>
            ),
        },
    ];

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set("page", page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const onClick = ({ key }) => {
        setCategory(key);
        const params = new URLSearchParams(window.location.search);
        params.set("category", key);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const onSelect = (newValue) => {
        const date = newValue.format("MMM-DD-YYYY");
        setValue(date);
        const params = new URLSearchParams(window.location.search);
        params.set("date", date);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return (
        <div>
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "16px 0",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                            }}
                        >
                            Slider Setting
                        </h3>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <Button
                            onClick={() => setOpenAddModel(true)}
                            style={{
                                borderRadius: 8,
                                background: "#F25C05",
                                height: 40,
                                color: "white",
                                fontSize: 14,
                                fontWeight: "400",
                            }}
                            icon={<PlusOutlined />}
                        >
                            Add Slider
                        </Button>
                    </div>
                </div>
                <div>
                    <Table
                        columns={columns}
                        style={{}}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => {
                    // null;
                    setImgFile(null);
                    setOpenAddModel(false);
                }}
                width={700}
                footer={false}
            >
                <div className="p-6 ">
                    <h1
                        className="font-semibold text-[#555555]"
                        style={{ marginBottom: "12px" }}
                    >
                        {`Add Slider`}
                    </h1>
                    <Form>
                        <div>
                            <p className="text-[#6D6D6D] py-1">Slider Name</p>
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Package Name",
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[100%] border outline-none px-3 py-[10px]"
                                    type="text"
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="text-[#6D6D6D] py-1">Slider Image</p>

                            <label
                                htmlFor="image"
                                style={{ display: "block", margin: "4px 0" }}
                                className="p-3 border"
                            >
                                <Form.Item name="image">
                                    <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                                        {imgFile ? (
                                            <img src={URL.createObjectURL(imgFile)} alt="" />
                                        ) : itemForEdit?.img ? (
                                            <img src={`${ServerUrl}${itemForEdit.img}`} alt="" />
                                        ) : (
                                            <FaRegImage className="text-2xl" />
                                        )}
                                    </div>

                                    <div className="hidden">
                                        <Input
                                            id="image"
                                            type="file"
                                            onInput={handleChange}
                                            style={{
                                                border: "1px solid #E0E4EC",
                                                height: "52px",
                                                background: "white",
                                                borderRadius: "8px",
                                                outline: "none",
                                            }}
                                        />
                                    </div>
                                </Form.Item>
                            </label>
                        </div>
                        <div>
                            <p className="my-3 mb-1">Details</p>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={(newContent) => setContent(newContent)}
                                onChange={(newContent) => { }}
                            />
                        </div>
                        <div className="text-center mt-6">
                            <button className="bg-[#6A5ECC] px-6 py-3 w-full text-[#FEFEFE] rounded-md">
                                Confirm
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
            <Modal
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={400}
                footer={false}
            >
                <div className="p-6 text-center">
                    <p className="text-[#F27405] text-center font-semibold">
                        Are you sure !
                    </p>
                    <p className="pt-4 pb-12 text-center">
                        Do you want to delete this content ?
                    </p>
                    <button
                        onClick={() => setOpen(false)}
                        className="bg-[#F27405] py-2 px-5 text-white rounded-md"
                    >
                        Confirm
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default SliderSetting
