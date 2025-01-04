import { userLoginSuccess, userRegisterFailed } from "../reducer/userReducer";

export const userRegister = () => {
  return async (dispatch: any) => {
    try {
      const res = {
        uid: "00000",
        name: "John Doe",
        email: "johndoe@example.com",
        photoURL: "https://example.com/photo.jpg",
      };

      dispatch(userLoginSuccess(res));
    } catch (error) {
      dispatch(userRegisterFailed());
      return {
        errCode: 500,
        message: "Đã xảy ra lỗi!",
      };
    }
  };
};
