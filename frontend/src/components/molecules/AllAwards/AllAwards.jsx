import React, {useState} from "react";
import style from './style.module.scss';
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import AwardCard from "../AwardCard/AwardCard.jsx";
import {useFetchAllAwards} from "../../../hooks/fetchAwards.js";
import AwardCardButton from "../AwardCard/AwardCardButton.jsx";

const AllAwards = () => {
    const awards = useFetchAllAwards();
    const [selectedAward, setSelectedAward] = useState(null);

    const handleAwardClick = (award) => {
        setSelectedAward((prevAward) => (prevAward && prevAward._id === award._id ? null : award));
    };

    return (
        <section className={style.awards}>
            <div className={style.awardsList}>
                <div className={style.awardsWrapper}>
                    {awards.map((award) => (
                        <AwardCardButton
                            award={award}
                            selectedAward={selectedAward}
                            onClick={() => handleAwardClick(award)}
                            key={award._id}
                        />
                    ))}
                </div>

                {selectedAward && (
                    <div className={style.awardContent}>
                        <Typography>{selectedAward.content}</Typography>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllAwards;
