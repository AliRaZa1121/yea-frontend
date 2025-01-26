import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Layout = lazy(() => import('../layout'));

function Pages() {
    return (
        <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center',
             alignItems: 'center', height: '100vh', width: '100vw',
             backgroundColor: 'rgba(0,0,0,0.1)'
            }}>
                <Spin spinning size="large" />
            </div>
        }>
            <Layout />
        </Suspense>
    );
}

export default Pages;
