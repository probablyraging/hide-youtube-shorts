import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Loader, NavBar, PageHead, PowerButton } from './components';
import { HideShortsThemeProvider } from './theme';
import { ChannelPage, Disabled, FeedPage, MiscPage, StatisticsPage } from './views';

const MainPage = lazy(() => import('./components/MainPage'));

const App = () => {

    return (
        <BrowserRouter>
            <HideShortsThemeProvider>
                <Suspense fallback={<Loader  />}>
                    <PageHead />
                    <MainPage>
                        <NavBar />
                        <PowerButton />
                        <Routes>
                            <Route path="/" element={<FeedPage />} />
                            <Route path="/feed" element={<FeedPage />} />
                            <Route path="/channel" element={<ChannelPage />} />
                            <Route path="/misc" element={<MiscPage />} />
                            <Route path="/stats" element={<StatisticsPage />} />
                            <Route path="/disabled" element={<Disabled />} />
                            <Route path="*" element={<Navigate to='/' />} />
                        </Routes>
                    </MainPage>
                </Suspense>
            </HideShortsThemeProvider>
        </BrowserRouter>
    )
};

export default App;