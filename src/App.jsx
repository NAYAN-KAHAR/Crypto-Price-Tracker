import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { API_URL,API_KEY }  from './key';

const App = () => {
  const [crypto, setCrypto] = useState([]);
  const [value, setValue] = useState("");

  const dataAll = async () => {
    try {
      const response = await axios.get(API_URL,{
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
      console.log(response.data.result);
      setCrypto(response.data.result);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    dataAll();
  }, []);

  return (
    <>
      <div className="container-fluid py-3">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-12 col-mb-12 ">
            <div className="card">
             <div className="card-body">
              <h3 className="text-center mt-2">
                <b>Crypto Price Tracker </b>
              </h3>
             
                <input
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  className="form-control mb-4"
                  placeholder="Search Currency"
                  value={value}
                />
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Rank</th>
                      <th>Icon</th>
                      <th scope="col">Name</th>
                      <th scope="col">Symbol</th>
                      <th scope="col">Price</th>
                      <th scope="col">MarketCap</th>
                      <th scope="col">Volume</th>
                      <th>Available Supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crypto
                      .filter((item) =>
                        item.name.toLowerCase().includes(value.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.rank}</th>
                          <td>
                          <img 
                            onClick={() => window.open(item.explorers[2], '_blank')} 
                            src={item.icon} 
                            width={30} 
                            alt={item.name} 
                          ></img>
                           </td>
                          <td>{item.name}</td>
                          <td>{item.symbol}</td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>₹{item.marketCap.toLocaleString()}</td>
                          <td>₹{item.volume.toFixed(2)}</td>
                          <td>{item.availableSupply.toLocaleString()}</td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
