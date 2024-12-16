import React from "react";
import Search from "../components/molecules/Search/Search.jsx";
import cn from "classnames";
import style from "./style.module.scss";

const SearchPage= () => {
    return (
        <div className={cn(style.page)}>
            <Search/>
        </div>
    );
};

export default SearchPage