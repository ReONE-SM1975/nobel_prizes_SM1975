import React from 'react';

export default function Datalist({ id, options = [{"id":"none0", "item":"none"}] }) {
    // const [optionsList,] = useState(options)
    return (
            <>
            <datalist id={id}>
                {
                    options.map(option => 
                        <option 
                            key={option.id} value={`${option.item}`} />
                    )
                }
            </datalist>
            </>
    )
}