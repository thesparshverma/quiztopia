import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props)=>{
    const [state,setState] = useState({logged:false});

    return (
        <UserContext.Provider value={{state,setState}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;