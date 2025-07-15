"use client"

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
            if(error.message == ERROR[404]) {
              alert("질문 세트를 찾을 수 없습니다.")
            }
            setProgress(0);
          }
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
    <section
      className={`${styles.pdf.container} ${isDragging ? styles.pdf.dragging : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading && <Loading type="extract" status="pending" progress={progress} />}
      <section className={styles.pdf.body}>
        <div className={styles.pdf.introduce}>
          <span className={styles.pdf.highlight}>AI 기반 질문 생성</span>
        </div>
        <Image width={105} height={65} src={"/assets/upload.png"} alt="업로드 이미지" />
        <h1 className={styles.pdf.title}>포트폴리오 PDF를 올려주세요!</h1>
        <p>이곳에 파일을 드래그해서 놓거나 클릭하여서 선택해주세요.</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button className={styles.pdf.btn} onClick={triggerFileInput} disabled={isUploading}>
          파일 선택
        </button>
      </section>
    </section>
  );
};

export default Pdf;