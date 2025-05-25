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
    // console.log(data)
    if (!data?.user?.email) {
        return <Navigate to={`/login`}></Navigate>
    }
    return children
}

export default AdminRoutes
