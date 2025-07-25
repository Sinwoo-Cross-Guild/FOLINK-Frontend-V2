"use client";

import { usePdfUploadMutation } from "@/services/pdf/pdf.mutation";
import useDragAndDrop from "./useDragAndDrop";
import * as styles from "./style.css";
import Image from "next/image";
import { Loading } from "../Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ERROR } from "@/constants";

const Pdf = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const { mutateAsync: upload, isPending: isUploading } = usePdfUploadMutation();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];

      if (!file) {
        return;
      }

      if (file.type !== "application/pdf") {
        alert("PDF만 삽입할 수 있습니다.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        return;
      }

      setProgress(0);

      await upload(
        {
          file,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        },
        {
          onSuccess: (response) => {
            setProgress(100);

            const questionSetId = response?.data?.questionSet?.id;

            if (!questionSetId) {
              alert("질문 아이디가 없습니다.");
              setProgress(0);
              return;
            }

            router.push(`/question/${questionSetId}`);
          },
          onError: (error) => {
            if (error.message === ERROR[404]) {
              alert("질문 세트를 찾을 수 없습니다.");
            }
            setProgress(0);
          },
        }
      );
    }
  };

  const {
    isDragging,
    fileInputRef,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    triggerFileInput,
  } = useDragAndDrop({
    onFilesSelected: handleFilesSelected,
  });

  return (
    <main className={`${styles.pdf.container} ${isDragging ? styles.pdf.dragging : ""}`}>
      {isUploading && <Loading type="extract" status="pending" progress={progress} />}
      <article
        className={styles.pdf.body}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <header className={styles.header.introduce}>
          <h1>
            <span className={styles.header.highlight}>AI 기반 질문 생성</span>
          </h1>
        </header>
        <figure className={styles.figure.wrap}>
          <Image width={105} height={65} src="/assets/upload.png" alt="PDF 업로드 아이콘" />
          <figcaption className={styles.figure.title}>포트폴리오 PDF를 올려주세요!</figcaption>
        </figure>
        <p>이곳에 파일을 드래그해서 놓거나 클릭하여 선택해주세요.</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="application/pdf"
          onChange={handleFileChange}
          id="pdf-upload"
          aria-label="PDF 파일 업로드"
        />
        <button
          className={styles.pdf.btn}
          onClick={triggerFileInput}
          disabled={isUploading}
          aria-label="PDF 파일 선택"
        >
          파일 선택
        </button>
      </article>
    </main>
  );
};

export default Pdf;