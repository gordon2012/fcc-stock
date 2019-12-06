import React from 'react';

import Code from './Code';

const Form = ({ blank, children, debug, onSubmit, ...restProps }) => {
    let elements = React.Children.toArray(children);

    const [input, setRawInput] = React.useState(
        blank
            ? elements
                  .filter(e => e.props.name)
                  .map(e => e.props.name)
                  .reduce((a, c) => ({ ...a, [c]: '' }), {})
            : {}
    );

    const setInput = (name, value) => {
        if (blank) {
            setRawInput(prevState => ({ ...prevState, [name]: value }));
        } else {
            if (value) {
                setRawInput(prevState => ({ ...prevState, [name]: value }));
            } else {
                setRawInput(prevState => {
                    const { [name]: __, ...newState } = prevState;
                    return newState;
                });
            }
        }
    };

    elements = elements.map((ele, i) => {
        if (ele.props.name) {
            return React.cloneElement(ele, {
                onChange: setInput,
                value: input[ele.props.name],
            });
        } else if (ele.props.type === 'reset') {
            return React.cloneElement(ele, {
                onClick: () => setRawInput({}),
            });
        } else {
            return ele;
        }
    });

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(input);
        setRawInput(
            blank
                ? elements
                      .filter(e => e.props.name)
                      .map(e => e.props.name)
                      .reduce((a, c) => ({ ...a, [c]: '' }), {})
                : {}
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit} {...restProps}>
                {elements}
            </form>
            {debug && Object.keys(input).length > 0 && <Code box>{input}</Code>}
        </>
    );
};

export default Form;
