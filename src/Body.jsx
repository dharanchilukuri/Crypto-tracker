import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from './components/Chart';
import Dropdown from './components/Dropdown';
import { connectToWebSocket } from '../utils/webSocketConnection';
import { setSelectedCoin, setSelectedInterval, setCandlestickData } from '../utils/cryptoSlice';
import { coins } from './config/coins';
import { intervals } from './config/intervals';



const Body = () => {
  const dispatch = useDispatch();
  const { selectedCoin, selectedInterval, candlestickData } = useSelector((state) => state.crypto || {});
  
  // Define wsRef to hold the WebSocket connection
  const wsRef = useRef(null);

   // Initialize the coinData for each coins with empty arrays
   const coinData = useRef(
    coins.reduce((acc, coin) => {
      acc[coin.symbol] = [];
      return acc;
    }, {})
  );

  // Connect to WebSocket whenever coin or interval changes
  useEffect(() => {
    wsRef.current = connectToWebSocket(selectedCoin, selectedInterval, (newData) => {
      console.log("Received new data:", newData); // Logging the new data
      dispatch(setCandlestickData(newData));
    });


    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('closing current websocket');
      }
    };
  }, [selectedCoin, selectedInterval, dispatch]);

  

  return (
    <div className="h-screen w-full p-4 flex flex-col">
      <div className='flex flex-wrap justify-center gap-8 gap-y-6 py-6 items-center'>
        <Dropdown
          selectedCoin={selectedCoin}
          selectedInterval={selectedInterval}
          onCoinChange={(coin) => dispatch(setSelectedCoin(coin))}
          onIntervalChange={(interval) => dispatch(setSelectedInterval(interval))}
        />
      </div>
      <div className='flex p-4 grow justify-center items-center'>
        <Chart candlestickData={candlestickData} />
      </div>
    </div>
  );
};

export default Body;
