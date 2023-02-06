import { UserManager } from "../dbOperations/index.js";

export const getUsers = async () => {
  return await UserManager.getAll();
};

export const saveUser = async (body) => {
  return await UserManager.save(body);
};

// export const addProductToUsers = ()=>{
//     const users = await UserManager.getAll();
//     const products = await ProductManager.getAll();
//     users.forEach(user=>{
//         user.cart=products;
//         await UserManager.updateById(user,user.id)
//     })
// }
