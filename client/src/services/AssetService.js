// import axios from "axios";
//
// const url = "http://localhost:3000/assets/";
//
// // class AssetService {
// //
// //     // get all the assets
// //     static getAssets() {
// //         return new Promise(async (resolve, reject) => {
// //             try {
// //                 const res = await axios.get(url);
// //                 const data = res.data;
// //                 resolve(
// //                     data.map(asset => ({
// //                         ...asset,
// //                         createdAt: new Date(asset.createdAt),
// //                     })),
// //                 );
// //             } catch (err) {
// //                 reject(err);
// //             }
// //         });
// //     }
// // }
// exports.getAssets = () => {
//     axios.get(url).then(res => {
//         console.log(res.data);
//     });
// };