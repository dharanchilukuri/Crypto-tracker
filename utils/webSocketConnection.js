import  store  from './store'; 
import { setCandlestickData } from './cryptoSlice';

export const connectToWebSocket = (selectedCoin, selectedInterval, newData) => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin}@kline_${selectedInterval}`);
      console.log(`WebSocket connected to ${`wss://stream.binance.com:9443/ws/${selectedCoin}@kline_${selectedInterval}`}`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.k) {
          const candle = {
            time: data.k.t,   // Timestamp
            open: data.k.o,   // Open price
            high: data.k.h,   // High price
            low: data.k.l,    // Low price
            close: data.k.c,  // Close price
          };          
          // Dispatch the candle data as an object
          store.dispatch(setCandlestickData(candle));
        }
      };
      

  ws.onclose = () => {
    console.log('Previous WebSocket closed.');
  };

  return ws; // Return the WebSocket instance for potential closing
};
