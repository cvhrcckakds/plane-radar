import { useEffect, useState } from "react"
import Header from "./components/Header"
import ListView from "./pages/ListView"
import MapView from "./pages/MapView"
import { useDispatch } from "react-redux"
import { getFlights } from "./redux/slices/flightAction"
import Modal from "./components/Modal"


function App() {
  const [isMapView, setIsMapView]=useState(true) //başlangıçta harita görüntüsü açılsın
  const [isOpen, setIsOpen]=useState(false);
  const [detailId, setDetailId]=useState(null)

  //modalı açar
const openModal=(id)=>{
  setDetailId(id); //hangi uçak için açıldığı state
  setIsOpen(true); //modalı açar
}

//modalı kapatır
const closeModal = ()=>{
  setDetailId(null);
  setIsOpen(false);
}

//aksiyonu çalıştır
const dispatch=useDispatch();

useEffect(()=>{
  setInterval(()=> {dispatch(getFlights())}, 60000) //canlı veri akışı için
},[])

  return (
    <>
    <Header/>
    <div className="view-buttons">
      <button 
      className={isMapView ? "active": "" }
      onClick={()=>setIsMapView(true)}>Harita Görünümü</button>
      <button
      className={!isMapView ? "active": "" } 
      onClick={()=>setIsMapView(false)} >Liste Görünümü</button>
    </div>

{/* hangi bileşenin ekrana geleceğini belirleme  */}
{isMapView ?  <MapView openModal={openModal}/> : <ListView openModal={openModal} />}

{/* modal bileşeni */}
{isOpen&& (<Modal detailId={detailId} closeModal={closeModal}/>)}
    
    </>
  )
}

export default App
