import Select, { StylesConfig } from 'react-select'

const selectStyles: StylesConfig = {
    control: (styles) => ({
        ...styles,
        backgroundColor: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        boxShadow: 'none',
        cursor: 'pointer',
        fontSize: 13,
        minHeight: 30,
        minWidth: 110,
    }),
    menu: (styles) => ({
        ...styles,
        border: 'none',
        borderRadius: '0.5rem',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
    }),
    option: (styles, { isSelected, isFocused }) => ({
        ...styles,
        backgroundColor: (isSelected ? '#585292' : (isFocused ? 'rgba(88, 82, 146, 0.3)' : '#ffffff')),
        cursor: 'pointer',
        fontSize: 13,
        borderRadius: '0.5rem',
        marginBottom: '0.3rem',
        paddingBottom: '0.1rem',
        paddingTop: '0.1rem',
        '&:last-child': {
            marginBottom: 0
        },
        '&:active': {
            backgroundColor: 'rgba(88, 82, 146, 0.5)'
        }
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        display: 'none'
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        padding: '0 8px'
    }),
    clearIndicator: (styles) => ({
        ...styles,
        padding: 0
    })
}

type selectProps = {
    name: string,
    options: any,
    onChange: any,
    defaultValue?: any
}

const SelectField = (props: selectProps) => {
    return (
        <Select
            {...props}
            styles={selectStyles}
            isSearchable={false} />
    )
}

export default SelectField