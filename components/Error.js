const ErrorMessage = props => {
    const errorStyle = {
        color: 'red',
        marginBottom: '15px',
    };
    return <div style={errorStyle}>{props.message}</div>;
};

export default ErrorMessage;
