import React, { useState, useEffect } from 'react';
import { IBlog } from '@services/interfaces/blog';
import { ListItem } from '@components/common/List/ListItem/index';
import Image from 'next/image';

type Props = {
  list_title: string;
  list: IBlog[];
};

const List = ({ list, list_title }: Props) => {
  return (
    <div className="component_list">
      {list.map((item, index) => {
        return (
          <ListItem
            key={index}
            title={item.title}
            content={item.content}
            image={item.image_link}
            action1={{ actionName: 'Edit', actionUrl: '/admin/blogs/1' }}
          />
        );
      })}
    </div>
  );
};

export { List };
