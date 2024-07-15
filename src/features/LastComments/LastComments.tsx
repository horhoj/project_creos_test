import { useState } from 'react';
import classNames from 'classnames';
import styles from './LastComments.module.scss';
import { CommentTime } from './CommentTime';
import { CommentResponseItem } from '~/api/comments.types';
import { useAppTranslation } from '~/i18n/useAppTranslation';

interface LastCommentsProps {
  commentList: CommentResponseItem[];
}
export function LastComments({ commentList }: LastCommentsProps) {
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const { t } = useAppTranslation();

  const handleCOmmentClk = (id: number) => {
    setOpenCommentId((prev) => {
      if (prev === id) {
        return null;
      }
      return id;
    });
  };

  return (
    <div className={styles.LastComments}>
      <div>{t('Main_LastComments_title')}</div>
      <ul className={styles.list}>
        {commentList.map((comment) => (
          <li key={comment.id} className={styles.listItem} role={'button'} onClick={() => handleCOmmentClk(comment.id)}>
            <div className={classNames(styles.commentData, styles.listDataElement)}>
              <img src={comment.designer.avatar} alt="avatar" className={styles.avatar} />
              <strong>{comment.designer.username}</strong>
              <CommentTime date={comment.date_created} />
              <span>
                {t('Main_LastComments_task')}: {comment.issue}
              </span>
            </div>
            <div
              className={classNames(
                styles.listDataElement,
                openCommentId === comment.id ? styles.listItemText : styles.listItemTextHidden,
              )}
            >
              <div>{comment.message}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
