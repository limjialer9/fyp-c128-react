import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Forecasting from "./pages/forecasting/Forecasting";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Masterproductionscheduling from "./pages/masterproductionscheduling/Masterproductionscheduling";
import Architecture from "./pages/architecture/Architecture";
import Ordering from "./pages/ordering/Ordering";
import Orderinghistory from "./pages/orderinghistory/Orderinghistory";
import Mrp from "./pages/mrp/mrp";
import Projectinfo from "./pages/projectinfo/projectinfo";
import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";
import 'trendline';

//Fetching data from DynamoDB through API upon app launch
const useFetch = () => {
  const [dataAPI, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect((url = process.env.REACT_APP_API) => {
    //Retrieve from orders-dev by specifying value to be orderhistory
    async function fetchData() {
      const response = await fetch(url, { method: 'GET', headers: { 'value': 'orderweekly' } });
      const dataAPI = await response.json();
      console.log('weekly-order data on initialisation:');
      console.log(dataAPI)

      //I think when this guy says "data", he means orders-dev and "dataAPI" is weekly-order
      setData(dataAPI);
      setLoading(false);
    }
    fetchData();
  }, []);
  return { dataAPI, loading };
};

function App() {
  //Why is useState 400 for all my overridevalues?
  //Overridevalues imported from Masterproductionscheduling
  const [overridevalue1, setOverridevalue1] = useState(400);
  const [overridevalue2, setOverridevalue2] = useState(400);
  const [overridevalue3, setOverridevalue3] = useState(400);
  const [overridevalue4, setOverridevalue4] = useState(400);
  const [overridevalue5, setOverridevalue5] = useState(400);
  const [overridevalue6, setOverridevalue6] = useState(400);
  const [overridevalue7, setOverridevalue7] = useState(400);
  const [overridevalue8, setOverridevalue8] = useState(400);
  const [overridevalue9, setOverridevalue9] = useState(400);
  const [overridevalue10, setOverridevalue10] = useState(400);
  const [overridevalue11, setOverridevalue11] = useState(400);
  const [overridevalue12, setOverridevalue12] = useState(400);
  const [overridevalue13, setOverridevalue13] = useState(400);
  const [overridevalue14, setOverridevalue14] = useState(400);
  const [dateList, setdateList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [MPSdata, setMPSdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const { dataAPI, loading } = useFetch()
  useEffect(() => {
    if (dataAPI !== null) {
      var keys = Object.keys(dataAPI)
      var values = Object.values(dataAPI)
      const createTrend = require('trendline');
      const LRdata = []
      for (let i = 0; i < keys.length; i++) {
        LRdata.push({ y: values[i], x: i + 1 })
      }
      console.log('weekly-order data compiled for display in graph:')
      console.log(LRdata)
      const trend = createTrend(LRdata, 'x', 'y')
      console.log('Trendline for linear regression:')
      console.log(trend.calcY(12))
      setOverridevalue1(Math.round(trend.calcY(45)))
      setOverridevalue2(Math.round(trend.calcY(46)))
      setOverridevalue3(Math.round(trend.calcY(47)))
      setOverridevalue4(Math.round(trend.calcY(48)))
      setOverridevalue5(Math.round(trend.calcY(49)))
      setOverridevalue6(Math.round(trend.calcY(50)))
      setOverridevalue7(Math.round(trend.calcY(51)))
      setOverridevalue8(Math.round(trend.calcY(52)))
      setOverridevalue9(Math.round(trend.calcY(53)))
      setOverridevalue10(Math.round(trend.calcY(54)))
      setOverridevalue11(Math.round(trend.calcY(55)))
      setOverridevalue12(Math.round(trend.calcY(56)))
      setOverridevalue13(Math.round(trend.calcY(57)))
      setOverridevalue14(Math.round(trend.calcY(58)))

      const result = [];
      const date = new Date(keys[44]);
      console.log('Historical week values on x-axis of graph')
      console.log(keys)

      // Add one day to ensure we start on a Sunday - I dont think this guy did it
      date.setDate(date.getDate());

      // Loop through the next 15 weeks, adding each Sunday to the result array
      for (let i = 0; i < 15; i++) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        result.push(`${year}-${month}-${day}`);

        date.setDate(date.getDate() + 7); // Add 7 days to get to next Sunday
      }

      console.log('Forecasted week values on x-axis of graph')
      console.log(result)
      setdateList(result)
    }
  }, [dataAPI])
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="main">
          <UserContext.Provider value={{
            overridevalue1, setOverridevalue1,
            overridevalue2, setOverridevalue2,
            overridevalue3, setOverridevalue3,
            overridevalue4, setOverridevalue4,
            overridevalue5, setOverridevalue5,
            overridevalue6, setOverridevalue6,
            overridevalue7, setOverridevalue7,
            overridevalue8, setOverridevalue8,
            overridevalue9, setOverridevalue9,
            overridevalue10, setOverridevalue10,
            overridevalue11, setOverridevalue11,
            overridevalue12, setOverridevalue12,
            overridevalue13, setOverridevalue13,
            overridevalue14, setOverridevalue14,
            MPSdata, setMPSdata,
            dateList, setdateList,
            dataAPI, loading
          }}>
            <Routes>
              <Route exact path="" element={<Home />} />
              <Route exact path="/ordering" element={<Ordering />} />
              <Route exact path="/orderinghistory" element={<Orderinghistory />} />
              <Route exact path="/forecasting" element={<Forecasting />} />
              <Route exact path="/mps" element={<Masterproductionscheduling />} />
              <Route exact path="/mrp" element={<Mrp />} />
              <Route exact path="/architecture" element={<Architecture />} />
              <Route exact path="/projectinfo" element={<Projectinfo />} />
              <Route exact path='/linkedin' component={() => {
                window.location.href = 'https://linkedin.com/in/nathan-lim-jia-ler';
                return null;
              }} />
            </Routes>
          </UserContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
