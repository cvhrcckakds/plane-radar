import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from 'react-paginate';
import { useState } from "react";


const ListView = ({openModal}) => {
  const state = useSelector(store => store)

  // sayfa başına gösterilecek satır sayısı
  const itemsPerPage = 10;

  // gösterilecek ilk elemanın indeksi
  const [itemOffset, setItemOffset] = useState(0);

  // gösterilecek son elemanın indeksi
  const endOffset = itemOffset + itemsPerPage;

  // mevcut verileri alın
  const currentItems = state.flights.slice(itemOffset, endOffset);

  // toplam sayfa sayısını hesapla
  const pageCount = Math.ceil(state.flights.length / itemsPerPage);

  // Her sayfa değiştiğinde çalışır.
  const handlePageClick = (event) => {
    // gösterilecek ilk elemanın indeksini belirler
    const newOffset = event.selected * itemsPerPage;

    // stat'i günceller
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-hover mt-5 table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>KUYRUK KODU</th>
            <th>ENLEM</th>
            <th>BOYLAM</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((flight, index) => (
              <tr key={index}>
                <td>{flight.id}</td>
                <td>{flight.code}</td>
                <td>{flight.lat}</td>
                <td>{flight.lng}</td>
                <td>
                  <button onClick={()=> openModal(flight.id)}>Detay</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="İleri >"
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Geri"
        onPageChange={handlePageClick}
        className="pagination"
      />

    </div>
  )
}

export default ListView;
