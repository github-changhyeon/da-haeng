import React, { useEffect, useState } from 'react';
import styles from './PaginationComp.module.css';

export default function PaginationComp({ postsPerPage, totalPosts, paginate }) {
  const pageNumber = [];

  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pageNumber.map((pageNum) => (
        <div key={pageNum} className={styles.pagination_item} onClick={() => paginate(pageNum)}>
          {pageNum}
        </div>
      ))}
    </div>
  );
}
