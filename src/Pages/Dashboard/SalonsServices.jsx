import React, { useState } from 'react';
import { Input, Modal, Select, Table, Button } from 'antd';
import { FaPlus, FaRegFilePdf } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { TfiReload } from 'react-icons/tfi';
import { MdCheckCircleOutline } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import CreateSalonForm from '../../Components/Form/CreateSalonForm';
import { useGetSalonServicesQuery, useUpdateSalonServiceStatusMutation } from '../../Redux/Apis/salonApis';
import { useGetCategoriesQuery } from '../../Redux/Apis/categoryApis';
import { generateImage } from '../../Redux/baseApi';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { CSVLink } from 'react-csv';

const SalonsServices = () => {
    const [page, setPage] = useState(parseInt(new URLSearchParams(window.location.search).get('page') || 1));
    const [openAddSalon, setOpenAddSalon] = useState(false);
    const [filters, setFilters] = useState({
        serviceCategory: '',
        status: 'active',
        salonAddress: '',
        user_name: ''
    });

    const { data: salonServices, isLoading: isSalonLoading, isFetching } = useGetSalonServicesQuery({
        page,
        address: filters.salonAddress,
        service_status: filters.status,
        user_name: filters.user_name
    });
    const [updateSalonServiceStatus] = useUpdateSalonServiceStatusMutation();

    const transformedData = salonServices?.data?.map((item, i) => ({
        key: i + 1 + ((salonServices?.current_page - 1) * salonServices?.per_page),
        id: item?.id,
        name: item?.salon?.user?.name,
        service: item?.salon?.salon_type,
        serviceName: item?.service_name,
        price: `${item?.price}€`,
        service_status: item?.service_status,
        date: new Date(item?.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        location: item?.salon?.user?.address,
        contact: item?.salon?.user?.phone,
        img: item?.service_image
    }));


    const handleStatusToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            await updateSalonServiceStatus({ id, active: newStatus === 'active' });
            Swal.fire({
                title: `Service status changed to ${newStatus}!`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update status.",
                icon: "error",
            });
        }
    };

    const columns = [
        { title: "S.No", dataIndex: "key", key: "key" },
        {
            title: "Salon", dataIndex: "name", key: "username", render: (_, record) => (
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={generateImage(record?.img)} alt="" />
                    <p>{record?.name}</p>
                </div>)
        },
        { title: "Location", dataIndex: "location", key: "location" },
        { title: "Service Type", dataIndex: "service", key: "service" },
        { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "ACTION", dataIndex: "printView", key: "printView", render: (_, record) => (
                <div className='flex items-center gap-2 text-green-500 cursor-pointer'>
                    <span onClick={() => handleStatusToggle(record.id, record.service_status)}>
                        {record.service_status === 'active' ? 'Deactivate' : 'Activate'}
                    </span>
                    <MdCheckCircleOutline className="text-2xl cursor-pointer" />
                </div>)
        }
    ];

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <div className='mb-6 flex justify-between items-center'>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Salons Services</h1>
                <div className='flex items-center gap-3'>
                    <CSVLink data={transformedData || []}>
                        <button className='text-2xl'>
                            <BsFileEarmarkExcelFill />
                        </button>
                    </CSVLink>
                    <Input
                        placeholder="Salon Address..."
                        value={filters.salonAddress}
                        onChange={(e) => handleFilterChange('salonAddress', e.target.value)}
                        prefix={<FiSearch size={14} color="#868FA0" />}
                        suffix={<IoClose size={14} color="#2B2A2A" onClick={() => handleFilterChange('salonAddress', '')} />}
                        style={{ width: "300px", height: "39px", borderRadius: "8px" }}
                    />
                    <Input
                        placeholder="User Name..."
                        value={filters.user_name}
                        onChange={(e) => handleFilterChange('user_name', e.target.value)}
                        prefix={<FiSearch size={14} color="#868FA0" />}
                        suffix={<IoClose size={14} color="#2B2A2A" onClick={() => handleFilterChange('user_name', '')} />}
                        style={{ width: "300px", height: "39px", borderRadius: "8px" }}
                    />
                    <Select
                        onChange={(value) => handleFilterChange('status', value)}
                        showSearch
                        placeholder="Status"
                        value={filters.status}
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                        style={{ width: "150px", height: "39px", borderRadius: "8px" }}
                    />
                    <button
                        className='p-2 text-lg text-white bg-[#F27405] rounded-md'
                        onClick={() => handlePageChange(1)}
                    >
                        <TfiReload />
                    </button>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={transformedData || []}
                    loading={isSalonLoading || isFetching}
                    pagination={{
                        pageSize: 10,
                        current: page,
                        onChange: handlePageChange
                    }}
                />
            </div>
            <Modal
                title="Add New Salon"
                open={openAddSalon}
                onCancel={() => setOpenAddSalon(false)}
                footer={null}
            >
                <CreateSalonForm closeModal={() => setOpenAddSalon(false)} />
            </Modal>
        </div>
    );
};

export default SalonsServices;
