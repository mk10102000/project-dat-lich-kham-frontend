import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import styles from './InputControl.module.css';

function SelectControl({ name, control, placeholder, values }) {
  console.log(values);
  // const options = values?.map((value) => ({
  //   label: value,
  //   value: value,
  // }));
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => (
        <>
          <Select
            name={name}
            options={values}
            placeholder={placeholder}
            onChange={(selectedOption) => {
              onChange(selectedOption.value);
            }}
            onBlur={onBlur}
            value={values.find((c) => c.value === value)}
          />
          <Form.Text
            className="text-danger"
            style={{
              fontSize: '1.6rem',
              paddingTop: '0.5rem',
              display: 'block',
            }}
          >
            {/* {error.message} */}
          </Form.Text>
        </>
      )}
    />
  );
}

export default SelectControl;
