import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <>
            <p> 로그인 성공! 잠시 후 홈으로 이동합니다...</p>
        </>
    );
};

export default OAuthSuccess;