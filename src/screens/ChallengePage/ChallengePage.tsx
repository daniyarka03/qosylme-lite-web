import React, {useEffect, useRef, useState} from 'react';
import "./ChallengePage.css";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_CHALLENGE_ONE} from "../../graphQL/Queries";
import ArrowBackIcon from "../../assets/ArrowBack.svg";
import style from "../EventPage/EventPage.module.css";
import Logo from "../../assets/Logo.png";
import {Button, Chip} from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    ADD_GUEST_TO_EVENT,
    ADD_PARTICIPATION_CHALLENGE,
    DELETE_GUEST_FROM_EVENT,
    DELETE_PARTICIPATION_CHALLENGE, UPDATE_PARTICIPATION_CHALLENGE, UPLOAD_FILE
} from "../../graphQL/Mutations";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import ModalSuccessJoinedChallenge from "../../components/ModalSuccessJoinedChallenge/ModalSuccessJoinedChallenge";
import {
    useModalSuccessJoinChallengeStore,
    useModalSuccessJoinEventStore,
    useModalUploadingResultChallengeStore
} from "../../store/store";
import {motion} from "framer-motion";
import ChallengeUploadingResultModal
    from "../../components/ChallengeUploadingResultModal/ChallengeUploadingResultModal";

interface ChallengePageProps {
    name: string;
    description: string;
    deadline: string;
    xp_award: number;
    coins_award: number;
    image_cover: string;
    photos: string[];
    participants: any[];
}
const ChallengePage = () => {

    const profileData = useInfoProfile();
    const {id} = useParams();
    const {data, loading} = useQuery(GET_CHALLENGE_ONE, {
        variables: {challengeId: id}
    });
    const [result, setResult] = useState<string>('');
    const [challenge, setChallenge] = useState<ChallengePageProps>();
    const [isMobile, setIsMobile] = useState(false);
    const [fontSizeTitle, setFontSizeTitle] = useState('40px');
    const [bottomMarginsRewards, setBottomMarginsRewards] = useState('80px');
    const [stateJoinText, setStateJoinText] = React.useState('Join challenge');
    const h1Ref = useRef(null);
    const [addParticipantChallenge, { loading: updateLoading, error: updateError }] = useMutation(ADD_PARTICIPATION_CHALLENGE);
    const [deleteParticipantChallenge, { loading: deleteGuestsLoading, error: deleteGuestsError }] = useMutation(DELETE_PARTICIPATION_CHALLENGE);
    const [updateParticipantChallenge, { loading: updateParticipantLoading, error: updateParticipantError }] = useMutation(UPDATE_PARTICIPATION_CHALLENGE);
    const [participantsChallenge, setParticipantsChallenge] = useState<any[]>([]);
    const {toggleModal} = useModalSuccessJoinChallengeStore();
    const {toggleModal: toggleModalChallenge, image, toggleImage, participantsId, setParticipantsId} = useModalUploadingResultChallengeStore();
    const [uploadFile] = useMutation(UPLOAD_FILE);
    useEffect(() => {
        if (data) {
            setChallenge(data.getChallengeById)
            setParticipantsChallenge(data.getChallengeById.participants)
            if (profileData && data.getChallengeById.participants.find((guest: any) => guest.user.user_id === profileData.user_id)) {
                setStateJoinText('Leave challenge')
            } else {
                setStateJoinText('Join challenge')
            }
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

    useEffect(() => {
        console.log("participantsChallenge: ", participantsChallenge)
        setParticipantsId(participantsChallenge);
        if (participantsChallenge) {
            const currentUserParticipiantId = participantsChallenge.filter((item: any) => {
                if (item.user.user_id === profileData.user_id) {
                    return item.participated_id;
                }
            });
            setResult(currentUserParticipiantId[0]);
        }
    }, [participantsChallenge]);
    const joinChallengeHandler  = async () => {
            const participants = participantsChallenge;
            console.log(participants)
            console.log("Deleting: ", participants && participants.find((guest: any) => guest.user.user_id === profileData.user_id))
            console.log("Creating: ", participants && !participants.find((guest: any) => guest.user.user_id === profileData.user_id))
            if (participants && participants.find((guest: any) => guest.user.user_id === profileData.user_id)) {
                const participated_id = participants.find((guest: any) => guest.user.user_id === profileData.user_id).participated_id;
                console.log(participated_id)

                const { data: deleteData } = await deleteParticipantChallenge({
                    variables: { participatedId: participated_id },
                });

                if (deleteData && deleteData.deleteChallengeParticipant) {
                    console.log("participantsChallenge:", participantsChallenge)
                    const deletedParticipant = participantsChallenge.filter((participant: any) => participant.user.user_id !== profileData.user_id);
                    console.log("deletedParticipant: ", deletedParticipant)
                    setParticipantsChallenge(deletedParticipant);
                    toast.success("You left from challenge", {
                        position: "top-center",
                        autoClose: 800,
                    });
                }
                setStateJoinText('Join challenge');
            }

            if (participants && !participants.find((guest: any) => guest.user.user_id === profileData.user_id)) {
                console.log("Joined")
                const { data: joinData } = await addParticipantChallenge({
                    variables: { userId: profileData.user_id, challengeId: id}
                });
                if (joinData && joinData.createChallengeParticipant) {
                    setParticipantsChallenge([...participantsChallenge, joinData.createChallengeParticipant]);
                    toggleModal();
                }
                setStateJoinText('Leave challenge');
            }
    }

    const handleUpload = async () => {
        try {
            if (image) {
                const base64Image = image.split(',')[1];
                try {
                    const uploadedImage = await uploadFile({ variables: { file: base64Image } });
                    console.log('Image uploaded successfully: ');
                    return uploadedImage.data.singleUploadFile; // Вернуть имя загруженного файла
                } catch (error) {
                    console.error('Error uploading image', error);
                    // Обработка ошибки при загрузке изображения
                    throw error; // Передать ошибку дальше
                }
            } else {
                console.error('No image selected');
                // Обработка случая, когда изображение не выбрано
                return null; // Если изображение не выбрано, вернуть null
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error; // Передать ошибку дальше
        }
    };

    const shareResult = async () => {
        toggleModalChallenge();
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: [0, 0.71, 0.2, 1.01]}}>
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
                                       <motion.div
                                           initial={{ opacity: 0, scale: 0.5 }}
                                           animate={{ opacity: 1, scale: 1 }}
                                           transition={{
                                               duration: 0.8,
                                               delay: 0.7,
                                               ease: [0, 0.71, 0.2, 1.01]}}
                                           className="challenge-page__reward-coins">
                                           <span><img src={Logo} />{challenge.coins_award} qcoins</span>
                                       </motion.div>
                                       <motion.div
                                           initial={{ opacity: 0, scale: 0.5 }}
                                           animate={{ opacity: 1, scale: 1 }}
                                           transition={{
                                               duration: 0.8,
                                               delay: 0.8,
                                               ease: [0, 0.71, 0.2, 1.01]}}
                                           className="challenge-page__reward-xp">
                                           <span>{challenge.xp_award} XP</span>
                                       </motion.div>
                                   </div>
                                   <div className="challenge-page__title-block">
                                       <motion.h1 initial={{ opacity: 0, scale: 0.5 }}
                                                  animate={{ opacity: 1, scale: 1 }}
                                                  transition={{
                                                      duration: 0.8,
                                                      delay: 0.5,
                                                      ease: [0, 0.71, 0.2, 1.01]}}  ref={h1Ref} className="challenge-page__title" style={{fontSize: fontSizeTitle}}>{challenge.name}</motion.h1>
                                   </div>
                               </div>
                           </div>
                           <div
                               className="challenge-page__info-block">
                               <motion.div
                                   initial={{ opacity: 0, scale: 0.5 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   transition={{
                                       duration: 0.8,
                                       delay: 0.6,
                                       ease: [0, 0.71, 0.2, 1.01]}}
                                   className="challenge-page__description">
                                   <h2 className="challenge-page__description-title">About challenge</h2>
                                   <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(challenge.description) }} style={{ whiteSpace: 'pre-wrap' }} className="challenge-page__description-text"></p>
                               </motion.div>
                           </div>
                           <motion.div
                               initial={{ opacity: 0, scale: 0.5 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{
                                   duration: 0.8,
                                   delay: 1.2,
                                   ease: [0, 0.71, 0.2, 1.01]}}
                               className={isMobile ? "challenge-page__join-mobile" : "challenge-page__join-desktop"}>
                                   <div className="challenge-page__subblock">
                                       <div className="challenge-page__count-users">
                                           <h2>Бесплатно</h2>
                                           {/*<p>Количество участников: {guestsList.length}</p>*/}
                                       </div>
                                       <Button  style={{
                                           width: "45%",
                                           height: "70px",
                                           fontWeight: "700",
                                           fontSize: "18px",
                                           borderRadius: "20px",
                                           border: "2px solid #fff"
                                       }}  className={style.eventBlockButton} color={stateJoinText === "Join challenge" ? "primary" : "danger"} onClick={() => joinChallengeHandler()}>{stateJoinText}</Button>
                                   </div>
                           </motion.div>
                           {stateJoinText !== "Join challenge" &&  (
                              <>

                                  <div className="challenge-page__info-block" style={{marginTop: "50px"}}>
                                      <h2 style={{fontSize: "24px", fontWeight: "700", marginBottom: "10px"}}>Result</h2>
                                      <div className="challenge-page__result-block">
                                          <div>
                                              {result && (
                                                  <img style={{width: "150px", height: "100%"}} src={import.meta.env.VITE_SERVER_URL + result.result} />
                                              )}
                                          </div>
                                          <div>
                                              <h3>Ваш результат опубликованный</h3>
                                              <Chip className="challenge-page__result-status" color="warning">На рассмотрении</Chip>
                                          </div>
                                      </div>
                                      <Button  style={{
                                          width: "100%",
                                          height: "70px",
                                          fontWeight: "700",
                                          fontSize: "18px",
                                          borderRadius: "20px",
                                          border: "2px solid #fff"
                                      }}  className={style.eventBlockButton} color="primary"  onClick={() => shareResult()}>Share your result</Button>
                                  </div>

                              </>
                           )}
                           <ToastContainer limit={1} />
                           <ModalSuccessJoinedChallenge challenge={challenge} />
                           <ChallengeUploadingResultModal />
                       </>
                    )}
                </div>

            )}
        </motion.div>
    );
};

export default ChallengePage;