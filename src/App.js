import { useState, useEffect } from 'react';
import AddProduct from './addProduct';
import Categ from './addCateg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PoS from './POS';
import Reports from './report';
import GraphData from './Home';

export default function CollapsibleExample() {
  var labelStocks = [];
  var dataStocks = [];
  const [catList, setCatList] = useState([]);
  const [prodList, setProdList] = useState([]);

  const [report, setReport] = useState([]);

  // Update prodList whenever arrayForProd changes
  const handleProdList = (arrayForProd) => {
    setProdList(arrayForProd);
  };

  useEffect(() => {
    // This will execute whenever prodList changes
    handleProdList(prodList);
  }, [prodList]);

  const handleCatList = (arrayFromAddCateg) => {
    setCatList(arrayFromAddCateg);
  };
  const handleReport = (arrayFromReport) => {
    setReport(arrayFromReport);
  };

  return (
    <>
  <div className="sticky-top bg-light shadow-sm">
      <Tabs

        defaultActiveKey="profile"
        id="justify-tab-example"
        className="nav nav-tabs border-0 justify-content-center "
        style={{ borderBottom: '2px solid #ccc' }}
      >
        <Tab eventKey="home" title="Home" className="nav-item">
          <div className="nav-link text-muted">
            {
              prodList.forEach(element => {
                labelStocks.push(element.prodName)
                dataStocks.push(element.prodStocks)
              })
            }
          <GraphData labelStocks={labelStocks} dataStocks={dataStocks}  report={report} prodList={prodList}/>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Add Product" className="nav-item">
          {/* <AddProduct categList={catList} onSendArrayToProd={handleProdList}/> */}
          <AddProduct categList={catList} onSendArrayToProd={handleProdList} prodList={prodList} />

        </Tab>
        <Tab eventKey="longer-tab" title="Add Category" className="nav-item">
          <Categ onSendArrayToCateg={handleCatList} />
        </Tab>
        <Tab eventKey="POS" title="Add POS" className="nav-item ">
          <PoS prodList={prodList} categList={catList} setProdList={setProdList}  onSendArrayReps={handleReport} onSendArrayToProd={handleProdList}/>
        </Tab>
        <Tab eventKey="Reports" title="Sales Report" className="nav-item ">
          <Reports prodList={prodList} categList={catList} report={report} />
        </Tab>
      </Tabs>
    </div>
    </>
  );
}


