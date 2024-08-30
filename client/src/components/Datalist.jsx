import React from 'react';

export default function Datalist({ id, options }) {
    // const [optionsList,] = useState(options)
    return (
            <>
            <datalist id={id}>
                {
                    options.map(option => 
                        <option 
                            key={option.id} value={`${option.item}`}></option>
                    )
                }
            </datalist>
            </>
    )
}