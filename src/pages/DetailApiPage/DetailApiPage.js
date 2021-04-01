import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import Loader from '../../components/Loader/Loader';
import style from '../../styles/api.module.scss'

const DetailApiPage = () => {
    const [api, setApi] = useState(null);
    const [obtainedApi, setObtainedApi] = useState(null)
    const apiId = useParams().id
    const { request, loading } = useHttp()
    const [covidCountry, setCovidCountry] = useState(null)

    const getApi = useCallback(async () => {
        try {
            const fetched = await request(`http://localhost:5000/api/get-api/${apiId}`, 'GET', null)
            setApi(fetched)
            const apiData = await request(fetched.api, 'GET', null)
            setObtainedApi(apiData)
        } catch { }
    }, [apiId, request])

    const chooseCovidCountry = (e) => {
        e.preventDefault();
        let countryInput = e.target.elements.country.value;
        obtainedApi.Countries.forEach(country => {
            if (country.Slug === countryInput.toLowerCase()) {
                return setCovidCountry(country) 
            }
            
        })
        e.target.elements.country.value = ''
    }

    useEffect(() => {
        getApi()
    }, [getApi])

    if (loading || !obtainedApi) {
        return <Loader />
    }

    if (api && api.name === "Edamam nutrition Food Database") {
        return <div className={style.container}>
            <h1 className={style.api_title}>{api.name}</h1>
            {obtainedApi && obtainedApi.hints.map(food => {
                return <div key={food.food.foodId} className={`${style.card} ${style.food}`}>
                    <div className={style.apple}><i className="fas fa-apple-alt"></i></div>
                    <h2 className={style.card__title}>{food.food.label}</h2>
                    <div className={style.api_data}>Категория: {food.food.category}</div>
                    <div className={style.api_data}>Углеводы: {food.food.nutrients.CHOCDF.toFixed(3)}г</div>
                    <div className={style.api_data}>Протеин: {food.food.nutrients.PROCNT.toFixed(3)}г</div>
                    <div className={style.api_data}>Энергетическая ценность: {food.food.nutrients.ENERC_KCAL.toFixed(1)}ккал</div>
                </div>
            })}
        </div>
    }

    if (api && api.name === "Cat Facts") {
        return <>

            <div className={style.container}>
                <h1 className={style.api_title} style={{ marginTop: '70px' }}>{api.name}</h1>
                <div className={style.cat_api}>{obtainedApi.text}</div>
            </div>
        </>
    }
    if (api && api.name === "Covid-19 API") {
        return <>
            <h1 className={style.api_title} style={{ marginTop: '70px' }}>{api.name}</h1>
            <div className={style.covid__input}>
                <form onSubmit={chooseCovidCountry}>
                    <input type='text' name="country" placeholder='Введите город (на англ)' />
                </form>
            </div>
            <div className={style.container} style={{ marginTop: '25px' }}>


                {!!covidCountry
                    ?
                    <div className={`${style.card} ${style.center_card}`}>
                        <div className={style.card__title}>{covidCountry.Country}</div>
                        <div className={style.api_data}>Недавно заболело: <b>{covidCountry.NewConfirmed}</b></div>
                        <div className={style.api_data}>Недавно умерло: <b>{covidCountry.NewDeaths}</b></div>
                        <div className={style.api_data}>Недавно выздоровело: <b>{covidCountry.NewRecovered}</b></div>
                        <div className={style.api_data}>Всего заболело: <b>{covidCountry.TotalConfirmed}</b></div>
                        <div className={style.api_data}>Всего умерло: <b>{covidCountry.TotalDeaths}</b></div>
                        <div className={style.api_data}>Всего выздоровело: <b>{covidCountry.TotalRecovered}</b></div>
                    </div>

                    : <div className={`${style.card} ${style.center_card}`}>
                        <div className={style.card__title}>Global</div>
                        <div className={style.api_data}>Недавно заболело: <b>{obtainedApi.Global.NewConfirmed}</b> человек</div>
                        <div className={style.api_data}>Недавно умерло: <b>{obtainedApi.Global.NewDeaths}</b> человек</div>
                        <div className={style.api_data}>Недавно выздоровело: <b>{obtainedApi.Global.NewRecovered}</b> человек</div>
                        <div className={style.api_data}>Всего заболело: <b>{obtainedApi.Global.TotalConfirmed}</b> человек</div>
                        <div className={style.api_data}>Всего умерло: <b>{obtainedApi.Global.TotalDeaths}</b> человек</div>
                        <div className={style.api_data}>Всего выздоровело: <b>{obtainedApi.Global.TotalRecovered}</b> человек</div>
                    </div>
                }



            </div>
        </>
    }

    if (api && api.name === 'Dog API') {
        return <div className={style.container}>
            <h1 className={style.api_title}>{api.name}</h1>
            <h1 className={style.api_subtitle}>Dog: Affenpinscher</h1>
            {obtainedApi.message.map((dog, i) => {
                return <div key={`${dog}_${i}`} className={`${style.card}`}>
                    <img src={dog} className={style.card__img} alt=''/>
                </div>
            })}
        </div>
    }

    if (api && api.name === "Lorem Picsum") {
        return (
            <>
                <h1 className={style.api_title}>{api.name}</h1>
                <div className={style.container}>
                    {obtainedApi.map((photo,i)=>{
                        return <div key={`${photo.id}_${i}`} className={`${style.card} ${style.lorem_card}`}>
                            <img className={style.card__img} src={photo.download_url} alt=''/>
                            <div className={style.api_data}>{photo.author}</div>
                            <div className={style.api_data}>Ширина {photo.width} пикселей</div>
                            <div className={style.api_data}>Высота {photo.height} пикселей</div>
                            <div className={style.card__link}><a href={`${photo.download_url}`} target='_blank' rel="noreferrer">Смотреть оригинал</a></div>
                        </div>
                    })}
                </div>
            </>
        )
    }

    if (api && api.name === "OpenWeather") {
        return (
            <>
                <h1 className={style.api_title}>{api.name}</h1>
                <div className={style.container}>
                    <div className={`${style.card} ${style.center_card}`}>
                        <div className={style.card__title}>{obtainedApi.name} {obtainedApi.sys.country}</div>
                        <div className={style.api_data}>Температура {obtainedApi.main.temp.toFixed(0)} c&deg;</div>
                        <div className={style.api_data}>Давление {obtainedApi.main.pressure} гПа</div>
                        <div className={style.api_data}>Скорость ветра {obtainedApi.wind.speed.toFixed(1)} м/с</div>
                        <div className={style.api_data}>Облачность {obtainedApi.clouds.all}%</div>
                        <div className={style.api_data}>{obtainedApi.weather[0]["description"]}</div>
                        <div className={style.api_data}>
                            <img src={`https://openweathermap.org/img/wn/${obtainedApi.weather[0]["icon"]}@2x.png`} alt=''/>
                        </div>
                    </div>

                </div>
            </>
        )
    }


    return (
        <div>
            <h1>Api not found</h1>
        </div>
    );
}

export default DetailApiPage;
