// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "./slice";

// export default function LogoutComp()
// {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     localStorage.clear();
//     dispatch(logout())
//     navigate("/")
// }

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "./slice";

export default function LogoutComp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(logout());
        navigate("/");
    }, [dispatch, navigate]);

    return null; // This component doesn't need to render anything
}
