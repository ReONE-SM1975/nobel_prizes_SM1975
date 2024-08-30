import React from 'react';

export default function Datalist({ className, list, options = [] }) {

    return (
        <>
            <datalist list={list}>
                {
                    options.map((option) => {
                        <div className={`${className}`}
                            key={option.id}>
                            {option.item}
                        </div>
                    })
                }

            </datalist>
        </>
    )
}