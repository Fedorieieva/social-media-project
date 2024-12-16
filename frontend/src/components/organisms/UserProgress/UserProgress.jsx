import React, {useEffect} from "react";
import {useFetchAllAwards} from "../../../hooks/fetchAwards.js";
import {useAllUserComments} from "../../../hooks/handleComment.js";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import {useFetchUserPostsNumber} from "../../../hooks/fetchPosts.js";
import style from "./style.module.scss";
import Chart from "./Chart.jsx";
import AwardHeaderInfo from "../../molecules/AwardHeaderInfo/AwardHeaderInfo.jsx";
import {useAssignAwardToUser} from "../../../hooks/handleUser.js";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";

const awardConditions = {
    "Welcome, Newbie!": [
        {label: "Likes", key: "likedPostsNum", max: 2},
        {label: "Posts", key: "totalPostsNum", max: 1},
    ],
    "PIVOT! To Success!": [
        {label: "Likes", key: "likedPostsNum", max: 4},
        {label: "Comments", key: "commentsNum", max: 3},
        {label: "Saved", key: "savedPostsNum", max: 2},
    ],
    "How You Doin’?": [
        {label: "Likes", key: "likedPostsNum", max: 10},
        {label: "Comments", key: "commentsNum", max: 8},
        {label: "Posts", key: "totalPostsNum", max: 6},
        {label: "Saved", key: "savedPostsNum", max: 5},
    ],
};

const UserProgress = () => {
    const user = useSelector(selectUser);
    const userId = user._id || user.id;
    const awards = useFetchAllAwards();
    const commentsNum = useAllUserComments(userId).length || 0;
    const totalPostsNum = useFetchUserPostsNumber(`posts/user/${userId}`) || 0;
    const savedPostsNum = useFetchUserPostsNumber(`posts/user/${userId}/saved`) || 0;
    const likedPostsNum = useFetchUserPostsNumber(`posts/user/${userId}/liked`) || 0;
    const assignAwardToUser = useAssignAwardToUser();

    const userStats = {
        commentsNum,
        totalPostsNum,
        savedPostsNum,
        likedPostsNum,
    };

    const calculateProgress = (conditions) =>
        conditions.map(({label, key, max}) => ({
            label,
            value: Math.min(userStats[key], max),
            max,
        }));

    const isProgressComplete = (progressData) =>
        progressData.every((item) => item.value >= item.max);

    useEffect(() => {
        awards.forEach((award) => {
            const conditions = awardConditions[award.title];
            if (!conditions) return;

            const progressData = calculateProgress(conditions);

            if (
                !user.awards.some((userAward) => userAward._id === award._id) &&
                isProgressComplete(progressData)
            ) {
                assignAwardToUser(award._id);
            }
        });
    }, [awards, user.awards, userStats]);

    const progressData = awards.map((award) => {
        const conditions = awardConditions[award.title];
        const alreadyHasAward = user.awards.some(
            (userAward) => userAward._id === award._id
        );
        return conditions
            ? {
                award,
                progressData: calculateProgress(conditions),
                alreadyHasAward,
            }
            : null;
    }).filter(Boolean);

    return (
        <section className={style.progressWrapper}>
            {progressData.map(({award, progressData, alreadyHasAward}, index) => (
                <div key={index} className={style.progress}>
                    <div className={style.progressHeader}>
                        <AwardHeaderInfo award={award}/>
                        {alreadyHasAward && (
                            <Typography>
                                🎉Congratulations, you earned this award!🎉
                            </Typography>
                        )}
                    </div>

                    <Chart progressData={progressData}/>
                </div>
            ))}
        </section>
    );
};

export default UserProgress;
