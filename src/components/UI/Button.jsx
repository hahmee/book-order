import React from 'react';

const Button = ({ children, textOnly, className, ...props}) => {

    let sCss = textOnly ? 'text-button' : 'button';

    sCss += ' ' + className;

    return (
        <button className={sCss} {...props}>{children}</button>
    );
}

export default Button;