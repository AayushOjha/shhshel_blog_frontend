import Link from 'next/link';
import Image from 'next/image';
import parser from 'html-react-parser';
import Styles from '@components/common/List/style.module.scss';
import { IAction } from '@services/interfaces/common/action';

type Props = {
  title: string;
  content?: string;
  image: string;
  action1?: IAction;
};

function ListItem({ title, content, image, action1 }: Props) {
  return (
    <div className={`card ${Styles.listItem}`}>
      <div className={`${Styles.imageContainer}`}>
        <Image src={image} alt={title} fill objectFit="cover" />
      </div>
      <div className={`${Styles.contentContainer} `}>
        <p className="heading__sm primary_colored">{title}</p>
        {parser(content || '')}
      </div>
      <div>
        {action1 ? (
          <Link href={action1.actionUrl}>
            <p>{action1.actionName}</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export { ListItem };
