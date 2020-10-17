import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, CardContent } from '@material-ui/core'

import Header from './Header/Header'
import Map from './Map/Map'
import Table from './Table/Table'
import { sortData } from './util';
import InfoBoxes from './InfoBoxes/InfoBoxes';
import LineGraph from './LineGraph/LineGraph'
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({
     lat: 34.80746, lng: -40.4796
  })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
                name: country.country,
                value: country.countryInfo.iso2,
          }))

          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async(event) => {
    const countryCode = event.target.value

    const URL = countryCode === 'worldwide' ? 
      'https://disease.sh/v3/covid-19/all' : 
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(URL)
      .then(response => response.json())
      .then(data => {
          setCountryInfo(data)
          setCountry(countryCode)

          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setMapZoom(4)
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        <Header change={onCountryChange} country={country} countries={countries} />
        <InfoBoxes casesType={casesType} setCasesType={setCasesType} info={countryInfo} />
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      <div className="app__right">
        <Card className="right__side">
          <CardContent>
            <h3 style={{color: 'white'}}>Live Cases by Country</h3>
            <Table countryDetails={tableData} />
          </CardContent>
          <CardContent>
            <h3 style={{color: 'white'}}>Worldwide New {casesType}</h3>
            <LineGraph className='app__graph' casesType={casesType} />
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

export default App;
