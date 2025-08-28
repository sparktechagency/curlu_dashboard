import { Navigate } from "react-router-dom"
import { useGetProfileQuery } from "../Redux/Apis/authApis"

const AdminRoutes = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to={`/login`}></Navigate>
    }
    const { data, isLoading } = useGetProfileQuery()
    if (isLoading) {
        return
    }
    const superAdminRoutes = [
        '/earning-commition-update',
        '/make-admin',
        '/salon-invoice',
        '/orders-transaction',
    ]

    console.log(data?.user)
    if (!data?.user?.email) {
        return <Navigate to={`/login`}></Navigate>
    }
    if (superAdminRoutes.includes(window.location.pathname)) {
        if (data?.user?.role_type !== 'SUPER ADMIN') {
            return <Navigate to={`/`}></Navigate>
        }
    }
    return children
}

export default AdminRoutes
