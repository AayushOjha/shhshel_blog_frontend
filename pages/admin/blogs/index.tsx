import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from '@styles/admin.module.scss';
import { List } from '@components/common/List';
import { IBlog } from '@services/interfaces/blog';
import Link from 'next/link';

type Props = {};

function index({}: Props) {
  const [isLoading, setisLoading] = useState(true);
  const [blogList, setblogList] = useState<IBlog[]>([]);
  const getAllUrl = 'https://shhshel.com/api/admin/blogs/index.php';

  useEffect(() => {
    axios.get(getAllUrl).then((response) => {
      setblogList(response.data.body);
      setisLoading(false);
    });
  }, []);

  return (
    <div className={`container ${Styles.bolgs_index_page}`}>
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
          <List list_title="blogs" list={blogList} />
        </>
      ) : (
        <p className={`heading__lg primary_colored`}>Loading...</p>
      )}
    </div>
  );
}

export default index;
