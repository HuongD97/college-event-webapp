import PropTypes from 'prop-types';

const Break = props => {
    return <div style={{ marginBottom: props.height + 'px' }} />;
};

Break.propTypes = {
    height: PropTypes.number.isRequired
};

export default Break;
