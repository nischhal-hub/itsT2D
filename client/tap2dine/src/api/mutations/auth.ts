import { api } from "../api";
import { useMutation } from '@tanstack/react-query'
import { toastTrigger } from "../../lib/utils";
import { TLoginType } from "../../schemas/login";
import { useNavigate } from "react-router";

export const useLoginMutation = () => {
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: (data: TLoginType) => api.post('/auth/token', data),
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.data.access);
            localStorage.setItem('refreshToken', data.data.refresh);
            toastTrigger('Login successful', 'success');
            navigate('/');
        }
    }
    )
    return loginMutation
}


