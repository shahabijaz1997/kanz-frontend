import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { RootState } from "../../redux-toolkit/store/store";

const Login = (props: any) => {
    const dispatch = useDispatch();
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    useLayoutEffect(() => {
        doi()
    }, []);
    const doi = () => {
        console.log(588);

        // dispatch(saveToken("Ahmad h"));

        setTimeout(() => {
            console.log("authToken", authToken);
            
        }, 2000)
    }
    return (
        <main>
            Login
        </main>
    )
};
export default Login;