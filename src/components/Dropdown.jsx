import { coins } from '../config/coins';
import { intervals } from '../config/intervals';

const Dropdown = ({ selectedCoin, selectedInterval, onCoinChange, onIntervalChange }) => {
  return (
    <div className="inline-flex flex-wrap justify-center gap-6">
      <select
        className="p-2 border rounded"
        value={selectedCoin}
        onChange={(e) => onCoinChange(e.target.value)}
      >
        {coins.map((coin) => (
          <option key={coin.symbol} value={coin.symbol}>{coin.label}</option>
        ))}
      </select>

      <select
        className="p-2 border rounded"
        value={selectedInterval}
        onChange={(e) => onIntervalChange(e.target.value)}
      >
        {intervals.map((interval) => (
          <option key={interval.value} value={interval.value}>{interval.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
