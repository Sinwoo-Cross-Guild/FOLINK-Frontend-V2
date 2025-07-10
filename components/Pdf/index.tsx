"use client"

import { usePdfUploadMutation } from "@/services/pdf/pdf.mutation";
import { useDragAndDrop } from "@/hooks";
import * as styles from "./style.css";
import Image from "next/image";
import { Loading } from "../Loading";
import { useState } from "react";

const Pdf = () => {
  const [progress, setProgress] = useState(0);
  
  const { mutateAsync: upload, isPending: isUploading } = usePdfUploadMutation(
    (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
    }
  );

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

      try {
        setProgress(0);
        await upload(file); 
        setProgress(100);
      } catch (error) {
        alert("업로드 중 오류가 발생했습니다.");
        setProgress(0); 
      }
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