import { Navigate } from "react-router"
import useAuthContext from "../../hooks/useAuthContext"
import Loader from "../../components/reusables/loader"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, setIsLoading, setIsAuthenticated } = useAuthContext()

    useEffect(() => {
        const validate = async () => {
            const token = localStorage.getItem('accessToken')
            
            if (!token) {
                setIsAuthenticated(false)
                setIsLoading(false)
                return
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-auth/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await response.json()
                setIsAuthenticated(data.message === "You are authenticated")                
            } catch (error) {
                setIsAuthenticated(false)
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            } finally {
                setIsLoading(false)
            }
        }

        validate()
    }, [setIsAuthenticated, setIsLoading])

    if (isLoading) return <Loader />
    return isAuthenticated ? children : <Navigate to="/login" />
}