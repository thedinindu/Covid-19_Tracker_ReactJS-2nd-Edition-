import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

import './InfoBox.css'

function InfoBox({ title, cases, active, isCase, isRecovered, isDeath, total, ...props }) {
    console.log(cases)
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isCase && 'infoBox--case'} ${isRecovered && 'infoBox--recovered'} ${isDeath && 'infoBox--death'}`}>
            <CardContent>
                {console.log(cases)}
                <Typography className='textSecondary' style={{fontSize: '20px', color: 'white'}}><strong>{title}</strong></Typography>
                <h2 className={`infoBox__cases ${isCase && 'infoBox--case'} ${isRecovered && 'infoBox--recovered'} ${isDeath && 'infoBox--death'}`}>{cases}</h2>
                <Typography className='textSecondary'><strong>{total}</strong> <span style={{color: 'white'}}>Total</span></Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
