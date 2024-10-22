import { useState } from "react";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../Redux/Apis/categoryApis";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal, Table } from "antd";
import { FaPlus, FaRegFilePdf } from "react-icons/fa6";
import CreateSalonCategoryFrom from "../../Components/Form/CreateSalonCategoryFrom";
import { imageUrl } from "../../Redux/baseApi";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { CSVLink } from "react-csv";
const ServicesCategory = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState(false);
    const [openAddSalon, setOpenAddSalon] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({})
    const [create, setCreate] = useState(false)
    const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery({ page });
    const [deleteCategory] = useDeleteCategoryMutation();

    // const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(id)
                    .unwrap()
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The category has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue deleting the category.",
                            icon: "error",
                        });
                    });
            }
        });
    };
    // console.log(categoriesData)
    const categories = categoriesData?.data?.map((category, index) => ({
        key: index + 1 + ((categoriesData?.current_page - 1) * categoriesData?.per_page),
        name: category.category_name,
        img: `${imageUrl}${category.category_image}`,
        id: category?.id
    })) || [];

    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Services category Photo",
            dataIndex: "img",
            key: "Services category Photo",
            render: (_, record) => (
                <div className="flex justify-start items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={record?.img} alt="" />
                </div>
            )
        },
        {
            title: "Services category name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div className='flex justify-start items-center gap-2'>
                    <FaEdit onClick={() => { setOpenAddSalon(true); setCreate(false); setSelectedCategory(record) }} className="text-[#F25C05] text-2xl cursor-pointer" />
                    <MdDelete onClick={() => { handleDelete(record.id) }} className="text-[#F25C05] text-2xl cursor-pointer" />
                </div>
            ),
        },
    ];

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return (
        <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <div className='mb-6 flex justify-between items-center'>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Manage Services Category</h1>
                <div className='flex justify-end items-center gap-3'>
                    <CSVLink data={categories || []}>
                        <button className='text-2xl'>
                            <BsFileEarmarkExcelFill />
                        </button>
                    </CSVLink>
                    <button onClick={() => { setOpenAddSalon(true); setCreate(true) }} className='flex justify-start items-center gap-2 text-white p-2 rounded-md bg-[#F27405]'>
                        <FaPlus />
                        Add Category
                    </button>
                </div>
            </div>
            {isError && <div>Error loading categories</div>}
            <div>
                <Table
                    columns={columns}
                    dataSource={categories}
                    loading={isLoading}
                    pagination={{
                        pageSize: categoriesData?.per_page || 10,
                        defaultCurrent: parseInt(page),
                        total: categoriesData?.total || 0,
                        onChange: handlePageChange,
                    }}
                />
            </div>
            <Modal
                open={openAddSalon}
                onCancel={() => setOpenAddSalon(false)}
                centered
                footer={false}
                width={500}
            >
                <div className='bg-white p-6 rounded-md'>
                    <p className='text-[#F27405] text-lg font-medium'> {create ? "Add" : "Edit"} Hair style</p>
                    <CreateSalonCategoryFrom
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        setOpenAddSalon={setOpenAddSalon}
                        create={create}
                    />
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

export default ServicesCategory;
