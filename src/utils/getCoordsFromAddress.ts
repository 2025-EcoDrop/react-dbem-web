import axios from "axios";

export const getCoordsFromAddress = async (
    address: string
): Promise<{ latitude: number; longitude: number }> => {
    try {
        const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json`,
            {
                params: { query: address },
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
                },
            }
        );

        const data = response.data;

        if (data.documents && data.documents.length > 0) {
            const { x, y } = data.documents[0];
            return { latitude: Number(y), longitude: Number(x) };
        }

        throw new Error('주소 변환 실패');
    } catch (error) {
        console.error('getCoordsFromAddress error:', error);
        throw error;
    }
};