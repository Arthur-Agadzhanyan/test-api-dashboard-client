import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useHttp } from '../../hooks/http.hook';
import style from '../../styles/api.module.scss'


const MainPage = () => {
    const [allApis, setAllApis] = useState([]);
    const { loading, request } = useHttp()
    const history = useHistory()
    const getApis = useCallback(async () => {
        try {
            const fetched = await request('http://localhost:5000/api/get-api/', 'GET', null)
            setAllApis(fetched)
        } catch { }
    }, [request])

    useEffect(() => {
        getApis()
    }, [getApis])

    if (loading) {
        return <Loader />
    }

    let randomCards = [...allApis]

    function setCards() {
        randomCards.sort(() => Math.random() - 0.5); // Math.random() - 0.5 отдаёт случайное число, которое может быть положительным или отрицательным, следовательно, функция сортировки меняет порядок элементов случайным образом.
        randomCards = randomCards.slice(0,3)  
    }
    if (allApis.length) {
        setCards()
    }

    return (<>
    <h2 className={`${style.api_title} ${style.main_title}`}>Public Api</h2>
            <div className={`${style.container} ${style.main_container}`}>
                
                {randomCards.map(api => {
                    return <div style={{ cursor: 'pointer' }} className={`${style.card} ${api.name === 'OpenWeather' ? style.black_card : ''}`} key={api._id} onClick={() => history.push(`/api/${api._id}`)}>
                        <div className={style.card__header}>
                            <img className={style.main__img} src={api.img} alt=''/>
                        </div>
                        <div className={style.title_container}>
                            <h5 className={style.card__title}>{api.name}</h5>
                        </div>
                        <div className={style.text_container}>
                            <div className={style.api_data}>{api.description}</div>
                        </div>
                    </div>
                })}
            </div>
</>
    );
}

export default MainPage;
