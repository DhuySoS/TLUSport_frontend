import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const { fetchMyProfile, clearState } = useAuthStore();

    useEffect(() => {
        // Backend trả về: ?access_token=xyz&refresh_token=abc
        const params = new URLSearchParams(window.location.search);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token) {
            localStorage.setItem("accessToken", access_token);
            if (refresh_token) {
                Cookies.set("refreshToken", refresh_token, { expires: 7 });
            }

            fetchMyProfile()
                .then(async () => {
                    useAuthStore.setState({ isAuthenticated: true, isLoading: false });
                    await useCartStore.getState().mergeCart();
                    toast.success("Đăng nhập bằng Google thành công!");
                    navigate("/");
                })
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    Cookies.remove("refreshToken");
                    clearState();
                    toast.error("Không thể tải thông tin tài khoản!");
                    navigate("/");
                });
        } else {
            toast.error(error || "Đăng nhập Google thất bại!");
            navigate("/");
        }
    }, []);

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            <p className="ml-4 font-semibold">Đang xác thực tài khoản Google...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
