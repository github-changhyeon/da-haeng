import React, { useEffect, useState } from 'react';
import styles from './ProfileComp.module.css';
import Avatar from '@material-ui/core/Avatar';

export default function ProfileComp({ role }) {
  // TODO 실데이터 받아오기
  const [codeNum, setCodeNum] = useState(333333);

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (role != undefined && role != null) {
      if (role === 'ROLE_ADMIN') {
        setImgSrc('/images/dahamzzi/ch_teacher.png');
      } else if (role === 'ROLE_STUDENT') {
        setImgSrc('/images/dahamzzi/ch_student.png');
      }
    }
  }, [role]);

  return (
    <div className={styles.profile}>
      <div className={styles.profile_img}>
        <Avatar className={styles.avatar} src={imgSrc} alt="profile" />
      </div>
      <div className={styles.profile_info}>
        <div className={styles.name}>김싸피</div>
        {role === 'ROLE_ADMIN' ? <div className={styles.code}>코드번호 : {codeNum}</div> : ''}
      </div>
    </div>
  );
}
