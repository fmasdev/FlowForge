// src/components/modal/Modal.types.ts

import { ReactElement } from "react";
import { ModalBody } from "@/components/modal/ModalBody";
import { ModalFooter } from "@/components/modal/ModalFooter";
import { ModalHeader } from "@/components/modal/ModalHeader";
import { IconName } from "@/assets/svg";

export interface ModalBtnProps {
  className: string;
  title?: string;
  label?: string;
  iconName?: IconName
  onClick: () => void
}

export interface ModalProps {
  open: boolean;
  children: ModalChildren;
  onClose: () => void;
}

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  closeBtn?: boolean;
  onClose: () => void;
}

export interface ModalBodyProps {
  children: React.ReactNode;
}

export interface ModalFooterProps {
  children: React.ReactNode;
}

export type ModalHeader = ReactElement<typeof ModalHeader>;
export type ModalBody = ReactElement<typeof ModalBody>;
export type ModalFooter = ReactElement<typeof ModalFooter>;

export type ModalChildren =
  | []
  | [ModalBody]
  | [ModalHeader, ModalBody]
  | [ModalHeader, ModalFooter]
  | [ModalBody, ModalFooter]
  | [ModalHeader, ModalBody, ModalFooter]