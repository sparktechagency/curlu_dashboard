import React, { useState } from "react";
import JoditEditor from "jodit-react";
import { CiEdit } from "react-icons/ci";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { Button, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
    useGetSlidersQuery,
    useAddSliderMutation,
    useUpdateSliderMutation,
    useDeleteSliderMutation,
} from "../../Redux/Apis/sliderSettingApis";
import { generateImage } from "../../Redux/baseApi";

const SliderSetting = () => {
    const [page, setPage] = useState(1);
    const [openAddModel, setOpenAddModel] = useState(false);
    const [selectedSlider, setSelectedSlider] = useState(null);
    const [content, setContent] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { data: sliders = {}, refetch } = useGetSlidersQuery(page);
    const [addSlider] = useAddSliderMutation();
    const [updateSlider] = useUpdateSliderMutation();
    const [deleteSlider] = useDeleteSliderMutation();

    const [form] = Form.useForm(); // Initialize form instance

    const handleAddOrUpdateSlider = async (values) => {
        const formData = new FormData();
        formData.append("slider_name", values.slider_name);
        formData.append("slider_image", imgFile);
        formData.append("slider_description", content);

        try {
            setLoading(true);
            if (selectedSlider) {
                await updateSlider({ id: selectedSlider.id, sliderData: formData }).unwrap();
                Swal.fire("Success", "Slider updated successfully!", "success");
            } else {
                await addSlider(formData).unwrap();
                Swal.fire("Success", "Slider added successfully!", "success");
            }
            refetch();
            setOpenAddModel(false);
            setSelectedSlider(null);
            setContent("");
            setImgFile(null);
            form.resetFields(); // Reset form after submission
        } catch (error) {
            Swal.fire("Error", "Error saving slider. Please try again.", "error");
            console.error("Error saving slider:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete slider
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteSlider(id).unwrap();
                    refetch();
                    Swal.fire("Deleted!", "Your slider has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error", "Error deleting slider. Please try again.", "error");
                    console.error("Error deleting slider:", error);
                }
            }
        });
    };

    const columns = [
        {
            title: "Slider image",
            dataIndex: "slider_image",
            key: "slider_image",
            width: 200,
            render: (img) => (
                <img
                    style={{
                        height: 48,
                        width: 147,
                        borderRadius: 8,
                        backgroundSize: "cover",
                    }}
                    src={generateImage(img)}
                    alt="Slider"
                />
            ),
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
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                    <Button
                        onClick={() => {
                            setSelectedSlider(record);
                            setOpenAddModel(true);
                            setContent(record.slider_description || "");
                            form.setFieldsValue({
                                slider_name: record.slider_name,
                            }); // Set form values for editing
                        }}
                        icon={<CiEdit size={25} />}
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<FaRegTrashAlt size={20} />}
                        danger
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3>Slider Setting</h3>
                    <Button
                        onClick={() => {
                            setSelectedSlider(null);
                            form.resetFields();
                            setContent('')
                            setOpenAddModel(true);
                        }}
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
                <Table columns={columns} dataSource={sliders?.data} pagination={{
                    total: sliders?.total,
                    pageSize: sliders?.per_page,
                    onChange: (page) => setPage(page)
                }} />
            </div>

            <Modal
                centered
                visible={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                footer={null}
                width={700}
            >
                <div className="p-5">
                    <h1>{selectedSlider ? "Edit Slider" : "Add Slider"}</h1>
                    <Form
                        layout="vertical"
                        form={form} // Link form instance
                        onFinish={handleAddOrUpdateSlider}
                    >
                        <Form.Item
                            name="slider_name"
                            label="Slider Name"
                            rules={[{ required: true, message: "Please input the slider name" }]}
                        >
                            <Input />
                        </Form.Item>
                        <label
                            htmlFor="image"
                            style={{ display: "block", margin: "4px 0" }}
                            className="p-3 border"
                        >
                            <Form.Item name="image">
                                <div className="flex justify-center items-center w-full h-full border-dashed border border-black py-10">
                                    {imgFile ? (
                                        <img src={URL.createObjectURL(imgFile)} alt="Preview" style={{ width: "100px" }} />
                                    ) : selectedSlider?.slider_image ? (
                                        <img src={generateImage(selectedSlider.slider_image)} alt="Existing Slider" style={{ width: "100px" }} />
                                    ) : (
                                        <FaRegImage className="text-2xl" />
                                    )}
                                </div>

                                <div className="hidden">
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setImgFile(e.target.files[0])}
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
                        <Form.Item label="Details">
                            <JoditEditor
                                value={content}
                                onChange={(newContent) => setContent(newContent)}
                                config={{
                                    height: 100
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{
                                borderRadius: 8,
                                background: "#F25C05",
                                height: 40,
                                color: "white",
                                fontSize: 14,
                                fontWeight: "400",
                            }} type="primary" htmlType="submit" loading={loading}>
                                {selectedSlider ? "Update Slider" : "Add Slider"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default SliderSetting;
