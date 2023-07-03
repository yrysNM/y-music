import { useLottie } from 'lottie-react';

import animation404 from '../assets/404an1.json';

const Page404 = () => {
  const options = {
    animationData: animation404,
    loop: true,
  };

  const { View } = useLottie(options);

  const style = {
    blockS: {
      display: 'grid',
      placeItems: 'center',
    },
    textError: {
      marginTop: '20px',
      color: '#fff',
    },
  };

  return (
    <div style={style.blockS}>
      <div style={{ height: 'auto', width: 300 }}>{View}</div>
      <p style={style.textError}>Error 404</p>
    </div>
  );
};

export { Page404 };
