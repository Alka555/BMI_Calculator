import React, { useState } from 'react';
import BmiCalculator from './BmiCalculator';
import './App.css';

const App = () => {
  const [isImageVisible, setIsImageVisible] = useState(true);

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible);
  };

  const showImage = () => {
    setIsImageVisible(true);
  };

  return (
    <div className='bgd2 cal'>
      <div className="row">
        <div className="col-md-6">
          {isImageVisible && (
            <div className='py-5 ps-5 mt-5 img'>
              <img src="https://www.hdwallpaper.nu/wp-content/uploads/2017/02/fitness-20.jpg" alt="" width={'100%'} height={'100%'} />
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 text-center">
              <BmiCalculator toggleImageVisibility={toggleImageVisibility} showImage={showImage}/>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
