import React from 'react'
import { MenuItem, FormControl, Select } from '@material-ui/core'

import './Header.css'

function Header(props) {
    return (
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={props.change} value={props.country}>
            <MenuItem value='worldwide'><span style={{color: 'black'}}>Worldwide</span></MenuItem>
              {
                props.countries.map((country, i) => {
                  return <MenuItem style={{color: 'black'}} key={country.value + i} value={country.value}>{country.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>
    )
}

export default Header
