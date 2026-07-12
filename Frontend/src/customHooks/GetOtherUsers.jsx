import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsersData } from "../redux/usersSlice";
import axios from "axios";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData,otherUsersData } = useSelector((state) => state.user);
  useEffect(() => {
      if (!userData) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/others", {
          withCredentials: true,
        });
        dispatch(setOtherUsersData(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
};

export default useGetOtherUsers;
