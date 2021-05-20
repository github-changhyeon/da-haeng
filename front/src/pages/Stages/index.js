import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';

export default function Stages() {
  const location = useLocation();
  const history = useHistory();

  const category = location.state.category;

  const [iconPath, setIconPath] = useState('');
  const [resultNum, setResultNum] = useState(0);

  useEffect(() => {
    if (category === 'burger') {
      if (resultNum === 0) {
        $('.stage_1').show();
        $('.stage_2').hide();
        $('.stage_3').hide();
        $('.stage_4').hide();
        $('.stage_5').hide();
        $('.gray_2').show();
        $('.gray_3').show();
        $('.gray_4').show();
        $('.gray_5').show();
      } else if (resultNum === 1) {
        $('.stage_1').hide();
        $('.stage_2').show();
        $('.stage_3').hide();
        $('.stage_4').hide();
        $('.stage_5').hide();
        $('.gray_2').hide();
        $('.gray_3').show();
        $('.gray_4').show();
        $('.gray_5').show();
      } else if (resultNum === 2) {
        $('.stage_1').hide();
        $('.stage_2').hide();
        $('.stage_3').show();
        $('.stage_4').hide();
        $('.stage_5').hide();
        $('.gray_2').hide();
        $('.gray_3').hide();
        $('.gray_4').show();
        $('.gray_5').show();
      } else if (resultNum === 3) {
        $('.stage_1').hide();
        $('.stage_2').hide();
        $('.stage_3').hide();
        $('.stage_4').show();
        $('.stage_5').hide();
        $('.gray_2').hide();
        $('.gray_3').hide();
        $('.gray_4').hide();
        $('.gray_5').show();
      } else if (resultNum === 4 || resultNum === 5) {
        $('.stage_1').hide();
        $('.stage_2').hide();
        $('.stage_3').hide();
        $('.stage_4').hide();
        $('.stage_5').show();
        $('.gray_2').hide();
        $('.gray_3').hide();
        $('.gray_4').hide();
        $('.gray_5').hide();
      }
    } else if (category === 'bus') {
      if (resultNum === 0) {
        $('.stage_1').show();
        $('.stage_2').hide();
        $('.stage_3').hide();
        $('.gray_2').show();
        $('.gray_3').show();
      } else if (resultNum === 1) {
        $('.stage_1').hide();
        $('.stage_2').show();
        $('.stage_3').hide();
        $('.gray_2').hide();
        $('.gray_3').show();
      } else if (resultNum === 2 || resultNum === 3) {
        $('.stage_1').hide();
        $('.stage_2').hide();
        $('.stage_3').show();
        $('.gray_2').hide();
        $('.gray_3').hide();
      }
    }
  }, [resultNum]);

  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      const instance = restApi();

      // 도전하기 Stage 현황 불러오기 axios
      instance
        .get(`/stage`, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log('성공');
            if (category === 'burger') {
              setResultNum(res.data.burgerStageResult);
              setIconPath('/images/dahamzzi/ch_burger.png');
            } else if (category === 'bus') {
              setResultNum(res.data.busStageResult);
              setIconPath('/images/dahamzzi/ch_bus.png');
            }
          } else {
            console.log('반만 성공');
          }
        })
        .catch((err) => {
          console.log(err);
          // alert('내 정보를 불러오는 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
          Swal.fire({
            icon: 'warning',
            title: '내 정보를 불러오는 중에 오류가 발생했습니다.',
            text: '잠시 후에 다시 시도해주세요.',
          });
        });
    } else {
      console.log('mypage/ jwt 토큰 없음 !!');
    }
  }, []);

  useEffect(() => {
    console.log('iconNum: ' + resultNum);
  }, [resultNum]);

  const onClickStage = (num) => {
    history.push({
      pathname: RouterInfo.PAGE_URLS.PRACTICE,
      state: { category: category, stage: num },
    });
  };

  return (
    <div className={styles.practice_container}>
      <BackgroundComp color="yellow" />
      <Header />
      {category === null || category === undefined ? <Loader /> : null}
      {category === 'burger' ? (
        <>
          <div
            className={styles.cloud_1}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '280px',
              left: '90px',
            }}
            onClick={() => {
              onClickStage(1);
            }}
          >
            <div className="stage_1">
              <img className={styles.ch_burger_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>1</div>
          </div>
          <div className="gray_2">
            <div
              className={styles.cloud_gray}
              style={{
                background: `url('/images/cloud_gray.png') center center`,
                backgroundSize: '100% 100%',
                top: '90px',
                left: '380px',
              }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '아직 도전할 수 없습니다.',
                  text: '차례대로 도전에 성공해주세요.',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              <div className={styles.cloud_text}>2</div>
            </div>
          </div>
          <div
            className={styles.cloud_1}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '90px',
              left: '380px',
            }}
            onClick={() => {
              onClickStage(2);
            }}
          >
            <div className="stage_2">
              <img className={styles.ch_burger_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>2</div>
          </div>
          <div className="gray_3">
            <div
              className={styles.cloud_gray}
              style={{
                background: `url('/images/cloud_gray.png') center center`,
                backgroundSize: '100% 100%',
                top: '380px',
                left: '620px',
              }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '아직 도전할 수 없습니다.',
                  text: '차례대로 도전에 성공해주세요.',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              <div className={styles.cloud_text}>3</div>
            </div>
          </div>
          <div
            className={styles.cloud_1}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '380px',
              left: '620px',
            }}
            onClick={() => {
              onClickStage(3);
            }}
          >
            <div className="stage_3">
              <img className={styles.ch_burger_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>3</div>
          </div>
          <div className="gray_4">
            <div
              className={styles.cloud_gray}
              style={{
                background: `url('/images/cloud_gray.png') center center`,
                backgroundSize: '100% 100%',
                top: '160px',
                left: '890px',
              }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '아직 도전할 수 없습니다.',
                  text: '차례대로 도전에 성공해주세요.',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              <div className={styles.cloud_text}>4</div>
            </div>
          </div>
          <div
            className={styles.cloud_1}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '160px',
              left: '890px',
            }}
            onClick={() => {
              onClickStage(4);
            }}
          >
            <div className="stage_4">
              <img className={styles.ch_burger_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>4</div>
          </div>
          {/* <div className={styles.cloud}></div> */}
          <div className="gray_5">
            <div
              className={styles.cloud_gray}
              style={{
                background: `url('/images/cloud_gray.png') center center`,
                backgroundSize: '100% 100%',
                top: '320px',
                left: '1190px',
              }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '아직 도전할 수 없습니다.',
                  text: '차례대로 도전에 성공해주세요.',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              <div className={styles.cloud_text}>5</div>
            </div>
          </div>
          <div
            className={styles.cloud_1}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '320px',
              left: '1190px',
            }}
            onClick={() => {
              onClickStage(5);
            }}
          >
            <div className="stage_5">
              <img className={styles.ch_burger_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>5</div>
          </div>
        </>
      ) : (
        <>
          <div
            className={styles.cloud_bus}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '300px',
              left: '200px',
            }}
            onClick={() => {
              onClickStage(1);
            }}
          >
            <div className="stage_1">
              <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>1</div>
          </div>
          <div className="gray_2">
            <div
              className={styles.cloud_gray_bus}
              style={{
                background: `url('/images/cloud_gray.png') center center`,
                backgroundSize: '100% 100%',
                top: '80px',
                left: '600px',
              }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '아직 도전할 수 없습니다.',
                  text: '차례대로 도전에 성공해주세요.',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              <div className={styles.cloud_text}>2</div>
            </div>
          </div>
          <div
            className={styles.cloud_bus}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '80px',
              left: '600px',
            }}
            onClick={() => {
              onClickStage(2);
            }}
          >
            <div className="stage_2">
              <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>2</div>
          </div>
          <div className="gray_3">
            <div
              className={styles.cloud_gray_bus}
              style={{
                background: `url('/images/cloud_gray.png') center center`,
                backgroundSize: '100% 100%',
                top: '200px',
                left: '1050px',
              }}
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '아직 도전할 수 없습니다.',
                  text: '차례대로 도전에 성공해주세요.',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }}
            >
              <div className={styles.cloud_text}>3</div>
            </div>
          </div>
          <div
            className={styles.cloud_bus}
            style={{
              background: `url('/images/cloud_1.png') center center`,
              backgroundSize: '100% 100%',
              top: '200px',
              left: '1050px',
            }}
            onClick={() => {
              onClickStage(3);
            }}
          >
            <div className="stage_3">
              <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
            </div>
            <div className={styles.cloud_text}>3</div>
          </div>
        </>
      )}
    </div>
  );
}
