import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

export const getFlights = createAsyncThunk(
    "flight/getFlights",
    async () => {
        //1)api isteği at
        const res = await axios.request(options) //constatnt.js verilere istek at
       
        //2)gelen veriyi formatla(consoleda 311 değer içinde 19 farklı veri geliyor bunlardan lazım olanı alıyoruz)
        const refinedData=res.data.aircraft.map((i)=> ({
            id:i[0],
            code:i[1],
            lat:i[2],
            lng:i[3],
        }))
   
        //3) formatlanan veriyi payload olarak belirle slice aktar
        return refinedData;
    }
    );
