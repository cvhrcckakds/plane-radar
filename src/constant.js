//Api de oluşturduğumuz verileri buraya yapıştırıp export ediyoruz


export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
      bl_lat: '34.503215',
      bl_lng: '25.324261',
      tr_lat: '42.869652',
      tr_lng: '44.552871',
      limit: '300'
    },
    headers: {
      'X-RapidAPI-Key': 'b3a8459b6dmsh64bb6d176f81af1p174ce5jsnf58fa4be6dcf',
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };

  export const options2 ={
    headers: {
      'X-RapidAPI-Key': 'b3a8459b6dmsh64bb6d176f81af1p174ce5jsnf58fa4be6dcf',
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }

  }