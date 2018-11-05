import Link from 'next/link';
import Head from 'next/head';

const linkStyle = {
    marginRight: 15
};

const Header = () => (
    <div>
        <Head>
            <title>College Event Web Application</title>
        </Head>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
    </div>
);

export default Header;
