import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { options2 } from "../constant";
import { useDispatch } from "react-redux";
import { setTrail } from "../redux/slices/flightSlice";
import moment from "moment/moment";
import "moment/locale/tr"

const Modal = ({ detailId, closeModal }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //useEffect her çalıştığında önceki uçuş verilerini temizler bu sayede yükleniyor tetiklenir
    setData(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        dispatch(setTrail(res.data.trail));
        setData(res.data);
      })
      .catch((error) => {
        console.error("Flight detail request failed:", error);
      });
  }, [detailId]);


  // Slayt ayarları
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
const formatDate= (unix_time)=>{
  const date= new Date(unix_time*1000)
  return moment(date).calendar()
}
  return (
    <div className="detail-outher">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={closeModal}>X</span>
        </p>

        {!data ? (
          <div className="wrapper">
            <div className="loader">
              <div className="face">
                <div className="circle"></div>
              </div>
              <div className="face">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        ) : !data.airport.origin || !data.airport.destination ? (
          <div>
            <p>{data.airline?.name}</p>
            <p>
              D İ K K A T ! <br /> Bu Uçuşun; <br /> Tüm Verileri Gizlidir.{" "}
            </p>
          </div>
        ) : (
          <>
            <h2>{data.aircraft.model.text}</h2>
            <h2>{data.aircraft.model.code}</h2>
            <p>{data.aircraft.registrations}</p>

            {/* Slayt bileşeni */}
            <Slider {...sliderSettings}>
              {data.aircraft.images.large.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.src}
                    alt={`Slide ${index}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              ))}
            </Slider>
            <p>
              <span>Şirket: </span>
              <span>{data.airline.name}</span>
            </p>
            <p>
              <span>Kalkış: </span>
              <a target="_blank" href={data.airport.origin.website}>
                {data.airport.origin.name}
              </a>
            </p>

            <p>
              <span>Hedef: </span>
              <a target="_blank" href={data.airport.destination.name}>
                {data.airport.destination.name}
              </a>
            </p>
            <p>
              <span> Kalkış Saati: </span>
              <span>
                {
                  formatDate(data.time.scheduled.departure)
              }</span>
            </p>

            <p>
              <span> İniş Saati: </span>
              <span>
                {
                  formatDate(data.time.scheduled.arrival)
              }</span>
            </p>

            <p className={data.status.icon}>
              <span>{data.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
