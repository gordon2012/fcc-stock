import React from 'react';

const Flex = ({ column, full, ...props }) => (
    <div
        {...props}
        style={{
            display: 'flex',

            flexDirection: column ? 'column' : 'row',
            minHeight: full ? '100vh' : 'none',
        }}
    />
);

const Box = ({ flex, ...props }) => {
    const style = flex ? { flex: flex } : {};
    return <div {...props} style={style} />;
};

const Container = ({ width, ...props }) => {
    const style = width ? { maxWidth: width, margin: '0 auto' } : {};
    return <div {...props} style={style} />;
};

const Footer = () => (
    <footer
        style={{
            padding: '1rem 0',
            textAlign: 'center',
        }}
    >
        A{' '}
        <a
            href="https://freecodecamp.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            freeCodeCamp
        </a>{' '}
        Information Security and Quality Assurance Project
    </footer>
);

const Layout = ({ children }) => {
    return (
        <Flex full column>
            <Box flex={1}>
                <Container width="1000px">{children}</Container>
            </Box>
            <Box>
                <Footer />
            </Box>
        </Flex>
    );
};

export default Layout;
