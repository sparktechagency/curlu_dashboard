import { Form, Input, Modal, Table, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { useGetAdminsQuery, useCreateAdminMutation, useDeleteAdminMutation } from '../../Redux/Apis/adminsApi';
import toast from 'react-hot-toast';


const MakeAdmin = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [reFresh, setReFresh] = useState("");

    // Get Admin Data from API
    const { data: admins, isLoading, isError, refetch } = useGetAdminsQuery({ page: 1 });

    // Create Admin Mutation
    const [createAdmin] = useCreateAdminMutation();

    // Delete Admin Mutation
    const [deleteAdmin] = useDeleteAdminMutation();

    // Close modal after refresh
    useEffect(() => {
        if (reFresh) {
            setTimeout(() => {
                setReFresh("");
            }, 1500);
        }
    }, [reFresh]);

    // Handle delete action
    const handleDelete = async (adminId) => {
        try {
            await deleteAdmin(adminId);
            setOpenDeleteModal(false);
            refetch();
            // Show success feedback
        } catch (error) {
            console.error("Error deleting admin:", error);
            // Handle error (e.g., show error message)
        }
    };

    // Handle form submit to create new admin
    const handleSubmit = async (values) => {
        try {
            values.role_type = 'ADMIN'
            values.password_confirmation = values.password
            const formData = new FormData()
            Object.keys(values).map(key => {
                formData.append(key, values[key])
            })
            createAdmin(values).unwrap()
                .then(res => {
                    toast.success(res?.message)
                    setOpenAddModel(false);
                    refetch();
                }).catch(err => {
                    toast.error(err?.data?.message)
                });
            // Show success feedback
        } catch (error) {
            console.error("Error creating admin:", error);
            // Handle error (e.g., show error message)
        }
    };

    // Table columns
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Type',
            dataIndex: 'role_type',
            key: 'role_type',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <MdOutlineDelete onClick={() => { setSelectedAdmin(record); setOpenDeleteModal(true); }} className='cursor-pointer' size={25} color='red' />
            ),
        },
    ];

    return (
        <div>
            <div style={{ margin: "24px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <h3 className='text-2xl'>Make Admin</h3>
                    <button
                        className='flex justify-center items-center gap-2'
                        onClick={() => setOpenAddModel(true)}
                        style={{
                            width: "164px",
                            height: "36px",
                            borderRadius: "8px",
                            color: "white",
                            backgroundColor: "#F27405",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                        }}
                    >
                        <FaPlus /> Make Admin
                    </button>
                </div>
            </div>

            <Table columns={columns} dataSource={admins?.data} pagination={false} loading={isLoading} />

            {/* Add Admin Modal */}
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
            >
                <div className='p-6'>
                    <h1 style={{ marginBottom: "12px" }}>Make Admin</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                    >
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>Full Name</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="name"
                                rules={[{ required: true, message: "Please input User Full Name" }]}
                            >
                                <Input
                                    placeholder="Enter Full Name"
                                    type="text"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>Email </label>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Please input User Email" }]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter User Email"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="password"
                                rules={[{ required: true, message: "Please input User Password!" }]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="Enter User password"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        {/* <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>User Type</label>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="role_type"
              >
                <Input
                  type="text"
                  placeholder="Enter User Type"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  defaultValue="ADMIN"
                  readOnly
                />
              </Form.Item>
            </div> */}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    border: "none",
                                    height: "52px",
                                    background: "#F27405",
                                    color: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                centered
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                width={400}
                footer={false}
            >
                <div className="p-6 text-center">
                    <p className="text-[#F27405] text-center font-semibold">Are you sure?</p>
                    <p className="pt-4 pb-12 text-center">Do you want to delete this user?</p>
                    <button
                        onClick={() => handleDelete(selectedAdmin.id)}
                        className="bg-[#F27405] py-2 px-5 text-white rounded-md"
                    >
                        Confirm
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default MakeAdmin;
