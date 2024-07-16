import { useMemo } from 'react';
import { OrderingType } from '../types';
import { OrderingBtn } from '../OrderingBtn';
import styles from './DesignersTable.module.scss';
import { FetchDesignerResponseResultItem, FetchDesignerResponseResultItemIssueStatus } from '~/api/designer.types';
import { getUUID } from '~/utils/getUUID';
import { useAppTranslation } from '~/i18n/useAppTranslation';

interface DesignersTableProps {
  designerList: FetchDesignerResponseResultItem[];
  ordering: OrderingType | null;
  setOrdering: (type: OrderingType | null) => void;
  disabled: boolean;
}
export function DesignersTable({ designerList, ordering, setOrdering, disabled }: DesignersTableProps) {
  const view = useMemo(
    () =>
      designerList.map(({ avatar, email, issues, username }) => {
        return {
          id: getUUID(),
          avatar,
          username,
          email,
          doneTaskCount: issues.filter((task) => task.status === FetchDesignerResponseResultItemIssueStatus.Done)
            .length,
          inProgressTaskCount: issues.filter(
            (task) => task.status === FetchDesignerResponseResultItemIssueStatus.InProgress,
          ).length,
        };
      }),

    [designerList],
  );

  const { t } = useAppTranslation();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.DesignersTable}>
        <thead>
          <tr>
            <th>
              <OrderingBtn
                field={'username'}
                ordering={ordering}
                setOrdering={setOrdering}
                title={t('Designer_DesignersTable_username_column_title')}
                disabled={disabled}
              />
            </th>
            <th>
              <OrderingBtn
                field={'email'}
                ordering={ordering}
                setOrdering={setOrdering}
                title={t('Designer_DesignersTable_email_column_title')}
                disabled={disabled}
              />
            </th>
            <th>{t('Designer_DesignersTable_openTasks_column_title')}</th>
            <th>{t('Designer_DesignersTable_closedTasks_column_title')}</th>
          </tr>
        </thead>
        <tbody>
          {view.map((el) => (
            <tr key={el.id}>
              <td>
                <span className={styles.tdContent}>
                  <img src={el.avatar} alt="avatar" className={styles.avatar} />
                  <strong>{el.username}</strong>
                </span>
              </td>
              <td>{el.email}</td>
              <td>{el.inProgressTaskCount}</td>
              <td>{el.doneTaskCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {designerList.length === 0 && <div className={styles.notFoundMsg}>Ничего не найдено</div>}
    </div>
  );
}
