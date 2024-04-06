import React, {useEffect, useRef, useState} from 'react';
import "./ChallengePage.css";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_CHALLENGE_ONE} from "../../graphQL/Queries";
import ArrowBackIcon from "../../assets/ArrowBack.svg";
import style from "../EventPage/EventPage.module.css";
import Logo from "../../assets/Logo.png";

interface ChallengePageProps {
    name: string;
    description: string;
    deadline: string;
    xp_award: number;
    coins_award: number;
    image_cover: string;
    photos: string[];
}
const ChallengePage = () => {

    const {id} = useParams();
    const {data, loading} = useQuery(GET_CHALLENGE_ONE, {
        variables: {challengeId: id}
    });
    const [challenge, setChallenge] = useState<ChallengePageProps>();
    const [isMobile, setIsMobile] = useState(false);
    const [fontSizeTitle, setFontSizeTitle] = useState('40px');
    const [bottomMarginsRewards, setBottomMarginsRewards] = useState('80px');
    const h1Ref = useRef(null);
    useEffect(() => {
        if (data) {
            setChallenge(data.getChallengeById)
        }
    }, [data]);

    useEffect(() => {
        // Функция для определения размера шрифта
       if (challenge) {
           const calculateFontSize = () => {
               if (challenge.name.length <= 20) {
                   return '36px';
               } else if (challenge.name.length > 20) {
                   return '30px';
               }
               return '36px';
           };

           // Установка размера шрифта
           setFontSizeTitle(calculateFontSize());
       }
    }, [challenge]);

    useEffect(() => {
        if (h1Ref.current && challenge) {
            // Получаем DOM-узел элемента h1
            const h1Element: any = h1Ref.current;
            // Получаем высоту текста внутри элемента h1
            const height = h1Element.clientHeight;
            // Устанавливаем высоту текста в состояние
            console.log(height)
            if (challenge.name) {
                if (height <= 40) {
                    setBottomMarginsRewards('40px');
                }
                if (height > 40 && height <= 60) {
                    setBottomMarginsRewards('80px');
                }
                if (height > 60 && height <= 100) {
                    setBottomMarginsRewards('120px');
                }
                if (height > 100) {
                    setBottomMarginsRewards('160px');
                }
            }
        }
    }, [fontSizeTitle]);

    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };

    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        // Убираем прослушиватель при размонтировании компонента
        return () => window.removeEventListener('resize', detectDeviceType);
    }, []);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    // Список разрешенных тегов
    const allowedTags = ['b', 'ul', 'li'];

    // Функция для фильтрации разрешенных тегов
    const sanitizeHTML = (html: any) => {
        // Создаем виртуальный DOM-элемент
        const tempDiv = document.createElement('div');
        // Устанавливаем HTML содержимое
        tempDiv.innerHTML = html;
        // Фильтруем теги, оставляя только разрешенные
        tempDiv.querySelectorAll('*').forEach((node: any) => {
            if (!allowedTags.includes(node.tagName.toLowerCase())) {
                node.parentNode.removeChild(node);
            }
        });
        // Возвращаем отфильтрованное HTML содержимое
        return tempDiv.innerHTML;
    };

    return (
        <div>
            {loading ? <p>Loading...</p> : (
                <div className="challenge-page">
                    {isMobile && (<Link to={"/events"}><button className="challenge-page__back-button"><img src={ArrowBackIcon} /></button></Link>)}
                    {challenge && (
                       <>
                           <div className="challenge-page__header" style={{
                               background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.92) 100%), url(${challenge.image_cover}) lightgray 50% / cover no-repeat`,
                               borderRadius: isMobile ? "0 0 30px 30px" : "20px"
                           }}>
                               <div className="challenge-page__header-content">
                                   <div className="challenge-page__header-rewards" style={{bottom: bottomMarginsRewards}}>
                                       <div className="challenge-page__reward-coins">
                                           <span><img src={Logo} />{challenge.coins_award} qcoins</span>
                                       </div>
                                       <div className="challenge-page__reward-xp">
                                           <span>{challenge.xp_award} XP</span>
                                       </div>
                                   </div>
                                   <div className="challenge-page__title-block">
                                       <h1 ref={h1Ref} className="challenge-page__title" style={{fontSize: fontSizeTitle}}>{challenge.name}</h1>
                                   </div>
                               </div>
                           </div>
                           <div className="challenge-page__info-block">
                               <div className="challenge-page__description">
                                   <h2 className="challenge-page__description-title">About challenge</h2>
                                   <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(challenge.description) }} style={{ whiteSpace: 'pre-wrap' }} className="challenge-page__description-text"></p>
                               </div>
                           </div>
                       </>
                    )}
                </div>

            )}
        </div>
    );
};

export default ChallengePage;