import { useSelector } from "react-redux"

const Header = () => {
    const state = useSelector((store)=>store);
    
    return (
    <header>
        <div>
            <img src="/plane-l.png" />
            <h3>Uçuş Radarı</h3>
        </div>
        <p>{
        state.isLoading ? "Lütfen bekleyin, uçuşlar hesaplanıyor."
        : state.isError ? "Bir Hata Oluştu :( "
        : state.flights.length + "Uçuş Bulundu"    
        }</p>
    </header>
   
  )
}

export default Header
