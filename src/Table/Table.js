import React from 'react'
import numeral from 'numeral'
import './Table.css'

function Table(props) {
    return (
        <div className='table'>
            {props.countryDetails.map((country, i) => {
                return (
                    <tr key={i}>
                        <td>{country.country}</td>
                        <td><strong>{numeral(country.cases).format(0,0)}</strong></td>
                    </tr>
                )
            })}
        </div>
    )
}

export default Table
