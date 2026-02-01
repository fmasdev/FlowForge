// src/modules/workflow/components/WorkflowCard.tsx

'use client';

import { Card } from "@/components/card/Card"
import { CardBody } from "@/components/card/CardBody"
import { CardFooter } from "@/components/card/CardFooter"
import { CardHeader } from "@/components/card/CardHeader"
import { dateStringToDateAndTimeLocaleFormat } from "@/helpers/dateHelper"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { WorkflowCardProps } from "@/modules/workflow/types/Workflow.types"
import { JSX } from "react"
import { useTranslation } from "react-i18next"

export const WorkflowCard = ({
  workflow,
  onEdit,
  onDelete
}: WorkflowCardProps): JSX.Element => {
  const { t } = useTranslation('workflow');
  const { user } = useAuth();

  const getFormatedDate = (date: string, transPath: string) => {
    const dateTime = dateStringToDateAndTimeLocaleFormat(date)
    return t(transPath, {
      date: dateTime.date,
      time: dateTime.time
    })
  }

  return (
    <Card
      className="max-w-30"
    >

      <CardHeader
        title={workflow.name}
        subtitle={workflow.createdBy?.firstname}
        subtitleTooltip={t('card.author')}
        displayActions={workflow.createdBy.id === user?.sub}
        displayIsActiveIcon={false}
        onEdit={onEdit}
        onDelete={onDelete}
      />
                
      <CardBody className="h-15">
        {workflow.description.length > 65
          ? `${workflow.description.substring(0, 65)}...`
          : workflow.description}
      </CardBody>
                
      <CardFooter>
        {workflow.createdAt && (
          <div className="text-xs">
            {getFormatedDate(workflow.createdAt, 'card.createdAt')}
          </div>
        )}
        {workflow.updatedAt && (
          <div className="text-xs">
            {getFormatedDate(workflow.updatedAt, 'card.updatedAt')}
          </div>
        )}
        {workflow.lastExecution && (
          <div className="text-xs">
            {getFormatedDate(workflow.lastExecution, 'card.lastExecution')}
          </div>
        )}
      </CardFooter>
      
    </Card>
  )
}