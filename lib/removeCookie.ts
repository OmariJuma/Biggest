import axios from "axios";

export const removeCookie = async(name: string) => {
try {
   const {data}= await axios.post(`/api/removeCookie`, {
        name
    });
    return data
} catch (error) {
    console.log("Error removing cookie");
}
};