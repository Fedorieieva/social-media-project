import React, {useState} from "react";
import style from './style.module.scss';
import SearchIcon from '../../../../public/images/icons/search.svg?react';
import Button from "../../atoms/Button/Button.jsx";
import PostHeader from "../UserInfoHeader/UserInfoHeader.jsx";
import {useFetchAllUsers} from "../../../hooks/handleUser.js";
import cn from 'classnames';
import PropTypes from "prop-types";

const Search = ({className}) => {
    const users = useFetchAllUsers();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        setIsSearching(searchValue !== "");

        const filtered = users.filter(
            (user) =>
                user.firstName.toLowerCase().includes(searchValue) ||
                user.lastName.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue)
        );

        setFilteredUsers(filtered);
    };

    return (
        <section className={cn(className)}>
            <div className={style.search}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className={style.searchInput}
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <Button
                    className={style.searchButton}
                    variant="secondary"
                >
                    <SearchIcon/>
                </Button>
            </div>

            <div className={style.searchResult}>
                {isSearching && (
                    filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <PostHeader user={user} key={user._id}/>
                        ))
                    ) : (
                        <p>No users found</p>
                    )
                )}
            </div>
        </section>
    );
};

Search.propTypes = {
    className: PropTypes.string
}

export default Search;
