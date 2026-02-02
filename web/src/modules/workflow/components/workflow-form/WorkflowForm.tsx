// src/modules/workflow/components/WorkflowForm.tsx

import ToggleButton from "@/components/toggle-button/ToggleButton";
import { WorkflowFormProps } from "@/modules/workflow/types/Workflow.types";
import { JSX } from "react";
import { useTranslation } from "react-i18next";

export const WorkflowForm: React.FC<WorkflowFormProps> = ({
  form,
  onChange,
}: WorkflowFormProps): JSX.Element => {
  const { t } = useTranslation('workflow')
  
  return (
    <>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
          {t('form.name')}
        </label>
        <input
          id="name"
          type="text"
          value={form?.name}
          className={`w-full border px-3 py-2 rounded`}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          required={true}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          {t('form.description')}
        </label>
        <textarea
          id="description"
          value={form?.description}
          onChange={(e) => onChange({...form, description: e.target.value})}
          rows={4}
          className={`w-full border px-3 py-2 rounded`}
          required={true}
        />
      </div>
      
      <div className="mb-4">
        <ToggleButton
          label={t('form.isActive')}
          labelClassName="text-gray-400"
          checked={form?.isActive}
          onChange={(value) => onChange({ ...form, isActive: value })}
        />
      </div>

    </>
  );
};
