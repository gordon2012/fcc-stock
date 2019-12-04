import React from 'react';

import { uuidv4 } from '../utils/utils';

const style = {
    wrap: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },

    label: {
        background: 'rgba(255, 255, 255, 0.2)',
        padding: ' 0.25rem 0.5rem',
        marginRight: ' 0.5rem',
        textAlign: ' right',
        flex: ' 1',
    },

    input: {
        flex: '3',
        fontFamily: `'Ubuntu Mono', monospace`,
        fontSize: '1em',
    },
};

const Input = ({ required, name, title, type, options, onChange, value }) => {
    const [id] = React.useState(() => uuidv4());

    const handleChange = event => {
        onChange(name, event.target.value);
    };

    return (
        <div required={required} style={style.wrap}>
            <label htmlFor={`${name}-${id}`} style={style.label}>
                {title || name}
            </label>

            {type === 'dropdown' ? (
                <select
                    id={`${name}-${id}`}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    required={required}
                    style={style.input}
                >
                    {[['', '--Please Select--'], ...options].map(
                        ([value, label], i) => (
                            <option key={i} value={value}>
                                {label}
                            </option>
                        )
                    )}
                </select>
            ) : (
                <input
                    id={`${name}-${id}`}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    required={required}
                    style={style.input}
                />
            )}
        </div>
    );
};

export default Input;
