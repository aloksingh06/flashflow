import React, { createContext, useState } from 'react'

export const context = createContext({
    isOpen : false,
    setIsOpen: () => {},
})

export const ContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <context.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </context.Provider>
    )
}

