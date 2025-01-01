import { api } from "../api";
import { useMutation } from '@tanstack/react-query'
import { toastTrigger } from "../../lib/utils";
import { TLoginType } from "../../schemas/login";
import { useNavigate } from "react-router";
import { TRegisterType } from "../../schemas/register";

export const useLoginMutation = () => {
const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: (data:TLoginType) => api.post('/auth/token', data),
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.data.access);
            localStorage.setItem('refreshToken', data.data.refresh);
            toastTrigger('Login successful', 'success');
            navigate('/');
        },
        onError: () => {
            toastTrigger('Login failed: Invalid Email or password.', 'error');
        }
    }
    )
    return loginMutation
}

export const useRegisterMutation = () => {
    const navigate = useNavigate()
    const registerMutation = useMutation({
        mutationFn: (data:TRegisterType) => api.post('/register/', data),
        onSuccess: () => {
            toastTrigger('Registration successful', 'success');
            navigate('/auth');
        },
        onError: () => {
            toastTrigger('Registration failed', 'error');
        }
    }
    )
    return registerMutation
}

