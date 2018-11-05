import Link from 'next/link';
import Layout from '../components/Layout';

const buttonStyle = {
    fontSize: '20px',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: 10,
    color: '#e9dbf9',
    backgroundColor: '#3e1472'
};

export default () => {
    return (
        <Layout>
            <p>Hello Next.JS!</p>
            <Link href={'/about'}>
                <a style={buttonStyle}>About Page</a>
            </Link>
            <Link href={'/about'}>
                <button>Go to About Page</button>
            </Link>
        </Layout>
    );
};
