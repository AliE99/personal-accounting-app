import axios from "axios";

const url = "http://localhost:3000/assets/";

async function getAssets() {
    try {
        const res = await axios.get(url);
        return  res.data;
    } catch (err) {
        return err;
    }
}

export default getAssets;