import React from 'react';
import OpinionAboutBlock from './OpinionAboutBlock';
import YesSvg from '../../../../public/assets/svg/check-circle.light.svg';
import NoSvg from '../../../../public/assets/svg/times-circle.light.svg';
import AlarmClockSvg from '../../../../public/assets/svg/alarm-clock.svg';
import Alert from '../../components/ui-components/Alert';

export default function Comments() {
  return (
    <section className="rate-opinion content">
      <OpinionAboutBlock />

      <div className="container">
        <div className="opinion-rec">
          <p className="opinion-rec__title">Are you going to recommend Rene Meier to friends</p>
          <div className="opinion-rec__list">
            <button type="button" className="opinion-rec__btn active">
              <YesSvg />
              Yes
            </button>

            <button type="button" className="opinion-rec__btn">
              <YesSvg />
              Not sure
            </button>

            <button type="button" className="opinion-rec__btn">
              <NoSvg />
              No
            </button>
          </div>
          <div className="opinion-rec__remind">
            {/*<button className="ask-btn">Ask me later</button>*/}
            {true && (
              <Alert type={Alert.info} icon={<AlarmClockSvg />} message="We will ask you later" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
