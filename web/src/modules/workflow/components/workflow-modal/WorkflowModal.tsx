// src/modules/workflow/components/workflow-modal/WorkflowModal.tsx

import { Cta } from "@/components/cta/Cta";
import { Modal } from "@/components/modal/Modal";
import { ModalBody } from "@/components/modal/ModalBody";
import { ModalFooter } from "@/components/modal/ModalFooter";
import { ModalHeader } from "@/components/modal/ModalHeader";
import { WorkflowForm } from "@/modules/workflow/components/workflow-form/WorkflowForm";
import { WorkflowModalProps } from "@/modules/workflow/types/Workflow.types";
import { useTranslation } from "react-i18next";

export const WorkflowModal = ({
  isOpen,
  action,
  form,
  onChange,
  onClose,
  onSubmit,
  onDelete,
}: WorkflowModalProps) => {
  const { t } = useTranslation('workflow');

  const getModalTitle = (): string => 
    (action === 'delete' ? 'Delete workflow' : ( action === 'edit' ? 'Edit workflow' : "Add workflow") )

  const getModalSubtitle = (): string => action === 'delete' ? 'This action is irreversible': ''
  const isFormMode: boolean = action === 'add' || action === 'edit';
  const Wrapper = isFormMode ? 'form' : 'div';

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <ModalHeader
          title={getModalTitle()}
          subtitle={getModalSubtitle()}
          onClose={onClose}
        />

        <Wrapper onSubmit={isFormMode ? (e) => {
          e.preventDefault();
          onSubmit();
        } : undefined}>

        <ModalBody>
          {isFormMode && (
            <WorkflowForm
              form={form}
              onChange={onChange}
            />
          )}
            
          {action === 'delete' && (
            <>
                <p>{ t('form.deleteMessage') }</p>
              {form?.name && (
                <div>
                  {t('form.deleteName')} : {form.name}    
                </div>
              )}
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Cta
            onClick={onClose}
            label={t('modal.cancel')}
            variant="form"
            backgroundVariant="default"
          />

          {(action === 'add' || action === 'edit') && (
            <Cta
           
              label={t('modal.submit')}
              variant="form"
              backgroundVariant="info"
              type="submit"
            />
          )}

          {action === 'delete' && (
            <Cta
                onClick={onDelete}
                label={t('modal.delete')}
                variant="form"
                backgroundVariant="danger"
              />
          )}
        </ModalFooter>
        </Wrapper>
      </Modal>
    </>
  )
}