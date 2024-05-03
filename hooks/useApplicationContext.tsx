import {useContext} from "react";
import {ApplicationContext} from "@/context/ApplicationContext";

const useApplicationContext = () => {
    return useContext(ApplicationContext);
}

export default useApplicationContext;