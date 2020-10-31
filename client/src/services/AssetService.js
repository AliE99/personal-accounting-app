import axios from "axios";

const url = "https://present-absent.wapp.weblite.me/assets/";
const {W} = window;

async function getAssets() {
    try {
        const res = await axios.get(url, {params: {userId: W.user.getId()}});
        return res.data;
    } catch (err) {
        return err;
    }
}

export default getAssets;