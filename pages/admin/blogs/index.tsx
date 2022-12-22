import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import Styles from '@styles/admin.module.scss';
import { List } from '@components/common/List';
import { IBlog } from '@services/interfaces/blog';

type Props = {};

function index({}: Props) {
  const [isLoading, setisLoading] = useState(true);
  const [blogList, setblogList] = useState<IBlog[]>([]);
  const baseApiUrl = 'https://shhshel.com/api'; //admin/blogs/index.php';

  useEffect(() => {
    axios
      .get(baseApiUrl + '/admin/blogs/index.php')
      .then((response) => {
        setblogList(response.data.body);
        setisLoading(false);
      })
      .catch((error) => {
        console.error(error); //TODO - use message from primereact
      });
  }, []);

  const deleteAction = (id: number) => {
    axios.delete(baseApiUrl + '/admin/blogs/');
    Router.reload();
  };

  return (
    <div className={`container`}>
      {!isLoading ? (
        <>
          <div className={`heading_bar`}>
            <p className={`heading__lg primary_colored ${Styles.main_heading}`}>
              All Blogs
            </p>
            <div>
              <Link href={'/admin/blogs/new'}>
                <button className="btn heading">Add New</button>
              </Link>
            </div>
          </div>
          <List list={blogList} />
        </>
      ) : (
        <p className={`heading__lg primary_colored`}>Loading...</p>
      )}
    </div>
  );
}

export default index;
