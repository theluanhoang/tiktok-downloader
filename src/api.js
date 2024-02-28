import axios from "axios";

export const tiktokVideoDownloader = async (url, hd) => {
    const options = {
        method: 'GET',
        url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
        params: {
            url,
            hd
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
            'X-RapidAPI-Host': import.meta.env.VITE_X_RapidAPI_Host
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// export const fetchFile = (url) => {
//     fetch(url).then(res => res.blob()).then(file => {
//         let tempUrl = URL.createObjectURL(file);
//         const aTag = document.createElement("a");
//         aTag.href = tempUrl;
//         // aTag.download = url.replace(/^.*[\\\/]/, '');
//         aTag.download = url.replace(/^.*[\\\/]/, '');
//         document.body.appendChild(aTag);
//         aTag.click();
//         URL.revokeObjectURL(tempUrl);
//         aTag.remove();
//     }).catch(() => {
//         throw new Error("Failed to download file!");
//     });
// }

export const fetchFile = (url) => {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.blob();
        })
        .then(file => {
            const tempUrl = URL.createObjectURL(file);
            const aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.setAttribute("download", ""); // Thiết lập thuộc tính download để tải xuống
            document.body.appendChild(aTag);
            aTag.click();
            URL.revokeObjectURL(tempUrl);
            aTag.remove();
        })
        .catch(() => {
            throw new Error("Failed to download file!");
        });
}

