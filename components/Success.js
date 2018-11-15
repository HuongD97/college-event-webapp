const SuccessMessage = props => {
    const successStyle = {
        color: 'green',
        marginBottom: '15px',
    };
    return <div style={successStyle}>{props.message}</div>;
};

export default SuccessMessage;
