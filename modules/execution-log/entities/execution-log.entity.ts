import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum ExecutionLogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

@Entity('execution_log')
@Index(['executionId'])
@Index(['workflowId'])
export class ExecutionLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * ID de l’exécution du workflow
   */
  @Column({ name: 'execution_id', type: 'uuid' })
  executionId: string;

  /**
   * ID du workflow (dénormalisé pour requêtes rapides)
   */
  @Column({ name: 'workflow_id', type: 'uuid' })
  workflowId: string;

  /**
   * ID du node concerné (optionnel)
   */
  @Column({ name: 'node_id', type: 'uuid', nullable: true })
  nodeId?: string;

  /**
   * Niveau du log
   */
  @Column({
    type: 'enum',
    enum: ExecutionLogLevel,
    default: ExecutionLogLevel.INFO,
  })
  level: ExecutionLogLevel;

  /**
   * Message lisible
   */
  @Column({ type: 'text' })
  message: string;

  /**
   * Données techniques / payload (JSON)
   */
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  /**
   * Timestamp du log
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
