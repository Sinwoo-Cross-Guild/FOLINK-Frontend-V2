import * as styles from './style.css';

const Skeleton = () => {
  const messageCount = 5;

  const randomPadding = () => `${Math.floor(Math.random() * 40 + 22)}px`;

  return (
    <>
      {Array.from({ length: messageCount }).map((_, index) => (
        <div
          className={styles.skeleton.container}
          key={`skeleton-message-${index}`}
          style={{
            padding: randomPadding(),
          }}
        />
      ))}
    </>
  );
};

export default Skeleton;