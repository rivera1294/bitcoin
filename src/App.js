import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Card,
  Icon,
  Image,
  Segment,
  Dimmer,
  Loader,
  Select
} from 'semantic-ui-react';

function App() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rateType, setRateType] = useState(null);
  const options = [
    { value: 'USD', text: 'USD' },
    { value: 'EUR', text: 'EUR' },
    { value: 'GPB', text: 'GPB' }
  ];

  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRateType(data.bpi.USD.code);
        setPrice(data.bpi);
        setLoading(false);
      });
  }, []);

  const handleSelect = e => {
    console.log(e.target.value);
    setRateType(e.target.value);
  };

  if (!loading) {
    console.log('price', rateType);
  }

  return (
    <div className='App'>
      <div className='container'>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader>Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>
        ) : (
          <>
            <div className='form'>
              <select name='' onChange={handleSelect} id=''>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
              </select>
            </div>
            <div className='price'>
              <Card>
                <Card.Content>
                  <Card.Header>{price[rateType].code} Price</Card.Header>
                  <Card.Description>{price[rateType].rate}</Card.Description>
                </Card.Content>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
