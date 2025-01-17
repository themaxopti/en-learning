import React, { useState } from 'react'
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from '@mui/material'

const options = ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4']

interface Props {
  label: string
  options: string[]
  selectedOptions: string[]
  setSelectedOptions: any
  variant?: string
  size?: string
  className?: string
  handleChange: any
}

export const CheckBoxSelect: React.FC<Props> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  variant = 'standart',
  size = 'small',
  className = '',
  handleChange,
}) => {
  // const handleChange = (event: any) => {
  //   const {
  //     target: { value },
  //   } = event
  //   console.log(value)

  //   if (value.length === 0) {
  //     return
  //   }

  //   if (selectedOptions.length === 1) {
  //     const isSelectedItem = selectedOptions.find(el => el === value[0])
  //     console.log(isSelectedItem, 'sss')
  //   }
  //   setSelectedOptions(typeof value === 'string' ? value.split(',') : value)
  // }

  return (
    <>
      <FormControl className={className} variant="standard" sx={{}}>
        <InputLabel
          sx={{ background: '#F5F6FA' }}
          id="demo-simple-select-outlined-label"
        >
          {label}
        </InputLabel>
        <Select
          MenuProps={{
            sx: {
              '@media(max-width:600px)': {
                // transform: 'translateX(-6px)',
                transform: 'translateX(0)',
              },
            },
          }}
          labelId="demo-simple-select-outlined-label"
          placeholder="chose"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          renderValue={selected => selected[0]}
        >
          {options.map(option => (
            <MenuItem sx={{ padding: 0 }} key={option} value={option}>
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
