import React from 'react'
import { prettyPrintStat } from '../util'

import InfoBox from './InfoBox/InfoBox'
import './InfoBoxes.css'

function InfoBoxes(props) {

  console.log(props.info.todayCases)
  console.log(props.info.todayRecovered)
  console.log(props.info.todayDeaths)

    return (
        <div className="app__stat">
          <InfoBox 
            isCase
            active={props.casesType === 'cases'}
            onClick={e => props.setCasesType('cases')}
            title="Coronavirus cases" 
            cases={prettyPrintStat(props.info.todayCases)} 
            total={prettyPrintStat(props.info.cases)} 
          />
          <InfoBox 
            isRecovered
            active={props.casesType === 'recovered'}
            onClick={e => props.setCasesType('recovered')}
            title="Recovered" 
            cases={prettyPrintStat(props.info.todayRecovered)} 
            total={prettyPrintStat(props.info.recovered)} 
          />
          <InfoBox
            isDeath
            active={props.casesType === 'deaths'} 
            onClick={e => props.setCasesType('deaths')}
            title="Deaths" 
            cases={prettyPrintStat(props.info.todayDeaths)} 
            total={prettyPrintStat(props.info.deaths)} 
          />
        </div>
    )
}

export default InfoBoxes
