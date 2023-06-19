import { Loading } from '@nextui-org/react';
import { useDarkMode } from '../theme';

const Loader = () => {
    const { darkMode } = useDarkMode();

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${darkMode ? 'bg-black' : 'bg-white'}`}>
            <Loading size='lg' color="secondary" type="points-opacity" />
        </div>
    );
};

export default Loader;