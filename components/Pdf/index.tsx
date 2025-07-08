"use client"

import { usePdfUploadMutation } from "@/services/pdf/pdf.mutation";
import { useDragAndDrop } from "@/hooks";
import * as styles from "./style.css";
import Image from "next/image";

const Pdf = () => {
  const { mutateAsync: upload, isPending: isUploading } = usePdfUploadMutation();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        try {
          await upload(file);
          alert("PDF uploaded successfully!");
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Failed to upload PDF. Please try again.");
        }
      } else {
        alert("Please upload a valid PDF file.");
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
      <section className={styles.pdf.body}>
        <div className={styles.pdf.introduce}>
          <span className={styles.pdf.highlight}>AI 기반 질문 생성</span>
        </div>
        <Image
          width={105}
          height={65}
          src={"/assets/upload.png"}
          alt="업로드 이미지"
        />
        <h1 className={styles.pdf.title}>포트폴리오 PDF를 올려주세요!</h1>
        <p>이곳에 파일을 드래그해서 놓거나 클릭하여서 선택해주세요.</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button
          className={styles.pdf.btn}
          onClick={triggerFileInput}
          disabled={isUploading}
        >
          {isUploading ? "업로드 중..." : "파일 선택"}
        </button>
      </section>
    </section>
  );
};

export default Pdf;