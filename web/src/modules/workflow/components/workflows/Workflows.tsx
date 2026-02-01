// src/modules/workflow/components/Workflow.tsx

'use client';

import { JSX, useEffect, useRef, useState } from "react";
import { workflowService } from "@/modules/workflow/workflow.service";
import { Workflow, WorkflowFormData } from "@/modules/workflow/types/Workflow.types";
import { SearchBar } from "@/components/searchBar/SearchBar";
import { useTranslation } from "react-i18next";
import { ModalBtn } from "@/components/modal/ModalBtn";
import { InfiniteObserver } from "@/components/infinite-scroll/InfiniteObserver";
import { WorkflowCard } from "@/modules/workflow/components/workflow-card/WorkflowCard";
import { WorkflowModal } from "@/modules/workflow/components/workflow-modal/WorkflowModal";
import { workflowSchema } from "@/modules/workflow/schema/workflow.schema";
import { sortByKey } from "@/helpers/arraySortHelper";
import { SortState } from "@/types/sort.types";

export interface FetchWorkflowProps {
    page?: number;
    mode: 'append' | 'replace';
    search?: string
}
  
export const WorkflowDashboard = (): JSX.Element => {
  const { t } = useTranslation('workflow');
  const { t: tCommon } = useTranslation('common');

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true);
  const currentPage = useRef<number>(1)
  const [sort, setSort] = useState<SortState<Workflow>>({
    field: 'name',
    direction: 'asc',
  });

  // modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'add' | 'delete' | 'edit'>('add')
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowFormData>({
    name: '',
    description: '',
  })

  const setDefaultWorkflowForm = () => setSelectedWorkflow({
    name: '',
    description: '',
  })

  const fetchWorkflows = async({ page, search, mode = 'replace' }: FetchWorkflowProps) => {
    setIsLoading(true);

    try {
      const res = await workflowService.fetchAll({ page, search });      
      mode === 'replace' ? setWorkflows(res.data ?? [])
      : setWorkflows((prev) => [...prev, ...res.data ?? []]);
      
      const meta = res.meta || { page: 1, pages: 1 };

      const more =
        !!res.data?.length && 
        meta.page < meta.pages;

      setHasMore(more ?? false);
      currentPage.current = Number(meta.page)
      
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows({
      mode: 'replace',
      page: currentPage.current,
    })
  }, [])

  const fetchNextPage = async (): Promise<void> => {
    if (isLoading || !hasMore) return;
    const nextPage = currentPage.current + 1

    await fetchWorkflows({
      mode: 'append',
      page: nextPage,
    });
  }
  
  const handleSearch = async (value: string): Promise<void> => {
    await fetchWorkflows({
      mode: 'replace',
      search: value,
    })
  };

  const handleClearSearch = async (): Promise<void> => {
    await fetchWorkflows({
      mode: 'replace',
    })
  };

  const handleDelete = async (): Promise<void> => {
    if (!selectedWorkflow?.id) return
    try {
      const { data: removedWorkflow } = await workflowService.delete(selectedWorkflow.id);
      console.log(removedWorkflow)
      if (removedWorkflow) {
        setWorkflows((prev) => prev.filter((w) => w.id !== removedWorkflow.id));
      }

    } catch (error) {
      console.error(error)
    } finally {
      setModalOpen(false);
      setDefaultWorkflowForm();
    }
  };

  const handleSubmit = async () => {
    const parsed = workflowSchema.safeParse(selectedWorkflow);

    if (!parsed.success) {
      console.error(parsed.error.flatten());
      return;
    }
    try {
      if (selectedWorkflow?.id) {
        const { data: updatedWorkflow } = await workflowService.update(selectedWorkflow.id, {
          name: selectedWorkflow.name,
          description: selectedWorkflow.description,
        });
        const workflowList = workflows.map((workflow) =>
          (workflow.id === updatedWorkflow.id ? updatedWorkflow : workflow));
        const sortedWorkflows = sortByKey(workflowList, 'updatedAt', false)
        setWorkflows(sortedWorkflows)
      } else {
        const res = await workflowService.create(selectedWorkflow);
        if (res.data) {
          setWorkflows([res.data, ...workflows]);
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setModalOpen(false);
      setDefaultWorkflowForm();
    }
  };



  return (
    <>
      <div className="flex justify-between items-center pb-10">
        <h1>Workflows</h1>
        <div className="flex gap-4 items-center">
          <div>
            <SearchBar
              clearLabel={tCommon('searchBar.clearLabel')}
              onSearch={(search) => handleSearch(search)} 
              onClearSearch={handleClearSearch}
            />
          </div>
          <div>
            <ModalBtn
              iconName="add"
              className="h-10 w-10 items-center flex justify-center rounded-full bg-blue-700 border border-gray-300"
              title={t('add')}
              onClick={() => { setModalOpen(true); setModalAction('add') }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onEdit={() => {
              setModalAction('edit');
              setSelectedWorkflow(workflow)
              setModalOpen(true)
            }}
            onDelete={() => {
              setModalAction('delete')
              setSelectedWorkflow(workflow)
              setModalOpen(true)
            }}
          />
        ))}
      </div>
      
      <div>
        <InfiniteObserver
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={fetchNextPage}
        />
      </div >
    
      {/* modal */}
      <WorkflowModal
        isOpen={modalOpen}
        action={modalAction}
        form={selectedWorkflow}
        onSubmit={handleSubmit}
        onChange={setSelectedWorkflow}
        onClose={() => {
          setModalOpen(false)
          setDefaultWorkflowForm()
        }}
        onDelete={() => {
          // delete action
          setModalOpen(false)
          setDefaultWorkflowForm()
          handleDelete()
        }}
      />
    </>
  );
}
