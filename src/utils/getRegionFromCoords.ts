export const getRegionFromCoords = async (lat: number, lng: number) => {
    return new Promise<{ 
        address: string; 
        region_1depth: string; 
        region_2depth: string; 
        region_3depth: string 
    }>((resolve, reject) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        // const coord = new window.kakao.maps.LatLng(lat, lng);

        geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                const region = result[0];
                geocoder.coord2Address(lng, lat, (addrResult: any, status2:any) => {
                    if (status2 === window.kakao.maps.services.Status.OK) {
                        const fullAddress = addrResult[0].address.address_name;
                        console.log('행정구역:', region.address_name);
                        console.log('상세주소:', fullAddress);

                        resolve({
                            address:fullAddress,
                            region_1depth: region.region_1depth_name,
                            region_2depth: region.region_2depth_name,
                            region_3depth: region.region_3depth_name,
                        });
                    }
                });
            } else {
                reject(new Error('주소 변환 실패'));
            }
        });
    });
};