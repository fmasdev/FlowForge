// src/assets/svg/index.ts

import type React from 'react';
import { InfoIcon } from './InfoIcon';
import { SuccessIcon } from './SuccessIcon';
import { ErrorIcon } from './ErrorIcon';
import { OpenEyeIcon } from './OpenEyeIcon';
import { ClosedEyeIcon } from './ClosedEyeIcon';
import { UserIcon } from './UserIcon';
import { FlowForgeIcon } from './FlowForgeIcon';
import { EnIcon } from './EnIcon';
import { FrIcon } from './FrIcon';
import { EllipsisVerticalIcon } from './EllipsisVertical';
import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { SearchIcon } from './SearchIcon';
import { CloseCircleIcon } from '@/assets/svg/CloseCircleIcon';
import { AddIcon } from '@/assets/svg/AddIcon';
import { CloseIcon } from '@/assets/svg/CloseIcon';

export const svgIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  openEye: OpenEyeIcon,
  closedEye: ClosedEyeIcon,
  user: UserIcon,
  flowforge: FlowForgeIcon,
  en: EnIcon,
  fr: FrIcon,
  ellipsisVertical: EllipsisVerticalIcon,
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  search: SearchIcon,
  closeCircle: CloseCircleIcon,
  add: AddIcon,
  close: CloseIcon,
} satisfies Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

// Automatic types
export type IconName = keyof typeof svgIcons;