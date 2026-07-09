import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersData } from "../redux/usersSlice";
import axios from "axios";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://quickchat-backend-zxkb.onrender.com/api/user/current", {
          withCredentials: true,
        });
        dispatch(setUsersData(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
};

export default useCurrentUser;
