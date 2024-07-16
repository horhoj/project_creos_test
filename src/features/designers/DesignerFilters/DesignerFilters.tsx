import { FormEvent, useMemo, useState } from 'react';
import styles from './DesignerFilters.module.scss';
import { Select, SelectOption } from '~/ui/Select';
import { FetchProjectListResponseItem } from '~/api/projects.types';
import { Button } from '~/ui/Button';
import { FetchDesignerResponseResultItemIssueStatus } from '~/api/designer.types';
import { useAppTranslation } from '~/i18n/useAppTranslation';
import { FormField } from '~/ui/FormField';

interface DesignerFiltersProps {
  projectList: FetchProjectListResponseItem[];
  onSubmit: (project: string, status: string) => void;
  onReset: () => void;
  disabled: boolean;
}

export function DesignerFilters({ projectList, onSubmit, onReset, disabled }: DesignerFiltersProps) {
  const ProjectSelectOptions: SelectOption[] = useMemo(
    () => projectList.map(({ key, name }) => ({ value: key, label: `(${key}) ${name}` })),
    [projectList],
  );

  const StatusSelectOptions: SelectOption[] = useMemo<SelectOption[]>(
    () => [
      { value: FetchDesignerResponseResultItemIssueStatus.Done, label: 'Выполнено' },
      { value: FetchDesignerResponseResultItemIssueStatus.InProgress, label: 'В процессе' },
    ],
    [],
  );

  const { t } = useAppTranslation();

  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(project, status);
  };

  const handleReset = () => {
    setProject('');
    setStatus('');
    onReset();
  };

  return (
    <form className={styles.DesignerFilters} onSubmit={handleSubmit}>
      <FormField title={t('Designer_DesignerFilters_status')}>
        <Select options={StatusSelectOptions} value={status} onChange={(e) => setStatus(e.target.value)} />
      </FormField>
      <FormField title={t('Designer_DesignerFilters_project')}>
        <Select
          options={ProjectSelectOptions}
          onChange={(e) => {
            setProject(e.target.value);
          }}
          value={project}
          className={styles.projectSelect}
        />
      </FormField>
      <Button type={'submit'} disabled={disabled}>
        {t('Designer_DesignerFilters_find')}
      </Button>
      <Button type={'button'} onClick={handleReset} disabled={disabled}>
        {t('Designer_DesignerFilters_reset')}
      </Button>
    </form>
  );
}
